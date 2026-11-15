# Test naïf du 2026-11-14 (tour2), testeur 1 : quelmarchedenoel.fr
**Persona :** Français(e) de 45 ans, salarié(e), à l'aise avec son téléphone, aucune connaissance particulière du sujet, ne lit pas les longs paragraphes. Il/elle a tapé sa question dans Google et a cliqué sur le résultat « Marchés de Noël 2026 : ouverts aujourd'hui près de chez vous » parce qu'il/elle a vraiment cette question.

## 1. Concept

**Après 5 s (01-accueil-1) :** « C'est un site qui me dit quels marchés de Noël sont ouverts près de chez moi, le jour que je veux. » Le titre « Marchés de Noël 2026 : lesquels sont ouverts près de chez vous » colle exactement au résultat Google, et le bouton « Autour de moi (ou choisissez une ville ci-dessous) » est la première chose cliquable. Concept clair.

**Après 2 min :** « C'est un moteur qui croise une grosse liste officielle (2 482 marchés) avec un jour et une distance, et me donne horaires + itinéraire. Il y a aussi des pages par grande ville (Strasbourg, Colmar, Lille…) et par période (week-ends de l'Avent, ouverts le soir, après Noël). Ce n'est pas l'office de tourisme. » Je comprends aussi, plus tard et un peu par hasard, que **Paris et l'Île-de-France ne sont presque pas couverts** et que pour certaines villes (Amiens, Montpellier) **les horaires ne sont pas connus**.

**Pour qui :** quelqu'un qui veut sortir un soir ou un week-end de décembre et qui hésite entre plusieurs marchés ; idéal pour l'Alsace et le Grand Est. Beaucoup moins pour un Francilien.

**Bénéfice concret :** en un écran (01-accueil-suite1), « 4 marchés » à moins de 30 km, le plus proche, l'horaire du jour, et un lien « Itinéraire ». C'est exactement ce que je cherchais.

## 2. « Tout le monde peut-il comprendre ? »

**Verdict : oui pour l'outil du haut, non pour une partie du texte.** Le formulaire (Point de départ / Jour de la visite / Distance maximale / Quels marchés montrer) et la fiche résultat se comprennent sans effort.

Ça décroche :
- sur les petits compteurs du résultat : « Ouverts jusqu'à 20 h ou plus 3 », « Avec horaires publiés 4 » (01-accueil-suite1, 08-metz-suite1-2) : je ne sais pas à quoi ça me sert ;
- sur « Fermé pour aujourd'hui » en rouge à côté de « 10 h à 18 h » : fermé toute la journée, ou déjà fini ? ;
- dans les paragraphes des pages villes, saturés de vocabulaire de source : « fiche », « DATAtourisme », « export daté du 12 novembre 2026, lu le 13 novembre 2026 », « base nationale », « Licence Ouverte ». Je décroche dès la deuxième phrase ;
- sur les pages villes avant l'ouverture : un gros « Pas encore ouvert » et rien d'autre (sauf Metz). Je ne sais pas s'il n'y a vraiment rien autour ou si l'outil n'a pas cherché.

## 3. Parcours écran par écran

