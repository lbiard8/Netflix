import { createContext, useContext, useState} from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('netflix_user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const [loading, setLoading] = useState(false);

  const login = async (email, password) => {
    try {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1000));

      const mockUser = {
        id: Date.now(),
        email: email,
        name: email.split('@')[0],
        avatar: `https://ui-avatars.com/api/?name=${email}&background=e50914&color=fff`
      };

      setUser(mockUser);
      localStorage.setItem('netflix_user', JSON.stringify(mockUser));

      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  const register = async (name, email, password) => {
    try {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1000));

      const mockUser = {
        id: Date.now(),
        email: email,
        name: name,
        avatar: `https://ui-avatars.com/api/?name=${name}&background=e50914&color=fff`
      };

      setUser(mockUser);
      localStorage.setItem('netflix_user', JSON.stringify(mockUser));

      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('netflix_user');
  };

  const isAuthenticated = () => { 
    return !!user; 
  };

  const updateProfile = (updates) => {
    const updatedUser = { ...user, ...updates }; 
    
    setUser(updatedUser);
    localStorage.setItem('netflix_user', JSON.stringify(updatedUser));
  };

  const value = { user, loading, login, register, logout, isAuthenticated, updateProfile };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
}