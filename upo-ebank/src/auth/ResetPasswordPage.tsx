import React, { useState } from 'react';
import { Form, useLocation, useNavigate } from 'react-router-dom';
import { Container, TextField, Button, Typography } from '@mui/material';
import { ResetPasswordData, resetPassword } from '../auth/services/AuthService';

const ResetPasswordPage = () => {
  const [password, setPassword] = useState('');
  const location = useLocation();
  const navigate = useNavigate();
  const token = new URLSearchParams(location.search).get('token');

  const handlePasswordChange = (event) => {
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
      console.error('Error while registering:', error);
    }
  };

  return (
    <Container maxWidth="sm">
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
    </Container>
  );
};

export default ResetPasswordPage;