'use client';
import React, { createContext, useContext, useMemo, useState, useEffect } from 'react';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import createMyTheme from '@/theme';

type ColorMode = 'light' | 'dark';

interface ColorModeContextType {
  mode: ColorMode;
  toggleColorMode: () => void;
}

const ColorModeContext = createContext<ColorModeContextType>({
  mode: 'light',
  toggleColorMode: () => { },
});

export const useColorMode = () => useContext(ColorModeContext);

interface ThemeRegistryProps {
  children: React.ReactNode;
}

export const ThemeRegistry = ({ children }: ThemeRegistryProps) => {
  const [mode, setMode] = useState<ColorMode>('light');

  useEffect(() => {
    const savedMode = localStorage.getItem('themeMode') as ColorMode | null;
    if (savedMode) {
      setTimeout(() => {
        setMode(savedMode);
      }, 0);
    } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setTimeout(() => {
        setMode('dark');
      }, 0);
    }
  }, []);

  const colorMode = useMemo(
    () => ({
      mode,
      toggleColorMode: () => {
        setMode((prevMode) => {
          const newMode = prevMode === 'light' ? 'dark' : 'light';
          localStorage.setItem('themeMode', newMode);
          return newMode;
        });
      },
    }),
    [mode]
  );

  const theme = useMemo(() => createMyTheme(mode), [mode]);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <AppRouterCacheProvider options={{ key: 'css' }}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          {children}
        </ThemeProvider>
      </AppRouterCacheProvider>
    </ColorModeContext.Provider>
  );
};

export default ThemeRegistry;
