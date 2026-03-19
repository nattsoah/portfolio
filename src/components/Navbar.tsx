'use client';
import React, { useState } from 'react';
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
import { NAV_LINKS, SITE_NAME } from '@/const/navigation';

const Navbar = () => {
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    handleCloseNavMenu();
  };

  return (
    <AppBar position="sticky" color="default" elevation={0} sx={{ borderBottom: (theme) => `1px solid ${theme.palette.divider}`, bgcolor: 'rgba(255, 255, 255, 0.8)', backdropFilter: 'blur(8px)' }}>
      <Container maxWidth="lg">
        <Toolbar disableGutters>
          {/* Desktop Logo */}
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            mr={2}
            display={{ xs: 'none', md: 'flex' }}
            fontWeight={700}
            color={'primary.main'}
            sx={{textDecoration: 'none',}}
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
                <MenuItem key={page.name} onClick={() => scrollToSection(page.id)}>
                  <Typography textAlign="center">{page.name}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          {/* Mobile Logo */}
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            mr={2}
            display={{ xs: 'flex', md: 'none' }}
            flexGrow={1}
            fontWeight={700}
            color={'primary.main'}
            sx={{textDecoration: 'none',}}
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
                  color: 'text.primary', 
                  display: 'block', 
                  mx: 1,
                  transition: 'color 0.3s ease',
                  '&:hover': {
                    color: 'primary.main',
                    backgroundColor: 'transparent',
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
  );
};

export default Navbar;
