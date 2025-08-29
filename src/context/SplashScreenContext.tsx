
'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

type SplashScreenContextType = {
  isAppLoading: boolean;
  setIsAppLoading: (isLoading: boolean) => void;
};

const SplashScreenContext = createContext<SplashScreenContextType | undefined>(undefined);

export const SplashScreenProvider = ({ children }: { children: ReactNode }) => {
  const [isAppLoading, setIsAppLoading] = useState(true);

  return (
    <SplashScreenContext.Provider value={{ isAppLoading, setIsAppLoading }}>
      {children}
    </SplashScreenContext.Provider>
  );
};

export const useSplashScreen = () => {
  const context = useContext(SplashScreenContext);
  if (context === undefined) {
    throw new Error('useSplashScreen must be used within a SplashScreenProvider');
  }
  return context;
};
