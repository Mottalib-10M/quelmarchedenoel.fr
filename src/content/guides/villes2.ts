/** Pages par ville, suite : Mulhouse, Metz, Kaysersberg, Rouen, Toulouse, Montpellier. Chaque nombre vient de marches.json. */
import { defineGuide, type GuideDef } from '../../lib/page-types';
import { MARCHES } from '../../lib/data';
import { distanceKm } from '../../lib/engine/marches';
import { B, C, N, jl, jm, h } from './_f';

const un = (insee: string, motif: string) => MARCHES.find((m) => m.insee === insee && m.n.includes(motif))!;
const km = (a: { la: number; lo: number }, b: { la: number; lo: number }, l: 'fr' | 'en') => N(distanceKm(a, b), l);

// ── Mulhouse ────────────────────────────────────────────────────────────────────────────────────────────────────
const MLH = '68224', mlh = un(MLH, 'de Mulhouse'), coeur = un(MLH, 'Coeur'), musee = un(MLH, 'Impression'), motoco = un(MLH, 'MOTOCO');
const mlh30 = B.rayon(MLH, 30).filter((m) => m.insee !== MLH);
const mulhouse = defineGuide({
  id: 'mulhouse', group: 'villes', order: 6,
  outil: { ville: MLH, rayon: 30, vedette: { ids: B.commune(MLH).map((m) => m.id), fr: 'les marchés de Noël de Mulhouse', en: 'the Mulhouse Christmas markets', pl: true } },
  related: ['colmar', 'kaysersberg', 'alsace', 'apres-noel'],
  sources: ['mulhouse', 'datagouv', 'datatourisme'],
  fr: {
    slug: 'marche-de-noel-mulhouse',
    nav: 'Mulhouse', card: 'Quatre marchés dans la ville, du 14 novembre au 31 décembre 2026, ouverts le 26',
    title: 'Marché de Noël de Mulhouse 2026 : dates et horaires du jour',
    description: 'Marché de Noël de Mulhouse 2026 : du 20 novembre au 27 décembre, 10 h à 21 h du vendredi au dimanche, fermé le 25 et rouvert le 26. Et les autres marchés.',
    h1: 'Marché de Noël de Mulhouse 2026 : horaires jour par jour',
    intro: `Le marché de Noël de Mulhouse ouvre le ${jl(mlh.s!, 'fr')} et ferme le ${jl(mlh.e!, 'fr')}. Choisissez un jour : le moteur de recherche donne ses horaires, ceux des trois autres marchés de la ville et des villages du Sundgau.`,
    resume: `D'après la fiche de l'office de tourisme de Mulhouse Sud Alsace dans DATAtourisme, lue le 13 novembre 2026, le marché de Noël de Mulhouse est ouvert du vendredi 20 novembre au dimanche 27 décembre 2026. Les horaires dépendent du jour : de 11 h à 20 h du lundi au jeudi, de 10 h à 21 h du vendredi au dimanche. Le 24 décembre, il ferme à 18 h ; il reste fermé le 25 ; il rouvre le samedi 26 de 12 h à 21 h et le dimanche 27 de 10 h à 18 h. Trois autres fiches complètent la ville : le marché du Cœur de Mulhouse, ouvert jusqu'au 29 décembre, celui du musée de l'Impression sur Étoffes, de 13 h à 18 h jusqu'au 31 décembre, et un marché de créateurs à MOTOCO le week-end du 18 décembre. L'entrée est indiquée gratuite sur les quatre fiches. Dans un rayon de 30 km, la base compte ${C(mlh30, 'fr')} autres marchés de Noël.`,
    faqs: [
      { q: 'Le marché de Noël de Mulhouse est-il ouvert le 26 décembre ?', a: `Oui. La fiche le donne fermé le 25 décembre puis ouvert le samedi 26 de 12 h à 21 h et le dimanche 27 de 10 h à 18 h, dernier jour. Le marché du Cœur de Mulhouse continue jusqu'au ${jl(coeur.e!, 'fr')}, et le musée de l'Impression sur Étoffes jusqu'au 31 décembre, l'après-midi.`, open: true },
      { q: 'À quelle heure ouvre le marché de Noël de Mulhouse en semaine ?', a: 'À 11 h du lundi au jeudi, avec une fermeture à 20 h. Le vendredi, le samedi et le dimanche, les chalets ouvrent dès 10 h et ferment à 21 h. Le 24 décembre, ils ouvrent à 11 h et ferment à 18 h, selon la fiche de l\'office de tourisme lue le 13 novembre 2026.' },
      { q: 'Quels marchés de Noël autour de Mulhouse ?', a: `À moins de 30 km, la base en compte ${C(mlh30, 'fr')}, dont ${C(B.ouverts(mlh30, '2026-12-12'), 'fr')} ouverts le samedi 12 décembre. Le plus long est celui de Thann, à ${km(mlh, un('68334', 'Noël'), 'fr')} km, puis viennent Guebwiller et Ensisheim. La plupart des autres sont des marchés de village d'un seul week-end.` },
    ],
    body: (x) => `<h2>Marché de Noël de Mulhouse : les quatre fiches de la ville</h2>
<p>L'office de tourisme publie chaque marché à part. Le grand marché renvoie au ${x.src('mulhouse', 'site du marché de Noël de Mulhouse')}. Les horaires du samedi figurent dans le tableau ; ceux des autres jours sont dans le moteur de recherche. Le musée de l'Impression sur Étoffes ouvre plus tôt que tous les autres, dès le ${jm(musee.s!, 'fr')}, mais seulement l'après-midi. MOTOCO ne tient son marché que trois jours, du ${jm(motoco.s!, 'fr')} au ${jm(motoco.e!, 'fr')}.</p>
${B.tabMarches(B.commune(MLH), 'fr', 'Les marchés de Noël de Mulhouse, d\'après les fiches de l\'office de tourisme')}
<h2>Le sud de l'Alsace autour de Mulhouse</h2>
<p>Mulhouse est la grande ville la plus au sud de la route des marchés d'Alsace. À l'ouest, Thann tient un marché de plus de quatre semaines ; Guebwiller en compte trois, plus courts ; vers la Suisse, Huningue et Saint-Louis ouvrent quelques jours. Le samedi ${jm('2026-12-05', 'fr')}, ${C(B.ouverts(mlh30, '2026-12-05'), 'fr')} marchés sont ouverts à moins de 30 km, contre ${C(B.ouverts(mlh30, '2026-12-19'), 'fr')} le ${jm('2026-12-19', 'fr')}. Colmar est à une quarantaine de kilomètres : voyez ${x.a('colmar', 'ses six places')} et ${x.a('alsace', 'le planning des marchés d\'Alsace')}.</p>
${B.tabAutour(MLH, 30, 'fr', 10, 'Marchés de Noël à moins de 30 km de Mulhouse')}`,
  },
  en: {
    slug: 'mulhouse-christmas-market',
    nav: 'Mulhouse', card: 'Four markets in town, 14 November to 31 December 2026, open on the 26th',
    title: 'Mulhouse Christmas market 2026: dates and daily hours',
    description: 'Mulhouse Christmas market 2026: 20 November to 27 December, 10:00 to 21:00 Friday to Sunday, closed on the 25th and open again on the 26th. Other town markets.',
    h1: 'Mulhouse Christmas market 2026: opening hours day by day',
    intro: `The Mulhouse Christmas market opens on ${jl(mlh.s!, 'en')} and closes on ${jl(mlh.e!, 'en')}. Pick a day: the finder gives its hours, those of the three other markets in town and of the Sundgau villages.`,
    resume: `According to the Mulhouse Sud Alsace tourist office listing in DATAtourisme, read on 13 November 2026, the Mulhouse Christmas market is open from Friday 20 November to Sunday 27 December 2026. Hours depend on the day: from 11:00 to 20:00 Monday to Thursday, from 10:00 to 21:00 Friday to Sunday. On 24 December it closes at 18:00; it stays shut on the 25th; it reopens on Saturday 26 from 12:00 to 21:00 and on Sunday 27 from 10:00 to 18:00. Three other listings complete the town: the Cœur de Mulhouse market, open until 29 December, the one at the Museum of Printed Textiles, from 13:00 to 18:00 until 31 December, and a makers' market at MOTOCO over the weekend of 18 December. Entry is listed as free on all four. Within 30 km, the base holds ${C(mlh30, 'en')} other Christmas markets.`,
    faqs: [
      { q: 'Is the Mulhouse Christmas market open on 26 December?', a: `Yes. The listing shows it closed on 25 December, then open on Saturday 26 from 12:00 to 21:00 and on Sunday 27 from 10:00 to 18:00, its last day. The Cœur de Mulhouse market carries on until ${jl(coeur.e!, 'en')}, and the Museum of Printed Textiles until 31 December, in the afternoon.`, open: true },
      { q: 'What time does the Mulhouse market open on weekdays?', a: 'At 11:00 from Monday to Thursday, closing at 20:00. On Friday, Saturday and Sunday the stalls open at 10:00 and close at 21:00. On 24 December they open at 11:00 and close at 18:00, according to the tourist office listing read on 13 November 2026.' },
      { q: 'Which Christmas markets are there around Mulhouse?', a: `Within 30 km the base holds ${C(mlh30, 'en')}, of which ${C(B.ouverts(mlh30, '2026-12-12'), 'en')} are open on Saturday 12 December. The longest is at Thann, ${km(mlh, un('68334', 'Noël'), 'en')} km away, followed by Guebwiller and Ensisheim. Most of the others are village markets held over a single weekend.` },
    ],
    body: (x) => `<h2>Mulhouse Christmas market: the four listings in town</h2>
<p>The tourist office enters each market separately. The main market links to the ${x.src('mulhouse', 'Mulhouse Christmas market site')}. Saturday hours are in the table; the other days are in the finder. The Museum of Printed Textiles opens earlier than all the others, from ${jm(musee.s!, 'en')}, but only in the afternoon. MOTOCO holds its market for three days only, from ${jm(motoco.s!, 'en')} to ${jm(motoco.e!, 'en')}. All four listings give free entry.</p>
${B.tabMarches(B.commune(MLH), 'en', 'Mulhouse Christmas markets, from the tourist office listings')}
<h2>Southern Alsace around Mulhouse</h2>
<p>Mulhouse is the southernmost large town on the Alsace market trail. To the west, Thann holds a market lasting over four weeks; Guebwiller has three shorter ones; towards Switzerland, Huningue and Saint-Louis open for a few days. On Saturday ${jm('2026-12-05', 'en')}, ${C(B.ouverts(mlh30, '2026-12-05'), 'en')} markets are open within 30 km, against ${C(B.ouverts(mlh30, '2026-12-19'), 'en')} on ${jm('2026-12-19', 'en')}. Colmar is about forty kilometres away: see ${x.a('colmar', 'its six squares')} and ${x.a('alsace', 'the Alsace market planner')}.</p>
${B.tabAutour(MLH, 30, 'en', 10, 'Christmas markets within 30 km of Mulhouse')}`,
  },
});

