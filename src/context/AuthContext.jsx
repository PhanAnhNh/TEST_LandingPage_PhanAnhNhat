import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    setIsLoggedIn(!!token);
  }, []);

  const login = (token, userData) => {
    localStorage.setItem('access_token', token);
    setIsLoggedIn(true);
    setUser(userData);
    window.dispatchEvent(new CustomEvent('authChange'));
  };

  const logout = () => {
    localStorage.removeItem('access_token');
    setIsLoggedIn(false);
    setUser(null);
    window.dispatchEvent(new CustomEvent('authChange'));
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};