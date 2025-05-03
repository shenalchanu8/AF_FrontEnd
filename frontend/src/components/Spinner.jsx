import React from 'react';

/**
 * @param {Object} props
 * @param {'sm' | 'md' | 'lg'} [props.size]
 * @param {'primary' | 'white'} [props.color]
 */
function Spinner({ size = 'md', color = 'primary' }) {
  const sizeClasses = {
    sm: 'h-4 w-4 border-2',
    md: 'h-8 w-8 border-3',
    lg: 'h-12 w-12 border-4',
  };

  const colorClasses = {
    primary: 'border-primary-200 dark:border-primary-900 border-t-primary-600 dark:border-t-primary-400',
    white: 'border-gray-200 border-t-white',
  };

  return (
    <div className="flex justify-center items-center">
      <div
        className={`animate-spin rounded-full ${sizeClasses[size]} ${colorClasses[color]}`}
        role="status"
        aria-label="Loading"
      >
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
}

export default Spinner;