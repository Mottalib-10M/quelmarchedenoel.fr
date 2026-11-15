/**
 * Moteur des marchés de Noël : ouvert ou non un jour donné, créneaux horaires, état à une heure donnée, distance.
 * Une règle = [du, au, jours, ouvre, ferme] : dates ISO incluses, masque des jours (bit 0 = lundi … bit 6 = dimanche,
 * 127 = tous), heures « HH:MM » ou « » quand la fiche ne les donne pas. `o` dit QUAND le marché est ouvert ; `h`
 * (facultatif) donne des horaires saisis à part dans la fiche DATAtourisme quand `o` n'en a pas.
 */
export type Regle = [string, string, number, string, string];
export interface Marche {
  id: string; n: string; c: string; d: string; la: number; lo: number; o: Regle[]; h: Regle[]; f: number | null; w: string;
  cp?: string; insee?: string; r?: string; s?: string; e?: string; org?: string; u?: string; src?: string; source?: string; lu?: string; lieu?: string;
}
export type Creneau = [string, string];

const T0 = Date.UTC(2000, 0, 3); // un lundi
/** Jour de la semaine, 0 = lundi … 6 = dimanche. */
export const jourSemaine = (iso: string) => {
  const [y, m, d] = iso.split('-').map(Number);
  return ((Math.round((Date.UTC(y, m - 1, d) - T0) / 86400000) % 7) + 7) % 7;
};
export const ajouteJours = (iso: string, n: number) => {
  const [y, m, d] = iso.split('-').map(Number);
  return new Date(Date.UTC(y, m - 1, d + n)).toISOString().slice(0, 10);
};
export const ecartJours = (a: string, b: string) => {
  const p = (s: string) => { const [y, m, d] = s.split('-').map(Number); return Date.UTC(y, m - 1, d); };
  return Math.round((p(b) - p(a)) / 86400000);
};
const couvre = (r: Regle, iso: string, wd: number) => r[0] <= iso && iso <= r[1] && ((r[2] >> wd) & 1) === 1;

export function ouvertLe(m: Marche, iso: string): boolean {
  const wd = jourSemaine(iso);
  return m.o.some((r) => couvre(r, iso, wd));
}

/** Créneaux du jour, triés ; [] si la fiche ne publie pas d'horaires pour ce jour (ou si le marché est fermé). */
export function creneaux(m: Marche, iso: string): Creneau[] {
  if (!ouvertLe(m, iso)) return [];
  const wd = jourSemaine(iso);
  const pick = (rs: Regle[]) => rs.filter((r) => r[3] && r[4] && couvre(r, iso, wd)).map((r) => [r[3], r[4]] as Creneau);
  let c = pick(m.o);
  if (!c.length) c = pick(m.h);
  const vus = new Set<string>();
  return c.filter(([a, b]) => { const k = `${a}-${b}`; if (vus.has(k)) return false; vus.add(k); return true; }).sort((a, b) => a[0].localeCompare(b[0]));
}

/** Heure de fermeture la plus tardive du jour (« 21:00 »), ou « » si inconnue. */
export const fermeA = (m: Marche, iso: string) => creneaux(m, iso).reduce((x, [, b]) => (b > x ? b : x), '');

export type Etat = { etat: 'ouvert'; jusqua: string } | { etat: 'plus-tard'; ouvre: string } | { etat: 'termine'; a: string } | { etat: 'ferme' } | { etat: 'inconnu' };
/** État à l'heure « HH:MM » du jour `iso`. */
export function etatA(m: Marche, iso: string, hhmm: string): Etat {
  if (!ouvertLe(m, iso)) return { etat: 'ferme' };
  const c = creneaux(m, iso);
  if (!c.length) return { etat: 'inconnu' };
  const en = c.find(([a, b]) => a <= hhmm && hhmm < (b === '00:00' ? '24:00' : b));
  if (en) return { etat: 'ouvert', jusqua: en[1] };
  const suivant = c.find(([a]) => a > hhmm);
  return suivant ? { etat: 'plus-tard', ouvre: suivant[0] } : { etat: 'termine', a: c[c.length - 1][1] };
}

/** Jours d'ouverture entre deux dates (incluses). */
export function joursOuverts(m: Marche, du: string, au: string): string[] {
  const out: string[] = [];
  for (let d = du; d <= au; d = ajouteJours(d, 1)) if (ouvertLe(m, d)) out.push(d);
  return out;
}
export const premierJour = (m: Marche) => m.o.reduce((x, r) => (r[0] < x ? r[0] : x), '9999');
export const dernierJour = (m: Marche) => m.o.reduce((x, r) => (r[1] > x ? r[1] : x), '0000');

