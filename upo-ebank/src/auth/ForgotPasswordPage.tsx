import React, { useState, useEffect } from 'react';
import { Container, TextField, Button, Typography, Box } from '@mui/material';
import { sendForgotPasswordEmail } from './services/AuthService';

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsButtonDisabled(true);
    try {
      const response = await sendForgotPasswordEmail(email);
    } catch (error) {
      if (error && (error as any).response && (error as any).response.data) {
        setError((error as any).response.data.message);
      }
      console.error('Error while sending forgot password email:', error);
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
      <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      height="50vh"
      >
      <Typography variant="h6" gutterBottom>
        Forgot Your Password?
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email Address"
          name="email"
          autoComplete="email"
          autoFocus
          value={email}
          onChange={handleEmailChange}
          error={!!error}
          helperText={error}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          disabled={isButtonDisabled}
        >
          Send Reset Password Email
        </Button>
        {isButtonDisabled && (
          <Typography variant="body2"  align="center">
            Please try again in 30 seconds.
          </Typography>
        )}
      </form>
      </Box>
    </Container>
  );
};

export default ForgotPasswordPage;