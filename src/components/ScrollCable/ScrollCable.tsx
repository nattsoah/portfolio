'use client';
import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import { alpha } from '@mui/material/styles';

export const ScrollCable = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollHeight > 0) {
        const scrolled = (window.scrollY / scrollHeight) * 100;
        setProgress(scrolled);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Run once on mount
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <Box
      sx={{
        position: 'fixed',
        left: { xs: 16, md: 48 },
        top: '15vh',
        height: '70vh',
        width: '1px',
        zIndex: 1000,
        display: { xs: 'none', md: 'block' },
        pointerEvents: 'none',
      }}
    >
      {/* Thin vertical dashed track line */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '1px',
          height: '100%',
          borderLeft: '1px dashed',
          borderColor: (theme) => alpha(theme.palette.text.primary, 0.1),
        }}
      />

      {/* Solid illuminated progress path overlay */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: '-0.5px',
          width: '2px',
          height: `${progress}%`,
          background: (theme) => `linear-gradient(to bottom, transparent, ${theme.palette.primary.main})`,
          boxShadow: (theme) => `0 0 8px ${theme.palette.primary.main}`,
          transition: 'height 0.1s ease-out',
        }}
      />

      {/* Floating sliding capsule node */}
      <Box
        sx={{
          position: 'absolute',
          left: '-5px',
          top: `${progress}%`,
          transform: 'translateY(-50%)',
          width: '11px',
          height: '11px',
          borderRadius: '50%',
          bgcolor: 'primary.main',
          boxShadow: (theme) => `0 0 15px ${theme.palette.primary.main}, 0 0 5px ${theme.palette.primary.main}`,
          transition: 'top 0.1s ease-out',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          '&::after': {
            content: '""',
            width: '5px',
            height: '5px',
            borderRadius: '50%',
            bgcolor: 'background.paper',
          }
        }}
      />
    </Box>
  );
};

export default ScrollCable;
