import React from 'react';
import { Box, Card, CardContent, Container, Grid, Typography } from '@mui/material';
import { styled } from '@mui/system';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import LocationOnIcon from '@mui/icons-material/LocationOn';

const StyledCard = styled(Card)(({ theme }) => ({
  boxShadow: theme.shadows[3],
  marginTop: theme.spacing(3),
  padding: theme.spacing(4),
}));

const WelcomePage = () => {
  return (
    <>
      <Container maxWidth="lg">
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          padding={4}
          minHeight="80vh"
          textAlign="center"
        >
          <Typography variant="h2" component="div" gutterBottom>
            Welcome to Upo Bank
          </Typography>
          <Typography variant="h5" component="div" gutterBottom>
            We provide a wide range of financial services to meet your needs. Whether you are looking to open a new account, apply for a loan, or manage your finances, we are here to help.
          </Typography>
          <Grid container spacing={4} mt={4} justifyContent="center">
            <Grid item xs={12} sm={6}>
              <StyledCard>
                <CardContent>
                  <Typography variant="h4" component="div" gutterBottom>
                    About Us
                  </Typography>
                  <Typography variant="body1" component="div">
                    Established in 1980, our bank has been serving the community for over 40 years. We pride ourselves on our customer service and our wide range of financial products designed to meet your needs.
                  </Typography>
                  <Typography variant="body1" component="div" mt={2}>
                    Our mission is to provide quality financial services that help you achieve your financial goals. We are committed to excellence, integrity, and innovation.
                  </Typography>
                </CardContent>
              </StyledCard>
            </Grid>
            <Grid item xs={12} sm={6}>
              <StyledCard>
                <CardContent>
                  <Typography variant="h4" component="div" gutterBottom>
                    Contact Us
                  </Typography>
                  <Typography variant="body1" component="div">
                    Our customer support team is here to help you with any questions or concerns you may have. You can reach us through the following methods:
                  </Typography>
                  <Typography variant="body1" component="div" mt={2} display="flex" alignItems="center" justifyContent="center">
                    <PhoneIcon sx={{ mr: 1 }} /> +48 997-998-996
                    </Typography>
                    <Typography variant="body1" component="div" display="flex" alignItems="center" justifyContent="center">
                    <EmailIcon sx={{ mr: 1 }} /> support@upobank.com
                    </Typography>
                    <Typography variant="body1" component="div" display="flex" alignItems="center" justifyContent="center">
                    <LocationOnIcon sx={{ mr: 1 }} /> Norymberska 10, 37-764 Kraków, Poland
                    </Typography>
                </CardContent>
              </StyledCard>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </>
  );
};

export default WelcomePage;
