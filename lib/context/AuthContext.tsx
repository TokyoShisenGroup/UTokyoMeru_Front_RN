import React, { createContext, useContext, useState, useEffect } from 'react';
import storageApi from '@/lib/storageApi';

interface AuthContextType {
  isLoggedIn: boolean;
  setIsLoggedIn: (value: boolean) => void;
  checkLoginStatus: () => Promise<void>;
  // userToken: string | null;
  // getToken: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [userToken, setUserToken] = useState<string | null>(null);

  const checkLoginStatus = async () => {
    const status = await storageApi.isLoggedIn();
    setIsLoggedIn(status);
  };

  // const getToken = async () => {
  //   const userinfo = await storageApi.getUserInfo();
  //   setUserToken(userinfo?.token || null);
  // };

  useEffect(() => {
    checkLoginStatus();
    // getToken();
  }, []);

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, checkLoginStatus }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
