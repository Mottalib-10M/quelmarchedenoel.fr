/** Pages par région. Chaque nombre vient de marches.json (lib/blocs.ts) ; les noms cités viennent des fiches. */
import { defineGuide, type GuideDef } from '../../lib/page-types';
import { MARCHES, region } from '../../lib/data';
import { B, C, N, jm } from './_f';

/** Comptes d'une région, tous tirés des fiches. */
function R(id: string) {
  const l = B.deRegion(id), r = region(id);
  return {
    l, deps: r.deps, n: l.length, communes: B.communes(l), hor: B.avecHoraires(l), unj: B.unJour(l), lg: B.longs(l, 20),
    apres: B.ouvertsApres(l, '2026-12-26'), janv: B.ouvertsApres(l, '2027-01-01'), grat: B.gratuits(l),
    s28: B.ouverts(l, '2026-11-28'), s5: B.ouverts(l, '2026-12-05'), s12: B.ouverts(l, '2026-12-12'), s19: B.ouverts(l, '2026-12-19'),
    dep: (d: string) => B.deDeps([d]),
  };
}
const un = (c: string, motif: string) => MARCHES.find((m) => m.c === c && m.n.includes(motif))!;
const jours = (c: string, motif: string) => B.joursSaison(un(c, motif)).length;

// ── Grand Est ───────────────────────────────────────────────────────────────────────────────────────────────────
const ge = R('grand-est');
const grandEst = defineGuide({
  id: 'grand-est', group: 'regions', order: 1,
  outil: { ville: '54395', rayon: 50, zone: 60 },
  related: ['alsace', 'strasbourg', 'metz', 'reims'],
  sources: ['datagouv', 'datatourisme', 'metz', 'mulhouse'],
  fr: {
    slug: 'marches-de-noel-grand-est',
    nav: 'Grand Est', card: `${C(ge.l, 'fr')} marchés, de l'Alsace aux Ardennes, département par département`,
    title: 'Marchés de Noël en Grand Est 2026 : dates par département',
    description: 'Marchés de Noël en Grand Est 2026 : Alsace, Moselle, Vosges, Marne et Ardennes, les dates et horaires des marchés, les plus longs et ceux ouverts après Noël.',
    h1: 'Marchés de Noël en Grand Est 2026 : de l\'Alsace aux Ardennes',
    intro: `Les marchés de Noël en Grand Est sont ${C(ge.l, 'fr')} dans la base, la plus forte concentration de France. Choisissez une ville et un jour : le moteur de recherche, réglé ici sur Nancy, donne ceux qui sont ouverts autour.`,
    resume: `L'export DATAtourisme lu le 13 novembre 2026 compte ${C(ge.l, 'fr')} marchés de Noël dans le Grand Est, répartis dans ${N(ge.communes, 'fr')} communes. L'Alsace en fournit plus de la moitié : ${C(ge.dep('67'), 'fr')} dans le Bas-Rhin et ${C(ge.dep('68'), 'fr')} dans le Haut-Rhin, Strasbourg compris, relu sur la page de la Ville. La Moselle suit avec ${C(ge.dep('57'), 'fr')} fiches, puis les Vosges avec ${C(ge.dep('88'), 'fr')}. L'ancienne Champagne-Ardenne en compte beaucoup moins : ${C(ge.dep('51'), 'fr')} dans la Marne, ${C(ge.dep('08'), 'fr')} dans les Ardennes, ${C(ge.dep('52'), 'fr')} en Haute-Marne et ${C(ge.dep('10'), 'fr')} dans l'Aube. Les grands marchés de plus de vingt jours sont ${C(ge.lg, 'fr')} : Colmar, Metz, Mulhouse, Haguenau, Sélestat, Sarreguemines ou Charleville-Mézières, ouvert jusqu'au 31 décembre. À l'autre bout, ${C(ge.unj, 'fr')} marchés ne durent qu'un jour. Après Noël, ${C(ge.apres, 'fr')} restent ouverts au moins un jour.`,
    faqs: [
      { q: 'Quel département du Grand Est compte le plus de marchés de Noël ?', a: `Le Bas-Rhin, avec ${C(ge.dep('67'), 'fr')} fiches dans l'export lu le 13 novembre 2026, Strasbourg compris, relu à part sur la page de la Ville. Le Haut-Rhin suit avec ${C(ge.dep('68'), 'fr')} fiches, puis la Moselle avec ${C(ge.dep('57'), 'fr')}. Ces chiffres disent aussi le soin des offices de tourisme alsaciens à publier leurs marchés dans la base.`, open: true },
      { q: 'Quels marchés de Noël du Grand Est durent jusqu\'au 31 décembre ?', a: `D'après leurs fiches, Charleville-Mézières et le marché faïencier de Sarreguemines restent ouverts jusqu'au 31 décembre 2026, et le musée de l'Impression sur Étoffes de Mulhouse aussi, l'après-midi. Colmar et Bouxwiller vont jusqu'au 3 janvier 2027. Au total, ${C(ge.janv, 'fr')} marchés de la région ont une date en janvier.` },
      { q: 'Où trouver un marché de Noël en Lorraine ?', a: `La Moselle compte ${C(ge.dep('57'), 'fr')} fiches, les Vosges ${C(ge.dep('88'), 'fr')}, la Meurthe-et-Moselle ${C(ge.dep('54'), 'fr')} et la Meuse ${C(ge.dep('55'), 'fr')}. Metz et Sarreguemines tiennent les plus longs ; ailleurs, ce sont surtout des marchés de village d'un week-end. Le moteur de recherche, réglé sur Nancy, les montre jour par jour.` },
    ],
    body: (x) => `<h2>Marchés de Noël en Grand Est : les départements</h2>
<p>Le tableau compte les fiches par département et ce qui intéresse un visiteur : combien publient leurs horaires, combien sont ouverts le premier samedi de l'Avent, le samedi ${jm('2026-12-12', 'fr')} et après Noël. L'écart entre l'Alsace et le reste de la région tient pour partie à la tradition, pour partie à la publication : un office de tourisme qui ne remplit pas DATAtourisme laisse son département presque vide dans la base, même si ses villages tiennent un marché.</p>
${B.tabDeps(ge.deps, 'fr', 'Marchés de Noël du Grand Est par département, export DATAtourisme du 13 novembre 2026')}
<h2>Les plus longs de la région</h2>
<p>Ce sont des marchés de ville. En Lorraine, ${x.a('metz', 'Metz')} et Sarreguemines durent six semaines ; dans les Ardennes, Charleville-Mézières va du ${jm(un('Charleville-Mézières', 'Charleville').s!, 'fr')} au ${jm(un('Charleville-Mézières', 'Charleville').e!, 'fr')} ; en Alsace, ${x.a('colmar', 'Colmar')}, ${x.a('mulhouse', 'Mulhouse')}, Haguenau et Sélestat. Pour la Champagne, voyez ${x.a('reims', 'Reims')}. L'Alsace a sa propre page, ${x.a('alsace', 'jour par jour')}.</p>
${B.tabMarches(ge.l, 'fr', 'Les marchés de Noël les plus longs du Grand Est', 15)}
<p>Pour un séjour, deux pôles se dégagent : l'Alsace, où les marchés se succèdent d'un village à l'autre, et la Moselle, avec Metz et Sarreguemines. Les marchés de la Marne et des Ardennes sont plus dispersés : réglez le moteur de recherche sur Reims ou Charleville-Mézières avant de prendre la route. Le premier samedi de l'Avent, ${C(ge.s28, 'fr')} marchés de la région sont ouverts, plus que tout autre samedi.</p>`,
  },
  en: {
    slug: 'grand-est-christmas-markets',
    nav: 'Grand Est', card: `${C(ge.l, 'en')} markets, from Alsace to the Ardennes, département by département`,
    title: 'Grand Est Christmas markets 2026: dates by département',
    description: 'Grand Est Christmas markets 2026: Alsace, Moselle, the Vosges, Marne and the Ardennes, market dates and hours, the longest ones and those open after Christmas.',
    h1: 'Grand Est Christmas markets 2026: from Alsace to the Ardennes',
    intro: `The Grand Est Christmas markets number ${C(ge.l, 'en')} in the base, the highest concentration in France. Pick a town and a day: the finder, set here on Nancy, shows those open nearby.`,
    resume: `The DATAtourisme export read on 13 November 2026 holds ${C(ge.l, 'en')} Christmas markets in the Grand Est region, spread over ${N(ge.communes, 'en')} towns and villages. Alsace provides more than half: ${C(ge.dep('67'), 'en')} in the Bas-Rhin and ${C(ge.dep('68'), 'en')} in the Haut-Rhin, Strasbourg included, read from the City's page. Moselle follows with ${C(ge.dep('57'), 'en')} listings, then the Vosges with ${C(ge.dep('88'), 'en')}. The former Champagne-Ardenne region has far fewer: ${C(ge.dep('51'), 'en')} in the Marne, ${C(ge.dep('08'), 'en')} in the Ardennes, ${C(ge.dep('52'), 'en')} in the Haute-Marne and ${C(ge.dep('10'), 'en')} in the Aube. Large markets lasting more than twenty days number ${C(ge.lg, 'en')}: Colmar, Metz, Mulhouse, Haguenau, Sélestat, Sarreguemines or Charleville-Mézières, open until 31 December. At the other end, ${C(ge.unj, 'en')} markets last a single day, often a Saturday or a Sunday. After Christmas, ${C(ge.apres, 'en')} stay open on at least one day.`,
    faqs: [
      { q: 'Which Grand Est département has the most Christmas markets?', a: `The Bas-Rhin, with ${C(ge.dep('67'), 'en')} listings in the export read on 13 November 2026, Strasbourg included, read separately from the City's page. The Haut-Rhin follows with ${C(ge.dep('68'), 'en')}, then Moselle with ${C(ge.dep('57'), 'en')}. These figures also reflect how thoroughly Alsace tourist offices enter their markets in the base.`, open: true },
      { q: 'Which Grand Est Christmas markets last until 31 December?', a: `According to their listings, Charleville-Mézières and the Sarreguemines earthenware market stay open until 31 December 2026, as does the Mulhouse Museum of Printed Textiles in the afternoon. Colmar and Bouxwiller go on until 3 January 2027. In all, ${C(ge.janv, 'en')} markets in the region have a date in January.` },
      { q: 'Where can I find a Christmas market in Lorraine?', a: `Moselle has ${C(ge.dep('57'), 'en')} listings, the Vosges ${C(ge.dep('88'), 'en')}, Meurthe-et-Moselle ${C(ge.dep('54'), 'en')} and the Meuse ${C(ge.dep('55'), 'en')}. Metz and Sarreguemines hold the longest, lasting about six weeks; elsewhere they are mostly village markets over one weekend. The finder, set on Nancy, shows them day by day.` },
    ],
    body: (x) => `<h2>Grand Est Christmas markets: the départements</h2>
<p>The table counts listings by département and what matters to a visitor: how many publish their hours, how many are open on the first Advent Saturday, on Saturday ${jm('2026-12-12', 'en')} and after Christmas. The gap between Alsace and the rest of the region is partly tradition and partly data entry: a tourist office that does not fill in DATAtourisme leaves its département nearly empty in the base, even if its villages hold a market.</p>
${B.tabDeps(ge.deps, 'en', 'Grand Est Christmas markets by département, DATAtourisme export read on 13 November 2026')}
<h2>The longest in the region</h2>
<p>These are town markets. In Lorraine, ${x.a('metz', 'Metz')} and Sarreguemines last six weeks; in the Ardennes, Charleville-Mézières runs from ${jm(un('Charleville-Mézières', 'Charleville').s!, 'en')} to ${jm(un('Charleville-Mézières', 'Charleville').e!, 'en')}; in Alsace, ${x.a('colmar', 'Colmar')}, ${x.a('mulhouse', 'Mulhouse')}, Haguenau and Sélestat. For Champagne, see ${x.a('reims', 'Reims')}. Alsace has its own page, ${x.a('alsace', 'day by day')}.</p>
${B.tabMarches(ge.l, 'en', 'The longest Christmas markets in Grand Est', 15)}
<p>For a stay, two hubs stand out: Alsace, where markets follow one another from village to village, and Moselle, with Metz and Sarreguemines. Marne and Ardennes markets are more scattered: set the finder on Reims or Charleville-Mézières before setting off. On the first Advent Saturday, ${C(ge.s28, 'en')} markets in the region are open, more than on any other Saturday.</p>`,
  },
});

