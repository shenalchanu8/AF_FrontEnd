import { useState, useEffect } from 'react';

/**
 * @typedef {import('../types.js').Country} Country
 */

/**
 * @returns {Object} Favorites hook
 * @property {Country[]} favorites
 * @property {(country: Country) => void} addFavorite
 * @property {(countryCode: string) => void} removeFavorite
 * @property {(country: Country) => void} toggleFavorite
 * @property {(countryCode: string) => boolean} isFavorite
 */
export const useFavorites = () => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    // Load favorites from localStorage
    const savedFavorites = localStorage.getItem('favorites');
    if (savedFavorites) {
      try {
        setFavorites(JSON.parse(savedFavorites));
      } catch (error) {
        console.error('Failed to parse favorites:', error);
        setFavorites([]);
      }
    }
  }, []);

  const addFavorite = (country) => {
    const updatedFavorites = [...favorites, country];
    setFavorites(updatedFavorites);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  };

  const removeFavorite = (countryCode) => {
    const updatedFavorites = favorites.filter((country) => country.cca3 !== countryCode);
    setFavorites(updatedFavorites);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  };

  const toggleFavorite = (country) => {
    const isFavorite = favorites.some((fav) => fav.cca3 === country.cca3);
    
    if (isFavorite) {
      removeFavorite(country.cca3);
    } else {
      addFavorite(country);
    }
  };

  const isFavorite = (countryCode) => {
    return favorites.some((country) => country.cca3 === countryCode);
  };

  return {
    favorites,
    addFavorite,
    removeFavorite,
    toggleFavorite,
    isFavorite
  };
};