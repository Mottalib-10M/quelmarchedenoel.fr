/** Dates et heures écrites dans la langue de la page (sans données : importable côté navigateur). */
import type { Lang } from './format';

const FMT: Record<Lang, string> = { fr: 'fr-FR', en: 'en-GB' };
/** « sam. 28 nov. » */
export const jourCourt = (iso: string, lang: Lang) => new Date(`${iso}T12:00:00Z`).toLocaleDateString(FMT[lang], { weekday: 'short', day: 'numeric', month: 'short', timeZone: 'UTC' }).replace(/^(\p{L})/u, (x) => x.toUpperCase());
/** « samedi 28 novembre 2026 » */
export const jourLong = (iso: string, lang: Lang) => { const s = new Date(`${iso}T12:00:00Z`).toLocaleDateString(FMT[lang], { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' }); return lang === 'fr' ? s.replace(/ 1 /, ' 1er ') : s; };
/** « 28 novembre » */
export const jourMois = (iso: string, lang: Lang) => { const s = new Date(`${iso}T12:00:00Z`).toLocaleDateString(FMT[lang], { day: 'numeric', month: 'long', timeZone: 'UTC' }); return lang === 'fr' ? s.replace(/^1 /, '1er ') : s; };
/** « 11 h 30 » / « 11:30 » */
export const heure = (hhmm: string, lang: Lang) => { if (lang === 'en') return hhmm; const [h, m] = hhmm.split(':'); return `${Number(h)} h${m === '00' ? '' : ` ${m}`}`; };
export const plage = (c: [string, string][], lang: Lang) => c.map(([a, b]) => (lang === 'fr' ? `${heure(a, lang)} à ${heure(b, lang)}` : `${a} to ${b}`)).join(', ');
