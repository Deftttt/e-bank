import React, { useEffect, useState } from 'react';
import { Container, Typography, Box, Button } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import { confirmRegistration } from './services/AuthService';
import CustomAlert from '../shared/ui/CustomAlert';
import { useTheme } from '@mui/material/styles';

const RegisterConfirmPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
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

  useEffect(() => {
    if (severity === 'success') {
      const timer = setTimeout(() => {
        navigate('/login');
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [severity, navigate]);

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
          sx={{ marginTop: '10vh' }}
        >
          <Typography variant="h4" align="center" gutterBottom>
            Registration Confirmation
          </Typography>
          <Box pb={2} width="100%" display="flex" justifyContent="center">
            <CustomAlert
              severity={severity}
              title="Registration Confirmation"
              message={message + (severity === 'success' ? " You will be redirected to the login page in 5 seconds." : "")}
              open={!!message}
              onClose={() => navigate('/login')}
              autoCloseTime={severity === 'success' ? 5000 : undefined}
            />
          </Box>
          <Button variant="contained" color="primary" onClick={() => navigate('/login')}>
            Go to Login Page
          </Button>
        </Box>
      </Container>
    </>
  );
};

export default RegisterConfirmPage;
