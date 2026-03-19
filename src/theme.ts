'use client';
import { createTheme } from '@mui/material/styles';

// Extend the TypeText interface to include custom text colors
declare module '@mui/material/styles' {
  interface TypeText {
    dark?: string;
    light?: string;
  }
}

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#0f172a', // Slate 900
    },
    secondary: {
      main: '#64748b', // Slate 500
    },
    background: {
      default: '#ffffff',
      paper: '#f8fafc',
    },
    text: {
      primary: '#0f172a', // Light mode text (Slate 900)
      secondary: '#475569', // Light mode secondary text (Slate 600)
      dark: '#0f172a',    // Custom dark text color
      light: '#f8fafc',   // Custom light text color
    },
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
          border: '1px solid #e2e8f0',
        },
      },
    },
  },
});

export default theme;
