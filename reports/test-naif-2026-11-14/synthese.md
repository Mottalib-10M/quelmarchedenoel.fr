# Synthèse du test naïf du 2026-11-14 : quelmarchedenoel.fr

Notes du 1er tour : testeur 1 = 7/7/7, testeur 2 = 7/6/7, testeur 3 = 7/6/8.

| # | Difficulté (testeurs) | Décision | Ce qui a été fait / raison |
|---|---|---|---|
| 1 | « Aucun » en gros sur 5 pages de ville sur 6 avant l'ouverture, conseil générique « Sam. 28 nov. » qui contredit Lille et Amiens (1, 2, 3) | **corrigé** | Chaque page de ville donne au moteur son marché (`outil.vedette`). Avant l'ouverture, le grand résultat dit « Pas encore ouvert » et « Le marché de Noël d'Amiens ouvre le vendredi 20 novembre 2026, dans 6 jours », avec un bouton « Voir le vendredi 20 novembre ». Même logique un jour de fermeture (Kaysersberg un mardi : « Fermé ce jour-là… rouvre le… ») et après la fermeture (« Saison terminée »). Sur l'accueil et les pages sans marché de page : prochain jour avec un marché dans la zone et bouton. Le conseil « Sam. 28 nov. » a disparu. Dates tirées des fiches (`saisonDe`, `prochainJourZone`), 6 tests ajoutés dans tests/engine.test.ts. |
| 2 | Tableau des résultats coupé à droite sur téléphone, horaires tronqués « Hora / ce jo » (1, 2, 3) | **corrigé** | Le tableau du moteur prend la classe `.empile` avec `data-label` : une fiche par marché sous 768 px (donc sous 640 px), horaires sur toute la largeur. Vérifié à 320 et 390 px. |
| 3 | Noms de marché écrits sur 5 lignes dans le tableau (3) | **corrigé** | Même correction : le nom devient le titre de la fiche, sur toute la largeur. |
| 4 | « Votre position » annoncée mais aucun bouton visible (1, 2, 3) | **corrigé** | Bouton « Autour de moi (ou choisissez une ville ci-dessous) » en tête du formulaire, avec une icône de repère. La position reste dans le navigateur. |
| 5 | Rubriques repliées « ▶ » : triangle seul, titre dessous, grand blanc, on croit à une section vide (1, 2, 3) | **corrigé** | Le style `.fold` manquait dans ce site : chaque rubrique est un cadre, titre et « Afficher ▾ / Masquer ▴ » sur la même ligne. |
| 6 | Île-de-France 1, Corse 0 : l'avertissement arrive au 9e écran (1, 2, 3) | **corrigé** | Une ligne sous le moteur de l'accueil : « Paris, l'Île-de-France et la Corse sont presque absents de la base des offices de tourisme… ». La note des régions passe au-dessus du tableau, en mots simples. |
| 7 | Régions tantôt cliquables, tantôt non (1, 2, 3) | **corrigé** | La note dit pourquoi : les régions sans lien n'ont pas de page, faute de marchés publiés en nombre suffisant. |
| 8 | Champ « Distance maximale » vide à Kaysersberg alors que le résultat dit 15 km (1, 2, 3) | **corrigé** | Le rayon de la page s'ajoute à la liste : « 15 km à vol d'oiseau » s'affiche. |
| 9 | « Kaysersberg Vignoble » au lieu de « Kaysersberg » (1, 2, 3) | **corrigé** | Le moteur affiche « Kaysersberg » ; le texte de la page garde le nom officiel de la commune. |
| 10 | Jargon : « le chercheur », « fiche saisie », « saisissent », « export » (1, 2, 3) | **corrigé** | « chercheur » remplacé par « moteur de recherche » partout (98 occurrences) ; « saisi(e)s / saisissent / saisit » par « publié(e)s / publient / publie ». DATAtourisme est présenté à sa première apparition sur l'accueil (« la base nationale où les offices de tourisme publient leurs événements »). « Fiche » est gardé : il est compris en contexte. |
| 11 | « Garder seulement » flou (1, 2, 3) | **corrigé** | Libellé « Quels marchés montrer », premier choix « Tous les marchés ouverts ce jour-là ». |
| 12 | Colmar « les six places » / « 6 marchés » / « Cinq places » (1, 2) | **corrigé** | Partout « six marchés » : « Cinq de ces six marchés, sur les places… ; le sixième, le marché gourmand… » (fr et en). |
| 13 | « Horaires, un samedi … (28 novembre) » étrange (2, 3) | **corrigé** | Colonne « Horaires (exemple d'un samedi) », valeur « 10 h à 20 h (sam. 28 nov.) ». |
| 14 | « 6 décembre au 6 décembre » (2, 3) | **corrigé** | Un marché d'un seul jour s'écrit « 6 décembre » (lib/blocs.ts, tous les tableaux). |
| 15 | Montpellier : « Si et Seul » dans le texte, « Si et Seulement la » dans le tableau (2, 3) | **corrigé** | Le texte ne recopie plus ce nom : « Tropisme, les ressourceries et les dix ans d'une compagnie ». |
| 16 | Montpellier : carte de l'accueil « fermé le lundi » alors qu'il ouvre les lundis 21 et 28 (3, défaut objectif) | **corrigé** | Carte : « fermé trois lundis et le 25 » (fr et en), conforme à la fiche. |
| 17 | « Ce que la base ne dit pas autour de Lille » incompréhensible (1, 2, 3) | **corrigé** | Titre « Les autres marchés autour de Lille ». |
| 18 | « export du 12 novembre » contre « lue le 13 novembre » (1, 3) | **corrigé** | Source : « export daté du 12 novembre 2026, lu le 13 novembre 2026 » ; les légendes « export du 13 novembre » deviennent « export lu le 13 novembre ». |
| 19 | Un seul nom de marché cliquable dans le tableau (1, 2, 3) | **corrigé** | Note sous le titre du tableau : nom souligné = lien vers la page du marché quand sa fiche en donne une. |
| 20 | « Et le chemin » promis sans lien d'itinéraire visible (1, 2) | **corrigé** | Le lien existait, caché dans la colonne coupée ; il s'appelle maintenant « Itinéraire » et se voit dans chaque fiche. |
| 21 | Compteurs à « 0 » inutiles quand rien n'est ouvert (1, 3) | **corrigé** | Les compteurs ne s'affichent que s'il y a au moins un marché ce jour-là. |
| 22 | Pas de lien « Chercher » dans le menu (1, 2) | **corrigé** | Entrée « Chercher un marché » dans le menu, vers le moteur de l'accueil. |
| 23 | Accueil : 5 écrans de chiffres avant les pages de villes (2, 3) | **corrigé** | La section « Toutes les pages » passe juste après les questions, avant les chiffres et les régions. |
| 24 | Metz : « régimes » trop administratif (3) | **corrigé** | « des heures différentes selon le jour de la semaine ». |
| 25 | Grandes villes absentes (Paris, Lyon, Marseille…) (1, 2) | **non retenu** | Aucune source officielle datée pour 2026 (déjà dit dans la FAQ) ; ne rien inventer. La nouvelle ligne sous le moteur prévient les Franciliens. |
| 26 | Montpellier : ni lieu ni heure (1) | **non retenu** | La fiche ne les publie pas ; la page renvoie déjà à la Ville. Aucun chiffre inventé. |
| 27 | Lille « Jours d'ouverture 42 » non expliqué (2) | **non retenu** | Chiffre exact : 43 jours du 18 novembre au 30 décembre, moins le 25 décembre fermé, dit dans le paragraphe. |
| 28 | Rayon par défaut différent d'une page à l'autre (3) | **non retenu** | Choix voulu selon la densité de marchés ; le rayon est désormais toujours affiché dans le champ. |
| 29 | Pas de bouton « Chercher » (3) | **non retenu** | Le résultat se met à jour à chaque choix, juste sous le formulaire ; un bouton n'aurait aucun effet. |
| 30 | Cartes « Pour continuer » sans flèche (2) | **non retenu** | Composant de la trame (PageLayout), signalé ; un seul testeur. |
| 31 | Fin de page qui répète trois fois les sources (3) | **non retenu** | Bloc de la trame (sources, auteur, date), exigé par la recette ; signalé. |
| 32 | Bouton « EN » qui inquiète (3) | **non retenu** | Langue anglaise obligatoire sur toutes les pages (règle du portefeuille). |
| 33 | Palavas annoncé sur l'accueil, pas vu sur la page Montpellier (1) | **corrigé** (par 5) | Palavas est dans le résumé et dans la rubrique « Entre Montpellier et la mer », désormais lisible comme rubrique dépliable. |