// ── Nouvelle-Aquitaine ──────────────────────────────────────────────────────────────────────────────────────────
const na = R('nouvelle-aquitaine');
const nouvelleAquitaine = defineGuide({
  id: 'nouvelle-aquitaine', group: 'regions', order: 2,
  outil: { ville: '86194', rayon: 50, zone: 60 },
  related: ['week-ends', 'apres-noel', 'occitanie', 'pays-de-la-loire'],
  sources: ['datagouv', 'datatourisme'],
  fr: {
    slug: 'marches-de-noel-nouvelle-aquitaine',
    nav: 'Nouvelle-Aquitaine', card: `${C(na.l, 'fr')} marchés, surtout d'un jour, du Pays basque au Limousin`,
    title: 'Marchés de Noël en Nouvelle-Aquitaine 2026 : dates et lieux',
    description: 'Marchés de Noël en Nouvelle-Aquitaine 2026 : Poitiers, Sarlat, Angoulême, La Rochelle et les villages, dates et horaires, et les marchés ouverts après Noël.',
    h1: 'Marchés de Noël en Nouvelle-Aquitaine 2026 : villes et villages',
    intro: `Les marchés de Noël en Nouvelle-Aquitaine sont ${C(na.l, 'fr')} dans la base, souvent pour une seule journée. Choisissez une ville et un jour : le moteur de recherche, réglé ici sur Poitiers, donne ceux qui sont ouverts.`,
    resume: `Avec ${C(na.l, 'fr')} fiches dans l'export DATAtourisme lu le 13 novembre 2026, la Nouvelle-Aquitaine compte un peu plus de marchés de Noël que le Grand Est, mais d'une autre nature : ${C(na.unj, 'fr')} ne durent qu'un jour, souvent un samedi ou un dimanche dans une salle des fêtes, et ${C(na.lg, 'fr')} seulement dépassent vingt jours. Les Pyrénées-Atlantiques en publient le plus, ${C(na.dep('64'), 'fr')}, devant la Charente-Maritime, ${C(na.dep('17'), 'fr')}, la Gironde, ${C(na.dep('33'), 'fr')}, et la Dordogne, ${C(na.dep('24'), 'fr')}. Les marchés de ville sont rares dans la base : Poitiers, du 28 novembre au 3 janvier, Sarlat, du 2 au 31 décembre avec sa patinoire, et Angoulême, place des Halles, du 11 au 27 décembre jusqu'à 23 h. Bordeaux et Limoges n'ont aucune fiche de marché de Noël dans l'export. Le samedi ${jm('2026-12-05', 'fr')}, ${C(na.s5, 'fr')} marchés sont ouverts dans la région, plus que tout autre samedi.`,
    faqs: [
      { q: 'Y a-t-il un marché de Noël à Bordeaux en 2026 ?', a: 'Aucune fiche de marché de Noël à Bordeaux ne figure dans l\'export DATAtourisme lu le 13 novembre 2026, et nous n\'affichons pas de dates recopiées de la presse. Le moteur de recherche, réglé sur Bordeaux, montre en revanche les marchés de Gironde publiés par les offices de tourisme, surtout des marchés de village d\'un week-end.', open: true },
      { q: 'Quand ouvre le marché de Noël de Sarlat ?', a: 'Le mercredi 2 décembre 2026, d\'après les deux fiches de l\'office de tourisme de Sarlat, et il reste ouvert jusqu\'au 31 décembre. L\'une des fiches mentionne la patinoire. Aucune ne donne d\'horaires : le site de l\'office, cité par les fiches, reste la référence pour l\'heure de fermeture.' },
      { q: 'Quels marchés de Noël en Nouvelle-Aquitaine après Noël ?', a: `${C(na.apres, 'fr')} marchés de la région ont au moins un jour après le 25 décembre selon leurs fiches. Poitiers va jusqu'au 3 janvier 2027, Sarlat et La Tremblade jusqu'au 31 décembre, Angoulême jusqu'au 27. La page des marchés après Noël les compare à ceux des autres régions.` },
    ],
    body: (x) => `<h2>Marchés de Noël en Nouvelle-Aquitaine : douze départements</h2>
<p>La région la plus étendue de France publie beaucoup de marchés d'un jour : marchés d'école, d'association ou de comité des fêtes. Ils pèsent lourd dans les comptes du tableau, d'où l'intérêt de la colonne du samedi : c'est ce jour-là qu'ils se tiennent. Les Landes, la Corrèze et la Haute-Vienne ont chacune plus de trente fiches, la Creuse et le Lot-et-Garonne une trentaine. Pour repérer les week-ends les plus riches, voyez ${x.a('week-ends', 'le calendrier des week-ends de l\'Avent')}.</p>
${B.tabDeps(na.deps, 'fr', 'Marchés de Noël de Nouvelle-Aquitaine par département, export lu le 13 novembre 2026')}
<h2>Les marchés qui durent</h2>
<p>En tête du tableau, deux fiches de Haute-Vienne, à Châlus et à Nexon, décrivent des boutiques artisanales ouvertes de début novembre au 8 janvier, sous le nom de féerie de Noël. Viennent ensuite Poitiers, La Rochelle avec le marché solidaire du Secours populaire, Sarlat, Anglet avec un marché franco-allemand et Angoulême. Pour le sud-ouest après le 25 décembre, voyez ${x.a('apres-noel', 'les marchés ouverts après Noël')}.</p>
${B.tabMarches(na.l, 'fr', 'Les marchés de Noël les plus longs de Nouvelle-Aquitaine', 15)}
<p>Un marché d'un jour se rate facilement : sa fiche donne une seule date, parfois des horaires courts. Avant un trajet, choisissez le jour exact dans le moteur de recherche, réglé sur votre ville, puis ouvrez la fiche du marché : c'est elle qui fait foi. Le samedi ${jm('2026-12-19', 'fr')}, il ne reste que ${C(na.s19, 'fr')} marchés ouverts dans la région, contre ${C(na.s5, 'fr')} le ${jm('2026-12-05', 'fr')}.</p>`,
  },
  en: {
    slug: 'nouvelle-aquitaine-christmas-markets',
    nav: 'Nouvelle-Aquitaine', card: `${C(na.l, 'en')} markets, mostly one-day, from the Basque Country to Limousin`,
    title: 'Nouvelle-Aquitaine Christmas markets 2026: dates and places',
    description: 'Nouvelle-Aquitaine Christmas markets 2026: Poitiers, Sarlat, Angoulême, La Rochelle and the villages, dates and hours, and markets still open after Christmas.',
    h1: 'Nouvelle-Aquitaine Christmas markets 2026: towns and villages',
    intro: `The Nouvelle-Aquitaine Christmas markets number ${C(na.l, 'en')} in the base, often for a single day. Pick a town and a day: the finder, set here on Poitiers, shows those open.`,
    resume: `With ${C(na.l, 'en')} listings in the DATAtourisme export read on 13 November 2026, Nouvelle-Aquitaine has slightly more Christmas markets than Grand Est, but of a different kind: ${C(na.unj, 'en')} last a single day, often a Saturday or Sunday in a village hall, and only ${C(na.lg, 'en')} go beyond twenty days. The Pyrénées-Atlantiques enter the most, ${C(na.dep('64'), 'en')}, ahead of Charente-Maritime, ${C(na.dep('17'), 'en')}, Gironde, ${C(na.dep('33'), 'en')}, and the Dordogne, ${C(na.dep('24'), 'en')}. Town markets are rare in the base: Poitiers, from 28 November to 3 January, Sarlat, from 2 to 31 December with its ice rink, and Angoulême, place des Halles, from 11 to 27 December until 23:00. Bordeaux and Limoges have no Christmas market listing in the export. On Saturday ${jm('2026-12-05', 'en')}, ${C(na.s5, 'en')} markets are open in the region, more than on any other Saturday.`,
    faqs: [
      { q: 'Is there a Christmas market in Bordeaux in 2026?', a: 'No Bordeaux Christmas market listing appears in the DATAtourisme export read on 13 November 2026, and we do not show dates copied from the press. The finder, set on Bordeaux, does show the Gironde markets entered by tourist offices, mostly village markets over one weekend.', open: true },
      { q: 'When does the Sarlat Christmas market open?', a: 'On Wednesday 2 December 2026, according to the two Sarlat tourist office listings, and it stays open until 31 December. One of the listings mentions the ice rink. Neither gives hours, so the tourist office site, cited by the listings, remains the reference for closing time.' },
      { q: 'Which Nouvelle-Aquitaine markets are open after Christmas?', a: `${C(na.apres, 'en')} markets in the region have at least one day after 25 December according to their listings. Poitiers runs until 3 January 2027, Sarlat and La Tremblade until 31 December, Angoulême until the 27th. The after-Christmas page compares them with other regions.` },
    ],
    body: (x) => `<h2>Nouvelle-Aquitaine Christmas markets: twelve départements</h2>
<p>France's largest region enters many one-day markets: school, charity or village committee markets. They weigh heavily in the table's counts, hence the value of the Saturday column: that is the day they are held. The Landes, Corrèze and Haute-Vienne each have more than thirty listings, the Creuse and Lot-et-Garonne about thirty. To find the busiest weekends, see ${x.a('week-ends', 'the Advent weekend calendar')}.</p>
${B.tabDeps(na.deps, 'en', 'Nouvelle-Aquitaine Christmas markets by département, export read on 13 November 2026')}
<h2>The markets that last</h2>
<p>At the top of the table, two Haute-Vienne listings, at Châlus and Nexon, describe craft shops open from early November to 8 January under the name of a Christmas fair. Then come Poitiers, La Rochelle with the Secours populaire charity market, Sarlat, Anglet with a Franco-German market, and Angoulême. For the south-west after 25 December, see ${x.a('apres-noel', 'markets open after Christmas')}.</p>
${B.tabMarches(na.l, 'en', 'The longest Christmas markets in Nouvelle-Aquitaine', 15)}
<p>A one-day market is easy to miss: its listing gives a single date, sometimes short hours. Before a trip, choose the exact day in the finder, set on your town, then open the market's listing: that is the reference. On Saturday ${jm('2026-12-19', 'en')}, only ${C(na.s19, 'en')} markets remain open in the region, against ${C(na.s5, 'en')} on ${jm('2026-12-05', 'en')}.</p>`,
  },
});

