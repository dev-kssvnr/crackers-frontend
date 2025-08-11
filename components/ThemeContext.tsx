'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

export type FestivalTheme = 'normal' | 'diwali';

interface ThemeContextType {
  theme: FestivalTheme;
  setTheme: (theme: FestivalTheme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<FestivalTheme>('normal');
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider');
  return ctx;
} 