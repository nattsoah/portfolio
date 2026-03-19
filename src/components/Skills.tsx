'use client';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
import DevicesIcon from '@mui/icons-material/Devices';
import StorageIcon from '@mui/icons-material/Storage';
import BuildIcon from '@mui/icons-material/Build';
import { SKILLS_DATA } from '@/const/portfolio';
import { SvgIconComponent } from '@mui/icons-material';

const ICON_MAP: Record<string, SvgIconComponent> = {
  DevicesIcon,
  StorageIcon,
  BuildIcon,
};

const Skills = () => {
  return (
    <Box id="skills" py={{ xs: 8, md: 15 }} bgcolor="background.default">
      <Container maxWidth="lg">

        {/* Section Heading */}
        <Typography
          variant="h2"
          fontWeight={800}
          mb={8}
          position="relative"
          display="inline-block"
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
          Skills
        </Typography>

        {/* Category Rows */}
        {SKILLS_DATA.map((category, index) => {
          const Icon = ICON_MAP[category.icon];
          return (
            <Box key={category.category}>
              <Grid container spacing={{ xs: 3, md: 8 }} alignItems="flex-start" py={{ xs: 4, md: 6 }}>

                {/* Left */}
                <Grid size={{ xs: 12, md: 4 }}>
                  <Box display="flex" alignItems="center" gap={2} mb={2}>
                    <Box
                      p={1.5}
                      borderRadius={2}
                      bgcolor='primary.main'
                      display='flex'
                      alignItems='center'
                      justifyContent='center'
                      flexShrink={0}
                    >
                      {Icon && <Icon sx={{ color: 'white', fontSize: 22 }} />}
                    </Box>
                    <Typography variant="h5" fontWeight={700} color="text.primary">
                      {category.category}
                    </Typography>
                  </Box>
                  <Typography variant="body2" color="text.secondary" lineHeight={1.8}>
                    {category.description}
                  </Typography>
                </Grid>

                {/* Right*/}
                <Grid size={{ xs: 12, md: 8 }}>
                  <Box display="flex" flexWrap="wrap" gap={1.5}>
                    {category.skills.map((skill) => (
                      <Chip
                        key={skill}
                        label={skill}
                        sx={{
                          fontWeight: 600,
                          fontSize: '0.8rem',
                          px: 0.5,
                          height: 34,
                          bgcolor: 'background.paper',
                          border: '1.5px solid',
                          borderColor: 'divider',
                          color: 'text.primary',
                          transition: 'all 0.2s ease',
                          '&:hover': {
                            bgcolor: 'primary.main',
                            color: 'white',
                            borderColor: 'primary.main',
                            transform: 'translateY(-2px)',
                            boxShadow: '0 4px 12px rgba(15,23,42,0.2)',
                          },
                        }}
                      />
                    ))}
                  </Box>
                </Grid>

              </Grid>

              {index < SKILLS_DATA.length - 1 && (
                <Divider sx={{ borderColor: 'divider' }} />
              )}
            </Box>
          );
        })}

      </Container>
    </Box>
  );
};

export default Skills;
