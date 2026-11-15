# Test naïf du 2026-11-14 (tour2), testeur 2 : quelmarchedenoel.fr
**Persona :** Français(e) de 24 ans, très à l'aise avec les apps, impatient(e) : s'il/si elle ne comprend pas en quelques secondes ce que la page lui apporte, il/elle ferme et retourne sur Google. Il/elle a cliqué sur le résultat « Marchés de Noël 2026 : ouverts aujourd'hui près de chez vous » parce qu'il/elle a cette question. Découverte sur téléphone.

## 1. Concept

**Après 5 s :** « OK, c'est exactement ce que j'ai cherché. » Le titre « Marchés de Noël 2026 : lesquels sont ouverts près de chez vous » reprend presque mot pour mot le résultat Google, et le bouton « Autour de moi (ou choisissez une ville ci-dessous) » me dit quoi faire. Je vois le formulaire (Point de départ, Jour de la visite, Distance maximale) dès le premier écran. C'est une appli de recherche, pas un article de blog : bon signe.

**Après 2 min :** c'est un moteur qui prend la base des offices de tourisme (DATAtourisme) et me dit, pour un jour donné, quels marchés sont ouverts autour d'un point, à quelle heure ils ferment, à combien de km, avec un lien « Itinéraire ». Chaque grande ville a sa fiche avec un verdict immédiat (« Pas encore ouvert », « ouvre le vendredi 20 novembre 2026, dans 6 jours ») et un bouton pour sauter au jour d'ouverture.

**Clair ?** Oui. **Pour qui ?** Quelqu'un qui veut sortir ce soir ou ce week-end et ne veut pas trouver un marché fermé. **Bénéfice concret :** savoir en une page si ça vaut le déplacement aujourd'hui, et à quelle heure il faut y être. La limite apparaît vite : les horaires manquent pour certaines villes (Amiens, Montpellier : « non publiés ») et l'Île-de-France est quasi vide (« Île-de-France : Marchés 1 »).

## 2. « Tout le monde peut-il comprendre ? »

**Verdict : oui pour l'usage principal**, sans aucune explication. Le formulaire et le verdict en gros caractères (« 4 marchés », « Pas encore ouvert ») se lisent en une seconde.

