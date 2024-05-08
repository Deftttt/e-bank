import { Box, Button, Container, Typography } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';

const ErrorPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const message = location.state?.message;

  return (
    <Container maxWidth="sm">
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <Typography variant="h3" component="div" gutterBottom>
        Something went wrong
        </Typography>
        <Typography variant="body1" component="div" gutterBottom>
            {message || "An unexpected error occurred."}
        </Typography>
        <Button variant="contained" color="primary" onClick={() => navigate('/')}>
          Go to Home Page
        </Button>
      </Box>
    </Container>
  );
};

export default ErrorPage;