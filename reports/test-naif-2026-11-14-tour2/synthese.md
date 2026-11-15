# Synthèse du test naïf du 2026-11-14 (tour 2) : quelmarchedenoel.fr

Notes du 2e tour : testeur 1 = 8/8/7, testeur 2 = 8/8/7, testeur 3 = 7/7/7.
Corrections de ce tour (3e passage) : les deux points validés par l'éditeur ; les autres sont reportés en attendant son avis.

| # | Difficulté (testeurs) | Décision | Ce qui a été fait / raison |
|---|---|---|---|
| 1 | Le jour même, la carte résultat met en avant « Le plus proche » (Mutzig) avec « Maintenant : fermé pour aujourd'hui », alors que Wintershouse est ouvert jusqu'à 21 h plus bas (1, 2, 3) | **corrigé** | Cause : la carte prenait toujours `res[0]`, le plus proche, sans regarder l'heure. Nouveau `enAvant()` dans `src/lib/engine/marches.ts` : le jour même, le plus proche qui n'a pas fini sa journée (ouvert, ouvre plus tard ou horaires inconnus) ; tous fermés : le plus proche. La carte dit « Le plus proche encore ouvert : … » puis « Le plus proche, Mutzig (23 km), a fermé à 18 h. » (fr et en). 4 tests ajoutés dans `tests/engine.test.ts`. |
| 2 | « Marchés de Noël ouverts le samedi 14 novembre » / « 2 autres marchés ouverts » puis « Fermé pour aujourd'hui » : contradiction, on croit le marché fermé toute la journée (1, 2, 3) | **corrigé** | `etatA()` renvoie maintenant l'heure de fermeture (`termine` + `a`). Le libellé devient « Fermé pour ce soir (fermeture à 18 h) », ou « Fermé pour la journée (fermeture à 12 h) » si le marché ferme avant 17 h ; même libellé dans la carte (« Maintenant : … ») et dans la liste, sur toutes les pages qui portent le moteur (accueil, villes, périodes). |
| 3 | Pages de ville fermées : aucune ligne sur les marchés voisins (Amiens, Colmar, Kaysersberg, Lille, Montpellier) (1, 2, 3) | **non retenu** | Non validé par l'éditeur pour ce tour ; reporté. |
| 4 | Île-de-France et Corse : l'avertissement arrive après les résultats (1, 2, 3) | **non retenu** | Non validé pour ce tour ; reporté (pistes : avertissement dans la carte quand le départ est en Île-de-France). |
| 5 | Horaires « non publiés » à Amiens et Montpellier (1, 2, 3) | **non retenu** | Non validé pour ce tour ; aucun horaire ne peut être ajouté sans source relue. |
| 6 | Vocabulaire de source (DATAtourisme, export, fiche, Licence Ouverte) dans les pages de ville (1, 3) | **non retenu** | Non validé pour ce tour ; reporté. |
| 7 | Compteurs « Ouverts jusqu'à 20 h ou plus » / « Avec horaires publiés » incompris (1, 3) | **non retenu** | Non validé pour ce tour ; reporté. |
| 8 | Cartes « Pour continuer » sans flèche (2, 3) | **non retenu** | Non validé pour ce tour ; composant probablement de trame, reporté. |
| 9 | « ouverts le 26 » (Mulhouse) sans mois (2, 3) | **non retenu** | Non validé pour ce tour ; reporté. |
| 10 | Metz « Ce jour-là » rapporté au 20 novembre (2) | **non retenu** | Non validé pour ce tour ; reporté. |
| 11 | « Ouvert » et « Fermé » dans le même rouge (2) | **non retenu** | Non validé pour ce tour ; le libellé corrigé (point 2) lève l'ambiguïté du texte. |
| 12 | Strasbourg préréglé, peur de la localisation (1, 3) | **non retenu** | Non validé pour ce tour ; la phrase « rien n'est envoyé » existe déjà après le clic. |
| 13 | Contradiction À propos / accueil sur la couverture des offices de tourisme (1) | **non retenu** | Non validé pour ce tour ; reporté. |
| 14 | Distance par défaut variable selon la page (1, 2) | **non retenu** | Choix volontaire (villages proches à Kaysersberg) ; non validé pour ce tour. |
| 15 | Tableaux de chiffres à l'accueil (1, 3) | **non retenu** | Non validé pour ce tour. |
