'use client';
import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Chip from '@mui/material/Chip';
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
import GitHubIcon from '@mui/icons-material/GitHub';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import VisibilityIcon from '@mui/icons-material/Visibility';
import CollectionsIcon from '@mui/icons-material/Collections';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { PROJECTS_DATA } from '@/const/portfolio';
import { alpha } from '@mui/material/styles';

// Swiper components and modules
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay, Navigation, EffectCoverflow } from 'swiper/modules';

// Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/effect-coverflow';

const Projects = () => {
  const [open, setOpen] = useState(false);
  const [activeProject, setActiveProject] = useState<any>(null);
  const [activeTab, setActiveTab] = useState(0);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleOpenMedia = (project: any) => {
    setActiveProject(project);
    setActiveTab(0);
  };
  const handleCloseMedia = () => setActiveProject(null);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  // Update ProjectCard to use handleOpenMedia
  const EnhancedProjectCard = ({ project, isModal = false }: { project: typeof PROJECTS_DATA[0], isModal?: boolean }) => (
    <Box
      height='100%'
      display='flex'
      flexDirection='column'
      border={'1.5px solid'}
      borderColor='divider'
      borderRadius={2}
      overflow='hidden'
      bgcolor='background.default'
      sx={{
        transition: 'all 0.3s ease',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: '0 12px 32px -8px rgba(15,23,42,0.15)',
        },
      }}
    >
      {/* Image / Placeholder */}
      <Box
        position='relative'
        height={isModal ? 160 : 200}
        bgcolor='primary.main'
        overflow='hidden'
        flexShrink={0}
      >
        {project.image ? (
          <Box
            component="img"
            src={project.image}
            alt={project.title}
            width='100%'
            height='100%'
            sx={{ objectFit: 'cover' }}
          />
        ) : (
          <Box
            width='100%'
            height='100%'
            display='flex'
            alignItems='center'
            justifyContent='center'
            sx={{
              background: 'linear-gradient(135deg,rgb(71, 73, 77) 0%, #334155 100%)',
            }}
          >
            <Typography
              fontSize='1rem'
              color='rgba(255,255,255,0.15)'
              fontWeight={800}
              letterSpacing={2}
            >
              {'{ }'}
            </Typography>
          </Box>
        )}

        {/* Type badge */}
        <Box
          position='absolute'
          top={12}
          left={12}
          bgcolor={'primary.main'}
          color='white'
          fontSize='0.6rem'
          fontWeight={700}
          px={1.2}
          py={0.3}
          borderRadius={1}
          letterSpacing={0.5}
          textTransform='uppercase'
          boxShadow={'0 4px 12px rgba(0,0,0,0.1)'}
        >
          {project.type}
        </Box>
      </Box>

      {/* Content */}
      <Box p={{ xs: 2, md: isModal ? 2 : 3 }} display="flex" flexDirection="column" flexGrow={1} gap={1.5}>
        <Typography variant={isModal ? "subtitle1" : "h6"} fontWeight={700} color="text.primary">
          {project.title}
        </Typography>

        <Typography variant="body2" color="text.secondary" lineHeight={1.6} flexGrow={1} fontSize={isModal ? '0.8rem' : '0.875rem'}>
          {project.description}
        </Typography>

        {/* Tags */}
        <Box display="flex" flexWrap="wrap" gap={0.6}>
          {project.tags.map((tag) => (
            <Chip
              key={tag}
              label={tag}
              size="small"
              sx={{
                fontSize: '0.65rem',
                fontWeight: 600,
                bgcolor: 'background.paper',
                border: '1px solid',
                borderColor: 'divider',
                height: 20,
              }}
            />
          ))}
        </Box>

        {/* Links */}
        <Box display="flex" gap={0.5} mt={0.5}>
          {project.github && (
            <IconButton
              component="a"
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              size="small"
              sx={{
                color: 'text.secondary',
                '&:hover': { color: 'primary.main' },
              }}
              aria-label="GitHub"
            >
              <GitHubIcon fontSize="small" />
            </IconButton>
          )}
          {project.demo && project.demo !== '#' && (
            <IconButton
              component="a"
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              size="small"
              sx={{
                color: 'text.secondary',
                '&:hover': { color: 'primary.main' },
              }}
              aria-label="Demo site"
            >
              <OpenInNewIcon fontSize="small" />
            </IconButton>
          )}
          {((project as any).previewImages || (project as any).previewImage) && (
            <IconButton
              onClick={() => handleOpenMedia(project)}
              size="small"
              sx={{
                color: 'text.secondary',
                '&:hover': { color: 'primary.main' },
              }}
              aria-label={Array.isArray((project as any).previewImages) ? "View Album" : "View Preview"}
            >
              {Array.isArray((project as any).previewImages) ? (
                <CollectionsIcon fontSize="small" />
              ) : (
                <VisibilityIcon fontSize="small" />
              )}
            </IconButton>
          )}
        </Box>
      </Box>
    </Box>
  );

  return (
    <Box id="projects" py={{ xs: 8, md: 15 }} bgcolor="background.paper">
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
              '&:hover': { bgcolor: alpha('#0f172a', 0.05) }
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
                  <EnhancedProjectCard project={project} />
                </Box>
              </SwiperSlide>
            ))}
          </Swiper>
          <style jsx global>{`
            .swiper-button-next, .swiper-button-prev {
              color: ${theme.palette.primary.main} !important;
              background: ${alpha(theme.palette.background.paper, 0.8)};
              width: 50px !important;
              height: 50px !important;
              border-radius: 50%;
              border: 2px solid transparent;
              &::after { font-size: 20px !important; font-weight: 800; }
              box-shadow: 0 4px 12px rgba(0,0,0,0.1);
              transition: all 0.3s ease;
              padding:10px;
              &:hover { 
                background: ${alpha(theme.palette.background.paper, 0.9)}; 
                border-color: ${theme.palette.divider};
                transform: scale(1.1);
              }
            }
          `}</style>
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
                  <EnhancedProjectCard project={project} isModal />
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
                      {activeProject.previewImages.map((category: any, idx: number) => (
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
                  }}>
                  {Array.isArray(activeProject.previewImages) ? (
                    typeof activeProject.previewImages[0] === 'string' ? (
                      <ImageList
                        variant="masonry"
                        cols={isMobile ? 1 : 3}
                        gap={16}
                        sx={{ mb: 2 }}
                      >
                        {activeProject.previewImages.map((url: string, index: number) => (
                          <ImageListItem key={index}>
                            <Box
                              component="img"
                              src={url}
                              alt={`Preview ${index + 1}`}
                              loading="lazy"
                              width='100%'
                              borderRadius={2}
                              boxShadow={'0 4px 12px rgba(0,0,0,0.08)'}
                              display='block'
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
                        {activeProject.previewImages[activeTab]?.images.map((url: string, index: number) => (
                          <ImageListItem key={index}>
                            <Box
                              component="img"
                              src={url}
                              alt={`${activeProject.previewImages[activeTab].category} Preview ${index + 1}`}
                              loading="lazy"
                              width='100%'
                              borderRadius={2}
                              boxShadow={'0 8px 24px rgba(0,0,0,0.12)'}
                              display='block'
                              border={'1px solid'}
                              borderColor='divider'                      
                            />
                          </ImageListItem>
                        ))}
                      </ImageList>
                    )
                  ) : (
                    activeProject.previewImage ? (
                      <Box
                        component="img"
                        src={activeProject.previewImage}
                        width='100%'
                        height='auto'
                        borderRadius={2}
                        boxShadow={'0 4px 12px rgba(0,0,0,0.08)'}
                        display='block'
                        margin='auto'
                        maxWidth='900px'
                        sx={{ objectFit: 'contain', mb: 4 }}
                      />
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
