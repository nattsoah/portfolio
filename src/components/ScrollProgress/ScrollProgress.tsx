'use client';
import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import { alpha } from '@mui/material/styles';

export const ScrollProgress = () => {
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
        right: { xs: 12, md: 32 },
        top: '50%',
        transform: 'translateY(-50%)',
        zIndex: 1000,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        pointerEvents: 'none',
      }}
    >
      {/* Track and Progress Bar */}
      <Box
        sx={{
          position: 'relative',
          width: '2px',
          height: '180px',
          bgcolor: (theme) => alpha(theme.palette.text.primary, 0.08),
          borderRadius: '1px',
          overflow: 'hidden',
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: `${progress}%`,
            bgcolor: 'primary.main',
            boxShadow: (theme) => `0 0 10px ${theme.palette.primary.main}`,
            transition: 'height 0.1s ease-out',
            borderRadius: '1px',
          }}
        />
      </Box>
    </Box>
  );
};

export default ScrollProgress;
