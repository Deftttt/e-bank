import React, { useState, useEffect } from 'react';
import { Container, TextField, Button, Typography } from '@mui/material';
import { sendForgotPasswordEmail } from './services/AuthService';

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsButtonDisabled(true);
    try {
      const response = await sendForgotPasswordEmail(email);
    } catch (error) {
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
      </form>
    </Container>
  );
};

export default ForgotPasswordPage;