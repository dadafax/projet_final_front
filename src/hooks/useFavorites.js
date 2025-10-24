import { useState, useEffect } from 'react';

const FAVORITES_KEY = 'userFavorites';

export const useFavorites = () => {
  const [favorites, setFavorites] = useState(() => {
    const stored = localStorage.getItem(FAVORITES_KEY);
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (userId) => {
    setFavorites(prevFavorites => {
      if (prevFavorites.includes(userId)) {
        return prevFavorites.filter(id => id !== userId);
      } else {
        return [...prevFavorites, userId];
      }
    });
  };

  const isFavorite = (userId) => favorites.includes(userId);

  return { favorites, toggleFavorite, isFavorite };
};