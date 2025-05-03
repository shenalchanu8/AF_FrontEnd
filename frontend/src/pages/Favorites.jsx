import React from 'react';
import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';
import CountryCard from '../components/CountryCard.jsx';
import PageContainer from '../components/PageContainer.jsx';
import { useFavorites } from '../hooks/useFavorites.js';

function Favorites() {
  const { favorites, toggleFavorite, isFavorite } = useFavorites();

  return (
    <PageContainer>
      <div className="flex items-center gap-3 mb-6">
        <Heart className="h-6 w-6 text-rose-500 fill-rose-500" />
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
          My Favorite Countries
        </h1>
      </div>

      {favorites.length === 0 ? (
        <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-8 text-center">
          <Heart className="h-12 w-12 mx-auto text-gray-300 dark:text-gray-600 mb-4" />
          <h2 className="text-xl font-medium text-gray-700 dark:text-gray-300 mb-2">
            No favorite countries yet
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-md mx-auto">
            Start exploring countries and add them to your favorites to see them here.
          </p>
          <Link 
            to="/" 
            className="inline-flex items-center px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-md transition-colors"
          >
            Explore Countries
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {favorites.map(country => (
            <CountryCard
              key={country.cca3}
              country={country}
              isFavorite={isFavorite(country.cca3)}
              onToggleFavorite={toggleFavorite}
            />
          ))}
        </div>
      )}
    </PageContainer>
  );
}

export default Favorites;