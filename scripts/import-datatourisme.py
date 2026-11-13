#!/usr/bin/env python3
"""Import des marchés de Noël depuis l'export public DATAtourisme (Licence Ouverte Etalab 2.0).

Usage : python3 scripts/import-datatourisme.py <evenements.json.gz> <communes.json> [date-du-jour AAAA-MM-JJ]
  - evenements.json.gz : https://data.cquest.org/datatourisme/evenements.json.gz (export quotidien)
  - communes.json      : https://geo.api.gouv.fr/communes?fields=nom,code,centre,population,codeDepartement,codeRegion&format=json
Écrit src/data/marches.json (tous les marchés encore à venir), src/data/villes.json (centres de recherche),
public/data/marches.json (même contenu, chargé par le chercheur de l'accueil) et src/data/import-stats.json.
Les fiches relues à la main sur les pages officielles (src/data/officiels.json) sont ajoutées telles quelles.
Rien ne tourne automatiquement : le script se relance à la main, puis le site se reconstruit.
"""
import gzip, json, re, sys, os, collections
from datetime import date
SRC, COMM = sys.argv[1], sys.argv[2]
TODAY = sys.argv[3] if len(sys.argv) > 3 else '2026-11-13'
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
d = json.load(gzip.open(SRC, 'rt'))
g = d['@graph']
idx = {}
def walk(o):
    if isinstance(o, dict):
        i = o.get('@id')
        if i and len(o) > 1 and (i not in idx or len(json.dumps(o)) > len(json.dumps(idx[i]))): idx[i] = o
        for v in o.values(): walk(v)
    elif isinstance(o, list):
        for v in o: walk(v)
walk(g)
R = lambda o: idx[o['@id']] if isinstance(o, dict) and set(o) == {'@id'} and o['@id'] in idx else o
L = lambda o: o if isinstance(o, list) else ([] if o is None else [o])
def lab(x, lang='fr'):
    for i in L(x.get('rdfs:label')):
        if isinstance(i, dict) and i.get('@language') == lang: return i['@value']
    return None
def V(o):
    o = R(o)
    return o.get('@value') if isinstance(o, dict) else o
WD = {'Monday': 0, 'Tuesday': 1, 'Wednesday': 2, 'Thursday': 3, 'Friday': 4, 'Saturday': 5, 'Sunday': 6}
def mask(days):
    m = 0
    for dd in days:
        k = R(dd).get('@id', '').replace('schema:', '') if isinstance(dd, dict) else str(dd)
        if k in WD: m |= 1 << WD[k]
    return m or 127
hm = lambda t: (t or '')[:5]
NOEL = re.compile(r"(march[ée]s?|village|f[ée]erie)\s+(de\s+|du\s+)?no[ëe]l", re.I)
# Ce qui se passe AU marché sans être le marché : concert, feu d'artifice, inauguration, sortie organisée…
PAS_UN_MARCHE = re.compile(r"^\W*(concert|feu d|inauguration|spectacle|sortie|offre|jeu de piste|courses|les mascottes|illumination|activit|conte|atelier|un apr[eè]s-midi|chorale|visite|balade|parade|exposition|go[uû]ter|d[ée]fil[ée] de saint)", re.I)
REG = {'Grand Est': 'grand-est', 'Nouvelle-Aquitaine': 'nouvelle-aquitaine', 'Occitanie': 'occitanie', 'Pays de la Loire': 'pays-de-la-loire',
       'Normandie': 'normandie', 'Centre-Val de Loire': 'centre-val-de-loire', 'Auvergne-Rhône-Alpes': 'auvergne-rhone-alpes',
       'Bourgogne-Franche-Comté': 'bourgogne-franche-comte', 'Bretagne': 'bretagne', 'Hauts-de-France': 'hauts-de-france',
       "Provence-Alpes-Côte d'Azur": 'paca', 'Île-de-France': 'ile-de-france', 'Corse': 'corse'}
