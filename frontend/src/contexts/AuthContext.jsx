import React, { createContext, useState, useContext, useEffect } from 'react';

/**
 * @typedef {import('../types.js').User} User
 */

/**
 * @typedef {Object} AuthContextType
 * @property {User | null} user
 * @property {(username: string, password: string) => void} login
 * @property {() => void} logout
 * @property {boolean} isAuthenticated
 */

/** @type {AuthContextType} */
const defaultAuthContext = {
  user: null,
  login: () => {},
  logout: () => {},
  isAuthenticated: false,
};

const AuthContext = createContext(defaultAuthContext);

export const useAuth = () => useContext(AuthContext);

/**
 * @param {Object} props
 * @param {React.ReactNode} props.children
 */
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  
  useEffect(() => {
    // Check if user is already logged in
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const username = localStorage.getItem('username');
    
    if (isLoggedIn && username) {
      setUser({ username, isLoggedIn: true });
    }
  }, []);
  
  const login = (username, password) => {
    // In a real application, you would validate credentials with an API
    // For this demo, we'll accept any non-empty username and password
    if (username && password) {
      const user = { username, isLoggedIn: true };
      setUser(user);
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('username', username);
    }
  };
  
  const logout = () => {
    setUser(null);
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('username');
    localStorage.removeItem('favorites');
  };
  
  return (
    <AuthContext.Provider value={{ 
      user, 
      login, 
      logout, 
      isAuthenticated: !!user 
    }}>
      {children}
    </AuthContext.Provider>
  );
}