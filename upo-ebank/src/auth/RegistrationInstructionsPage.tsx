import React, { useState, useEffect } from 'react';
import { Container, Typography, Box, Button } from '@mui/material';
import { resendConfirmationEmail } from './services/AuthService';
import { useLocation } from 'react-router-dom';

const RegistrationInstructionsPage = () => {
  const location = useLocation();
  const email = location.state.email;
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const handleResendEmail = async () => {
    setIsButtonDisabled(true);
    try {
      const response = await resendConfirmationEmail(email);
    } catch (error) {
      console.error('Error while registering:', error);
    }
  };

  useEffect(() => {
    if (isButtonDisabled) {
      const timer = setTimeout(() => setIsButtonDisabled(false), 30000);
      return () => clearTimeout(timer);
    }
  }, [isButtonDisabled]);

  return (
    <Container maxWidth="sm">
      <Typography variant="h6" gutterBottom>
        Confirm Your Registration
      </Typography>
      <Typography>
        We've sent a confirmation email to your address. Please check your inbox and click the link in the email to confirm your registration.
      </Typography>
      <Box mt={2}>
        <Button variant="contained" color="primary" onClick={handleResendEmail} disabled={isButtonDisabled}>
          Resend Confirmation Email
        </Button>
      </Box>
      {isButtonDisabled && <Typography variant="body2" color="textSecondary">You can resend the email in {Math.ceil(30 - new Date().getSeconds() / 1000)} seconds.</Typography>}
    </Container>
  );
};

export default RegistrationInstructionsPage;