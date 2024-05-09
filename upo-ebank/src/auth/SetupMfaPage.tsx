import { Box, Button, CircularProgress, Container, TextField, Typography } from '@mui/material';
import { getMfaQrCode, verifyMfaSetup, MfaVerification } from '../auth/services/AuthService';
import { useEffect, useState } from 'react';
import useAuth from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

const SetupMfaPage = () => {
  const [qrCodeUrl, setQrCodeUrl] = useState('');
  const [inputValue, setInputValue] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const {auth} = useAuth();
  

  useEffect(() => {
    const getQrCode = async () => {
      try {
        const url = await getMfaQrCode();
        setQrCodeUrl(url);
      } catch (error) {
        console.error('Failed to fetch QR code:', error);
      }
    };

    getQrCode();
  }, []);

  const handleButtonClick = async () => {
    setLoading(true);
    setError('');
    const data: MfaVerification = {
      email: auth.email,
      code: inputValue,
    };

    try {
      await verifyMfaSetup(data);
      navigate('/');
    } catch (error) {
      setError('Failed to verify MFA setup.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <Typography variant="h4" align="center" gutterBottom>
        Setup Multi-Factor Authentication
      </Typography>
      <Box display="flex" justifyContent="center">
        {qrCodeUrl && <img src={qrCodeUrl} alt="QR Code" style={{ width: '200px', height: '200px', objectFit: 'contain' }} />}
      </Box>
      <TextField
        fullWidth
        label="Input"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        margin="normal"
      />
      <Button variant="contained" color="primary" onClick={handleButtonClick} disabled={loading}>
        {loading ? <CircularProgress size={24} /> : 'Submit'}
      </Button>
      {error && <Typography color="error">{error}</Typography>}
    </Container>
  );
};

export default SetupMfaPage;