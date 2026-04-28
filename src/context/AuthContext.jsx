import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // null if not logged in
  const [role, setRole] = useState(null); // 'voter', 'admin', 'officer'
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Mock functions
  const loginVoter = (details) => {
    setUser({ id: 'VOTER123', name: 'Raj Kumar', ...details });
    setRole('voter');
    setIsAuthenticated(true);
  };

  const loginAdmin = () => {
    setUser({ id: 'ADMIN01', name: 'System Admin' });
    setRole('admin');
    setIsAuthenticated(true);
  };

  const logout = () => {
    setUser(null);
    setRole(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ user, role, isAuthenticated, loginVoter, loginAdmin, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
