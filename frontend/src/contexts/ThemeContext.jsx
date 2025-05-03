import React, { createContext, useState, useContext, useEffect } from 'react';

/**
 * @typedef {import('../types.js').ThemeMode} ThemeMode
 */

/**
 * @typedef {Object} ThemeContextType
 * @property {ThemeMode} theme
 * @property {() => void} toggleTheme
 */

/** @type {ThemeContextType} */
const defaultThemeContext = {
  theme: 'light',
  toggleTheme: () => {},
};

const ThemeContext = createContext(defaultThemeContext);

export const useTheme = () => useContext(ThemeContext);

/**
 * @param {Object} props
 * @param {React.ReactNode} props.children
 */
export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme || 
      (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  });
  
  useEffect(() => {
    // Update the data-theme attribute on document when theme changes
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(theme);
    localStorage.setItem('theme', theme);
  }, [theme]);
  
  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  };
  
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}