Ça décroche :
- Sur le bloc résultat de l'accueil : le marché mis en avant comme « Le plus proche » est « Maintenant : fermé pour aujourd'hui ». Je cherche un marché ouvert maintenant, on me pousse un marché fermé ; il faut descendre pour voir que Wintershouse est « Ouvert jusqu'à 21 h ».
- Sur Metz : « Ce jour-là, 2 autres marchés ouverts à moins de 30 km » arrive juste après « ouvre le vendredi 20 novembre 2026 ». J'ai d'abord compris « le 20 novembre », alors que c'est aujourd'hui.
- Sur les autres fiches ville (Amiens, Colmar, Kaysersberg, Lille, Montpellier), le moteur dit seulement « Pas encore ouvert », sans rien sur les marchés voisins, alors que l'intro promet « liste les autres marchés de la Somme ouverts ce jour-là ». Je ne sais pas s'il n'y a aucun marché ou si la liste n'a pas chargé.
- Le texte long (chiffres DATAtourisme, « Avec horaires publiés », « exemple d'un samedi ») est clair mais trop détaillé pour un public pressé. On peut le sauter sans gêne.

## 3. Parcours écran par écran

- **01-accueil-1.png** : compris tout de suite. Le titre colle à Google, « SITE INDÉPENDANT : NI OFFICE DE TOURISME, NI ORGANISATEUR » rassure. « 30 km à vol d'oiseau » est compris. Pas de souci.
- **01-accueil-suite1.png** : « 4 marchés » en très gros, c'est la bonne réponse. Ça coince sur « Le plus proche : Marché de Noël des artisans créateurs (Mutzig), à 23 km / Maintenant : fermé pour aujourd'hui » : la première info que je lis, c'est un marché fermé. « Ouverts jusqu'à 20 h ou plus 3 » est utile. « Avec horaires publiés 4 » ne me dit rien à moi.
- **01-accueil-suite2.png** : liste claire (Commune, Distance, Horaires ce jour-là, Itinéraire). Les mentions rouges « Fermé pour aujourd'hui » / « Ouvert jusqu'à 21 h » sont parfaites, mais elles sont toutes dans le même rouge, que le marché soit ouvert ou fermé : je dois lire au lieu de voir. La phrase « Nom souligné : lien vers la page du marché, quand sa fiche en donne une » est utile.
- **01-accueil-suite3.png** : « Paris, l'Île-de-France et la Corse sont presque absents […] la liste est très incomplète ». C'est honnête, mais si j'habite à Paris je ferme ici. Le paragraphe chiffré (409, 460, 212) est intéressant mais long.
- **01-accueil-suite4.png / suite5** : « Les questions que l'on se pose avant de partir » est très bien. Les cartes répondent directement (« Du 27 novembre au 24 décembre 2026, de 11 h 30 à 21 h ») : j'ai la réponse sans cliquer.
- **01-accueil-suite5 à suite8** : « Toutes les pages » par ville, région et moment. C'est lisible. Mulhouse « du 14 novembre au 31 décembre 2026, ouverts le 26 » : « ouverts le 26 » de quel mois ? J'ai hésité (le 26 décembre, je suppose).
- **01-accueil-suite8 à suite12** : tableau « en chiffres » et liste par région. Je n'en ai pas besoin, mais la phrase « un petit nombre veut dire "peu de marchés publiés", pas "peu de marchés" » est bien vue. « Île-de-France : Marchés 1 » et « Corse : 0 » font quand même un drôle d'effet.
- **02-menu-1.png / suite1** : le menu est propre (par ville, par région, par moment, « Chercher un marché », « Méthode et données »). « Par région » est replié alors que les deux autres sections sont dépliées, ce qui fait un peu incohérent mais n'est pas gênant.
- **03-fr-a-propos-1 à suite3** : compris. On sait qui (Radif Partners, une adresse à Clermont-Ferrand, un e-mail) et pourquoi (« ouvrir dix pages »). « nous ne vendons rien et ne demandons aucune coordonnée » rassure. Rien à faire sur cette page, mais ce n'est pas son rôle.
- **04-fr-marche-de-noel-amiens-1 / suite1** : verdict immédiat « Pas encore ouvert », « dans 6 jours », bouton « Voir le vendredi 20 novembre ». Excellent. Ça coince parce que l'intro promet les « autres marchés de la Somme ouverts ce jour-là » et qu'aucune liste n'apparaît sous le verdict.
- **04-…-amiens-suite2 / suite3** : « Horaires (exemple d'un samedi) : non publiés ». Ma question, c'est justement « à quelle heure ça ferme », et ici le site ne le sait pas. Il le dit franchement, mais ça me déçoit. La FAQ ouverte par défaut est pratique.
- **04-…-amiens-suite4 à suite6** : « Pour continuer » : les cartes Lille, Reims, etc. n'ont ni flèche ni soulignement, contrairement à l'accueil, donc je ne suis pas sûr(e) qu'on puisse cliquer dessus.
- **05-fr-marche-de-noel-colmar-1 à suite6** : très bonne page. Titre « ses six marchés, jour par jour », horaires semaine/week-end clairs (« 10 h à 20 h du vendredi au dimanche et de 11 h à 19 h du lundi au jeudi »), FAQ « ouvert après Noël ? » avec réponse précise. Petite surprise : la distance par défaut est « 20 km » ici, contre 30 km ailleurs.
- **06-fr-marche-de-noel-kaysersberg-1 à suite6** : le message essentiel est clair et utile : « n'ouvre que le vendredi, le samedi et le dimanche ». « venir un mardi de décembre, c'est trouver la ville sans marché » : parfait, c'est le piège que j'aurais pu faire. Distance par défaut « 15 km », encore une valeur différente.
- **07-fr-marche-de-noel-lille-1 à suite6** : clair, horaires précis (« 11 h à 20 h 30 du dimanche au jeudi, de 11 h à 22 h le vendredi et le samedi »), FAQ « Où se garer ». Bon.
- **08-fr-marche-de-noel-metz-1 à suite6** : la meilleure version du moteur : verdict, puis « 2 autres marchés ouverts à moins de 30 km », puis la liste. Mais « Ce jour-là » est ambigu (voir §2). Et « Le marché de Noël de Metz : Pas encore ouvert » juste au-dessus d'un « Marché de Noël dans le quartier Sainte-Thérèse », à Metz, ouvert aujourd'hui, à 2 km, m'a fait douter.
- **09-fr-marche-de-noel-montpellier-1 à suite6** : verdict clair. Les jours de fermeture (« sauf les lundis 30 novembre, 7 et 14 décembre et le vendredi 25 décembre ») sont utiles. Mais ni lieu ni heure : « Elle ne nomme pas le lieu du marché et ne donne pas d'heure. » Pour Montpellier, je repars sur Google chercher où c'est.

## 4. Chaque fonction

| Fonction | Trouvée ? | Comprise ? | Utile ? | Évidence /5 |
|---|---|---|---|---|
| Moteur « Autour de moi » / ville + jour + distance (accueil) | Oui, 1er écran | Oui | Très | 5 |
| Verdict « X marchés » + liste avec horaires du jour et « Itinéraire » | Oui | Oui | Très | 4 (le « plus proche » fermé brouille) |
| Statut en direct (« Ouvert jusqu'à 21 h » / « Fermé pour aujourd'hui ») | Oui | Oui | Très | 4 (même couleur pour ouvert et fermé) |
| Verdict par ville « Pas encore ouvert » + « Voir le [jour d'ouverture] » | Oui | Oui | Très | 5 |
| Autres marchés ouverts autour de la ville (fiches ville) | Seulement sur Metz | À moitié (« Ce jour-là » ambigu) | Oui | 2 |
| « Quels marchés montrer » | Vu | Pas testé ; je devine un filtre « ouverts le soir » | Moyen | 3 |
| Cartes « Les questions que l'on se pose avant de partir » | Oui | Oui, la réponse est sur la carte | Très | 5 |
| Tableaux « Horaires (exemple d'un samedi) » | Oui | Oui | Moyen (« non publiés » à Amiens/Montpellier) | 4 |
| Blocs repliés « Afficher ▾ » (villages autour) | Oui | Oui | Pas ouvert, inconnu | 3 |
| Copier le lien / Imprimer / D'où viennent les dates | Oui | Oui | Copier le lien, oui (pour envoyer aux potes) | 4 |
| Menu ☰ | Oui | Oui | Oui | 4 |
| Bouton EN | Vu | Oui | Pas pour moi | 4 |

## 5. Enchaînement et navigation

- Fil d'Ariane présent partout (« Accueil / Marchés de Noël par ville / Amiens »), en-tête identique : on ne se perd pas.
- Chaque fiche ville renvoie à « Partout en France, autour de chez vous ou de votre position : le moteur de recherche de l'accueil → ». C'est bien, mais le même moteur est déjà sur la page juste en dessous, donc le lien fait doublon.
- Toutes les fiches ville ont la même structure (moteur, verdict, paragraphe, tableau, voisins repliés, FAQ, Pour continuer, sources). On apprend vite à les lire.
- Les cartes « Pour continuer » ont un style différent de celles de l'accueil (pas de flèche, pas de soulignement) : on ne voit pas tout de suite qu'elles sont cliquables.
- Les valeurs par défaut changent d'une page à l'autre : 30 km (accueil, Amiens, Lille, Metz, Montpellier), 20 km (Colmar), 15 km (Kaysersberg). C'est logique pour des villages proches, mais rien ne le dit.
- Les pages sont longues : après le verdict, on enchaîne quatre ou cinq écrans de texte sourcé. Pour moi, l'essentiel tient dans le premier écran et demi.

## 6. Difficultés classées

1. **Accueil, 01-accueil-suite1 : le résultat mis en avant est un marché fermé.** J'ai lu « Le plus proche : … (Mutzig), à 23 km » puis « Maintenant : fermé pour aujourd'hui », et j'ai cru un instant que rien n'était ouvert. **Reco :** le jour même, mettre en avant le plus proche **encore ouvert** : « Ouvert maintenant, le plus proche : Marché de Noël (Wintershouse), à 25 km, jusqu'à 21 h », et en dessous « 2 autres fermés pour aujourd'hui ». À défaut, trier la liste avec les marchés ouverts maintenant en premier.
2. **Fiches ville (Amiens, Colmar, Kaysersberg, Lille, Montpellier) : rien sur les voisins quand la ville est fermée.** L'intro promet « liste les autres marchés de la Somme ouverts ce jour-là », mais sous « Pas encore ouvert » il n'y a rien. **Reco :** toujours afficher une ligne, même à zéro : « Aujourd'hui, aucun autre marché ouvert à moins de 30 km. Essayez 50 km ou le vendredi 20 novembre. » (avec les deux liens).
3. **Metz, 08-…-metz-suite1 : « Ce jour-là » ambigu.** La phrase suit « ouvre le vendredi 20 novembre 2026 », donc je l'ai rapportée au 20. **Texte de remplacement :** « Aujourd'hui (samedi 14 novembre), 2 autres marchés sont ouverts à moins de 30 km : voir la liste ci-dessous. »
4. **Accueil, 01-accueil-suite3 et suite12 : Île-de-France quasi absente** (« Marchés 1 »). À 24 ans, il y a de bonnes chances que j'habite en Île-de-France : là, le moteur ne me sert à rien. L'avertissement est honnête mais il arrive après le moteur. **Reco :** si le point de départ ou la position est en Île-de-France, l'afficher dans le bloc résultat : « Les marchés de Paris et d'Île-de-France ne sont presque pas publiés par les offices de tourisme : cette liste est très incomplète. » Et compléter Paris à la main, comme Strasbourg et Lille.
5. **Amiens et Montpellier : « Horaires : non publiés ».** Le résultat Google promettait « à quelle heure ils ferment ». **Reco :** relire les horaires sur le site officiel, comme pour Lille. À défaut, mettre dans le verdict un bouton direct : « Horaires non publiés : voir le site du marché → ».
6. **Liste de résultats : « Ouvert jusqu'à 21 h » et « Fermé pour aujourd'hui » dans le même rouge.** **Reco :** vert ou pastille pleine pour « Ouvert », gris pour « Fermé pour aujourd'hui ».
7. **Cartes « Pour continuer » sans flèche (Amiens, Colmar, Kaysersberg, Lille, Metz, Montpellier).** **Reco :** reprendre le style de l'accueil, avec le nom souligné et « → », par exemple « Lille → ».
8. **Accueil, 01-accueil-suite6 : « ouverts le 26 » (Mulhouse) ne dit pas de quel mois.** **Texte de remplacement :** « Quatre marchés dans la ville, du 14 novembre au 31 décembre 2026, ouverts le 26 décembre ».

## 7. À garder

- Le titre de l'accueil, aligné sur Google, et le moteur visible dès le premier écran.
- Le gros verdict « 4 marchés » / « Pas encore ouvert » avec le compte à rebours « dans 6 jours » et le bouton « Voir le vendredi 20 novembre ». C'est la meilleure idée du site.
- « Fermé pour aujourd'hui » / « Ouvert jusqu'à 21 h » calculé à l'heure de mon téléphone.
- Les cartes questions de l'accueil, dont la réponse est lisible sans cliquer.
- La franchise : « la liste est très incomplète », « non publiés », « Nous ne demandons ni nom ni courriel ».
- Kaysersberg : « venir un mardi de décembre, c'est trouver la ville sans marché ».
- Le lien « Itinéraire » sur chaque marché et « Copier le lien » pour partager.

## 8. Notes

Clarté : 8/10
Facilité : 8/10
Utilité : 7/10
