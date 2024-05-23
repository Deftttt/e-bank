import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TableSortLabel, Paper } from '@mui/material';
import { ClientDto } from '../services/ClientService';
import { useNavigate } from 'react-router-dom';



const ClientsTable = ({ clients, onSortChange }: {clients: ClientDto[], onSortChange: (field: string) => void}) => {
  const sortBy = (field: string) => () => {
    onSortChange(field);
  };
  const navigate = useNavigate();

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>
              <TableSortLabel onClick={sortBy('id')}>
                ID
              </TableSortLabel>
            </TableCell>
            <TableCell>
              <TableSortLabel onClick={sortBy('firstName')}>
                First Name
              </TableSortLabel>
            </TableCell>
            <TableCell>
              <TableSortLabel onClick={sortBy('lastName')}>
                Last Name
              </TableSortLabel>
            </TableCell>
            <TableCell>
              <TableSortLabel onClick={sortBy('email')}>
                Email
              </TableSortLabel>
            </TableCell>
            <TableCell>
              <TableSortLabel onClick={sortBy('phoneNumber')}>
                Phone Number
              </TableSortLabel>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {clients.map((client) => (
            <TableRow
              key={client.id}
              onClick={() => navigate(`/clients/${client.id}`)}
              style={{ cursor: 'pointer' }}
            >
              <TableCell>{client.id}</TableCell>
              <TableCell>{client.firstName}</TableCell>
              <TableCell>{client.lastName}</TableCell>
              <TableCell>{client.email}</TableCell>
              <TableCell>{client.phoneNumber}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ClientsTable;
