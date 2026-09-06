import React, { createContext, useContext, useState, useEffect } from 'react';
import { AuthService, StorageService } from '../services/storage';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => AuthService.getCurrentUser());

  useEffect(() => {
    StorageService.init();
    setUser(AuthService.getCurrentUser());
  }, []);

  const login = (email, password) => {
    const res = AuthService.login(email, password);
    if (res.success) {
      setUser(res.user);
    }
    return res;
  };

  const register = (studentData) => {
    const res = AuthService.register(studentData);
    if (res.success) {
      setUser(res.user);
    }
    return res;
  };

  const useDemoAccount = () => {
    const session = AuthService.useDemoAccount();
    setUser(session);
    return session;
  };

  const logout = () => {
    AuthService.logout();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, useDemoAccount, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
