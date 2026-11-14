/** Accueil, français et anglais. Chaque nombre vient de marches.json (lib/blocs.ts) ou de import-stats.json. */
import type { FAQ } from '../lib/page-types';
import { B, C, N, STATS, jm } from './guides/_f';
import { MARCHES, REGIONS } from '../lib/data';

type L = 'fr' | 'en';
interface Fold { h: string; html: string }
interface HomeLang {
  title: string; description: string; h1: string; intro: string; resume: string; homeCard: string;
  chiffresTitle: string; chiffres: Array<[string, string]>; chiffresNote: string;
  regionsTitle: string; regionsNote: string; couverture: string;
  questionsTitle: string; questions: Array<{ id: string; q: string; a: string }>;
  guidesTitle: string; foldTitle: string; folds: Fold[]; faqs: FAQ[];
}
const M = MARCHES;
const sam28 = B.ouverts(M, '2026-11-28'), sam5 = B.ouverts(M, '2026-12-05'), sam12 = B.ouverts(M, '2026-12-12'), sam19 = B.ouverts(M, '2026-12-19');
const le24 = B.ouverts(M, '2026-12-24'), le25 = B.ouverts(M, '2026-12-25'), apres = B.ouvertsApres(M, '2026-12-26'), janv = B.ouvertsApres(M, '2027-01-01');
const unj = B.unJour(M), lg = B.longs(M, 20), noct = B.nocturnes(M, '21:00'), hor = B.avecHoraires(M), grat = B.gratuits(M);
const alsace = B.deDeps(['67', '68']);
const pct = (a: number, b: number, l: L) => `${N(Math.round((100 * a) / b), l)}${l === 'fr' ? ' %' : '%'}`;

