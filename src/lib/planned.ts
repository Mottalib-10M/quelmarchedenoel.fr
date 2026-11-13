/** Toutes les pages prévues (id = entrée d'un fichier de src/content/guides).
 *  Les tests acceptent un lien vers ces ids pendant la rédaction ; « chaque page prévue a son fichier » échoue tant qu'il en manque. */
export const PLANNED_GUIDES = [
  'strasbourg', 'colmar', 'lille', 'reims', 'amiens', 'mulhouse', 'metz', 'kaysersberg', 'rouen', 'toulouse', 'montpellier',
  'grand-est', 'nouvelle-aquitaine', 'occitanie', 'pays-de-la-loire', 'normandie', 'centre-val-de-loire', 'auvergne-rhone-alpes', 'bourgogne-franche-comte', 'bretagne',
  'alsace', 'week-ends', 'nocturnes', 'apres-noel',
];
export const PLANNED_IDS = new Set<string>([...PLANNED_GUIDES, 'home', 'method', 'about', 'widget', 'contact', 'editorial', 'privacy', 'terms', 'cookies']);
