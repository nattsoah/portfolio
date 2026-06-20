'use client';
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

export interface ProjectCardProps {
  project: ProjectItem;
  isModal?: boolean;
  onOpenMedia?: (project: ProjectItem) => void;
  sx?: SxProps<Theme>;
}

export const ProjectCard = ({ project, isModal = false, onOpenMedia, sx }: ProjectCardProps) => {
  return (
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
          boxShadow: (theme) => theme.palette.mode === 'light' 
            ? '0px 12px 32px -8px rgba(15,23,42,0.15)' 
            : '0px 12px 32px -8px rgba(0,0,0,0.5)',
        },
        ...sx,
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
          <Image
            src={project.image}
            alt={project.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            style={{ objectFit: 'cover' }}
            priority={!isModal}
          />
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
          top={12}
          left={12}
          bgcolor={'primary.main'}
          color='primary.contrastText'
          fontSize='0.6rem'
          fontWeight={700}
          px={1.2}
          py={0.3}
          borderRadius={1}
          letterSpacing={0.5}
          textTransform='uppercase'
          boxShadow={(theme) => theme.palette.mode === 'light' 
            ? '0 4px 12px rgba(0,0,0,0.1)' 
            : '0 4px 12px rgba(0,0,0,0.5)'}
        >
          {project.type}
        </Box>
      </Box>

      {/* Content */}
      <Box p={{ xs: 2, md: isModal ? 2 : 3 }} display="flex" flexDirection="column" flexGrow={1} gap={1.5}>
        <Typography component="h3" variant={isModal ? "subtitle1" : "h6"} fontWeight={700} color="text.primary">
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
                '&:hover': { color: 'primary.main' },
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
                '&:hover': { color: 'primary.main' },
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
