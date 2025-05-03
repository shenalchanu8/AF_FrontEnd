import React from 'react';
import { Link } from 'react-router-dom';
import { Home } from 'lucide-react';
import PageContainer from '../components/PageContainer.jsx';

function NotFound() {
  return (
    <PageContainer className="flex flex-col items-center justify-center min-h-[70vh] text-center">
      <h1 className="text-9xl font-bold text-primary-200 dark:text-primary-900">404</h1>
      <h2 className="mt-8 text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
        Page Not Found
      </h2>
      <p className="mt-4 text-gray-600 dark:text-gray-400 max-w-md">
        The page you are looking for doesn't exist or has been moved.
      </p>
      <Link 
        to="/" 
        className="mt-8 inline-flex items-center px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-md transition-colors"
      >
        <Home className="h-4 w-4 mr-2" />
        Back to Home
      </Link>
    </PageContainer>
  );
}

export default NotFound;