out, deps, exclus, corrige = [], {}, collections.Counter(), set()
for x in g:
    name = (lab(x) or '').strip()
    if not NOEL.search(name): continue
    if PAS_UN_MARCHE.search(name): exclus['pas un marché'] += 1; continue
    sd = [V(i) for i in L(x.get('schema:startDate'))]; ed = [V(i) for i in L(x.get('schema:endDate'))]
    if not ed or max(ed) < TODAY: exclus['terminé'] += 1; continue
    loc = R(L(x.get('isLocatedAt'))[0]) if x.get('isLocatedAt') else {}
    ad = R(L(loc.get('schema:address'))[0]) if loc.get('schema:address') else {}
    geo = R(loc.get('schema:geo')) if loc.get('schema:geo') else {}
    city = R(ad.get('hasAddressCity')) if ad.get('hasAddressCity') else {}
    dep = R(city.get('isPartOfDepartment')) if city.get('isPartOfDepartment') else {}
    reg = R(dep.get('isPartOfRegion')) if dep.get('isPartOfRegion') else {}
    try: la, lo = round(float(V(geo.get('schema:latitude'))), 5), round(float(V(geo.get('schema:longitude'))), 5)
    except (TypeError, ValueError): exclus['sans coordonnées'] += 1; continue
    per = []
    for p in L(x.get('takesPlaceAt')):
        p = R(p)
        s, e = V(p.get('startDate')), V(p.get('endDate'))
        if not s: continue
        per.append([s, e or s, mask(L(p.get('appliesOnDay'))), hm(V(p.get('startTime'))), hm(V(p.get('endTime')))])
    oh = []
    for o in L(loc.get('schema:openingHoursSpecification')):
        o = R(o)
        f, t = (V(o.get('schema:validFrom')) or '')[:10], (V(o.get('schema:validThrough')) or '')[:10]
        oh.append([f or min(sd), t or max(ed), mask(L(o.get('schema:dayOfWeek'))), hm(V(o.get('schema:opens'))), hm(V(o.get('schema:closes')))])
    if not per: per = [[min(sd), max(ed), 127, '', '']]
    large = all(r[2] == 127 and not r[3] for r in per)
    precis = [r for r in oh if r[2] != 127 or r[3] or r[0] != min(sd) or r[1] != max(ed)]
    regles, heures = (oh, []) if (large and precis) else (per, [r for r in oh if r[3]])
    # Coquille d'année : une période qui commence l'an passé (« 27/11/2025 ») et finit dans la saison est lue sur l'année de sa fin.
    def annee(r):
        if r[0] < r[1][:4] + '-01-01' and (date.fromisoformat(r[1]) - date.fromisoformat(r[0])).days > 200 and r[1][:4] + r[0][4:] <= r[1]:
            corrige.add(x['@id']); return [r[1][:4] + r[0][4:]] + list(r[1:])
        return list(r)
    regles = [annee(r) for r in regles]; heures = [annee(r) for r in heures]
    regles = sorted({tuple(r) for r in regles}); heures = sorted({tuple(r) for r in heures})
    if max(r[1] for r in regles) < TODAY: exclus['terminé'] += 1; continue
    contact = R(L(x.get('hasContact'))[0]) if x.get('hasContact') else {}
    free = None
    for of in L(x.get('offers')):
        for ps in L(R(of).get('schema:priceSpecification')):
            for pol in L(R(ps).get('hasEligiblePolicy')):
                if R(pol).get('@id') == 'kb:Free': free = 1
                elif R(pol).get('@id') == 'kb:Paying' and free is None: free = 0
    web = [w for w in L(contact.get('foaf:homepage')) if isinstance(w, str) and w.startswith('http') and 'docs.google' not in w]
    org = R(L(x.get('hasBeenCreatedBy'))[0]) if x.get('hasBeenCreatedBy') else {}
    dc = dep.get('insee') or ''
    deps[dc] = lab(dep) or ''
    if name == name.upper():  # « MARCHÉ DE NOËL DE BLAGNAC » → « Marché de Noël de Blagnac »
        PETITS = {'de', 'du', 'des', 'la', 'le', 'les', 'et', 'à', 'au', 'aux', 'en', 'sur', 'sous', 'dans'}
        name = ' '.join(w if i and w in PETITS else w[:1].upper() + w[1:] for i, w in enumerate(name.lower().split()))
        name = re.sub(r"\b([DdLl])'(\w)", lambda k: k.group(1).lower() + "'" + k.group(2).upper(), name)
    out.append({'id': x['@id'].rsplit('/', 1)[-1][:13], 'n': re.sub(r'\s+', ' ', name), 'c': ad.get('schema:addressLocality') or lab(city) or '',
                'cp': ad.get('schema:postalCode') or '', 'insee': city.get('insee') or '', 'd': dc, 'r': REG.get(lab(reg) or '', ''),
                'la': la, 'lo': lo, 's': min(r[0] for r in regles), 'e': max(r[1] for r in regles), 'o': [list(r) for r in regles], 'h': [list(r) for r in heures],
                'f': free, 'w': web[0] if web else '', 'org': org.get('schema:legalName') or '', 'u': V(x.get('lastUpdate')) or '', 'src': 'dt'})
