/** Pages par moment de la saison : Alsace, week-ends, nocturnes, après Noël. Chaque nombre vient de marches.json. */
import { defineGuide, type GuideDef } from '../../lib/page-types';
import { MARCHES, REGIONS } from '../../lib/data';
import { table } from '../../lib/table';
import { formatNumber } from '../../lib/format';
import { creneaux } from '../../lib/engine/marches';
import { B, C, N, jm, jl } from './_f';

const M = MARCHES;
const un = (c: string, motif: string) => M.find((m) => m.c === c && m.n.includes(motif))!;
const j = (c: string, motif: string) => B.joursSaison(un(c, motif)).length;

// ── Alsace ──────────────────────────────────────────────────────────────────────────────────────────────────────
const AL = B.deDeps(['67', '68']);
const al = { s28: B.ouverts(AL, '2026-11-28'), s5: B.ouverts(AL, '2026-12-05'), s12: B.ouverts(AL, '2026-12-12'), s19: B.ouverts(AL, '2026-12-19'), lg: B.longs(AL, 20), apres: B.ouvertsApres(AL, '2026-12-26'), le24: B.ouverts(AL, '2026-12-24') };
const alsace = defineGuide({
  id: 'alsace', group: 'themes', order: 1,
  outil: { ville: '68066', rayon: 30, zone: 60 },
  related: ['strasbourg', 'colmar', 'kaysersberg', 'mulhouse'],
  sources: ['datagouv', 'datatourisme', 'strasbourg', 'colmar', 'kaysersberg'],
  fr: {
    slug: 'marches-de-noel-alsace',
    nav: 'Alsace jour par jour', card: `${C(AL, 'fr')} marchés : lesquels sont ouverts le même jour, de Strasbourg à Mulhouse`,
    title: 'Marchés de Noël en Alsace 2026 : lesquels le même jour',
    description: 'Marchés de Noël en Alsace 2026 : Strasbourg, Colmar, Riquewihr, Eguisheim, Kaysersberg, Obernai, lesquels sont ouverts le même jour et à quelle heure.',
    h1: 'Marchés de Noël en Alsace 2026 : lesquels faire le même jour',
    intro: `Les marchés de Noël en Alsace sont ${C(AL, 'fr')} dans la base, souvent à quelques kilomètres les uns des autres. Choisissez un jour : le moteur de recherche, réglé sur Colmar, donne ceux qui sont ouverts et leur heure de fermeture.`,
    resume: `Le Bas-Rhin et le Haut-Rhin réunissent ${C(AL, 'fr')} marchés de Noël dans l'export DATAtourisme lu le 13 novembre 2026, Strasbourg compris, relu sur la page de la Ville. C'est plus d'un marché sur huit en France. Le samedi le plus fourni est le premier de l'Avent, le ${jm('2026-11-28', 'fr')}, avec ${C(al.s28, 'fr')} marchés ouverts ; le ${jm('2026-12-19', 'fr')}, il n'en reste que ${C(al.s19, 'fr')}. ${C(al.lg, 'fr')} marchés alsaciens durent vingt jours ou plus. Sur la route des vins, Riquewihr ouvre du 27 novembre au 20 décembre de 10 h à 19 h, Eguisheim jusqu'au 30 décembre, Turckheim jusqu'au 30 décembre de 10 h à 20 h, Kaysersberg le week-end seulement. Au nord, Obernai tient jusqu'au 31 décembre un marché de la gastronomie ouvert jusqu'à 21 h, Haguenau jusqu'au 30 décembre. Après Noël, ${C(al.apres, 'fr')} marchés d'Alsace restent ouverts au moins un jour, dont Colmar et Bouxwiller jusqu'au 3 janvier 2027.`,
    faqs: [
      { q: 'Quels marchés de Noël d\'Alsace sont ouverts en semaine ?', a: `Les grands : Strasbourg, Colmar, Mulhouse, Sélestat, Haguenau, Obernai, Riquewihr, Eguisheim et Turckheim ouvrent tous les jours de l\'Avent selon leurs fiches. Kaysersberg n'ouvre que du vendredi au dimanche. Le mardi ${jm('2026-12-08', 'fr')}, ${C(B.ouverts(AL, '2026-12-08'), 'fr')} marchés alsaciens sont ouverts, contre ${C(al.s5, 'fr')} le samedi ${jm('2026-12-05', 'fr')}.`, open: true },
      { q: 'Combien de marchés de Noël en Alsace en 2026 ?', a: `${C(AL, 'fr')} fiches dans l'export lu le 13 novembre 2026 : ${C(B.deDeps(['67']), 'fr')} dans le Bas-Rhin, Strasbourg compris, et ${C(B.deDeps(['68']), 'fr')} dans le Haut-Rhin. La plupart sont des marchés de village d'un jour ou d'un week-end ; ${C(al.lg, 'fr')} seulement durent vingt jours ou plus.` },
      { q: 'Quel marché de Noël d\'Alsace ferme le plus tard ?', a: 'Parmi les marchés ouverts tout l\'Avent, le marché gourmand de Colmar ferme à 22 h tous les soirs jusqu\'au 30 décembre selon sa fiche. Strasbourg ferme à 22 h les 11, 12, 18 et 19 décembre, et le Cœur de Mulhouse à 22 h le week-end. Obernai ferme à 21 h.' },
      { q: 'Riquewihr est-il ouvert après Noël ?', a: `Non : sa fiche le donne ouvert du ${jl(un('Riquewihr', 'Riquewihr').s!, 'fr')} au ${jl(un('Riquewihr', 'Riquewihr').e!, 'fr')}, de 10 h à 19 h. Eguisheim et Turckheim, à moins de quinze kilomètres, restent ouverts jusqu'au 30 décembre, et le marché gourmand de Colmar jusqu'au 3 janvier.` },
    ],
    body: (x) => `<h2>Marchés de Noël en Alsace : le calendrier des samedis</h2>
<p>Le tableau compte, pour chaque week-end de l'Avent, les marchés alsaciens ouverts le samedi, le dimanche, et l'un des deux. Le premier week-end est le plus riche, parce que les marchés de village y rejoignent les grands ; le dernier avant Noël, beaucoup de petits marchés ont déjà fermé. Le dimanche suit de près le samedi chaque week-end, car nombre de villages tiennent leur marché ce jour-là. Pour Strasbourg, voyez ${x.a('strasbourg', 'sa page')} ; pour Colmar et ses six places, ${x.a('colmar', 'la page de Colmar')}.</p>
${B.tabWeekends(AL, 'fr', 'Marchés de Noël ouverts en Alsace, week-end par week-end')}
<h2>Les marchés qui durent tout l'Avent</h2>
<p>Ce sont eux qui permettent d'enchaîner plusieurs marchés le même jour. Entre Colmar, Turckheim, Eguisheim, Riquewihr et ${x.a('kaysersberg', 'Kaysersberg')}, il y a moins de vingt kilomètres à vol d'oiseau. Au nord, Obernai et Sélestat sont sur la route de Strasbourg à Colmar. Au sud, ${x.a('mulhouse', 'Mulhouse')} et Thann ferment le 24 décembre ou peu après. Le 24 décembre, ${C(al.le24, 'fr')} marchés alsaciens ouvrent encore ; Eguisheim, lui, ferme du 24 au 26 décembre selon sa fiche.</p>
${B.tabMarches(AL, 'fr', 'Les marchés de Noël alsaciens les plus longs, avec l\'horaire d\'un samedi', 20)}`,
  },
  en: {
    slug: 'alsace-christmas-markets',
    nav: 'Alsace day by day', card: `${C(AL, 'en')} markets: which are open on the same day, from Strasbourg to Mulhouse`,
    title: 'Alsace Christmas markets 2026: day by day, town by town',
    description: 'Alsace Christmas markets 2026: Strasbourg, Colmar, Riquewihr, Eguisheim, Kaysersberg and Obernai, which are open on the same day and what time each one closes.',
    h1: 'Alsace Christmas markets 2026: which to do on the same day',
    intro: `The Alsace Christmas markets number ${C(AL, 'en')} in the base, often a few kilometres apart. Pick a day: the finder, set on Colmar, shows those open and their closing time.`,
    resume: `The Bas-Rhin and Haut-Rhin hold ${C(AL, 'en')} Christmas markets in the DATAtourisme export read on 13 November 2026, Strasbourg included, read from the City's page. That is more than one market in eight in France. The fullest Saturday is the first of Advent, ${jm('2026-11-28', 'en')}, with ${C(al.s28, 'en')} markets open; on ${jm('2026-12-19', 'en')}, only ${C(al.s19, 'en')} remain. ${C(al.lg, 'en')} Alsace markets last twenty days or more. On the wine route, Riquewihr opens from 27 November to 20 December, 10:00 to 19:00, Eguisheim until 30 December, Turckheim until 30 December, 10:00 to 20:00, and Kaysersberg at weekends only. In the north, Obernai holds a gastronomy market open until 21:00 until 31 December, and Haguenau runs until 30 December. After Christmas, ${C(al.apres, 'en')} Alsace markets stay open on at least one day, including Colmar and Bouxwiller until 3 January 2027.`,
    faqs: [
      { q: 'Which Alsace Christmas markets are open on weekdays?', a: `The large ones: Strasbourg, Colmar, Mulhouse, Sélestat, Haguenau, Obernai, Riquewihr, Eguisheim and Turckheim open every day of Advent according to their listings. Kaysersberg only opens Friday to Sunday. On Tuesday ${jm('2026-12-08', 'en')}, ${C(B.ouverts(AL, '2026-12-08'), 'en')} Alsace markets are open, against ${C(al.s5, 'en')} on Saturday ${jm('2026-12-05', 'en')}.`, open: true },
      { q: 'How many Christmas markets are there in Alsace in 2026?', a: `${C(AL, 'en')} listings in the export read on 13 November 2026: ${C(B.deDeps(['67']), 'en')} in the Bas-Rhin, Strasbourg included, and ${C(B.deDeps(['68']), 'en')} in the Haut-Rhin. Most are village markets over a day or a weekend; only ${C(al.lg, 'en')} last twenty days or more, almost all of them in towns.` },
      { q: 'Which Alsace Christmas market closes latest?', a: 'Among the markets open all through Advent, the Colmar food market closes at 22:00 every evening until 30 December according to its listing. Strasbourg closes at 22:00 on 11, 12, 18 and 19 December, and the Cœur de Mulhouse at 22:00 at weekends. Obernai closes at 21:00.' },
      { q: 'Is Riquewihr open after Christmas?', a: `No: its listing shows it open from ${jl(un('Riquewihr', 'Riquewihr').s!, 'en')} to ${jl(un('Riquewihr', 'Riquewihr').e!, 'en')}, 10:00 to 19:00. Eguisheim and Turckheim, less than fifteen kilometres away, stay open until 30 December, and the Colmar food market until 3 January.` },
    ],
    body: (x) => `<h2>Alsace Christmas markets: the Saturday calendar</h2>
<p>The table counts, for each Advent weekend, the Alsace markets open on Saturday, on Sunday, and on either day. The first weekend is the richest, because village markets join the large ones; on the last weekend before Christmas, many small markets have already closed. For Strasbourg, see ${x.a('strasbourg', 'its page')}; for Colmar and its six squares, ${x.a('colmar', 'the Colmar page')}.</p>
${B.tabWeekends(AL, 'en', 'Christmas markets open in Alsace, weekend by weekend')}
<h2>The markets that last all through Advent</h2>
<p>These are the ones that let you string several markets together on the same day. Colmar, Turckheim, Eguisheim, Riquewihr and ${x.a('kaysersberg', 'Kaysersberg')} are less than twenty kilometres apart as the crow flies. In the north, Obernai and Sélestat lie on the road from Strasbourg to Colmar. In the south, ${x.a('mulhouse', 'Mulhouse')} and Thann close on 24 December or shortly after. On 24 December, ${C(al.le24, 'en')} Alsace markets still open; Eguisheim, for its part, closes from 24 to 26 December according to its listing.</p>
${B.tabMarches(AL, 'en', 'The longest Alsace Christmas markets, with Saturday hours', 20)}`,
  },
});

