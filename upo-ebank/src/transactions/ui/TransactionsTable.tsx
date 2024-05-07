// TransactionTable.js
import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { Transaction } from '../services/TransactionService';

const TransactionTable = ( { transactions }: { transactions: Transaction[] } ) => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Amount</TableCell>
            <TableCell>Date</TableCell>
            <TableCell>Sender Account Number</TableCell>
            <TableCell>Recipient Account Number</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {transactions.map((transaction) => (
            <TableRow key={transaction.id}>
              <TableCell>{transaction.id}</TableCell>
              <TableCell>{transaction.amount}</TableCell>
              <TableCell>{transaction.transactionDate}</TableCell>
              <TableCell>{transaction.senderAccountNumber}</TableCell>
              <TableCell>{transaction.recipientAccountNumber}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TransactionTable;
