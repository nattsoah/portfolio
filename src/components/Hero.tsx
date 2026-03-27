'use client';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { HERO_DATA } from '@/const/portfolio';

const Hero = () => {
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
      bgcolor={'background.default'}
      pt={12}
      pb={12}
      display='flex'
      alignItems='center'
      minHeight='70vh'
      sx={{ overflow: 'hidden' }}
    >
      <Container maxWidth="lg">
        <Stack direction={{ xs: 'column', md: 'row' }} spacing={4} alignItems="center" justifyContent="space-between">
          <Box maxWidth={800}>
            <Typography
              variant="subtitle1"
              color="primary.main"
              fontWeight={600}
              mb={2}
              letterSpacing='0.1rem'
              textTransform='uppercase'
            >
              {HERO_DATA.tagline}
            </Typography>
            <Typography
              component="h1"
              variant="h1"
              color="text.primary"
              gutterBottom
              fontWeight={800}
              fontSize={{ xs: '2.5rem', md: '4rem' }}
              lineHeight={1.1}
            >
              {HERO_DATA.title}
            </Typography>
            <Typography
              variant="h5"
              color="text.secondary"
              paragraph
              mt={3}
              mb={3}
              fontWeight={400}
              lineHeight={1.6}
              maxWidth={600}
            >
              {HERO_DATA.subtitle}
            </Typography>
            <Stack
              direction={{ xs: 'column', sm: 'row' }}
              spacing={2}
              mt={4}
            >
              <Button
                variant="contained"
                size="large"
                onClick={scrollToProjects}
                sx={{
                  px: 4,
                  py: 1.5,
                  fontSize: '1rem',
                }}
              >
                {HERO_DATA.ctaText}
              </Button>
            </Stack>
          </Box>

          {/* Visual Section */}
          <Box
            display={{ xs: 'none', md: 'flex' }}
            width={400}
            height={400}
            justifyContent="center"
            alignItems="center"
            position='relative'
          >
            {/* Background Dots */}
            <Box
              position='absolute'
              top={-20}
              right={-20}
              width={100}
              height={100}
              zIndex={0}
              sx={{
                backgroundImage: (theme) => `radial-gradient(circle, ${theme.palette.text.primary} 1px, transparent 1px)`,
                backgroundSize: '15px 15px',
                opacity: (theme) => theme.palette.mode === 'light' ? 0.2 : 0.1,
              }}
            />

            {/* Background animation */}
            <Box
              position='absolute'
              bgcolor='primary.main'
              borderRadius={'50% 50% 30% 70% / 50% 30% 70% 50%'}
              zIndex={1}
              sx={{
                inset: 10,
                opacity: 0.05,
                animation: 'morph 12s ease-in-out infinite',
                animationDelay: '2s',
              }}
            />

            {/* Main Visual Container */}
            <Box
              position='relative'
              width={320}
              height={320}
              zIndex={2}
              sx={{
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  inset: -12,
                  bgcolor: 'primary.main',
                  borderRadius: '50% 50% 30% 70% / 50% 30% 70% 50%',
                  opacity: 0.1,
                  animation: 'morph 10s ease-in-out infinite',
                },
                '@keyframes morph': {
                  '0%, 100%': { borderRadius: '50% 50% 30% 70% / 50% 30% 70% 50%' },
                  '50%': { borderRadius: '30% 60% 70% 40% / 50% 60% 30% 60%' },
                }
              }}
            >
              <Box
                component="img"
                src={(HERO_DATA as any).profileImage}
                alt="Profile"
                width='100%'
                height='100%'
                borderRadius={'50% 50% 30% 70% / 50% 30% 70% 50%'}
                border={(theme) => `4px solid ${theme.palette.background.default}`}
                boxShadow={(theme) => theme.palette.mode === 'light' ? '0 25px 50px -12px rgba(0, 0, 0, 0.25)' : '0 25px 50px -12px rgba(0, 0, 0, 0.6)'}
                sx={{
                  objectFit: 'contain',
                  animation: 'morph 10s ease-in-out infinite',
                  transition: 'transform 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                  cursor: 'pointer',
                  '&:hover': {
                    transform: 'scale(1.05) rotate(2deg)',
                  },
                }}
              />
            </Box>

            {/* Floating Tech */}
            <Box
              position='absolute'
              bottom={40}
              left={20}
              width={60}
              height={60}
              bgcolor='background.paper'
              borderRadius='12px'
              boxShadow={(theme) => theme.palette.mode === 'light' ? '0 10px 15px -3px rgba(0,0,0,0.1)' : '0 10px 15px -3px rgba(0,0,0,0.5)'}
              display='flex'
              alignItems='center'
              justifyContent='center'
              border={'1px solid'}
              borderColor={'divider'}
              zIndex={3}
              sx={{
                animation: 'float 6s ease-in-out infinite',
                '@keyframes float': {
                  '0%, 100%': { transform: 'translateY(0)' },
                  '50%': { transform: 'translateY(-20px)' },
                }
              }}
            >
              <Typography variant="h6" fontWeight={900} color='primary.main'>
                &lt;/&gt;
              </Typography>
            </Box>
          </Box>
        </Stack>
      </Container>
    </Box>
  );
};

export default Hero;