// ── Metz ────────────────────────────────────────────────────────────────────────────────────────────────────────
const MTZ = '57463', mtz = un(MTZ, 'Marché de Noël 2026'), magny = un(MTZ, 'Magny');
const mtz30 = B.rayon(MTZ, 30).filter((m) => m.insee !== MTZ);
const pam = MARCHES.find((m) => m.c === 'Pont-à-Mousson' && B.joursSaison(m).length > 10)!;
const metz = defineGuide({
  id: 'metz', group: 'villes', order: 7,
  outil: { ville: MTZ, rayon: 30, vedette: { ids: [mtz.id], fr: 'le marché de Noël de Metz', en: 'the Metz Christmas market' } },
  related: ['grand-est', 'strasbourg', 'nocturnes', 'apres-noel'],
  sources: ['metz', 'datagouv', 'datatourisme'],
  fr: {
    slug: 'marche-de-noel-metz',
    nav: 'Metz', card: 'Du 20 novembre au 30 décembre 2026, 22 h le vendredi et le samedi',
    title: 'Marché de Noël de Metz 2026 : dates, horaires et nocturnes',
    description: 'Marché de Noël de Metz 2026 : du 20 novembre au 30 décembre, 11 h à 21 h, 22 h le vendredi et le samedi, 16 h le 24, fermé le 25. Et les marchés de Moselle.',
    h1: 'Marché de Noël de Metz 2026 : six semaines et des soirées à 22 h',
    intro: `Le marché de Noël de Metz est ouvert du ${jl(mtz.s!, 'fr')} au ${jl(mtz.e!, 'fr')}. Choisissez un jour : le moteur de recherche donne l'heure de fermeture, qui change selon le jour, et les marchés de Moselle ouverts ce jour-là.`,
    resume: `La fiche d'Inspire Metz, l'office de tourisme, lue le 13 novembre 2026 dans DATAtourisme, donne le marché de Noël de Metz ouvert du vendredi 20 novembre au mercredi 30 décembre 2026, soit ${N(B.joursSaison(mtz).length, 'fr')} jours d'ouverture. Les chalets ouvrent à 11 h tous les jours. Ils ferment à 22 h le vendredi et le samedi, à 21 h les autres jours. Le 24 décembre, la fermeture est avancée à 16 h, et le marché ne rouvre pas le 25. Il reprend le samedi 26 décembre jusqu'à 22 h, puis de 11 h à 21 h jusqu'au 30. L'entrée est gratuite. Avec Strasbourg fermé dès le 24 au soir, Metz est l'un des grands marchés du Grand Est où l'on peut encore aller entre Noël et le jour de l'an. Deux autres fiches existent en ville : Metz Magny les 28 et 29 novembre, et le quartier Sainte-Thérèse à la mi-novembre.`,
    faqs: [
      { q: 'Le marché de Noël de Metz est-il ouvert entre Noël et le jour de l\'an ?', a: 'Oui, du samedi 26 au mercredi 30 décembre 2026 selon la fiche de l\'office de tourisme : jusqu\'à 22 h le 26, puis de 11 h à 21 h. Il est fermé le 25 décembre et ferme à 16 h le 24. Le 31 décembre, aucune ouverture n\'est indiquée.', open: true },
      { q: 'Jusqu\'à quelle heure le marché de Metz est-il ouvert le vendredi ?', a: 'Jusqu\'à 22 h, comme le samedi. Du dimanche au jeudi, la fermeture est à 21 h. Toute la saison, les chalets ouvrent à 11 h. Ces horaires sont ceux de la fiche publiée par Inspire Metz ; le moteur de recherche en haut de page les applique au jour choisi.' },
      { q: 'Quels marchés de Noël en Moselle autour de Metz ?', a: `À moins de 30 km, la base compte ${C(mtz30, 'fr')} fiches, presque toutes sur un week-end. Le plus long est celui de Pont-à-Mousson, en Meurthe-et-Moselle, à ${km(mtz, pam, 'fr')} km, ouvert ${N(B.joursSaison(pam).length, 'fr')} jours. Hagondange et Amnéville suivent, avec quelques jours chacun. Le moteur de recherche, réglé sur un rayon de 30 km, les affiche avec leurs horaires du jour choisi.` },
    ],
    body: (x) => `<h2>Marché de Noël de Metz : les horaires publiés par l'office de tourisme</h2>
<p>La fiche renvoie à la ${x.src('metz', 'page Noël d\'Inspire Metz')}. Elle découpe la saison en périodes : jusqu'au 23 décembre, des heures différentes selon le jour de la semaine ; le 24, une journée courte ; le 26, une soirée à 22 h ; du 27 au 30, retour à 21 h. Le marché de Metz Magny ne dure qu'un week-end, le ${jm(magny.s!, 'fr')} et le ${jm(magny.e!, 'fr')}. Ces deux fiches ne donnent pas la liste des places occupées par les chalets : la page de l'office la publie.</p>
${B.tabMarches(B.commune(MTZ), 'fr', 'Les marchés de Noël de Metz, d\'après les fiches d\'Inspire Metz')}
<h2>Autour de Metz : un samedi en Moselle</h2>
<p>La couronne de Metz est faite de petits marchés de commune. Le samedi ${jm('2026-11-28', 'fr')}, ${C(B.ouverts(mtz30, '2026-11-28'), 'fr')} sont ouverts à moins de 30 km ; le ${jm('2026-12-12', 'fr')}, ${C(B.ouverts(mtz30, '2026-12-12'), 'fr')}. Pour un soir de semaine, Metz reste l'une des rares options ouvertes jusqu'à 21 h : voyez ${x.a('nocturnes', 'les marchés qui ferment tard')}. Pour un séjour entre les fêtes, comparez avec ${x.a('apres-noel', 'les marchés ouverts après Noël')}. La plupart des marchés de village autour de Metz publient leurs horaires : le moteur de recherche peut dire lesquels sont encore ouverts à 18 h un samedi donné.</p>
${B.tabAutour(MTZ, 30, 'fr', 10, 'Marchés de Noël à moins de 30 km de Metz')}`,
  },
  en: {
    slug: 'metz-christmas-market',
    nav: 'Metz', card: '20 November to 30 December 2026, until 22:00 on Fridays and Saturdays',
    title: 'Metz Christmas market 2026: dates, hours and late openings',
    description: 'Metz Christmas market 2026: 20 November to 30 December, 11:00 to 21:00, until 22:00 Friday and Saturday, 16:00 on the 24th, shut on the 25th. Moselle markets.',
    h1: 'Metz Christmas market 2026: six weeks and evenings until 22:00',
    intro: `The Metz Christmas market is open from ${jl(mtz.s!, 'en')} to ${jl(mtz.e!, 'en')}. Pick a day: the finder gives the closing time, which changes with the day, and the Moselle markets open that day.`,
    resume: `The Inspire Metz tourist office listing, read in DATAtourisme on 13 November 2026, shows the Metz Christmas market open from Friday 20 November to Wednesday 30 December 2026, which makes ${N(B.joursSaison(mtz).length, 'en')} opening days. Stalls open at 11:00 every day. They close at 22:00 on Fridays and Saturdays and at 21:00 on other days. On 24 December closing moves forward to 16:00, and the market does not open on the 25th. It resumes on Saturday 26 December until 22:00, then from 11:00 to 21:00 until the 30th. Entry is free. With Strasbourg closed from the evening of the 24th, Metz is one of the large Grand Est markets you can still visit between Christmas and New Year. Two other listings exist in town: Metz Magny on 28 and 29 November, and the Sainte-Thérèse district in mid-November.`,
    faqs: [
      { q: 'Is the Metz Christmas market open between Christmas and New Year?', a: 'Yes, from Saturday 26 to Wednesday 30 December 2026 according to the tourist office listing: until 22:00 on the 26th, then from 11:00 to 21:00. It is shut on 25 December and closes at 16:00 on the 24th. No opening is shown for 31 December.', open: true },
      { q: 'How late is the Metz market open on Fridays?', a: 'Until 22:00, as on Saturdays. From Sunday to Thursday it closes at 21:00. All season, the stalls open at 11:00. These are the hours of the listing entered by Inspire Metz; the finder at the top applies them to the day you choose.' },
      { q: 'Which Moselle Christmas markets are near Metz?', a: `Within 30 km the base holds ${C(mtz30, 'en')} listings, nearly all over one weekend. The longest is at Pont-à-Mousson, in Meurthe-et-Moselle, ${km(mtz, pam, 'en')} km away, open for ${N(B.joursSaison(pam).length, 'en')} days. Hagondange and Amnéville follow, with a few days each. The finder, set to a 30 km radius, shows them with their hours for the day you choose.` },
    ],
    body: (x) => `<h2>Metz Christmas market: the hours entered by the tourist office</h2>
<p>The listing links to the ${x.src('metz', 'Inspire Metz Christmas page')}. It splits the season into periods: until 23 December, two schedules depending on the weekday; on the 24th, a short day; on the 26th, an evening until 22:00; from the 27th to the 30th, back to 21:00. The Metz Magny market lasts one weekend only, ${jm(magny.s!, 'en')} and ${jm(magny.e!, 'en')}. Neither listing names the squares used by the stalls: the tourist office page publishes them.</p>
${B.tabMarches(B.commune(MTZ), 'en', 'Metz Christmas markets, from the Inspire Metz listings')}
<h2>Around Metz: a Saturday in Moselle</h2>
<p>The ring around Metz is made of small local markets. On Saturday ${jm('2026-11-28', 'en')}, ${C(B.ouverts(mtz30, '2026-11-28'), 'en')} are open within 30 km; on ${jm('2026-12-12', 'en')}, ${C(B.ouverts(mtz30, '2026-12-12'), 'en')}. For a weekday evening, Metz is one of the few options open until 21:00: see ${x.a('nocturnes', 'markets that close late')}. For a stay between the holidays, compare with ${x.a('apres-noel', 'markets open after Christmas')}. Most village markets around Metz publish their hours, so the finder can tell you which are still open at 18:00 on a given Saturday.</p>
${B.tabAutour(MTZ, 30, 'en', 10, 'Christmas markets within 30 km of Metz')}`,
  },
});

