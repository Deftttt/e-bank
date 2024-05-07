import React, { useState } from 'react';
import { Form, useLocation, useNavigate } from 'react-router-dom';
import { Container, TextField, Button, Typography, Box } from '@mui/material';
import { ResetPasswordData, resetPassword } from '../auth/services/AuthService';

const ResetPasswordPage = () => {
  const [password, setPassword] = useState('');
  const location = useLocation();
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);

  const token = new URLSearchParams(location.search).get('token');

  const handlePasswordChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
        const data: ResetPasswordData = {
            token: token as string,
            newPassword:  password,
        };
      const response = await resetPassword(data);
      navigate('/login')
      
    } catch (error) {
    if (error && (error as any).response && (error as any).response.data && (error as any).response.data.errors) {
      setError((error as any).response.data.errors.newPassword);
  }
}
  };

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
        Reset Your Password
      </Typography>
      <form onSubmit={handleSubmit}>
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
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
        >
          Reset Password
        </Button>
      </form>
      </Box>
    </Container>
  );
};

export default ResetPasswordPage;