// ── Occitanie ───────────────────────────────────────────────────────────────────────────────────────────────────
const oc = R('occitanie');
const occitanie = defineGuide({
  id: 'occitanie', group: 'regions', order: 3,
  outil: { ville: '66136', rayon: 50, zone: 60 },
  related: ['toulouse', 'montpellier', 'apres-noel', 'nouvelle-aquitaine'],
  sources: ['datagouv', 'datatourisme', 'toulouse', 'montpellier'],
  fr: {
    slug: 'marches-de-noel-occitanie',
    nav: 'Occitanie', card: `${C(oc.l, 'fr')} marchés, et des villages de Noël ouverts jusqu'en janvier sur la côte`,
    title: 'Marchés de Noël en Occitanie 2026 : dates, côte et villes',
    description: 'Marchés de Noël en Occitanie 2026 : Toulouse, Montpellier, Béziers, Perpignan, Le Barcarès et Collioure, avec les dates, et ceux ouverts jusqu\'en janvier.',
    h1: 'Marchés de Noël en Occitanie 2026 : des villes à la côte',
    intro: `Les marchés de Noël en Occitanie sont ${C(oc.l, 'fr')} dans la base. Plusieurs, sur la côte, restent ouverts jusqu'en janvier. Choisissez une ville et un jour : le moteur de recherche, réglé ici sur Perpignan, donne ceux qui sont ouverts.`,
    resume: `L'export DATAtourisme lu le 13 novembre 2026 compte ${C(oc.l, 'fr')} marchés de Noël en Occitanie. L'Hérault en publie le plus, ${C(oc.dep('34'), 'fr')}, devant le Lot, ${C(oc.dep('46'), 'fr')}, la Haute-Garonne, ${C(oc.dep('31'), 'fr')}, et l'Aveyron, ${C(oc.dep('12'), 'fr')} ; le Gard, le Gers et le Tarn-et-Garonne n'en ont qu'une ou deux. Ce qui distingue la région, ce sont les villages de Noël du littoral : Le Barcarès, du 20 novembre au 10 janvier, de 11 h à 1 h du matin selon sa fiche ; Collioure, du 18 décembre au 3 janvier, jusqu'à minuit ; Palavas-les-Flots, du 11 décembre au 3 janvier. Béziers et Perpignan tiennent aussi leur marché jusqu'au 3 janvier. Résultat : ${C(oc.janv, 'fr')} marchés d'Occitanie ont une date en janvier. En revanche, peu de fiches publient leurs horaires, ${C(oc.hor, 'fr')} sur ${C(oc.l, 'fr')}, dont aucune pour les quatre sites de Toulouse.`,
    faqs: [
      { q: 'Quel marché de Noël d\'Occitanie ferme le plus tard le soir ?', a: 'Le village de Noël du Barcarès, ouvert de 11 h à 1 h du matin selon la fiche de l\'office de tourisme, du 20 novembre 2026 au 10 janvier 2027. Le village de Collioure ferme à minuit, du 18 décembre au 3 janvier. Les autres grands marchés de la région ne publient pas d\'horaires dans la base.', open: true },
      { q: 'Quels marchés de Noël d\'Occitanie restent ouverts en janvier ?', a: `${C(oc.janv, 'fr')} selon leurs fiches, presque tous en bord de Méditerranée ou à proximité : Le Barcarès jusqu'au 10 janvier, Collioure, Palavas-les-Flots, Béziers et Perpignan jusqu'au 3 janvier 2027. Port-Vendres va jusqu'au 2 janvier. Toulouse ferme le 27 décembre et Montpellier le 30.` },
      { q: 'Combien de marchés de Noël dans le Lot ?', a: `${C(oc.dep('46'), 'fr')} fiches dans l'export lu le 13 novembre 2026, ce qui place le Lot deuxième en Occitanie derrière l'Hérault, devant la Haute-Garonne. Ce sont presque tous des marchés de village sur un jour ou un week-end, publiés avec soin par les offices de tourisme du département.` },
    ],
    body: (x) => `<h2>Marchés de Noël en Occitanie : treize départements, très inégaux</h2>
<p>Le Gard, le Gers et le Tarn-et-Garonne n'ont qu'une ou deux fiches : cela ne veut pas dire qu'aucun marché ne s'y tient, mais que leurs offices de tourisme ne les publient pas dans la base nationale. Le Tarn et l'Ariège n'apparaissent pas du tout dans le tableau. Pour les grandes villes, voyez ${x.a('toulouse', 'Toulouse')} et ${x.a('montpellier', 'Montpellier')}, qui ont leur propre page avec les marchés voisins.</p>
${B.tabDeps(oc.deps, 'fr', 'Marchés de Noël d\'Occitanie par département, export lu le 13 novembre 2026')}
<h2>La côte, de la Camargue aux Pyrénées</h2>
<p>Les villages de Noël du littoral durent plus longtemps que les marchés des villes de l'intérieur. Ils ouvrent aussi le soir : Le Barcarès ferme à 1 h et Collioure à minuit ; dans le Lot, Carennac et Prayssac publient aussi une fermeture après 23 h, pour une seule soirée. Pour la semaine entre les fêtes, comparez avec ${x.a('apres-noel', 'les marchés ouverts après Noël')} dans le reste de la France.</p>
${B.tabMarches(oc.l, 'fr', 'Les marchés de Noël les plus longs d\'Occitanie', 15)}
<p>Dans l'intérieur, le Lot et l'Aveyron tiennent surtout des marchés de village d'un jour. Le samedi ${jm('2026-12-12', 'fr')} est le plus chargé de la région, avec ${C(oc.s12, 'fr')} marchés ouverts, contre ${C(oc.s5, 'fr')} le ${jm('2026-12-05', 'fr')}. Comme ${N(oc.l.length - oc.hor.length, 'fr')} fiches ne publient pas d'horaires, le moteur de recherche dit souvent « ouvert » sans heure : la page de l'organisateur reste la référence.</p>`,
  },
  en: {
    slug: 'occitanie-christmas-markets',
    nav: 'Occitanie', card: `${C(oc.l, 'en')} markets, and coastal Christmas villages open into January`,
    title: 'Occitanie Christmas markets 2026: dates, coast and cities',
    description: 'Occitanie Christmas markets 2026: Toulouse, Montpellier, Béziers, Perpignan, Le Barcarès and Collioure, with their dates, and those open into January.',
    h1: 'Occitanie Christmas markets 2026: from the cities to the coast',
    intro: `The Occitanie Christmas markets number ${C(oc.l, 'en')} in the base. Several on the coast stay open into January. Pick a town and a day: the finder, set here on Perpignan, shows those open.`,
    resume: `The DATAtourisme export read on 13 November 2026 holds ${C(oc.l, 'en')} Christmas markets in Occitanie. The Hérault enters the most, ${C(oc.dep('34'), 'en')}, ahead of the Lot, ${C(oc.dep('46'), 'en')}, Haute-Garonne, ${C(oc.dep('31'), 'en')}, and Aveyron, ${C(oc.dep('12'), 'en')}; the Gard, Gers and Tarn-et-Garonne have only one or two. What sets the region apart is its coastal Christmas villages: Le Barcarès, from 20 November to 10 January, from 11:00 to 01:00 according to its listing; Collioure, from 18 December to 3 January, until midnight; Palavas-les-Flots, from 11 December to 3 January. Béziers and Perpignan also keep their markets open until 3 January. As a result, ${C(oc.janv, 'en')} Occitanie markets have a date in January. Few listings publish hours, however: ${C(oc.hor, 'en')} out of ${C(oc.l, 'en')}, and none for the four Toulouse sites.`,
    faqs: [
      { q: 'Which Occitanie Christmas market closes latest at night?', a: 'The Le Barcarès Christmas village, open from 11:00 to 01:00 according to the tourist office listing, from 20 November 2026 to 10 January 2027. The Collioure village closes at midnight, from 18 December to 3 January. The other large markets in the region publish no hours in the base.', open: true },
      { q: 'Which Occitanie Christmas markets stay open in January?', a: `${C(oc.janv, 'en')} according to their listings, nearly all on or near the Mediterranean: Le Barcarès until 10 January, Collioure, Palavas-les-Flots, Béziers and Perpignan until 3 January 2027. Port-Vendres runs until 2 January. Toulouse closes on 27 December and Montpellier on the 30th.` },
      { q: 'How many Christmas markets are there in the Lot?', a: `${C(oc.dep('46'), 'en')} listings in the export read on 13 November 2026, which puts the Lot second in Occitanie behind the Hérault and ahead of Haute-Garonne. Nearly all are village markets over a day or a weekend, carefully entered by the département's tourist offices.` },
    ],
    body: (x) => `<h2>Occitanie Christmas markets: thirteen very uneven départements</h2>
<p>The Gard, Gers and Tarn-et-Garonne have only one or two listings: that does not mean no market is held there, only that their tourist offices do not enter them in the national base. The Tarn and Ariège do not appear in the table at all. For the large cities, see ${x.a('toulouse', 'Toulouse')} and ${x.a('montpellier', 'Montpellier')}, which have their own pages with nearby markets.</p>
${B.tabDeps(oc.deps, 'en', 'Occitanie Christmas markets by département, export read on 13 November 2026')}
<h2>The coast, from the Camargue to the Pyrenees</h2>
<p>The coastal Christmas villages last longer than the inland town markets. They also open in the evening: Le Barcarès closes at 01:00 and Collioure at midnight; in the Lot, Carennac and Prayssac also publish a closing time after 23:00, for a single evening. For the week between the holidays, compare with ${x.a('apres-noel', 'markets open after Christmas')} in the rest of France.</p>
${B.tabMarches(oc.l, 'en', 'The longest Christmas markets in Occitanie', 15)}
<p>Inland, the Lot and Aveyron mostly hold one-day village markets. Saturday ${jm('2026-12-12', 'en')} is the busiest in the region, with ${C(oc.s12, 'en')} markets open, against ${C(oc.s5, 'en')} on ${jm('2026-12-05', 'en')}. Since ${N(oc.l.length - oc.hor.length, 'en')} listings publish no hours, the finder often says "open" without a time: the organiser's page remains the reference.</p>`,
  },
});

