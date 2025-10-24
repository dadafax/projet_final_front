Bonjour, en premier voici comment j'ai fait mes push sur GitHub pour les 3 niveaux. J'ai coupé en 2 parties qui regroupaient les fonctionnalités demandées.

- Niveau 1 

1. Liste des Utilisateurs
   - Affichage en grille responsive des utilisateurs
   - Cartes avec photo de profil, nom...
   - Chargement dynamique depuis l'API

2. Détails Utilisateur
   - Vue détaillée de chaque utilisateur
   - Navigation fluide entre liste et détails
   - Gestion élégante des états de chargement
   - Gestion des erreurs avec option de réessai
   - Bouton retour intuitif

- Niveau 2 

1. Interface et Navigation
   - Champ de recherche en temps réel (filtre par nom, prénom, email)
   - Mise en page optimisée avec grille responsive (3 colonnes)
   - Design épuré avec ombres et animations subtiles
   - Contrôles de tri et pagination intégrés

2. Interactivité Avancée
   - Recherche dynamique instantanée
   - Tri des utilisateurs (par nom A→Z/Z→A et âge)
   - Pagination (10 utilisateurs par page)
   - Navigation fluide entre les pages
   - Synchronisation état avec l'URL
   - Partage facile des résultats via URL

- Niveau 3

1. Expérience Utilisateur
   - Système de favoris avec persistance localStorage
   - Thème clair/sombre personnalisable
   - Menu déroulant élégant pour le tri (A→Z, Z→A, âge)
   - Animation fluide du menu et des transitions
   - Gestion améliorée des interactions utilisateur

2. Optimisations Techniques
   - État de chargement avec composant Spinner/Skeleton
   - Gestion d'erreurs élégante avec retry
   - Performance optimisée (useMemo)
   - Transitions CSS pour une interface vivante
   - Expérience utilisateur fluide et intuitive


- Installation

bash
- cloner le repo
git clone https://github.com/dadafax/projet_final_front.git

- être au bon endroit pour lancer le projet 
cd projet_final_front

- pour les dépendances 
npm install

- lancer l'app
npm run dev



Dorian MILLION-BRODAZ