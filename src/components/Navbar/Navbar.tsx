'use client';
import React, { useState, useEffect, useRef } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import Fab from '@mui/material/Fab';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import { SxProps, Theme } from '@mui/material/styles';
import Image from 'next/image';
import { useColorMode } from '@/components/ThemeRegistry';
import { NAV_LINKS, SITE_NAME } from '@/const/navigation';

interface NavbarProps {
  sx?: SxProps<Theme>;
}

export const Navbar = ({ sx }: NavbarProps) => {
  const { mode, toggleColorMode } = useColorMode();
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  const [activeSection, setActiveSection] = useState<string>('');
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  
  const visibleSections = useRef<Record<string, boolean>>({});

  useEffect(() => {
    const sectionIds = ['hero', ...NAV_LINKS.map(link => link.id)];
    
    const callback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        visibleSections.current[entry.target.id] = entry.isIntersecting;
      });

      const currentActive = sectionIds.findLast(id => visibleSections.current[id]);
      
      if (currentActive === 'hero' || !currentActive) {
        setActiveSection('');
      } else {
        setActiveSection(currentActive);
      }
    };

    const observer = new IntersectionObserver(callback, {
      rootMargin: '-20% 0px -20% 0px',
      threshold: 0.1
    });

    const timeoutId = setTimeout(() => {
      sectionIds.forEach(id => {
        const element = document.getElementById(id);
        if (element) {
          observer.observe(element);
        }
      });
    }, 300);

    const handleScroll = () => {
      const scrollY = window.scrollY;
      setScrolled(scrollY > 50);
      setShowScrollTop(scrollY > 400);

      const isAtBottom = (window.innerHeight + window.scrollY) >= document.documentElement.scrollHeight - 50;
      if (isAtBottom) {
        setActiveSection(sectionIds[sectionIds.length - 1]);
      }
      
      if (scrollY < 50) {
        setActiveSection('');
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      clearTimeout(timeoutId);
      observer.disconnect();
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -80; 
      const y = element.getBoundingClientRect().top + window.scrollY + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
    handleCloseNavMenu();
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setActiveSection('');
    handleCloseNavMenu();
  };

  return (
    <>
    <AppBar 
      position="fixed" 
      color="default" 
      elevation={0} 
      sx={{ 
        borderBottom: (theme) => scrolled ? `1px solid ${theme.palette.divider}` : 'none', 
        bgcolor: scrolled 
          ? (mode === 'light' ? 'rgba(255, 255, 255, 0.95)' : 'rgba(15, 23, 42, 0.95)')
          : (mode === 'light' ? 'rgba(255, 255, 255, 0.8)' : 'rgba(15, 23, 42, 0.8)'), 
        backdropFilter: 'blur(8px)',
        transition: 'all 0.3s ease-in-out',
        top: 0,
        zIndex: 1100,
        ...sx
      }}
    >
      <Container maxWidth="lg">
        <Toolbar disableGutters>
          {/* Desktop Logo */}
          <Box 
            onClick={scrollToTop}
            sx={{ 
              display: { xs: 'none', md: 'flex' }, 
              alignItems: 'center', 
              cursor: 'pointer',
              mr: 2,
              '&:hover img': {
                filter: (theme) => theme.palette.mode === 'light' 
                  ? `drop-shadow(0 0 4px ${theme.palette.primary.main})` 
                  : `drop-shadow(0 0 4px ${theme.palette.secondary.main})`
              }
            }}
          >
            <Box sx={{ position: 'relative', width: 32, height: 32, mr: 1 }}>
              <Image
                src="/logo.svg"
                alt="Logo"
                fill
                style={{ objectFit: 'contain', transition: 'filter 0.3s ease' }}
              />
            </Box>
            <Typography
              variant="h6"
              noWrap
              component="span"
              fontWeight={700}
              color={'text.primary'}
              sx={{ textDecoration: 'none' }}
            >
              {SITE_NAME}
            </Typography>
          </Box>

          {/* Mobile Menu */}
          <Box flexGrow={1} display={{ xs: 'flex', md: 'none' }}>
            <IconButton
              size="large"
              aria-label="menu"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {NAV_LINKS.map((page) => (
                <MenuItem
                  key={page.name}
                  onClick={() => scrollToSection(page.id)}
                  selected={activeSection === page.id}
                >
                  <Typography textAlign="center">{page.name}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          {/* Mobile Logo */}
          <Box 
            onClick={scrollToTop}
            sx={{ 
              display: { xs: 'flex', md: 'none' }, 
              alignItems: 'center', 
              cursor: 'pointer',
              flexGrow: 1,
              mr: 2
            }}
          >
            <Box sx={{ position: 'relative', width: 28, height: 28, mr: 1 }}>
              <Image
                src="/logo.svg"
                alt="Logo"
                fill
                style={{ objectFit: 'contain' }}
              />
            </Box>
            <Typography
              variant="h6"
              noWrap
              component="span"
              fontWeight={700}
              color={'text.primary'}
              sx={{ textDecoration: 'none' }}
            >
              {SITE_NAME}
            </Typography>
          </Box>

          {/* Desktop Menu */}
          <Box display={{ xs: 'none', md: 'flex' }} alignItems='center' ml='auto'>
            {NAV_LINKS.map((page) => (
              <Button
                key={page.name}
                onClick={() => scrollToSection(page.id)}
                sx={{
                  my: 2,
                  display: 'block',
                  mx: 1,
                  transition: 'all 0.3s ease',
                  color: activeSection === page.id ? 'primary.main' : 'text.secondary',
                  fontWeight: activeSection === page.id ? 700 : 500,
                  position: 'relative',
                  '&:hover': {
                    color: 'primary.main',
                    backgroundColor: 'transparent',
                  },
                  '&::after': {
                    content: '""',
                    position: 'absolute',
                    bottom: 8,
                    left: 8,
                    right: 8,
                    height: '2px',
                    bgcolor: 'primary.main',
                    transition: 'transform 0.3s ease',
                    transform: activeSection === page.id ? 'scaleX(1)' : 'scaleX(0)',
                    transformOrigin: 'left'
                  }
                }}
              >
                {page.name}
              </Button>
            ))}
          </Box>
          
          {/* Theme Toggle Button */}
          <IconButton sx={{ ml: 1 }} onClick={toggleColorMode} color="inherit" aria-label="Toggle light or dark theme">
            {mode === 'dark' ? <LightModeIcon /> : <DarkModeIcon />}
          </IconButton>
        </Toolbar>
      </Container>
    </AppBar>

    {/* Scroll to Top FAB */}
    <Fab
      size="small"
      onClick={scrollToTop}
      sx={{
        position: 'fixed',
        bottom: 32,
        right: 32,
        opacity: showScrollTop ? 1 : 0,
        pointerEvents: showScrollTop ? 'auto' : 'none',
        transition: 'all 0.3s ease',
        bgcolor: 'primary.main',
        color: (theme) => theme.palette.mode === 'light' ? 'common.white' : 'text.primary',
        '&:hover': { bgcolor: 'primary.dark', transform: 'scale(1.1)' },
        zIndex: 1300,
      }}
      aria-label="scroll to top"
    >
      <KeyboardArrowUpIcon />
    </Fab>
    </>
  );
};

export default Navbar;
