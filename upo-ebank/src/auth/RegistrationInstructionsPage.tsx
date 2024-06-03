import React, { useState, useEffect } from 'react';
import { Container, Typography, Box, Button, CircularProgress } from '@mui/material';
import { resendConfirmationEmail } from './services/AuthService';
import { useLocation } from 'react-router-dom';
import Navbar from '../shared/ui/Navbar';

const RegistrationInstructionsPage = () => {
  const location = useLocation();
  const email = location.state.email;
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleResendEmail = async () => {
    setIsButtonDisabled(true);
    setLoading(true);
    try {
      await resendConfirmationEmail(email);
    } catch (error) {
      setError('Error while resending email. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isButtonDisabled) {
      const timer = setTimeout(() => setIsButtonDisabled(false), 30000);
      return () => clearTimeout(timer);
    }
  }, [isButtonDisabled]);

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
          sx={{ marginTop: '10vh' }}
        >
          <Typography variant="h4" align="center" gutterBottom>
            Confirm Your Registration
          </Typography>
          <Typography variant="body1" align="center" gutterBottom>
            We've sent a confirmation email to your address. Please check your inbox and click the link in the email to confirm your registration.
          </Typography>
          <Box mt={2} display="flex" flexDirection="column" alignItems="center">
            <Button
              variant="contained"
              color="primary"
              onClick={handleResendEmail}
              disabled={isButtonDisabled}
              sx={{ marginBottom: 2 }}
            >
              {loading ? <CircularProgress size={24} /> : 'Resend Confirmation Email'}
            </Button>
            {isButtonDisabled && (
              <Typography variant="body2" align="center">
                Please try again in 30 seconds.
              </Typography>
            )}
            {error && (
              <Typography variant="body2" color="error" align="center">
                {error}
              </Typography>
            )}
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default RegistrationInstructionsPage;