// ── Kaysersberg (commune Kaysersberg Vignoble) ──────────────────────────────────────────────────────────────────
const KAY = '68162', kay = un(KAY, 'artisanal'), paysan = un(KAY, 'paysan');
const kay15 = B.rayon(KAY, 15).filter((m) => m.insee !== KAY);
const kaysersberg = defineGuide({
  id: 'kaysersberg', group: 'villes', order: 8,
  outil: { ville: KAY, rayon: 15, vedette: { ids: [kay.id, paysan.id], fr: 'le marché de Noël de Kaysersberg', en: 'the Kaysersberg Christmas market' } },
  related: ['colmar', 'alsace', 'strasbourg', 'week-ends'],
  sources: ['kaysersberg', 'datagouv', 'datatourisme'],
  fr: {
    slug: 'marche-de-noel-kaysersberg',
    nav: 'Kaysersberg', card: 'Quatre week-ends, du 27 novembre au 20 décembre 2026, du vendredi au dimanche',
    title: 'Marché de Noël de Kaysersberg 2026 : les week-ends, horaires',
    description: 'Marché de Noël de Kaysersberg 2026 : quatre week-ends du 27 novembre au 20 décembre, du vendredi au dimanche de 10 h à 20 h, fermé en semaine. Villages autour.',
    h1: 'Marché de Noël de Kaysersberg 2026 : quatre week-ends de l\'Avent',
    intro: `Le marché de Noël de Kaysersberg n'ouvre que le vendredi, le samedi et le dimanche, du ${jl(kay.s!, 'fr')} au ${jl(kay.e!, 'fr')}. Choisissez un jour : le moteur de recherche dit s'il est ouvert et quels marchés voisins le sont.`,
    resume: `Selon les deux fiches de l'office de tourisme de la vallée de Kaysersberg dans DATAtourisme, lues le 13 novembre 2026, le marché de Noël de Kaysersberg, commune de Kaysersberg Vignoble, se tient quatre week-ends : du vendredi 27 novembre au dimanche 20 décembre 2026, uniquement le vendredi, le samedi et le dimanche, de 10 h à 20 h. Cela fait ${N(B.joursSaison(kay).length, 'fr')} jours d'ouverture. Du lundi au jeudi, les chalets restent fermés : venir un mardi de décembre, c'est trouver la ville sans marché. Le marché paysan suit le même calendrier. L'entrée est gratuite. Après le 20 décembre, il faut se rabattre sur Colmar, à une dizaine de kilomètres, dont le marché gourmand reste ouvert jusqu'au 3 janvier, ou sur Turckheim et Eguisheim. Dans un rayon de 15 km, la base compte ${C(kay15, 'fr')} autres marchés de Noël.`,
    faqs: [
      { q: 'Le marché de Noël de Kaysersberg est-il ouvert en semaine ?', a: 'Non. Les fiches de l\'office de tourisme le donnent ouvert le vendredi, le samedi et le dimanche seulement, de 10 h à 20 h, sur quatre week-ends entre le 27 novembre et le 20 décembre 2026. Un jour de semaine, les marchés de Colmar, de Turckheim ou d\'Eguisheim restent ouverts tout près.', open: true },
      { q: 'Quel est le dernier jour du marché de Noël de Kaysersberg ?', a: `Le ${jl(kay.e!, 'fr')}, à 20 h. Le marché ne rouvre pas la semaine de Noël. Pour un marché alsacien entre le 21 et le 24 décembre, Colmar, Turckheim et Eguisheim restent ouverts tous les jours ; le moteur de recherche les liste avec leurs horaires pour le jour choisi.` },
      { q: 'Faut-il réserver pour le marché de Noël de Kaysersberg ?', a: 'Non pour le marché lui-même, dont l\'accès est libre selon les fiches. Le centre se parcourt à pied, et l\'office de tourisme de la vallée publie sur son site les conditions de stationnement et les navettes éventuelles, que nous ne reprenons pas.' },
    ],
    body: (x) => `<h2>Marché de Noël de Kaysersberg : un calendrier de week-ends</h2>
<p>Les deux fiches, le marché artisanal et le marché paysan, renvoient au ${x.src('kaysersberg', 'site de Noël de l\'office de tourisme de la vallée')}. Elles donnent un seul horaire, de 10 h à 20 h, et un seul rythme, du vendredi au dimanche. C'est ce qui distingue Kaysersberg de Colmar ou de Strasbourg, ouverts tous les jours : le choix du jour compte plus que celui de l'heure. Dans le moteur de recherche, un lundi affiche Kaysersberg fermé, et les marchés ouverts à proximité. Le ${x.a('week-ends', 'calendrier des week-ends de l\'Avent')} montre qu'autour de Kaysersberg, c'est le premier samedi, le ${jm('2026-11-28', 'fr')}, qui compte le plus de marchés ouverts.</p>
${B.tabMarches([kay, paysan], 'fr', 'Kaysersberg : les fiches de l\'office de tourisme de la vallée')}
<h2>Les villages à moins de 15 km</h2>
<p>Le samedi ${jm('2026-12-05', 'fr')}, ${C(B.ouverts(kay15, '2026-12-05'), 'fr')} marchés sont ouverts à moins de 15 km, Colmar compris. Riquewihr, Turckheim et Eguisheim sont à moins d'un quart d'heure de route. Pour bâtir une journée, voyez ${x.a('alsace', 'les marchés d\'Alsace jour par jour')}.</p>
${B.tabAutour(KAY, 15, 'fr', 12, 'Marchés de Noël à moins de 15 km de Kaysersberg')}`,
  },
  en: {
    slug: 'kaysersberg-christmas-market',
    nav: 'Kaysersberg', card: 'Four weekends, 27 November to 20 December 2026, Friday to Sunday',
    title: 'Kaysersberg Christmas market 2026: weekends and hours',
    description: 'Kaysersberg Christmas market 2026: four weekends from 27 November to 20 December, Friday to Sunday from 10:00 to 20:00, closed on weekdays. Villages nearby.',
    h1: 'Kaysersberg Christmas market 2026: four Advent weekends',
    intro: `The Kaysersberg Christmas market only opens on Friday, Saturday and Sunday, from ${jl(kay.s!, 'en')} to ${jl(kay.e!, 'en')}. Pick a day: the finder says whether it is open and which nearby markets are.`,
    resume: `According to the two listings of the Kaysersberg valley tourist office in DATAtourisme, read on 13 November 2026, the Kaysersberg Christmas market, in the town of Kaysersberg Vignoble, runs over four weekends: from Friday 27 November to Sunday 20 December 2026, on Fridays, Saturdays and Sundays only, from 10:00 to 20:00. That makes ${N(B.joursSaison(kay).length, 'en')} opening days. From Monday to Thursday the stalls stay shut: come on a Tuesday in December and you will find the town without a market. The farmers' market follows the same calendar. Entry is free. After 20 December, fall back on Colmar, about ten kilometres away, whose food market stays open until 3 January, or on Turckheim and Eguisheim. Within 15 km, the base holds ${C(kay15, 'en')} other Christmas markets.`,
    faqs: [
      { q: 'Is the Kaysersberg Christmas market open on weekdays?', a: 'No. The tourist office listings show it open on Friday, Saturday and Sunday only, from 10:00 to 20:00, over four weekends between 27 November and 20 December 2026. On a weekday, the markets of Colmar, Turckheim or Eguisheim stay open close by.', open: true },
      { q: 'What is the last day of the Kaysersberg Christmas market?', a: `${jl(kay.e!, 'en')}, at 20:00. The market does not reopen in Christmas week. For an Alsace market between 21 and 24 December, Colmar, Turckheim and Eguisheim stay open every day; the finder lists them with their hours for the day you choose.` },
      { q: 'Do I need to book for the Kaysersberg Christmas market?', a: 'Not for the market itself, which is free to enter according to the listings. The centre is best seen on foot, and the valley tourist office publishes parking conditions and any shuttle buses on its site, which we do not copy.' },
    ],
    body: (x) => `<h2>Kaysersberg Christmas market: a calendar of weekends</h2>
<p>The two listings, the craft market and the farmers' market, link to the ${x.src('kaysersberg', 'valley tourist office Christmas site')}. They give a single schedule, 10:00 to 20:00, and a single rhythm, Friday to Sunday. That is what sets Kaysersberg apart from Colmar or Strasbourg, which open every day: choosing the day matters more than choosing the time. In the finder, a Monday shows Kaysersberg closed, together with the markets open nearby. The ${x.a('week-ends', 'Advent weekend calendar')} shows that around Kaysersberg, the first Saturday, ${jm('2026-11-28', 'en')}, has the most markets open.</p>
${B.tabMarches([kay, paysan], 'en', 'Kaysersberg: the valley tourist office listings')}
<h2>The villages within 15 km</h2>
<p>On Saturday ${jm('2026-12-05', 'en')}, ${C(B.ouverts(kay15, '2026-12-05'), 'en')} markets are open within 15 km, Colmar included. Riquewihr, Turckheim and Eguisheim are less than a quarter of an hour's drive away. To plan a day, see ${x.a('alsace', 'Alsace markets day by day')}. Most of these village markets publish their hours, so the finder can show which are still open in the late afternoon.</p>
${B.tabAutour(KAY, 15, 'en', 12, 'Christmas markets within 15 km of Kaysersberg')}`,
  },
});