// ── Pays de la Loire ────────────────────────────────────────────────────────────────────────────────────────────
const pl = R('pays-de-la-loire');
const paysDeLaLoire = defineGuide({
  id: 'pays-de-la-loire', group: 'regions', order: 4,
  outil: { ville: '44109', rayon: 50, zone: 60 },
  related: ['bretagne', 'normandie', 'nocturnes', 'week-ends'],
  sources: ['datagouv', 'datatourisme'],
  fr: {
    slug: 'marches-de-noel-pays-de-la-loire',
    nav: 'Pays de la Loire', card: `${C(pl.l, 'fr')} marchés, des châteaux de Vendée à la Cité Plantagenêt du Mans`,
    title: 'Marchés de Noël en Pays de la Loire 2026 : dates et horaires',
    description: 'Marchés de Noël en Pays de la Loire 2026 : Le Mans, Saumur, Château-Gontier, Tiffauges et les villages, dates et horaires, et les marchés ouverts le soir.',
    h1: 'Marchés de Noël en Pays de la Loire 2026 : châteaux et villages',
    intro: `Les marchés de Noël en Pays de la Loire sont ${C(pl.l, 'fr')} dans la base, presque tous avec leurs horaires. Choisissez une ville et un jour : le moteur de recherche, réglé ici sur Nantes, donne ceux qui sont ouverts.`,
    resume: `L'export DATAtourisme lu le 13 novembre 2026 compte ${C(pl.l, 'fr')} marchés de Noël dans les Pays de la Loire, avec une particularité : ${C(pl.hor, 'fr')} publient leurs horaires, avec le Grand Est la meilleure proportion de France. La Loire-Atlantique en publie ${C(pl.dep('44'), 'fr')}, la Mayenne ${C(pl.dep('53'), 'fr')}, la Vendée ${C(pl.dep('85'), 'fr')}, le Maine-et-Loire ${C(pl.dep('49'), 'fr')} et la Sarthe ${C(pl.dep('72'), 'fr')}. Ce sont surtout des marchés courts : ${C(pl.unj, 'fr')} ne durent qu'un jour, et un seul dépasse vingt jours, à Château-Gontier-sur-Mayenne, du 4 au 26 décembre. Viennent ensuite Saumur, du 9 au 24 décembre, et la Cité Plantagenêt du Mans, du 11 au 24 décembre de 11 h à 21 h. En Vendée, les marchés de l'abbaye de Maillezais et du château de Tiffauges ouvrent deux week-ends de 14 h à 22 h. Nantes et Angers n'ont aucune fiche de marché de Noël dans l'export.`,
    faqs: [
      { q: 'Y a-t-il un marché de Noël à Nantes dans la base ?', a: 'Non : l\'export DATAtourisme lu le 13 novembre 2026 ne contient aucune fiche de marché de Noël à Nantes, ni à Angers. Le moteur de recherche, réglé sur Nantes, montre les marchés de Loire-Atlantique et de Vendée publiés par les offices de tourisme, avec leur distance. Nous ne recopions pas de dates de la presse.', open: true },
      { q: 'Quand ouvre le marché de Noël du Mans ?', a: 'Le marché de la Cité Plantagenêt ouvre le vendredi 11 décembre 2026 et ferme le 24 décembre, de 11 h à 21 h selon sa fiche. C\'est l\'un des plus longs de la région. Une autre fiche au Mans, dans une résidence, ne dure qu\'une journée, le 5 décembre.' },
      { q: 'Quels marchés de Noël dans un château en Vendée ?', a: 'Le château de Tiffauges et l\'abbaye de Maillezais tiennent chacun un marché les week-ends du 4 au 13 décembre 2026, de 14 h à 22 h selon leurs fiches. Ces horaires d\'après-midi et de soirée en font des sorties de fin de journée, à l\'inverse des marchés de village du dimanche matin.' },
    ],
    body: (x) => `<h2>Marchés de Noël en Pays de la Loire : cinq départements</h2>
<p>Les offices de tourisme de la région renseignent presque toujours l'heure d'ouverture et de fermeture, ce qui rend le moteur de recherche précis ici : il peut dire si un marché est encore ouvert à 18 h. Ils ne renseignent en revanche jamais la gratuité : aucune fiche de la région ne l'indique, ce qui ne veut pas dire que l'entrée est payante. Pour un soir de semaine, voyez ${x.a('nocturnes', 'les marchés qui ferment tard')}.</p>
${B.tabDeps(pl.deps, 'fr', 'Marchés de Noël des Pays de la Loire par département, export lu le 13 novembre 2026')}
<h2>Une saison de week-ends</h2>
<p>Le samedi ${jm('2026-12-05', 'fr')} compte ${C(pl.s5, 'fr')} marchés ouverts, le samedi ${jm('2026-12-12', 'fr')} ${C(pl.s12, 'fr')} ; le ${jm('2026-12-19', 'fr')}, il n'en reste que ${C(pl.s19, 'fr')}. Après le 25 décembre, un seul marché de la région a encore une date. Pour la Bretagne voisine, voyez ${x.a('bretagne', 'la page Bretagne')}.</p>
${B.tabMarches(pl.l, 'fr', 'Les marchés de Noël les plus longs des Pays de la Loire', 15)}
<p>Comme Nantes et Angers n'ont aucune fiche, le moteur de recherche part ici de Nantes et classe les marchés voisins par distance. Changez de ville de départ pour Laval, Le Mans ou La Roche-sur-Yon : la Mayenne, peu peuplée, publie presque autant de marchés que la Loire-Atlantique, ${C(pl.dep('53'), 'fr')} contre ${C(pl.dep('44'), 'fr')}.</p>`,
  },
  en: {
    slug: 'pays-de-la-loire-christmas-markets',
    nav: 'Pays de la Loire', card: `${C(pl.l, 'en')} markets, from Vendée castles to the Cité Plantagenêt in Le Mans`,
    title: 'Pays de la Loire Christmas markets 2026: dates and hours',
    description: 'Pays de la Loire Christmas markets 2026: Le Mans, Saumur, Château-Gontier, Tiffauges and the villages, with dates and hours, and markets open in the evening.',
    h1: 'Pays de la Loire Christmas markets 2026: castles and villages',
    intro: `The Pays de la Loire Christmas markets number ${C(pl.l, 'en')} in the base, nearly all with their hours. Pick a town and a day: the finder, set here on Nantes, shows those open.`,
    resume: `The DATAtourisme export read on 13 November 2026 holds ${C(pl.l, 'en')} Christmas markets in Pays de la Loire, with one feature: ${C(pl.hor, 'en')} publish their hours, with Grand Est the best ratio in France. Loire-Atlantique enters ${C(pl.dep('44'), 'en')}, Mayenne ${C(pl.dep('53'), 'en')}, Vendée ${C(pl.dep('85'), 'en')}, Maine-et-Loire ${C(pl.dep('49'), 'en')} and Sarthe ${C(pl.dep('72'), 'en')}. Most are short: ${C(pl.unj, 'en')} last a single day, and only one goes beyond twenty days, at Château-Gontier-sur-Mayenne, from 4 to 26 December. Next come Saumur, from 9 to 24 December, and the Cité Plantagenêt in Le Mans, from 11 to 24 December, 11:00 to 21:00. In Vendée, the markets at Maillezais abbey and Tiffauges castle open over two weekends from 14:00 to 22:00. Nantes and Angers, the two largest cities, have no Christmas market listing in the export.`,
    faqs: [
      { q: 'Is there a Nantes Christmas market in the base?', a: 'No: the DATAtourisme export read on 13 November 2026 contains no Christmas market listing in Nantes, nor in Angers. The finder, set on Nantes, shows the Loire-Atlantique and Vendée markets entered by tourist offices, with their distance. We do not copy dates from the press.', open: true },
      { q: 'When does the Le Mans Christmas market open?', a: 'The Cité Plantagenêt market opens on Friday 11 December 2026 and closes on 24 December, from 11:00 to 21:00 according to its listing. It is one of the longest in the region. Another listing in Le Mans, in a residence, lasts a single day, 5 December.' },
      { q: 'Which Vendée Christmas markets are held in a castle?', a: 'Tiffauges castle and Maillezais abbey each hold a market over the weekends from 4 to 13 December 2026, from 14:00 to 22:00 according to their listings. These afternoon and evening hours make them end-of-day outings, unlike village markets on a Sunday morning.' },
    ],
    body: (x) => `<h2>Pays de la Loire Christmas markets: five départements</h2>
<p>The region's tourist offices nearly always enter opening and closing times, which makes the finder precise here: it can tell you whether a market is still open at 18:00. On the other hand, they never enter free entry: no listing in the region states it, which does not mean entry is charged. For a weekday evening, see ${x.a('nocturnes', 'markets that close late')}.</p>
${B.tabDeps(pl.deps, 'en', 'Pays de la Loire Christmas markets by département, export read on 13 November 2026')}
<h2>A season of weekends</h2>
<p>Saturday ${jm('2026-12-05', 'en')} has ${C(pl.s5, 'en')} markets open, Saturday ${jm('2026-12-12', 'en')} ${C(pl.s12, 'en')}; on ${jm('2026-12-19', 'en')}, only ${C(pl.s19, 'en')} remain. After 25 December, a single market in the region still has a date. For neighbouring Brittany, see ${x.a('bretagne', 'the Brittany page')}.</p>
${B.tabMarches(pl.l, 'en', 'The longest Christmas markets in Pays de la Loire', 15)}
<p>Since Nantes and Angers have no listing, the finder starts here from Nantes and ranks nearby markets by distance. Change the starting town to Laval, Le Mans or La Roche-sur-Yon: the sparsely populated Mayenne enters almost as many markets as Loire-Atlantique, ${C(pl.dep('53'), 'en')} against ${C(pl.dep('44'), 'en')}.</p>`,
  },
});

