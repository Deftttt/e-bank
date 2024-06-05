import React, { useState, useEffect } from 'react';
import { Container, TextField, Button, Typography, Box, CircularProgress } from '@mui/material';
import { sendForgotPasswordEmail } from './services/AuthService';
import { useTheme } from '@mui/material/styles';

const ForgotPasswordPage = () => {
  const theme = useTheme();
  const [email, setEmail] = useState('');
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsButtonDisabled(true);
    setLoading(true);
    setError(null);
    try {
      await sendForgotPasswordEmail(email);
    } catch (error) {
      if (error && (error as any).response && (error as any).response.data) {
        setError((error as any).response.data.message);
      } else {
        setError('An unexpected error occurred. Please try again.');
      }
      console.error('Error while sending forgot password email:', error);
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
      <Container maxWidth="lg">
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          padding={4}
          minHeight="80vh"
          textAlign="center"
        >
          <Typography variant="h4" align="center" gutterBottom>
            Forgot Your Password?
          </Typography>
          <Typography variant="body1" align="center" gutterBottom>
            Enter your email address below to receive a password reset link.
          </Typography>
          <Box display="flex" justifyContent="center" width="100%">
            <form onSubmit={handleSubmit} style={{ width: '50%' }}>
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
                style={{ backgroundColor: theme.palette.background.paper, borderRadius: '4px' }}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                disabled={isButtonDisabled || loading}
              >
                {loading ? <CircularProgress size={24} /> : 'Send Reset Password Email'}
              </Button>
              {isButtonDisabled && (
                <Typography variant="body2" align="center" sx={{ marginTop: 2 }}>
                  Please try again in 30 seconds.
                </Typography>
              )}
            </form>
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default ForgotPasswordPage;