// ── Rouen ───────────────────────────────────────────────────────────────────────────────────────────────────────
const ROU = '76540', rou = un(ROU, 'Noël');
const rou30 = B.rayon(ROU, 30).filter((m) => m.insee !== ROU);
const rouen = defineGuide({
  id: 'rouen', group: 'villes', order: 9,
  outil: { ville: ROU, rayon: 30, vedette: { ids: [rou.id], fr: 'le marché de Noël de Rouen', en: 'the Rouen Christmas market' } },
  related: ['normandie', 'apres-noel', 'nocturnes', 'lille'],
  sources: ['datatourisme', 'datagouv'],
  fr: {
    slug: 'marche-de-noel-rouen',
    nav: 'Rouen', card: 'Du 25 novembre au 27 décembre 2026, horaires différents chaque jour',
    title: 'Marché de Noël de Rouen 2026 : dates et horaires du jour',
    description: 'Marché de Noël de Rouen 2026 : du 25 novembre au 27 décembre, 14 h à 20 h le lundi, 10 h à 21 h le samedi, ouvert le 25 selon la fiche. Horaires du jour.',
    h1: 'Marché de Noël de Rouen 2026 : l\'horaire de chaque jour',
    intro: `Le marché de Noël de Rouen ouvre le ${jl(rou.s!, 'fr')} et ferme le ${jl(rou.e!, 'fr')}. Ses horaires changent presque chaque jour : choisissez une date, le moteur de recherche donne l'heure d'ouverture et de fermeture.`,
    resume: `La fiche de Rouen Tourisme dans DATAtourisme, lue le 13 novembre 2026, donne le marché de Noël de Rouen ouvert du mercredi 25 novembre au dimanche 27 décembre 2026. Les horaires suivent un rythme par jour de la semaine : le lundi de 14 h à 20 h, du mardi au jeudi de 11 h à 20 h, le vendredi de 11 h à 21 h, le samedi de 10 h à 21 h et le dimanche de 11 h à 20 h. Le 24 décembre, il ferme à 18 h. Fait rare, la fiche le donne ouvert le 25 décembre, de 11 h à 21 h, puis le 26 de 10 h à 21 h et le 27 de 11 h à 20 h. Elle ne donne aucun horaire pour le mercredi 23 décembre : le moteur de recherche l'affiche fermé ce jour-là, à vérifier sur place. La fiche ne précise pas si l'entrée est payante. Dans un rayon de 30 km, la base ne compte que ${C(rou30, 'fr')} autres marchés, tous d'un ou deux jours.`,
    faqs: [
      { q: 'Le marché de Noël de Rouen est-il ouvert le jour de Noël ?', a: 'Selon la fiche de Rouen Tourisme lue le 13 novembre 2026, oui : de 11 h à 21 h le 25 décembre. C\'est l\'un des rares grands marchés dans ce cas. Le 24, il ferme à 18 h. Ces horaires de fête changent parfois en cours de saison : vérifiez-les la veille auprès de l\'office de tourisme.', open: true },
      { q: 'Pourquoi le marché de Rouen ouvre-t-il à 14 h le lundi ?', a: 'C\'est l\'horaire publié par l\'office de tourisme pour les lundis jusqu\'au 20 décembre : de 14 h à 20 h. Le lundi 21 décembre, la fiche avance l\'ouverture à 11 h. Le samedi est le jour le plus long, de 10 h à 21 h. Le moteur de recherche applique ces règles à la date choisie.' },
      { q: 'Y a-t-il d\'autres marchés de Noël en Seine-Maritime ?', a: `Oui, la Seine-Maritime compte ${C(B.deDeps(['76']), 'fr')} fiches dans l'export, mais peu près de Rouen et presque toutes sur un week-end. Le château de Miromesnil, près de Dieppe, ouvre plusieurs week-ends de fin novembre à mi-décembre. La page Normandie les classe par département, avec le nombre d'ouverts chaque samedi de l'Avent.` },
    ],
    body: (x) => `<h2>Marché de Noël de Rouen : ce que dit la fiche de l'office</h2>
<p>La fiche ne renvoie à aucun site : nous citons donc la ${x.src('datatourisme', 'base DATAtourisme')} où Rouen Tourisme l'a publiée. Elle découpe la saison en deux temps. Jusqu'au 20 décembre, un horaire par jour de la semaine. Du 21 au 27 décembre, un horaire par date, avec une journée courte le 24 et une ouverture annoncée le 25. Aucune place n'est nommée dans la fiche : pour l'emplacement des chalets, il faut se reporter à l'office de tourisme.</p>
${B.tabMarches([rou], 'fr', 'Rouen : la fiche DATAtourisme lue le 13 novembre 2026')}
<h2>Autour de Rouen</h2>
<p>Les ${C(rou30, 'fr')} fiches à moins de 30 km sont des marchés de village : Clères, Lyons-la-Forêt ou Bosc-le-Hard, sur un week-end. Le samedi ${jm('2026-12-12', 'fr')}, seul ${C(B.ouverts(rou30, '2026-12-12'), 'fr')} d'entre eux est ouvert. Pour la Normandie entière, voyez ${x.a('normandie', 'la page régionale')} ; Caen, Honfleur et Trouville tiennent aussi des marchés de plusieurs semaines. Pour la semaine entre Noël et le jour de l'an, Rouen figure dans ${x.a('apres-noel', 'la liste des marchés ouverts après le 25')}. ${x.a('lille', 'Lille')} est l'autre grand marché du nord ouvert jusqu'au 30 décembre.</p>
${B.tabAutour(ROU, 30, 'fr', 10, 'Marchés de Noël à moins de 30 km de Rouen')}`,
  },
  en: {
    slug: 'rouen-christmas-market',
    nav: 'Rouen', card: '25 November to 27 December 2026, different hours every day',
    title: 'Rouen Christmas market 2026: dates and hours for each day',
    description: 'Rouen Christmas market 2026: 25 November to 27 December, 14:00 to 20:00 on Mondays, 10:00 to 21:00 on Saturdays, open on the 25th per its listing. Daily hours.',
    h1: 'Rouen Christmas market 2026: the hours of each day',
    intro: `The Rouen Christmas market opens on ${jl(rou.s!, 'en')} and closes on ${jl(rou.e!, 'en')}. Its hours change almost every day: pick a date and the finder gives the opening and closing time.`,
    resume: `The Rouen Tourisme listing in DATAtourisme, read on 13 November 2026, shows the Rouen Christmas market open from Wednesday 25 November to Sunday 27 December 2026. Hours follow a weekday pattern: Monday from 14:00 to 20:00, Tuesday to Thursday from 11:00 to 20:00, Friday from 11:00 to 21:00, Saturday from 10:00 to 21:00 and Sunday from 11:00 to 20:00. On 24 December it closes at 18:00. Unusually, the listing shows it open on 25 December, from 11:00 to 21:00, then on the 26th from 10:00 to 21:00 and on the 27th from 11:00 to 20:00. It gives no hours for Wednesday 23 December, so the finder shows it closed that day, which is worth checking on site. The listing does not say whether entry is free. Within 30 km, the base holds only ${C(rou30, 'en')} other markets, all lasting one or two days.`,
    faqs: [
      { q: 'Is the Rouen Christmas market open on Christmas Day?', a: 'According to the Rouen Tourisme listing read on 13 November 2026, yes: from 11:00 to 21:00 on 25 December. It is one of the few large markets to do so. On the 24th it closes at 18:00. Holiday hours sometimes change during the season, so check them the day before with the tourist office.', open: true },
      { q: 'Why does the Rouen market open at 14:00 on Mondays?', a: 'That is the schedule the tourist office entered for Mondays until 20 December: from 14:00 to 20:00. On Monday 21 December the listing brings opening forward to 11:00. Saturday is the longest day, from 10:00 to 21:00. The finder applies these rules to the date you choose.' },
      { q: 'Are there other Christmas markets in Seine-Maritime?', a: `Yes, Seine-Maritime has ${C(B.deDeps(['76']), 'en')} listings in the export, but few near Rouen and nearly all over one weekend. Miromesnil castle, near Dieppe, opens over several weekends from late November to mid-December. The Normandy page ranks them by département, with the number open on each Advent Saturday.` },
    ],
    body: (x) => `<h2>Rouen Christmas market: what the tourist office listing says</h2>
<p>The listing links to no website, so we cite the ${x.src('datatourisme', 'DATAtourisme base')} where Rouen Tourisme entered it. It splits the season in two. Until 20 December, one schedule per weekday. From 21 to 27 December, one schedule per date, with a short day on the 24th and an opening announced on the 25th. No square is named in the listing: for where the stalls stand, refer to the tourist office.</p>
${B.tabMarches([rou], 'en', 'Rouen: the DATAtourisme listing read on 13 November 2026')}
<h2>Around Rouen</h2>
<p>The ${C(rou30, 'en')} listings within 30 km are village markets: Clères, Lyons-la-Forêt or Bosc-le-Hard, over one weekend. On Saturday ${jm('2026-12-12', 'en')}, only ${C(B.ouverts(rou30, '2026-12-12'), 'en')} of them is open. For the whole of Normandy, see ${x.a('normandie', 'the regional page')}; Caen, Honfleur and Trouville also hold markets lasting several weeks. For the week between Christmas and New Year, Rouen is on ${x.a('apres-noel', 'the list of markets open after the 25th')}. ${x.a('lille', 'Lille')} is the other large northern market open until 30 December.</p>
${B.tabAutour(ROU, 30, 'en', 10, 'Christmas markets within 30 km of Rouen')}`,
  },
});

