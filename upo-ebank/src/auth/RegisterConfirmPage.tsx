import React, { useEffect, useState } from 'react';
import { Container, Typography, Box, Button } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import { confirmRegistration } from './services/AuthService';
import CustomAlert from '../shared/ui/CustomAlert';

const RegisterConfirmPage: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [message, setMessage] = useState('');
    const [severity, setSeverity] = useState<'success' | 'error' | 'info'>('info');

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
    }, [location]);

    return (
        <Container maxWidth="sm">
          <Box
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            height="50vh"
          >
            <Box pb={2}>
              <CustomAlert 
                severity={severity} 
                title="Registration Confirmation" 
                message={message + "... You will be redirected to the login page in 5 seconds."} 
                open={!!message} 
                onClose={() => navigate('/login')}
                autoCloseTime={5000}
              />
            </Box>
            <Button variant="contained" color="primary" onClick={() => navigate('/login')}>
              Go to Login Page
            </Button>
          </Box>
        </Container>
      );
};

export default RegisterConfirmPage;
