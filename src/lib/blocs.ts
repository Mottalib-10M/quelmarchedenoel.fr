/** Blocs de données des pages (tableaux et comptes), tirés de marches.json : aucun chiffre tapé à la main. */
import { table, ext } from './table';
import { MARCHES, SAISON, jours, depNom, region, ville as villeDe, VILLES, jourMois, jourCourt, plage } from './data';
import { creneaux, distanceKm, ouvertLe, jourSemaine, joursOuverts, type Marche } from './engine/marches';
import { formatNumber, type Lang } from './format';

const T = (l: Lang, fr: string, en: string) => (l === 'fr' ? fr : en);
const n = (x: number, l: Lang) => formatNumber(x, 0, l);
const nom = (m: Marche) => (m.w ? ext(m.w, m.n) : m.n);
export const joursSaison = (m: Marche) => joursOuverts(m, SAISON.debut, SAISON.fin);
const premier = (m: Marche) => joursSaison(m)[0] ?? m.o[0][0];
const dernier = (m: Marche) => { const j = joursSaison(m); return j[j.length - 1] ?? m.o[0][1]; };
/** « 20 novembre au 30 décembre », ou « 6 décembre » pour un seul jour (testeurs du 2026-11-14 : « 6 décembre au 6 décembre »). */
const periode = (m: Marche, l: Lang) => { const a = premier(m), b = dernier(m); return a === b ? jourMois(a, l) : `${jourMois(a, l)} ${T(l, 'au', 'to')} ${jourMois(b, l)}`; };
/** Horaires du premier samedi ouvert (ou du premier jour ouvert), avec ce jour. */
function horairesType(m: Marche, l: Lang): string {
  const j = joursSaison(m); const sam = j.find((d) => jourSemaine(d) === 5) ?? j[0];
  if (!sam) return T(l, 'non publiés', 'not published');
  const c = creneaux(m, sam);
  return c.length ? `${plage(c, l)} (${jourCourt(sam, l).toLowerCase()})` : T(l, 'non publiés', 'not published');
}
const parJours = (a: Marche, b: Marche) => joursSaison(b).length - joursSaison(a).length || a.n.localeCompare(b.n);

// ── Listes ────────────────────────────────────────────────────────────────
export const commune = (insee: string) => MARCHES.filter((m) => m.insee === insee);
export const rayon = (insee: string, km: number) => { const v = VILLES.find((x) => x.insee === insee)!; return MARCHES.filter((m) => distanceKm(v, m) <= km); };
export const deRegion = (id: string) => { const r = region(id); return MARCHES.filter((m) => r.deps.includes(m.d)); };
export const deDeps = (deps: string[]) => MARCHES.filter((m) => deps.includes(m.d));
export const ouverts = (l: Marche[], iso: string) => l.filter((m) => ouvertLe(m, iso));
export const avecHoraires = (l: Marche[]) => l.filter((m) => joursSaison(m).some((d) => creneaux(m, d).length));
export const ouvertsApres = (l: Marche[], iso: string) => l.filter((m) => joursSaison(m).some((d) => d >= iso));
export const nocturnes = (l: Marche[], h = '21:00') => l.filter((m) => joursSaison(m).some((d) => creneaux(m, d).some(([, b]) => b >= h || b === '00:00' || b === '01:00')));
export const unJour = (l: Marche[]) => l.filter((m) => joursSaison(m).length === 1);
export const longs = (l: Marche[], min = 20) => l.filter((m) => joursSaison(m).length >= min);
export const gratuits = (l: Marche[]) => l.filter((m) => m.f === 1);
export const communes = (l: Marche[]) => new Set(l.map((m) => m.insee || m.c)).size;
export const nb = (l: Marche[], lang: Lang) => n(l.length, lang);