| Écran | Compris | Coince |
|---|---|---|
| 01-accueil-1 | Titre = ma question. « Autour de moi » bien visible. Mention « SITE INDÉPENDANT : NI OFFICE DE TOURISME, NI ORGANISATEUR » rassurante. | Le point de départ est déjà sur « Strasbourg » : « pourquoi Strasbourg ? je n'habite pas là ». Je comprends vite qu'il faut changer, mais la première impression est « ce n'est pas pour moi ». |
| 01-accueil-suite1 | « 4 marchés », gros chiffre, puis « Le plus proche : Marché de Noël des artisans créateurs (Mutzig), à 23 km ». | Juste en dessous : « Maintenant : fermé pour aujourd'hui ». Le site me met en avant **un marché fermé**, alors que deux autres sont ouverts en ce moment. Compteurs « Ouverts jusqu'à 20 h ou plus 3 / Avec horaires publiés 4 » incompris. |
| 01-accueil-suite2 | La liste : commune, distance, horaires, lien « Itinéraire ». Très lisible. « Ouvert jusqu'à 21 h » en rouge = parfait. | « Fermé pour aujourd'hui » en rouge sous « 14 h à 20 h » (Bœrsch) : ambigu. Pourquoi un nom est souligné (Bœrsch) et pas les autres ? La petite note l'explique mais je ne la lis pas. |
| 01-accueil-suite3 | Fin de liste, puis l'avertissement « Paris, l'Île-de-France et la Corse sont presque absents… la liste est très incomplète ». Honnête. | Cet avertissement arrive **après** les résultats, en petit gris. Un Parisien aura déjà conclu « rien près de chez moi ». Gros paragraphe de chiffres (409, 460, 212) que je ne lis pas. |
| 01-accueil-suite4/5 | « Les questions que l'on se pose avant de partir » : très bonnes cartes (Strasbourg, Colmar après Noël, soir après le travail). Réponse dans la carte même. | Rien. |
| 01-accueil-suite5/6 | « Toutes les pages » : villes avec une phrase utile chacune. | Liste longue ; pas de Paris, Lyon, Bordeaux, Marseille, Nantes. « Mulhouse… ouverts le 26 » : le 26 de quoi ? (décembre, je suppose). |
| 01-accueil-suite7/8 | Régions et « Par moment de la saison ». | « 151 marchés publiés, surtout dans l'Allier… » pour Auvergne-Rhône-Alpes : je m'attendais à Lyon. |
| 01-accueil-suite9 | Tableau « en chiffres ». | Pour moi, sans intérêt pratique. |
| 01-accueil-suite10-12 | « Les marchés de Noël par région » avec un avertissement clair : « un petit nombre veut dire « peu de marchés publiés », pas « peu de marchés » ». | Très long. « Île-de-France : Marchés 1 », « Corse : 0 » : décevant pour une bonne partie des Français. Hauts-de-France 37 seulement alors que le site a des pages Lille et Amiens. |
| 02-menu-1 / suite1 | Menu clair : par ville, par région (replié), par moment, « Chercher un marché », « Méthode et données ». | Rien de bloquant. |
| 03-fr-a-propos-1 à 3 | Qui publie (Radif Partners, adresse, e-mail), pas un office de tourisme, ne vend rien. Rassurant. | « Les offices de tourisme publient pourtant presque tous leurs marchés dans une base publique » **contredit** l'accueil (« ne publient pas tous leurs marchés… L'Île-de-France, la Corse… y sont presque absentes »). Je ne sais plus qui croire. |
| 04-amiens-1 / suite1 | Formulaire déjà sur Amiens, « Pas encore ouvert », « ouvre le vendredi 20 novembre 2026, dans 6 jours », bouton « Voir le vendredi 20 novembre ». Clair. | L'intro promet « liste les autres marchés de la Somme ouverts ce jour-là », mais aucune liste ni phrase « aucun autre marché ouvert à moins de 30 km ». |
| 04-amiens-suite2-6 | Dates, 41 jours, entrée gratuite. | **« Horaires (exemple d'un samedi) : non publiés »** : la question n° 1 du résultat Google (« à quelle heure ils ferment ») n'a pas de réponse ici. L'intitulé « exemple d'un samedi » suivi de « non publiés » fait bizarre. |
| 05-colmar-1 / suite1 | « Pas encore ouverts… ouvrent le lundi 23 novembre 2026, dans 9 jours ». | La distance est passée à « 20 km » sans que je l'aie choisie (30 km ailleurs). Toujours pas de liste d'autres marchés. |
| 05-colmar-suite2-4 | Les 6 places avec dates et horaires. Le paragraphe d'intro donne enfin les horaires de semaine/week-end : très utile. | Six blocs presque identiques, longs à faire défiler. |
| 05-colmar-suite5/6 | FAQ « ouvert après Noël ? » : réponse nette. | Rien. |
| 06-kaysersberg-1 à 6 | Message très clair : « n'ouvre que le vendredi, le samedi et le dimanche ». « venir un mardi de décembre, c'est trouver la ville sans marché » : excellent. | Distance par défaut « 15 km », encore différente. Le texte dit qu'un lundi « affiche Kaysersberg fermé, et les marchés ouverts à proximité », mais aujourd'hui la carte n'affiche aucun marché voisin. |
| 07-lille-1 à 6 | « Pas encore ouvert… dans 4 jours ». Horaires de la Ville bien expliqués (11 h–20 h 30, 22 h vendredi et samedi). Infos pratiques (gobelets, illuminations à 17 h). | Rien de bloquant. |
| 08-metz-1 à 6 | **Le meilleur cas** : « Pas encore ouvert » + « Ce jour-là, 2 autres marchés ouverts à moins de 30 km : voir la liste ci-dessous » + la liste. Exactement ce qu'il faudrait partout. | « Sainte-Thérèse… 9 h à 19 h, Fermé pour aujourd'hui » : même ambiguïté. Compteurs « Ouverts jusqu'à 20 h ou plus 1 / Avec horaires publiés 2 ». |
| 09-montpellier-1 à 6 | Jours de fermeture bien expliqués (trois lundis et le 25). | Horaires « non publiés » partout. « Comme pour Toulouse, l'absence d'horaires… » : je n'ai pas vu Toulouse, la phrase ne me parle pas. Tropisme, ressourceries : je ne sais pas ce que c'est. |

## 4. Chaque fonction

| Fonction | Trouvée ? | Comprise ? | Utile ? | Évidence /5 |
|---|---|---|---|---|
| Bouton « Autour de moi » | Oui, tout en haut | Oui | Très | 5 |
| Point de départ (liste de villes) | Oui | Oui, mais pré-réglé sur Strasbourg | Oui | 4 |
| Jour de la visite | Oui | Oui, « (aujourd'hui) » très clair | Très | 5 |
| Distance maximale « à vol d'oiseau » | Oui | Oui | Oui | 4 (valeur par défaut qui change selon la page) |
| « Quels marchés montrer » | Oui | À moitié : je ne vois pas les autres choix sur la capture | Moyen | 3 |
| Fiche résultat (nombre, le plus proche, horaires) | Oui | Oui, sauf compteurs secondaires | Très | 4 |
| Liste détaillée + « Itinéraire » | Oui | Oui | Très | 5 |
| « Copier le lien », « Imprimer », « D'où viennent les dates » | Oui | Oui | Moyen | 4 |
| Bouton « Voir le vendredi 20 novembre » (pages villes) | Oui | Oui | Très | 5 |
| « Lire tout le paragraphe » | Oui | Oui | Oui, permet de ne pas lire | 4 |
| Encadrés repliés « Dans la Somme, autour d'Amiens… Afficher » | Oui | Oui | Je ne sais pas ce qu'il y a dedans | 3 |
| FAQ dépliables | Oui | Oui, « Touchez une question pour voir la réponse » | Oui | 5 |
| Cartes « Les questions que l'on se pose avant de partir » | Oui | Oui | Très | 5 |
| Bouton EN | Oui | Oui | Pas pour moi | 5 |

## 5. Enchaînement et navigation

- Accueil → résultat : immédiat, le résultat est visible au deuxième écran sans rien toucher.
- Fil d'Ariane « Accueil / Marchés de Noël par ville / Amiens » présent partout : je sais où je suis.
- Lien de retour « Partout en France, autour de chez vous ou de votre position : le moteur de recherche de l'accueil → » sur chaque page ville : bien.
- « Pour continuer » en bas de chaque page ville propose des pages proches (Lille ↔ Amiens, Colmar ↔ Kaysersberg) : logique.
- Incohérences d'un écran à l'autre : distance par défaut 30 / 20 / 15 km sans explication ; Metz liste les marchés voisins ouverts, Amiens, Colmar, Kaysersberg, Lille et Montpellier non ; l'À propos dit « presque tous publiés », l'accueil dit le contraire.
- Les pages sont longues : après la FAQ, je ne vais pas plus loin.

## 6. Difficultés classées

1. **01-accueil-suite1 / 08-metz-suite2 : le « plus proche » mis en avant est fermé.** Vécu : « Maintenant : fermé pour aujourd'hui », alors que deux marchés de la liste sont ouverts en ce moment. Je crois d'abord qu'il n'y a rien à faire ce soir. Recommandation : quand le jour choisi est aujourd'hui et que le plus proche est déjà fermé, mettre en avant le plus proche **encore ouvert** : « Ouvert maintenant, le plus proche : Marché de Noël (Wintershouse), à 25 km, jusqu'à 21 h ». Garder le plus proche fermé en deuxième ligne.
2. **« Fermé pour aujourd'hui » est ambigu (01-accueil-suite2, 08-metz-suite2).** Vécu : fermé toute la journée ? ou fini ? Remplacer par « Terminé pour aujourd'hui (fermé à 18 h) ».
3. **Pages villes avant l'ouverture : pas de liste des marchés voisins, sans explication (04-amiens-suite1, 05-colmar-suite1, 06-kaysersberg-suite1, 07-lille-suite1, 09-montpellier-suite1).** Vécu : l'intro promet « liste les autres marchés de la Somme ouverts ce jour-là », la carte ne montre rien. Recommandation : toujours afficher une ligne comme sur Metz, y compris quand le nombre vaut zéro : « Ce jour-là, aucun autre marché ouvert à moins de 30 km. Essayez 50 km ou le vendredi 20 novembre. »
4. **Couverture Paris/Île-de-France signalée trop tard (01-accueil-suite3).** Vécu : un Francilien voit des résultats vides, puis lit la phrase en gris. Recommandation : afficher l'avertissement **dans** la carte résultat quand le point de départ est en Île-de-France ou en Corse, et le dire dès le chapeau : « Couverture complète en Alsace, Lorraine et dans la plupart des régions ; Paris et la Corse sont presque absents des données officielles. »
5. **Contradiction À propos / accueil (03-fr-a-propos-suite1).** « Les offices de tourisme publient pourtant presque tous leurs marchés dans une base publique » contre « les offices de tourisme ne publient pas tous leurs marchés dans la base nationale ». Remplacer par : « Les offices de tourisme publient une grande partie de leurs marchés dans une base publique (mais très peu en Île-de-France et en Corse). »
6. **Compteurs incompris dans la carte résultat (01-accueil-suite1, 08-metz-suite1).** « Ouverts jusqu'à 20 h ou plus 3 », « Avec horaires publiés 4 ». Remplacer par une phrase : « 3 restent ouverts jusqu'à 20 h ou plus ; tous ont des horaires connus. » ou supprimer « Avec horaires publiés ».
7. **Horaires « non publiés » (04-amiens-suite3, 09-montpellier-suite3).** Vécu : la promesse Google « à quelle heure ils ferment » n'est pas tenue pour Amiens et Montpellier. Recommandation : remplacer l'intitulé « Horaires (exemple d'un samedi) : non publiés » par « Horaires : non communiqués par l'office de tourisme, voir le site du marché » avec le lien directement dans la ligne.
8. **Vocabulaire de source et distance par défaut variable.** « export daté du 12 novembre 2026, lu le 13 novembre 2026 », « fiche », « Comme pour Toulouse » (09-montpellier-suite2) : à réserver à la page Méthode. Sur chaque page ville, une phrase simple suffit : « Dates et horaires de l'office de tourisme, vérifiés le 13 novembre 2026. » Et garder la même distance par défaut partout (30 km), ou l'annoncer : « 15 km : les villages autour de Kaysersberg ».

## 7. À garder

- Le titre de l'accueil, identique à la question Google.
- Le bouton « Autour de moi » en premier, et la phrase « Nous ne demandons ni nom ni courriel ; si vous utilisez votre position, elle […] n'est envoyée nulle part ».
- Le gros chiffre « 4 marchés » et la liste commune / distance / horaires / « Itinéraire ».
- « Ouvert jusqu'à 21 h » en rouge sous l'horaire.
- « Pas encore ouvert » + « dans 6 jours » + bouton « Voir le vendredi 20 novembre ».
- La version Metz : « Ce jour-là, 2 autres marchés ouverts à moins de 30 km : voir la liste ci-dessous. »
- Les cartes « Les questions que l'on se pose avant de partir » avec la réponse dans la carte.
- Kaysersberg : « venir un mardi de décembre, c'est trouver la ville sans marché ».
- « Lire tout le paragraphe » et les FAQ dépliables : je peux ne pas lire.
- La transparence : « SITE INDÉPENDANT », l'À propos avec adresse et e-mail.

## 8. Notes

Clarté : 8/10
Facilité : 8/10
Utilité : 7/10