// ── Week-ends de l'Avent ────────────────────────────────────────────────────────────────────────────────────────
const W = B.WEEKENDS;
const sat = W.map(([s]) => B.ouverts(M, s)), dim = W.map(([, d]) => B.ouverts(M, d));
const best = (l: Array<unknown[]>) => l.reduce((a, x, i) => (x.length > l[a].length ? i : a), 0);
const iSat = best(sat), iDim = best(dim);
const regionsSamedis = (lang: 'fr' | 'en') => table(
  [lang === 'fr' ? 'Région' : 'Region', ...W.map(([s]) => jm(s, lang))],
  REGIONS.map((r) => { const l = M.filter((m) => r.deps.includes(m.d)); return [r[lang], ...W.map(([s]) => formatNumber(B.ouverts(l, s).length, 0, lang))]; }).filter((row) => row.slice(1).some((v) => v !== '0')),
  lang === 'fr' ? 'Marchés de Noël ouverts chaque samedi de la saison, par région' : 'Christmas markets open each Saturday of the season, by region', ['l', 'r', 'r', 'r', 'r', 'r'], lang);
const weekEnds = defineGuide({
  id: 'week-ends', group: 'themes', order: 2,
  outil: { ville: '51454', rayon: 50, jour: '2026-12-05', zone: 60 },
  related: ['alsace', 'nocturnes', 'apres-noel', 'nouvelle-aquitaine'],
  sources: ['datagouv', 'datatourisme'],
  fr: {
    slug: 'marches-de-noel-week-end',
    nav: 'Les week-ends de l\'Avent', card: 'Quel samedi, quel dimanche : le nombre de marchés ouverts chaque week-end, par région',
    title: 'Marchés de Noël le week-end 2026 : samedi ou dimanche',
    description: 'Marchés de Noël le week-end 2026 : combien sont ouverts chaque samedi et chaque dimanche de l\'Avent, région par région, et quel week-end en compte le plus.',
    h1: 'Marchés de Noël le week-end 2026 : le calendrier des samedis et dimanches',
    intro: `Les marchés de Noël le week-end ne sont pas les mêmes d'un samedi à l'autre : la plupart n'ouvrent qu'un ou deux jours. Choisissez votre jour : le moteur de recherche, réglé ici sur Reims et le samedi ${jm('2026-12-05', 'fr')}, donne ceux qui sont ouverts.`,
    resume: `Sur les ${C(M, 'fr')} marchés de Noël de l'export DATAtourisme lu le 13 novembre 2026, ${C(B.unJour(M), 'fr')} ne durent qu'un jour, le plus souvent un samedi ou un dimanche, et ${C(B.unJour(M).filter((m) => new Date(m.s + 'T12:00:00Z').getUTCDay() === 0), 'fr')} un dimanche. Le choix du week-end compte donc plus que celui de la ville. D'après les fiches, le samedi le plus fourni est le ${jm(W[iSat][0], 'fr')}, avec ${C(sat[iSat], 'fr')} marchés ouverts, et le dimanche le plus fourni le ${jm(W[iDim][1], 'fr')}, avec ${C(dim[iDim], 'fr')} : c'est le premier week-end de décembre. Le premier week-end de l'Avent, les ${jm('2026-11-28', 'fr')} et ${jm('2026-11-29', 'fr')}, suit de près. Le samedi ${jm('2026-12-19', 'fr')}, dernier avant Noël, il n'en reste que ${C(sat[4], 'fr')}, car beaucoup de marchés de village ont déjà eu lieu ; les grands marchés de ville, eux, restent ouverts. Le week-end des ${jm('2026-11-21', 'fr')} et ${jm('2026-11-22', 'fr')} ouvre la saison avec ${C(sat[0], 'fr')} marchés le samedi.`,
    faqs: [
      { q: 'Quel est le meilleur week-end pour les marchés de Noël ?', a: `Si vous cherchez le plus grand choix, le premier week-end de décembre : ${C(sat[iSat], 'fr')} marchés ouverts le samedi ${jm(W[iSat][0], 'fr')} et ${C(dim[iDim], 'fr')} le dimanche ${jm(W[iDim][1], 'fr')}, selon les fiches. Si vous visez un grand marché de ville, tous les week-ends de décembre conviennent, mais les petits marchés de village sont moins nombreux le dernier.`, open: true },
      { q: 'Y a-t-il plus de marchés de Noël le samedi ou le dimanche ?', a: `Le dimanche, selon les fiches : le premier week-end de l'Avent, ${C(dim[1], 'fr')} marchés le dimanche contre ${C(sat[1], 'fr')} le samedi ; le premier week-end de décembre, ${C(dim[2], 'fr')} contre ${C(sat[2], 'fr')}. Beaucoup de marchés de village se tiennent le dimanche seulement. Le tableau donne les deux chiffres pour chaque week-end.` },
      { q: 'Les marchés de Noël sont-ils ouverts le samedi 19 décembre ?', a: `${C(sat[4], 'fr')} le sont selon leurs fiches, soit beaucoup moins qu'en début de saison. Les grands marchés de ville, comme Strasbourg, Colmar, Metz, Lille ou Rouen, restent ouverts ce jour-là. Ce sont les marchés de village d'un jour qui manquent, la plupart ayant eu lieu plus tôt.` },
    ],
    body: (x) => `<h2>Marchés de Noël le week-end : samedi et dimanche, en France</h2>
<p>Le tableau compte les marchés ouverts chaque samedi et chaque dimanche, d'après les jours d'ouverture de leurs fiches, quelle que soit l'heure. Un marché ouvert les deux jours compte une fois dans la dernière colonne. Les grands marchés de ville ouvrent tous les jours et pèsent peu dans les écarts ; ce sont les marchés de village, d'école ou d'association qui font varier les chiffres d'un week-end à l'autre. Si vous ne pouvez sortir qu'un jour, le dimanche offre en général un peu plus de choix que le samedi : le moteur de recherche donne les horaires de chaque marché pour le jour choisi.</p>
${B.tabWeekends(M, 'fr', 'Marchés de Noël ouverts en France, week-end par week-end (export lu le 13 novembre 2026)')}
<h2>Région par région</h2>
<p>Le pic n'est pas le même partout. L'Alsace et le Grand Est culminent le premier samedi de l'Avent ; la Bretagne, la Normandie et la Nouvelle-Aquitaine le samedi ${jm('2026-12-05', 'fr')} ; l'Occitanie le samedi ${jm('2026-12-12', 'fr')}. Pour l'Alsace, voyez ${x.a('alsace', 'la page jour par jour')}. Pour un soir de week-end, ${x.a('nocturnes', 'les marchés en nocturne')} donnent ceux qui ferment après 21 h. Avant un long trajet, réglez le moteur de recherche sur votre ville et la date exacte.</p>
${regionsSamedis('fr')}`,
  },
  en: {
    slug: 'christmas-markets-weekend',
    nav: 'Advent weekends', card: 'Which Saturday, which Sunday: the number of markets open each weekend, by region',
    title: 'Christmas markets at weekends 2026: which Saturday or Sunday',
    description: 'Christmas markets at weekends 2026: how many are open each Saturday and Sunday of Advent in France, region by region, and which weekend has the most markets.',
    h1: 'Christmas markets at weekends 2026: the Saturday and Sunday calendar',
    intro: `The Christmas markets at weekends are not the same from one Saturday to the next: most only open for one or two days. Pick your day: the finder, set here on Reims and Saturday ${jm('2026-12-05', 'en')}, shows those open.`,
    resume: `Of the ${C(M, 'en')} Christmas markets in the DATAtourisme export read on 13 November 2026, ${C(B.unJour(M), 'en')} last a single day, most often a Saturday or a Sunday, and ${C(B.unJour(M).filter((m) => new Date(m.s + 'T12:00:00Z').getUTCDay() === 0), 'en')} of them on a Sunday. Choosing the weekend therefore matters more than choosing the town. According to the listings, the fullest Saturday is ${jm(W[iSat][0], 'en')}, with ${C(sat[iSat], 'en')} markets open, and the fullest Sunday ${jm(W[iDim][1], 'en')}, with ${C(dim[iDim], 'en')}: the first weekend of December. The first Advent weekend, ${jm('2026-11-28', 'en')} and ${jm('2026-11-29', 'en')}, follows closely. On Saturday ${jm('2026-12-19', 'en')}, the last before Christmas, only ${C(sat[4], 'en')} remain, because many village markets have already taken place; the large town markets stay open. The weekend of ${jm('2026-11-21', 'en')} and ${jm('2026-11-22', 'en')} opens the season with ${C(sat[0], 'en')} markets on the Saturday.`,
    faqs: [
      { q: 'Which is the best weekend for Christmas markets?', a: `For the widest choice, the first weekend of December: ${C(sat[iSat], 'en')} markets open on Saturday ${jm(W[iSat][0], 'en')} and ${C(dim[iDim], 'en')} on Sunday ${jm(W[iDim][1], 'en')}, according to the listings. If you are after a large town market, any December weekend will do, but small village markets are fewer on the last one.`, open: true },
      { q: 'Are there more Christmas markets on Saturday or Sunday?', a: `Sunday, according to the listings: on the first Advent weekend, ${C(dim[1], 'en')} markets on Sunday against ${C(sat[1], 'en')} on Saturday; on the first weekend of December, ${C(dim[2], 'en')} against ${C(sat[2], 'en')}. Many village markets are held on Sunday only. The table gives both figures for every weekend.` },
      { q: 'Are Christmas markets open on Saturday 19 December?', a: `${C(sat[4], 'en')} are according to their listings, far fewer than early in the season. The large town markets, such as Strasbourg, Colmar, Metz, Lille or Rouen, stay open that day. It is the one-day village markets that are missing, most of them having taken place earlier.` },
    ],
    body: (x) => `<h2>Christmas markets at weekends: Saturday and Sunday across France</h2>
<p>The table counts the markets open each Saturday and each Sunday, based on the opening days in their listings, whatever the time. A market open on both days counts once in the last column. Large town markets open every day and weigh little in the differences; it is village, school and charity markets that make the figures vary from one weekend to the next. If you can only go out on one day, Sunday generally offers a little more choice than Saturday: the finder gives each market's hours for the day you choose.</p>
${B.tabWeekends(M, 'en', 'Christmas markets open in France, weekend by weekend (export read on 13 November 2026)')}
<h2>Region by region</h2>
<p>The peak is not the same everywhere. Alsace and Grand Est peak on the first Advent Saturday; Brittany, Normandy and Nouvelle-Aquitaine on Saturday ${jm('2026-12-05', 'en')}; Occitanie on Saturday ${jm('2026-12-12', 'en')}. For Alsace, see ${x.a('alsace', 'the day-by-day page')}. For a weekend evening, ${x.a('nocturnes', 'late-night markets')} lists those that close after 21:00. Before a long trip, set the finder on your town and the exact date.</p>
${regionsSamedis('en')}`,
  },
});

