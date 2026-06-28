'use client';
import React, { useEffect, useState, useRef } from 'react';
import Box from '@mui/material/Box';
import { alpha } from '@mui/material/styles';

export const CustomCursor = () => {
  const [mounted, setMounted] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isHidden, setIsHidden] = useState(true);
  const dotRef = useRef<HTMLDivElement | null>(null);
  const ringRef = useRef<HTMLDivElement | null>(null);

  // Mouse positions
  const mouseCoords = useRef({ x: 0, y: 0 });
  const ringCoords = useRef({ x: 0, y: 0 });

  useEffect(() => {
    setTimeout(() => {
      setMounted(true);
    }, 0);

    const onMouseMove = (e: MouseEvent) => {
      mouseCoords.current.x = e.clientX;
      mouseCoords.current.y = e.clientY;
      setIsHidden(false);
    };

    const onMouseLeave = () => {
      setIsHidden(true);
    };

    const onMouseEnter = () => {
      setIsHidden(false);
    };

    // Attach mouse move
    window.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);

    // Track hovered elements
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;

      const isInteractive =
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.closest('a') !== null ||
        target.closest('button') !== null ||
        target.closest('[role="button"]') !== null ||
        target.closest('.swiper-slide') !== null ||
        target.closest('.MuiButton-root') !== null ||
        target.closest('.MuiIconButton-root') !== null ||
        target.closest('.MuiTab-root') !== null ||
        target.closest('.MuiChip-root') !== null ||
        target.getAttribute('data-cursor') === 'hover';

      setIsHovered(!!isInteractive);
    };

    window.addEventListener('mouseover', handleMouseOver);

    // Easing loop for the ring
    let animId: number;
    const updatePosition = () => {
      // Small dot follows immediately
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mouseCoords.current.x}px, ${mouseCoords.current.y}px, 0)`;
      }

      // Outer ring follows with easing (lerp)
      const ease = 0.15;
      ringCoords.current.x += (mouseCoords.current.x - ringCoords.current.x) * ease;
      ringCoords.current.y += (mouseCoords.current.y - ringCoords.current.y) * ease;

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringCoords.current.x}px, ${ringCoords.current.y}px, 0)`;
      }

      animId = requestAnimationFrame(updatePosition);
    };

    updatePosition();

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
      window.removeEventListener('mouseover', handleMouseOver);
      cancelAnimationFrame(animId);
    };
  }, []);

  if (!mounted) return null;

  return (
    <Box
      sx={{
        display: { xs: 'none', md: 'block' },
        pointerEvents: 'none',
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 9999,
        '@media (pointer: coarse)': {
          display: 'none !important',
        },
        '@media (hover: none)': {
          display: 'none !important',
        },
      }}
    >
      {/* Small Dot */}
      <Box
        ref={dotRef}
        sx={{
          position: 'fixed',
          top: -4,
          left: -4,
          width: 8,
          height: 8,
          bgcolor: 'text.primary',
          borderRadius: '50%',
          opacity: isHidden ? 0 : 0.8,
          transition: 'opacity 0.3s ease, background-color 0.3s ease',
          pointerEvents: 'none',
        }}
      />
      {/* Outer Ring */}
      <Box
        ref={ringRef}
        sx={{
          position: 'fixed',
          top: -20,
          left: -20,
          width: 40,
          height: 40,
          border: '1.5px solid',
          borderColor: 'text.secondary',
          borderRadius: '50%',
          opacity: isHidden ? 0 : 0.5,
          pointerEvents: 'none',
          transformOrigin: 'center',
          transition: 'opacity 0.3s ease, border-width 0.3s ease, border-color 0.3s ease, width 0.3s cubic-bezier(0.25, 1, 0.5, 1), height 0.3s cubic-bezier(0.25, 1, 0.5, 1), top 0.3s cubic-bezier(0.25, 1, 0.5, 1), left 0.3s cubic-bezier(0.25, 1, 0.5, 1)',
          ...(isHovered && {
            top: -30,
            left: -30,
            width: 60,
            height: 60,
            borderWidth: '2px',
            borderColor: 'text.primary',
            bgcolor: (theme) => alpha(theme.palette.text.primary, 0.08),
            opacity: 0.8,
          }),
        }}
      />
    </Box>
  );
};

export default CustomCursor;
