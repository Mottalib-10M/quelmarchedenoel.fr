# Test naïf du 2026-11-14, testeur 2 : quelmarchedenoel.fr
**Persona :** Français(e) de 24 ans, très à l'aise avec les apps, impatient(e) : s'il/si elle ne comprend pas en quelques secondes ce que la page lui apporte, il/elle ferme et retourne sur Google. Il/elle a cliqué sur le résultat « Marchés de Noël 2026 : ouverts aujourd'hui près de chez vous » parce qu'il/elle a cette question. Découverte sur téléphone.

## 1. Concept

**Après 5 secondes :** « Ok, c'est un moteur : je mets ma ville, un jour, une distance, et il me sort les marchés de Noël ouverts. » Le titre « Marchés de Noël 2026 : lesquels sont ouverts près de chez vous » colle exactement à ce que j'ai lu sur Google. Les quatre menus déroulants (« Point de départ », « Jour de la visite », « Distance maximale », « Garder seulement ») sont lisibles tout de suite. Bon point : c'est déjà rempli, j'ai un résultat sans rien taper.

Petit accroc : le point de départ est « Strasbourg ». Je n'habite pas forcément à Strasbourg ; le texte dit « Choisissez une ville de départ ou votre position », mais je ne vois aucun bouton « Utiliser ma position » sur le premier écran. Je dois deviner que c'est dans la liste déroulante.

**Après 2 minutes :** c'est un calendrier de tous les marchés de Noël de France (« 2 482 marchés »), avec un outil « qui est ouvert tel jour, jusqu'à quelle heure, à combien de km », plus des pages par ville (Strasbourg, Colmar, Lille…) et par région. Les données viennent des offices de tourisme (« DATAtourisme ») et le site dit clairement qu'il n'est « ni office de tourisme, ni organisateur ».

**Clair ?** Oui pour l'idée. **Pour qui ?** Quelqu'un qui veut sortir un soir ou un week-end de décembre et cherche quoi faire autour de chez lui. **Bénéfice concret :** savoir en un coup d'œil si ça vaut le déplacement aujourd'hui et jusqu'à quelle heure c'est ouvert (« Maintenant : ouvert jusqu'à 18 h » : ça, c'est exactement ce que je voulais).

Mais je découvre en bas de l'accueil que l'Île-de-France n'a que « 1 » marché et la Corse « 0 ». Si j'étais à Paris, le site ne me servirait à rien, et je ne l'apprendrais qu'après avoir fait défiler 8 écrans.

## 2. « Tout le monde peut-il comprendre ? »

**Verdict : oui pour l'outil du haut, non pour le reste du texte.**

- L'outil et la carte de résultat : compréhensibles par n'importe qui (« 4 marchés », « Le plus proche… à 23 km », « Horaires ce jour-là : 10 h à 18 h »).
- Ça décroche :
  - dans le tableau des résultats, coupé à droite sur téléphone : la colonne des horaires s'affiche en « Hora / ce jo », « Ouver / jusqu », donc la donnée la plus utile est à moitié cachée ;
  - sur les pages de villes, où tout le texte parle de « fiche », « saisie », « export DATAtourisme », « le chercheur », « lue le 13 novembre » : c'est du langage de fabricant de base de données, pas de visiteur ;
  - sur les blocs repliés (« ▶ » tout seul sur une ligne, puis un titre, puis un grand blanc) : on dirait des sections vides ou cassées.

## 3. Parcours écran par écran

