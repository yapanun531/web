'use client';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { createContext, useEffect, useState } from 'react';
import app from '@/app/_firebase/Config';

export const AuthContext = createContext({
  email: '',
  displayName: '',
});

export const AuthContextProvider = ({ children }: { children: React.ReactNode }) => {
  const auth = getAuth(app);
  const [userInfo, setUserInfo] = useState({
    email: '',
    displayName: '',
  });

  const unsub = onAuthStateChanged(auth, (user) => {
    if (user) {
      setUserInfo({
        email: user.email ? user.email : '',
        displayName: user.displayName ? user.displayName : '',
      });
    } else {
      setUserInfo({
        email: '',
        displayName: '',
      });
    }
  });

  useEffect(() => {
    return () => {
      unsub();
    };
  }, [unsub]);
  

  return <AuthContext.Provider value={userInfo}>{children}</AuthContext.Provider>;
};
