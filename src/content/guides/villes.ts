/** Pages par ville. Chaque nombre vient de marches.json (lib/blocs.ts) ; Strasbourg et Lille de officiels.json. */
import { defineGuide, type GuideDef } from '../../lib/page-types';
import { MARCHES } from '../../lib/data';
import { distanceKm } from '../../lib/engine/marches';
import { B, C, N, jl, jm, h, type L } from './_f';

const un = (insee: string, motif: string) => MARCHES.find((m) => m.insee === insee && m.n.includes(motif));
const T = (l: L, fr: string, en: string) => (l === 'fr' ? fr : en);

// ── Strasbourg (page officielle, lue le 13 novembre 2026) ───────────────────────────────────────────────────────
const SXB = '67482', sxb = un(SXB, 'Strasbourg')!;
const sxb30 = B.rayon(SXB, 30);
const gourmandC = un('68066', 'Gourmand')!;
const strasbourg = defineGuide({
  id: 'strasbourg', group: 'villes', order: 1,
  outil: { ville: SXB, rayon: 30, vedette: { ids: [sxb.id], fr: 'le marché de Noël de Strasbourg', en: 'the Strasbourg Christmas market' } },
  related: ['colmar', 'kaysersberg', 'alsace', 'nocturnes'],
  sources: ['strasbourg', 'strasbourg-accueil', 'datagouv', 'datatourisme'],
  fr: {
    slug: 'marche-de-noel-strasbourg',
    nav: 'Strasbourg', card: 'Du 27 novembre au 24 décembre 2026, horaires jour par jour et marchés à moins de 30 km',
    title: 'Marché de Noël de Strasbourg 2026 : dates, horaires, accès',
    description: 'Marché de Noël de Strasbourg 2026 : du 27 novembre au 24 décembre, 11 h 30 à 21 h, nocturnes à 22 h, fermé le 25. Et les marchés ouverts à moins de 30 km.',
    h1: 'Marché de Noël de Strasbourg 2026 : dates, horaires et marchés voisins',
    intro: `Le marché de Noël de Strasbourg ouvre le vendredi ${jm(sxb.s!, 'fr')} et ferme le ${jl(sxb.e!, 'fr')} au soir. Choisissez un jour : le moteur de recherche donne les horaires de Strasbourg ce jour-là et les autres marchés ouverts autour.`,
    resume: `Selon la foire aux questions de la Ville de Strasbourg, lue le 13 novembre 2026, le marché de Noël se tient du vendredi 27 novembre au jeudi 24 décembre 2026, de 11 h 30 à 21 h tous les jours. Il y a quatre exceptions : le premier jour, ouverture à 14 h ; les vendredis et samedis 11, 12, 18 et 19 décembre, fermeture à 22 h ; le 24 décembre, fermeture à 18 h. Aucun chalet n'ouvre le 25 décembre ni jusqu'au Nouvel An : pour un marché entre Noël et le jour de l'an, il faut aller ailleurs. Les chalets sont répartis sur plusieurs places de la Grande Île, de la place Broglie à la cathédrale, et la Ville fait remonter son marché de Noël à 1570. Dans un rayon de 30 km, l'export DATAtourisme compte ${C(sxb30, 'fr')} autres fiches de marchés de Noël, souvent ouverts un seul week-end.`,
    faqs: [
      { q: 'Le marché de Noël de Strasbourg est-il ouvert le 25 décembre ?', a: `Non. La Ville de Strasbourg écrit que l\'ensemble des marchés ferme définitivement le 24 décembre au soir, à 18 h ce jour-là, et qu\'aucun chalet n\'est ouvert le 25 décembre ni jusqu\'au Nouvel An. Entre Noël et le 3 janvier, le marché gourmand de Colmar reste ouvert selon sa fiche DATAtourisme, à ${N(distanceKm(sxb, gourmandC), 'fr')} km à vol d'oiseau.`, open: true },
      { q: 'À quelle heure ferme le marché de Noël de Strasbourg le samedi ?', a: 'À 21 h, comme les autres jours, sauf les samedis 12 et 19 décembre 2026 où les chalets restent ouverts jusqu\'à 22 h, comme les vendredis 11 et 18 décembre. Le premier vendredi, 27 novembre, l\'ouverture est à 14 h. Le moteur de recherche en haut de page donne l\'horaire exact du jour choisi.' },
      { q: 'Comment éviter la foule au marché de Noël de Strasbourg ?', a: 'La Ville conseille de venir en matinée, dès 11 h 30, ou en semaine. Les samedis de décembre et les deux soirs de nocturne sont les plus chargés. Des contrôles d\'accès ont lieu à l\'entrée des ponts de la Grande Île : prévoyez quelques minutes d\'attente et privilégiez le tram ou les parkings relais.' },
    ],
    body: (x) => `<h2>Marché de Noël de Strasbourg : ce que dit la Ville</h2>
<p>La ${x.src('strasbourg', 'foire aux questions officielle')} donne les dates, les horaires et les exceptions repris ici, tels quels. Les chalets gardent les mêmes heures le samedi et le dimanche qu'en semaine. Les boissons sont servies dans un gobelet consigné. Pour venir, la Ville met en avant le tram, le vélo et les parkings relais en périphérie, et rappelle que vélos et trottinettes se tiennent à la main sur les places du marché pendant les heures d'ouverture.</p>
${B.tabMarches([sxb], 'fr', 'Strasbourg : dates et horaires lus sur la page de la Ville le 13 novembre 2026')}
<h2>Autour de Strasbourg : les marchés à moins de 30 km</h2>
<p>Strasbourg n'est pas dans la base DATAtourisme, mais ses voisins y sont. Le tableau classe les marchés à moins de 30 km par nombre de jours d'ouverture : en tête, ceux qui durent tout l'Avent, comme Obernai ; plus bas, les marchés de village d'un week-end. Le samedi ${jm('2026-11-28', 'fr')}, ${C(B.ouverts(sxb30, '2026-11-28'), 'fr')} de ces marchés sont ouverts, contre ${C(B.ouverts(sxb30, '2026-12-19'), 'fr')} le samedi ${jm('2026-12-19', 'fr')}.</p>
${B.tabAutour(SXB, 30, 'fr', 12, 'Marchés de Noël à moins de 30 km de Strasbourg, du plus long au plus court')}
<h2>Choisir son jour</h2>
<p>Le premier week-end de l'Avent cumule l'ouverture de Strasbourg et le plus grand nombre de petits marchés alentour. Les nocturnes des 11, 12, 18 et 19 décembre laissent une heure de plus le soir. Si vous visez aussi Colmar ou Kaysersberg, voyez ${x.a('alsace', 'les marchés d\'Alsace jour par jour')}.</p>`,
  },
  en: {
    slug: 'strasbourg-christmas-market',
    nav: 'Strasbourg', card: '27 November to 24 December 2026, hours day by day and markets within 30 km',
    title: 'Strasbourg Christmas market 2026: dates, hours and access',
    description: 'Strasbourg Christmas market 2026: 27 November to 24 December, 11:30 to 21:00, late nights to 22:00, closed on the 25th. Plus the markets open within 30 km.',
    h1: 'Strasbourg Christmas market 2026: dates, hours and nearby markets',
    intro: `The Strasbourg Christmas market opens on Friday ${jm(sxb.s!, 'en')} and closes on the evening of ${jl(sxb.e!, 'en')}. Pick a day: the finder gives Strasbourg's hours that day and the other markets open nearby.`,
    resume: `According to the City of Strasbourg's FAQ, read on 13 November 2026, the Christmas market runs from Friday 27 November to Thursday 24 December 2026, from 11:30 to 21:00 every day. There are four exceptions: on the first day it opens at 14:00; on Fridays and Saturdays 11, 12, 18 and 19 December it closes at 22:00; on 24 December it closes at 18:00. No stall opens on 25 December or until New Year, so for a market between Christmas and New Year you need to go elsewhere. Stalls are spread over several squares of the Grande Île, from place Broglie to the cathedral, and the City dates its Christmas market back to 1570. Within 30 km, the DATAtourisme export lists ${C(sxb30, 'en')} other Christmas market listings, many of them open for a single weekend.`,
    faqs: [
      { q: 'Is the Strasbourg Christmas market open on 25 December?', a: `No. The City of Strasbourg says all its markets close for good on the evening of 24 December, at 18:00 that day, and that no stall opens on 25 December or until New Year. Between Christmas and 3 January, the Colmar food market stays open according to its DATAtourisme listing, ${N(distanceKm(sxb, gourmandC), 'en')} km away as the crow flies.`, open: true },
      { q: 'What time does the Strasbourg market close on Saturdays?', a: 'At 21:00, like other days, except on Saturdays 12 and 19 December 2026 when stalls stay open until 22:00, as on Fridays 11 and 18 December. On the first Friday, 27 November, it opens at 14:00. The finder at the top gives the exact hours for the day you choose.' },
      { q: 'How can I avoid the crowds in Strasbourg?', a: 'The City advises coming in the morning, from 11:30, or on a weekday. December Saturdays and the two late-opening evenings are the busiest. Access checks take place at the bridges into the Grande Île, so allow a few minutes of queueing and prefer the tram or the park-and-ride car parks.' },
    ],
    body: (x) => `<h2>Strasbourg Christmas market: what the City says</h2>
<p>The ${x.src('strasbourg', 'official FAQ')} gives the dates, hours and exceptions shown here, unchanged. Stalls keep the same hours at weekends as on weekdays. Drinks are served in a deposit cup. To get there, the City recommends the tram, cycling and the park-and-ride car parks on the edge of town, and reminds visitors that bikes and scooters must be pushed on the market squares during opening hours.</p>
${B.tabMarches([sxb], 'en', 'Strasbourg: dates and hours read on the City page on 13 November 2026')}
<h2>Around Strasbourg: markets within 30 km</h2>
<p>Strasbourg is not in the DATAtourisme base, but its neighbours are. The table ranks the markets within 30 km by number of opening days: first those that last through Advent, such as Obernai; further down, village markets held over one weekend. On Saturday ${jm('2026-11-28', 'en')}, ${C(B.ouverts(sxb30, '2026-11-28'), 'en')} of them are open, against ${C(B.ouverts(sxb30, '2026-12-19'), 'en')} on Saturday ${jm('2026-12-19', 'en')}.</p>
${B.tabAutour(SXB, 30, 'en', 12, 'Christmas markets within 30 km of Strasbourg, longest first')}
<h2>Picking your day</h2>
<p>The first Advent weekend combines Strasbourg's opening with the largest number of small markets around it. The late openings on 11, 12, 18 and 19 December give you an extra hour in the evening. If you also plan Colmar or Kaysersberg, see ${x.a('alsace', 'Alsace markets day by day')}.</p>`,
  },
});

