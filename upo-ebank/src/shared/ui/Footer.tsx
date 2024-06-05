import React from 'react';
import { Box, Container, Typography } from '@mui/material';
import { styled } from '@mui/system';

const FooterContainer = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  padding: theme.spacing(3, 2),
  marginTop: 'auto',
  textAlign: 'center',
}));

const Footer = () => {
  return (
    <FooterContainer>
      <Container maxWidth="lg">
        <Typography variant="body1" component="div">
          © 2024 Upo Bank. All rights reserved.
        </Typography>
      </Container>
    </FooterContainer>
  );
};

export default Footer;
