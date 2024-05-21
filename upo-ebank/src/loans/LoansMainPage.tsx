    import React from 'react';
    import { Box, Button, Card, CardContent, Container, Grid, Typography } from '@mui/material';
    import { useNavigate } from 'react-router-dom';
    import useAuth from '../hooks/useAuth';
    import Navbar from '../shared/ui/Navbar';

    const LoansPage = () => {
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
                Loans Page
            </Typography>

            {isClient && (
                <Typography variant="h6" component="div" gutterBottom>
                We offer a variety of loan options to meet your financial needs. Whether you are looking to buy a home, 
                renovate your property, or finance a personal project, we have a loan that suits you. 
                You can apply for a new loan or view your existing loans by clicking the buttons below.
                </Typography>
            )}

            {isEmployee && (
                <Typography variant="h6" component="div" gutterBottom>
                As an employee, this is the place where you can manage the loans assigned to you. 
                You can review, approve, or reject loan applications, and provide necessary support to our clients. 
                Use the buttons below to view all loans assigned to you or to manage all loans in the bank.
                </Typography>
            )}

            <Grid container spacing={3} mt={4} justifyContent="center">
                {isClient && (
                <>
                    <Grid item xs={12} sm={6} md={4}>
                    <Card elevation={3} sx={{ boxShadow: 3 }}>
                        <CardContent>
                        <Typography variant="h5" component="div" gutterBottom>
                            Your Loans
                        </Typography>
                        <Typography variant="body2" component="div">
                            View and manage your loans.
                        </Typography>
                        <Box mt={2}>
                            <Button variant="contained" color="primary" fullWidth onClick={() => handleNavigation(`/loans/client/${auth.id}`)}>
                            Go to Your Loans
                            </Button>
                        </Box>
                        </CardContent>
                    </Card>
                    </Grid>

                    <Grid item xs={12} sm={6} md={4}>
                    <Card elevation={3} sx={{ boxShadow: 3 }}>
                        <CardContent>
                        <Typography variant="h5" component="div" gutterBottom>
                            Request a Loan
                        </Typography>
                        <Typography variant="body2" component="div">
                            Apply for a new loan.
                        </Typography>
                        <Box mt={2}>
                            <Button variant="contained" color="primary" fullWidth onClick={() => handleNavigation('/request-loan')}>
                            Request a Loan
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
                            Assigned Loans
                        </Typography>
                        <Typography variant="body2" component="div">
                            View and manage loans assigned to you.
                        </Typography>
                        <Box mt={2}>
                            <Button variant="contained" color="primary" fullWidth onClick={() => handleNavigation(`/loans/employee/${auth.id}`)}>
                            Go to Assigned Loans
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

    export default LoansPage;
