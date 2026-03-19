'use client';
import React, { useState, useEffect } from 'react';
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
import { NAV_LINKS, SITE_NAME } from '@/const/navigation';

const Navbar = () => {
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  const [activeSection, setActiveSection] = useState<string>('');
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    //Active Section
    const sectionIds = ['hero', ...NAV_LINKS.map(link => link.id)];
    
    const callback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          if (entry.target.id === 'hero') {
            setActiveSection('');
          } else {
            setActiveSection(entry.target.id);
          }
        }
      });
    };

    const observer = new IntersectionObserver(callback, {
      rootMargin: '-30% 0px -60% 0px',
      threshold: 0
    });

    sectionIds.forEach(id => {
      const element = document.getElementById(id);
      if (element) {
        observer.observe(element);
      }
    });

    //Scroll
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setScrolled(scrollY > 50);
      setShowScrollTop(scrollY > 400);
      if (scrollY < 10) {
        setActiveSection('');
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check

    return () => {
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
      // Offset for sticky navbar
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
        bgcolor: scrolled ? 'rgba(255, 255, 255, 0.95)' : 'rgba(255, 255, 255, 0.8)', 
        backdropFilter: 'blur(8px)',
        transition: 'all 0.3s ease-in-out',
        top: 0,
        zIndex: 1100
      }}
    >
      <Container maxWidth="lg">
        <Toolbar disableGutters>
          {/* Desktop Logo */}
          <Typography
            variant="h6"
            noWrap
            component="span"
            onClick={scrollToTop}
            mr={2}
            display={{ xs: 'none', md: 'flex' }}
            fontWeight={700}
            color={'primary.main'}
            sx={{ textDecoration: 'none', cursor: 'pointer' }}
          >
            {SITE_NAME}
          </Typography>

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
          <Typography
            variant="h6"
            noWrap
            component="span"
            onClick={scrollToTop}
            mr={2}
            display={{ xs: 'flex', md: 'none' }}
            flexGrow={1}
            fontWeight={700}
            color={'primary.main'}
            sx={{ textDecoration: 'none', cursor: 'pointer' }}
          >
            {SITE_NAME}
          </Typography>

          {/* Desktop Menu */}
          <Box flexGrow={1} display={{ xs: 'none', md: 'flex' }} justifyContent='flex-end' >
            {NAV_LINKS.map((page) => (
              <Button
                key={page.name}
                onClick={() => scrollToSection(page.id)}
                sx={{
                  my: 2,
                  display: 'block',
                  mx: 1,
                  transition: 'all 0.3s ease',
                  color: activeSection === page.id ? 'primary.main' : 'secondary.main',
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
        color: 'white',
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
