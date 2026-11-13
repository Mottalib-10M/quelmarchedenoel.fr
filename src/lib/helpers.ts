/** Outils d'écriture (`Helpers`) passés au corps de chaque page, dans sa langue. */
import { route, ROUTES } from '../i18n/routes';
import type { Helpers } from './page-types';
import { formatNumber, formatMoney, displayDate, type Lang } from './format';
import { KIT } from './kit';
import P from '../data/params-2026.json';
import { PLANNED_IDS } from './planned';

type Src = { url: string; label: { fr: string; en: string } };
const RAW = (P as unknown as { sources: Record<string, Src> }).sources;
const lab = (v: Src, lang: Lang) => (lang === 'fr' ? v.label.fr : v.label.en);
export const SOURCES = (lang: Lang): Record<string, { url: string; label: string }> =>
  Object.fromEntries(Object.entries(RAW).map(([k, v]) => [k, { url: v.url, label: lab(v, lang) }]));
export const sourceList = (keys: string[], lang: Lang) => { const S = SOURCES(lang); return keys.map((k) => ({ name: S[k].label, url: S[k].url })); };
export { table, ext } from './table';
import { table, ext } from './table';
export function link(id: string, text: string, lang: Lang) {
  if (!ROUTES.some((r) => r.id === id)) { if (process.env.VITEST && !PLANNED_IDS.has(id)) throw new Error(`Unknown page id in link: ${id}`); return text; }
  return `<a href="${route(id, lang)}">${text}</a>`;
}
export const box = (title: string, html: string) => `<aside class="boxnote not-prose"><p class="boxnote-title">${title}</p><div class="text-navy-800">${html}</div></aside>`;
export const srcLink = (key: string, lang: Lang, text?: string) => { const s = SOURCES(lang)[key]; if (!s) throw new Error(`Unknown source ${key}`); return ext(s.url, text ?? s.label); };
const MONTHS: Record<Lang, string> = { fr: 'fr-FR', en: 'en-GB' };
export const monthYear = (ym: string, lang: Lang) => new Date(`${ym}-15T00:00:00Z`).toLocaleDateString(MONTHS[lang], { month: 'long', year: 'numeric', timeZone: 'UTC' });
export function helpers(lang: Lang): Helpers {
  return {
    ...KIT, lang, a: (id, text) => link(id, text, lang),
    table: (hd, rows, cap, al) => table(hd, rows, cap, al, lang),
    src: (key, text) => srcLink(key, lang, text), ext, box,
    n: (x, d = 0) => formatNumber(x, d, lang), eur: (x, d = 0) => formatMoney(x, d, lang),
    day: (iso) => displayDate(iso, MONTHS[lang]), my: (ym) => monthYear(ym, lang),
  };
}
