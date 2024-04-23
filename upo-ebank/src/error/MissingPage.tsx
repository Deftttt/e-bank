import { Box, Button, Container, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const MissingPage = () => {
  const navigate = useNavigate();

  return (
    <Container maxWidth="sm">
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <Typography variant="h1" component="div" gutterBottom>
          404
        </Typography>
        <Typography variant="h5" component="div" gutterBottom>
          Page not found
        </Typography>
        <Typography variant="body1" component="div" gutterBottom>
          The page you're looking for doesn't exist or has been moved.
        </Typography>
        <Button variant="contained" color="primary" onClick={() => navigate('/')}>
          Go to Home Page
        </Button>
      </Box>
    </Container>
  );
};

export default MissingPage;