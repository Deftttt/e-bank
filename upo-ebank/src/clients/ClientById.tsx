import { useEffect, useState } from 'react';
import { Container, Card, CardContent, Typography, Grid, Button, Box } from '@mui/material';
import { Client, getClient } from './services/ClientService';
import { useParams } from 'react-router-dom';
import Loading from '../shared/ui/Loading';
import { useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const ClientById = () => {
  const { id } = useParams<{ id: string }>();
  const [client, setClients] = useState<Client>();
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const { auth } = useAuth();

  useEffect(() => {
    const fetchClient = async () => {
      setIsLoading(true);
      try {
        const data = await getClient(id);
        setClients(data);
      } catch (error) {
        console.error('Error loading client:', error);
        navigate('/error', { state: { message: `Failed to load client ID: ${id}` } });
      } finally {
        setIsLoading(false);
      }
    };

    fetchClient();
  }, [id, navigate]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <Container maxWidth={false}>
        {client && (
          <Card sx={{ margin: '20px auto', padding: '20px', maxWidth: '600px' }} variant="outlined">
            <CardContent>
              <Typography variant="h5" sx={{ marginBottom: '20px' }} component="div">
                Client ID: {client.id}
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Typography variant="body2" sx={{ marginBottom: '10px' }}>
                    Email: {client.email}
                  </Typography>
                  <Typography variant="body2" sx={{ marginBottom: '10px' }}>
                    First Name: {client.firstName}
                  </Typography>
                  <Typography variant="body2" sx={{ marginBottom: '10px' }}>
                    Last Name: {client.lastName}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body2" sx={{ marginBottom: '10px' }}>
                    Phone Number: {client.phoneNumber}
                  </Typography>
                  <Typography variant="body2" sx={{ marginBottom: '10px' }}>
                    PESEL: {client.pesel}
                  </Typography>
                </Grid>
              </Grid>
              <Typography variant="h6" sx={{ marginTop: '20px' }}>
                Addresses
              </Typography>
              {client.addresses.map(address => (
                <div key={address.id} style={{ marginTop: '10px' }}>
                  <Typography variant="body2" sx={{ marginBottom: '5px' }}>
                    City: {address.city}
                  </Typography>
                  <Typography variant="body2" sx={{ marginBottom: '5px' }}>
                    Street: {address.street}
                  </Typography>
                  <Typography variant="body2" sx={{ marginBottom: '5px' }}>
                    Local Number: {address.localNumber}
                  </Typography>
                  <Typography variant="body2" sx={{ marginBottom: '5px' }}>
                    Post Code: {address.postCode}
                  </Typography>
                  <Typography variant="body2" sx={{ marginBottom: '5px' }}>
                    Country: {address.country}
                  </Typography>
                </div>
              ))}
            </CardContent>

            <Box sx={{ marginTop: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <Button variant="contained" color="primary" onClick={() => navigate(`/transactions/client/${id}`)}>
                View Client Transactions
              </Button>
            </Box>

            {auth?.roles?.includes('VIEW_ACCOUNTS') && (
              <Box sx={{ marginTop: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Button variant="contained" color="success" onClick={() => navigate(`/accounts/clients/${id}`)}>
                  View Client Accounts
                </Button>
              </Box>
            )}

            {auth?.roles?.includes('VIEW_LOANS') && (
              <Box sx={{ marginTop: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Button variant="contained" color="warning" onClick={() => navigate(`/loans/client/${id}`)}>
                  View Client Loans
                </Button>
              </Box>
            )}

            {auth?.roles?.includes('MANAGE_ACCOUNTS') && (
              <Box sx={{ marginTop: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Button variant="contained" color="secondary" onClick={() => navigate(`/create-account/clients/${id}`)}>
                  Create Account for Client
                </Button>
              </Box>
            )}

          </Card>
          
        )}
      </Container>
    </>
  );
};

export default ClientById;