// ── Nocturnes ───────────────────────────────────────────────────────────────────────────────────────────────────
const n21 = B.nocturnes(M, '21:00'), n22 = B.nocturnes(M, '22:00');
/** Marchés qui ferment à 21 h ou plus tard le jour `iso` (après minuit compris). */
const ferme21 = (iso: string) => M.filter((m) => creneaux(m, iso).some(([, b]) => b >= '21:00' || b < '06:00'));
const nocturnes = defineGuide({
  id: 'nocturnes', group: 'themes', order: 3,
  outil: { ville: '67482', rayon: 50, jour: '2026-12-11', filtre: 'soir', zone: 60 },
  related: ['strasbourg', 'metz', 'lille', 'week-ends'],
  sources: ['datagouv', 'datatourisme', 'strasbourg', 'lille'],
  fr: {
    slug: 'marches-de-noel-nocturne',
    nav: 'Ouverts le soir', card: `${C(n21, 'fr')} marchés ferment à 21 h ou plus tard au moins un soir`,
    title: 'Marchés de Noël en nocturne 2026 : ouverts tard le soir',
    description: 'Marchés de Noël en nocturne 2026 : ceux qui ferment à 21 h, 22 h ou plus tard, les soirs de semaine et le week-end, de Strasbourg à Lille, Metz et Le Barcarès.',
    h1: 'Marchés de Noël en nocturne 2026 : où aller après 20 h',
    intro: `Les marchés de Noël en nocturne sont ceux dont la fiche publie une fermeture à 21 h ou plus tard : ${C(n21, 'fr')} dans la base. Choisissez un soir : le moteur de recherche, réglé sur Strasbourg et le filtre du soir, donne ceux qui sont encore ouverts.`,
    resume: `D'après l'export DATAtourisme lu le 13 novembre 2026 et les pages de Strasbourg et de Lille, ${C(n21, 'fr')} marchés de Noël ferment à 21 h ou plus tard au moins un jour, et ${C(n22, 'fr')} à 22 h ou plus tard. La plupart ne le font qu'un soir, souvent un vendredi ou un samedi de marché de village. Les nocturnes de toute la saison sont rares et presque toutes dans de grandes villes : Lille jusqu'à 22 h le vendredi et le samedi, Metz à 22 h les mêmes jours et à 21 h les autres, le marché gourmand de Colmar à 22 h tous les soirs jusqu'au 30 décembre, le Cœur de Mulhouse à 22 h le week-end, Strasbourg à 21 h et à 22 h quatre soirs de décembre. Sur la côte catalane, le village du Barcarès ferme à 1 h du matin et celui de Collioure à minuit. Un soir de semaine, le choix se resserre : le mardi ${jm('2026-12-08', 'fr')}, ${C(ferme21('2026-12-08'), 'fr')} marchés ferment à 21 h ou plus tard, contre ${C(ferme21('2026-12-05'), 'fr')} le samedi ${jm('2026-12-05', 'fr')}.`,
    faqs: [
      { q: 'Quels marchés de Noël sont ouverts après 21 h en semaine ?', a: `Peu : le mardi ${jm('2026-12-08', 'fr')}, ${C(ferme21('2026-12-08'), 'fr')} selon leurs fiches. Ce sont le marché gourmand de Colmar, ouvert jusqu'à 22 h, Strasbourg et Metz jusqu'à 21 h, et Le Barcarès. Lille ferme à 20 h 30 du dimanche au jeudi. Le moteur de recherche, avec le filtre du soir, donne la liste exacte pour le jour choisi.`, open: true },
      { q: 'À quelle heure ferment les marchés de Noël le samedi soir ?', a: `Selon les fiches, le plus tardif ferme à 1 h du matin, au Barcarès. Le samedi ${jm('2026-12-05', 'fr')}, ${C(ferme21('2026-12-05'), 'fr')} marchés ferment à 21 h ou plus tard selon leurs fiches. Lille, Metz, Colmar et le Cœur de Mulhouse vont jusqu'à 22 h. Le moteur de recherche, avec le filtre du soir, donne ceux qui restent ouverts autour de vous.` },
      { q: 'Qu\'est-ce qu\'une nocturne au marché de Noël de Strasbourg ?', a: 'Selon la Ville, les chalets restent ouverts jusqu\'à 22 h au lieu de 21 h les vendredis et samedis 11, 12, 18 et 19 décembre 2026. Les autres soirs, la fermeture est à 21 h, et à 18 h le 24 décembre. Le marché ouvre à 11 h 30 tous les jours, sauf le premier jour.' },
    ],
    body: (x) => `<h2>Marchés de Noël en nocturne : ceux qui ferment à 22 h ou plus tard</h2>
<p>Le tableau classe les ${C(n22, 'fr')} marchés qui ferment au moins un soir à 22 h ou plus tard, du plus long au plus court. L'horaire indiqué est celui d'un samedi, souvent le plus tardif de la semaine. Un marché qui ne publie pas d'horaire n'y figure pas, même s'il ferme tard : c'est le cas de Toulouse ou de Montpellier, dont les fiches ne donnent aucune heure. ${x.a('lille', 'Lille')} et ${x.a('metz', 'Metz')} ont leur page avec l'horaire de chaque jour.</p>
${B.tabMarches(n22, 'fr', 'Marchés de Noël qui ferment à 22 h ou plus tard au moins un soir', 25)}
<h2>Un soir de semaine ou de week-end</h2>
<p>Le vendredi ${jm('2026-12-11', 'fr')}, ${C(ferme21('2026-12-11'), 'fr')} marchés ferment à 21 h ou plus tard ; le samedi ${jm('2026-12-12', 'fr')}, ${C(ferme21('2026-12-12'), 'fr')}. En semaine, ce sont presque uniquement les marchés de ville qui restent ouverts. Pour choisir votre samedi, voyez ${x.a('week-ends', 'le calendrier des week-ends')}, et pour ${x.a('strasbourg', 'Strasbourg')}, les quatre soirs de nocturne.</p>`,
  },
  en: {
    slug: 'late-night-christmas-markets',
    nav: 'Open in the evening', card: `${C(n21, 'en')} markets close at 21:00 or later on at least one evening`,
    title: 'Late-night Christmas markets 2026: open late in the evening',
    description: 'Late-night Christmas markets 2026: those closing at 21:00, 22:00 or later, on weekday and weekend evenings, from Strasbourg to Lille, Metz and Le Barcarès.',
    h1: 'Late-night Christmas markets 2026: where to go after 20:00',
    intro: `Late-night Christmas markets are those whose listing publishes a closing time of 21:00 or later: ${C(n21, 'en')} in the base. Pick an evening: the finder, set on Strasbourg with the evening filter, shows those still open.`,
    resume: `According to the DATAtourisme export read on 13 November 2026 and the Strasbourg and Lille pages, ${C(n21, 'en')} Christmas markets close at 21:00 or later on at least one day, and ${C(n22, 'en')} at 22:00 or later. Most only do so on one evening, often a Friday or Saturday village market. Late openings all season long are rare and nearly all in large towns: Lille until 22:00 on Fridays and Saturdays, Metz at 22:00 on the same days and 21:00 otherwise, the Colmar food market at 22:00 every evening until 30 December, the Cœur de Mulhouse at 22:00 at weekends, Strasbourg at 21:00 and at 22:00 on four December evenings. On the Catalan coast, the Le Barcarès village closes at 01:00 and Collioure at midnight. On a weekday evening, the choice narrows: on Tuesday ${jm('2026-12-08', 'en')}, ${C(ferme21('2026-12-08'), 'en')} markets close at 21:00 or later, against ${C(ferme21('2026-12-05'), 'en')} on Saturday ${jm('2026-12-05', 'en')}.`,
    faqs: [
      { q: 'Which Christmas markets are open after 21:00 on weekdays?', a: `Few: on Tuesday ${jm('2026-12-08', 'en')}, ${C(ferme21('2026-12-08'), 'en')} according to their listings. They are the Colmar food market, open until 22:00, Strasbourg and Metz until 21:00, and Le Barcarès. Lille closes at 20:30 from Sunday to Thursday. The finder, with the evening filter, gives the exact list for the day you choose.`, open: true },
      { q: 'What time do Christmas markets close on Saturday evening?', a: `According to the listings, the latest closes at 01:00, at Le Barcarès. On Saturday ${jm('2026-12-05', 'en')}, ${C(ferme21('2026-12-05'), 'en')} markets close at 21:00 or later according to their listings. Lille, Metz, Colmar and the Cœur de Mulhouse go on until 22:00. The finder, with the evening filter, shows those still open around you.` },
      { q: 'What is a late opening at the Strasbourg Christmas market?', a: 'According to the City, the stalls stay open until 22:00 instead of 21:00 on Fridays and Saturdays 11, 12, 18 and 19 December 2026. On other evenings closing is at 21:00, and at 18:00 on 24 December. The market opens at 11:30 every day except the first.' },
    ],
    body: (x) => `<h2>Late-night Christmas markets: those closing at 22:00 or later</h2>
<p>The table ranks the ${C(n22, 'en')} markets that close at 22:00 or later on at least one evening, from longest to shortest. The hours shown are those of a Saturday, often the latest of the week. A market that publishes no hours does not appear, even if it closes late: that is the case for Toulouse and Montpellier, whose listings give no time. ${x.a('lille', 'Lille')} and ${x.a('metz', 'Metz')} have their own pages with each day's hours.</p>
${B.tabMarches(n22, 'en', 'Christmas markets closing at 22:00 or later on at least one evening', 25)}
<h2>A weekday or weekend evening</h2>
<p>On Friday ${jm('2026-12-11', 'en')}, ${C(ferme21('2026-12-11'), 'en')} markets close at 21:00 or later; on Saturday ${jm('2026-12-12', 'en')}, ${C(ferme21('2026-12-12'), 'en')}. On weekdays, it is almost only town markets that stay open, and the evening filter in the finder leaves out every market whose listing gives no hours. To choose your Saturday, see ${x.a('week-ends', 'the weekend calendar')}, and for ${x.a('strasbourg', 'Strasbourg')}, its four late evenings until 22:00 in December.</p>`,
  },
});

