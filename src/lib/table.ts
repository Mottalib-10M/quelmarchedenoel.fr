/** Tableau HTML et lien externe, sans dépendance aux routes (importables par les données des pages). */
import { formatNumber, type Lang } from './format';
import { attributsTableau } from './tableaux';
import { titreFiche } from './fiches';
const esc = (s: string | number) => String(s).replace(/&(?!(?:[a-z]+|#\d+);)/g, '&amp;').replace(/</g, '&lt;');
export function table(headers: string[], rows: Array<Array<string | number>>, caption?: string, align: Array<'l' | 'r'> = [], lang: Lang = 'fr') {
  const al = (i: number) => (align[i] === 'r' ? 'text-right' : 'text-left');
  // Trois colonnes ou plus : sur téléphone, chaque ligne devient une fiche (test naïf du 2026-11-08 : colonnes
  // coupées à droite). Classe et libellés de la trame (lib/tableaux.ts : `empile`, `etiquettes`).
  const { classe } = attributsTableau('auto', headers.length);
  const fichas = classe ? ` ${classe}` : '';
  const dl = (i: number, r: Array<string | number>) => ` data-label="${(titreFiche(headers.map((h) => String(h).replace(/<[^>]+>/g, '')), r)[i] ?? '').replace(/"/g, '&quot;')}"`;
  return `<div class="not-prose my-6 overflow-x-auto"><table class="journal w-full text-sm${fichas}">${caption ? `<caption class="mb-2 text-left text-sm text-navy-700">${caption}</caption>` : ''}<thead><tr>${headers.map((h, i) => `<th scope="col" class="px-3 py-2 font-semibold text-navy-900 ${al(i)}">${h}</th>`).join('')}</tr></thead><tbody>${rows.map((r) => `<tr>${r.map((c, i) => `<td${dl(i, r)} class="tabular-nums border-b border-navy-100 px-3 py-2 text-navy-800 ${al(i)}">${typeof c === 'number' ? esc(formatNumber(c, 0, lang)) : c}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`;
}
export const ext = (url: string, text: string) => `<a href="${url}" target="_blank" rel="nofollow noopener noreferrer">${text}</a>`;
