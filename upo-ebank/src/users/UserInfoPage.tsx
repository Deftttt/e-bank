import React from 'react';
import { Box, Button, Card, CardContent, Container, Grid, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import Navbar from '../shared/ui/Navbar';

const UserInfoPage = () => {
  const navigate = useNavigate();
  const { auth } = useAuth();

  return (
    <>
      <Navbar />
      <Container maxWidth="lg">
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          padding={4}
          minHeight="80vh"
          textAlign="center"
        >
          <Typography variant="h4" component="div" gutterBottom>
            User Information
          </Typography>

          <Typography variant="body1" component="div" gutterBottom>
            Logged in as: {auth?.firstName} {auth?.lastName} ({auth?.email})
          </Typography>

          <Grid container spacing={3} mt={4} justifyContent="center">
            <Grid item xs={12} sm={6} md={4}>
              <Card elevation={3} sx={{ boxShadow: 3 }}>
                <CardContent>
                  <Typography variant="h5" component="div" gutterBottom>
                    Setup MFA
                  </Typography>
                  <Typography variant="body2" component="div">
                    Configure multi-factor authentication for added security.
                  </Typography>
                  <Box mt={2}>
                    <Button variant="contained" color="primary" fullWidth onClick={() => navigate('/setup-mfa')}>
                      Setup MFA
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} sm={6} md={4}>
              <Card elevation={3} sx={{ boxShadow: 3 }}>
                <CardContent>
                  <Typography variant="h5" component="div" gutterBottom>
                    Update Profile
                  </Typography>
                  <Typography variant="body2" component="div">
                    Update your user profile information.
                  </Typography>
                  <Box mt={2}>
                    <Button variant="contained" color="primary" fullWidth onClick={() => navigate(`/user-update/${auth.id}`)}>
                      Update Profile
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </>
  );
};

export default UserInfoPage;
