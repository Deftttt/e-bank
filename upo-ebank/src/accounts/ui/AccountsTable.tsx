import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { BankAccount } from '../services/AccountsService';

interface Props {
  accounts: BankAccount[];
}

const AccountsTable: React.FC<Props> = ({ accounts }) => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Account Number</TableCell>
            <TableCell>Balance</TableCell>
            <TableCell>Opening Date</TableCell>
            <TableCell>Account Type</TableCell>
            <TableCell>Client ID</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {accounts.map((account) => (
            <TableRow key={account.accountNumber}>
              <TableCell>{account.accountNumber}</TableCell>
              <TableCell>{account.balance}</TableCell>
              <TableCell>{account.openingDate}</TableCell>
              <TableCell>{account.accountType}</TableCell>
              <TableCell>{account.clientId}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default AccountsTable;
