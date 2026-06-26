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
      borderRadius={4}
      p={3}
      border='1px solid'
      borderColor='divider'
      bgcolor={(theme) => theme.palette.mode === 'light'
        ? alpha(theme.palette.background.paper, 0.4)
        : alpha(theme.palette.background.neutral || theme.palette.background.paper, 0.25)}
      sx={{
        backdropFilter: 'blur(20px)',
        transition: 'all 0.5s cubic-bezier(0.165, 0.84, 0.44, 1)',
        boxShadow: (theme) => theme.palette.mode === 'light'
          ? '0px 8px 24px -12px rgba(15,23,42,0.05)'
          : 'none',
        '&:hover': {
          transform: 'translateY(-6px) scale(1.01)',
          boxShadow: (theme) => theme.palette.mode === 'light' 
            ? '0 20px 40px -10px rgba(0,0,0,0.12)' 
            : '0 20px 40px -10px rgba(0,0,0,0.6)',
          borderColor: 'primary.main',
          '& .cert-img': { transform: 'scale(1.08)' },
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
                transition: 'transform 0.8s cubic-bezier(0.165, 0.84, 0.44, 1)',
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
              bgcolor={(theme) => alpha(theme.palette.primary.main, 0.35)}
              display='flex'
              alignItems='center'
              justifyContent='center'
              sx={{
                backdropFilter: 'blur(6px)',
                opacity: 0,
                transform: 'translateY(15px)',
                transition: 'all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1)',
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
                gap={1.2}
                fontWeight={700}
                fontSize='0.85rem'
                boxShadow={(theme) => theme.palette.mode === 'light' 
                  ? '0 10px 20px rgba(0,0,0,0.15)' 
                  : '0 10px 20px rgba(0,0,0,0.4)'}
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
      <Box px={0.5} pb={0.5}>
        <Box display="flex" alignItems="center" gap={1.2} mb={1.8}>
          <VerifiedIcon sx={{ color: 'primary.main', fontSize: '1.25rem' }} />
          <Typography
            variant="caption"
            fontWeight={800}
            color="primary.main"
            textTransform='uppercase'
            letterSpacing={1.2}
          >
            {cert.issuer}
          </Typography>
        </Box>

        <Typography
          component="h3"
          variant="h6"
          fontWeight={800}
          lineHeight={1.4}
          mb={2.5}
          fontSize='1.15rem'
          color='text.primary'
          sx={{
            letterSpacing: '-0.01em',
          }}
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
          <Typography variant="caption" color="text.secondary" fontWeight={600} sx={{ textTransform: 'uppercase', fontSize: '0.7rem', letterSpacing: '0.05rem' }}>
            Issued on
          </Typography>
          <Typography variant="caption" color="text.primary" fontWeight={750} sx={{ fontSize: '0.75rem' }}>
            {cert.date}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default CertificateCard;
