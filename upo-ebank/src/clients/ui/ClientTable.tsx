// TransactionTable.js
import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { ClientDto } from '../services/ClientService';


const ClientTable = ( { clients }: { clients: ClientDto[] } ) => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>First Name</TableCell>
            <TableCell>Last Name</TableCell>
            <TableCell>Phone Number</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {clients.map((client) => (
            <TableRow key={client.id}>
              <TableCell>{client.id}</TableCell>
              <TableCell>{client.email}</TableCell>
              <TableCell>{client.firstName}</TableCell>
              <TableCell>{client.lastName}</TableCell>
              <TableCell>{client.phoneNumber}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ClientTable;
