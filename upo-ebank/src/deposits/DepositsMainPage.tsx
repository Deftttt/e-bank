import React, { useState } from 'react';
import { Box, Button, Card, CardContent, Container, Grid, TextField, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const DepositsMainPage = () => {
    const navigate = useNavigate();
    const { auth } = useAuth();
    const [accountNumber, setAccountNumber] = useState('');

    const isEmployee = auth?.roles?.includes('VIEW_DEPOSITS');
    const isClient = auth?.roles?.includes('USER_RIGHTS');

    const handleNavigation = (path: string) => {
        navigate(path);
    };

    const handleAccountNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAccountNumber(e.target.value);
    };

    const handleSearch = () => {
        if (accountNumber) {
            navigate(`/deposits/account/${accountNumber}`);
        }
    };

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
                        Deposits Page
                    </Typography>

                    {isClient && (
                        <Typography variant="h6" component="div" gutterBottom>
                            Manage your deposits easily. You can request a new deposit or view your existing deposits.
                        </Typography>
                    )}

                    {isEmployee && (
                        <Typography variant="h6" component="div" gutterBottom>
                            Manage all deposits. View and manage deposits assigned to your account or search by account number.
                        </Typography>
                    )}

                    <Grid container spacing={3} mt={4} justifyContent="center">
                        {isClient && (
                            <>
                                <Grid item xs={12} sm={6} md={4}>
                                    <Card elevation={3} sx={{ boxShadow: 3 }}>
                                        <CardContent>
                                            <Typography variant="h5" component="div" gutterBottom>
                                                Your Deposits
                                            </Typography>
                                            <Typography variant="body2" component="div">
                                                View and manage your deposits.
                                            </Typography>
                                            <Box mt={2}>
                                                <Button variant="contained" color="primary" fullWidth onClick={() => handleNavigation(`/deposits/client/${auth.id}`)}>
                                                    Go to Your Deposits
                                                </Button>
                                            </Box>
                                        </CardContent>
                                    </Card>
                                </Grid>

                                <Grid item xs={12} sm={6} md={4}>
                                    <Card elevation={3} sx={{ boxShadow: 3 }}>
                                        <CardContent>
                                            <Typography variant="h5" component="div" gutterBottom>
                                                Request a Deposit
                                            </Typography>
                                            <Typography variant="body2" component="div">
                                                Apply for a new deposit.
                                            </Typography>
                                            <Box mt={2}>
                                                <Button variant="contained" color="primary" fullWidth onClick={() => handleNavigation('/request-deposit')}>
                                                    Request a Deposit
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
                                                All Deposits
                                            </Typography>
                                            <Typography variant="body2" component="div">
                                                View all deposits in the bank.
                                            </Typography>
                                            <Box mt={2}>
                                                <Button variant="contained" color="primary" fullWidth onClick={() => handleNavigation(`/deposits`)}>
                                                    Go to All Deposits
                                                </Button>
                                            </Box>
                                        </CardContent>
                                    </Card>
                                </Grid>

                                <Grid item xs={12} sm={6} md={4}>
                                    <Card elevation={3} sx={{ boxShadow: 3 }}>
                                        <CardContent>
                                            <Typography variant="h5" component="div" gutterBottom>
                                                Search Deposits by Account Number
                                            </Typography>
                                            <Typography variant="body2" component="div">
                                                Search for deposits by account number.
                                            </Typography>
                                            <Box mt={2}>
                                                <TextField
                                                    fullWidth
                                                    margin="normal"
                                                    label="Account Number"
                                                    value={accountNumber}
                                                    onChange={handleAccountNumberChange}
                                                />
                                                <Button variant="contained" color="primary" fullWidth onClick={handleSearch}>
                                                    Search Deposits
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

export default DepositsMainPage;