const fr: HomeLang = {
  title: 'Marchés de Noël 2026 : ouverts aujourd\'hui près de chez vous',
  description: 'Marchés de Noël 2026 en France : lesquels sont ouverts le jour choisi, à quelle heure ils ferment et à quelle distance, d\'après les offices de tourisme.',
  h1: 'Marchés de Noël 2026 : lesquels sont ouverts près de chez vous',
  homeCard: 'Les marchés de Noël ouverts le jour de votre choix, autour de votre ville ou de votre position',
  intro: `Choisissez une ville de départ ou votre position, un jour et une distance : le moteur de recherche parcourt les ${N(STATS.marches, 'fr')} marchés de Noël de la saison 2026 et donne ceux qui sont ouverts, leurs horaires ce jour-là et le chemin.`,
  resume: `La saison 2026 des marchés de Noël compte ${N(STATS.marches, 'fr')} marchés dans ${N(STATS.communes, 'fr')} communes, d'après DATAtourisme, la base nationale où les offices de tourisme publient leurs événements, lue le 13 novembre 2026 et complétée pour Strasbourg et Lille par leurs pages officielles. Le samedi ${jm('2026-11-28', 'fr')}, premier week-end de l'Avent, ${C(sam28, 'fr')} sont ouverts ; le samedi ${jm('2026-12-05', 'fr')}, ${C(sam5, 'fr')}, le plus haut des samedis ; le samedi ${jm('2026-12-19', 'fr')}, il n'en reste que ${C(sam19, 'fr')}. Le 24 décembre, ${C(le24, 'fr')} ouvrent encore, et seulement ${C(apres, 'fr')} après Noël. La plupart sont des marchés de village : ${C(unj, 'fr')} ne durent qu'un jour, et ${C(lg, 'fr')} seulement restent ouverts vingt jours ou plus. L'Alsace en réunit ${C(alsace, 'fr')}. ${C(hor, 'fr')} fiches publient des horaires ; pour les autres, le moteur de recherche écrit « non publiés » plutôt que de deviner. Chaque résultat renvoie à la fiche de l'office de tourisme ou au site de l'organisateur, à vérifier avant un long trajet.`,
  questionsTitle: 'Les questions que l\'on se pose avant de partir',
  questions: [
    { id: 'strasbourg', q: 'Quand ouvre le marché de Noël de Strasbourg ?', a: 'Du 27 novembre au 24 décembre 2026, de 11 h 30 à 21 h, d\'après la Ville.' },
    { id: 'colmar', q: 'Colmar est-il ouvert après Noël ?', a: 'Oui : les places jusqu\'au 29 décembre, le marché gourmand jusqu\'au 3 janvier.' },
    { id: 'week-ends', q: 'Quel week-end compte le plus de marchés ?', a: 'Les week-ends de l\'Avent, comparés samedi et dimanche.' },
    { id: 'nocturnes', q: 'Où aller un soir après le travail ?', a: `${C(noct, 'fr')} marchés ferment à 21 h ou plus tard au moins un soir.` },
    { id: 'apres-noel', q: 'Lesquels restent ouverts entre Noël et le jour de l\'an ?', a: `${C(apres, 'fr')} marchés après le 25 décembre, ${C(janv, 'fr')} en janvier.` },
    { id: 'alsace', q: 'Quels marchés faire en Alsace le même jour ?', a: 'Strasbourg, Colmar, Kaysersberg, Riquewihr, Eguisheim : jour par jour.' },
  ],
  chiffresTitle: 'Les marchés de Noël 2026 en chiffres',
  chiffres: [
    ['Marchés de Noël de la saison 2026', N(STATS.marches, 'fr')],
    ['Communes concernées', N(STATS.communes, 'fr')],
    ['Ouverts le samedi 28 novembre', C(sam28, 'fr')],
    ['Ouverts le samedi 5 décembre', C(sam5, 'fr')],
    ['Ouverts le samedi 12 décembre', C(sam12, 'fr')],
    ['Ouverts le 24 décembre', C(le24, 'fr')],
    ['Ouverts le 25 décembre', C(le25, 'fr')],
    ['Ouverts au moins un jour après Noël', C(apres, 'fr')],
    ['Avec horaires publiés', `${C(hor, 'fr')} (${pct(hor.length, M.length, 'fr')})`],
    ['Entrée gratuite indiquée', C(grat, 'fr')],
  ],
  chiffresNote: 'Comptes faits sur l\'export DATAtourisme lu le 13 novembre 2026, plus Strasbourg et Lille relus sur leurs pages officielles. Un marché compte un jour s\'il a lieu ce jour-là, à n\'importe quelle heure.',
  regionsTitle: 'Les marchés de Noël par région',
  regionsNote: 'À savoir avant de lire : les offices de tourisme ne publient pas tous leurs marchés dans la base nationale. L\'Île-de-France, la Corse et une partie des Hauts-de-France et de Provence-Alpes-Côte d\'Azur y sont presque absentes : un petit nombre veut dire « peu de marchés publiés », pas « peu de marchés ». Les régions sans lien n\'ont pas de page, faute de marchés publiés en nombre suffisant.',
  couverture: 'Paris, l\'Île-de-France et la Corse sont presque absents de la base des offices de tourisme : pour ces régions, la liste est très incomplète.',
  guidesTitle: 'Toutes les pages',
  foldTitle: 'Comment lire les dates et les horaires',
  folds: [
    { h: 'D\'où viennent les marchés de cette page', html: `<p>Chaque marché vient d'une fiche publiée par un office de tourisme dans DATAtourisme, la base nationale des données touristiques, publiée en données ouvertes sous Licence Ouverte. Nous avons lu l'export du 12 novembre 2026 le 13 novembre et gardé les fiches dont le nom parle d'un marché, d'un village ou d'une féerie de Noël, soit ${N(STATS.datatourisme, 'fr')} fiches. Strasbourg et Lille ne publient pas leur marché dans cette base : nous avons relu leurs pages officielles, et la date de lecture est donnée sur leur page. Lyon, Bordeaux, Paris, Nantes et Marseille n'étaient ni dans la base ni datées sur leur site : elles n'ont pas de page.</p>` },
    { h: 'Ouvert, fermé, horaires non publiés', html: `<p>Une fiche peut dire « du 23 novembre au 29 décembre, de 10 h à 20 h du vendredi au dimanche et de 11 h à 19 h du lundi au jeudi ». Le moteur de recherche lit ces règles et répond pour le jour choisi. Quand la fiche donne des jours mais pas d'heures, il écrit « non publiés » : ${N(M.length - hor.length, 'fr')} fiches sont dans ce cas. Quand le jour choisi est aujourd'hui, l'heure de votre appareil sert à dire si le marché est ouvert maintenant, ouvre plus tard ou a fermé pour la journée.</p>` },
    { h: 'La distance, à vol d\'oiseau', html: '<p>La distance part du centre de la commune choisie, ou de votre position si vous l\'acceptez, jusqu\'aux coordonnées du marché. Elle est à vol d\'oiseau : par la route, comptez souvent un tiers de plus, davantage en montagne. Le lien « Itinéraire » ouvre le trajet dans OpenStreetMap, une carte libre. Votre position reste dans votre navigateur : nous ne l\'envoyons nulle part.</p>' },
    { h: 'Petits et grands marchés', html: `<p>Le tri se fait par distance, pas par taille : un marché d'école d'un après-midi peut apparaître avant un grand marché de centre-ville. Pour repérer les grands, regardez le nombre de jours d'ouverture sur les pages des villes et des régions : ${C(lg, 'fr')} marchés seulement durent vingt jours ou plus, et ce sont presque toujours ceux des villes. À l'inverse, ${pct(unj.length, M.length, 'fr')} des fiches ne valent que pour un seul jour.</p>` },
    { h: 'Avant de partir', html: '<p>Un organisateur peut annuler pour la météo, avancer une fermeture ou ajouter une nocturne. La fiche le dit si l\'office de tourisme l\'a mise à jour, pas toujours. Le nom de chaque marché renvoie à la page citée par sa fiche quand elle en a une : c\'est elle qui fait foi le jour même.</p>' },
  ],
  faqs: [
    { q: 'Quel est le plus grand marché de Noël de France ?', a: 'Le site ne mesure pas la taille d\'un marché : aucune fiche ne donne un nombre de visiteurs. Strasbourg, qui fait remonter son marché à 1570 sur sa page officielle, répartit ses chalets sur plusieurs places, de la place Broglie à la cathédrale : c\'est l\'un des plus étendus. Pour comparer, le nombre de jours d\'ouverture et le nombre de places sont donnés sur chaque page de ville.', open: true },
    { q: 'Quand commencent les marchés de Noël en 2026 ?', a: `Les premiers ouvrent mi-novembre, mais la saison démarre vraiment le week-end du 21 et 22 novembre, avec ${C(B.ouverts(M, '2026-11-21'), 'fr')} marchés le samedi. Colmar ouvre le 23 novembre, Lille le 18, Strasbourg le 27. Le premier dimanche de l'Avent tombe le 29 novembre 2026.` },
    { q: 'Les marchés de Noël sont-ils gratuits ?', a: `${C(grat, 'fr')} fiches indiquent expressément une entrée gratuite ; les autres ne précisent pas, ce qui ne veut pas dire que l'entrée est payante. Ce qui se paie, ce sont les achats, les boissons (souvent avec un gobelet consigné), les manèges et certaines animations comme les patinoires. Le filtre « entrée gratuite indiquée » du moteur de recherche ne retient que les fiches qui le disent.` },
    { q: 'Combien de marchés de Noël sont ouverts le 24 décembre ?', a: `${C(le24, 'fr')} dans la base. Beaucoup ferment plus tôt ce jour-là : Strasbourg à 18 h, Metz à 16 h et les places de Colmar à 17 h, selon la page de la Ville et les fiches. Le 25 décembre, il n'en reste que ${C(le25, 'fr')} selon leurs fiches. La page sur les marchés après Noël les liste.` },
    { q: 'Comment trouver un marché de Noël ouvert ce soir ?', a: 'Choisissez le jour d\'aujourd\'hui dans le moteur de recherche, puis le filtre « Ouverts jusqu\'à 20 h ou plus tard ». Pour chaque marché, la colonne des horaires indique s\'il est ouvert maintenant, à quelle heure il ouvre ou s\'il a déjà fermé, d\'après l\'heure de votre appareil.' },
    { q: 'Pourquoi Lyon, Bordeaux ou Paris n\'apparaissent-ils pas ?', a: 'Ces villes ne publient pas leurs marchés de Noël dans DATAtourisme, et nous n\'avons pas trouvé de date 2026 lisible sur leurs pages au 13 novembre 2026. Plutôt que de recopier la presse, nous ne les affichons pas. Une ville n\'apparaît ici qu\'avec une source officielle datée.' },
  ],
};

