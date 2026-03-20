'use client';
import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import Dialog from '@mui/material/Dialog';
import CloseIcon from '@mui/icons-material/Close';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import VerifiedIcon from '@mui/icons-material/Verified';
import CardMembershipIcon from '@mui/icons-material/CardMembership';
import useMediaQuery from '@mui/material/useMediaQuery';
import { CERTIFICATES_DATA } from '@/const/portfolio';
import { alpha, useTheme } from '@mui/material/styles';

// Swiper components and modules
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';

// Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

const CertificateCard = ({ cert, onOpen }: { cert: typeof CERTIFICATES_DATA[0], onOpen: (img: string) => void }) => {
  const theme = useTheme();

  return (
    <Box
      height='100%'
      position='relative'
      bgcolor='background.default'
      borderRadius={4}
      p={2}
      border='1.5px solid'
      borderColor='divider'
      sx={{
        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
        '&:hover': {
          boxShadow: `0 30px 60px -12px ${alpha(theme.palette.primary.main, 0.15)}`,
          '& .cert-img': { transform: 'scale(1.05)' },
          '& .cert-action': { opacity: 1, transform: 'translateY(0)' }
        }
      }}
    >
      {/* Image Frame */}
      <Box
        position='relative'
        borderRadius={3}
        overflow='hidden'
        bgcolor='#f1f5f9'
        mb={3}
        sx={{ aspectRatio: '4/3' }}
      >
        {cert.image ? (
          <>
            <Box
              component="img"
              className="cert-img"
              src={cert.image}
              alt={cert.title}
              width='100%'
              height='100%'
              sx={{
                objectFit: 'cover',
                transition: 'transform 0.6s ease',
              }}
            />

            {/* Overlay */}
            <Box
              className="cert-action"
              onClick={() => onOpen(cert.image)}
              position='absolute'
              top={0}
              left={0}
              width='100%'
              height='100%'
              bgcolor={alpha(theme.palette.primary.main, 0.4)}
              display='flex'
              alignItems='center'
              justifyContent='center'
              sx={{
                backdropFilter: 'blur(4px)',
                opacity: 0,
                transform: 'translateY(10px)',
                transition: 'all 0.3s ease',
                cursor: 'pointer'
              }}
            >
              <Box
                px={3}
                py={1.5}
                borderRadius={10}
                bgcolor='white'
                color='primary.main'
                display='flex'
                alignItems='center'
                gap={1}
                fontWeight={700}
                boxShadow={'0 8px 16px rgba(0,0,0,0.2)'}
              >
                <FullscreenIcon fontSize="small" />
                View Full
              </Box>
            </Box>
          </>
        ) : (
          <Box
            width='100%'
            height='100%'
            display='flex'
            flexDirection='column'
            alignItems='center'
            justifyContent='center'
            color={alpha(theme.palette.primary.main, 0.4)}
            gap={1}
            sx={{
              background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.05)} 0%, ${alpha(theme.palette.primary.main, 0.1)} 100%)`,
            }}
          >
            <CardMembershipIcon sx={{ fontSize: '3rem' }} />
            <Typography variant="caption" fontWeight={700} sx={{ opacity: 0.8 }}>
              NO PREVIEW AVAILABLE
            </Typography>
          </Box>
        )}
      </Box>

      {/* Content */}
      <Box px={1} pb={1}>
        <Box display="flex" alignItems="center" gap={1} mb={1.5}>
          <VerifiedIcon sx={{ color: 'primary.main', fontSize: '1.2rem' }} />
          <Typography
            variant="caption"
            fontWeight={800}
            color="primary.main"
            textTransform='uppercase'
            letterSpacing={1}
          >
            {cert.issuer}
          </Typography>
        </Box>

        <Typography
          variant="h6"
          fontWeight={800}
          lineHeight={1.3}
          mb={2}
          fontSize='1.15rem'
          color='text.primary'
        >
          {cert.title}
        </Typography>

        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          pt={2}
          borderTop={'1px dashed'}
          borderColor={'divider'}
        >
          <Typography variant="caption" color="text.secondary" fontWeight={600}>
            Issued on
          </Typography>
          <Typography variant="caption" color="text.primary" fontWeight={700}>
            {cert.date}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

const Certificates = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const handleOpenImage = (img: string) => setSelectedImage(img);

  return (
    <Box
      id="certificates"
      py={{ xs: 10, md: 15 }}
      bgcolor='background.default'
      position='relative'
      overflow='hidden'
    >
      {/* Subtle Background */}
      <Box  
        position='absolute'
        top={0}
        left={0}
        width='100%'
        height='100%'
        zIndex={0}
        sx={{
          opacity: 0.03,
          backgroundImage: 'radial-gradient(#0f172a 0.5px, transparent 0.5px)',
          backgroundSize: '24px 24px',
        }}
      />

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        {/* Section Heading */}
        <Box mb={8}>
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
            Certificates
          </Typography>
        </Box>

        {isMobile ? (
          <Box mx={-2}>
            <Swiper
              modules={[Pagination, Autoplay]}
              spaceBetween={20}
              slidesPerView={1}
              centeredSlides={true}
              pagination={{ clickable: true }}
              autoplay={{ delay: 3500, disableOnInteraction: false }}
              style={{ paddingBottom: '40px' }}
            >
              {CERTIFICATES_DATA.map((cert, index) => (
                <SwiperSlide key={index}>
                  <Box sx={{ height: '100%', px: 1 }}>
                    <CertificateCard cert={cert} onOpen={handleOpenImage} />
                  </Box>
                </SwiperSlide>
              ))}
            </Swiper>
            <style jsx global>{`
              .swiper-pagination-bullet-active {
                background: ${theme.palette.primary.main} !important;
              }
            `}</style>
          </Box>
        ) : (
          <Grid container spacing={4}>
            {CERTIFICATES_DATA.map((cert, index) => (
              <Grid key={index} size={{ xs: 12, sm: 6, md: 4 }}>
                <CertificateCard cert={cert} onOpen={handleOpenImage} />
              </Grid>
            ))}
          </Grid>
        )}

        {/* Full Image Preview */}
        <Dialog
          open={Boolean(selectedImage)}
          onClose={() => setSelectedImage(null)}
          maxWidth="lg"
          fullWidth
          PaperProps={{
            sx: {
              borderRadius: 4,
              bgcolor: 'background.default',
              overflow: 'hidden',
              boxShadow: '0 32px 64px -16px rgba(0,0,0,0.3)'
            }
          }}
        >
          <Box position='relative' bgcolor='#f8fafc'>
            <IconButton
              onClick={() => setSelectedImage(null)}
              sx={{
                position: 'absolute',
                top: 16,
                right: 16,
                bgcolor: 'white',
                color: 'text.primary',
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                '&:hover': { bgcolor: '#f1f5f9' },
                zIndex: 10
              }}
            >
              <CloseIcon />
            </IconButton>
            {selectedImage && (
              <Box
                component="img"
                src={selectedImage}
                width='100%'
                height='auto'
                display='block'
                maxHeight='85vh'
                p={{ xs: 2, md: 4 }}
                sx={{objectFit: 'contain'}}
              />
            )}
          </Box>
        </Dialog>
      </Container>
    </Box>
  );
};

export default Certificates;
