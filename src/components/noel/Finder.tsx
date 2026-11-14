/**
 * Chercheur de marchés de Noël : une ville de départ (ou la position de l'appareil), un jour, un rayon, un filtre.
 * Rend le nombre de marchés ouverts ce jour-là, le plus proche, et la liste avec horaires du jour et itinéraire.
 * Premier rendu = valeurs de la page (jour repère fixe) ; la date de l'appareil et l'URL ne sont lues qu'après le
 * montage (RECETTE §17.5). La position ne quitte pas l'appareil : la distance est calculée dans le navigateur.
 */
import { useEffect, useMemo, useState } from 'react';
import SelectField from '../ui/SelectField';
import { ResultCard, Rows, ShareRow } from '../calc/parts';
import { cherche, distanceKm, etatA, saisonDe, prochainJourZone, ecartJours, type Filtre, type Marche, type Saison } from '../../lib/engine/marches';
import { jourCourt, jourLong, heure, plage } from '../../lib/dates';
import { readParams, updateURL } from '../../lib/url-state';
import { t } from '../../i18n/ui';
import type { Lang } from '../../lib/format';

export interface VilleOpt { k: string; n: string; la: number; lo: number }
interface Props {
  lang: Lang; marches: Marche[]; villes: VilleOpt[]; ville: string; rayon?: number; jour: string; filtre?: Filtre;
  /** Jours proposés (ISO) ; le premier rendu montre `jour`. */
  jours: string[];
  /** Si vrai : après le montage, le jour de l'appareil remplace `jour` quand il est dans la saison. */
  aujourdhui?: boolean;
  /** Adresse du fichier complet, chargé quand la ville choisie sort de la zone de la page. */
  complet?: string;
  /** Rayon (km) couvert par `marches` autour de chaque ville proposée. */
  zone?: number;
  methodHref?: string; idPrefix?: string; titre?: string;
  /** Le marché de la page (pages de ville) : son état le jour choisi passe avant le compte (testeurs du 2026-11-14). */
  vedette?: { m: Marche[]; nom: string; pl: boolean };
}
const MAX = 25;
const lokal = () => { const d = new Date(); return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`; };
const maintenant = () => { const d = new Date(); return `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`; };

export default function Finder({ lang, marches, villes, ville: v0, rayon: r0 = 30, jour: j0, filtre: f0 = 'tous', jours, aujourdhui = true, complet, zone = 0, methodHref, idPrefix = 'f', titre, vedette }: Props) {
  const ui = t(lang), T = (fr: string, en: string) => (lang === 'fr' ? fr : en);
  const nf = new Intl.NumberFormat(lang === 'fr' ? 'fr-FR' : 'en-GB', { maximumFractionDigits: 0 });
  // Le rayon de la page (15 km à Kaysersberg) figure dans la liste : le champ n'est jamais vide (testeurs du 2026-11-14).
  const RAYONS = [...new Set([10, 20, 30, 50, 80, r0])].sort((a, b) => a - b);
  const [liste, setListe] = useState<Marche[]>(marches);
  const [ville, setVille] = useState(v0);
  const [pos, setPos] = useState<{ la: number; lo: number } | null>(null);
  const [geoMsg, setGeoMsg] = useState('');
  const [jour, setJour] = useState(j0);
  const [rayon, setRayon] = useState(r0);
  const [filtre, setFiltre] = useState<Filtre>(f0);
  const [today, setToday] = useState('');
  const [now, setNow] = useState('');
  const [tous, setTous] = useState(false);
  useEffect(() => {
    const d = lokal(); setToday(d); setNow(maintenant());
    const u = readParams(window.location.search);
    const vv = u.get('ville'); if (vv && villes.some((x) => x.k === vv)) setVille(vv);
    const jj = u.get('jour'); if (jj && jours.includes(jj)) setJour(jj); else if (aujourdhui && jours.includes(d)) setJour(d);
    const rr = Number(u.get('rayon')); if (RAYONS.includes(rr)) setRayon(rr);
    const ff = u.get('filtre'); if (ff && ['tous', 'soir', 'gratuit', 'horaires'].includes(ff)) setFiltre(ff as Filtre);
    const id = setInterval(() => setNow(maintenant()), 60000);
    return () => clearInterval(id);
  }, []);
  useEffect(() => updateURL({ ville: pos ? undefined : ville, jour, rayon, filtre }), [ville, jour, rayon, filtre, pos]);
  const vObj = villes.find((x) => x.k === ville) ?? villes[0];
  const centre = pos ?? vObj;
  const v0Obj = villes.find((x) => x.k === v0) ?? villes[0];
  // Hors de la zone livrée avec la page : on charge le fichier complet (une fois).
  useEffect(() => {
    if (!complet || liste !== marches) return;
    const change = pos || ville !== v0 || rayon > r0;
    if (change && (zone === 0 || distanceKm(centre, v0Obj) + rayon > zone)) {
      fetch(complet).then((r) => r.json()).then((all: Marche[]) => setListe(all)).catch(() => setGeoMsg(T('Liste complète indisponible : seuls les marchés de cette page sont comptés.', 'Full list unavailable: only this page\'s markets are counted.')));
    }
  }, [ville, rayon, pos]);
  const res = useMemo(() => cherche(liste, centre, rayon, jour, filtre), [liste, centre, rayon, jour, filtre]);
  const ou = pos ? T('de votre position', 'your location') : vObj.n;
  const estAuj = today !== '' && jour === today;
  const soirN = res.filter((r) => r.c.some(([, b]) => b >= '20:00' || b === '00:00')).length;
  const horN = res.filter((r) => r.c.length).length;
  const p = res[0];
  const maj = (x: string) => x.charAt(0).toUpperCase() + x.slice(1);
  // Avant l'ouverture, entre deux jours ou après la fermeture : dire quand le marché de la page ouvre (ou, sans marché
  // de page, le prochain jour avec un marché dans la zone) au lieu d'un « Aucun » sans suite.
  const sv: Saison | null = useMemo(() => (vedette ? saisonDe(vedette.m, jour, jours) : null), [vedette, jour]);
  const sz: Saison | null = useMemo(() => (!vedette && res.length === 0 ? prochainJourZone(liste, centre, rayon, jour, jours, filtre) : null), [vedette, res.length, liste, centre, rayon, jour, filtre]);
  const dans = (d: string) => { const n = today ? ecartJours(today, d) : 0; return n > 0 ? T(`, dans ${nf.format(n)} jour${n > 1 ? 's' : ''}`, `, in ${nf.format(n)} day${n > 1 ? 's' : ''}`) : ''; };
  const pl = vedette?.pl ?? false;
  let cible = '';
  const geo = () => {
    if (!navigator.geolocation) { setGeoMsg(T('Votre navigateur ne donne pas de position.', 'Your browser gives no location.')); return; }
    setGeoMsg(T('Recherche de votre position…', 'Finding your location…'));
    navigator.geolocation.getCurrentPosition((g) => { setPos({ la: g.coords.latitude, lo: g.coords.longitude }); setGeoMsg(T('Position utilisée sur cet appareil seulement, rien n\'est envoyé.', 'Location used on this device only, nothing is sent.')); },
      () => setGeoMsg(T('Position refusée ou indisponible : choisissez une ville.', 'Location refused or unavailable: pick a town.')), { timeout: 10000, maximumAge: 600000 });
  };
  const etatTxt = (m: Marche) => {
    if (!estAuj || !now) return '';
    const e = etatA(m, jour, now);
    if (e.etat === 'ouvert') return T(`Ouvert jusqu'à ${heure(e.jusqua, lang)}`, `Open until ${e.jusqua}`);
    if (e.etat === 'plus-tard') return T(`Ouvre à ${heure(e.ouvre, lang)}`, `Opens at ${e.ouvre}`);
    if (e.etat === 'termine') return T('Fermé pour aujourd\'hui', 'Closed for today');
    return '';
  };
  const label = T(`Marchés de Noël ouverts le ${jourLong(jour, lang)}, à moins de ${rayon} km ${pos ? 'de vous' : `de ${vObj.n}`}`, `Christmas markets open on ${jourLong(jour, lang)}, within ${rayon} km of ${pos ? 'you' : vObj.n}`);
  let value = res.length ? T(`${nf.format(res.length)} marché${res.length > 1 ? 's' : ''}`, `${nf.format(res.length)} market${res.length > 1 ? 's' : ''}`) : T('Aucun', 'None');
  let sub = p
    ? [T(`Le plus proche : ${p.m.n} (${p.m.c}), à ${nf.format(p.km)} km`, `Nearest: ${p.m.n} (${p.m.c}), ${nf.format(p.km)} km away`),
       p.c.length ? T(`Horaires ce jour-là : ${plage(p.c, lang)}`, `Hours that day: ${plage(p.c, lang)}`) : T('Horaires non publiés dans la fiche', 'Hours not published in the listing'),
       estAuj && etatTxt(p.m) ? T(`Maintenant : ${etatTxt(p.m).toLowerCase()}`, `Right now: ${etatTxt(p.m).toLowerCase()}`) : ''].filter(Boolean).join('\n')
    : '';
  let labelR = label;
  const autres = res.length ? T(`Ce jour-là, ${nf.format(res.length)} autre${res.length > 1 ? 's' : ''} marché${res.length > 1 ? 's' : ''} ouvert${res.length > 1 ? 's' : ''} à moins de ${rayon} km : voir la liste ci-dessous.`, `That day, ${nf.format(res.length)} other market${res.length > 1 ? 's are' : ' is'} open within ${rayon} km: see the list below.`) : '';
  if (vedette && sv && sv.etat !== 'ouvert' && sv.etat !== 'inconnu') {
    labelR = T(`${maj(vedette.nom)}, le ${jourLong(jour, lang)}`, `${maj(vedette.nom)}, ${jourLong(jour, lang)}`);
    if (sv.etat === 'avant') {
      value = T(pl ? 'Pas encore ouverts' : 'Pas encore ouvert', 'Not open yet');
      sub = [T(`${maj(vedette.nom)} ${pl ? 'ouvrent' : 'ouvre'} le ${jourLong(sv.le, lang)}${dans(sv.le)}.`, `${maj(vedette.nom)} ${pl ? 'open' : 'opens'} on ${jourLong(sv.le, lang)}${dans(sv.le)}.`), autres].filter(Boolean).join('\n');
      cible = sv.le;
    } else if (sv.etat === 'ferme') {
      value = T(pl ? 'Fermés ce jour-là' : 'Fermé ce jour-là', 'Closed that day');
      sub = [T(`${maj(vedette.nom)} ${pl ? 'rouvrent' : 'rouvre'} le ${jourLong(sv.le, lang)}.`, `${maj(vedette.nom)} ${pl ? 'reopen' : 'reopens'} on ${jourLong(sv.le, lang)}.`), autres].filter(Boolean).join('\n');
      cible = sv.le;
    } else {
      value = T('Saison terminée', 'Season over');
      sub = [T(`${maj(vedette.nom)} ${pl ? 'ont' : 'a'} fermé après le ${jourLong(sv.le, lang)}.`, `${maj(vedette.nom)} closed after ${jourLong(sv.le, lang)}.`), autres].filter(Boolean).join('\n');
    }
  } else if (!res.length && sz) {
    const ici = pos ? T('de vous', 'you') : vObj.n;
    if (sz.etat === 'avant') {
      value = T('Pas encore ouvert', 'Not open yet');
      sub = T(`Le premier marché de Noël à moins de ${rayon} km de ${ici} ouvre le ${jourLong(sz.le, lang)}${dans(sz.le)}.`, `The first Christmas market within ${rayon} km of ${ici} opens on ${jourLong(sz.le, lang)}${dans(sz.le)}.`);
      cible = sz.le;
    } else if (sz.etat === 'ferme') {
      sub = T(`Le prochain jour avec un marché ouvert à moins de ${rayon} km : le ${jourLong(sz.le, lang)}.`, `Next day with a market open within ${rayon} km: ${jourLong(sz.le, lang)}.`);
      cible = sz.le;
    } else if (sz.etat === 'fini') {
      value = T('Saison terminée', 'Season over');
      sub = T(`Le dernier marché ouvert à moins de ${rayon} km de ${ici} a fermé après le ${jourLong(sz.le, lang)}.`, `The last market open within ${rayon} km of ${ici} closed after ${jourLong(sz.le, lang)}.`);
    } else {
      sub = T(`Aucun marché de Noël connu à moins de ${rayon} km : essayez une distance plus grande.`, `No known Christmas market within ${rayon} km: try a longer distance.`);
    }
  }
  const opts = (a: Array<[string | number, string]>) => a.map(([value, label]) => ({ value: String(value), label }));
  const lignes = tous ? res : res.slice(0, MAX);
  return (
    <div className="rounded-xl border border-navy-200 bg-white p-4 sm:p-5">
      {titre && <p className="mb-3 text-lg font-bold text-navy-900">{titre}</p>}
      <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(0,23rem)]">
        <form className="grid content-start grid-cols-1 gap-x-4 gap-y-3 sm:grid-cols-2" onSubmit={(e) => e.preventDefault()}>
          <button type="button" onClick={geo} aria-pressed={!!pos} className={`sm:col-span-2 inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border-2 px-4 py-2 text-sm font-semibold ${pos ? 'border-accent-700 bg-accent-700 text-white' : 'border-accent-500 bg-white text-accent-700 hover:bg-accent-50'}`}>
            <svg className="h-4 w-4 shrink-0" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path fillRule="evenodd" d="M10 18s6-5.2 6-10A6 6 0 0 0 4 8c0 4.8 6 10 6 10Zm0-7.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z" clipRule="evenodd" /></svg>
            {pos ? T('Autour de moi : position utilisée', 'Around me: location in use') : T('Autour de moi (ou choisissez une ville ci-dessous)', 'Around me (or pick a town below)')}
          </button>
          <SelectField id={`${idPrefix}-ville`} label={T('Point de départ', 'Starting point')} value={pos ? '_pos' : ville}
            onChange={(v) => { if (v === '_pos') geo(); else { setPos(null); setVille(v); setGeoMsg(''); } }}
            options={[...opts(villes.map((x) => [x.k, x.n])), { value: '_pos', label: T('Ma position (sur cet appareil)', 'My location (on this device)') }]} />
          <SelectField id={`${idPrefix}-jour`} label={T('Jour de la visite', 'Day of your visit')} value={jour} onChange={setJour}
            options={opts(jours.map((d) => [d, `${jourCourt(d, lang)}${d === today ? T(' (aujourd\'hui)', ' (today)') : ''}`]))} />
          <SelectField id={`${idPrefix}-rayon`} label={T('Distance maximale', 'Maximum distance')} value={String(rayon)} onChange={(v) => setRayon(Number(v))}
            options={opts(RAYONS.map((k) => [k, T(`${k} km à vol d'oiseau`, `${k} km as the crow flies`)]))} />
          <SelectField id={`${idPrefix}-filtre`} label={T('Quels marchés montrer', 'Which markets to show')} value={filtre} onChange={(v) => setFiltre(v as Filtre)}
            options={opts([['tous', T('Tous les marchés ouverts ce jour-là', 'All markets open that day')], ['soir', T('Ouverts jusqu\'à 20 h ou plus tard', 'Open until 8pm or later')], ['gratuit', T('Entrée gratuite indiquée', 'Free entry stated')], ['horaires', T('Avec horaires publiés', 'With published hours')]])} />
          {geoMsg && <p className="sm:col-span-2 text-xs text-navy-600" role="status">{geoMsg}</p>}
        </form>
        <ResultCard label={labelR} value={value} sub={sub}>
          {cible && <button type="button" data-voir-jour onClick={() => setJour(cible)} className="mt-3 inline-flex min-h-11 items-center rounded-lg bg-accent-700 px-4 py-2 text-sm font-semibold text-white hover:bg-accent-800">{T(`Voir le ${jourLong(cible, lang).replace(/ \d{4}$/, '')}`, `Show ${jourLong(cible, lang).replace(/ \d{4}$/, '')}`)}</button>}
          {res.length > 0 && <Rows rows={[
            [T('Ouverts jusqu\'à 20 h ou plus', 'Open until 8pm or later'), nf.format(soirN)],
            [T('Avec horaires publiés', 'With published hours'), nf.format(horN)],
            [T('Point de départ', 'Starting point'), ou],
          ]} />}
          <ShareRow methodHref={methodHref} labels={ui} />
        </ResultCard>
      </div>
      {res.length > 0 && (
        <div className="mt-4 overflow-x-auto">
          {/* Sous 768 px, une fiche par marché (classe .empile, data-label) : la colonne des horaires était coupée (testeurs du 2026-11-14). */}
          <table className="empile w-full text-sm">
            <caption className="mb-2 text-left text-sm text-navy-700">{T(`${jourLong(jour, lang)} : marchés ouverts autour ${pos ? 'de vous' : `de ${vObj.n}`}, du plus proche au plus loin`, `${jourLong(jour, lang)}: markets open around ${pos ? 'you' : vObj.n}, nearest first`)}<span className="mt-1 block text-xs text-navy-600">{T('Nom souligné : lien vers la page du marché, quand sa fiche en donne une. « Itinéraire » ouvre le trajet sur une carte.', 'Underlined name: link to the market\'s page, when its listing gives one. "Directions" opens the route on a map.')}</span></caption>
            <thead><tr>{[T('Marché', 'Market'), T('Commune', 'Town'), T('Distance', 'Distance'), T('Horaires ce jour-là', 'Hours that day'), T('Itinéraire', 'Directions')].map((h) => <th key={h} scope="col" className="border-b border-navy-300 px-2 py-1.5 text-left font-semibold text-navy-900">{h}</th>)}</tr></thead>
            <tbody>{lignes.map((r) => { const e = etatTxt(r.m); return (
              <tr key={r.m.id}>
                <td data-label={T('Marché', 'Market')} className="border-b border-navy-100 px-2 py-1.5 text-navy-900">{r.m.w ? <a href={r.m.w} target="_blank" rel="nofollow noopener noreferrer" className="text-accent-700 underline">{r.m.n}</a> : r.m.n}{r.m.f === 1 ? <span className="ml-1 text-xs text-navy-600">{T('· gratuit', '· free')}</span> : null}</td>
                <td data-label={T('Commune', 'Town')} className="border-b border-navy-100 px-2 py-1.5 text-navy-800">{r.m.c}</td>
                <td data-label={T('Distance', 'Distance')} className="tabular-nums whitespace-nowrap border-b border-navy-100 px-2 py-1.5 text-navy-800">{nf.format(r.km)} km</td>
                <td data-label={T('Horaires ce jour-là', 'Hours that day')} className="border-b border-navy-100 px-2 py-1.5 text-navy-800"><span>{r.c.length ? plage(r.c, lang) : T('non publiés', 'not published')}{e ? <span className="block text-xs font-semibold text-accent-700">{e}</span> : null}</span></td>
                <td data-label={T('Itinéraire', 'Directions')} className="border-b border-navy-100 px-2 py-1.5"><a href={`https://www.openstreetmap.org/directions?to=${r.m.la}%2C${r.m.lo}`} target="_blank" rel="nofollow noopener noreferrer" className="text-accent-700 underline">{T('Itinéraire', 'Directions')}</a></td>
              </tr>); })}</tbody>
          </table>
          {res.length > MAX && !tous && <button type="button" onClick={() => setTous(true)} className="mt-2 text-sm font-medium text-accent-700 underline">{T(`Voir les ${nf.format(res.length)} marchés`, `Show all ${nf.format(res.length)} markets`)}</button>}
        </div>
      )}
    </div>
  );
}