// ── Tableaux ──────────────────────────────────────────────────────────────
export function tabMarches(l: Marche[], lang: Lang, cap?: string, max = 40) {
  const rows = [...l].sort(parJours).slice(0, max).map((m) => [nom(m), m.c, periode(m, lang), n(joursSaison(m).length, lang), horairesType(m, lang)]);
  return table([T(lang, 'Marché', 'Market'), T(lang, 'Commune', 'Town'), T(lang, 'Dates', 'Dates'), T(lang, 'Jours d\'ouverture', 'Days open'), T(lang, 'Horaires (exemple d\'un samedi)', 'Hours (a sample Saturday)')], rows, cap, ['l', 'l', 'l', 'r', 'l'], lang);
}
export function tabAutour(insee: string, km: number, lang: Lang, max = 12, cap?: string) {
  const v = VILLES.find((x) => x.insee === insee)!;
  const l = MARCHES.filter((m) => m.insee !== insee && distanceKm(v, m) <= km).sort(parJours).slice(0, max);
  const rows = l.map((m) => [nom(m), m.c, `${n(distanceKm(v, m), lang)} km`, periode(m, lang), n(joursSaison(m).length, lang)]);
  return table([T(lang, 'Marché', 'Market'), T(lang, 'Commune', 'Town'), T(lang, 'Distance', 'Distance'), T(lang, 'Dates', 'Dates'), T(lang, 'Jours', 'Days')], rows, cap, ['l', 'l', 'r', 'l', 'r'], lang);
}
export const WEEKENDS = [['2026-11-21', '2026-11-22'], ['2026-11-28', '2026-11-29'], ['2026-12-05', '2026-12-06'], ['2026-12-12', '2026-12-13'], ['2026-12-19', '2026-12-20']] as const;
export function tabWeekends(l: Marche[], lang: Lang, cap?: string) {
  const rows = WEEKENDS.map(([s, d]) => [`${jourMois(s, lang)} ${T(lang, 'et', 'and')} ${jourMois(d, lang)}`, n(ouverts(l, s).length, lang), n(ouverts(l, d).length, lang), n(l.filter((m) => ouvertLe(m, s) || ouvertLe(m, d)).length, lang)]);
  return table([T(lang, 'Week-end', 'Weekend'), T(lang, 'Ouverts le samedi', 'Open on Saturday'), T(lang, 'Ouverts le dimanche', 'Open on Sunday'), T(lang, 'Au moins un des deux jours', 'At least one of the two days')], rows, cap, ['l', 'r', 'r', 'r'], lang);
}
export function tabDeps(deps: string[], lang: Lang, cap?: string) {
  const rows = deps.map((d) => { const l = deDeps([d]); return [`${depNom(d)} (${d})`, l.length, avecHoraires(l).length, ouverts(l, '2026-11-28').length, ouverts(l, '2026-12-12').length, ouvertsApres(l, '2026-12-26').length]; })
    .filter((r) => (r[1] as number) > 0).sort((a, b) => (b[1] as number) - (a[1] as number));
  return table([T(lang, 'Département', 'Département'), T(lang, 'Marchés', 'Markets'), T(lang, 'Avec horaires', 'With hours'), T(lang, 'Ouverts le 28 nov.', 'Open 28 Nov'), T(lang, 'Ouverts le 12 déc.', 'Open 12 Dec'), T(lang, 'Ouverts après Noël', 'Open after Christmas')], rows, cap, ['l', 'r', 'r', 'r', 'r', 'r'], lang);
}
export function tabJour(l: Marche[], iso: string, lang: Lang, max = 30, cap?: string) {
  const o = ouverts(l, iso).sort(parJours).slice(0, max);
  const rows = o.map((m) => [nom(m), `${m.c} (${m.d})`, creneaux(m, iso).length ? plage(creneaux(m, iso), lang) : T(lang, 'non publiés', 'not published')]);
  return table([T(lang, 'Marché', 'Market'), T(lang, 'Commune', 'Town'), T(lang, 'Horaires ce jour-là', 'Hours that day')], rows, cap, ['l', 'l', 'l'], lang);
}
export { n as nombre, jours, villeDe, depNom, jourMois };
