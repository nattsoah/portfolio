'use client';
import React, { useState } from 'react';
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
import Image from 'next/image';
import CertificateCard from '@/components/CertificateCard';

// Swiper components and modules
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';

// Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

interface CertificatesProps {
  sx?: SxProps<Theme>;
}

export const Certificates = ({ sx }: CertificatesProps) => {
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
      sx={{ ...sx }}
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
          opacity: theme.palette.mode === 'light' ? 0.03 : 0.05,
          backgroundImage: `radial-gradient(${theme.palette.text.primary} 0.5px, transparent 0.5px)`,
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