// ── Normandie ───────────────────────────────────────────────────────────────────────────────────────────────────
const no = R('normandie');
const normandie = defineGuide({
  id: 'normandie', group: 'regions', order: 5,
  outil: { ville: '14118', rayon: 50, zone: 60 },
  related: ['rouen', 'apres-noel', 'bretagne', 'pays-de-la-loire'],
  sources: ['datagouv', 'datatourisme', 'caen'],
  fr: {
    slug: 'marches-de-noel-normandie',
    nav: 'Normandie', card: `${C(no.l, 'fr')} marchés, de Rouen et Caen à la côte fleurie`,
    title: 'Marchés de Noël en Normandie 2026 : dates, Caen, Rouen, côte',
    description: 'Marchés de Noël en Normandie 2026 : Caen, Rouen, Honfleur, Trouville, Bayeux et les villages, avec dates et horaires, et ceux ouverts jusqu\'au 3 janvier.',
    h1: 'Marchés de Noël en Normandie 2026 : villes et côte',
    intro: `Les marchés de Noël en Normandie sont ${C(no.l, 'fr')} dans la base. Choisissez une ville et un jour : le moteur de recherche, réglé ici sur Caen, donne ceux qui sont ouverts, et leurs horaires quand la fiche les publie.`,
    resume: `L'export DATAtourisme lu le 13 novembre 2026 compte ${C(no.l, 'fr')} marchés de Noël en Normandie. La Seine-Maritime en publie ${C(no.dep('76'), 'fr')}, la Manche ${C(no.dep('50'), 'fr')}, le Calvados ${C(no.dep('14'), 'fr')}, l'Orne ${C(no.dep('61'), 'fr')} et l'Eure ${C(no.dep('27'), 'fr')}. Le plus long n'est pas en ville : c'est celui de la Ferme du Louvier, à Bâlines, dans l'Eure, du 25 novembre au 2 janvier. Suivent le Grand Noël de Caen, du 28 novembre au 29 décembre, et ${x0('rouen')}, du 25 novembre au 27 décembre. La côte fleurie prend le relais après Noël : Trouville-sur-Mer, du 12 décembre au 3 janvier, et Honfleur, du 18 décembre au 3 janvier. Bayeux et Coutances ouvrent en décembre, jusqu'au 23 et au 24. Au total, ${C(no.apres, 'fr')} marchés normands ont au moins une date après le 25 décembre, et ${C(no.unj, 'fr')} ne durent qu'un jour.`,
    faqs: [
      { q: 'Quand a lieu le marché de Noël de Caen ?', a: 'Le Grand Noël à Caen ouvre son marché le samedi 28 novembre 2026, jour d\'inauguration, et le ferme le 29 décembre, d\'après la fiche publiée par l\'office de tourisme. La fiche ne publie pas d\'horaires : le site du Grand Noël, qu\'elle cite, reste la référence pour les heures.', open: true },
      { q: 'Quels marchés de Noël en Normandie sont ouverts au Nouvel An ?', a: `Trouville-sur-Mer et Honfleur restent ouverts jusqu'au 3 janvier 2027 selon leurs fiches, et la Ferme du Louvier à Bâlines jusqu'au 2 janvier. Au total, ${C(no.janv, 'fr')} marchés normands ont une date en janvier. Caen ferme le 29 décembre et Rouen le 27.` },
      { q: 'Y a-t-il des marchés de Noël dans la Manche ?', a: `Oui, ${C(no.dep('50'), 'fr')} fiches dans l'export, le deuxième département normand. Le plus long est celui de Coutances, du 12 au 24 décembre de 11 h à 19 h selon sa fiche. Agon-Coutainville tient aussi une escale de Noël du 18 au 23 décembre.` },
    ],
    body: (x) => `<h2>Marchés de Noël en Normandie : les cinq départements</h2>
<p>L'Eure ne compte que ${C(no.dep('27'), 'fr')} fiches mais abrite le plus long marché de la région. À l'inverse, la Seine-Maritime en publie beaucoup, presque toutes d'un ou deux jours, dans des villages. Le tableau donne aussi le nombre de marchés ouverts après Noël, la vraie particularité normande. La page ${x.a('rouen', 'Rouen')} détaille l'horaire de chaque jour, y compris le 25 décembre.</p>
${B.tabDeps(no.deps, 'fr', 'Marchés de Noël de Normandie par département, export lu le 13 novembre 2026')}
<h2>Caen, Rouen et la côte fleurie</h2>
<p>Le ${x.src('caen', 'site du Grand Noël de Caen')} publie le plan et les animations. Sur la côte, les marchés de Honfleur et de Trouville commencent plus tard que ceux des villes et finissent après le jour de l'an : une sortie possible pendant les vacances, que liste aussi ${x.a('apres-noel', 'la page des marchés après Noël')}.</p>
${B.tabMarches(no.l, 'fr', 'Les marchés de Noël les plus longs de Normandie', 15)}
<p>Les horaires sont publiés par ${C(no.hor, 'fr')} fiches sur ${C(no.l, 'fr')} ; quand une fiche n'en donne pas, comme celle de Caen, le moteur de recherche l'écrit. Le samedi ${jm('2026-12-05', 'fr')} est le plus fourni de la région, avec ${C(no.s5, 'fr')} marchés ouverts. Le 24 décembre, ${C(B.ouverts(no.l, '2026-12-24'), 'fr')} marchés normands ouvrent encore selon leurs fiches.</p>`,
  },
  en: {
    slug: 'normandy-christmas-markets',
    nav: 'Normandy', card: `${C(no.l, 'en')} markets, from Rouen and Caen to the Côte Fleurie`,
    title: 'Normandy Christmas markets 2026: dates, Caen, Rouen, coast',
    description: 'Normandy Christmas markets 2026: Caen, Rouen, Honfleur, Trouville, Bayeux and the villages, with their dates and hours, and the markets open until 3 January.',
    h1: 'Normandy Christmas markets 2026: towns and coast',
    intro: `The Normandy Christmas markets number ${C(no.l, 'en')} in the base. Pick a town and a day: the finder, set here on Caen, shows those open, with their hours when the listing publishes them.`,
    resume: `The DATAtourisme export read on 13 November 2026 holds ${C(no.l, 'en')} Christmas markets in Normandy. Seine-Maritime enters ${C(no.dep('76'), 'en')}, the Manche ${C(no.dep('50'), 'en')}, Calvados ${C(no.dep('14'), 'en')}, the Orne ${C(no.dep('61'), 'en')} and the Eure ${C(no.dep('27'), 'en')}. The longest is not in a town: it is at the Ferme du Louvier, in Bâlines, in the Eure, from 25 November to 2 January. Next come the Grand Noël in Caen, from 28 November to 29 December, and ${x0('rouen', 'en')}, from 25 November to 27 December. The Côte Fleurie takes over after Christmas: Trouville-sur-Mer, from 12 December to 3 January, and Honfleur, from 18 December to 3 January. Bayeux and Coutances open in December, until the 23rd and 24th. In all, ${C(no.apres, 'en')} Normandy markets have at least one date after 25 December, and ${C(no.unj, 'en')} last a single day.`,
    faqs: [
      { q: 'When is the Caen Christmas market held?', a: 'Le Grand Noël à Caen opens its market on Saturday 28 November 2026, the day of the inauguration, and closes it on 29 December, according to the listing entered by the tourist office. The listing publishes no hours, so the Grand Noël site it cites remains the reference for times.', open: true },
      { q: 'Which Normandy Christmas markets are open at New Year?', a: `Trouville-sur-Mer and Honfleur stay open until 3 January 2027 according to their listings, and the Ferme du Louvier at Bâlines until 2 January. In all, ${C(no.janv, 'en')} Normandy markets have a date in January. Caen closes on 29 December and Rouen on the 27th.` },
      { q: 'Are there Christmas markets in the Manche?', a: `Yes, ${C(no.dep('50'), 'en')} listings in the export, the second Normandy département. The longest is at Coutances, from 12 to 24 December, 11:00 to 19:00 according to its listing. Agon-Coutainville also holds a Christmas stopover from 18 to 23 December, from 11:00 to 19:00.` },
    ],
    body: (x) => `<h2>Normandy Christmas markets: the five départements</h2>
<p>The Eure has only ${C(no.dep('27'), 'en')} listings but is home to the region's longest market. Seine-Maritime, by contrast, enters many, nearly all lasting one or two days, in villages. The table also gives the number of markets open after Christmas, Normandy's real distinguishing feature. The ${x.a('rouen', 'Rouen')} page details each day's hours, 25 December included.</p>
${B.tabDeps(no.deps, 'en', 'Normandy Christmas markets by département, export read on 13 November 2026')}
<h2>Caen, Rouen and the Côte Fleurie</h2>
<p>The ${x.src('caen', 'Grand Noël in Caen site')} publishes the map and events. On the coast, the Honfleur and Trouville markets start later than the town ones and end after New Year: an outing during the holidays, also listed on ${x.a('apres-noel', 'the after-Christmas page')}.</p>
${B.tabMarches(no.l, 'en', 'The longest Christmas markets in Normandy', 15)}
<p>Hours are published by ${C(no.hor, 'en')} listings out of ${C(no.l, 'en')}; when a listing gives none, as for Caen, the finder says so. Saturday ${jm('2026-12-05', 'en')} is the fullest in the region, with ${C(no.s5, 'en')} markets open. On 24 December, ${C(B.ouverts(no.l, '2026-12-24'), 'en')} Normandy markets still open according to their listings.</p>`,
  },
});
function x0(id: string, l: 'fr' | 'en' = 'fr') { return id === 'rouen' ? (l === 'fr' ? 'le marché de Rouen' : 'the Rouen market') : id; }

// ── Centre-Val de Loire ─────────────────────────────────────────────────────────────────────────────────────────
const cv = R('centre-val-de-loire');
const centre = defineGuide({
  id: 'centre-val-de-loire', group: 'regions', order: 6,
  outil: { ville: '37261', rayon: 50, zone: 60 },
  related: ['pays-de-la-loire', 'bourgogne-franche-comte', 'week-ends', 'nocturnes'],
  sources: ['datagouv', 'datatourisme'],
  fr: {
    slug: 'marches-de-noel-centre-val-de-loire',
    nav: 'Centre-Val de Loire', card: `${C(cv.l, 'fr')} marchés : Tours, Bourges, Chartres, Châteauroux et l'Indre`,
    title: 'Marchés de Noël en Centre-Val de Loire 2026 : dates, villes',
    description: 'Marchés de Noël en Centre-Val de Loire 2026 : Tours, Bourges, Chartres, Châteauroux, Amboise et les villages de l\'Indre et du Cher, dates et horaires du jour.',
    h1: 'Marchés de Noël en Centre-Val de Loire 2026 : quatre grandes villes',
    intro: `Les marchés de Noël en Centre-Val de Loire sont ${C(cv.l, 'fr')} dans la base. Choisissez une ville et un jour : le moteur de recherche, réglé ici sur Tours, donne ceux qui sont ouverts et leurs horaires.`,
    resume: `L'export DATAtourisme lu le 13 novembre 2026 compte ${C(cv.l, 'fr')} marchés de Noël en Centre-Val de Loire, avec une répartition inattendue : l'Indre en publie ${C(cv.dep('36'), 'fr')}, plus que l'Indre-et-Loire, ${C(cv.dep('37'), 'fr')}, le Cher, ${C(cv.dep('18'), 'fr')}, et le Loiret, ${C(cv.dep('45'), 'fr')}. L'Eure-et-Loir et le Loir-et-Cher n'en ont presque pas. Quatre villes tiennent un marché de trois semaines ou plus : Tours, du 27 novembre au 27 décembre ; Bourges, avec son Village de Noël du 4 au 24 décembre ; Chartres, du 4 au 24 décembre de 10 h à 20 h ; Châteauroux, du 5 au 24 décembre. Amboise ouvre un week-end, du 11 au 13 décembre. Ailleurs, ${C(cv.unj, 'fr')} marchés ne durent qu'un jour. Les offices de la région indiquent souvent la gratuité : ${C(cv.grat, 'fr')} fiches la mentionnent. Après le 25 décembre, seul Tours reste ouvert, jusqu'au 27. Orléans n'a aucune fiche de marché de Noël dans l'export.`,
    faqs: [
      { q: 'Quelles sont les dates du marché de Noël de Tours ?', a: 'Du vendredi 27 novembre au dimanche 27 décembre 2026, avec une ouverture à 11 h. La fiche de l\'office de tourisme indique par erreur un début en novembre 2025 : nous la lisons sur l\'année de sa fin, 2026. Elle ne donne pas d\'heure de fermeture, et l\'entrée y est indiquée gratuite.', open: true },
      { q: 'Le marché de Noël de Chartres est-il ouvert le dimanche ?', a: 'Oui, selon sa fiche il ouvre tous les jours du 4 au 24 décembre 2026, de 10 h à 20 h. C\'est l\'un des rares marchés de la région à publier des horaires complets. Le moteur de recherche l\'affiche ouvert ou fermé selon l\'heure de votre appareil si vous choisissez le jour même.' },
      { q: 'Pourquoi l\'Indre compte-t-elle tant de marchés de Noël ?', a: `L'Indre en compte ${C(cv.dep('36'), 'fr')} dans l'export : c'est d'abord le signe que son office de tourisme publie les marchés de village dans la base, quand d'autres départements ne le font pas. Châteauroux tient le plus long, du 5 au 24 décembre ; Le Blanc ouvre un week-end, du 11 au 13 décembre.` },
    ],
    body: (x) => `<h2>Marchés de Noël en Centre-Val de Loire : six départements</h2>
<p>Le tableau montre l'écart entre départements, qui tient surtout à la publication dans la base. Le Loir-et-Cher, avec Blois, et l'Eure-et-Loir hors Chartres sont presque absents ; le Loiret ne compte aucun marché à Orléans. Le samedi ${jm('2026-11-28', 'fr')}, ${C(cv.s28, 'fr')} marchés sont ouverts dans la région ; le ${jm('2026-12-19', 'fr')}, ${C(cv.s19, 'fr')}. Voyez aussi ${x.a('week-ends', 'le calendrier des week-ends')}.</p>
${B.tabDeps(cv.deps, 'fr', 'Marchés de Noël du Centre-Val de Loire par département, export lu le 13 novembre 2026')}
<h2>Les quatre grands marchés de la région</h2>
<p>Tours est le seul à durer un mois entier. Bourges, Chartres et Châteauroux ouvrent tous trois début décembre et ferment le 24. Châteauroux publie deux horaires selon le jour, avec une fermeture à 21 h en fin de semaine : il figure parmi ${x.a('nocturnes', 'les marchés ouverts le soir')}.</p>
${B.tabMarches(cv.l, 'fr', 'Les marchés de Noël les plus longs du Centre-Val de Loire', 15)}
<p>Les fiches de la région indiquent souvent la gratuité, ce que d'autres régions ne renseignent pas : le filtre « entrée gratuite indiquée » du moteur de recherche y est donc utile. Pour Tours, la fiche donne une ouverture à 11 h mais aucune fermeture : le moteur de recherche affiche « horaires non publiés », et le site de la Ville, cité par la fiche, reste la référence.</p>`,
  },
  en: {
    slug: 'centre-val-de-loire-christmas-markets',
    nav: 'Centre-Val de Loire', card: `${C(cv.l, 'en')} markets: Tours, Bourges, Chartres, Châteauroux and the Indre`,
    title: 'Centre-Val de Loire Christmas markets 2026: dates and towns',
    description: 'Centre-Val de Loire Christmas markets 2026: Tours, Bourges, Chartres, Châteauroux, Amboise and the villages of the Indre and Cher, with dates and daily hours.',
    h1: 'Centre-Val de Loire Christmas markets 2026: four main towns',
    intro: `The Centre-Val de Loire Christmas markets number ${C(cv.l, 'en')} in the base. Pick a town and a day: the finder, set here on Tours, shows those open and their hours.`,
    resume: `The DATAtourisme export read on 13 November 2026 holds ${C(cv.l, 'en')} Christmas markets in Centre-Val de Loire, with an unexpected spread: the Indre enters ${C(cv.dep('36'), 'en')}, more than Indre-et-Loire, ${C(cv.dep('37'), 'en')}, the Cher, ${C(cv.dep('18'), 'en')}, and the Loiret, ${C(cv.dep('45'), 'en')}. Eure-et-Loir and Loir-et-Cher have almost none. Four towns hold a market lasting three weeks or more: Tours, from 27 November to 27 December; Bourges, with its Christmas Village from 4 to 24 December; Chartres, from 4 to 24 December, 10:00 to 20:00; Châteauroux, from 5 to 24 December. Amboise opens for one weekend, from 11 to 13 December. Elsewhere, ${C(cv.unj, 'en')} markets last a single day. Tourist offices in the region often state free entry: ${C(cv.grat, 'en')} listings mention it. After 25 December, only Tours stays open, until the 27th. Orléans has no Christmas market listing in the export.`,
    faqs: [
      { q: 'What are the dates of the Tours Christmas market?', a: 'From Friday 27 November to Sunday 27 December 2026, opening at 11:00. The tourist office listing wrongly gives a start in November 2025: we read it in the year it ends, 2026. It gives no closing time, and entry is listed as free.', open: true },
      { q: 'Is the Chartres Christmas market open on Sundays?', a: 'Yes, according to its listing it opens every day from 4 to 24 December 2026, from 10:00 to 20:00. It is one of the few markets in the region to publish full hours. The finder shows it open or closed by your device\'s time if you choose the same day.' },
      { q: 'Why does the Indre have so many Christmas markets?', a: `The Indre has ${C(cv.dep('36'), 'en')} in the export: first of all, a sign that its tourist office enters village markets in the base where other départements do not. Châteauroux holds the longest, from 5 to 24 December; Le Blanc opens for one weekend, from 11 to 13 December.` },
    ],
    body: (x) => `<h2>Centre-Val de Loire Christmas markets: six départements</h2>
<p>The table shows the gap between départements, which comes mostly from data entry. Loir-et-Cher, with Blois, and Eure-et-Loir outside Chartres are almost absent; the Loiret has no market in Orléans. On Saturday ${jm('2026-11-28', 'en')}, ${C(cv.s28, 'en')} markets are open in the region; on ${jm('2026-12-19', 'en')}, ${C(cv.s19, 'en')}. See also ${x.a('week-ends', 'the weekend calendar')}.</p>
${B.tabDeps(cv.deps, 'en', 'Centre-Val de Loire Christmas markets by département, export read on 13 November 2026')}
<h2>The region's four main markets</h2>
<p>Tours is the only one lasting a whole month. Bourges, Chartres and Châteauroux all open in early December and close on the 24th. Châteauroux publishes two schedules depending on the day, with a 21:00 closing at the end of the week: it is among ${x.a('nocturnes', 'the markets open in the evening')}.</p>
${B.tabMarches(cv.l, 'en', 'The longest Christmas markets in Centre-Val de Loire', 15)}
<p>The region's listings often state free entry, which other regions leave blank, so the finder's "Free entry stated" filter is useful here. For Tours, the listing gives an 11:00 opening but no closing time: the finder shows "hours not published", and the City site, cited by the listing, remains the reference.</p>`,
  },
});

