import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  name: string;
  username: string;
  isTestDrive: boolean;
  sessionId?: string;
}

interface AuthContextType {
  user: User | null;
  login: (name: string, username: string, isTestDrive?: boolean, sessionId?: string) => void;
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

  useEffect(() => {
    const handleUnload = () => {
      if (user?.isTestDrive && user?.sessionId) {
        const apiUrl = import.meta.env.PROD ? '' : 'http://localhost:5000';
        fetch(`${apiUrl}/api/test-drives/${user.sessionId}/end`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ status: 'CLOSED' }),
          keepalive: true
        }).catch(console.error);
      }
    };

    window.addEventListener('beforeunload', handleUnload);
    return () => window.removeEventListener('beforeunload', handleUnload);
  }, [user]);

  const login = (name: string, username: string, isTestDrive = false, sessionId?: string) => {
    const newUser = { name, username, isTestDrive, sessionId };
    setUser(newUser);
    
    if (!isTestDrive) {
      localStorage.setItem('user_name', name);
      localStorage.setItem('user_token', 'mock_token_' + Date.now());
    }
  };

  const logout = async () => {
    if (user?.isTestDrive && user?.sessionId) {
      try {
        const apiUrl = import.meta.env.PROD ? '' : 'http://localhost:5000';
        await fetch(`${apiUrl}/api/test-drives/${user.sessionId}/end`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ status: 'LOGGED_OUT' }),
        });
      } catch (err) {
        console.error('Failed to end test drive session:', err);
      }
    }

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
