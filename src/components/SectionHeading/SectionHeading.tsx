'use client';
import React from 'react';
import Typography from '@mui/material/Typography';
import { SxProps, Theme } from '@mui/material/styles';
import Reveal from '@/components/Reveal';

interface SectionHeadingProps {
  title: string;
  sx?: SxProps<Theme>;
}

export const SectionHeading = ({ title, sx }: SectionHeadingProps) => {
  return (
    <Reveal direction="up" delay={100}>
      <Typography
        variant="h2"
        fontWeight={900}
        position="relative"
        display="inline-block"
        fontSize={{ xs: '2rem', md: '3rem' }}
        sx={{
          '&::after': {
            content: '""',
            position: 'absolute',
            bottom: -12,
            left: 0,
            width: '80px',
            height: '4px',
            bgcolor: 'primary.main',
            borderRadius: '2px',
          },
          ...sx
        }}
      >
        {title}
      </Typography>
    </Reveal>
  );
};

export default SectionHeading;
