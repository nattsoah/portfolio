'use client';
import { createTheme, ThemeOptions } from '@mui/material/styles';

// Extend MUI theme interfaces to support custom typography and background keys
declare module '@mui/material/styles' {
  interface TypeText {
    dark?: string;
    light?: string;
  }
  interface TypeBackground {
    neutral?: string;
  }
}

export const getThemeOptions = (mode: 'light' | 'dark'): ThemeOptions => ({
  palette: {
    mode,
    primary: {
      main: mode === 'light' ? '#4f46e5' : '#7f56ff', // Indigo : Electric Violet
    },
    secondary: {
      main: mode === 'light' ? '#06b6d4' : '#00e5ff', // Cyan : Cyber Cyan
    },
    background: {
      default: mode === 'light' ? '#f5f7fa' : '#070814', // Light gray-white : Obsidian Black
      paper: mode === 'light' ? '#ffffff' : '#121324',   // White : Space Slate
      neutral: mode === 'light' ? '#f1f5f9' : '#1e1f38', // Light neutral : Space dark
    },
    text: {
      primary: mode === 'light' ? '#070814' : '#f8fafc', // Charcoal : Pure Slate
      secondary: mode === 'light' ? '#475569' : '#94a3b8',
      dark: '#070814',
      light: '#f8fafc',
    },
    divider: mode === 'light' ? '#e2e8f0' : 'rgba(255, 255, 255, 0.05)',
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
    borderRadius: 12,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          padding: '10px 24px',
          boxShadow: 'none',
          borderRadius: '30px',
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
          borderColor: mode === 'light' ? 'rgba(15, 23, 42, 0.08)' : 'rgba(255, 255, 255, 0.05)',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: 'transparent',
          color: mode === 'light' ? '#070814' : '#f8fafc',
        }
      }
    }
  },
});

const theme = (mode: 'light' | 'dark') => createTheme(getThemeOptions(mode));

export default theme;
