import { Box, Button, Container, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Navbar from './shared/ui/Navbar';

const SecuredPage = () => {
    const navigate = useNavigate();

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
              Welcome to the Secured Page
            </Typography>
            <Typography variant="body1" component="div" gutterBottom>
            </Typography>
            <Button variant="contained" color="primary" onClick={() => navigate('/')}>
              Go to Home Page
            </Button>
          </Box>
        </Container>
      </>
    );
  };

export default SecuredPage;