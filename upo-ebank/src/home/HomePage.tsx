import { Box, Button, Container, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import Navbar from '../shared/ui/Navbar';

const HomePage = () => {
  const navigate = useNavigate();
  const { auth } = useAuth();

  return (
    <>
      <Navbar />
      <Container maxWidth={false}>
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          height="80vh"
        >
          <Typography variant="h1" component="div" gutterBottom>
            Welcome to the Home Page
          </Typography>
          <Typography variant="body1" component="div" gutterBottom>
          </Typography>
          {auth && (
            <Button variant="contained" color="primary" onClick={() => navigate('/secured')}>
              Go to Secured Page
            </Button>
          )}
        </Box>
      </Container>
    </>
  );
};

export default HomePage;