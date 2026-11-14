/** Données du site : marchés (DATAtourisme + pages officielles), villes de départ, régions, départements, saison. */
import RAW from '../data/marches.json';
import VILLES_RAW from '../data/villes.json';
import STATS from '../data/import-stats.json';
import { creneaux, distanceKm, ouvertLe, premierJour, dernierJour, ajouteJours, jourSemaine, type Marche } from './engine/marches';
import type { Lang } from './format';

export const MARCHES = RAW as unknown as Marche[];
export interface Ville { n: string; insee: string; d: string; la: number; lo: number; pop: number }
export const VILLES = VILLES_RAW as Ville[];
export { STATS };
/** Jour de lecture de l'export DATAtourisme (et des pages officielles). */
export const LU_LE = STATS.lu_le;
/** Premier et dernier jour proposés dans les listes de dates. */
export const SAISON = { debut: LU_LE, fin: '2027-01-10' };
/** Jour montré au premier rendu : le premier samedi de l'Avent 2026, jour où le plus de marchés sont ouverts. */
export const JOUR_REPERE = '2026-11-28';

export const REGIONS: Array<{ id: string; fr: string; en: string; deps: string[] }> = [
  { id: 'grand-est', fr: 'Grand Est', en: 'Grand Est', deps: ['67', '68', '57', '54', '55', '88', '51', '08', '10', '52'] },
  { id: 'nouvelle-aquitaine', fr: 'Nouvelle-Aquitaine', en: 'Nouvelle-Aquitaine', deps: ['16', '17', '19', '23', '24', '33', '40', '47', '64', '79', '86', '87'] },
  { id: 'occitanie', fr: 'Occitanie', en: 'Occitanie', deps: ['09', '11', '12', '30', '31', '32', '34', '46', '48', '65', '66', '81', '82'] },
  { id: 'pays-de-la-loire', fr: 'Pays de la Loire', en: 'Pays de la Loire', deps: ['44', '49', '53', '72', '85'] },
  { id: 'normandie', fr: 'Normandie', en: 'Normandy', deps: ['14', '27', '50', '61', '76'] },
  { id: 'centre-val-de-loire', fr: 'Centre-Val de Loire', en: 'Centre-Val de Loire', deps: ['18', '28', '36', '37', '41', '45'] },
  { id: 'auvergne-rhone-alpes', fr: 'Auvergne-Rhône-Alpes', en: 'Auvergne-Rhône-Alpes', deps: ['01', '03', '07', '15', '26', '38', '42', '43', '63', '69', '73', '74'] },
  { id: 'bourgogne-franche-comte', fr: 'Bourgogne-Franche-Comté', en: 'Bourgogne-Franche-Comté', deps: ['21', '25', '39', '58', '70', '71', '89', '90'] },
  { id: 'bretagne', fr: 'Bretagne', en: 'Brittany', deps: ['22', '29', '35', '56'] },
  { id: 'hauts-de-france', fr: 'Hauts-de-France', en: 'Hauts-de-France', deps: ['02', '59', '60', '62', '80'] },
  { id: 'paca', fr: "Provence-Alpes-Côte d'Azur", en: "Provence-Alpes-Côte d'Azur", deps: ['04', '05', '06', '13', '83', '84'] },
  { id: 'ile-de-france', fr: 'Île-de-France', en: 'Île-de-France', deps: ['75', '77', '78', '91', '92', '93', '94', '95'] },
  { id: 'corse', fr: 'Corse', en: 'Corsica', deps: ['2A', '2B'] },
];
/** Noms des départements de l'export, plus le Nord, où seul le marché de Lille (page de la Ville) figure. */
export const DEPS = { ...(STATS.departements as Record<string, string>), '59': 'Nord' } as Record<string, string>;
export const depNom = (d: string) => DEPS[d] ?? d;
export const region = (id: string) => REGIONS.find((r) => r.id === id)!;
export const marchesRegion = (id: string) => MARCHES.filter((m) => m.r === id);
export const marchesDeps = (deps: string[]) => MARCHES.filter((m) => deps.includes(m.d));
export const ville = (nom: string) => { const v = VILLES.find((x) => x.n === nom); if (!v) throw new Error(`ville inconnue : ${nom}`); return v; };
export const autour = (c: { la: number; lo: number }, km: number, liste = MARCHES) => liste.filter((m) => distanceKm(c, m) <= km);
export const dansCommune = (insee: string) => MARCHES.filter((m) => m.insee === insee);

/** Ce que lit le moteur de recherche dans le navigateur (mêmes clés que public/data/marches.json). */
export const leger = (l: Marche[]) => l.map(({ id, n, c, d, la, lo, o, h, f, w }) => ({ id, n, c, d, la, lo, o, h, f, w }));
/** Villes de départ proposées : celles de la zone, plus les grandes villes si `toutes`. */
export const villesProches = (c: { la: number; lo: number }, km: number) => VILLES.filter((v) => distanceKm(c, v) <= km);

export const jours = (du = SAISON.debut, au = SAISON.fin) => { const o: string[] = []; for (let d = du; d <= au; d = ajouteJours(d, 1)) o.push(d); return o; };
export const ouvertsLe = (l: Marche[], iso: string) => l.filter((m) => ouvertLe(m, iso));
export const avecHoraires = (l: Marche[]) => l.filter((m) => m.o.some((r) => r[3]) || m.h.length > 0);
export const nocturne = (m: Marche, iso: string) => creneaux(m, iso).some(([, b]) => b >= '20:00' || b === '00:00');
export { premierJour, dernierJour, jourSemaine };

export { jourCourt, jourLong, jourMois, heure, plage } from './dates';
