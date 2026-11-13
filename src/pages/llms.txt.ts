/** llms.txt (RECETTE §21), généré à partir du registre des pages. */
import { GUIDES } from '../lib/pages';
import { SITE_URL, LAST_UPDATED, SITE_NAMES } from '../data/site-config';
import { route } from '../i18n/routes';
import { GROUPS } from '../i18n/nav';
import { STATS } from '../lib/data';
export function GET() {
  const lines = [
    `# ${SITE_NAMES.en}`, '',
    `> Finder of French Christmas markets open on a given day, within a given distance, with that day's opening hours, in French and English. ${STATS.marches} markets for the 2026 season in ${STATS.communes} towns: ${STATS.datatourisme} listings from the DATAtourisme open-data export (tourist offices, Licence Ouverte 2.0) read on ${STATS.lu_le}, plus ${STATS.officiels} read on official city pages (Strasbourg 27 Nov to 24 Dec 2026; Lille 18 Nov to 30 Dec 2026). ${STATS.avec_horaires} listings publish hours; the rest show "not published". Lyon, Bordeaux, Paris, Nantes and Marseille are not covered. Distance as the crow flies; location stays in the browser. Independent site published by Radif Partners: not a tourist office or an organiser. Last updated ${LAST_UPDATED}.`, '',
    `- [Marchés de Noël ouverts près de chez vous](${SITE_URL}${route('home', 'fr')})`, `- [French Christmas markets open near you](${SITE_URL}${route('home', 'en')})`, '',
    ...GROUPS.flatMap((g) => [`## ${g.label.en} / ${g.label.fr}`, ...GUIDES.filter((p) => p.group === g.id).flatMap((p) => [
      `- [${p.fr.nav}](${SITE_URL}${route(p.id, 'fr')}): ${p.fr.card}`,
      `- [${p.en.nav}](${SITE_URL}${route(p.id, 'en')}): ${p.en.card}`,
    ]), '']),
    '## About', `- [Méthode](${SITE_URL}${route('method', 'fr')})`, `- [Method](${SITE_URL}${route('method', 'en')})`, `- [À propos](${SITE_URL}${route('about', 'fr')})`, `- [About](${SITE_URL}${route('about', 'en')})`,
  ];
  return new Response(lines.join('\n') + '\n', { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
}
