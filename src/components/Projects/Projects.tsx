'use client';
import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import CloseIcon from '@mui/icons-material/Close';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme, SxProps, Theme } from '@mui/material/styles';
import { PROJECTS_DATA } from '@/const/portfolio';
import { alpha } from '@mui/material/styles';
import Image from 'next/image';
import ProjectCard from '@/components/ProjectCard';
import { ProjectItem, ProjectPreviewImageCategory } from '@/types/portfolio';

// Swiper components and modules
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay, Navigation, EffectCoverflow } from 'swiper/modules';

// Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/effect-coverflow';

interface ProjectsProps {
  sx?: SxProps<Theme>;
}

export const Projects = ({ sx }: ProjectsProps) => {
  const [open, setOpen] = useState(false);
  const [activeProject, setActiveProject] = useState<ProjectItem | null>(null);
  const [activeTab, setActiveTab] = useState(0);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleOpenMedia = (project: ProjectItem) => {
    setActiveProject(project);
    setActiveTab(0);
  };
  const handleCloseMedia = () => setActiveProject(null);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  return (
    <Box 
      id="projects" 
      py={{ xs: 8, md: 15 }} 
      bgcolor="background.paper"
      sx={{ ...sx }}
    >
      <Container maxWidth="lg">
        {/* Section Heading */}
        <Box display="flex" justifyContent="space-between" alignItems="flex-end" mb={8}>
          <Typography
            variant="h2"
            fontWeight={800}
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
            Projects
          </Typography>

          <Button
            variant="text"
            endIcon={<ArrowForwardIcon />}
            onClick={handleOpen}
            sx={{
              fontWeight: 700,
              color: 'primary.main',
              '&:hover': { bgcolor: (theme) => alpha(theme.palette.primary.main, 0.05) }
            }}
          >
            View All
          </Button>
        </Box>

        <Box sx={{ 
          mx: { xs: -2, md: 0 },
          pb: 8,
          '& .swiper-slide': {
            transition: 'all 0.5s ease',
            opacity: 0.5,
            transform: 'scale(0.85)',
          },
          '& .swiper-slide-active': {
            opacity: 1,
            transform: 'scale(1.05)',
            zIndex: 10
          },
          '& .swiper-pagination-bullet': {
            width: 12,
            height: 12,
            bgcolor: 'divider',
            opacity: 1,
            transition: 'all 0.3s ease'
          },
          '& .swiper-pagination-bullet-active': {
            width: 32,
            borderRadius: 6,
            bgcolor: 'primary.main'
          },
          '& .swiper-button-next, & .swiper-button-prev': {
            color: (theme) => `${theme.palette.primary.main} !important`,
            background: (theme) => `${alpha(theme.palette.background.paper, 0.8)} !important`,
            width: '50px !important',
            height: '50px !important',
            borderRadius: '50% !important',
            border: '2px solid transparent',
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
            transition: 'all 0.3s ease',
            padding: '10px',
            zIndex: 10,
            '&::after': { 
              fontSize: '20px !important', 
              fontWeight: '800 !important' 
            },
            '&:hover': {
              background: (theme) => `${alpha(theme.palette.background.paper, 0.9)} !important`,
              borderColor: 'divider',
              transform: 'scale(1.1) !important',
            }
          }
        }}>
          <Swiper
            modules={[Pagination, Autoplay, Navigation, EffectCoverflow]}
            effect="coverflow"
            grabCursor={true}
            centeredSlides={true}
            slidesPerView={'auto'}
            loop={true}
            autoplay={{ delay: 3500, disableOnInteraction: false }}
            coverflowEffect={{
              rotate: 0,
              stretch: 0,
              depth: 100,
              modifier: 2.5,
              slideShadows: false,
            }}
            pagination={{ clickable: true }}
            navigation={!isMobile}
            breakpoints={{
              320: { slidesPerView: 1.1, spaceBetween: 20 },
              640: { slidesPerView: 1.3, spaceBetween: 30 },
              1024: { slidesPerView: 2, spaceBetween: 40 }
            }}
            style={{ padding: '40px 0' }}
          >
            {PROJECTS_DATA.map((project) => (
              <SwiperSlide key={project.title} style={{ width: isMobile ? '300px' : '400px' }}>
                <Box sx={{ height: '100%', px: 1 }}>
                  <ProjectCard project={project} onOpenMedia={handleOpenMedia} />
                </Box>
              </SwiperSlide>
            ))}
          </Swiper>
        </Box>

        {/* Modal / Dialog for All Projects */}
        <Dialog
          open={open}
          onClose={handleClose}
          maxWidth="md"
          fullWidth
          scroll="paper"
          PaperProps={{
            sx: { borderRadius: 3, bgcolor: 'background.default' }
          }}
        >
          <DialogTitle sx={{ m: 0, p: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="h5" component="span" fontWeight={800} color="primary.main">
              All Projects
            </Typography>
            <IconButton onClick={handleClose} size="small" sx={{ color: 'text.secondary' }}>
              <CloseIcon />
            </IconButton>
          </DialogTitle>

          <DialogContent dividers sx={{ p: 4, bgcolor: 'background.paper' }}>
            <Grid container spacing={3}>
              {PROJECTS_DATA.map((project) => (
                <Grid key={project.title} size={{ xs: 12, sm: 6 }}>
                  <ProjectCard project={project} isModal onOpenMedia={handleOpenMedia} />
                </Grid>
              ))}
            </Grid>
          </DialogContent>
        </Dialog>

        {/* Media Preview Modal / Album View */}
        <Dialog
          open={Boolean(activeProject)}
          onClose={handleCloseMedia}
          maxWidth="lg"
          fullWidth
          PaperProps={{
            sx: {
              borderRadius: 3,
              bgcolor: 'background.default',
              overflow: 'hidden',
              backgroundImage: 'none'
            }
          }}
        >
          {activeProject && (
            <Box display='flex' flexDirection='column' height='auto'>
              {/* Top Bar */}
              <Box
                p={2.5}
                display='flex'
                justifyContent='space-between'
                alignItems='center'
                borderBottom='1px solid'
                borderColor='divider'
              >
                <Box>
                  <Typography variant="h6" fontWeight={800} color="text.primary">
                    {activeProject.title}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {activeProject.description}
                  </Typography>
                </Box>
                <IconButton onClick={handleCloseMedia} size="small">
                  <CloseIcon />
                </IconButton>
              </Box>

              {/* Content */}
              <Box p={{ xs: 2, md: 4 }} bgcolor='background.paper'>
                {activeProject.previewImages && activeProject.previewImages.length > 0 && typeof activeProject.previewImages[0] === 'object' && (
                  <Box mb={3} borderBottom={1} borderColor="divider">
                    <Tabs 
                      value={activeTab} 
                      onChange={handleTabChange} 
                      variant="scrollable"
                      scrollButtons="auto"
                      sx={{
                        '& .MuiTabs-indicator': {
                          height: 3,
                          borderRadius: '3px 3px 0 0',
                        },
                        '& .MuiTab-root': {
                          fontWeight: 700,
                          textTransform: 'none',
                          fontSize: '0.9rem',
                          minWidth: 120,
                          color: 'text.secondary',
                          '&.Mui-selected': {
                            color: 'primary.main',
                          }
                        }
                      }}
                    >
                      {(activeProject.previewImages as ProjectPreviewImageCategory[]).map((category, idx) => (
                        <Tab key={idx} label={category.category} />
                      ))}
                    </Tabs>
                  </Box>
                )}

                <Box
                  borderRadius={2}
                  overflow='auto'
                  maxHeight='75vh'
                  pr={1}
                  pb={8}
                  sx={{
                    '&::-webkit-scrollbar': { width: '8px' },
                    '&::-webkit-scrollbar-thumb': { bgcolor: 'rgba(0,0,0,0.1)', borderRadius: '4px' }
                  }}
                >
                  {Array.isArray(activeProject.previewImages) ? (
                    typeof activeProject.previewImages[0] === 'string' ? (
                      <ImageList
                        variant="masonry"
                        cols={isMobile ? 1 : 3}
                        gap={16}
                        sx={{ mb: 2 }}
                      >
                        {(activeProject.previewImages as string[]).map((url, index) => (
                          <ImageListItem key={index}>
                            <Image
                              src={url}
                              alt={`Preview ${index + 1}`}
                              width={800}
                              height={600}
                              style={{
                                width: '100%',
                                height: 'auto',
                                borderRadius: '8px',
                                display: 'block',
                                boxShadow: '0 4px 12px rgba(0,0,0,0.08)'
                              }}
                            />
                          </ImageListItem>
                        ))}
                      </ImageList>
                    ) : (
                      // Categorized Images
                      <ImageList
                        variant="masonry"
                        cols={isMobile ? 1 : 2}
                        gap={24}
                        sx={{ mb: 2 }}
                      >
                        {(activeProject.previewImages as ProjectPreviewImageCategory[])[activeTab]?.images.map((url, index) => (
                          <ImageListItem key={index}>
                            <Image
                              src={url}
                              alt={`${(activeProject.previewImages as ProjectPreviewImageCategory[])[activeTab].category} Preview ${index + 1}`}
                              width={800}
                              height={600}
                              style={{
                                width: '100%',
                                height: 'auto',
                                borderRadius: '8px',
                                display: 'block',
                                border: `1px solid ${theme.palette.divider}`,
                                boxShadow: '0 8px 24px rgba(0,0,0,0.12)'
                              }}
                            />
                          </ImageListItem>
                        ))}
                      </ImageList>
                    )
                  ) : (
                    activeProject.previewImage ? (
                      <Box
                        sx={{
                          position: 'relative',
                          width: '100%',
                          maxWidth: '900px',
                          margin: 'auto',
                          mb: 4,
                          aspectRatio: '16/9'
                        }}
                      >
                        <Image
                          src={activeProject.previewImage}
                          alt={`${activeProject.title} Main Preview`}
                          fill
                          sizes="(max-width: 1024px) 100vw, 900px"
                          style={{
                            objectFit: 'contain',
                            borderRadius: '8px'
                          }}
                        />
                      </Box>
                    ) : (
                      <Box py={4} textAlign='center'>
                        <Typography color="text.secondary">No preview available.</Typography>
                      </Box>
                    )
                  )}
                  {/* space */}
                  <Box height={20} />
                </Box>
              </Box>
            </Box>
          )}
        </Dialog>

      </Container>
    </Box>
  );
};

export default Projects;
