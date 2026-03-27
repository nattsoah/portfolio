'use client';
import { createTheme, ThemeOptions } from '@mui/material/styles';

// Extend the TypeText interface to include custom text colors
declare module '@mui/material/styles' {
  interface TypeText {
    dark?: string;
    light?: string;
  }
}

export const getThemeOptions = (mode: 'light' | 'dark'): ThemeOptions => ({
  palette: {
    mode,
    primary: {
      main: mode === 'light' ? '#0f172a' : '#94a3b8', // Slate 900 : Slate 400
    },
    secondary: {
      main: mode === 'light' ? '#64748b' : '#94a3b8', // Slate 500 : Slate 400
    },
    background: {
      default: mode === 'light' ? '#ffffff' : '#0f172a', // White : Slate 900
      paper: mode === 'light' ? '#f8fafc' : '#1e293b',   // Slate 50 : Slate 800
    },
    text: {
      primary: mode === 'light' ? '#0f172a' : '#f8fafc', // Slate 900 : Slate 50
      secondary: mode === 'light' ? '#475569' : '#94a3b8', // Slate 600 : Slate 400
      dark: '#0f172a',
      light: '#f8fafc',
    },
    divider: mode === 'light' ? '#e2e8f0' : '#334155', // Slate 200 : Slate 700
  },
  typography: {
    fontFamily: 'var(--font-geist-sans), Inter, sans-serif',
    h1: {
      fontSize: '2.5rem',
      fontWeight: 700,
      letterSpacing: '-0.02em',
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 700,
      letterSpacing: '-0.01em',
    },
    h3: {
      fontSize: '1.5rem',
      fontWeight: 600,
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.6,
    },
    button: {
      textTransform: 'none',
      fontWeight: 600,
    },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          padding: '8px 20px',
          boxShadow: 'none',
          '&:hover': {
            boxShadow: 'none',
          },
        },
      },
    },
    MuiPaper: {
      defaultProps: {
        elevation: 0,
      },
      styleOverrides: {
        root: {
          border: '1px solid',
          borderColor: mode === 'light' ? '#e2e8f0' : '#334155',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: mode === 'light' ? 'rgba(255, 255, 255, 0.8)' : 'rgba(15, 23, 42, 0.8)',
          color: mode === 'light' ? '#0f172a' : '#f8fafc',
        }
      }
    }
  },
});

const theme = (mode: 'light' | 'dark') => createTheme(getThemeOptions(mode));

export default theme;
