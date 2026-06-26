'use client';
import React, { useState } from 'react';
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

        {isMobile ? (
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
