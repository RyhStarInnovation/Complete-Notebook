import React, { createContext, useContext, useEffect, useState } from 'react';

export type ThemeMode = 'dark' | 'light';

interface ThemeContextValue {
  theme: ThemeMode;
  setTheme: (mode: ThemeMode) => void;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);
const STORAGE_KEY = 'complete_notebook_theme';

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<ThemeMode>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved === 'light' || saved === 'dark') {
        return saved;
      }
    } catch {
      // Ignore storage error in restricted environments
    }
    // Confirmed default: Midnight-Blue Dark Mode
    return 'dark';
  });

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
      document.body.className =
        'bg-[#060B16] text-slate-100 antialiased selection:bg-sky-500/30 selection:text-sky-100';
    } else {
      root.classList.remove('dark');
      document.body.className =
        'bg-slate-50 text-slate-900 antialiased selection:bg-blue-600/20 selection:text-blue-950';
    }

    try {
      localStorage.setItem(STORAGE_KEY, theme);
    } catch {
      // Ignore storage error
    }
  }, [theme]);

  const setTheme = (mode: ThemeMode) => setThemeState(mode);
  const toggleTheme = () => setThemeState((prev) => (prev === 'dark' ? 'light' : 'dark'));

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error('useTheme must be used inside ThemeProvider');
  }
  return ctx;
}
