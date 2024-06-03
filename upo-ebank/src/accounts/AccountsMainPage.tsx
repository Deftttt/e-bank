import React, { useState } from 'react';
import { Box, Button, Card, CardContent, Container, Grid, TextField, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import Navbar from '../shared/ui/Navbar';

const AccountsMainPage = () => {
  const navigate = useNavigate();
  const { auth } = useAuth();
  const isEmployee = auth?.roles?.includes('EMPLOYEE_RIGHTS');
  const isClient = auth?.roles?.includes('USER_RIGHTS');

  const [accountNumber, setAccountNumber] = useState('');
  const [clientId, setClientId] = useState('');

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
            Accounts Page
          </Typography>

          {isClient && (
            <Typography variant="h6" component="div" gutterBottom>
              Here you can view and manage your bank accounts. You can also create a new account.
            </Typography>
          )}

          {isEmployee && (
            <Typography variant="h6" component="div" gutterBottom>
              As an employee, you can manage all bank accounts. Use the options below to view all accounts or search for specific accounts by client ID.
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
                        View and manage your accounts.
                      </Typography>
                      <Box mt={2}>
                        <Button variant="contained" color="primary" fullWidth onClick={() => handleNavigation(`/accounts/clients/${auth.id}`)}>
                          Go to Your Accounts
                        </Button>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>

                <Grid item xs={12} sm={6} md={4}>
                  <Card elevation={3} sx={{ boxShadow: 3 }}>
                    <CardContent>
                      <Typography variant="h5" component="div" gutterBottom>
                        Create New Account
                      </Typography>
                      <Typography variant="body2" component="div">
                        Open a new bank account.
                      </Typography>
                      <Box mt={2}>
                        <Button variant="contained" color="primary" fullWidth onClick={() => handleNavigation('/create-account')}>
                          Create Account
                        </Button>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              </>
            )}

            {isEmployee && (
              <>
                <Grid item xs={12} sm={6} md={4}>
                  <Card elevation={3} sx={{ boxShadow: 3 }}>
                    <CardContent>
                      <Typography variant="h5" component="div" gutterBottom>
                        All Accounts
                      </Typography>
                      <Typography variant="body2" component="div">
                        View and manage all bank accounts.
                      </Typography>
                      <Box mt={2}>
                        <Button variant="contained" color="primary" fullWidth onClick={() => handleNavigation('/accounts')}>
                          Go to All Accounts
                        </Button>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>


                <Grid item xs={12} sm={6} md={4}>
                  <Card elevation={3} sx={{ boxShadow: 3 }}>
                    <CardContent>
                      <Typography variant="h5" component="div" gutterBottom>
                        Account by Client ID
                      </Typography>
                      <Typography variant="body2" component="div">
                        Search accounts by client ID.
                      </Typography>
                      <Box mt={2}>
                        <TextField
                          fullWidth
                          margin="normal"
                          label="Client ID"
                          value={clientId}
                          onChange={(e) => setClientId(e.target.value)}
                        />
                        <Button variant="contained" color="primary" fullWidth onClick={() => handleNavigation(`/accounts/clients/${clientId}`)}>
                          Search Accounts
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

export default AccountsMainPage;
