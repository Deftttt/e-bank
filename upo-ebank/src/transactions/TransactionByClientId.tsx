import React, { useEffect, useState } from 'react';
import { Transaction, getTransactionsByClient } from './services/TransactionService';
import TransactionTable from './ui/TransactionsTable';
import { useParams } from 'react-router-dom';
import Navbar from '../shared/ui/Navbar';
import Loading from '../shared/ui/Loading';
import { useNavigate } from 'react-router-dom';
import { Container } from '@mui/material';

const TransactionByClientId = () => {
  const { clientId } = useParams<{ clientId: string }>();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTransactions = async () => {
      setIsLoading(true);
      try {
        const data = await getTransactionsByClient(clientId);
        setTransactions(data);
      } catch (error) {
        console.error('Error loading transactions:', error);
        navigate('/error', { state: { message: `Failed to load transactions for client: ${clientId}` } });
      } finally {
        setIsLoading(false);
      }
    };

    fetchTransactions();
  }, [clientId, navigate]);

  if (isLoading) {
    return <Loading />;
  }

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