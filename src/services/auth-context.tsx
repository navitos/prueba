'use client';
import { createContext, useState, useEffect, ReactNode, useContext } from 'react';

interface AuthContextType {
  isLoggedIn: boolean;
  userId: number | null; 
  userName: string;
  userEmail: string;
  userAvatar: string;
  login: (token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState<number | null>(null);  // Estado para almacenar el userId
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userAvatar, setUserAvatar] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      fetchProfile(token);
    }
  }, []);

  const fetchProfile = async (token: string) => {
    try {
      const response = await fetch('https://gratus-backend-u73y.onrender.com/api/users/profile', {
        method: 'GET',
        headers: { 'Authorization': `Bearer ${token}` },
      });
      if (response.ok) {
        const data = await response.json();
        setUserId(data.id);  // Almacenamos el userId
        setUserName(data.name);
        setUserEmail(data.email);
        setUserAvatar(data.avatar || '/placeholder.svg');
        setIsLoggedIn(true);
        console.log("User ID fetched:", data.id);
      } else {
        setIsLoggedIn(false);
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
      setIsLoggedIn(false);
    }
  };

  const login = (token: string) => {
    localStorage.setItem('token', token);
    fetchProfile(token);
  };

  const logout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    setUserId(null);  
    setUserName('');
    setUserEmail('');
    setUserAvatar('');
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, userId, userName, userEmail, userAvatar, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
