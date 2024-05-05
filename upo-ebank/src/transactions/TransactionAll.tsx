import React, { useEffect, useState } from 'react';
import { Transaction, getAllTransactions } from './TransactionService';
import TransactionTable from './TransactionsTable';
import { Container } from '@mui/material';
import Navbar from '../shared/ui/Navbar';

const TransactionAll = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    const fetchTransactions = async () => {
      const data = await getAllTransactions();
      setTransactions(data);
    };

    fetchTransactions();
  }, []);

  return (
    <>
    <Navbar />
      <Container maxWidth={false}>
      <h1>All Transactions</h1>
      <TransactionTable transactions={transactions} />
      </Container>
    </>
  );
};

export default TransactionAll;