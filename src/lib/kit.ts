/**
 * Kit d'écriture : tout chiffre écrit dans une page vient d'ici, jamais tapé à la main.
 *   K.P   sources et date de lecture (params-2026.json)
 *   K.D   données des marchés (lib/data.ts) et moteur (engine/marches.ts)
 */
import P from '../data/params-2026.json';
import * as D from './data';
import * as M from './engine/marches';
import { LAST_UPDATED } from '../data/site-config';

export const KIT = { P, D, M, LECTURE: LAST_UPDATED };
export type Kit = typeof KIT;
