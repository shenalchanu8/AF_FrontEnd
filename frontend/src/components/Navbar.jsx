import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Globe, Heart, LogIn, LogOut, Menu, Moon, Sun, User } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext.jsx';
import { useTheme } from '../contexts/ThemeContext.jsx';

function Navbar() {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-white/90 dark:bg-gray-900/90 shadow-sm transition-colors duration-300">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Brand */}
          <Link 
            to="/" 
            className="flex items-center space-x-2 text-primary-600 dark:text-primary-400"
            onClick={closeMenu}
          >
            <Globe className="h-6 w-6" />
            <span className="font-bold text-lg">Explore the World</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link 
              to="/" 
              className={`nav-link ${isActive('/') ? 'text-primary-600 dark:text-primary-400' : 'text-gray-700 dark:text-gray-300'}`}
            >
              Home
            </Link>
            
            {user && (
              <Link 
                to="/favorites" 
                className={`nav-link ${isActive('/favorites') ? 'text-primary-600 dark:text-primary-400' : 'text-gray-700 dark:text-gray-300'}`}
              >
                <div className="flex items-center space-x-1">
                  <Heart className="h-4 w-4" />
                  <span>Favorites</span>
                </div>
              </Link>
            )}
            
            {/* Theme Toggle */}
            <button 
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
            >
              {theme === 'light' ? (
                <Moon className="h-5 w-5 text-gray-700" />
              ) : (
                <Sun className="h-5 w-5 text-yellow-300" />
              )}
            </button>
            
            {user ? (
              <div className="flex items-center space-x-4">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  {user.username}
                </span>
                <button 
                  onClick={logout}
                  className="flex items-center space-x-1 text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link 
                  to="/login" 
                  className="flex items-center space-x-1 text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400"
                >
                  <LogIn className="h-4 w-4" />
                  <span>Login</span>
                </Link>
                <Link 
                  to="/signup" 
                  className="flex items-center space-x-1 bg-primary-600 hover:bg-primary-700 text-white px-3 py-1.5 rounded-md transition-colors"
                >
                  <User className="h-4 w-4" />
                  <span>Sign Up</span>
                </Link>
              </div>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2 rounded-md text-gray-700 dark:text-gray-300"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-900 shadow-md transition-all">
          <div className="container mx-auto px-4 py-3 space-y-3">
            <Link 
              to="/" 
              className={`block py-2 px-3 rounded-md ${isActive('/') ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400' : 'text-gray-700 dark:text-gray-300'}`}
              onClick={closeMenu}
            >
              Home
            </Link>
            
            {user && (
              <Link 
                to="/favorites" 
                className={`block py-2 px-3 rounded-md ${isActive('/favorites') ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400' : 'text-gray-700 dark:text-gray-300'}`}
                onClick={closeMenu}
              >
                <div className="flex items-center space-x-2">
                  <Heart className="h-4 w-4" />
                  <span>Favorites</span>
                </div>
              </Link>
            )}
            
            <div className="flex items-center justify-between py-2 px-3">
              <span className="text-gray-700 dark:text-gray-300">Theme</span>
              <button 
                onClick={toggleTheme}
                className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
                aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
              >
                {theme === 'light' ? (
                  <Moon className="h-5 w-5 text-gray-700" />
                ) : (
                  <Sun className="h-5 w-5 text-yellow-300" />
                )}
              </button>
            </div>
            
            {user ? (
              <div className="pt-2 border-t border-gray-200 dark:border-gray-700">
                <p className="px-3 py-1 text-sm text-gray-600 dark:text-gray-400">
                  Signed in as <span className="font-medium text-gray-900 dark:text-white">{user.username}</span>
                </p>
                <button 
                  onClick={() => {
                    logout();
                    closeMenu();
                  }}
                  className="w-full text-left py-2 px-3 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  <div className="flex items-center space-x-2">
                    <LogOut className="h-4 w-4" />
                    <span>Logout</span>
                  </div>
                </button>
              </div>
            ) : (
              <div className="pt-2 border-t border-gray-200 dark:border-gray-700 space-y-2">
                <Link 
                  to="/login" 
                  className="block py-2 px-3 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                  onClick={closeMenu}
                >
                  <div className="flex items-center space-x-2">
                    <LogIn className="h-4 w-4" />
                    <span>Login</span>
                  </div>
                </Link>
                <Link 
                  to="/signup" 
                  className="block py-2 px-3 rounded-md bg-primary-600 hover:bg-primary-700 text-white"
                  onClick={closeMenu}
                >
                  <div className="flex items-center space-x-2">
                    <User className="h-4 w-4" />
                    <span>Sign Up</span>
                  </div>
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}

export default Navbar;