// ── Auvergne-Rhône-Alpes ────────────────────────────────────────────────────────────────────────────────────────
const ar = R('auvergne-rhone-alpes');
const aura = defineGuide({
  id: 'auvergne-rhone-alpes', group: 'regions', order: 7,
  outil: { ville: '03185', rayon: 50, zone: 60 },
  related: ['bourgogne-franche-comte', 'centre-val-de-loire', 'week-ends', 'occitanie'],
  sources: ['datagouv', 'datatourisme'],
  fr: {
    slug: 'marches-de-noel-auvergne-rhone-alpes',
    nav: 'Auvergne-Rhône-Alpes', card: `${C(ar.l, 'fr')} marchés publiés, surtout dans l'Allier, la Haute-Loire et la Drôme`,
    title: 'Marchés de Noël en Auvergne-Rhône-Alpes 2026 : dates, lieux',
    description: 'Marchés de Noël en Auvergne-Rhône-Alpes 2026 : Montluçon, Moulins, la Haute-Loire et la Drôme, dates et horaires, et ce que la base ne couvre pas, comme Lyon.',
    h1: 'Marchés de Noël en Auvergne-Rhône-Alpes 2026 : ce que dit la base',
    intro: `Les marchés de Noël en Auvergne-Rhône-Alpes publiés dans la base sont ${C(ar.l, 'fr')}, dans cinq départements seulement. Choisissez une ville et un jour : le moteur de recherche, réglé ici sur Montluçon, donne ceux qui sont ouverts.`,
    resume: `Dans l'export DATAtourisme lu le 13 novembre 2026, l'Auvergne-Rhône-Alpes ne compte que ${C(ar.l, 'fr')} marchés de Noël, tous dans cinq départements : la Haute-Loire, ${C(ar.dep('43'), 'fr')}, la Drôme, ${C(ar.dep('26'), 'fr')}, l'Allier, ${C(ar.dep('03'), 'fr')}, l'Ain, ${C(ar.dep('01'), 'fr')}, et l'Ardèche, ${C(ar.dep('07'), 'fr')}. Le Rhône, l'Isère, la Savoie, la Haute-Savoie, le Puy-de-Dôme, la Loire et le Cantal n'y publient aucun marché de Noël : Lyon, Grenoble, Annecy et Clermont-Ferrand sont donc absents de ce site, faute de source ouverte datée. Ce qui reste est surtout rural. Les deux marchés les plus longs sont dans l'Allier : le Village de Noël de Montluçon, du 4 au 27 décembre, et Moulins, du 12 au 31 décembre. Bâgé-le-Châtel, dans l'Ain, ouvre du 4 au 19 décembre. En Haute-Loire, Langeac tient le sien du 17 au 23 décembre. ${C(ar.unj, 'fr')} marchés de la région ne durent qu'un jour.`,
    faqs: [
      { q: 'Pourquoi le marché de Noël de Lyon n\'apparaît-il pas ?', a: 'Parce qu\'aucune fiche de marché de Noël du Rhône ne figure dans l\'export DATAtourisme lu le 13 novembre 2026, et que nous n\'avons pas trouvé de page officielle donnant les dates 2026 à cette date. Nous préférons ne rien afficher plutôt que recopier des dates de la presse. Il en va de même pour Grenoble et Annecy.', open: true },
      { q: 'Quand ouvre le Village de Noël de Montluçon ?', a: 'Le vendredi 4 décembre 2026, d\'après la fiche de l\'office de tourisme, et il ferme le dimanche 27 décembre. C\'est le plus long marché de la région dans la base. La fiche ne donne pas d\'horaires : vérifiez-les auprès de l\'office de tourisme de Montluçon avant de partir.' },
      { q: 'Y a-t-il des marchés de Noël en Haute-Loire ?', a: `Oui, ${C(ar.dep('43'), 'fr')} fiches dans l'export, le premier département de la région. Ce sont surtout des marchés de village d'un jour ou d'un week-end. Langeac ouvre du 17 au 23 décembre, Saint-Jeures du 19 au 22 décembre en fin de journée, de 16 h à 22 h selon sa fiche.` },
    ],
    body: (x) => `<h2>Marchés de Noël en Auvergne-Rhône-Alpes : cinq départements sur douze</h2>
<p>Le tableau ne montre que les départements où au moins une fiche existe. Les sept autres ne sont pas sans marché de Noël : leurs offices de tourisme ne les publient pas dans la base nationale, ou pas sous ce nom. Si vous partez de Lyon ou de Clermont-Ferrand, le moteur de recherche montre les marchés les plus proches qui sont, eux, dans la base, avec leur distance à vol d'oiseau.</p>
${B.tabDeps(ar.deps, 'fr', 'Marchés de Noël d\'Auvergne-Rhône-Alpes par département, export lu le 13 novembre 2026')}
<h2>L'Allier, la Haute-Loire et la Drôme</h2>
<p>Dans l'Allier, Montluçon et Moulins tiennent les deux marchés les plus longs, Cusset et Saint-Pourçain-sur-Sioule des marchés de trois jours. Pour la région voisine, voyez ${x.a('bourgogne-franche-comte', 'la Bourgogne-Franche-Comté')}, et pour le choix d'un samedi, ${x.a('week-ends', 'le calendrier des week-ends de l\'Avent')}.</p>
${B.tabMarches(ar.l, 'fr', 'Les marchés de Noël les plus longs d\'Auvergne-Rhône-Alpes dans la base', 15)}
<p>Dans la Drôme, la fiche du village de Noël « Fééries d'Hiver » de Valence donne une ouverture le 27 novembre de 18 h à 21 h, puis les seuls lundis jusqu'au 21 décembre, ce qui ressemble à une erreur de saisie. Nous la reprenons telle quelle : vérifiez les jours sur le site du village, cité par la fiche, avant de vous déplacer.</p>`,
  },
  en: {
    slug: 'auvergne-rhone-alpes-christmas-markets',
    nav: 'Auvergne-Rhône-Alpes', card: `${C(ar.l, 'en')} markets entered, mostly in the Allier, Haute-Loire and Drôme`,
    title: 'Auvergne-Rhône-Alpes Christmas markets 2026: dates, places',
    description: 'Auvergne-Rhône-Alpes Christmas markets 2026: Montluçon, Moulins, the Haute-Loire and Drôme, with dates and hours, and what the base leaves out, like Lyon.',
    h1: 'Auvergne-Rhône-Alpes Christmas markets 2026: what the base says',
    intro: `The Auvergne-Rhône-Alpes Christmas markets entered in the base number ${C(ar.l, 'en')}, in five départements only. Pick a town and a day: the finder, set here on Montluçon, shows those open.`,
    resume: `In the DATAtourisme export read on 13 November 2026, Auvergne-Rhône-Alpes has only ${C(ar.l, 'en')} Christmas markets, all in five départements: Haute-Loire, ${C(ar.dep('43'), 'en')}, the Drôme, ${C(ar.dep('26'), 'en')}, the Allier, ${C(ar.dep('03'), 'en')}, the Ain, ${C(ar.dep('01'), 'en')}, and the Ardèche, ${C(ar.dep('07'), 'en')}. The Rhône, Isère, Savoie, Haute-Savoie, Puy-de-Dôme, Loire and Cantal enter no Christmas market there: Lyon, Grenoble, Annecy and Clermont-Ferrand are therefore missing from this site, for lack of a dated open source. What remains is mostly rural. The two longest markets are in the Allier: the Montluçon Christmas Village, from 4 to 27 December, and Moulins, from 12 to 31 December. Bâgé-le-Châtel, in the Ain, opens from 4 to 19 December. In Haute-Loire, Langeac holds its own from 17 to 23 December. ${C(ar.unj, 'en')} markets in the region last a single day.`,
    faqs: [
      { q: 'Why is the Lyon Christmas market missing?', a: 'Because no Rhône Christmas market listing appears in the DATAtourisme export read on 13 November 2026, and we found no official page giving the 2026 dates on that date. We would rather show nothing than copy dates from the press. The same goes for Grenoble and Annecy.', open: true },
      { q: 'When does the Montluçon Christmas Village open?', a: 'On Friday 4 December 2026, according to the tourist office listing, and it closes on Sunday 27 December. It is the longest market in the region in the base. The listing gives no hours, so check them with the Montluçon tourist office before you go.' },
      { q: 'Are there Christmas markets in Haute-Loire?', a: `Yes, ${C(ar.dep('43'), 'en')} listings in the export, the region's leading département. They are mostly village markets over a day or a weekend. Langeac opens from 17 to 23 December, Saint-Jeures from 19 to 22 December in the late afternoon, 16:00 to 22:00 according to its listing.` },
    ],
    body: (x) => `<h2>Auvergne-Rhône-Alpes Christmas markets: five départements out of twelve</h2>
<p>The table only shows départements with at least one listing. The other seven are not without Christmas markets: their tourist offices do not publish them in the national base, or not under that name. If you start from Lyon or Clermont-Ferrand, the finder shows the nearest markets that are in the base, with their straight-line distance.</p>
${B.tabDeps(ar.deps, 'en', 'Auvergne-Rhône-Alpes Christmas markets by département, export read on 13 November 2026')}
<h2>The Allier, Haute-Loire and the Drôme</h2>
<p>In the Allier, Montluçon and Moulins hold the two longest markets, Cusset and Saint-Pourçain-sur-Sioule three-day markets. For the neighbouring region, see ${x.a('bourgogne-franche-comte', 'Bourgogne-Franche-Comté')}, and to choose a Saturday, ${x.a('week-ends', 'the Advent weekend calendar')}.</p>
${B.tabMarches(ar.l, 'en', 'The longest Auvergne-Rhône-Alpes Christmas markets in the base', 15)}
<p>In the Drôme, the listing for the Valence "Fééries d'Hiver" Christmas village gives an opening on 27 November from 18:00 to 21:00, then Mondays only until 21 December, which looks like a data entry error. We show it as entered: check the days on the village's site, cited by the listing, before you travel.</p>`,
  },
});

