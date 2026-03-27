'use client';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Link from '@mui/material/Link';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import EmailIcon from '@mui/icons-material/Email';
import { CONTACT_INFO, SITE_NAME } from '@/const/navigation';

const Footer = () => {
  return (
    <Box
      component="footer"
      py={6}
      px={2}
      mt='auto'
      sx={{
        backgroundColor: (theme) =>
          theme.palette.mode === 'light'
            ? theme.palette.grey[100]
            : theme.palette.grey[900],
        borderTop: (theme) => `1px solid ${theme.palette.divider}`,
      }}
    >
      <Container maxWidth="lg">
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          spacing={2}
          justifyContent="space-between"
          alignItems="center"
        >
          <Box>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1, justifyContent: { xs: 'center', sm: 'flex-start' } }}>
              <Box
                component="img"
                src="/logo.svg"
                alt="Logo"
                sx={{ height: 24, mr: 1 }}
              />
              <Typography variant="h6" color="primary" fontWeight={700}>
                {SITE_NAME}
              </Typography>
            </Box>
            <Typography variant="body2" color="text.secondary" textAlign={{ xs:'center' , sm:'start'}}>
              © {new Date().getFullYear()} All rights reserved.
            </Typography>
          </Box>

          <Stack direction="row" spacing={1}>
            <IconButton
              component={Link}
              href={CONTACT_INFO.github}
              target="_blank"
              aria-label="GitHub"
              color="inherit"
            >
              <GitHubIcon />
            </IconButton>
            <IconButton
              component={Link}
              href={CONTACT_INFO.linkedin}
              target="_blank"
              aria-label="LinkedIn"
              color="inherit"
            >
              <LinkedInIcon />
            </IconButton>
            <IconButton
              component={Link}
              href={`mailto:${CONTACT_INFO.email}`}
              aria-label="Email"
              color="inherit"
            >
              <EmailIcon />
            </IconButton>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
};

export default Footer;
