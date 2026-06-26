'use client';
import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import IconButton from '@mui/material/IconButton';
import GitHubIcon from '@mui/icons-material/GitHub';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import VisibilityIcon from '@mui/icons-material/Visibility';
import CollectionsIcon from '@mui/icons-material/Collections';
import { SxProps, Theme } from '@mui/material/styles';
import Image from 'next/image';
import { ProjectItem } from '@/types/portfolio';
import { alpha } from '@mui/material/styles';

export interface ProjectCardProps {
  project: ProjectItem;
  isModal?: boolean;
  onOpenMedia?: (project: ProjectItem) => void;
  sx?: SxProps<Theme>;
}

export const ProjectCard = ({ project, isModal = false, onOpenMedia, sx }: ProjectCardProps) => {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isModal) return; // Simple cards in grid modal
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    
    // Mouse coords relative to card
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Normalized position from center (-0.5 to 0.5)
    const normX = (x / rect.width) - 0.5;
    const normY = (y / rect.height) - 0.5;
    
    setTilt({
      x: normY * -12, // Rotate around X axis (tilt vertical)
      y: normX * 12,  // Rotate around Y axis (tilt horizontal)
    });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTilt({ x: 0, y: 0 });
  };

  return (
    <Box
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        border: '1px solid',
        borderColor: 'divider',
        borderRadius: 3,
        overflow: 'hidden',
        bgcolor: (theme) => theme.palette.mode === 'light'
          ? alpha(theme.palette.background.paper, 0.4)
          : alpha(theme.palette.background.neutral || theme.palette.background.paper, 0.25),
        backdropFilter: 'blur(20px)',
        transformOrigin: 'center',
        transform: !isModal && isHovered
          ? `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) translateY(-6px) scale3d(1.01, 1.01, 1.01)`
          : 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0) scale3d(1, 1, 1)',
        boxShadow: (theme) => isHovered
          ? (theme.palette.mode === 'light' 
              ? '0px 20px 40px -10px rgba(15,23,42,0.12)' 
              : '0px 20px 40px -10px rgba(0,0,0,0.6)')
          : (theme.palette.mode === 'light'
              ? '0px 8px 24px -12px rgba(15,23,42,0.05)'
              : 'none'),
        transition: isHovered ? 'transform 0.08s ease-out, box-shadow 0.3s ease' : 'transform 0.5s cubic-bezier(0.25, 1, 0.5, 1), box-shadow 0.5s ease, background-color 0.5s ease',
        ...sx,
      }}
    >
      {/* Image / Placeholder */}
      <Box
        position='relative'
        height={isModal ? 160 : 220}
        bgcolor='primary.main'
        overflow='hidden'
        flexShrink={0}
      >
        {project.image ? (
          <Box
            sx={{
              position: 'relative',
              width: '100%',
              height: '100%',
              overflow: 'hidden',
            }}
          >
            <Image
              src={project.image}
              alt={project.title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
              style={{ 
                objectFit: 'cover',
                transform: !isModal && isHovered
                  ? `scale(1.12) translate3d(${tilt.y * -0.6}px, ${tilt.x * 0.6}px, 0)`
                  : 'scale(1.05) translate3d(0, 0, 0)',
                transition: isHovered ? 'transform 0.08s ease-out' : 'transform 0.5s cubic-bezier(0.25, 1, 0.5, 1)',
              }}
              priority={!isModal}
            />
          </Box>
        ) : (
          <Box
            width='100%'
            height='100%'
            display='flex'
            alignItems='center'
            justifyContent='center'
            sx={{
              background: (theme) => `linear-gradient(135deg, ${theme.palette.text.secondary} 0%, ${theme.palette.background.neutral} 100%)`,
            }}
          >
            <Typography
              fontSize='1rem'
              color='primary.contrastText'
              fontWeight={800}
              letterSpacing={2}
              sx={{ opacity: 0.3 }}
            >
              {'{ }'}
            </Typography>
          </Box>
        )}

        {/* Type badge */}
        <Box
          position='absolute'
          top={16}
          left={16}
          bgcolor={'primary.main'}
          color='primary.contrastText'
          fontSize='0.65rem'
          fontWeight={750}
          px={1.5}
          py={0.4}
          borderRadius={1.5}
          letterSpacing={0.8}
          textTransform='uppercase'
          boxShadow={(theme) => theme.palette.mode === 'light' 
            ? '0 4px 12px rgba(0,0,0,0.15)' 
            : '0 4px 12px rgba(0,0,0,0.5)'}
        >
          {project.type}
        </Box>
      </Box>

      {/* Content */}
      <Box p={{ xs: 2.5, md: isModal ? 2.5 : 3.5 }} display="flex" flexDirection="column" flexGrow={1} gap={2}>
        <Typography 
          component="h3" 
          variant={isModal ? "subtitle1" : "h6"} 
          fontWeight={800} 
          color="text.primary"
          sx={{
            fontSize: isModal ? '1rem' : '1.2rem',
            letterSpacing: '-0.01em',
          }}
        >
          {project.title}
        </Typography>

        <Typography 
          variant="body2" 
          color="text.secondary" 
          lineHeight={1.7} 
          flexGrow={1} 
          fontSize={isModal ? '0.8rem' : '0.9rem'}
        >
          {project.description}
        </Typography>

        {/* Tags */}
        <Box display="flex" flexWrap="wrap" gap={1}>
          {project.tags.map((tag) => (
            <Chip
              key={tag}
              label={tag}
              size="small"
              sx={{
                fontSize: '0.68rem',
                fontWeight: 600,
                bgcolor: (theme) => alpha(theme.palette.text.primary, 0.03),
                border: '1.2px solid',
                borderColor: 'divider',
                height: 22,
                transition: 'all 0.3s ease',
                '&:hover': {
                  borderColor: 'primary.main',
                  bgcolor: (theme) => alpha(theme.palette.primary.main, 0.05),
                }
              }}
            />
          ))}
        </Box>

        {/* Links */}
        <Box display="flex" gap={1} mt={1}>
          {project.github && (
            <IconButton
              component="a"
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              size="small"
              sx={{
                color: 'text.secondary',
                bgcolor: 'divider',
                width: 32,
                height: 32,
                transition: 'all 0.3s ease',
                '&:hover': { 
                  color: 'primary.main',
                  bgcolor: (theme) => alpha(theme.palette.primary.main, 0.1),
                  transform: 'translateY(-2px)',
                },
              }}
              aria-label={`${project.title} GitHub repository`}
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
                bgcolor: 'divider',
                width: 32,
                height: 32,
                transition: 'all 0.3s ease',
                '&:hover': { 
                  color: 'primary.main',
                  bgcolor: (theme) => alpha(theme.palette.primary.main, 0.1),
                  transform: 'translateY(-2px)',
                },
              }}
              aria-label={`${project.title} Live Demo`}
            >
              <OpenInNewIcon fontSize="small" />
            </IconButton>
          )}
          {(project.previewImages || project.previewImage) && onOpenMedia && (
            <IconButton
              onClick={() => onOpenMedia(project)}
              size="small"
              sx={{
                color: 'text.secondary',
                bgcolor: 'divider',
                width: 32,
                height: 32,
                transition: 'all 0.3s ease',
                '&:hover': { 
                  color: 'primary.main',
                  bgcolor: (theme) => alpha(theme.palette.primary.main, 0.1),
                  transform: 'translateY(-2px)',
                },
              }}
              aria-label={Array.isArray(project.previewImages) ? `${project.title} album preview` : `${project.title} preview`}
            >
              {Array.isArray(project.previewImages) ? (
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
};

export default ProjectCard;
