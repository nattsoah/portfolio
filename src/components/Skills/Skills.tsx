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
import { alpha, SxProps, Theme } from '@mui/material/styles';
import { SKILLS_DATA } from '@/const/portfolio';
import { SvgIconComponent } from '@mui/icons-material';
import Reveal from '@/components/Reveal';
import SectionHeading from '@/components/SectionHeading';

const ICON_MAP: Record<string, SvgIconComponent> = {
  DevicesIcon,
  StorageIcon,
  BuildIcon,
};

interface SkillsProps {
  sx?: SxProps<Theme>;
}

export const Skills = ({ sx }: SkillsProps) => {
  return (
    <Box
      id="skills"
      py={{ xs: 12, md: 20 }}
      bgcolor="transparent"
      position="relative"
      sx={{
        overflow: 'hidden',
        ...sx
      }}
    >

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>

        {/* Section Heading */}
        <SectionHeading title="Skills" sx={{ mb: 8 }} />

        {/* Category Rows */}
        {SKILLS_DATA.map((category, catIndex) => {
          const Icon = ICON_MAP[category.icon];
          return (
            <Box key={category.category}>
              <Grid
                container
                spacing={{ xs: 4, md: 8 }}
                alignItems="flex-start"
                py={{ xs: 6, md: 8 }}
              >
                {/* Left */}
                <Grid size={{ xs: 12, md: 4 }}>
                  <Reveal direction="right" delay={150}>
                    <Box display="flex" alignItems="center" gap={2.5} mb={2.5}>
                      <Box
                        p={1.8}
                        borderRadius={3}
                        bgcolor='primary.main'
                        display='flex'
                        alignItems='center'
                        justifyContent='center'
                        flexShrink={0}
                        sx={{
                          boxShadow: (theme) => `0 8px 20px -4px ${alpha(theme.palette.primary.main, 0.3)}`,
                        }}
                      >
                        {Icon && <Icon sx={{ color: (theme) => theme.palette.getContrastText(theme.palette.primary.main), fontSize: 24 }} />}
                      </Box>
                      <Typography variant="h3" fontWeight={800} color="text.primary" sx={{ fontSize: '1.4rem', letterSpacing: '-0.01em' }}>
                        {category.category}
                      </Typography>
                    </Box>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      lineHeight={1.8}
                      fontSize={{ xs: '0.9rem', md: '1.05rem' }}
                    >
                      {category.description}
                    </Typography>
                  </Reveal>
                </Grid>

                {/* Right */}
                <Grid size={{ xs: 12, md: 8 }}>
                  <Box display="flex" flexWrap="wrap" gap={2}>
                    {category.skills.map((skill, skillIndex) => (
                      <Reveal
                        key={skill}
                        direction="scale"
                        delay={100 + skillIndex * 35}
                        duration={500}
                      >
                        <Chip
                          label={skill}
                          sx={{
                            fontWeight: 650,
                            fontSize: { xs: '0.75rem', md: '0.875rem' },
                            px: 1.5,
                            py: 2.2,
                            borderRadius: '30px',
                            bgcolor: (theme) => theme.palette.mode === 'light'
                              ? alpha(theme.palette.background.paper, 0.4)
                              : alpha(theme.palette.background.neutral || theme.palette.background.paper, 0.2),
                            backdropFilter: 'blur(10px)',
                            border: '1.5px solid',
                            borderColor: 'divider',
                            color: 'text.primary',
                            transition: 'all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1)',
                            cursor: 'pointer',
                            '&:hover': {
                              bgcolor: 'primary.main',
                              color: (theme) => theme.palette.getContrastText(theme.palette.primary.main),
                              borderColor: 'primary.main',
                              transform: 'translateY(-4px) scale(1.05)',
                              boxShadow: (theme) => `0 10px 20px -5px ${alpha(theme.palette.primary.main, 0.4)}`,
                            },
                          }}
                        />
                      </Reveal>
                    ))}
                  </Box>
                </Grid>
              </Grid>

              {catIndex < SKILLS_DATA.length - 1 && (
                <Reveal direction="fade" delay={300} width="100%">
                  <Divider sx={{ borderColor: 'divider', borderStyle: 'dashed' }} />
                </Reveal>
              )}
            </Box>
          );
        })}

      </Container>
    </Box>
  );
};

export default Skills;
