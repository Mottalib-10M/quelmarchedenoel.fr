import type { Locale } from './routes';
import type { LibellesTrame } from '../lib/libelles-trame';
const fr = {
  updatedOn: 'Mis à jour le', editorialPolicy: 'Politique éditoriale', contactLabel: 'Contact', reviewedBy: 'Préparé par',
  skipToContent: 'Aller au contenu', mainNav: 'Navigation principale', breadcrumbLabel: 'Fil d\'Ariane', breadcrumbHome: 'Accueil', menuOpen: 'Ouvrir le menu',
  faqTitle: 'Questions fréquentes', relatedCalculators: 'Pour continuer', sourcesTitle: 'Données et pages sur lesquelles repose cette page', writtenBy: 'Préparé par',
  asOf: 'Situation', lastUpdated: 'données lues le', footerValidated: 'Fiches lues dans l\'export DATAtourisme du 12 novembre 2026 et sur les pages officielles de Strasbourg et de Lille',
  footerBrowser: 'Le moteur de recherche fonctionne dans votre navigateur · votre position éventuelle n\'est pas envoyée · sans inscription',
  footerDisclaimer: 'Quel Marché de Noël est un site indépendant publié par Radif Partners : ce n\'est ni un office de tourisme, ni un organisateur de marché, ni une administration. Les dates et horaires viennent des fiches publiées par les offices de tourisme dans DATAtourisme (Licence Ouverte 2.0, ADN Tourisme) et, pour Strasbourg et Lille, des pages officielles des villes ; un organisateur peut les changer : vérifiez sur sa page avant de partir. Ce site ne remplace pas l\'information de l\'organisateur.',
  footerReuse: '',
  footerPopular: 'Les plus cherchés',
  notFound: 'Aucune page à cette adresse. L\'accueil cherche les marchés de Noël ouverts le jour de votre choix autour de chez vous.',
  readMore: 'Lire la suite',
  trama: {} as Partial<LibellesTrame>,
  privacyLine: 'Nous ne demandons ni nom ni courriel ; si vous utilisez votre position, elle sert au calcul dans votre navigateur et n\'est envoyée nulle part.',
  copyLink: 'Copier le lien', copied: 'Lien copié', print: 'Imprimer', howComputed: 'D\'où viennent les dates', openFull: 'Ouvrir le moteur de recherche complet',
  independent: 'Site indépendant : ni office de tourisme, ni organisateur',
};
const en: typeof fr = {
  updatedOn: 'Updated on', editorialPolicy: 'Editorial policy', contactLabel: 'Contact', reviewedBy: 'Prepared by',
  skipToContent: 'Skip to content', mainNav: 'Main navigation', breadcrumbLabel: 'Breadcrumb', breadcrumbHome: 'Home', menuOpen: 'Open menu',
  faqTitle: 'Common questions', relatedCalculators: 'Next steps', sourcesTitle: 'Data and pages this page is based on', writtenBy: 'Prepared by',
  asOf: 'As of', lastUpdated: 'data read on', footerValidated: 'Listings read in the DATAtourisme export of 12 November 2026 and on the official pages of Strasbourg and Lille',
  footerBrowser: 'The finder runs in your browser · your location, if you use it, is not sent · no sign-up',
  footerDisclaimer: 'Quel Marché de Noël is an independent site published by Radif Partners: it is not a tourist office, a market organiser or a public body. Dates and hours come from the listings French tourist offices enter in DATAtourisme (Licence Ouverte 2.0, ADN Tourisme) and, for Strasbourg and Lille, from the official city pages; an organiser can change them, so check its page before you set off. This site does not replace the organiser\'s own information.',
  footerReuse: '',
  footerPopular: 'Most searched',
  notFound: 'Nothing lives at this address. The home page finds the Christmas markets open on the day you choose around where you are.',
  readMore: 'Read more',
  trama: {} as Partial<LibellesTrame>,
  privacyLine: 'We ask for no name or email; if you use your location, it is used for the calculation in your browser and sent nowhere.',
  copyLink: 'Copy share link', copied: 'Link copied', print: 'Print', howComputed: 'Where the dates come from', openFull: 'Open the full finder',
  independent: 'Independent site: not a tourist office or an organiser',
};
const ALL = { fr, en };
export function t(lang: Locale) { return ALL[lang] ?? fr; }