// ── Après Noël ──────────────────────────────────────────────────────────────────────────────────────────────────
const apres = B.ouvertsApres(M, '2026-12-26'), janv = B.ouvertsApres(M, '2027-01-01');
const le = (iso: string) => B.ouverts(M, iso);
const apresNoel = defineGuide({
  id: 'apres-noel', group: 'themes', order: 4,
  outil: { ville: '68066', rayon: 50, jour: '2026-12-26', zone: 60 },
  related: ['colmar', 'metz', 'occitanie', 'normandie'],
  sources: ['datagouv', 'datatourisme', 'lille'],
  fr: {
    slug: 'marches-de-noel-apres-noel',
    nav: 'Après Noël et en janvier', card: `${C(apres, 'fr')} marchés ouverts après le 25 décembre, ${C(janv, 'fr')} en janvier`,
    title: 'Marchés de Noël après Noël 2026 : ouverts jusqu\'en janvier',
    description: 'Marchés de Noël après Noël 2026 : ceux ouverts le 26 décembre, la semaine jusqu\'au jour de l\'an et en janvier, de Colmar à Lille, Metz, Honfleur et Le Barcarès.',
    h1: 'Marchés de Noël après Noël 2026 : du 26 décembre à janvier',
    intro: `Les marchés de Noël après Noël sont rares : ${C(apres, 'fr')} ont au moins un jour d'ouverture après le 25 décembre. Choisissez une date : le moteur de recherche, réglé sur Colmar et le ${jm('2026-12-26', 'fr')}, donne ceux qui restent ouverts.`,
    resume: `D'après l'export DATAtourisme lu le 13 novembre 2026 et la page de la Ville de Lille, ${C(le('2026-12-24'), 'fr')} marchés de Noël ouvrent le 24 décembre, ${C(le('2026-12-25'), 'fr')} le 25, puis ${C(le('2026-12-26'), 'fr')} le samedi 26 et ${C(le('2026-12-27'), 'fr')} le dimanche 27. Au total, ${C(apres, 'fr')} marchés ont au moins un jour après Noël. Le 31 décembre, il en reste ${C(le('2026-12-31'), 'fr')}, et ${C(janv, 'fr')} ont une date en janvier 2027. Strasbourg ferme le 24 au soir ; Colmar, Metz, Mulhouse et Lille restent ouverts jusqu'au 29 ou 30 décembre, et le marché gourmand de Colmar jusqu'au 3 janvier. En janvier, la liste tient en quelques lieux : Colmar, Bouxwiller, Gérardmer et La Bresse dans l'Est ; Honfleur, Trouville-sur-Mer et Bâlines en Normandie ; Poitiers, Saint-Jean-de-Luz, Châlus et Nexon dans le Sud-Ouest ; Béziers, Palavas-les-Flots, Perpignan, Port-Vendres, Collioure et Le Barcarès, ouvert jusqu'au 10 janvier.`,
    faqs: [
      { q: 'Quels marchés de Noël sont ouverts entre Noël et le jour de l\'an ?', a: `${C(le('2026-12-28'), 'fr')} le lundi ${jm('2026-12-28', 'fr')} selon leurs fiches. Parmi les grands : Colmar jusqu'au 29 décembre et son marché gourmand jusqu'au 3 janvier, Metz et Lille jusqu'au 30, Mulhouse avec le Cœur de Mulhouse jusqu'au 29, Montpellier jusqu'au 30, Poitiers et Perpignan jusqu'au 3 janvier.`, open: true },
      { q: 'Y a-t-il des marchés de Noël ouverts le 1er janvier ?', a: `${C(le('2027-01-01'), 'fr')} selon leurs fiches, ce qui reste à vérifier sur place un jour férié. Ce sont surtout des villages de Noël de bord de mer, comme Le Barcarès, Collioure ou Palavas-les-Flots, et quelques marchés de l'Est, comme Colmar, Gérardmer ou Bouxwiller. Le moteur de recherche, réglé sur le 1er janvier, donne la liste autour de vous.` },
      { q: 'Quel est le dernier marché de Noël de la saison ?', a: 'Dans la base, le village de Noël du Barcarès, dans les Pyrénées-Orientales, ouvert jusqu\'au dimanche 10 janvier 2027 de 11 h à 1 h du matin selon sa fiche. Deux fiches de Haute-Vienne, à Châlus et à Nexon, décrivent des boutiques artisanales ouvertes jusqu\'au 8 janvier sous le nom de féerie de Noël.' },
    ],
    body: (x) => `<h2>Marchés de Noël après Noël : le samedi 26 décembre</h2>
<p>Le tableau liste les marchés ouverts le ${jl('2026-12-26', 'fr')}, avec leurs horaires de ce jour-là quand la fiche les publie. C'est, avec le dimanche 27, le jour le plus fourni de la semaine entre les fêtes, et le dernier pour beaucoup de marchés. Beaucoup de grands marchés ferment le 24 au soir, comme Strasbourg, ou le 27, comme Rouen et Toulouse ; d'autres rouvrent après une fermeture le 25, comme ${x.a('metz', 'Metz')} et ${x.a('mulhouse', 'Mulhouse')}.</p>
${B.tabJour(M, '2026-12-26', 'fr', 30, 'Marchés de Noël ouverts le samedi 26 décembre 2026, du plus long au plus court')}
<h2>En janvier 2027</h2>
<p>Les ${C(janv, 'fr')} marchés ouverts en janvier sont près de la moitié en bord de mer, de la côte catalane à la côte fleurie et au Pays basque. Les autres sont dans les Vosges, en Alsace, dans l'Eure, à Poitiers, en Haute-Vienne, à Béziers et à Perpignan. Pour la Méditerranée, voyez ${x.a('occitanie', 'la page Occitanie')} ; pour la Manche, ${x.a('normandie', 'la page Normandie')}. Un jour férié, comme le 1er janvier, mieux vaut vérifier l'ouverture auprès de l'organisateur : une fiche publiée en automne ne dit pas toujours ce qui se passe ce jour-là.</p>
${B.tabMarches(janv, 'fr', 'Marchés de Noël ouverts au moins un jour en janvier 2027', 25)}`,
  },
  en: {
    slug: 'christmas-markets-after-christmas',
    nav: 'After Christmas and in January', card: `${C(apres, 'en')} markets open after 25 December, ${C(janv, 'en')} in January`,
    title: 'Christmas markets after Christmas 2026: open into January',
    description: 'Christmas markets after Christmas 2026: those open on 26 December, the week up to New Year and into January, from Colmar to Lille, Metz, Honfleur, Le Barcarès.',
    h1: 'Christmas markets after Christmas 2026: from 26 December to January',
    intro: `Christmas markets after Christmas are rare: ${C(apres, 'en')} have at least one opening day after 25 December. Pick a date: the finder, set on Colmar and ${jm('2026-12-26', 'en')}, shows those still open.`,
    resume: `According to the DATAtourisme export read on 13 November 2026 and the City of Lille page, ${C(le('2026-12-24'), 'en')} Christmas markets open on 24 December, ${C(le('2026-12-25'), 'en')} on the 25th, then ${C(le('2026-12-26'), 'en')} on Saturday 26 and ${C(le('2026-12-27'), 'en')} on Sunday 27. In all, ${C(apres, 'en')} markets have at least one day after Christmas. On 31 December, ${C(le('2026-12-31'), 'en')} remain, and ${C(janv, 'en')} have a date in January 2027. Strasbourg closes on the evening of the 24th; Colmar, Metz, Mulhouse and Lille stay open until 29 or 30 December, and the Colmar food market until 3 January. In January, the list comes down to a few places: Colmar, Bouxwiller, Gérardmer and La Bresse in the east; Honfleur, Trouville-sur-Mer and Bâlines in Normandy; Poitiers, Saint-Jean-de-Luz, Châlus and Nexon in the south-west; Béziers, Palavas-les-Flots, Perpignan, Port-Vendres, Collioure and Le Barcarès, open until 10 January.`,
    faqs: [
      { q: 'Which Christmas markets are open between Christmas and New Year?', a: `${C(le('2026-12-28'), 'en')} on Monday ${jm('2026-12-28', 'en')} according to their listings. Among the large ones: Colmar until 29 December and its food market until 3 January, Metz and Lille until the 30th, Mulhouse with the Cœur de Mulhouse until the 29th, Montpellier until the 30th, Poitiers and Perpignan until 3 January.`, open: true },
      { q: 'Are any Christmas markets open on 1 January?', a: `${C(le('2027-01-01'), 'en')} according to their listings, which is worth checking on site on a public holiday. They are mostly seaside Christmas villages, such as Le Barcarès, Collioure or Palavas-les-Flots, and a few markets in the east, such as Colmar, Gérardmer or Bouxwiller. The finder, set on 1 January, gives the list around you.` },
      { q: 'What is the last Christmas market of the season?', a: 'In the base, the Le Barcarès Christmas village, in the Pyrénées-Orientales, open until Sunday 10 January 2027 from 11:00 to 01:00 according to its listing. Two Haute-Vienne listings, at Châlus and Nexon, describe craft shops open until 8 January under the name of a Christmas fair.' },
    ],
    body: (x) => `<h2>Christmas markets after Christmas: Saturday 26 December</h2>
<p>The table lists the markets open on ${jl('2026-12-26', 'en')}, with their hours that day when the listing publishes them. Together with Sunday 27, it is the fullest day of the week between the holidays, and the last for many markets. Many large markets close on the evening of the 24th, like Strasbourg, or on the 27th, like Rouen and Toulouse; others reopen after closing on the 25th, like ${x.a('metz', 'Metz')} and ${x.a('mulhouse', 'Mulhouse')}.</p>
${B.tabJour(M, '2026-12-26', 'en', 30, 'Christmas markets open on Saturday 26 December 2026, longest first')}
<h2>In January 2027</h2>
<p>Nearly half of the ${C(janv, 'en')} markets open in January are by the sea, from the Catalan coast to the Côte Fleurie and the Basque Country. The others are in the Vosges, in Alsace, in the Eure, in Poitiers, in Haute-Vienne, in Béziers and in Perpignan. For the Mediterranean, see ${x.a('occitanie', 'the Occitanie page')}; for the Channel, ${x.a('normandie', 'the Normandy page')}. On a public holiday such as 1 January, it is best to check opening with the organiser: a listing entered in the autumn does not always say what happens that day.</p>
${B.tabMarches(janv, 'en', 'Christmas markets open on at least one day in January 2027', 25)}`,
  },
});

export default [alsace, weekEnds, nocturnes, apresNoel] as GuideDef[];
