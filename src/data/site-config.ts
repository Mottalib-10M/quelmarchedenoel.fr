/** Configuration centrale du site (générée par new-site.py). */
export const SITE_URL = "https://quelmarchedenoel.fr";
export const SITE_NAMES: Record<string, string> = {"fr": "Quel Marché de Noël", "en": "Quel Marché de Noël"};
// Partie du nom affichée en couleur dans l'en-tête (RECETTE §10.3), « » pour aucune.
export const BRAND_ACCENT = "Noël";
export const LANG_TAGS: Record<string, string> = {"fr": "fr-FR", "en": "en-FR"};
export const OG_LOCALES: Record<string, string> = {"fr": "fr_FR", "en": "en_GB"};
/** Locale des nombres par langue de page (RECETTE §4) : virgule en français, point en anglais. */
export const NUM_TAGS: Record<string, string> = {"fr": "fr-FR", "en": "en-GB"};
export const LOCALE_TAG = 'fr-FR';
export const CURRENCY = 'EUR';
export const YEAR = 2026;
/** Année de création du site — signal d'ancienneté (RECETTE §8.0). */
export const SITE_FOUNDED = '2026';
export const LAST_UPDATED = '2026-11-13';
export const AUTHOR_NAME = 'Radif Partners';
export const AUTHOR_ROLE: Record<string, string> = {"fr": "Éditeur indépendant d'un calendrier des marchés de Noël en France, établi sur les données ouvertes DATAtourisme et les pages officielles des villes", "en": "Independent publisher of a French Christmas market calendar built on DATAtourisme open data and the official pages of each city"};
export const AUTHOR_DESC: Record<string, string> = {"fr": "Radif Partners télécharge l'export public de DATAtourisme, la base nationale où les offices de tourisme saisissent leurs événements, garde les marchés et villages de Noël, puis calcule pour chacun s'il est ouvert un jour donné, à quelle heure il ferme et à quelle distance il se trouve. Pour les grandes villes absentes de cette base, nous relisons la page officielle de la ville et la datons. Nous ne sommes ni un office de tourisme ni un organisateur ; nous ne vendons rien et ne demandons aucune coordonnée.", "en": "Radif Partners downloads the public DATAtourisme export, the national database where French tourist offices enter their events, keeps the Christmas markets and villages, then works out for each one whether it is open on a given day, when it closes and how far away it is. For large cities missing from that base we read the city's official page and date it. We are not a tourist office or an organiser; we sell nothing and ask for no contact details."};
/** Sujets sur lesquels l'editeur est competent (schema.org knowsAbout). Ce sont les
 *  themes reellement traites par le site, pas une liste de mots-cles : un sujet
 *  declare ici sans page qui le couvre est une declaration fausse. */
export const KNOWS_ABOUT: Record<string, string[]> = {"fr": ["Marchés de Noël en France", "Marchés de Noël d'Alsace", "Horaires d'ouverture des marchés de Noël", "Données ouvertes DATAtourisme", "Calendrier de l'Avent et nocturnes de décembre"], "en": ["Christmas markets in France", "Alsace Christmas markets", "Christmas market opening hours", "DATAtourisme open data", "Advent weekends and late openings in December"]};
export const CONTACT_EMAIL = "contact@quelmarchedenoel.fr";
export const THEME_COLOR = '#9B1C2C';
export const LOGO_SYMBOL = '★';
export const BING_VERIFY_CODE = '';
export const GOOGLE_VERIFY_CODE = '';
/** Régime : 'none' pour tous les sites (RECETTE §15.6, décision de l'éditeur du 2026-10-06) :
 *  aucun bandeau ; Clarity chargé en mode sans cookie (consentv2 denied) ; GA4 avec cookies si GA4_ID.
 *  'opt-in' / 'notice' ne servent plus qu'aux sites anciens qui les portent encore. */
export const CONSENT_MODE: 'opt-in' | 'notice' | 'none' = 'none';
/** Propriété Google Analytics 4 (décision de l'éditeur du 2026-10-17, RECETTE §15.6) : GA4 normal,
 *  avec cookies _ga / _ga_<ID> (390 jours), sans bandeau, publicité refusée. Créée par
 *  `seo-platform/scripts/create-ga4.ts accounts/372759688` (RECETTE §15.3, étape 15), puis
 *  pages légales régénérées : `python3 scripts/gen-legal-pages.py .`. Vide = pas de GA4. */
export const GA4_ID = '';
/** Projet Microsoft Clarity (compte amradif), chargé sans cookie. Vide = aucune mesure. */
export const CLARITY_ID = '';
export const INDEXNOW_KEY = '33e380c13934b83e6cc9778d5249498a';

/* ------------------------------------------------------------------------- *
 * IDENTITÉ LÉGALE — À COMPLÉTER AVANT LA MISE EN LIGNE
 * Ces champs alimentent la mention légale du pays, la politique de confidentialité,
 * la page contact et le schema Organization. Un champ vide s'affiche en jaune
 * sur le site. Contrôle : `npm run check:legal`.
 * ------------------------------------------------------------------------- */
export interface LegalHosting { name: string; address: string; phone: string; url: string }
export interface LegalIdentity {
  entityName: string; legalForm: string; street: string; postalCode: string; city: string;
  country: string; phone: string; registerLabel: string; registerNumber: string;
  vatLabel: string; vatNumber: string; jurisdiction: string;
  supervisoryAuthority: string; supervisoryAuthorityUrl: string; hosting: LegalHosting;
}
export const LEGAL: LegalIdentity = {
  entityName: 'Radif Partners',  // éditeur de tous les sites du portefeuille (RECETTE §8)
  legalForm: '',  // vide : comme les autres sites du portefeuille
  street: '49 rue du Ressort',
  postalCode: '63000',
  city: 'Clermont-Ferrand',
  country: "France",
  phone: '',                 // ligne de contact publiée
  registerLabel: "SIREN",
  registerNumber: '',
  vatLabel: "TVA",
  vatNumber: '',             // laisser vide si non assujetti
  jurisdiction: "France",
  supervisoryAuthority: "Commission nationale de l'informatique et des libertés (CNIL)",
  supervisoryAuthorityUrl: "https://www.cnil.fr",
  hosting: { name: 'GitHub, Inc. (GitHub Pages)', address: '88 Colin P Kelly Jr Street, San Francisco, CA 94107, United States', phone: '', url: 'https://pages.github.com' },
};

/** Champs sans lesquels le site ne doit pas être mis en ligne. */
export const LEGAL_REQUIRED: Array<keyof LegalIdentity> = ['entityName', 'street', 'postalCode', 'city']; // legalForm vide à dessein, comme les autres sites du portefeuille

/** Profils publics de l'auteur (schema.org sameAs). Laisser vide si aucun. */
export const AUTHOR_SAME_AS: string[] = [];

/** Rythme de revue éditoriale annoncé sur le site, en mois. */
export const REVIEW_CYCLE_MONTHS = 12;