- **01-accueil-1** : compris. Titre, phrase d'explication, formulaire pré-rempli. Le mot « chercheur » (« le chercheur parcourt les 2 482 marchés ») est bizarre, je pense à une personne. « 30 km à vol d'oiseau » : je comprends, mais je me demande pourquoi pas en voiture. Aucun bouton de géolocalisation visible.
- **01-accueil-suite1** : compris, c'est le meilleur écran. « 4 marchés », « Le plus proche : Marché de Noël des artisans créateurs (Mutzig), à 23 km », « Maintenant : ouvert jusqu'à 18 h ». En revanche « Avec horaires publiés 4 » ne me dit rien : pourquoi je voudrais ce chiffre ? Le tableau en dessous commence déjà coupé à droite (« Hora / ce jo »).
- **01-accueil-suite2** : ça coince. Le tableau déborde, la colonne horaire est tronquée (« 10 h / h / Ouver / jusqu / 18 h »). Je ne sais pas si on peut faire défiler latéralement. Un seul nom de marché est un lien (« Marché de Noël des créateurs artisans et produits locaux », Bœrsch) : pourquoi pas les autres ? Le promis « et le chemin » de la phrase d'intro : je ne vois aucun lien d'itinéraire. Le texte de confidentialité (« Nous ne demandons ni nom ni courriel ») rassure.
- **01-accueil-suite3** : compris. Paragraphe chiffré (« 409 sont ouverts », « 460 », « 212 ») puis des cartes de questions bien choisies : « Quand ouvre le marché de Noël de Strasbourg ? », « Colmar est-il ouvert après Noël ? ». Très efficace, ça donne envie de cliquer.
- **01-accueil-suite4** : compris. « Où aller un soir après le travail ? » et « 393 marchés ferment à 21 h ou plus tard » : parfait pour mon profil. Le tableau « en chiffres » commence, utile mais long.
- **01-accueil-suite5** : compris, mais c'est de la statistique : « Entrée gratuite indiquée 813 », « Avec horaires publiés 1 872 (75 %) ». Je défile vite.
- **01-accueil-suite6 / suite7 / suite8** : listes par région, trois écrans de chiffres empilés (« Marchés / Avec horaires / Ouverts le 5 déc. / Ouverts après Noël »). Lassant. Ça coince surtout à « Île-de-France : 1 » et « Corse : 0 ». L'explication (« Les offices de tourisme ne saisissent pas tous leurs marchés… ») arrive tout en bas, trop tard. Provence-Alpes-Côte d'Azur, Hauts-de-France, Île-de-France et Corse ne sont pas cliquables alors que les autres régions le sont.
- **01-accueil-suite8 (fin) / suite9** : « Comment lire les dates et les horaires » suivi de triangles « ▶ » seuls sur une ligne, avec le titre en dessous (« D'où viennent les marchés de cette page », « Ouvert, fermé, horaires non publiés »…). Visuellement, ça ressemble à un bug, je ne suis pas sûr que ce soit cliquable.
- **01-accueil-suite9 / suite10** : « Toutes les pages », « Marchés de Noël par ville » : des cartes claires avec dates et heure de fermeture (« 22 h le vendredi et le samedi »). Compris.
- **01-accueil-suite11 / suite12** : « Par région », « Par moment de la saison » (« Ouverts le soir », « Après Noël et en janvier ») : compris et utile. « 151 marchés saisis, surtout dans l'Allier… » : là encore, Lyon et Grenoble sont absents, et le mot « saisis » me fait comprendre que la liste est incomplète.
- **02-menu-1 / suite1** : compris. Menu propre : villes, région (replié), moments de la saison, « Méthode et données ». Il manque seulement un lien direct « Chercher autour de moi » en tête de menu.
- **03-fr-a-propos-1 à suite3** : compris, rassurant (« nous ne vendons rien et ne demandons aucune coordonnée », adresse, contact). Phrase lourde pour moi : « Radif Partners télécharge l'export public de DATAtourisme… ». Je n'ai pas besoin de ça, mais ça fait sérieux.
- **04-fr-marche-de-noel-amiens-1** : compris. « Le marché de Noël d'Amiens est ouvert du vendredi 20 novembre 2026 au mercredi 30 décembre 2026 » : la réponse est en haut, très bien.
- **04-…-amiens-suite1** : ça coince. Énorme « Aucun » parce qu'on est le 14 novembre. Le conseil, « le premier week-end de l'Avent (Sam. 28 nov.) en compte le plus », est générique : il ne me dit pas « Amiens ouvre dans 6 jours, le vendredi 20 novembre ». Premier réflexe : « c'est fermé, tant pis ».
- **04-…-amiens-suite2 / suite3** : texte très « base de données » (« Elle est saisie par l'office de tourisme… Le tableau la reprend ; le chercheur confirme l'ouverture jour par jour »). L'info utile (« Horaires… non publiés », « L'entrée est gratuite ») est noyée. Puis « ▶ Dans la Somme, autour d'Amiens » suivi d'un grand blanc : on dirait une section vide.
- **04-…-amiens-suite4 à suite6** : FAQ utile (« ouvert le lundi ? Oui… »), « Pour continuer » clair. Compris.
- **05-fr-marche-de-noel-colmar-1 / suite1** : compris, mais encore « Aucun » en gros. Le titre dit « les six places », le texte du dessous dit « Cinq places… » plus le marché gourmand. Ça se tient, mais je me suis arrêté pour recompter.
- **05-…-colmar-suite2 à suite4** : la liste des 6 marchés avec dates et horaires est claire. « Horaires, un samedi : 10 h à 20 h (28 novembre) » : je ne comprends pas tout de suite pourquoi « un samedi » et pourquoi cette date. Je le comprends comme « exemple d'un samedi », mais c'est une tournure étrange.
- **05-…-colmar-suite5 / suite6** : « ▶ Les villages autour de Colmar » puis blanc : même impression de section vide. FAQ « ouvert après Noël ? » très utile.
- **06-fr-marche-de-noel-kaysersberg-1 / suite1** : ça coince. Le champ « Distance maximale » est vide, alors que le résultat annonce « à moins de 15 km de Kaysersberg Vignoble ». Je me demande si l'outil marche. « Kaysersberg Vignoble » au lieu de « Kaysersberg » : petite hésitation.
- **06-…-kaysersberg-suite2 à suite6** : très clair sur le point clé : « n'ouvre que le vendredi, le samedi et le dimanche » ; « venir un mardi de décembre, c'est trouver la ville sans marché ». Excellent avertissement. Même « ▶ Les villages à moins de 15 km » suivi d'un blanc.
- **07-fr-marche-de-noel-lille-1 / suite1** : compris. Mais Lille ouvre le 18 novembre (dans 4 jours) et la carte me conseille quand même « Sam. 28 nov. ». Le conseil contredit l'info du titre.
- **07-…-lille-suite2 à suite6** : horaires très clairs (« de 11 h à 20 h 30 du dimanche au jeudi, de 11 h à 22 h le vendredi et le samedi »). Le détail sur les gobelets réutilisables et les décorations allumées à 17 h fait vivant. « ▶ Ce que la base ne dit pas autour de Lille » : titre incompréhensible, et toujours le blanc. « Jours d'ouverture 42 » alors que du 18 nov. au 30 déc. j'en compte plus : pas expliqué.
- **08-fr-marche-de-noel-metz-1 à suite2** : compris, c'est la page la plus convaincante, parce qu'il y a un résultat aujourd'hui : « 2 marchés », « Sainte-Thérèse (Metz), à 2 km », « Maintenant : ouvert jusqu'à 19 h ». Le tableau est toujours coupé à droite (« Hor / ce j », « Ouv / jusq »).
- **08-…-metz-suite3 à suite6** : clair, la FAQ « entre Noël et le jour de l'an » est précise (« fermé le 25 décembre et ferme à 16 h le 24 »). « ▶ Autour de Metz : un samedi en Moselle » suivi d'un blanc.
- **09-fr-marche-de-noel-montpellier-1 / suite1** : « Aucun ». Compris.
- **09-…-montpellier-suite2 à suite6** : utile (« sauf les lundis 30 novembre, 7 et 14 décembre »), mais la page avoue « ne donne pas d'heure ». Coquilles et incohérences : « la compagnie Si et Seul » dans le texte, « 10 Ans de la Compagnie Si et Seulement la » dans le tableau ; « 6 décembre au 6 décembre ». « ▶ Entre Montpellier et la mer » suivi d'un blanc.

