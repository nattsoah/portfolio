'use client';
import React, { useEffect, useState, useRef } from 'react';
import Box from '@mui/material/Box';
import { alpha, useTheme } from '@mui/material/styles';

export const PageLoader = () => {
  const [progress, setProgress] = useState(0);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const theme = useTheme();
  const containerRef = useRef<HTMLDivElement>(null);

  // Performance optimized pointer movement tracking (no React re-renders)
  useEffect(() => {
    if (isLoaded) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        containerRef.current.style.setProperty('--mouse-x', `${e.clientX}px`);
        containerRef.current.style.setProperty('--mouse-y', `${e.clientY}px`);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [isLoaded]);

  // Organic simulated progress (synchronized over requestAnimationFrame)
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    document.body.classList.add('is-loading');

    const duration = 2200; // 2.2s to reach 99%
    const startTime = Date.now();
    let animationFrameId: number;

    const update = () => {
      const elapsed = Date.now() - startTime;

      if (elapsed < duration) {
        const t = elapsed / duration;
        // Cubic ease-out curve for smooth deceleration
        const easeOut = 1 - Math.pow(1 - t, 3);
        setProgress(easeOut * 99);
        animationFrameId = requestAnimationFrame(update);
      } else {
        // Complete loading
        setProgress(100);
        setIsFadingOut(true);
        document.body.classList.remove('is-loading');

        setTimeout(() => {
          setIsLoaded(true);
          document.body.style.overflow = '';
        }, 500); // 500ms exit fade-out duration
      }
    };

    animationFrameId = requestAnimationFrame(update);

    return () => {
      cancelAnimationFrame(animationFrameId);
      document.body.classList.remove('is-loading');
      document.body.style.overflow = '';
    };
  }, []);

  if (isLoaded) return null;

  const isLight = theme.palette.mode === 'light';
  // Draw forward from 0% to 100% progress
  const logoDrawOffset = 162 - (Math.min(progress, 100) / 100) * 162;

  return (
    <Box
      ref={containerRef}
      id="page-loader-container"
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        bgcolor: isLight ? '#f5f7fa' : '#070814',
        zIndex: 99999,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        opacity: isFadingOut ? 0 : 1,
        transform: isFadingOut ? 'scale(1.03)' : 'scale(1)',
        filter: isFadingOut ? 'blur(16px)' : 'none',
        clipPath: isFadingOut ? 'circle(0% at 50% 50%)' : 'circle(150% at 50% 50%)',
        transition:
          'opacity 0.5s cubic-bezier(0.86, 0, 0.07, 1), transform 0.5s cubic-bezier(0.16, 1, 0.3, 1), filter 0.5s cubic-bezier(0.16, 1, 0.3, 1), clip-path 0.5s cubic-bezier(0.86, 0, 0.07, 1)',
        pointerEvents: isFadingOut ? 'none' : 'auto',
        overflow: 'hidden',
        '@media (prefers-reduced-motion: reduce)': {
          animation: 'none !important',
          transition: 'none !important',
          transform: 'none !important',
          filter: 'none !important',
          clipPath: 'none !important',
          opacity: isFadingOut ? 0 : 1,
        },
      }}
    >
      {/* Background Grid */}
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          backgroundImage: isLight
            ? 'linear-gradient(rgba(0,0,0,0.015) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.015) 1px, transparent 1px)'
            : 'linear-gradient(rgba(255,255,255,0.01) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.01) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
          pointerEvents: 'none',
          animation: 'gridMove 60s linear infinite',
          '@keyframes gridMove': {
            '0%': { backgroundPosition: '0px 0px' },
            '100%': { backgroundPosition: '48px 48px' },
          },
          '@media (prefers-reduced-motion: reduce)': { animation: 'none !important' },
        }}
      />

      {/* Floating Orbs */}
      <Box
        sx={{
          position: 'absolute',
          top: '10%',
          left: '10%',
          width: '55vw',
          height: '55vw',
          borderRadius: '50%',
          background: `radial-gradient(circle, ${alpha(theme.palette.primary.main, isLight ? 0.04 : 0.07)} 0%, transparent 70%)`,
          filter: 'blur(90px)',
          pointerEvents: 'none',
          animation: 'floatOrb1 35s infinite ease-in-out',
          '@keyframes floatOrb1': {
            '0%, 100%': { transform: 'translate(0, 0) scale(1)' },
            '33%': { transform: 'translate(6vw, -4vh) scale(1.08)' },
            '66%': { transform: 'translate(-4vw, 8vh) scale(0.96)' },
          },
          '@media (prefers-reduced-motion: reduce)': { animation: 'none !important' },
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          bottom: '10%',
          right: '10%',
          width: '45vw',
          height: '45vw',
          borderRadius: '50%',
          background: `radial-gradient(circle, ${alpha(theme.palette.secondary?.main || '#00e5ff', isLight ? 0.03 : 0.06)} 0%, transparent 70%)`,
          filter: 'blur(90px)',
          pointerEvents: 'none',
          animation: 'floatOrb2 42s infinite ease-in-out',
          '@keyframes floatOrb2': {
            '0%, 100%': { transform: 'translate(0, 0) scale(1)' },
            '50%': { transform: 'translate(-6vw, 4vh) scale(1.06)' },
          },
          '@media (prefers-reduced-motion: reduce)': { animation: 'none !important' },
        }}
      />

      {/* Mouse-reactive radial glow */}
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          background: `radial-gradient(600px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), ${alpha(
            theme.palette.primary.main,
            isLight ? 0.03 : 0.06
          )}, transparent 80%)`,
          pointerEvents: 'none',
        }}
      />

      {/* Noise overlay */}
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.02'/%3E%3C/svg%3E")`,
          pointerEvents: 'none',
          mixBlendMode: isLight ? 'multiply' : 'screen',
        }}
      />

      {/* Main Content Layout */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          zIndex: 10,
          width: '100%',
          maxWidth: 360,
          px: 4,
        }}
      >
        {/* SVG Monogram "N" */}
        <Box
          sx={{
            position: 'relative',
            width: 100,
            height: 100,
            mb: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Ghost track */}
            <path
              d="M 32 75 L 32 25 L 68 75 L 68 25"
              stroke={isLight ? 'rgba(0,0,0,0.04)' : 'rgba(255,255,255,0.03)'}
              strokeWidth="7"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {/* Animated draw path */}
            <path
              d="M 32 75 L 32 25 L 68 75 L 68 25"
              stroke="url(#logoGrad)"
              strokeWidth="7"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeDasharray="162"
              strokeDashoffset={logoDrawOffset}
              style={{
                transition: 'stroke-dashoffset 0.15s ease-out',
              }}
            />
            <defs>
              <linearGradient id="logoGrad" x1="0%" y1="100%" x2="100%" y2="0%">
                <stop offset="0%" stopColor={theme.palette.primary.main} />
                <stop offset="100%" stopColor={theme.palette.secondary?.main || theme.palette.primary.light} />
              </linearGradient>
            </defs>
          </svg>
        </Box>
      </Box>
    </Box>
  );
};

export default PageLoader;
