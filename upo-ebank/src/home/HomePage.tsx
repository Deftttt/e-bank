import React from 'react';
import { Box, Button, Card, CardContent, Container, Grid, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import Navbar from '../shared/ui/Navbar';

const HomePage = () => {
  const navigate = useNavigate();
  const { auth } = useAuth();

  const isEmployee = auth?.roles?.includes('EMPLOYEE_RIGHTS');
  const isClient = auth?.roles?.includes('USER_RIGHTS');

  const handleNavigation = (path) => {
    navigate(path);
  };

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
          <Typography variant="h2" component="div" gutterBottom>
            Welcome to Your Banking Dashboard
          </Typography>

          {isClient && (
            <Typography variant="h6" component="div" gutterBottom>
              Welcome to our bank. We offer a wide range of services to meet your financial needs. You can manage your accounts, view transaction history, and apply for loans. Use the buttons below to navigate to different sections.
            </Typography>
          )}

          {isEmployee && (
            <Typography variant="h6" component="div" gutterBottom>
              As an employee, you can manage client accounts, view transactions, and handle loan applications. Use the buttons below to access the various sections of your dashboard.
            </Typography>
          )}

          <Grid container spacing={3} mt={4} justifyContent="center">
            {isClient && (
              <>
                <Grid item xs={12} sm={6} md={4}>
                  <Card elevation={3} sx={{ boxShadow: 3 }}>
                    <CardContent>
                      <Typography variant="h5" component="div" gutterBottom>
                        Your Accounts
                      </Typography>
                      <Typography variant="body2" component="div">
                        View and manage your bank accounts.
                      </Typography>
                      <Box mt={2}>
                        <Button variant="contained" color="primary" fullWidth onClick={() => handleNavigation(`/accounts-page`)}>
                          Go to Accounts
                        </Button>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>

                <Grid item xs={12} sm={6} md={4}>
                  <Card elevation={3} sx={{ boxShadow: 3 }}>
                    <CardContent>
                      <Typography variant="h5" component="div" gutterBottom>
                        Manage your Account
                      </Typography>
                      <Typography variant="body2" component="div">
                        Update your profile informations and security settings.
                      </Typography>
                      <Box mt={2}>
                        <Button variant="contained" color="primary" fullWidth onClick={() => handleNavigation(`/user-info`)}>
                          Account Settings
                        </Button>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>

                <Grid item xs={12} sm={6} md={4}>
                  <Card elevation={3} sx={{ boxShadow: 3 }}>
                    <CardContent>
                      <Typography variant="h5" component="div" gutterBottom>
                        Loans
                      </Typography>
                      <Typography variant="body2" component="div">
                        View and manage your loans.
                      </Typography>
                      <Box mt={2}>
                        <Button variant="contained" color="primary" fullWidth onClick={() => handleNavigation('/loans-page')}>
                          Go to Loans
                        </Button>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              </>
            )}

            {isEmployee && (
              <>
                {auth?.roles?.includes('VIEW_LOANS') && (
                  <Grid item xs={12} sm={6} md={4}>
                    <Card elevation={3} sx={{ boxShadow: 3 }}>
                      <CardContent>
                        <Typography variant="h5" component="div" gutterBottom>
                          Loans
                        </Typography>
                        <Typography variant="body2" component="div">
                          Loans management section.
                        </Typography>
                        <Box mt={2}>
                          <Button variant="contained" color="primary" fullWidth onClick={() => handleNavigation('/loans-page')}>
                            Go to Loans
                          </Button>
                        </Box>
                      </CardContent>
                    </Card>
                  </Grid>
                )}
  
                <Grid item xs={12} sm={6} md={4}>
                  <Card elevation={3} sx={{ boxShadow: 3 }}>
                    <CardContent>
                      <Typography variant="h5" component="div" gutterBottom>
                        Manage your Account
                      </Typography>
                      <Typography variant="body2" component="div">
                        Update your profile informations and security settings
                      </Typography>
                      <Box mt={2}>
                        <Button variant="contained" color="primary" fullWidth onClick={() => handleNavigation(`/user-info`)}>
                          Account Settings
                        </Button>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>

                <Grid item xs={12} sm={6} md={4}>
                  <Card elevation={3} sx={{ boxShadow: 3 }}>
                    <CardContent>
                      <Typography variant="h5" component="div" gutterBottom>
                        Transactions
                      </Typography>
                      <Typography variant="body2" component="div">
                        View and manage transactions.
                      </Typography>
                      <Box mt={2}>
                        <Button variant="contained" color="primary" fullWidth onClick={() => handleNavigation('/transactions-page')}>
                          Go to Transactions
                        </Button>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>

              {auth?.roles?.includes('VIEW_ACCOUNTS') && (
                <Grid item xs={12} sm={6} md={4}>
                  <Card elevation={3} sx={{ boxShadow: 3 }}>
                    <CardContent>
                      <Typography variant="h5" component="div" gutterBottom>
                        Accounts
                      </Typography>
                      <Typography variant="body2" component="div">
                        Accounts management section.
                      </Typography>
                      <Box mt={2}>
                        <Button variant="contained" color="primary" fullWidth onClick={() => handleNavigation('/accounts-page')}>
                          Go to Accounts
                        </Button>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              )}

              {auth?.roles?.includes('VIEW_DEPOSITS') && (
                <Grid item xs={12} sm={6} md={4}>
                  <Card elevation={3} sx={{ boxShadow: 3 }}>
                    <CardContent>
                      <Typography variant="h5" component="div" gutterBottom>
                        Deposits
                      </Typography>
                      <Typography variant="body2" component="div">
                        Deposits management section.
                      </Typography>
                      <Box mt={2}>
                        <Button variant="contained" color="primary" fullWidth onClick={() => handleNavigation('/deposits-page')}>
                          Go to Deposits
                        </Button>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              )}

                <Grid item xs={12} sm={6} md={4}>
                  <Card elevation={3} sx={{ boxShadow: 3 }}>
                    <CardContent>
                      <Typography variant="h5" component="div" gutterBottom>
                        Clients
                      </Typography>
                      <Typography variant="body2" component="div">
                        List of bank clients.
                      </Typography>
                      <Box mt={2}>
                        <Button variant="contained" color="primary" fullWidth onClick={() => handleNavigation('/clients')}>
                          Go to Clients
                        </Button>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              </>
            )}
          </Grid>
        </Box>
      </Container>
    </>
  );
};

export default HomePage;
