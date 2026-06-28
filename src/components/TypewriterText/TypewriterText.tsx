'use client';
import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

export const TypewriterText = () => {
  const [typedText, setTypedText] = useState('');
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const words = ['Crafting digital experiences.', 'Building modern web applications.'];

  useEffect(() => {
    const currentWord = words[wordIndex];
    let timer: NodeJS.Timeout;

    if (isDeleting) {
      timer = setTimeout(() => {
        setTypedText(currentWord.substring(0, typedText.length - 1));
      }, 50); // Deleting speed
    } else {
      timer = setTimeout(() => {
        setTypedText(currentWord.substring(0, typedText.length + 1));
      }, 100); // Typing speed
    }

    // Word fully typed
    if (!isDeleting && typedText === currentWord) {
      clearTimeout(timer);
      timer = setTimeout(() => {
        setIsDeleting(true);
      }, 2000); // Pause at full word
    }

    // Word fully deleted
    if (isDeleting && typedText === '') {
      setIsDeleting(false);
      setWordIndex((prev) => (prev + 1) % words.length);
    }

    return () => clearTimeout(timer);
  }, [typedText, isDeleting, wordIndex]);

  return (
    <Typography
      variant="h3"
      component="p"
      sx={{
        fontSize: { xs: '1.25rem', sm: '1.75rem', md: '2rem' },
        color: 'primary.main',
        fontFamily: 'var(--font-geist-mono), monospace',
        letterSpacing: '-0.02em',
      }}
    >
      {typedText}
      <Box
        component="span"
        sx={{
          display: 'inline-block',
          animation: 'blink 0.8s step-end infinite',
          ml: 0.5,
          color: 'primary.main',
          '@keyframes blink': {
            'from, to': { opacity: 0 },
            '50%': { opacity: 1 }
          }
        }}
      >
        |
      </Box>
    </Typography>
  );
};

export default TypewriterText;
