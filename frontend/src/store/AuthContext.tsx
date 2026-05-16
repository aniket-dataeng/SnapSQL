import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  name: string;
  username: string;
  isTestDrive: boolean;
  sessionId?: string;
  points: number;
  streak: number;
  courses_enrolled: string[];
}

interface AuthContextType {
  user: User | null;
  login: (name: string, username: string, isTestDrive?: boolean, sessionId?: string, points?: number, streak?: number, courses_enrolled?: string[]) => void;
  updateUser: (data: Partial<User>) => void;
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
        points: parseInt(localStorage.getItem('user_points') || '0'),
        streak: parseInt(localStorage.getItem('user_streak') || '0'),
        courses_enrolled: JSON.parse(localStorage.getItem('user_courses') || '[]'),
      });
    }
  }, []);

  useEffect(() => {
    // If it's a test drive user, refresh their data from Firestore
    const refreshUserData = async () => {
      if (user?.isTestDrive && user?.sessionId) {
        try {
          const apiUrl = import.meta.env.PROD ? '' : 'http://localhost:5000';
          const response = await fetch(`${apiUrl}/api/test-drives/${user.sessionId}`);
          if (response.ok) {
            const data = await response.json();
            setUser(prev => prev ? ({
              ...prev,
              points: data.points || 0,
              streak: data.streak || 0,
              courses_enrolled: data.courses_enrolled || []
            }) : null);
          }
        } catch (err) {
          console.error('Failed to refresh user data:', err);
        }
      }
    };

    if (user?.isTestDrive) {
      refreshUserData();
      // Polling for updates every 30 seconds if active
      const interval = setInterval(refreshUserData, 10000);
      return () => clearInterval(interval);
    }
  }, [user?.sessionId]);

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

  const login = (name: string, username: string, isTestDrive = false, sessionId?: string, points = 0, streak = 0, courses_enrolled: string[] = []) => {
    const newUser = { name, username, isTestDrive, sessionId, points, streak, courses_enrolled };
    setUser(newUser);
    
    if (!isTestDrive) {
      localStorage.setItem('user_name', name);
      localStorage.setItem('user_points', points.toString());
      localStorage.setItem('user_streak', streak.toString());
      localStorage.setItem('user_courses', JSON.stringify(courses_enrolled));
      localStorage.setItem('user_token', 'mock_token_' + Date.now());
    }
  };

  const updateUser = (data: Partial<User>) => {
    setUser(prev => {
      if (!prev) return null;
      const updated = { ...prev, ...data };
      if (!updated.isTestDrive) {
        if (data.points !== undefined) localStorage.setItem('user_points', updated.points.toString());
        if (data.streak !== undefined) localStorage.setItem('user_streak', updated.streak.toString());
        if (data.courses_enrolled !== undefined) localStorage.setItem('user_courses', JSON.stringify(updated.courses_enrolled));
      }
      return updated;
    });
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
    <AuthContext.Provider value={{ user, login, logout, updateUser }}>
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