// ── Bourgogne-Franche-Comté ─────────────────────────────────────────────────────────────────────────────────────
const bf = R('bourgogne-franche-comte');
const bfc = defineGuide({
  id: 'bourgogne-franche-comte', group: 'regions', order: 8,
  outil: { ville: '21231', rayon: 50, zone: 60 },
  related: ['auvergne-rhone-alpes', 'grand-est', 'week-ends', 'centre-val-de-loire'],
  sources: ['datagouv', 'datatourisme'],
  fr: {
    slug: 'marches-de-noel-bourgogne-franche-comte',
    nav: 'Bourgogne-Franche-Comté', card: `${C(bf.l, 'fr')} marchés courts, de Cluny à la Saline royale d'Arc-et-Senans`,
    title: 'Marchés de Noël en Bourgogne-Franche-Comté 2026 : les dates',
    description: 'Marchés de Noël en Bourgogne-Franche-Comté 2026 : Pontarlier, Cluny, Arc-et-Senans, Verdun-sur-le-Doubs et les villages, avec dates et horaires du marché.',
    h1: 'Marchés de Noël en Bourgogne-Franche-Comté 2026 : marchés courts',
    intro: `Les marchés de Noël en Bourgogne-Franche-Comté sont ${C(bf.l, 'fr')} dans la base, aucun ouvert après Noël. Choisissez une ville et un jour : le moteur de recherche, réglé ici sur Dijon, donne ceux qui sont ouverts.`,
    resume: `L'export DATAtourisme lu le 13 novembre 2026 compte ${C(bf.l, 'fr')} marchés de Noël en Bourgogne-Franche-Comté, répartis de façon régulière entre les départements : ${C(bf.dep('71'), 'fr')} en Saône-et-Loire, ${C(bf.dep('25'), 'fr')} dans le Doubs, ${C(bf.dep('39'), 'fr')} dans le Jura, ${C(bf.dep('21'), 'fr')} en Côte-d'Or, ${C(bf.dep('89'), 'fr')} dans l'Yonne, ${C(bf.dep('70'), 'fr')} en Haute-Saône et ${C(bf.dep('58'), 'fr')} dans la Nièvre. Aucun ne dure vingt jours et aucun n'a de date après le 25 décembre : c'est une région de marchés courts. Les plus longs sont Verdun-sur-le-Doubs, du 5 au 19 décembre, Pontarlier, du 11 au 24 décembre, et Cluny, sur les week-ends du 4 au 20 décembre de 9 h à 19 h. La Saline royale d'Arc-et-Senans ouvre du 28 novembre au 6 décembre, de 10 h à 19 h. Dijon n'a qu'une fiche, un marché des produits de Côte-d'Or les 12 et 13 décembre ; Besançon n'en a aucune. ${C(bf.grat, 'fr')} fiches indiquent une entrée gratuite.`,
    faqs: [
      { q: 'Quand a lieu le marché de Noël de la Saline royale ?', a: 'Du samedi 28 novembre au dimanche 6 décembre 2026, de 10 h à 19 h, selon la fiche de l\'office de tourisme. La fiche compte quatre jours d\'ouverture sur cette période. C\'est l\'un des rares marchés de Noël de la région installés dans un monument classé.', open: true },
      { q: 'Y a-t-il un marché de Noël à Dijon en 2026 ?', a: 'La base ne contient qu\'une fiche à Dijon : un marché de Noël des produits de Côte-d\'Or, les 12 et 13 décembre 2026, publié par Côte-d\'Or Attractivité. Aucune fiche ne décrit un marché de plusieurs semaines en centre-ville. Le fort d\'Hauteville-lès-Dijon tient aussi un marché du 11 au 13 décembre.' },
      { q: 'Quels marchés de Noël dans le Jura et le Doubs ?', a: `Le Doubs compte ${C(bf.dep('25'), 'fr')} fiches et le Jura ${C(bf.dep('39'), 'fr')}. Pontarlier tient le plus long, du 11 au 24 décembre ; Ornans ouvre du 27 au 29 novembre jusqu'à 22 h. Le moteur de recherche, réglé sur la ville de votre choix, les montre avec leurs horaires du jour.` },
    ],
    body: (x) => `<h2>Marchés de Noël en Bourgogne-Franche-Comté : huit départements</h2>
<p>Le Territoire de Belfort n'a qu'une fiche ; les sept autres départements en ont chacun une vingtaine. Le tableau montre un pic le samedi ${jm('2026-12-05', 'fr')}, avec ${C(bf.s5, 'fr')} marchés ouverts, contre ${C(bf.s28, 'fr')} le ${jm('2026-11-28', 'fr')} et ${C(bf.s19, 'fr')} le ${jm('2026-12-19', 'fr')}. Pour les marchés alsaciens, voisins du Territoire de Belfort, voyez ${x.a('grand-est', 'le Grand Est')}.</p>
${B.tabDeps(bf.deps, 'fr', 'Marchés de Noël de Bourgogne-Franche-Comté par département, export lu le 13 novembre 2026')}
<h2>Les marchés les plus longs</h2>
<p>Aucun ne dépasse quinze jours d'ouverture. Cluny répartit ses marchés sur plusieurs week-ends ; Decize tient un marché « Alsace gourmand » du 11 au 13 décembre jusqu'à 22 h. Pour choisir un samedi, voyez ${x.a('week-ends', 'le calendrier des week-ends de l\'Avent')}.</p>
${B.tabMarches(bf.l, 'fr', 'Les marchés de Noël les plus longs de Bourgogne-Franche-Comté', 15)}
<p>La plupart des fiches de la région donnent leurs horaires, ${C(bf.hor, 'fr')} sur ${C(bf.l, 'fr')} : le moteur de recherche peut donc dire si un marché est encore ouvert en fin d'après-midi. Pontarlier, ouvert jusqu'au 24 décembre selon sa fiche, est l'un des derniers de la région à fermer.</p>`,
  },
  en: {
    slug: 'bourgogne-franche-comte-christmas-markets',
    nav: 'Bourgogne-Franche-Comté', card: `${C(bf.l, 'en')} short markets, from Cluny to the Royal Saltworks at Arc-et-Senans`,
    title: 'Bourgogne-Franche-Comté Christmas markets 2026: the dates',
    description: 'Bourgogne-Franche-Comté Christmas markets 2026: Pontarlier, Cluny, Arc-et-Senans, Verdun-sur-le-Doubs and the villages, with the dates and hours of each market.',
    h1: 'Bourgogne-Franche-Comté Christmas markets 2026: short markets',
    intro: `The Bourgogne-Franche-Comté Christmas markets number ${C(bf.l, 'en')} in the base, none open after Christmas. Pick a town and a day: the finder, set here on Dijon, shows those open.`,
    resume: `The DATAtourisme export read on 13 November 2026 holds ${C(bf.l, 'en')} Christmas markets in Bourgogne-Franche-Comté, spread evenly across départements: ${C(bf.dep('71'), 'en')} in Saône-et-Loire, ${C(bf.dep('25'), 'en')} in the Doubs, ${C(bf.dep('39'), 'en')} in the Jura, ${C(bf.dep('21'), 'en')} in Côte-d'Or, ${C(bf.dep('89'), 'en')} in the Yonne, ${C(bf.dep('70'), 'en')} in Haute-Saône and ${C(bf.dep('58'), 'en')} in the Nièvre. None lasts twenty days and none has a date after 25 December: this is a region of short markets. The longest are Verdun-sur-le-Doubs, from 5 to 19 December, Pontarlier, from 11 to 24 December, and Cluny, over the weekends from 4 to 20 December, 9:00 to 19:00. The Royal Saltworks at Arc-et-Senans opens from 28 November to 6 December, 10:00 to 19:00. Dijon has a single listing, a Côte-d'Or produce market on 12 and 13 December; Besançon has none. ${C(bf.grat, 'en')} listings state free entry.`,
    faqs: [
      { q: 'When is the Royal Saltworks Christmas market held?', a: 'From Saturday 28 November to Sunday 6 December 2026, 10:00 to 19:00, according to the tourist office listing. The listing counts four opening days over that period. It is one of the few Christmas markets in the region set in a listed monument.', open: true },
      { q: 'Is there a Christmas market in Dijon in 2026?', a: 'The base holds only one listing in Dijon: a Christmas market of Côte-d\'Or produce on 12 and 13 December 2026, entered by Côte-d\'Or Attractivité. No listing describes a market lasting several weeks in the city centre. The fort at Hauteville-lès-Dijon also holds a market from 11 to 13 December.' },
      { q: 'Which Christmas markets are there in the Jura and the Doubs?', a: `The Doubs has ${C(bf.dep('25'), 'en')} listings and the Jura ${C(bf.dep('39'), 'en')}. Pontarlier holds the longest, from 11 to 24 December; Ornans opens from 27 to 29 November until 22:00. The finder, set on the town of your choice, shows them with their hours for the day.` },
    ],
    body: (x) => `<h2>Bourgogne-Franche-Comté Christmas markets: eight départements</h2>
<p>The Territoire de Belfort has a single listing; the other seven départements have about twenty each. The table shows a peak on Saturday ${jm('2026-12-05', 'en')}, with ${C(bf.s5, 'en')} markets open, against ${C(bf.s28, 'en')} on ${jm('2026-11-28', 'en')} and ${C(bf.s19, 'en')} on ${jm('2026-12-19', 'en')}. For the Alsace markets, next to the Territoire de Belfort, see ${x.a('grand-est', 'Grand Est')}.</p>
${B.tabDeps(bf.deps, 'en', 'Bourgogne-Franche-Comté Christmas markets by département, export read on 13 November 2026')}
<h2>The longest markets</h2>
<p>None goes beyond fifteen opening days. Cluny spreads its markets over several weekends; Decize holds an "Alsace gourmand" market from 11 to 13 December until 22:00. To choose a Saturday, see ${x.a('week-ends', 'the Advent weekend calendar')}.</p>
${B.tabMarches(bf.l, 'en', 'The longest Christmas markets in Bourgogne-Franche-Comté', 15)}
<p>Most listings in the region give their hours, ${C(bf.hor, 'en')} out of ${C(bf.l, 'en')}, so the finder can tell you whether a market is still open in the late afternoon. Pontarlier, open until 24 December according to its listing, is one of the last in the region to close, and no market here has a date after Christmas.</p>`,
  },
});

