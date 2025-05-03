import React from 'react';
import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext.jsx';

/**
 * @param {Object} props
 * @param {import('../types.js').Country} props.country
 * @param {boolean} props.isFavorite
 * @param {(country: import('../types.js').Country) => void} props.onToggleFavorite
 */
function CountryCard({ country, isFavorite, onToggleFavorite }) {
  const { isAuthenticated } = useAuth();
  
  return (
    <div className="group h-full">
      <div className="h-full overflow-hidden rounded-lg bg-white dark:bg-gray-800 shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 dark:shadow-gray-900/30">
        <div className="relative">
          <img 
            src={country.flags.png} 
            alt={country.flags.alt || `Flag of ${country.name.common}`}
            className="h-40 w-full object-cover"
            loading="lazy"
          />
          
          {isAuthenticated && (
            <button 
              className={`absolute top-3 right-3 p-2 rounded-full ${
                isFavorite 
                  ? 'bg-rose-500 text-white' 
                  : 'bg-white/80 dark:bg-gray-800/80 text-gray-700 dark:text-gray-300'
              } hover:scale-110 transition-all duration-200 focus:outline-none`}
              onClick={(e) => {
                e.preventDefault();
                onToggleFavorite(country);
              }}
              aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
              title={isFavorite ? "Remove from favorites" : "Add to favorites"}
            >
              <Heart className={`h-4 w-4 ${isFavorite ? 'fill-white' : ''}`} />
            </button>
          )}
        </div>
        
        <div className="p-4">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 line-clamp-1">
            {country.name.common}
          </h3>
          
          <div className="space-y-1 mb-4">
            <p className="text-sm text-gray-600 dark:text-gray-300 flex justify-between">
              <span className="font-medium">Region:</span>
              <span>{country.region}</span>
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-300 flex justify-between">
              <span className="font-medium">Capital:</span>
              <span>{country.capital ? country.capital.join(', ') : 'N/A'}</span>
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-300 flex justify-between">
              <span className="font-medium">Population:</span>
              <span>{country.population.toLocaleString()}</span>
            </p>
          </div>
          
          <Link 
            to={`/country/${country.cca3}`} 
            className="block w-full text-center px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-md transition-colors duration-200"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
}

export default CountryCard;