import React, { useEffect, useState } from 'react';
import { Client, getClients } from './services/ClientService';
import ClientTable from './ui/ClientTable';
import { Container } from '@mui/material';
import Navbar from '../shared/ui/Navbar';

const ClientAll = () => {
  const [clients, setClients] = useState<Client[]>([]);

  useEffect(() => {
    const fetchClients = async () => {
      const data = await getClients();
      setClients(data);
    };

    fetchClients();
  }, []);

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