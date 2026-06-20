'use client';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import VerifiedIcon from '@mui/icons-material/Verified';
import CardMembershipIcon from '@mui/icons-material/CardMembership';
import { alpha, SxProps, Theme } from '@mui/material/styles';
import Image from 'next/image';
import { CertificateItem } from '@/types/portfolio';

export interface CertificateCardProps {
  cert: CertificateItem;
  onOpen: (img: string) => void;
  sx?: SxProps<Theme>;
}

export const CertificateCard = ({ cert, onOpen, sx }: CertificateCardProps) => {
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
          boxShadow: (theme) => `0 30px 60px -12px ${alpha(theme.palette.primary.main, 0.15)}`,
          '& .cert-img': { transform: 'scale(1.05)' },
          '& .cert-action': { opacity: 1, transform: 'translateY(0)' }
        },
        ...sx
      }}
    >
      {/* Image Frame */}
      <Box
        position='relative'
        borderRadius={3}
        overflow='hidden'
        bgcolor='background.neutral'
        mb={3}
        sx={{ aspectRatio: '4/3' }}
      >
        {cert.image ? (
          <>
            <Box
              className="cert-img"
              sx={{
                position: 'relative',
                width: '100%',
                height: '100%',
                transition: 'transform 0.6s ease',
              }}
            >
              <Image
                src={cert.image}
                alt={cert.title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                style={{ objectFit: 'cover' }}
              />
            </Box>

            {/* Overlay */}
            <Box
              className="cert-action"
              onClick={() => onOpen(cert.image!)}
              position='absolute'
              top={0}
              left={0}
              width='100%'
              height='100%'
              bgcolor={(theme) => alpha(theme.palette.primary.main, 0.4)}
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
                bgcolor='background.paper'
                color='primary.main'
                display='flex'
                alignItems='center'
                gap={1}
                fontWeight={700}
                boxShadow={(theme) => theme.palette.mode === 'light' 
                  ? '0 8px 16px rgba(0,0,0,0.2)' 
                  : '0 8px 16px rgba(0,0,0,0.5)'}
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
            color={(theme) => alpha(theme.palette.primary.main, 0.4)}
            gap={1}
            sx={{
              background: (theme) => `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.05)} 0%, ${alpha(theme.palette.primary.main, 0.1)} 100%)`,
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
          component="h3"
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

export default CertificateCard;
