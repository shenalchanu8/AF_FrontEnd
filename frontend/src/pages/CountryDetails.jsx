import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Heart, Map, Globe, Users, Home, Calendar, DollarSign } from 'lucide-react';
import Spinner from '../components/Spinner.jsx';
import PageContainer from '../components/PageContainer.jsx';
import { useFavorites } from '../hooks/useFavorites.js';
import { useAuth } from '../contexts/AuthContext.jsx';

function CountryDetails() {
  const { code } = useParams();
  const [country, setCountry] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [borderCountries, setBorderCountries] = useState([]);
  
  const { isAuthenticated } = useAuth();
  const { toggleFavorite, isFavorite } = useFavorites();
  
  useEffect(() => {
    const fetchCountryDetails = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await fetch(`https://restcountries.com/v3.1/alpha/${code}`);
        
        if (!response.ok) {
          throw new Error('Country not found');
        }
        
        const data = await response.json();
        setCountry(data[0]);
        
        // Fetch border countries
        if (data[0].borders && data[0].borders.length > 0) {
          const borderCodes = data[0].borders.join(',');
          const borderResponse = await fetch(`https://restcountries.com/v3.1/alpha?codes=${borderCodes}`);
          
          if (borderResponse.ok) {
            const borderData = await borderResponse.json();
            setBorderCountries(borderData);
          }
        }
        
        setLoading(false);
      } catch (error) {
        setError(error instanceof Error ? error.message : 'An unknown error occurred');
        setLoading(false);
      }
    };

    if (code) {
      fetchCountryDetails();
    }
  }, [code]);

  const handleToggleFavorite = () => {
    if (country) {
      toggleFavorite(country);
    }
  };

  if (loading) {
    return (
      <PageContainer className="min-h-[80vh] flex items-center justify-center">
        <div className="text-center">
          <Spinner size="lg" />
          <p className="mt-4 text-gray-600 dark:text-gray-400">Loading country details...</p>
        </div>
      </PageContainer>
    );
  }
  
  if (error || !country) {
    return (
      <PageContainer>
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-6 text-center">
          <p className="text-red-800 dark:text-red-300 mb-4">{error || 'Country not found'}</p>
          <Link 
            to="/" 
            className="inline-flex items-center px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-md transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to All Countries
          </Link>
        </div>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <Link 
          to="/" 
          className="inline-flex items-center text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to All Countries
        </Link>
        
        {isAuthenticated && (
          <button 
            className={`inline-flex items-center px-4 py-2 rounded-md ${
              isFavorite(country.cca3)
                ? 'bg-rose-100 dark:bg-rose-900/20 text-rose-600 dark:text-rose-400 hover:bg-rose-200 dark:hover:bg-rose-900/30'
                : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
            } transition-colors`}
            onClick={handleToggleFavorite}
          >
            <Heart className={`h-4 w-4 mr-2 ${isFavorite(country.cca3) ? 'fill-rose-600 dark:fill-rose-400' : ''}`} />
            {isFavorite(country.cca3) ? 'Remove from Favorites' : 'Add to Favorites'}
          </button>
        )}
      </div>
      
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden">
        <div className="md:flex">
          <div className="md:flex-shrink-0 md:w-1/2 lg:w-2/5">
            <img 
              src={country.flags.svg} 
              alt={country.flags.alt || `Flag of ${country.name.common}`}
              className="h-56 sm:h-64 md:h-full w-full object-cover"
            />
          </div>
          
          <div className="p-6 md:p-8 md:w-1/2 lg:w-3/5">
            <div className="flex flex-col h-full">
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
                {country.name.common}
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mt-1">{country.name.official}</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-3 mt-6">
                <div className="flex items-start">
                  <Globe className="h-5 w-5 text-primary-600 dark:text-primary-400 mt-0.5 mr-3 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Region</p>
                    <p className="text-gray-900 dark:text-white">{country.region}</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Map className="h-5 w-5 text-primary-600 dark:text-primary-400 mt-0.5 mr-3 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Subregion</p>
                    <p className="text-gray-900 dark:text-white">{country.subregion || 'N/A'}</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Home className="h-5 w-5 text-primary-600 dark:text-primary-400 mt-0.5 mr-3 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Capital</p>
                    <p className="text-gray-900 dark:text-white">{country.capital ? country.capital.join(', ') : 'N/A'}</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Users className="h-5 w-5 text-primary-600 dark:text-primary-400 mt-0.5 mr-3 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Population</p>
                    <p className="text-gray-900 dark:text-white">{country.population.toLocaleString()}</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Calendar className="h-5 w-5 text-primary-600 dark:text-primary-400 mt-0.5 mr-3 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Timezones</p>
                    <p className="text-gray-900 dark:text-white">{country.timezones ? country.timezones.join(', ') : 'N/A'}</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <DollarSign className="h-5 w-5 text-primary-600 dark:text-primary-400 mt-0.5 mr-3 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Currencies</p>
                    <p className="text-gray-900 dark:text-white">
                      {country.currencies
                        ? Object.values(country.currencies)
                            .map(currency => `${currency.name} (${currency.symbol || 'N/A'})`)
                            .join(', ')
                        : 'N/A'}
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="mt-6">
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Languages</p>
                <div className="flex flex-wrap gap-2 mt-2">
                  {country.languages ? (
                    Object.values(country.languages).map(language => (
                      <span 
                        key={language} 
                        className="inline-block px-2 py-1 text-sm bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-md"
                      >
                        {language}
                      </span>
                    ))
                  ) : (
                    <span className="text-gray-600 dark:text-gray-400">N/A</span>
                  )}
                </div>
              </div>
              
              {borderCountries.length > 0 && (
                <div className="mt-8">
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-3">Border Countries</p>
                  <div className="flex flex-wrap gap-2">
                    {borderCountries.map(borderCountry => (
                      <Link
                        key={borderCountry.cca3}
                        to={`/country/${borderCountry.cca3}`}
                        className="inline-flex items-center px-3 py-1.5 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-md text-sm text-gray-800 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
                      >
                        <span className="w-4 h-3 mr-2 bg-cover bg-center rounded-sm" style={{ backgroundImage: `url(${borderCountry.flags.png})` }}></span>
                        {borderCountry.name.common}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </PageContainer>
  );
}

export default CountryDetails;