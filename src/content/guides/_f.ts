/** Raccourcis des fichiers de contenu (non chargé comme page : préfixe _). Tout nombre vient des données. */
import * as B from '../../lib/blocs';
import { STATS, jourLong, jourMois } from '../../lib/data';
import { creneaux, type Marche } from '../../lib/engine/marches';
import { plage } from '../../lib/dates';
import { formatNumber } from '../../lib/format';
export type L = 'fr' | 'en';
export { B, STATS };
export const N = (x: number, l: L) => formatNumber(x, 0, l);
/** Nombre de marchés d'une liste, écrit dans la langue. */
export const C = (l: Array<unknown>, lang: L) => formatNumber(l.length, 0, lang);
export const jl = (iso: string, l: L) => jourLong(iso, l);
export const jm = (iso: string, l: L) => jourMois(iso, l);
/** Horaires d'un marché un jour donné, ou « non publiés ». */
export const h = (m: Marche | undefined, iso: string, l: L) => { if (!m) return ''; const c = creneaux(m, iso); return c.length ? plage(c, l) : (l === 'fr' ? 'horaires non publiés' : 'hours not published'); };
