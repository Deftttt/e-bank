import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Container } from '@mui/material';
import { Transaction, getTransactionsByAccount } from './services/TransactionService';
import TransactionTable from './ui/TransactionsTable';
import { useParams } from 'react-router-dom';
import Navbar from '../shared/ui/Navbar';

const TransactionByAccount = () => {
  const { accountNumber } = useParams<{ accountNumber: string }>();
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    const fetchTransactions = async () => {
      const data = await getTransactionsByAccount(accountNumber);
      setTransactions(data);
    };

    fetchTransactions();
  }, [accountNumber]);

  return (
    <>
    <Navbar />
      <Container maxWidth={false}>
      <h1>Transactions for account: {accountNumber}</h1>
      <TransactionTable transactions={transactions} />
    </Container>
    </>
  );
};

export default TransactionByAccount;