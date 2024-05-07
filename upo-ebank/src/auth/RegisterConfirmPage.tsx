import React, { useEffect, useState } from 'react';
import { Container, Typography, Box, Button, Alert, AlertTitle } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import { confirmRegistration } from './services/AuthService';
const RegisterConfirmPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [message, setMessage] = useState('');
    const [severity, setSeverity] = useState('info');
    
    useEffect(() => {
        const token = new URLSearchParams(location.search).get('token');
        if (token) {
            confirmRegistration(token)
                .then((response) => {
                    if (response.status === 200) {
                        setMessage(response.data.message || 'Your registration has been confirmed. You can now log in to your account.');
                        setSeverity('success');
                    } else {
                        setMessage(response.data.message || 'There was an error confirming your registration. Please try again.');
                        setSeverity('error');
                    }
                })
                .catch(() => {
                    setMessage('There was an unexpected error processing your request.');
                    setSeverity('error');
                });
        }
    }, []);


    return (
        <Container maxWidth="sm">
            <Box
                display="flex"
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
                height="50vh"
            >
                <Alert severity={severity} variant='filled' sx={{ width: '100%', marginBottom: 2 }}>
                <AlertTitle>Registration Confirmation</AlertTitle>
                    {message}
                </Alert>
                <Button variant="contained" color="primary" onClick={() => navigate('/login')}>
                    Go to Login Page
                </Button>
            </Box>
        </Container>
    );
};

export default RegisterConfirmPage;
