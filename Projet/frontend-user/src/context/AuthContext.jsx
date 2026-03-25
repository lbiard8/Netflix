import { createContext, useContext, useState} from 'react';
import { authAPI, saveAuth, clearAuth, getUser } from '../services/api';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => getUser());

  const login = async (credentials) => {
    try {
      const data = await authAPI.login(credentials);
      if (data.success) {
        saveAuth(data.token, data.user);
        setUser(data.user);
        return { success: true };
      }
      return { success: false, error: data.message || "Identifiants invalides" };
    } catch (error) {
      return { success: false, error: error.message || "Erreur de connexion" };
    }
  };

  const register = async (userData) => {
    try {
      const data = await authAPI.register(userData);
      if (data.success) {
        saveAuth(data.token, data.user);
        setUser(data.user);
        return { success: true };
      }
      return { success: false, error: data.message || "Erreur d'inscription" };
    } catch (error) {
      return { success: false, error: error.message };
    } 
  };

  const logout = () => {
    clearAuth();
    setUser(null);
  };

  const isAuthenticated = () => !!user;

  const updateProfile = async (updates) => {
    try {
      const data = await authAPI.updateProfile(updates);
      if (data.success) {
        const updatedUser = { ...user, ...data.user };
        localStorage.setItem('user', JSON.stringify(updatedUser));
        setUser(updatedUser);
        return { success: true };
      }
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const changePassword = async (passwords) => {
    try {
      const data = await authAPI.changePassword(passwords);
      return { success: true, message: data.message };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const value = { 
    user, 
    login, 
    register, 
    logout, 
    isAuthenticated, 
    updateProfile,
    changePassword 
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
}