// ── Toulouse ────────────────────────────────────────────────────────────────────────────────────────────────────
const TLS = '31555', capitole = un(TLS, 'Capitole'), allees = un(TLS, 'Allées');
const tls30 = B.rayon(TLS, 30).filter((m) => m.insee !== TLS);
const toulouse = defineGuide({
  id: 'toulouse', group: 'villes', order: 10,
  outil: { ville: TLS, rayon: 30, vedette: { ids: [capitole.id, allees.id], fr: 'les marchés de Noël de Toulouse', en: 'the Toulouse Christmas markets', pl: true } },
  related: ['occitanie', 'montpellier', 'week-ends', 'apres-noel'],
  sources: ['toulouse', 'datagouv', 'datatourisme'],
  fr: {
    slug: 'marche-de-noel-toulouse',
    nav: 'Toulouse', card: 'Capitole, Ramblas et square de Gaulle du 26 novembre au 27 décembre 2026',
    title: 'Marché de Noël de Toulouse 2026 : dates, Capitole et Ramblas',
    description: 'Marché de Noël de Toulouse 2026 : place du Capitole, Ramblas et square Charles de Gaulle du 26 novembre au 27 décembre, et les Allées enchantées jusqu\'au 23.',
    h1: 'Marché de Noël de Toulouse 2026 : les quatre sites et leurs dates',
    intro: `Le marché de Noël de Toulouse s'installe du ${jl(capitole.s!, 'fr')} au ${jl(capitole.e!, 'fr')} sur trois sites du centre. Choisissez un jour : le moteur de recherche dit lesquels sont ouverts, et les marchés de la Haute-Garonne autour.`,
    resume: `D'après les fiches du comité départemental du tourisme de la Haute-Garonne dans DATAtourisme, lues le 13 novembre 2026, le marché de Noël de Toulouse occupe trois sites du jeudi 26 novembre au dimanche 27 décembre 2026 : la place du Capitole, les Ramblas et le square Charles de Gaulle, tous les jours, soit ${N(B.joursSaison(capitole).length, 'fr')} jours. Un quatrième site, les Allées enchantées, ouvre du 28 novembre au 23 décembre. Aucune de ces fiches ne publie d'horaires ni de tarif : le moteur de recherche affiche « horaires non publiés », et le site des organisateurs reste la référence. Les fiches ne prévoient aucune fermeture le 25 décembre. Trois marchés d'un jour ou d'un week-end complètent la ville : Lalande du 20 au 22 novembre, une école occitane le 29 novembre et le théâtre du Fil à Plomb le 13 décembre. Dans un rayon de 30 km, la base ne compte que ${C(tls30, 'fr')} autres fiches.`,
    faqs: [
      { q: 'Quels sont les horaires du marché de Noël de Toulouse ?', a: 'Les fiches du comité départemental du tourisme ne les donnent pas, ni pour le Capitole, ni pour les Ramblas, ni pour le square Charles de Gaulle. Elles ne donnent que les jours, du 26 novembre au 27 décembre 2026. Consultez le site des organisateurs, cité par les fiches, avant de partir : nous n\'inventons aucune heure.', open: true },
      { q: 'Le marché de Noël du Capitole est-il ouvert le 25 décembre ?', a: 'Les fiches le donnent ouvert tous les jours du 26 novembre au 27 décembre, sans exception pour Noël, mais sans horaire. Beaucoup de marchés ferment plus tôt le 24 et le 25 : vérifiez auprès des organisateurs. Les Allées enchantées, elles, ferment le 23 décembre selon leur fiche.' },
      { q: 'Combien de marchés de Noël à Toulouse en 2026 ?', a: `La base en compte ${C(B.commune(TLS), 'fr')} dans la commune : quatre sites qui durent tout l'Avent ou presque, et trois marchés d'un jour à un week-end, dans les quartiers. Le moteur de recherche les affiche tous, avec leur distance du centre, pour le jour choisi.` },
    ],
    body: (x) => `<h2>Marché de Noël de Toulouse : les sites du centre</h2>
<p>Les fiches renvoient au ${x.src('toulouse', 'site du marché de Noël de Toulouse')}. Le Capitole, les Ramblas et le square Charles de Gaulle partagent les mêmes dates ; les Allées enchantées ouvrent deux jours plus tard et ferment quatre jours plus tôt, le ${jm(allees.e!, 'fr')}. Faute d'horaires, le tableau ne peut pas donner d'heure de fermeture, et le filtre « ouverts jusqu'à 20 h ou plus tard » du moteur de recherche ne retient pas Toulouse. C'est une limite des données, pas une information sur le marché. Si les organisateurs publient des horaires en cours de saison, ils apparaîtront ici à notre prochaine lecture de l'export, avec sa date.</p>
${B.tabMarches(B.commune(TLS), 'fr', 'Les marchés de Noël de Toulouse, d\'après les fiches du comité départemental du tourisme')}
<h2>En Haute-Garonne et en Occitanie</h2>
<p>Autour de Toulouse, les marchés de Noël publiés dans la base sont rares : ${C(tls30, 'fr')} fiches à moins de 30 km, dont Blagnac, ouvert ${N(B.joursSaison(un('31069', 'Noel')).length, 'fr')} jours. L'Occitanie compte davantage de marchés vers la Méditerranée, de Montpellier à Perpignan et au Barcarès, ouverts jusqu'en janvier : voyez ${x.a('occitanie', 'la page Occitanie')} et ${x.a('montpellier', 'Montpellier')}. La plupart des marchés de village de la Haute-Garonne ne durent qu'un samedi ou un dimanche de décembre.</p>
${B.tabAutour(TLS, 30, 'fr', 10, 'Marchés de Noël à moins de 30 km de Toulouse')}`,
  },
  en: {
    slug: 'toulouse-christmas-market',
    nav: 'Toulouse', card: 'Capitole, Ramblas and square de Gaulle, 26 November to 27 December 2026',
    title: 'Toulouse Christmas market 2026: dates, Capitole and Ramblas',
    description: 'Toulouse Christmas market 2026: place du Capitole, the Ramblas and square Charles de Gaulle from 26 November to 27 December, Allées enchantées to the 23rd.',
    h1: 'Toulouse Christmas market 2026: the four sites and their dates',
    intro: `The Toulouse Christmas market runs from ${jl(capitole.s!, 'en')} to ${jl(capitole.e!, 'en')} on three central sites. Pick a day: the finder says which are open, and the Haute-Garonne markets nearby.`,
    resume: `According to the Haute-Garonne tourism board listings in DATAtourisme, read on 13 November 2026, the Toulouse Christmas market occupies three sites from Thursday 26 November to Sunday 27 December 2026: place du Capitole, the Ramblas and square Charles de Gaulle, every day, which makes ${N(B.joursSaison(capitole).length, 'en')} days. A fourth site, the Allées enchantées, opens from 28 November to 23 December. None of these listings publishes hours or prices, so the finder shows "hours not published", and the organisers' site remains the reference. The listings show no closure on 25 December. Three markets lasting a day or a weekend complete the city: Lalande from 20 to 22 November, an Occitan-language school on 29 November and the Fil à Plomb theatre on 13 December. Within 30 km, the base holds only ${C(tls30, 'en')} other listings.`,
    faqs: [
      { q: 'What are the opening hours of the Toulouse Christmas market?', a: 'The tourism board listings do not give them, for the Capitole, the Ramblas or square Charles de Gaulle. They only give the days, from 26 November to 27 December 2026. Check the organisers\' site, cited by the listings, before you go: we do not invent any times.', open: true },
      { q: 'Is the Capitole Christmas market open on 25 December?', a: 'The listings show it open every day from 26 November to 27 December, with no exception for Christmas, but without hours. Many markets close earlier on the 24th and 25th, so check with the organisers. The Allées enchantées close on 23 December according to their listing.' },
      { q: 'How many Christmas markets are there in Toulouse in 2026?', a: `The base holds ${C(B.commune(TLS), 'en')} in the city: four sites lasting all or most of Advent, and three markets of a day to a weekend in the neighbourhoods. The finder shows them all, with their distance from the centre, for the day you choose.` },
    ],
    body: (x) => `<h2>Toulouse Christmas market: the central sites</h2>
<p>The listings link to the ${x.src('toulouse', 'Toulouse Christmas market site')}. The Capitole, the Ramblas and square Charles de Gaulle share the same dates; the Allées enchantées open two days later and close four days earlier, on ${jm(allees.e!, 'en')}. Without hours, the table cannot give a closing time, and the finder's "open until 8pm or later" filter leaves Toulouse out. That is a limit of the data, not information about the market. If the organisers publish hours during the season, they will appear here at our next reading of the export, with its date.</p>
${B.tabMarches(B.commune(TLS), 'en', 'Toulouse Christmas markets, from the Haute-Garonne tourism board listings')}
<h2>In Haute-Garonne and Occitanie</h2>
<p>Around Toulouse, Christmas markets entered in the base are rare: ${C(tls30, 'en')} listings within 30 km, including Blagnac, open for ${N(B.joursSaison(un('31069', 'Noel')).length, 'en')} days. Occitanie has more markets towards the Mediterranean, from Montpellier to Perpignan and Le Barcarès, open into January: see ${x.a('occitanie', 'the Occitanie page')} and ${x.a('montpellier', 'Montpellier')}. Most Haute-Garonne village markets last a single Saturday or Sunday in December.</p>
${B.tabAutour(TLS, 30, 'en', 10, 'Christmas markets within 30 km of Toulouse')}`,
  },
});

