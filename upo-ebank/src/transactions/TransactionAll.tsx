import React, { useEffect, useState } from 'react';
import { Transaction, getAllTransactions } from './services/TransactionService';
import TransactionTable from './ui/TransactionsTable';
import { Container } from '@mui/material';
import Navbar from '../shared/ui/Navbar';
import Loading from '../shared/ui/Loading';
import { useNavigate } from 'react-router-dom';

const TransactionAll = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTransactions = async () => {
      setIsLoading(true);
      try {
        const data = await getAllTransactions();
        setTransactions(data);
      } catch (error) {
        console.error('Error loading transactions:', error);
        navigate('/error', { state: { message: 'Failed to load all transactions' } });
      } finally {
        setIsLoading(false);
      }
    };

    fetchTransactions();
  }, [navigate]);

  if (isLoading) {
    return <Loading />;
  }

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