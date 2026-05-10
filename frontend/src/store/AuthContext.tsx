import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  name: string;
  username: string;
  isTestDrive: boolean;
}

interface AuthContextType {
  user: User | null;
  login: (name: string, username: string, isTestDrive?: boolean) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Check localStorage for persisted session
    const persistedName = localStorage.getItem('user_name');
    if (persistedName && !user) {
      setUser({
        name: persistedName,
        username: persistedName.toLowerCase().replace(/\s/g, '_'),
        isTestDrive: false,
      });
    }
  }, []);

  const login = (name: string, username: string, isTestDrive = false) => {
    const newUser = { name, username, isTestDrive };
    setUser(newUser);
    
    if (!isTestDrive) {
      localStorage.setItem('user_name', name);
      localStorage.setItem('user_token', 'mock_token_' + Date.now());
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user_name');
    localStorage.removeItem('user_token');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