# Liens morts relevés par check-sources (404/410) : le marché reste, sans lien vers une page disparue.
MORTS = set(json.load(open(os.path.join(ROOT, 'scripts/liens-morts.json')))['urls'])
for m in out:
    if m['w'] in MORTS: m['w'] = ''
off = json.load(open(os.path.join(ROOT, 'src/data/officiels.json')))
out = [m for m in out if m['insee'] not in {o['insee'] for o in off['marches'] if o.get('remplace')}] + off['marches']
out.sort(key=lambda m: (m['r'], m['d'], m['c'], m['n']))
comm = json.load(open(COMM))
# Communes qui ont une page sans atteindre 20 000 habitants : elles servent aussi de point de départ.
PAGES_COMMUNES = {'68162', '68277', '68078', '67348'}
villes = sorted(({'n': c['nom'], 'insee': c['code'], 'd': c.get('codeDepartement', ''), 'la': round(c['centre']['coordinates'][1], 4), 'lo': round(c['centre']['coordinates'][0], 4), 'pop': c.get('population') or 0}
                 for c in comm if c.get('centre') and ((c.get('population') or 0) >= 20000 or c['code'] in PAGES_COMMUNES) and not c.get('codeDepartement', '').startswith('97')), key=lambda v: v['n'])
json.dump(out, open(os.path.join(ROOT, 'src/data/marches.json'), 'w'), ensure_ascii=False, separators=(',', ':'))
os.makedirs(os.path.join(ROOT, 'public/data'), exist_ok=True)
LEGER = ('id', 'n', 'c', 'd', 'la', 'lo', 'o', 'h', 'f', 'w')  # ce que lit le chercheur dans le navigateur
json.dump([{k: m[k] for k in LEGER} for m in out], open(os.path.join(ROOT, 'public/data/marches.json'), 'w'), ensure_ascii=False, separators=(',', ':'))
json.dump(villes, open(os.path.join(ROOT, 'src/data/villes.json'), 'w'), ensure_ascii=False, separators=(',', ':'))
dt = [m for m in out if m['src'] == 'dt']
stats = {'export': os.path.basename(SRC), 'lu_le': TODAY, 'evenements': len(g), 'marches': len(out), 'datatourisme': len(dt), 'officiels': len(out) - len(dt),
         'avec_horaires': sum(1 for m in out if any(r[3] for r in m['o']) or m['h']), 'communes': len({m['insee'] for m in out}),
         'gratuits': sum(1 for m in out if m['f'] == 1), 'exclus': dict(exclus), 'annee_corrigee': len(corrige), 'departements': deps, 'villes': len(villes)}
json.dump(stats, open(os.path.join(ROOT, 'src/data/import-stats.json'), 'w'), ensure_ascii=False, indent=1)
print(json.dumps({k: v for k, v in stats.items() if k != 'departements'}, ensure_ascii=False))