/** Distance à vol d'oiseau, en km (haversine, rayon terrestre 6 371 km). */
export function distanceKm(a: { la: number; lo: number }, b: { la: number; lo: number }): number {
  const R = 6371, rad = Math.PI / 180;
  const dLa = (b.la - a.la) * rad, dLo = (b.lo - a.lo) * rad;
  const h = Math.sin(dLa / 2) ** 2 + Math.cos(a.la * rad) * Math.cos(b.la * rad) * Math.sin(dLo / 2) ** 2;
  return 2 * R * Math.asin(Math.min(1, Math.sqrt(h)));
}

export type Filtre = 'tous' | 'soir' | 'gratuit' | 'horaires';
export interface Resultat { m: Marche; km: number; c: Creneau[] }
/** Marchés ouverts le jour `iso` à moins de `rayon` km du point, triés par distance. `soir` : ferme à 20 h ou plus tard. */
export function cherche(liste: Marche[], centre: { la: number; lo: number }, rayon: number, iso: string, filtre: Filtre = 'tous'): Resultat[] {
  const out: Resultat[] = [];
  for (const m of liste) {
    const km = distanceKm(centre, m);
    if (km > rayon || !ouvertLe(m, iso)) continue;
    const c = creneaux(m, iso);
    if (filtre === 'soir' && !c.some(([, b]) => b >= '20:00' || b < '06:00')) continue;
    if (filtre === 'gratuit' && m.f !== 1) continue;
    if (filtre === 'horaires' && !c.length) continue;
    out.push({ m, km, c });
  }
  return out.sort((a, b) => a.km - b.km || a.m.n.localeCompare(b.m.n));
}

/**
 * Le marché à mettre en avant le jour même à `hhmm` : le plus proche qui n'a pas fini sa journée (ouvert, ouvre plus
 * tard ou horaires inconnus). `ferme` : le plus proche, sauté parce qu'il a déjà fermé. Tous fermés : le plus proche.
 * Testeurs naïfs du 2026-11-14 (tour 2) : l'accueil mettait en avant Mutzig, fermé, avant Wintershouse, ouvert.
 */
export function enAvant(res: Resultat[], iso: string, hhmm: string): { r?: Resultat; ferme?: Resultat } {
  const r = res.find((x) => etatA(x.m, iso, hhmm).etat !== 'termine') ?? res[0];
  return { r, ferme: r && r !== res[0] ? res[0] : undefined };
}

/**
 * Où en est un marché (ou un groupe de marchés : les places de Colmar) le jour `iso`, parmi les jours proposés.
 * Testeurs naïfs du 2026-11-14 : avant l'ouverture, la page de ville affichait « Aucun » sans dire quand le marché
 * ouvre. `avant` : pas encore ouvert, ouvre le `le` ; `ferme` : fermé ce jour-là, rouvre le `le` ; `fini` : dernier
 * jour d'ouverture `le` passé ; `ouvert`.
 */
export type Saison = { etat: 'ouvert' } | { etat: 'avant'; le: string } | { etat: 'ferme'; le: string } | { etat: 'fini'; le: string } | { etat: 'inconnu' };
export function saisonDe(ms: Marche[], iso: string, jours: string[]): Saison {
  const ouv = (d: string) => ms.some((m) => ouvertLe(m, d));
  if (ouv(iso)) return { etat: 'ouvert' };
  const ouverts = jours.filter(ouv);
  if (!ouverts.length) return { etat: 'inconnu' };
  const apres = ouverts.find((d) => d > iso);
  if (!apres) return { etat: 'fini', le: ouverts[ouverts.length - 1] };
  return ouverts[0] > iso ? { etat: 'avant', le: apres } : { etat: 'ferme', le: apres };
}
/** Même question pour une zone : premier jour, après `iso`, où au moins un marché de la recherche est ouvert. */
export function prochainJourZone(liste: Marche[], centre: { la: number; lo: number }, rayon: number, iso: string, jours: string[], filtre: Filtre = 'tous'): Saison {
  const zone = liste.filter((m) => distanceKm(centre, m) <= rayon);
  const ok = (d: string) => cherche(zone, centre, rayon, d, filtre).length > 0;
  if (ok(iso)) return { etat: 'ouvert' };
  const ouverts = jours.filter(ok);
  if (!ouverts.length) return { etat: 'inconnu' };
  const apres = ouverts.find((d) => d > iso);
  if (!apres) return { etat: 'fini', le: ouverts[ouverts.length - 1] };
  return ouverts[0] > iso ? { etat: 'avant', le: apres } : { etat: 'ferme', le: apres };
}