// ── Colmar ──────────────────────────────────────────────────────────────────────────────────────────────────────
const CMR = '68066', cmr = B.commune(CMR), gourmand = un(CMR, 'Gourmand')!, venise = un(CMR, 'Petite Venise')!;
const cmr10 = B.rayon(CMR, 10);
const colmar = defineGuide({
  id: 'colmar', group: 'villes', order: 2,
  outil: { ville: CMR, rayon: 20, vedette: { ids: cmr.map((m) => m.id), fr: 'les marchés de Noël de Colmar', en: 'the Colmar Christmas markets', pl: true } },
  related: ['kaysersberg', 'strasbourg', 'alsace', 'apres-noel'],
  sources: ['colmar', 'datagouv', 'datatourisme'],
  fr: {
    slug: 'marche-de-noel-colmar',
    nav: 'Colmar', card: `${C(cmr, 'fr')} marchés dans la ville, dès le 23 novembre, et le gourmand jusqu'au 3 janvier`,
    title: 'Marché de Noël de Colmar 2026 : dates, horaires, 6 marchés',
    description: 'Marché de Noël de Colmar 2026 : six marchés dès le 23 novembre, horaires de chaque place, le marché gourmand ouvert jusqu\'au 3 janvier et les villages autour.',
    h1: 'Marché de Noël de Colmar 2026 : ses six marchés, jour par jour',
    intro: `Le marché de Noël de Colmar, ce sont ${C(cmr, 'fr')} marchés publiés par l'office de tourisme, ouverts dès le ${jl(gourmand.s!, 'fr')}. Choisissez un jour pour voir lesquels sont ouverts, à quelle heure, et les villages voisins.`,
    resume: `D'après les fiches de l'office de tourisme de Colmar dans DATAtourisme, lues le 13 novembre 2026, les marchés de Noël de la ville ouvrent le lundi 23 novembre 2026, soit plusieurs jours avant Strasbourg. Cinq de ces six marchés, sur les places de la Petite Venise, Jeanne d'Arc, de l'Ancienne Douane, des Dominicains et du Koïfhus, ferment le 29 décembre ; ils ouvrent de 10 h à 20 h du vendredi au dimanche et de 11 h à 19 h du lundi au jeudi. Le sixième, le marché gourmand, va plus loin : ouvert tous les jours de 11 h à 22 h jusqu'au 30 décembre, de 11 h à 17 h le 31, puis du 1er au 3 janvier 2027. C'est l'un des rares marchés d'Alsace encore ouverts après Noël. L'entrée est gratuite partout. À moins de 10 km, ${C(cmr10, 'fr')} fiches de marchés de Noël s'ajoutent, dont Eguisheim, Turckheim et Riquewihr.`,
    faqs: [
      { q: 'Le marché de Noël de Colmar est-il ouvert après Noël ?', a: `Oui. Selon les fiches de l'office de tourisme, les places de la vieille ville restent ouvertes jusqu'au 29 décembre 2026, et le marché gourmand jusqu'au 3 janvier 2027, avec une fermeture à 17 h le 31 décembre. Le 25 décembre, la fiche de la Petite Venise indique ${h(venise, '2026-12-25', 'fr')}.`, open: true },
      { q: 'Quel jour aller au marché de Noël de Colmar ?', a: 'En semaine, les places ouvrent de 11 h à 19 h et la foule est moindre ; le vendredi, le samedi et le dimanche, elles ouvrent dès 10 h et ferment à 20 h. Le marché gourmand reste ouvert jusqu\'à 22 h tous les soirs jusqu\'au 30 décembre : c\'est le dernier à fermer le soir.' },
      { q: 'Peut-on faire Colmar et Kaysersberg dans la même journée ?', a: 'Oui, Kaysersberg est à une douzaine de kilomètres. Mais Kaysersberg n\'ouvre que du vendredi au dimanche, quatre week-ends de l\'Avent, de 10 h à 20 h : un samedi de décembre permet de faire Kaysersberg en journée et Colmar le soir, quand le marché gourmand ferme à 22 h.' },
    ],
    body: (x) => `<h2>Marché de Noël de Colmar : les places et leurs horaires</h2>
<p>Chaque place a sa fiche dans DATAtourisme, publiée par l'office de tourisme, avec des horaires qui changent selon le jour de la semaine. Le tableau donne l'horaire d'un samedi ; le moteur de recherche en haut de page donne celui du jour que vous choisissez. L'adresse donnée par les fiches renvoie au ${x.src('colmar', 'site de Noël de l\'office de tourisme')}, qui publie le plan des places.</p>
${B.tabMarches(cmr, 'fr', 'Les marchés de Noël de Colmar, d\'après les fiches de l\'office de tourisme')}
<h2>Les villages autour de Colmar</h2>
<p>La route des vins concentre plus de marchés au kilomètre carré que n'importe quelle autre zone de la base. Eguisheim et Turckheim sont à une dizaine de kilomètres et ouvrent tous les jours ou presque jusqu'au 30 décembre ; Riquewihr ferme le 20 décembre. Le samedi ${jm('2026-12-12', 'fr')}, ${C(B.ouverts(B.rayon(CMR, 20), '2026-12-12'), 'fr')} marchés sont ouverts à moins de 20 km de Colmar.</p>
${B.tabAutour(CMR, 20, 'fr', 12, 'Marchés de Noël à moins de 20 km de Colmar, du plus long au plus court')}
<p>Pour aller plus loin dans le Haut-Rhin, voyez ${x.a('kaysersberg', 'Kaysersberg')}, ${x.a('mulhouse', 'Mulhouse')} ou ${x.a('apres-noel', 'les marchés ouverts après Noël')}.</p>`,
  },
  en: {
    slug: 'colmar-christmas-market',
    nav: 'Colmar', card: `${C(cmr, 'en')} markets in town from 23 November, and the food market until 3 January`,
    title: 'Colmar Christmas market 2026: dates and hours of six markets',
    description: 'Colmar Christmas market 2026: six markets from 23 November, hours of each square, the food market open until 3 January and the wine villages around Colmar.',
    h1: 'Colmar Christmas market 2026: its six markets, day by day',
    intro: `The Colmar Christmas market is made of ${C(cmr, 'en')} markets entered by the tourist office, open from ${jl(gourmand.s!, 'en')}. Pick a day to see which are open, at what time, and the villages nearby.`,
    resume: `According to the Colmar tourist office listings in DATAtourisme, read on 13 November 2026, the town's Christmas markets open on Monday 23 November 2026, several days before Strasbourg. Five of these six markets, on the squares of Little Venice, place Jeanne d'Arc, the Old Customs House, the Dominicans and the Koïfhus, close on 29 December; they open from 10:00 to 20:00 Friday to Sunday and from 11:00 to 19:00 Monday to Thursday. The sixth, the food market, goes further: open every day from 11:00 to 22:00 until 30 December, from 11:00 to 17:00 on the 31st, then from 1 to 3 January 2027. It is one of the few Alsace markets still open after Christmas. Entry is free everywhere. Within 10 km, ${C(cmr10, 'en')} more Christmas market listings appear, including Eguisheim, Turckheim and Riquewihr.`,
    faqs: [
      { q: 'Is the Colmar Christmas market open after Christmas?', a: `Yes. According to the tourist office listings, the old town squares stay open until 29 December 2026 and the food market until 3 January 2027, closing at 17:00 on 31 December. For 25 December, the Little Venice listing gives ${h(venise, '2026-12-25', 'en')}.`, open: true },
      { q: 'Which day is best for the Colmar market?', a: 'On weekdays the squares open from 11:00 to 19:00 and it is quieter; on Friday, Saturday and Sunday they open at 10:00 and close at 20:00. The food market stays open until 22:00 every evening until 30 December, so it is the last to close at night.' },
      { q: 'Can I do Colmar and Kaysersberg on the same day?', a: 'Yes, Kaysersberg is about twelve kilometres away. But Kaysersberg only opens Friday to Sunday over four Advent weekends, from 10:00 to 20:00: a December Saturday lets you see Kaysersberg by day and Colmar in the evening, when the food market closes at 22:00.' },
    ],
    body: (x) => `<h2>Colmar Christmas market: the squares and their hours</h2>
<p>Each square has its own DATAtourisme listing, entered by the tourist office, with hours that change with the day of the week. The table shows a Saturday; the finder at the top shows the day you pick. The listings link to the ${x.src('colmar', 'tourist office Christmas site')}, which publishes the map of the squares. The squares are a few minutes' walk apart, so one evening is enough to see them all; the food market, with its seated stalls, is the one most often chosen for dinner. Opening days and hours are those entered by the tourist office, read on 13 November 2026.</p>
${B.tabMarches(cmr, 'en', 'Colmar Christmas markets, from the tourist office listings')}
<h2>The villages around Colmar</h2>
<p>The wine route has more markets per square kilometre than any other area in the base. Eguisheim and Turckheim are about ten kilometres away and open nearly every day until 30 December; Riquewihr closes on 20 December. On Saturday ${jm('2026-12-12', 'en')}, ${C(B.ouverts(B.rayon(CMR, 20), '2026-12-12'), 'en')} markets are open within 20 km of Colmar.</p>
${B.tabAutour(CMR, 20, 'en', 12, 'Christmas markets within 20 km of Colmar, longest first')}
<p>To go further in the Haut-Rhin, see ${x.a('kaysersberg', 'Kaysersberg')}, ${x.a('mulhouse', 'Mulhouse')} or ${x.a('apres-noel', 'markets open after Christmas')}.</p>`,
  },
});

