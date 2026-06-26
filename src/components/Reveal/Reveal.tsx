'use client';
import React, { useEffect, useRef, useState } from 'react';
import Box from '@mui/material/Box';

interface RevealProps {
  children: React.ReactNode;
  delay?: number; // Delay in ms
  duration?: number; // Duration in ms
  direction?: 'up' | 'down' | 'left' | 'right' | 'fade' | 'scale';
  threshold?: number;
  width?: 'fit-content' | '100%';
}

export const Reveal = ({
  children,
  delay = 0,
  duration = 800,
  direction = 'up',
  threshold = 0.1,
  width = 'fit-content',
}: RevealProps) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        } else {
          setIsVisible(false);
        }
      },
      {
        threshold,
        rootMargin: '0px 0px -20px 0px', // Adjusted margin to be more reactive
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [threshold]);

  const getInitialTransform = () => {
    switch (direction) {
      case 'up':
        return 'translate3d(0, 50px, 0)';
      case 'down':
        return 'translate3d(0, -50px, 0)';
      case 'left':
        return 'translate3d(50px, 0, 0)';
      case 'right':
        return 'translate3d(-50px, 0, 0)';
      case 'scale':
        return 'scale3d(0.95, 0.95, 1)';
      case 'fade':
      default:
        return 'none';
    }
  };

  return (
    <Box
      ref={ref}
      sx={{
        position: 'relative',
        width,
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translate3d(0, 0, 0) scale3d(1, 1, 1)' : getInitialTransform(),
        transition: `opacity ${duration}ms cubic-bezier(0.25, 1, 0.5, 1) ${delay}ms, transform ${duration}ms cubic-bezier(0.25, 1, 0.5, 1) ${delay}ms`,
        willChange: 'transform, opacity',
      }}
    >
      {children}
    </Box>
  );
};

export default Reveal;
