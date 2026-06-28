'use client';
import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { SxProps, Theme } from '@mui/material/styles';
import { HERO_DATA } from '@/const/portfolio';
import TypewriterText from '@/components/TypewriterText';

interface HeroProps {
  sx?: SxProps<Theme>;
}

export const Hero = ({ sx }: HeroProps) => {
  const [showScrollArrow, setShowScrollArrow] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setShowScrollArrow(false);
      } else {
        setShowScrollArrow(true);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToProjects = () => {
    const element = document.getElementById('projects');
    if (element) {
      const yOffset = -80;
      const y = element.getBoundingClientRect().top + window.scrollY + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <Box
      id="hero"
      display='flex'
      flexDirection='column'
      alignItems='center'
      justifyContent='center'
      minHeight='100vh'
      position='relative'
      sx={{
        overflow: 'hidden',
        bgcolor: 'transparent',
        ...sx,
      }}
    >
      <Container maxWidth="md">
        <Box
          sx={{
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {/* Tagline Split Words */}
          <Typography
            variant="subtitle1"
            color="primary.main"
            fontWeight={700}
            mb={3}
            letterSpacing='0.25rem'
            textTransform='uppercase'
            fontSize={{ xs: '0.8rem', md: '1rem' }}
          >
            {HERO_DATA.tagline.split(' ').map((word, index) => (
              <Box
                component="span"
                key={index}
                sx={{
                  display: 'inline-block',
                  opacity: 0,
                  transform: 'translateY(15px)',
                  animation: 'revealWord 0.6s cubic-bezier(0.25, 1, 0.5, 1) forwards',
                  animationDelay: `${index * 100}ms`,
                  mr: 1,
                  '@keyframes revealWord': {
                    to: {
                      opacity: 1,
                      transform: 'translateY(0)',
                    }
                  }
                }}
              >
                {word}
              </Box>
            ))}
          </Typography>

          {/* Name Split Letters */}
          <Typography
            component="h1"
            variant="h1"
            color="text.primary"
            gutterBottom
            fontWeight={900}
            fontSize={{ xs: '3.5rem', sm: '5rem', md: '6.5rem' }}
            lineHeight={1.05}
            letterSpacing='-0.03em'
            sx={{
              mb: 4,
              textShadow: (theme) => theme.palette.mode === 'dark'
                ? '0 0 40px rgba(148, 163, 184, 0.05)'
                : 'none',
            }}
          >
            {HERO_DATA.title.split('').map((char, index) => (
              <Box
                component="span"
                key={index}
                sx={{
                  display: 'inline-block',
                  opacity: 0,
                  transform: 'translateY(120px) rotate(-15deg) scale(0.5)',
                  filter: 'blur(8px)',
                  animation: 'elasticBounceIn 1.2s cubic-bezier(0.34, 1.56, 0.64, 1) forwards',
                  animationDelay: `${index * 45 + 300}ms`,
                  '@keyframes elasticBounceIn': {
                    '0%': {
                      opacity: 0,
                      transform: 'translateY(120px) rotate(-15deg) scale(0.5)',
                      filter: 'blur(8px)',
                    },
                    '60%': {
                      opacity: 0.8,
                      transform: 'translateY(-15px) rotate(3deg) scale(1.05)',
                      filter: 'blur(2px)',
                    },
                    '100%': {
                      opacity: 1,
                      transform: 'translateY(0) rotate(0) scale(1)',
                      filter: 'blur(0)',
                    }
                  }
                }}
              >
                {char === ' ' ? '\u00A0' : char}
              </Box>
            ))}
          </Typography>

          {/* Typewriter Text (Isolated Component) */}
          <Box
            sx={{
              opacity: 0,
              transform: 'translateY(20px)',
              animation: 'revealText 1s cubic-bezier(0.25, 1, 0.5, 1) forwards',
              animationDelay: '650ms',
              mb: 3.5,
              minHeight: '42px',
              '@keyframes revealText': {
                to: {
                  opacity: 1,
                  transform: 'translateY(0)',
                }
              }
            }}
          >
            <TypewriterText />
          </Box>

          {/* Subtitle Reveal */}
          <Box
            sx={{
              opacity: 0,
              transform: 'translateY(30px)',
              animation: 'revealText 1s cubic-bezier(0.25, 1, 0.5, 1) forwards',
              animationDelay: '850ms',
            }}
          >
            <Typography
              variant="h5"
              color="text.secondary"
              paragraph
              fontWeight={400}
              lineHeight={1.7}
              fontSize={{ xs: '1.05rem', md: '1.25rem' }}
              maxWidth={680}
              sx={{ mb: 5 }}
            >
              {HERO_DATA.subtitle}
            </Typography>
          </Box>

          {/* CTA Button Reveal */}
          <Box
            sx={{
              opacity: 0,
              transform: 'translateY(20px)',
              animation: 'revealText 1.2s cubic-bezier(0.25, 1, 0.5, 1) forwards',
              animationDelay: '1000ms',
            }}
          >
            <Button
              variant="contained"
              size="large"
              onClick={scrollToProjects}
              sx={{
                px: 5,
                py: 2,
                fontSize: '1rem',
                borderRadius: '50px',
                bgcolor: 'text.primary',
                color: 'background.default',
                textTransform: 'uppercase',
                fontWeight: 700,
                letterSpacing: '0.1rem',
                border: '1.5px solid transparent',
                boxShadow: (theme) => theme.palette.mode === 'light'
                  ? '0 10px 30px rgba(0,0,0,0.15)'
                  : '0 10px 30px rgba(255,255,255,0.05)',
                transition: 'all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1)',
                '&:hover': {
                  bgcolor: 'transparent',
                  borderColor: 'text.primary',
                  color: 'text.primary',
                  transform: 'scale(1.05) translateY(-3px)',
                  boxShadow: (theme) => theme.palette.mode === 'light'
                    ? '0 15px 40px rgba(0,0,0,0.2)'
                    : '0 15px 40px rgba(255,255,255,0.1)',
                },
                '&:active': {
                  transform: 'scale(0.98) translateY(-1px)',
                }
              }}
            >
              {HERO_DATA.ctaText}
            </Button>
          </Box>
        </Box>
      </Container>

      {/* Floating Scroll Down Arrow */}
      <Box
        sx={{
          position: 'absolute',
          bottom: 100,
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 1,
          cursor: 'pointer',
          opacity: showScrollArrow ? 0.6 : 0,
          pointerEvents: showScrollArrow ? 'auto' : 'none',
          transition: 'opacity 0.4s ease, transform 0.4s ease',
          animation: showScrollArrow ? 'bounce 2s infinite 2000ms' : 'none',
          '@keyframes bounce': {
            '0%, 100%': { transform: 'translateX(-50%) translateY(0)' },
            '50%': { transform: 'translateX(-50%) translateY(10px)' }
          },
          '&:hover': {
            opacity: showScrollArrow ? 1 : 0,
          }
        }}
        onClick={scrollToProjects}
      >
        <Typography variant="caption" sx={{ letterSpacing: '0.15rem', textTransform: 'uppercase', fontWeight: 600 }}>
          Scroll
        </Typography>
        <ArrowDownwardIcon fontSize="small" />
      </Box>
    </Box>
  );
};

export default Hero;