// ── Lille (page officielle, lue le 13 novembre 2026) ───────────────────────────────────────────────────────────
const LIL = '59350', lil = un(LIL, 'Lille')!;
const lille = defineGuide({
  id: 'lille', group: 'villes', order: 3,
  outil: { ville: LIL, rayon: 30, vedette: { ids: [lil.id], fr: 'le Village de Noël de Lille', en: 'the Lille Christmas Village' } },
  related: ['amiens', 'reims', 'nocturnes', 'week-ends'],
  sources: ['lille', 'datagouv'],
  fr: {
    slug: 'marche-de-noel-lille',
    nav: 'Lille', card: 'Place Rihour du 18 novembre au 30 décembre 2026, 22 h le vendredi et le samedi',
    title: 'Marché de Noël de Lille 2026 : dates, horaires, place Rihour',
    description: 'Marché de Noël de Lille 2026 : Village de Noël place Rihour du 18 novembre au 30 décembre, 11 h à 20 h 30, 22 h le week-end, fermé le 25. Accès en métro.',
    h1: 'Marché de Noël de Lille 2026 : le Village de Noël de la place Rihour',
    intro: `Le marché de Noël de Lille, appelé Village de Noël, ouvre le ${jl(lil.s!, 'fr')} place Rihour et ferme le ${jl(lil.e!, 'fr')}. Choisissez un jour : le moteur de recherche donne l'horaire exact et dit s'il est ouvert maintenant.`,
    resume: `La Ville de Lille annonce son Village de Noël 2026 place Rihour, du 18 novembre au 30 décembre 2026 (page lue le 13 novembre 2026). Les horaires changent selon le jour : de 11 h à 20 h 30 du dimanche au jeudi, de 11 h à 22 h le vendredi et le samedi. Le 24 décembre, il ferme à 18 h, et il reste fermé le 25 décembre ; il rouvre ensuite jusqu'au 30. Le métro s'arrête à la station Rihour, et les gares Lille Flandres et Lille Europe sont desservies par le train. Organisé par la Fédération lilloise du commerce, le village compte 90 chalets ; créé en 1989, il est installé place Rihour depuis 1996. Aucune autre fiche de marché de Noël de la métropole n'est publiée dans DATAtourisme : le moteur de recherche ne montre donc que Lille dans un rayon de 30 km.`,
    faqs: [
      { q: 'Le marché de Noël de Lille est-il ouvert le dimanche soir ?', a: 'Oui, jusqu\'à 20 h 30, comme du lundi au jeudi. Seuls le vendredi et le samedi vont jusqu\'à 22 h. Le moteur de recherche en haut de page affiche l\'horaire du jour choisi et, si ce jour est aujourd\'hui, indique si les chalets sont ouverts à l\'heure de votre appareil.', open: true },
      { q: 'Le Village de Noël de Lille est-il ouvert entre Noël et le jour de l\'an ?', a: 'En partie : il ferme le 25 décembre, rouvre du 26 au 30 décembre aux horaires habituels, jusqu\'à 22 h les vendredis et samedis, puis ferme pour la saison. Le 31 décembre, la page de la Ville n\'annonce aucune ouverture. Pour un marché le jour de l\'an, le moteur de recherche liste ceux qui restent ouverts en janvier.' },
      { q: 'Où se garer pour le marché de Noël de Lille ?', a: 'La Ville renvoie aux parkings Indigo du centre et cite aussi le métro, station Rihour, ou le train jusqu\'à Lille Flandres ou Lille Europe, à quelques minutes à pied. Les chiens sont acceptés, tenus en laisse par une personne majeure.' },
    ],
    body: (x) => `<h2>Marché de Noël de Lille : les horaires de la Ville</h2>
<p>Les dates et les heures viennent de la ${x.src('lille', 'page de la Ville de Lille')} consacrée au Village de Noël 2026. Lille ne publie pas son marché dans DATAtourisme : nous l'avons relu à la main et la date de lecture est indiquée. La Ville précise aussi que les chauffages électriques ne sont pas autorisés dans les chalets, que les boissons sont servies dans des gobelets réutilisables et que les décorations lumineuses ne s'allument qu'à partir de 17 h.</p>
${B.tabMarches([lil], 'fr', 'Lille : dates et horaires lus sur la page de la Ville le 13 novembre 2026')}
<h2>Les autres marchés autour de Lille</h2>
<p>Dans les Hauts-de-France, les offices de tourisme du Nord et du Pas-de-Calais publient très peu de marchés de Noël dans DATAtourisme : la région n'en compte que ${C(B.deRegion('hauts-de-france'), 'fr')} dans l'export, surtout dans l'Oise et la Somme. Pour les communes de la métropole, consultez leur agenda. Plus au sud, ${x.a('amiens', 'Amiens')} a sa fiche, et ${x.a('reims', 'Reims')} est à moins de deux heures. Pour un soir de semaine, voyez ${x.a('nocturnes', 'les marchés qui ferment tard')}.</p>`,
  },
  en: {
    slug: 'lille-christmas-market',
    nav: 'Lille', card: 'Place Rihour, 18 November to 30 December 2026, until 22:00 on Fridays and Saturdays',
    title: 'Lille Christmas market 2026: dates, hours, place Rihour',
    description: 'Lille Christmas market 2026: Christmas Village on place Rihour from 18 November to 30 December, 11:00 to 20:30, 22:00 at weekends, closed on the 25th. By metro.',
    h1: 'Lille Christmas market 2026: the Christmas Village on place Rihour',
    intro: `The Lille Christmas market, called the Christmas Village, opens on ${jl(lil.s!, 'en')} on place Rihour and closes on ${jl(lil.e!, 'en')}. Pick a day: the finder gives the exact hours and says whether it is open right now.`,
    resume: `The City of Lille announces its 2026 Christmas Village on place Rihour from 18 November to 30 December 2026 (page read on 13 November 2026). Hours change with the day: from 11:00 to 20:30 Sunday to Thursday, from 11:00 to 22:00 on Friday and Saturday. On 24 December it closes at 18:00, and it stays shut on 25 December; it then reopens until the 30th. The metro stops at Rihour station, and Lille Flandres and Lille Europe stations are served by train. Run by the Fédération lilloise du commerce, the village has 90 stalls; created in 1989, it has stood on place Rihour since 1996. No other Christmas market in the Lille metropolitan area is entered in DATAtourisme, so the finder only shows Lille within a 30 km radius.`,
    faqs: [
      { q: 'Is the Lille Christmas market open on Sunday evening?', a: 'Yes, until 20:30, as from Monday to Thursday. Only Friday and Saturday go on until 22:00. The finder at the top shows the hours for the day you choose and, if that day is today, tells you whether the stalls are open at your device\'s time.', open: true },
      { q: 'Is the Lille Christmas Village open between Christmas and New Year?', a: 'Partly: it closes on 25 December, reopens from 26 to 30 December at the usual times, until 22:00 on Fridays and Saturdays, then closes for the season. The City page announces no opening on 31 December. For a market on New Year\'s Day, the finder lists those still open in January.' },
      { q: 'Where should I park for the Lille Christmas market?', a: 'The City points to the Indigo car parks in the centre and also lists the metro, Rihour station, or the train to Lille Flandres or Lille Europe, a few minutes on foot. Dogs are allowed on a lead held by an adult.' },
    ],
    body: (x) => `<h2>Lille Christmas market: the City's hours</h2>
<p>Dates and times come from the ${x.src('lille', 'City of Lille page')} on the 2026 Christmas Village. Lille does not publish its market in DATAtourisme, so we read it by hand and show the reading date. The City also says electric heaters are not allowed in the stalls, that drinks come in reusable cups and that the lights only come on from 17:00. Dogs are allowed on a lead held by an adult. If the City changes its hours during the season, the table below will lag behind until our next reading: check the City page before a long trip.</p>
${B.tabMarches([lil], 'en', 'Lille: dates and hours read on the City page on 13 November 2026')}
<h2>Other markets around Lille</h2>
<p>In Hauts-de-France, the tourist offices of the Nord and Pas-de-Calais enter very few Christmas markets in DATAtourisme: the region has only ${C(B.deRegion('hauts-de-france'), 'en')} in the export, mostly in the Oise and the Somme. For the towns around Lille, check their own event pages. Further south, ${x.a('amiens', 'Amiens')} has its listing, and ${x.a('reims', 'Reims')} is under two hours away. For a weekday evening, see ${x.a('nocturnes', 'markets that close late')}.</p>`,
  },
});

