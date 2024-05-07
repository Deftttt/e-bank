import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Container } from '@mui/material';
import { Transaction, getTransactionsByClient } from './services/TransactionService';
import TransactionTable from './ui/TransactionsTable';
import { useParams } from 'react-router-dom';
import Navbar from '../shared/ui/Navbar';

const TransactionByClientId = () => {
  const { clientId } = useParams<{ clientId: string }>();
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    const fetchTransactions = async () => {
      const data = await getTransactionsByClient(clientId);
      setTransactions(data);
    };

    fetchTransactions();
  }, [clientId]);

  return (
    <>
    <Navbar />
      <Container maxWidth={false}>
      <h1>Transactions for client: {clientId}</h1>
      <TransactionTable transactions={transactions} />
      </Container>
    </>
  );
};

export default TransactionByClientId;