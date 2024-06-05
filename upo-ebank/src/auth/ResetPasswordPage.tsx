import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Container, TextField, Button, Typography, Box, CircularProgress } from '@mui/material';
import { ResetPasswordData, resetPassword } from '../auth/services/AuthService';
import { useTheme } from '@mui/material/styles';

const ResetPasswordPage = () => {
  const theme = useTheme();
  const [password, setPassword] = useState('');
  const location = useLocation();
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const token = new URLSearchParams(location.search).get('token');

  const handlePasswordChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const data: ResetPasswordData = {
        token: token as string,
        newPassword: password,
      };
      await resetPassword(data);
      navigate('/login');
    } catch (error) {
      if (error && (error as any).response && (error as any).response.data && (error as any).response.data.errors) {
        setError((error as any).response.data.errors.newPassword);
      } else {
        setError('An unexpected error occurred. Please try again.');
      }
    } finally {
      setLoading(false);
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
          <Typography variant="h4" align="center" gutterBottom>
            Reset Your Password
          </Typography>
          <Typography variant="body1" align="center" gutterBottom>
            Please enter your new password below to reset your account password.
          </Typography>
          <Box display="flex" justifyContent="center" width="100%">
            <form onSubmit={handleSubmit} style={{ width: '50%' }}>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="New Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={password}
                onChange={handlePasswordChange}
                error={!!error}
                helperText={error}
                style={{ backgroundColor: theme.palette.background.paper, borderRadius: '4px' }}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                disabled={loading}
              >
                {loading ? <CircularProgress size={24} /> : 'Reset Password'}
              </Button>
            </form>
          </Box>
          {error && <Typography color="error">{error}</Typography>}
        </Box>
      </Container>
    </>
  );
};

export default ResetPasswordPage;
