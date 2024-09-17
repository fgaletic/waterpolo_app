import { Box, Typography, Link as MuiLink } from '@mui/material';

const Footer = () => {
  return (
    <Box
      sx={{
        backgroundColor: '#0e4b67',
        color: '#ffffff',
        padding: '20px',
        textAlign: 'center',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '20px',
        flexWrap: 'wrap',                 
      }}
    >
      {/* Copyright Information */}
      <Typography variant="body1">
        Panteres Grogues 2024. Todos los derechos reservados.
      </Typography>

      {/* External Links (Including About Us) */}
      <MuiLink
        href="https://www.panteresgrogues.org/es/waterpolo-es/"
        target="_blank"
        rel="noopener noreferrer"
        color="inherit"
        underline="hover"
        sx={{ fontSize: '16px' }}
      >
        About Us
      </MuiLink>

      <MuiLink
        href="https://www.panteresgrogues.org/es/contacto/"
        color="inherit"
        target="_blank"
        underline="hover"
        sx={{ fontSize: '16px' }}
      >
        Contact Us
      </MuiLink>

      <MuiLink
        href="https://www.panteresgrogues.org/es/politica-privacidad/"
        target="_blank"
        color="inherit"
        underline="hover"
        sx={{ fontSize: '16px' }}
      >
        Privacy Policy
      </MuiLink>
    </Box>
  );
};

export default Footer;