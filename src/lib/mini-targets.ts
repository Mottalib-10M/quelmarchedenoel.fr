/** Où mène le lien d'un outil : l'accueil, qui porte le chercheur sur toute la France. */
import { route } from '../i18n/routes';
import type { Lang } from './format';
export const miniHref = (_kind: string, lang: Lang, _fallback: string) => `${route('home', lang)}#simulateur`;