// ── Reims ───────────────────────────────────────────────────────────────────────────────────────────────────────
const RMS = '51454', rms = un(RMS, 'Reims')!, rms30 = B.rayon(RMS, 30);
const reims = defineGuide({
  id: 'reims', group: 'villes', order: 4,
  outil: { ville: RMS, rayon: 30, vedette: { ids: [rms.id], fr: 'le marché de Noël de Reims', en: 'the Reims Christmas market' } },
  related: ['grand-est', 'amiens', 'week-ends', 'lille'],
  sources: ['reims', 'datagouv', 'datatourisme'],
  fr: {
    slug: 'marche-de-noel-reims',
    nav: 'Reims', card: 'Du 25 novembre au 27 décembre 2026, et les marchés des villages de Champagne',
    title: 'Marché de Noël de Reims 2026 : dates et marchés en Champagne',
    description: 'Marché de Noël de Reims 2026 : du 25 novembre au 27 décembre, entrée libre, et les marchés de Noël des villages de Champagne ouverts le week-end du 12 décembre.',
    h1: 'Marché de Noël de Reims 2026 : dates et villages de Champagne',
    intro: `Le marché de Noël de Reims ouvre le ${jl(rms.s!, 'fr')} et ferme le ${jl(rms.e!, 'fr')}, selon la fiche de l'office de tourisme. Choisissez un jour pour voir Reims et les marchés de la Montagne de Reims ouverts ce jour-là.`,
    resume: `La fiche DATAtourisme du marché de Noël de Reims, publiée par Reims Tourisme et lue le 13 novembre 2026, donne une ouverture tous les jours du mercredi 25 novembre au dimanche 27 décembre 2026, soit ${N(B.joursSaison(rms).length, 'fr')} jours d'ouverture, et une entrée gratuite. Elle ne donne pas d'horaires : le moteur de recherche affiche donc « horaires non publiés » pour Reims, et la page de la Ville reste la référence avant de partir. Autour, la Marne et les Ardennes comptent ${C(rms30, 'fr')} marchés de Noël à moins de 30 km, pour la plupart concentrés sur un seul week-end : celui du 12 et 13 décembre réunit plusieurs villages viticoles, comme Mailly-Champagne, Aÿ-Champagne et Cumières, avec des horaires de 10 h à 19 h environ selon les fiches.`,
    faqs: [
      { q: 'Quels sont les horaires du marché de Noël de Reims ?', a: 'La fiche DATAtourisme ne les publie pas : elle donne seulement les dates, du 25 novembre au 27 décembre 2026, tous les jours. Nous n\'inventons pas d\'heure. Avant de partir, consultez la page de la Ville de Reims, que la fiche cite comme référence, ou l\'office de tourisme.', open: true },
      { q: 'Le marché de Noël de Reims est-il ouvert le 25 décembre ?', a: 'La fiche le donne ouvert tous les jours entre le 25 novembre et le 27 décembre, sans exception pour Noël. Comme beaucoup de marchés changent leurs horaires ce jour-là, vérifiez auprès de l\'organisateur : la fiche ne détaille pas d\'heure de fermeture pour le 24 ni pour le 25.' },
      { q: 'Y a-t-il des marchés de Noël dans les villages de Champagne ?', a: 'Oui. À moins de 25 km de Reims, plusieurs villages tiennent un marché sur un week-end, souvent celui des 12 et 13 décembre : Mailly-Champagne, Aÿ-Champagne et Cumières notamment. Le tableau de la page les liste avec leurs dates, et le moteur de recherche leurs horaires jour par jour.' },
    ],
    body: (x) => `<h2>Marché de Noël de Reims : ce que contient la fiche</h2>
<p>La fiche renvoie à la ${x.src('reims', 'page de la Ville de Reims')} sur son marché de Noël. Elle mentionne un accès libre et des dates continues, sans jour de fermeture. C'est tout ce que publie l'office de tourisme dans la base nationale ; nous ne complétons pas avec la presse. L'absence d'horaires n'est pas une fermeture : elle signifie seulement que l'heure d'ouverture n'a pas été publiée. Si vous venez de loin, appelez l'office de tourisme ou lisez la page de la Ville la veille, car les horaires des 24 et 25 décembre changent souvent au dernier moment.</p>
${B.tabMarches([rms], 'fr', 'Reims : la fiche DATAtourisme lue le 13 novembre 2026')}
<h2>Les villages autour de Reims</h2>
<p>La couronne de Reims est faite de petits marchés de village, souvent dans une salle des fêtes ou chez un vigneron. Le tableau les range par nombre de jours d'ouverture. Le samedi ${jm('2026-12-12', 'fr')}, ${C(B.ouverts(rms30, '2026-12-12'), 'fr')} marchés sont ouverts à moins de 30 km, contre ${C(B.ouverts(rms30, '2026-11-28'), 'fr')} le ${jm('2026-11-28', 'fr')}.</p>
${B.tabAutour(RMS, 30, 'fr', 12, 'Marchés de Noël à moins de 30 km de Reims')}
<p>Toute la région est sur ${x.a('grand-est', 'la page Grand Est')}, département par département. Pour combiner Reims avec un autre grand marché du nord, voyez ${x.a('amiens', 'Amiens')}, ouvert jusqu'au 30 décembre.</p>`,
  },
  en: {
    slug: 'reims-christmas-market',
    nav: 'Reims', card: '25 November to 27 December 2026, and the markets of the Champagne villages',
    title: 'Reims Christmas market 2026: dates and Champagne villages',
    description: 'Reims Christmas market 2026: 25 November to 27 December, free entry, plus the Christmas markets of the Champagne villages open over the weekend of 12 December.',
    h1: 'Reims Christmas market 2026: dates and Champagne villages',
    intro: `The Reims Christmas market opens on ${jl(rms.s!, 'en')} and closes on ${jl(rms.e!, 'en')}, according to the tourist office listing. Pick a day to see Reims and the markets of the Montagne de Reims open that day.`,
    resume: `The DATAtourisme listing for the Reims Christmas market, entered by Reims Tourisme and read on 13 November 2026, gives it open every day from Wednesday 25 November to Sunday 27 December 2026, which makes ${N(B.joursSaison(rms).length, 'en')} opening days in a row, with free entry. It gives no hours, so the finder shows "hours not published" for Reims, and the City's page remains the reference before you set off. Around it, the Marne and the Ardennes have ${C(rms30, 'en')} Christmas markets within 30 km, most of them held over a single weekend: the one of 12 and 13 December brings together several wine villages, such as Mailly-Champagne, Aÿ-Champagne and Cumières, open roughly from 10:00 to 19:00 according to their listings, so one Saturday can cover Reims and two or three villages.`,
    faqs: [
      { q: 'What are the opening hours of the Reims Christmas market?', a: 'The DATAtourisme listing does not publish them: it only gives the dates, every day from 25 November to 27 December 2026. We do not invent times. Before you go, check the City of Reims page, which the listing gives as its reference, or the tourist office.', open: true },
      { q: 'Is the Reims Christmas market open on 25 December?', a: 'The listing shows it open every day between 25 November and 27 December, with no exception for Christmas. Since many markets change their hours that day, check with the organiser: the listing gives no closing time for the 24th or the 25th.' },
      { q: 'Are there Christmas markets in the Champagne villages?', a: 'Yes. Within 25 km of Reims, several villages hold a market over one weekend, often 12 and 13 December: Mailly-Champagne, Aÿ-Champagne and Cumières among them. The table on this page lists them with their dates, and the finder gives their hours day by day.' },
    ],
    body: (x) => `<h2>Reims Christmas market: what the listing contains</h2>
<p>The listing links to the ${x.src('reims', 'City of Reims page')} on its Christmas market. It mentions free access and continuous dates, with no closing day. That is all the tourist office publishes in the national base; we do not fill the gaps from the press. Missing hours do not mean the market is closed: they only mean the opening time was not entered. If you travel from far away, call the tourist office or read the City page the day before, since hours on 24 and 25 December often change at the last minute.</p>
${B.tabMarches([rms], 'en', 'Reims: the DATAtourisme listing read on 13 November 2026')}
<h2>The villages around Reims</h2>
<p>The ring around Reims is made of small village markets, often in a village hall or at a winegrower's. The table ranks them by number of opening days. On Saturday ${jm('2026-12-12', 'en')}, ${C(B.ouverts(rms30, '2026-12-12'), 'en')} markets are open within 30 km, against ${C(B.ouverts(rms30, '2026-11-28'), 'en')} on ${jm('2026-11-28', 'en')}.</p>
${B.tabAutour(RMS, 30, 'en', 12, 'Christmas markets within 30 km of Reims')}
<p>The whole region is on ${x.a('grand-est', 'the Grand Est page')}, département by département. To combine Reims with another large northern market, see ${x.a('amiens', 'Amiens')}, open until 30 December.</p>`,
  },
});

