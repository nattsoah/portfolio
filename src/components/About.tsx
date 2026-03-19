'use client';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { ABOUT_DATA } from '@/const/portfolio';

const About = () => {
  return (
    <Box id="about" py={{ xs: 8, md: 15 }} bgcolor='background.paper'>
      <Container maxWidth="lg">
        <Grid container spacing={8} alignItems="center">
          {/* Left: Text Content */}
          <Grid size={{ xs: 12, md: 7 }}>
            <Typography
              variant="h2"
              fontWeight={800}
              mb={4}
              position='relative'
              display='inline-block'
              sx={{
                '&::after': {
                  content: '""',
                  position: 'absolute',
                  bottom: -10,
                  left: 0,
                  width: '60px',
                  height: '4px',
                  bgcolor: 'primary.main',
                },
              }}
            >
              {ABOUT_DATA.title}
            </Typography>
            
            <Stack spacing={3}>
              {ABOUT_DATA.description.map((paragraph, index) => (
                <Typography key={index} variant="body1" color="text.secondary">
                  {paragraph}
                </Typography>
              ))}
            </Stack>
          </Grid>

          {/* Right: Stats or Experience */}
          <Grid size={{ xs: 12, md: 5 }}>
            <Grid container spacing={2}>
              {ABOUT_DATA.stats.map((stat, index) => (
                <Grid key={index} size={{ xs: 6, sm: 6, md: 12 }}>
                  <Paper
                    sx={{
                      p: 4,
                      textAlign: 'center',
                      transition: 'all 0.3s ease',
                      border: '1px solid #e2e8f0',
                      '&:hover': {
                        transform: 'translateY(-5px)',
                        boxShadow: '0 10px 30px -5px rgba(0,0,0,0.1)',
                        borderColor: 'primary.main',
                      },
                    }}
                  >
                    <Typography
                      variant="h3"
                      color="primary.main"
                      fontWeight={800}
                      mb={1}
                    >
                      {stat.value}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {stat.label}
                    </Typography>
                  </Paper>
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
