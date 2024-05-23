import React from 'react';
import { Box, Button, Card, CardContent, Container, Grid, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import Navbar from '../shared/ui/Navbar';

const TransactionsPage = () => {
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
            Transactions Page
          </Typography>

          {isClient && (
            <Typography variant="h6" component="div" gutterBottom>
              Manage your transactions efficiently. You can view all your transactions, transfer money, and more.
              Use the buttons below to navigate to the relevant sections.
            </Typography>
          )}

          {isEmployee && (
            <Typography variant="h6" component="div" gutterBottom>
              As an employee, this is the place where you can manage client transactions, 
              oversee money transfers, and provide necessary support. 
              Use the buttons below to view all transactions or specific client transactions.
            </Typography>
          )}

          <Grid container spacing={3} mt={4} justifyContent="center">
            {isClient && (
              <>
                <Grid item xs={12} sm={6} md={4}>
                  <Card elevation={3} sx={{ boxShadow: 3 }}>
                    <CardContent>
                      <Typography variant="h5" component="div" gutterBottom>
                        Your Transactions
                      </Typography>
                      <Typography variant="body2" component="div">
                        View and manage your transactions.
                      </Typography>
                      <Box mt={2}>
                        <Button variant="contained" color="primary" fullWidth onClick={() => handleNavigation(`/transactions/client/${auth.id}`)}>
                          Go to Your Transactions
                        </Button>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>

                <Grid item xs={12} sm={6} md={4}>
                  <Card elevation={3} sx={{ boxShadow: 3 }}>
                    <CardContent>
                      <Typography variant="h5" component="div" gutterBottom>
                        Transfer Money
                      </Typography>
                      <Typography variant="body2" component="div">
                        Transfer money to another account.
                      </Typography>
                      <Box mt={2}>
                        <Button variant="contained" color="primary" fullWidth onClick={() => handleNavigation(`/transactions/account/${auth.id}/transfer`)}>
                          Transfer Money
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
                        All Transactions
                      </Typography>
                      <Typography variant="body2" component="div">
                        View all transactions in the bank.
                      </Typography>
                      <Box mt={2}>
                        <Button variant="contained" color="primary" fullWidth onClick={() => handleNavigation('/transactions')}>
                          View All Transactions
                        </Button>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>

                <Grid item xs={12} sm={6} md={4}>
                  <Card elevation={3} sx={{ boxShadow: 3 }}>
                    <CardContent>
                      <Typography variant="h5" component="div" gutterBottom>
                        Client Transactions
                      </Typography>
                      <Typography variant="body2" component="div">
                        View transactions of a specific client.
                      </Typography>
                      <Box mt={2}>
                        <Button variant="contained" color="primary" fullWidth onClick={() => handleNavigation(`/transactions/client/${auth.id}`)}>
                          View Client Transactions
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

export default TransactionsPage;