// ── Amiens ──────────────────────────────────────────────────────────────────────────────────────────────────────
const AMS = '80021', ams = un(AMS, 'Amiens')!, ams30 = B.rayon(AMS, 30);
const amiens = defineGuide({
  id: 'amiens', group: 'villes', order: 5,
  outil: { ville: AMS, rayon: 30, vedette: { ids: [ams.id], fr: "le marché de Noël d'Amiens", en: 'the Amiens Christmas market' } },
  related: ['lille', 'reims', 'week-ends', 'apres-noel'],
  sources: ['amiens', 'datagouv', 'datatourisme'],
  fr: {
    slug: 'marche-de-noel-amiens',
    nav: 'Amiens', card: 'Du 20 novembre au 30 décembre 2026, tous les jours, entrée libre',
    title: 'Marché de Noël d\'Amiens 2026 : dates, jours et accès',
    description: 'Marché de Noël d\'Amiens 2026 : ouvert du 20 novembre au 30 décembre selon l\'office de tourisme, entrée gratuite, et les marchés de la Somme à moins de 30 km.',
    h1: 'Marché de Noël d\'Amiens 2026 : six semaines dans le centre',
    intro: `Le marché de Noël d'Amiens est ouvert du ${jl(ams.s!, 'fr')} au ${jl(ams.e!, 'fr')} d'après sa fiche. Choisissez un jour : le moteur de recherche confirme l'ouverture et liste les autres marchés de la Somme ouverts ce jour-là.`,
    resume: `Avec ${N(B.joursSaison(ams).length, 'fr')} jours d'ouverture, du vendredi 20 novembre au mercredi 30 décembre 2026, le marché de Noël d'Amiens est l'un des plus longs du nord de la France dans la base DATAtourisme, d'après la fiche de l'office de tourisme d'Amiens lue le 13 novembre 2026. L'entrée est gratuite. La fiche ne donne pas d'horaires, seulement des jours : le moteur de recherche affiche donc « horaires non publiés », et le site du marché cité par la fiche reste la référence. Il ouvre une semaine avant la plupart des grands marchés et reste ouvert après Noël, jusqu'au 30 décembre. Dans un rayon de 30 km, la base ne compte que ${C(ams30, 'fr')} fiches, surtout des marchés d'un week-end dans la vallée de la Somme, comme au château de Picquigny les 12 et 13 décembre.`,
    faqs: [
      { q: 'Le marché de Noël d\'Amiens est-il ouvert le lundi ?', a: 'Oui, d\'après la fiche de l\'office de tourisme, qui le donne ouvert tous les jours du 20 novembre au 30 décembre 2026, sans jour de fermeture. Les horaires ne sont pas publiés dans la fiche : vérifiez-les sur le site du marché avant un déplacement en semaine, où les fermetures sont souvent plus tôt.', open: true },
      { q: 'Combien de temps dure le marché de Noël d\'Amiens ?', a: `Environ six semaines : ${N(B.joursSaison(ams).length, 'fr')} jours entre le 20 novembre et le 30 décembre 2026. C'est plus que Strasbourg, qui ouvre le 27 novembre et ferme le 24 décembre, et autant que le Village de Noël de Lille, qui ferme aussi le 30 décembre.` },
      { q: 'Quels marchés de Noël autour d\'Amiens ?', a: 'Peu sont publiés dans DATAtourisme. Le plus proche est celui du château de Picquigny, à une dizaine de kilomètres, les 12 et 13 décembre de 11 h à 17 h selon sa fiche. Les autres communes de la Somme publient leurs marchés dans leur propre agenda, que nous ne reprenons pas.' },
    ],
    body: (x) => `<h2>Marché de Noël d'Amiens : la fiche de l'office de tourisme</h2>
<p>La fiche renvoie au ${x.src('amiens', 'site du marché de Noël d\'Amiens')}. Elle est publiée par l'office de tourisme d'Amiens et indique une période continue, sans jour de fermeture, et un accès gratuit. Le tableau la reprend ; le moteur de recherche confirme l'ouverture jour par jour. Sans horaires publiés, nous ne pouvons pas dire à quelle heure les chalets ferment le soir ni s'ils ouvrent le matin en semaine : le site du marché, cité par la fiche, est la seule référence pour cela. Les jours, eux, sont ceux de la fiche lue le 13 novembre 2026.</p>
${B.tabMarches([ams], 'fr', 'Amiens : la fiche DATAtourisme lue le 13 novembre 2026')}
<h2>Dans la Somme, autour d'Amiens</h2>
<p>La Somme compte ${C(B.deDeps(['80']), 'fr')} fiches de marchés de Noël dans l'export, réparties entre la côte et la vallée. Pour une sortie le dernier week-end avant Noël, comparez avec ${x.a('lille', 'Lille')} ou avec ${x.a('week-ends', 'le calendrier des week-ends de l\'Avent')}. Pour une sortie après le 25, voyez ${x.a('apres-noel', 'les marchés encore ouverts entre Noël et le jour de l\'an')}.</p>
${B.tabAutour(AMS, 30, 'fr', 10, 'Marchés de Noël à moins de 30 km d\'Amiens')}`,
  },
  en: {
    slug: 'amiens-christmas-market',
    nav: 'Amiens', card: '20 November to 30 December 2026, every day, free entry',
    title: 'Amiens Christmas market 2026: dates, opening days, access',
    description: 'Amiens Christmas market 2026: open from 20 November to 30 December according to the tourist office, free entry, plus the Somme markets within 30 km of Amiens.',
    h1: 'Amiens Christmas market 2026: six weeks in the city centre',
    intro: `The Amiens Christmas market is open from ${jl(ams.s!, 'en')} to ${jl(ams.e!, 'en')} according to its listing. Pick a day: the finder confirms it is open and lists the other Somme markets open that day.`,
    resume: `With ${N(B.joursSaison(ams).length, 'en')} opening days, from Friday 20 November to Wednesday 30 December 2026, the Amiens Christmas market is one of the longest in northern France in the DATAtourisme base, according to the Amiens tourist office listing read on 13 November 2026. Entry is free. The listing gives days but no hours, so the finder shows "hours not published", and the market's own site, cited by the listing, remains the reference. It opens a week before most large markets and stays open after Christmas, until 30 December. Within 30 km, the base holds only ${C(ams30, 'en')} listings, mostly weekend markets in the Somme valley, such as the one at Picquigny castle on 12 and 13 December, open from 11:00 to 17:00 on both days.`,
    faqs: [
      { q: 'Is the Amiens Christmas market open on Mondays?', a: 'Yes, according to the tourist office listing, which shows it open every day from 20 November to 30 December 2026 with no closing day. Hours are not published in the listing, so check them on the market\'s site before a weekday trip, when closing is often earlier.', open: true },
      { q: 'How long does the Amiens Christmas market last?', a: `About six weeks: ${N(B.joursSaison(ams).length, 'en')} days between 20 November and 30 December 2026. That is longer than Strasbourg, which opens on 27 November and closes on 24 December, and as long as the Lille Christmas Village, which also closes on 30 December.` },
      { q: 'Which Christmas markets are there around Amiens?', a: 'Few are entered in DATAtourisme. The nearest is at Picquigny castle, about ten kilometres away, on 12 and 13 December from 11:00 to 17:00 according to its listing. Other Somme towns publish their markets in their own event pages, which we do not copy.' },
    ],
    body: (x) => `<h2>Amiens Christmas market: the tourist office listing</h2>
<p>The listing links to the ${x.src('amiens', 'Amiens Christmas market site')}. It is entered by the Amiens tourist office and gives one continuous period, with no closing day, and free entry. The table shows it; the finder confirms opening day by day. With no hours entered, we cannot say when the stalls close in the evening or whether they open in the morning on weekdays: the market's site, cited by the listing, is the only reference for that. The days, on the other hand, are those of the listing read on 13 November 2026.</p>
${B.tabMarches([ams], 'en', 'Amiens: the DATAtourisme listing read on 13 November 2026')}
<h2>In the Somme, around Amiens</h2>
<p>The Somme has ${C(B.deDeps(['80']), 'en')} Christmas market listings in the export, spread between the coast and the valley. For a trip on the last weekend before Christmas, compare with ${x.a('lille', 'Lille')} or with ${x.a('week-ends', 'the Advent weekend calendar')}. For a trip after the 25th, see ${x.a('apres-noel', 'markets still open between Christmas and New Year')}.</p>
${B.tabAutour(AMS, 30, 'en', 10, 'Christmas markets within 30 km of Amiens')}`,
  },
});

export default [strasbourg, colmar, lille, reims, amiens] as GuideDef[];
