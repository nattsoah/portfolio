'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import Dialog from '@mui/material/Dialog';
import CloseIcon from '@mui/icons-material/Close';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme, SxProps, Theme } from '@mui/material/styles';
import { CERTIFICATES_DATA } from '@/const/portfolio';
import CertificateCard from '@/components/CertificateCard';
import Reveal from '@/components/Reveal';
import SectionHeading from '@/components/SectionHeading';

// Swiper components and modules
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';

// Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

const CertificatesSkeleton = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const shimmerBase = {
    background: theme.palette.mode === 'light'
      ? 'linear-gradient(90deg, #e2e8f0 25%, #f1f5f9 50%, #e2e8f0 75%)'
      : 'linear-gradient(90deg, #1e293b 25%, #334155 50%, #1e293b 75%)',
    backgroundSize: '200% 100%',
    animation: 'shimmer 1.5s infinite linear',
    '@keyframes shimmer': {
      '0%': { backgroundPosition: '-200% 0' },
      '100%': { backgroundPosition: '200% 0' }
    },
  };

  return (
    <Grid container spacing={4}>
      {[1, 2, 3].slice(0, isMobile ? 1 : 3).map((i) => (
        <Grid key={i} size={{ xs: 12, sm: 6, md: 4 }}>
          <Box
            sx={{
              p: 3,
              height: '340px',
              display: 'flex',
              flexDirection: 'column',
              gap: 2,
              borderRadius: 4,
              bgcolor: theme.palette.mode === 'light' ? 'rgba(0, 0, 0, 0.02)' : 'rgba(255, 255, 255, 0.02)',
              backdropFilter: 'blur(20px)',
              border: `1px solid ${theme.palette.divider}`,
            }}
          >
            {/* Image Frame */}
            <Box sx={{ aspectRatio: '4/3', width: '100%', borderRadius: '8px', ...shimmerBase }} />
            {/* Issuer */}
            <Box sx={{ width: '40%', height: '14px', mt: 1, borderRadius: '4px', ...shimmerBase }} />
            {/* Title */}
            <Box sx={{ width: '80%', height: '20px', borderRadius: '4px', ...shimmerBase }} />
            {/* Divider & Date */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 'auto', pt: 2, borderTop: `1px dashed ${theme.palette.divider}` }}>
              <Box sx={{ width: '50px', height: '12px', borderRadius: '4px', ...shimmerBase }} />
              <Box sx={{ width: '70px', height: '12px', borderRadius: '4px', ...shimmerBase }} />
            </Box>
          </Box>
        </Grid>
      ))}
    </Grid>
  );
};

interface CertificatesProps {
  sx?: SxProps<Theme>;
}

export const Certificates = ({ sx }: CertificatesProps) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  const handleOpenImage = (img: string) => setSelectedImage(img);

  return (
    <Box
      id="certificates"
      py={{ xs: 12, md: 20 }}
      bgcolor='transparent'
      position='relative'
      overflow='hidden'
      sx={{ ...sx }}
    >

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        {/* Section Heading */}
        <Box mb={8}>
          <SectionHeading title="Certificates" />
        </Box>

        {isLoading ? (
          <CertificatesSkeleton />
        ) : isMobile ? (
          <Reveal direction="up" delay={200} width="100%">
            <Box mx={-2} sx={{
              '& .swiper-pagination-bullet-active': {
                background: `${theme.palette.primary.main} !important`,
              }
            }}>
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
            </Box>
          </Reveal>
        ) : (
          <Grid container spacing={4}>
            {CERTIFICATES_DATA.map((cert, index) => (
              <Grid key={index} size={{ xs: 12, sm: 6, md: 4 }}>
                <Reveal direction="up" delay={200 + index * 100} width="100%">
                  <CertificateCard cert={cert} onOpen={handleOpenImage} />
                </Reveal>
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
              bgcolor: 'background.paper',
              overflow: 'hidden',
              boxShadow: theme.palette.mode === 'light'
                ? '0 32px 64px -16px rgba(0,0,0,0.3)'
                : '0 32px 64px -16px rgba(0,0,0,0.7)'
            }
          }}
        >
          <Box position='relative' bgcolor='background.paper'>
            <IconButton
              onClick={() => setSelectedImage(null)}
              sx={{
                position: 'absolute',
                top: 16,
                right: 16,
                bgcolor: 'background.default',
                color: 'text.primary',
                boxShadow: theme.palette.mode === 'light'
                  ? '0 4px 12px rgba(0,0,0,0.1)'
                  : '0 4px 12px rgba(0,0,0,0.4)',
                '&:hover': { bgcolor: 'background.paper' },
                zIndex: 10
              }}
            >
              <CloseIcon />
            </IconButton>
            {selectedImage && (
              <Box
                position="relative"
                width="100%"
                height={{ xs: '50vh', md: '75vh' }}
                sx={{ p: { xs: 2, md: 4 } }}
              >
                <Image
                  src={selectedImage}
                  alt="Certificate Preview"
                  fill
                  sizes="(max-width: 1024px) 100vw, 85vw"
                  style={{
                    objectFit: 'contain',
                  }}
                />
              </Box>
            )}
          </Box>
        </Dialog>
      </Container>
    </Box>
  );
};

export default Certificates;
