import { useState, useEffect } from 'react';

const FAVORITES_KEY = 'userFavorites';

export const useFavorites = () => {
  // Initialiser l'état avec les favoris stockés dans localStorage
  const [favorites, setFavorites] = useState(() => {
    const stored = localStorage.getItem(FAVORITES_KEY);
    return stored ? JSON.parse(stored) : [];
  });

  // Mettre à jour localStorage quand les favoris changent
  useEffect(() => {
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
  }, [favorites]);

  // Ajouter/supprimer un favori
  const toggleFavorite = (userId) => {
    setFavorites(prevFavorites => {
      if (prevFavorites.includes(userId)) {
        return prevFavorites.filter(id => id !== userId);
      } else {
        return [...prevFavorites, userId];
      }
    });
  };

  // Vérifier si un utilisateur est en favori
  const isFavorite = (userId) => favorites.includes(userId);

  return { favorites, toggleFavorite, isFavorite };
};