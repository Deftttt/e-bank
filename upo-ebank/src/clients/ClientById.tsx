import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Container, Card, CardContent, Divider, Typography, Grid } from '@mui/material';
import { Client, getClient } from './ClientService';
import ClientTable from './ClientTable';
import { useParams } from 'react-router-dom';
import Navbar from '../shared/ui/Navbar';

const ClientById = () => {
  const { id } = useParams<{ id: string }>();
  const [client, setClients] = useState<Client>();

  useEffect(() => {
    const fetchClient = async () => {
      const data = await getClient(id);
      setClients(data);
    };

    fetchClient();
  }, [id]);

  return (
    <>
      <Navbar />
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
          </Card>
        )}
      </Container>
    </>
  );
};

export default ClientById;