## 4. Chaque fonction

| Fonction | Trouvée ? | Comprise ? | Utile ? | Évidence /5 |
|---|---|---|---|---|
| Chercheur de l'accueil (ville, jour, distance, filtre) | Oui, tout de suite | Oui | Très | 4/5 |
| Carte de résultat (nombre, le plus proche, « Maintenant : ouvert jusqu'à… ») | Oui | Oui | Très | 5/5 |
| Tableau des marchés trouvés | Oui | À moitié (colonne horaire coupée) | Très | 2/5 |
| Utiliser ma position | Non (annoncée dans le texte, pas vue) | Non | Potentiellement très | 1/5 |
| « Garder seulement » | Oui | Je devine que c'est un filtre (soir, gratuit ?), sans voir les options | Moyen | 3/5 |
| Copier le lien / Imprimer | Oui | Oui | Moyen (partager à des amis) | 4/5 |
| « D'où viennent les dates » | Oui | Oui | Faible pour moi | 3/5 |
| Cartes « Les questions que l'on se pose avant de partir » | Oui | Oui | Très | 5/5 |
| Pages ville (dates, horaires, FAQ) | Oui (accueil + menu) | Oui | Très | 4/5 |
| Chercheur dans les pages ville | Oui | Oui, mais le « Aucun » décourage | Moyen avant la saison | 3/5 |
| Blocs repliés « ▶ » (autour de la ville, comment lire…) | Vus | Non : on dirait des sections vides | Inconnu | 1/5 |
| Statistiques par région | Oui | Oui | Faible | 3/5 |
| Menu ☰ | Oui | Oui | Oui | 4/5 |
| FAQ dépliables | Oui (« Touchez une question… ») | Oui | Très | 5/5 |

## 5. Enchaînement et navigation

- Bon fil : Google, puis le titre identique, puis le résultat immédiat, puis les questions-cartes, puis les pages ville. Chaque page ville renvoie au « chercheur de l'accueil » et propose « Pour continuer ». Fil d'Ariane présent.
- Ruptures :
  - après le résultat, l'accueil enchaîne sur 5 écrans de statistiques avant de reproposer les villes : pour un impatient, c'est un tunnel ;
  - les blocs « ▶ » cassent le rythme sur toutes les pages ville ;
  - les cartes « Pour continuer » n'ont ni flèche ni soulignement, contrairement à celles de l'accueil (« Strasbourg → ») : je ne suis pas sûr qu'elles soient cliquables ;
  - le pied de page « Quel Marché de Noël · À propos, mentions légales et toutes les pages » est replié : correct.

## 6. Difficultés classées

1. **Tableau des résultats coupé à droite (01-accueil-suite1/suite2, 08-metz-suite1/suite2).**
   - Vécu : la colonne « Horaires ce jour-là » s'affiche « Hora / ce jo », « Ouver / jusqu ». C'est précisément l'info que je viens chercher.
   - Recommandation : sur mobile, remplacer le tableau par des cartes empilées (nom, commune · distance, puis horaire et « Ouvert jusqu'à 18 h » sur une ligne pleine largeur), ou au minimum mettre la colonne horaire en 2e position et réduire « Commune ».

2. **Le gros « Aucun » des pages ville avant l'ouverture (04-amiens-suite1, 05-colmar-suite1, 06-kaysersberg-suite1, 07-lille-suite1, 09-montpellier-suite1).**
   - Vécu : 5 pages ville sur 6 m'affichent « Aucun ». Je crois que c'est fermé et je pars. Le conseil générique « Sam. 28 nov. » contredit même Lille (ouvre le 18) et Amiens (le 20).
   - Recommandation : quand le marché de la page n'est pas encore ouvert, afficher d'abord sa prochaine ouverture, avec un bouton qui règle le jour.
   - Texte : « Pas encore ouvert : le Village de Noël de Lille ouvre le mercredi 18 novembre, dans 4 jours. [Voir ce jour-là] ».

3. **Blocs « ▶ » suivis d'un grand blanc (01-accueil-suite8/suite9, et toutes les pages ville : « Dans la Somme, autour d'Amiens », « Les villages autour de Colmar », « Ce que la base ne dit pas autour de Lille », « Autour de Metz : un samedi en Moselle », « Entre Montpellier et la mer »).**
   - Vécu : on dirait des sections vides ou cassées. Le triangle est seul sur sa ligne, au-dessus du titre.
   - Recommandation : triangle ou chevron sur la même ligne que le titre, dans un cadre comme la FAQ, avec une ligne d'aperçu.
   - Texte : « Autour d'Amiens : 3 marchés ouverts le 28 novembre ⌄ ».

4. **Île-de-France 1, Corse 0, Hauts-de-France 37 : l'avertissement arrive trop tard (01-accueil-suite8).**
   - Vécu : un Parisien découvre au 9e écran que le site ne couvre pas sa région, alors que la promesse est « près de chez vous ».
   - Recommandation : le dire sous le formulaire, en une ligne.
   - Texte : « Paris, l'Île-de-France et la Corse sont presque absents des données des offices de tourisme : pour ces régions, la liste est incomplète. »

5. **« Votre position » annoncée mais invisible (01-accueil-1).**
   - Vécu : Strasbourg par défaut, et je ne vois pas comment me localiser.
   - Recommandation : un bouton visible sous « Point de départ ».
   - Texte : « 📍 Autour de moi » (ou « Utiliser ma position »).

6. **Champ « Distance maximale » vide sur Kaysersberg (06-kaysersberg-1/suite1)** alors que le résultat annonce « moins de 15 km ».
   - Vécu : je doute que l'outil fonctionne.
   - Recommandation : afficher « 15 km à vol d'oiseau » dans la liste.

7. **Vocabulaire de base de données (pages ville) : « chercheur », « fiche… saisie », « export », « lue le 13 novembre », « Horaires, un samedi … (28 novembre) ».**
   - Vécu : je dois traduire chaque phrase dans ma tête.
   - Recommandation : remplacer « le chercheur » par « l'outil » ou « la recherche », et « Horaires, un samedi » par « Horaires le samedi (ex. 28 nov.) ».
   - Texte pour Amiens : « Ouvert tous les jours du 20 novembre au 30 décembre, entrée gratuite. Horaires non communiqués : vérifiez sur le site du marché avant de venir en semaine. »

8. **Incohérences et coquilles (09-montpellier-suite2/suite4, 05-colmar-1/suite2, 01-accueil-suite2).**
   - Les faits : « Si et Seul » contre « Si et Seulement la » ; « 6 décembre au 6 décembre » ; « les six places » contre « Cinq places » ; un seul nom de marché cliquable dans le tableau ; « le chemin » promis sans lien d'itinéraire visible.
   - Recommandation : écrire « le 6 décembre » pour un seul jour, harmoniser les noms, dire « six marchés (cinq places et le marché gourmand) », et ajouter un lien « Itinéraire » par ligne ou retirer « et le chemin ».

## 7. À garder

- Le titre identique à Google et le résultat immédiat sans rien taper.
- La carte de résultat : « 4 marchés », « Le plus proche… à 23 km », « Maintenant : ouvert jusqu'à 18 h ». C'est la meilleure chose du site.
- Les cartes « Les questions que l'on se pose avant de partir », surtout « Où aller un soir après le travail ? ».
- Les avertissements concrets : « venir un mardi de décembre, c'est trouver la ville sans marché » (Kaysersberg), « ferme à 16 h le 24 » (Metz).
- Les horaires précis de Lille (« 11 h à 22 h le vendredi et le samedi »).
- La transparence (« Site indépendant : ni office de tourisme, ni organisateur », « Nous ne demandons ni nom ni courriel »).
- Le menu clair et les pages « Ouverts le soir » et « Après Noël et en janvier ».

## 8. Notes

Clarté : 7/10
Facilité : 6/10
Utilité : 7/10