// ── Bretagne ────────────────────────────────────────────────────────────────────────────────────────────────────
const br = R('bretagne');
const bretagne = defineGuide({
  id: 'bretagne', group: 'regions', order: 9,
  outil: { ville: '22278', rayon: 50, zone: 60 },
  related: ['pays-de-la-loire', 'normandie', 'week-ends', 'nocturnes'],
  sources: ['datagouv', 'datatourisme'],
  fr: {
    slug: 'marches-de-noel-bretagne',
    nav: 'Bretagne', card: `${C(br.l, 'fr')} marchés, presque tous d'un week-end, surtout dans les Côtes-d'Armor`,
    title: 'Marchés de Noël en Bretagne 2026 : dates et week-ends',
    description: 'Marchés de Noël en Bretagne 2026 : Côtes-d\'Armor, Finistère, Morbihan et Ille-et-Vilaine, les dates de chaque marché, leurs horaires et les week-ends à retenir.',
    h1: 'Marchés de Noël en Bretagne 2026 : une saison de week-ends',
    intro: `Les marchés de Noël en Bretagne sont ${C(br.l, 'fr')} dans la base, presque tous sur un ou deux jours. Choisissez une ville et un jour : le moteur de recherche, réglé ici sur Saint-Brieuc, donne ceux qui sont ouverts.`,
    resume: `L'export DATAtourisme lu le 13 novembre 2026 compte ${C(br.l, 'fr')} marchés de Noël en Bretagne. Les Côtes-d'Armor en publient ${C(br.dep('22'), 'fr')}, le Finistère ${C(br.dep('29'), 'fr')}, le Morbihan ${C(br.dep('56'), 'fr')} et l'Ille-et-Vilaine ${C(br.dep('35'), 'fr')}. La Bretagne n'a pas, dans la base, de grand marché de ville de plusieurs semaines : aucun ne dure vingt jours, aucun n'a de date après le 25 décembre, et Rennes, Brest, Quimper et Saint-Brieuc n'y ont aucune fiche de marché de Noël. Ce sont des marchés de créateurs, d'associations et de bourgs, d'un samedi ou d'un week-end. Le samedi ${jm('2026-12-05', 'fr')} en concentre le plus, ${C(br.s5, 'fr')}, contre ${C(br.s28, 'fr')} le ${jm('2026-11-28', 'fr')}. Le plus long est le marché des créateurs de Plounéour-Brignogan-Plages, du 7 au 23 décembre en fin d'après-midi. Saint-Suliac, sur la Rance, ouvre deux week-ends jusqu'à 21 h. Les horaires sont publiés par ${C(br.hor, 'fr')} fiches sur ${C(br.l, 'fr')}.`,
    faqs: [
      { q: 'Quel week-end pour les marchés de Noël en Bretagne ?', a: `Le premier week-end de décembre : le samedi 5, ${C(br.s5, 'fr')} marchés bretons sont ouverts selon leurs fiches, plus qu'aucun autre samedi. Le week-end suivant en compte ${C(br.s12, 'fr')} le samedi. Fin novembre et le 19 décembre, il y en a beaucoup moins.`, open: true },
      { q: 'Y a-t-il un marché de Noël à Rennes dans la base ?', a: 'Non. L\'export DATAtourisme lu le 13 novembre 2026 ne contient aucune fiche de marché de Noël à Rennes, ni à Brest, Quimper ou Saint-Brieuc. Le moteur de recherche, réglé sur l\'une de ces villes, montre les marchés des communes voisines qui sont dans la base, avec leur distance.' },
      { q: 'Quels marchés de Noël en Bretagne ouvrent le soir ?', a: `${C(B.nocturnes(br.l, '21:00'), 'fr')} fiches bretonnes publient une fermeture à 21 h ou plus tard au moins un jour, comme Saint-Suliac ou La Clarté à Perros-Guirec, ouverts jusqu'à 21 h selon leurs fiches. Le filtre « ouverts jusqu'à 20 h ou plus tard » du moteur de recherche les isole.` },
    ],
    body: (x) => `<h2>Marchés de Noël en Bretagne : les quatre départements</h2>
<p>Les Côtes-d'Armor fournissent à elles seules plus d'un tiers des fiches bretonnes. L'Ille-et-Vilaine, la plus peuplée, en publie le moins. Le tableau ne mentionne aucune entrée gratuite : les offices bretons ne renseignent pas ce champ, ce qui ne dit rien du prix. Pour la région voisine, voyez ${x.a('pays-de-la-loire', 'les Pays de la Loire')}, dont les fiches donnent presque toujours les horaires.</p>
${B.tabDeps(br.deps, 'fr', 'Marchés de Noël de Bretagne par département, export lu le 13 novembre 2026')}
<h2>Les marchés de plus d'un week-end</h2>
<p>Ils se comptent sur les doigts d'une main. Le marché des créateurs de Plounéour-Brignogan-Plages ouvre en fin d'après-midi pendant plus de deux semaines ; une fiche de Douarnenez est publiée « en attente de confirmation ». Pour choisir votre samedi, ${x.a('week-ends', 'le calendrier des week-ends')} compare toutes les régions.</p>
${B.tabMarches(br.l, 'fr', 'Les marchés de Noël les plus longs de Bretagne', 15)}
<p>Avec ${C(br.hor, 'fr')} fiches sur ${C(br.l, 'fr')} qui publient leurs horaires, le moteur de recherche peut dire si un marché breton ouvre le matin ou seulement l'après-midi. Les marchés de bourg sont dispersés : réglez le moteur de recherche sur Rennes, Brest ou Vannes, puis élargissez le rayon à 50 km.</p>`,
  },
  en: {
    slug: 'brittany-christmas-markets',
    nav: 'Brittany', card: `${C(br.l, 'en')} markets, nearly all over one weekend, mostly in the Côtes-d'Armor`,
    title: 'Brittany Christmas markets 2026: dates and weekends to note',
    description: 'Brittany Christmas markets 2026: Côtes-d\'Armor, Finistère, Morbihan and Ille-et-Vilaine, the dates of each market, their hours and the weekends to keep free.',
    h1: 'Brittany Christmas markets 2026: a season of weekends',
    intro: `The Brittany Christmas markets number ${C(br.l, 'en')} in the base, nearly all over one or two days. Pick a town and a day: the finder, set here on Saint-Brieuc, shows those open.`,
    resume: `The DATAtourisme export read on 13 November 2026 holds ${C(br.l, 'en')} Christmas markets in Brittany. The Côtes-d'Armor enter ${C(br.dep('22'), 'en')}, Finistère ${C(br.dep('29'), 'en')}, Morbihan ${C(br.dep('56'), 'en')} and Ille-et-Vilaine ${C(br.dep('35'), 'en')}. In the base, Brittany has no large town market lasting several weeks: none lasts twenty days, none has a date after 25 December, and Rennes, Brest, Quimper and Saint-Brieuc have no Christmas market listing there. These are makers', charity and small-town markets, held on a Saturday or over a weekend. Saturday ${jm('2026-12-05', 'en')} has the most, ${C(br.s5, 'en')}, against ${C(br.s28, 'en')} on ${jm('2026-11-28', 'en')}. The longest is the makers' market at Plounéour-Brignogan-Plages, from 7 to 23 December in the late afternoon. Saint-Suliac, on the Rance, opens over two weekends until 21:00. Hours are published by ${C(br.hor, 'en')} listings out of ${C(br.l, 'en')}.`,
    faqs: [
      { q: 'Which weekend is best for Brittany Christmas markets?', a: `The first weekend of December: on Saturday 5, ${C(br.s5, 'en')} Breton markets are open according to their listings, more than on any other Saturday. The following weekend has ${C(br.s12, 'en')} on the Saturday. In late November and on 19 December there are far fewer.`, open: true },
      { q: 'Is there a Rennes Christmas market in the base?', a: 'No. The DATAtourisme export read on 13 November 2026 contains no Christmas market listing in Rennes, nor in Brest, Quimper or Saint-Brieuc. The finder, set on one of these cities, shows the markets of nearby towns that are in the base, with their distance.' },
      { q: 'Which Brittany Christmas markets open in the evening?', a: `${C(B.nocturnes(br.l, '21:00'), 'en')} Breton listings publish a closing time of 21:00 or later on at least one day, such as Saint-Suliac or La Clarté in Perros-Guirec, open until 21:00 according to their listings. The finder's "open until 8pm or later" filter singles them out.` },
    ],
    body: (x) => `<h2>Brittany Christmas markets: the four départements</h2>
<p>The Côtes-d'Armor alone provide more than a third of Breton listings. Ille-et-Vilaine, the most populated, enters the fewest. The table shows no free entry at all: Breton offices do not fill in that field, which says nothing about price. For the neighbouring region, see ${x.a('pays-de-la-loire', 'Pays de la Loire')}, whose listings nearly always give hours.</p>
${B.tabDeps(br.deps, 'en', 'Brittany Christmas markets by département, export read on 13 November 2026')}
<h2>Markets lasting more than a weekend</h2>
<p>They can be counted on one hand. The Plounéour-Brignogan-Plages makers' market opens in the late afternoon for more than two weeks; a Douarnenez listing is entered as "awaiting confirmation". To choose your Saturday, ${x.a('week-ends', 'the weekend calendar')} compares all regions.</p>
${B.tabMarches(br.l, 'en', 'The longest Christmas markets in Brittany', 15)}
<p>With ${C(br.hor, 'en')} listings out of ${C(br.l, 'en')} publishing their hours, the finder can tell you whether a Breton market opens in the morning or only in the afternoon. Small-town markets are scattered: set the finder on Rennes, Brest or Vannes, then widen the radius to 50 km.</p>`,
  },
});

export default [grandEst, nouvelleAquitaine, occitanie, paysDeLaLoire, normandie, centre, aura, bfc, bretagne] as GuideDef[];
