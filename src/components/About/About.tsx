'use client';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { alpha, SxProps, Theme } from '@mui/material/styles';
import { ABOUT_DATA } from '@/const/portfolio';
import Reveal from '@/components/Reveal';
import SectionHeading from '@/components/SectionHeading';

interface AboutProps {
  sx?: SxProps<Theme>;
}

export const About = ({ sx }: AboutProps) => {
  return (
    <Box
      id="about"
      py={{ xs: 12, md: 20 }}
      bgcolor='transparent'
      position='relative'
      sx={{
        overflow: 'hidden',
        ...sx
      }}
    >

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        <Grid container spacing={{ xs: 6, md: 10 }} alignItems="center">
          {/* Left: Text Content */}
          <Grid size={{ xs: 12, md: 7 }}>
            <SectionHeading title={ABOUT_DATA.title} sx={{ mb: 5 }} />

            <Stack spacing={4}>
              {ABOUT_DATA.description.map((paragraph, index) => (
                <Reveal key={index} direction="up" delay={200 + index * 100}>
                  <Typography
                    variant="body1"
                    color="text.secondary"
                    fontSize={{ xs: '1rem', md: '1.125rem' }}
                    lineHeight={1.8}
                  >
                    {paragraph}
                  </Typography>
                </Reveal>
              ))}
            </Stack>
          </Grid>

          {/* Right: Stats or Experience */}
          <Grid size={{ xs: 12, md: 5 }}>
            <Grid container spacing={3}>
              {ABOUT_DATA.stats.map((stat, index) => (
                <Grid key={index} size={{ xs: 12, sm: 6, md: 12 }}>
                  <Reveal direction="left" delay={300 + index * 150} width="100%">
                    <Paper
                      sx={{
                        p: 4,
                        textAlign: { xs: 'center', md: 'left' },
                        background: (theme) => theme.palette.mode === 'light'
                          ? alpha(theme.palette.background.paper, 0.4)
                          : alpha(theme.palette.background.neutral || theme.palette.background.paper, 0.3),
                        backdropFilter: 'blur(20px)',
                        border: '1px solid',
                        borderColor: 'divider',
                        borderRadius: 3,
                        transition: 'all 0.5s cubic-bezier(0.165, 0.84, 0.44, 1)',
                        boxShadow: (theme) => theme.palette.mode === 'light'
                          ? '0 10px 30px -10px rgba(0,0,0,0.05)'
                          : '0 10px 30px -10px rgba(0,0,0,0.3)',
                        '&:hover': {
                          transform: 'translateY(-8px) scale(1.02)',
                          boxShadow: (theme) => theme.palette.mode === 'light'
                            ? '0 20px 40px -10px rgba(0,0,0,0.12)'
                            : '0 20px 40px -10px rgba(0,0,0,0.6)',
                          borderColor: 'primary.main',
                          background: (theme) => theme.palette.mode === 'light'
                            ? alpha(theme.palette.background.paper, 0.7)
                            : alpha(theme.palette.background.neutral || theme.palette.background.paper, 0.5),
                        },
                      }}
                    >
                      <Typography
                        variant="h3"
                        color="primary.main"
                        fontWeight={900}
                        fontSize={{ xs: '2rem', md: '2.5rem' }}
                        mb={1}
                        sx={{
                          letterSpacing: '-0.02em',
                        }}
                      >
                        {stat.value}
                      </Typography>
                      <Typography
                        variant="subtitle2"
                        component="span"
                        color="text.secondary"
                        fontWeight={600}
                        sx={{ display: 'block', letterSpacing: '0.05rem', textTransform: 'uppercase' }}
                      >
                        {stat.label}
                      </Typography>
                    </Paper>
                  </Reveal>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default About;
