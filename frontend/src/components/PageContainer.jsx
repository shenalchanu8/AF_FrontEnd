import React from 'react';

/**
 * @param {Object} props
 * @param {React.ReactNode} props.children
 * @param {string} [props.title]
 * @param {string} [props.className]
 */
function PageContainer({ children, title, className = '' }) {
  return (
    <main className={`container mx-auto px-4 py-6 sm:py-8 ${className}`}>
      {title && (
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-6">
          {title}
        </h1>
      )}
      {children}
    </main>
  );
}

export default PageContainer;