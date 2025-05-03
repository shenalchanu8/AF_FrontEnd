import React, { useState, useEffect, useRef } from 'react';
import { Search, Filter, X } from 'lucide-react';

/**
 * @param {Object} props
 * @param {string} props.searchTerm
 * @param {(term: string) => void} props.setSearchTerm
 * @param {string} props.selectedRegion
 * @param {(region: string) => void} props.setSelectedRegion
 * @param {string} props.selectedLanguage
 * @param {(language: string) => void} props.setSelectedLanguage
 * @param {string[]} props.regions
 * @param {string[]} props.languages
 */
function SearchFilter({
  searchTerm,
  setSearchTerm,
  selectedRegion,
  setSelectedRegion,
  selectedLanguage,
  setSelectedLanguage,
  regions,
  languages
}) {
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const filtersRef = useRef(null);

  const toggleFilters = () => {
    setIsFiltersOpen(!isFiltersOpen);
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedRegion('');
    setSelectedLanguage('');
  };

  const handleClickOutside = (event) => {
    if (filtersRef.current && !filtersRef.current.contains(event.target)) {
      setIsFiltersOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const hasActiveFilters = searchTerm || selectedRegion || selectedLanguage;

  return (
    <div className="mb-8">
      <div className="flex flex-col sm:flex-row gap-3 mb-2">
        {/* Search Input */}
        <div className="relative flex-grow">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-2.5 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg shadow-sm placeholder-gray-400 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
            placeholder="Search for a country..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {searchTerm && (
            <button
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
              onClick={() => setSearchTerm('')}
              aria-label="Clear search"
            >
              <X className="h-5 w-5" />
            </button>
          )}
        </div>

        {/* Filter Button */}
        <div className="relative" ref={filtersRef}>
          <button
            onClick={toggleFilters}
            className={`flex items-center space-x-2 px-4 py-2.5 rounded-lg border ${
              hasActiveFilters
                ? 'bg-primary-50 dark:bg-primary-900/20 border-primary-200 dark:border-primary-800 text-primary-700 dark:text-primary-300'
                : 'bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300'
            } hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors`}
            aria-expanded={isFiltersOpen}
            aria-haspopup="true"
          >
            <Filter className="h-5 w-5" />
            <span>Filters</span>
            {hasActiveFilters && (
              <span className="flex items-center justify-center w-5 h-5 bg-primary-600 text-white text-xs font-bold rounded-full">
                {(!!selectedRegion ? 1 : 0) + (!!selectedLanguage ? 1 : 0)}
              </span>
            )}
          </button>

          {/* Filters Dropdown */}
          {isFiltersOpen && (
            <div className="absolute right-0 mt-2 w-60 sm:w-72 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-10 overflow-hidden">
              <div className="p-4">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">Filters</h3>
                  <button
                    onClick={clearFilters}
                    className="text-sm text-primary-600 dark:text-primary-400 hover:text-primary-800 dark:hover:text-primary-300"
                    disabled={!hasActiveFilters}
                  >
                    Clear all
                  </button>
                </div>

                <div className="space-y-4">
                  {/* Region Filter */}
                  <div>
                    <label htmlFor="region" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Region
                    </label>
                    <select
                      id="region"
                      className="block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                      value={selectedRegion}
                      onChange={(e) => setSelectedRegion(e.target.value)}
                    >
                      <option value="">All Regions</option>
                      {regions.map((region) => (
                        <option key={region} value={region}>
                          {region}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Language Filter */}
                  <div>
                    <label htmlFor="language" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Language
                    </label>
                    <select
                      id="language"
                      className="block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                      value={selectedLanguage}
                      onChange={(e) => setSelectedLanguage(e.target.value)}
                    >
                      <option value="">All Languages</option>
                      {languages.map((language) => (
                        <option key={language} value={language}>
                          {language}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Active Filters */}
      {hasActiveFilters && (
        <div className="flex flex-wrap gap-2 mt-3">
          {selectedRegion && (
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300">
              Region: {selectedRegion}
              <button
                onClick={() => setSelectedRegion('')}
                className="ml-1.5 text-primary-700 dark:text-primary-300 hover:text-primary-900 dark:hover:text-primary-100"
                aria-label={`Remove ${selectedRegion} filter`}
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </span>
          )}
          {selectedLanguage && (
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300">
              Language: {selectedLanguage}
              <button
                onClick={() => setSelectedLanguage('')}
                className="ml-1.5 text-primary-700 dark:text-primary-300 hover:text-primary-900 dark:hover:text-primary-100"
                aria-label={`Remove ${selectedLanguage} filter`}
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </span>
          )}
        </div>
      )}
    </div>
  );
}

export default SearchFilter;