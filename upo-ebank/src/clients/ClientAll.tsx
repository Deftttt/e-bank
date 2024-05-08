import React, { useEffect, useState } from 'react';
import { Client, getClients } from './services/ClientService';
import ClientTable from './ui/ClientTable';
import { Container } from '@mui/material';
import Navbar from '../shared/ui/Navbar';
import Loading from '../shared/ui/Loading';
import { useNavigate } from 'react-router-dom';

const ClientAll = () => {
  const [clients, setClients] = useState<Client[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchClients = async () => {
      setIsLoading(true);
      try {
        const data = await getClients();
        setClients(data);
      } catch (error) {
        console.error('Error loading clients:', error);
        navigate('/error', { state: { message: 'Failed to load all clients' } });
      } finally {
        setIsLoading(false);
      }
    };

    fetchClients();
  }, [navigate]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <Navbar />
      <Container maxWidth={false}>
        <h1>All Clients</h1>
        <ClientTable clients={clients} />
      </Container>
    </>
  );
};

export default ClientAll;