const en: HomeLang = {
  title: 'Christmas markets in France 2026: which are open near you',
  description: 'Christmas markets in France 2026: which are open on the day you pick, when they close and how far away they are, from the tourist offices\' own listings.',
  h1: 'Christmas markets in France 2026: which are open near you',
  homeCard: 'The Christmas markets open on the day you choose, around your town or your location',
  intro: `Pick a starting town or your location, a day and a distance: the finder goes through the ${N(STATS.marches, 'en')} Christmas markets in France for the 2026 season and shows the ones open, their hours that day and how to get there.`,
  resume: `The 2026 Christmas market season in France counts ${N(STATS.marches, 'en')} markets in ${N(STATS.communes, 'en')} towns and villages, according to the DATAtourisme export read on 13 November 2026, with Strasbourg and Lille added from their official pages. On Saturday ${jm('2026-11-28', 'en')}, the first Advent weekend, ${C(sam28, 'en')} are open; on Saturday ${jm('2026-12-05', 'en')}, ${C(sam5, 'en')}, the highest of all Saturdays; on Saturday ${jm('2026-12-19', 'en')}, only ${C(sam19, 'en')} remain. On 24 December, ${C(le24, 'en')} still open, and only ${C(apres, 'en')} after Christmas. Most are village markets: ${C(unj, 'en')} last a single day, and only ${C(lg, 'en')} stay open twenty days or more. Alsace alone has ${C(alsace, 'en')}. ${C(hor, 'en')} listings publish hours; for the rest, the finder says "not published" rather than guess. Each result links to the tourist office listing or the organiser's site, worth checking before a long trip.`,
  questionsTitle: 'What people ask before setting off',
  questions: [
    { id: 'strasbourg', q: 'When does the Strasbourg market open?', a: 'From 27 November to 24 December 2026, 11:30 to 21:00, according to the City.' },
    { id: 'colmar', q: 'Is Colmar open after Christmas?', a: 'Yes: the squares until 29 December, the food market until 3 January.' },
    { id: 'week-ends', q: 'Which weekend has the most markets?', a: 'The Advent weekends, Saturday and Sunday compared.' },
    { id: 'nocturnes', q: 'Where can I go on a weekday evening?', a: `${C(noct, 'en')} markets close at 21:00 or later on at least one evening.` },
    { id: 'apres-noel', q: 'Which stay open between Christmas and New Year?', a: `${C(apres, 'en')} markets after 25 December, ${C(janv, 'en')} in January.` },
    { id: 'alsace', q: 'Which Alsace markets can I do on the same day?', a: 'Strasbourg, Colmar, Kaysersberg, Riquewihr, Eguisheim: day by day.' },
  ],
  chiffresTitle: 'The 2026 Christmas markets in figures',
  chiffres: [
    ['Christmas markets in the 2026 season', N(STATS.marches, 'en')],
    ['Towns and villages', N(STATS.communes, 'en')],
    ['Open on Saturday 28 November', C(sam28, 'en')],
    ['Open on Saturday 5 December', C(sam5, 'en')],
    ['Open on Saturday 12 December', C(sam12, 'en')],
    ['Open on 24 December', C(le24, 'en')],
    ['Open on 25 December', C(le25, 'en')],
    ['Open at least one day after Christmas', C(apres, 'en')],
    ['With published hours', `${C(hor, 'en')} (${pct(hor.length, M.length, 'en')})`],
    ['Free entry stated', C(grat, 'en')],
  ],
  chiffresNote: 'Counts made on the DATAtourisme export read on 13 November 2026, plus Strasbourg and Lille read on their official pages. A market counts on a day if it takes place that day, at any time.',
  regionsTitle: 'Christmas markets by region',
  regionsNote: 'Worth knowing first: tourist offices do not enter all their markets in the national base. Île-de-France, Corsica and parts of Hauts-de-France and Provence-Alpes-Côte d\'Azur are nearly absent: a low number means "few markets entered", not "few markets". Regions without a link have no page, as too few markets are entered.',
  couverture: 'Paris, Île-de-France and Corsica are nearly absent from the tourist offices\' base: for these regions the list is far from complete.',
  guidesTitle: 'All pages',
  foldTitle: 'How to read the dates and hours',
  folds: [
    { h: 'Where the markets on this page come from', html: `<p>Each market comes from a listing entered by a tourist office in DATAtourisme, France's national tourism database, published as open data under the Licence Ouverte. We read the export of 12 November 2026 on 13 November and kept the listings whose name speaks of a Christmas market, village or "féerie", ${N(STATS.datatourisme, 'en')} of them. Strasbourg and Lille do not publish their market in that base: we read their official pages, and the reading date is on their page. Lyon, Bordeaux, Paris, Nantes and Marseille were neither in the base nor dated on their sites: they have no page.</p>` },
    { h: 'Open, closed, hours not published', html: `<p>A listing may say "from 23 November to 29 December, 10:00 to 20:00 Friday to Sunday and 11:00 to 19:00 Monday to Thursday". The finder reads these rules and answers for the day you choose. When a listing gives days but no hours, it says "not published": ${N(M.length - hor.length, 'en')} listings are in that case. When the chosen day is today, your device's clock tells whether the market is open now, opens later or has closed for the day.</p>` },
    { h: 'Distance, as the crow flies', html: '<p>Distance runs from the centre of the chosen town, or from your location if you allow it, to the market\'s coordinates. It is a straight line: by road, allow about a third more, and more in the mountains. The "Directions" link opens the route in OpenStreetMap, a free map. Your location stays in your browser; we send it nowhere.</p>' },
    { h: 'Small and large markets', html: `<p>Results are sorted by distance, not size: a school market held for one afternoon can appear before a large city-centre market. To spot the large ones, look at the number of opening days on the city and region pages: only ${C(lg, 'en')} markets last twenty days or more, and they are nearly always in cities. Conversely, ${pct(unj.length, M.length, 'en')} of the listings are for a single day.</p>` },
    { h: 'Before you set off', html: '<p>An organiser can cancel for the weather, close early or add a late opening. The listing says so if the tourist office has updated it, not always. Each market name links to the page cited by its listing when there is one: that page has the final word on the day.</p>' },
  ],
  faqs: [
    { q: 'What is the largest Christmas market in France?', a: 'This site does not measure the size of a market: no listing gives visitor numbers. Strasbourg, which dates its market back to 1570 on its official page, spreads its stalls over several squares, from place Broglie to the cathedral: it is one of the most extensive. To compare, the number of opening days and of squares is given on each city page.', open: true },
    { q: 'When do French Christmas markets start in 2026?', a: `The first open in mid-November, but the season really starts on the weekend of 21 and 22 November, with ${C(B.ouverts(M, '2026-11-21'), 'en')} markets on the Saturday. Colmar opens on 23 November, Lille on the 18th, Strasbourg on the 27th. The first Sunday of Advent falls on 29 November 2026.` },
    { q: 'Do French Christmas markets charge for entry?', a: `${C(grat, 'en')} listings explicitly state free entry; the others do not say, which does not mean entry is charged. What you pay for is what you buy, drinks (often in a deposit cup), rides and some attractions such as ice rinks. The finder's "Free entry stated" filter keeps only the listings that say so.` },
    { q: 'How many Christmas markets are open on 24 December?', a: `${C(le24, 'en')} in the base. Many close earlier that day: Strasbourg at 18:00, Metz at 16:00 and the Colmar squares at 17:00, according to the City page and the listings. On 25 December, only ${C(le25, 'en')} remain according to their listings. The page on markets after Christmas lists them.` },
    { q: 'How do I find a Christmas market open tonight?', a: 'Choose today in the finder, then the filter "Open until 8pm or later". For each market, the hours column says whether it is open now, when it opens or whether it has already closed, based on your device\'s clock. Markets without published hours are left out by that filter.' },
    { q: 'Why are Lyon, Bordeaux or Paris missing?', a: 'These cities do not publish their Christmas markets in DATAtourisme, and we found no readable 2026 date on their pages as of 13 November 2026. Rather than copy the press, we leave them out. A city only appears here with a dated official source.' },
  ],
};

export const HOME = { fr, en, sources: ['datagouv', 'datatourisme', 'licence', 'geoapi', 'strasbourg', 'strasbourg-accueil', 'lille'] };
export const REGIONS_ACCUEIL = REGIONS;