// ── Montpellier ─────────────────────────────────────────────────────────────────────────────────────────────────
const MPL = '34172', mpl = un(MPL, 'de Montpellier'), palavas = un('34192', 'Flots');
const mpl30 = B.rayon(MPL, 30).filter((m) => m.insee !== MPL);
const montpellier = defineGuide({
  id: 'montpellier', group: 'villes', order: 11,
  outil: { ville: MPL, rayon: 30, vedette: { ids: [mpl.id], fr: 'le marché de Noël de Montpellier', en: 'the Montpellier Christmas market' } },
  related: ['occitanie', 'toulouse', 'apres-noel', 'week-ends'],
  sources: ['montpellier', 'datagouv', 'datatourisme'],
  fr: {
    slug: 'marche-de-noel-montpellier',
    nav: 'Montpellier', card: 'Du 27 novembre au 30 décembre 2026, fermé trois lundis et le 25, et Palavas jusqu\'au 3 janvier',
    title: 'Marché de Noël de Montpellier 2026 : dates et jours fermés',
    description: 'Marché de Noël de Montpellier 2026 : du 27 novembre au 30 décembre, fermé les lundis jusqu\'au 14 décembre et le 25. Le village de Palavas jusqu\'au 3 janvier.',
    h1: 'Marché de Noël de Montpellier 2026 : les jours d\'ouverture',
    intro: `Le marché de Noël de Montpellier est ouvert du ${jl(mpl.s!, 'fr')} au ${jl(mpl.e!, 'fr')}, avec des jours de fermeture. Choisissez un jour : le moteur de recherche dit s'il est ouvert et quels marchés de l'Hérault le sont.`,
    resume: `La fiche de l'office de tourisme de Montpellier dans DATAtourisme, lue le 13 novembre 2026, ne donne pas une période continue mais une liste de dates : le marché de Noël de Montpellier ouvre du vendredi 27 novembre au mercredi 30 décembre 2026, sauf les lundis 30 novembre, 7 et 14 décembre et le vendredi 25 décembre. Il est en revanche ouvert le lundi 21 et le lundi 28 décembre. Cela fait ${N(B.joursSaison(mpl).length, 'fr')} jours d'ouverture. La fiche ne publie ni horaires ni tarif : le moteur de recherche affiche « horaires non publiés », et la Ville reste la référence. À ${km(mpl, palavas, 'fr')} km, le village de Noël des Flots enchantés, à Palavas-les-Flots, ouvre du 11 décembre au 3 janvier 2027. Trois autres fiches en ville sont des marchés associatifs d'un à trois jours. Dans un rayon de 30 km, la base compte ${C(mpl30, 'fr')} autres marchés de Noël.`,
    faqs: [
      { q: 'Le marché de Noël de Montpellier est-il ouvert le lundi ?', a: 'Pas tous : la fiche exclut les lundis 30 novembre, 7 et 14 décembre 2026, mais inclut les lundis 21 et 28 décembre. Le moteur de recherche applique ces dates une à une : choisissez votre jour pour savoir s\'il est ouvert.', open: true },
      { q: 'Jusqu\'à quand dure le marché de Noël de Montpellier ?', a: `Jusqu'au ${jl(mpl.e!, 'fr')}, selon la fiche de l'office de tourisme. Pour un marché au début de janvier, le village des Flots enchantés de Palavas-les-Flots reste ouvert jusqu'au 3 janvier 2027, et celui de Béziers aussi, d'après leurs fiches. La fiche de Montpellier ne prévoit aucune ouverture le 31 décembre.` },
      { q: 'Quels marchés de Noël dans l\'Hérault ?', a: `L'Hérault compte ${C(B.deDeps(['34']), 'fr')} fiches dans l'export, le plus grand nombre de l'Occitanie. Les plus longues sont Béziers, Montpellier et Palavas-les-Flots ; les autres sont surtout des marchés de village sur un week-end de décembre. Le moteur de recherche les classe par distance depuis la ville choisie.` },
    ],
    body: (x) => `<h2>Marché de Noël de Montpellier : une liste de dates</h2>
<p>La fiche renvoie au ${x.src('montpellier', 'site de la Ville de Montpellier')}. Plutôt qu'une période, elle aligne trente dates, ce qui permet de voir les jours de fermeture : trois lundis et le jour de Noël. Elle ne nomme pas le lieu du marché et ne donne pas d'heure. Les trois autres fiches de la ville, Tropisme, les ressourceries et les dix ans d'une compagnie, sont des ventes associatives courtes, publiées elles aussi par l'office de tourisme. Comme pour Toulouse, l'absence d'horaires n'empêche pas le moteur de recherche de dire si le marché est ouvert un jour donné : il le dit, sans heure, et renvoie à la Ville pour l'heure exacte.</p>
${B.tabMarches(B.commune(MPL), 'fr', 'Les marchés de Noël de Montpellier, d\'après les fiches de l\'office de tourisme')}
<h2>Entre Montpellier et la mer</h2>
<p>Le samedi ${jm('2026-12-12', 'fr')}, ${C(B.ouverts(mpl30, '2026-12-12'), 'fr')} marchés sont ouverts à moins de 30 km, dont Palavas-les-Flots, Juvignac et Le Crès. Après Noël, le littoral prend le relais des villes : voyez ${x.a('apres-noel', 'les marchés ouverts entre Noël et le jour de l\'an')}, et ${x.a('occitanie', 'toute l\'Occitanie')} département par département. Le Barcarès et Collioure, plus au sud, restent ouverts jusqu'en janvier selon leurs fiches.</p>
${B.tabAutour(MPL, 30, 'fr', 10, 'Marchés de Noël à moins de 30 km de Montpellier')}`,
  },
  en: {
    slug: 'montpellier-christmas-market',
    nav: 'Montpellier', card: '27 November to 30 December 2026, closed three Mondays and the 25th, and Palavas until 3 January',
    title: 'Montpellier Christmas market 2026: dates and closed days',
    description: 'Montpellier Christmas market 2026: 27 November to 30 December, closed on Mondays until 14 December and on the 25th. Palavas Christmas village until 3 January.',
    h1: 'Montpellier Christmas market 2026: the opening days',
    intro: `The Montpellier Christmas market is open from ${jl(mpl.s!, 'en')} to ${jl(mpl.e!, 'en')}, with some closed days. Pick a day: the finder says whether it is open and which Hérault markets are.`,
    resume: `The Montpellier tourist office listing in DATAtourisme, read on 13 November 2026, does not give a continuous period but a list of dates: the Montpellier Christmas market opens from Friday 27 November to Wednesday 30 December 2026, except on Mondays 30 November, 7 and 14 December and on Friday 25 December. It is, however, open on Monday 21 and Monday 28 December. That makes ${N(B.joursSaison(mpl).length, 'en')} opening days. The listing publishes neither hours nor prices, so the finder shows "hours not published", and the City remains the reference. ${km(mpl, palavas, 'en')} km away, the Flots enchantés Christmas village at Palavas-les-Flots opens from 11 December to 3 January 2027. Three other listings in town are charity markets lasting one to three days. Within 30 km, the base holds ${C(mpl30, 'en')} other Christmas markets.`,
    faqs: [
      { q: 'Is the Montpellier Christmas market open on Mondays?', a: 'Not all of them: the listing leaves out Mondays 30 November, 7 and 14 December 2026, but includes Mondays 21 and 28 December. The finder applies these dates one by one, so pick your day to know whether it is open.', open: true },
      { q: 'Until when does the Montpellier Christmas market run?', a: `Until ${jl(mpl.e!, 'en')}, according to the tourist office listing. For a market in early January, the Flots enchantés village at Palavas-les-Flots stays open until 3 January 2027, and so does Béziers, according to their listings. The Montpellier listing shows no opening on 31 December.` },
      { q: 'Which Christmas markets are there in the Hérault?', a: `The Hérault has ${C(B.deDeps(['34']), 'en')} listings in the export, the most in Occitanie. The longest are Béziers, Montpellier and Palavas-les-Flots; the others are mostly village markets over one December weekend. The finder ranks them by distance from the town you choose.` },
    ],
    body: (x) => `<h2>Montpellier Christmas market: a list of dates</h2>
<p>The listing links to the ${x.src('montpellier', 'City of Montpellier site')}. Rather than one period, it lists thirty dates, which shows the closed days: three Mondays and Christmas Day. It does not name the market's location and gives no time. The three other listings in town, Tropisme, the recycling centres and a company's tenth anniversary, are short charity sales, also entered by the tourist office. As with Toulouse, missing hours do not stop the finder from saying whether the market is open on a given day: it says so, without a time, and points to the City for the exact hours.</p>
${B.tabMarches(B.commune(MPL), 'en', 'Montpellier Christmas markets, from the tourist office listings')}
<h2>Between Montpellier and the sea</h2>
<p>On Saturday ${jm('2026-12-12', 'en')}, ${C(B.ouverts(mpl30, '2026-12-12'), 'en')} markets are open within 30 km, including Palavas-les-Flots, Juvignac and Le Crès. After Christmas, the coast takes over from the towns: see ${x.a('apres-noel', 'markets open between Christmas and New Year')}, and ${x.a('occitanie', 'all of Occitanie')} département by département. Le Barcarès and Collioure, further south, stay open into January according to their listings.</p>
${B.tabAutour(MPL, 30, 'en', 10, 'Christmas markets within 30 km of Montpellier')}`,
  },
});

export default [mulhouse, metz, kaysersberg, rouen, toulouse, montpellier] as GuideDef[];
