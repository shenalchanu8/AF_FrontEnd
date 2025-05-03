import React, { useState, useEffect } from 'react';
import CountryCard from '../components/CountryCard.jsx';
import SearchFilter from '../components/SearchFilter.jsx';
import Spinner from '../components/Spinner.jsx';
import PageContainer from '../components/PageContainer.jsx';
import { useFavorites } from '../hooks/useFavorites.js';
import { Globe, Search, MapPin, Languages, ChevronDown } from 'lucide-react';

function Home() {
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('');
  
  const [regions, setRegions] = useState([]);
  const [languages, setLanguages] = useState([]);
  
  const { toggleFavorite, isFavorite } = useFavorites();

  useEffect(() => {
    const fetchAllCountries = async () => {
      try {
        setLoading(true);
        const response = await fetch('https://restcountries.com/v3.1/all');
        
        if (!response.ok) {
          throw new Error('Failed to fetch countries');
        }
        
        const data = await response.json();
        setCountries(data);
        setFilteredCountries(data);
        
        // Extract unique regions
        const uniqueRegions = [...new Set(data.map(country => country.region))].filter(Boolean).sort();
        setRegions(uniqueRegions);
        
        // Extract unique languages
        const allLanguages = [];
        data.forEach(country => {
          if (country.languages) {
            Object.values(country.languages).forEach(language => {
              if (!allLanguages.includes(language)) {
                allLanguages.push(language);
              }
            });
          }
        });
        setLanguages(allLanguages.sort());
        
        setLoading(false);
      } catch (error) {
        setError(error instanceof Error ? error.message : 'An unknown error occurred');
        setLoading(false);
      }
    };

    fetchAllCountries();
  }, []);

  useEffect(() => {
    // Filter countries based on search term, region, and language
    let result = countries;
    
    if (searchTerm) {
      result = result.filter(country => 
        country.name.common.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    if (selectedRegion) {
      result = result.filter(country => country.region === selectedRegion);
    }
    
    if (selectedLanguage) {
      result = result.filter(country => {
        if (!country.languages) return false;
        return Object.values(country.languages).some(
          language => language === selectedLanguage
        );
      });
    }
    
    setFilteredCountries(result);
  }, [countries, searchTerm, selectedRegion, selectedLanguage]);

  if (loading) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center w-full">
        <div className="text-center">
          <Spinner size="lg" />
          <p className="mt-4 text-gray-600 dark:text-gray-400">Loading countries...</p>
        </div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="w-full">
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 text-red-800 dark:text-red-300">
          <p>{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-2 text-sm font-medium text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300"
          >
            Try again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 dark:bg-gray-900 w-full">
      {/* Beautiful Hero Image Section */}
      <div className="relative w-full h-[400px] sm:h-[500px] overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1483728642387-6c3bdd6c93e5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
          alt="Beautiful world landscape"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-50 dark:from-gray-900 via-transparent to-transparent" />
        <div className="absolute inset-0 flex items-end justify-center pb-16">
          <div className="text-center px-4 max-w-4xl">
            <h1 className="text-4xl font-bold text-white sm:text-5xl lg:text-6xl mb-4 drop-shadow-lg">
              Discover Our World
            </h1>
            <p className="text-xl text-gray-200 sm:text-2xl max-w-3xl mx-auto drop-shadow-md">
              Explore the rich diversity of countries, cultures, and landscapes
            </p>
          </div>
        </div>
      </div>

      {/* Content Section Below Hero Image */}
      <div className="relative bg-white dark:bg-gray-900 w-full py-12 sm:py-16">
        <div className="mx-auto px-6 lg:px-8 w-full max-w-4xl text-center">
          <div className="inline-flex items-center justify-center rounded-full bg-primary-100 dark:bg-primary-900/30 px-4 py-2.5 text-sm font-medium text-primary-700 dark:text-primary-400 ring-1 ring-inset ring-primary-200 dark:ring-primary-800 mb-6">
            Explore the world's diversity
          </div>
          
          <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
            Comprehensive information about every country, including flags, population data, languages, and more. 
            Perfect for travelers, students, and geography enthusiasts.
          </p>
          
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <a 
              href="#explore" 
              className="flex items-center rounded-md bg-primary-600 px-4 py-3 text-sm font-semibold text-white shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
            >
              Start Exploring
              <ChevronDown className="ml-2 h-4 w-4" />
            </a>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-gray-50 dark:bg-gray-800 py-12 sm:py-16 w-full">
        <div className="mx-auto px-6 lg:px-8 w-full">
          <div className="mx-auto w-full">
            <div className="text-center">
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
                Global Data at Your Fingertips
              </h2>
              <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
                Our comprehensive database covers every recognized country in the world
              </p>
            </div>
            
            <dl className="mt-16 grid grid-cols-1 gap-8 overflow-hidden rounded-2xl bg-white dark:bg-gray-900/50 text-center sm:grid-cols-3 w-full">
              <div className="flex flex-col p-8">
                <dt className="text-sm font-semibold leading-6 text-gray-600 dark:text-gray-400 flex items-center justify-center gap-2">
                  <Globe className="h-5 w-5 text-primary-600" />
                  Countries
                </dt>
                <dd className="order-first text-3xl font-semibold tracking-tight text-gray-900 dark:text-white">
                  {countries.length}+
                </dd>
              </div>
              
              <div className="flex flex-col p-8">
                <dt className="text-sm font-semibold leading-6 text-gray-600 dark:text-gray-400 flex items-center justify-center gap-2">
                  <MapPin className="h-5 w-5 text-primary-600" />
                  Regions
                </dt>
                <dd className="order-first text-3xl font-semibold tracking-tight text-gray-900 dark:text-white">
                  {regions.length}
                </dd>
              </div>
              
              <div className="flex flex-col p-8">
                <dt className="text-sm font-semibold leading-6 text-gray-600 dark:text-gray-400 flex items-center justify-center gap-2">
                  <Languages className="h-5 w-5 text-primary-600" />
                  Languages
                </dt>
                <dd className="order-first text-3xl font-semibold tracking-tight text-gray-900 dark:text-white">
                  {languages.length}+
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div id="explore" className="relative z-10 bg-transparent w-full">
        <div className="mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 sm:p-8 ring-1 ring-gray-900/5 dark:ring-gray-700 w-full">
            <SearchFilter
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              selectedRegion={selectedRegion}
              setSelectedRegion={setSelectedRegion}
              selectedLanguage={selectedLanguage}
              setSelectedLanguage={setSelectedLanguage}
              regions={regions}
              languages={languages}
            />
            
            {filteredCountries.length === 0 ? (
              <div className="bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-lg p-8 text-center mt-8 w-full">
                <p className="text-gray-600 dark:text-gray-400 mb-2">No countries match your search criteria.</p>
                <button 
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedRegion('');
                    setSelectedLanguage('');
                  }}
                  className="text-primary-600 dark:text-primary-400 hover:text-primary-800 dark:hover:text-primary-300 font-medium"
                >
                  Clear all filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-8 w-full">
                {filteredCountries.map(country => (
                  <CountryCard
                    key={country.cca3}
                    country={country}
                    isFavorite={isFavorite(country.cca3)}
                    onToggleFavorite={toggleFavorite}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;