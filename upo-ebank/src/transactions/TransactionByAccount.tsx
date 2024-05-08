import React, { useEffect, useState } from 'react';
import { Transaction, getTransactionsByAccount } from './services/TransactionService';
import TransactionTable from './ui/TransactionsTable';
import { useParams } from 'react-router-dom';
import Navbar from '../shared/ui/Navbar';
import Loading from '../shared/ui/Loading';
import { useNavigate } from 'react-router-dom';
import { Container } from '@mui/material';

const TransactionByAccount = () => {
  const { accountNumber } = useParams<{ accountNumber: string }>();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTransactions = async () => {
      setIsLoading(true);
      try {
        const data = await getTransactionsByAccount(accountNumber);
        setTransactions(data);
      } catch (error) {
        console.error('Error loading transactions:', error);
        navigate('/error', { state: { message: `Failed to load transactions for account: ${accountNumber}` } });
      } finally {
        setIsLoading(false);
      }
    };

    fetchTransactions();
  }, [accountNumber, navigate]);

  if (isLoading) {
    return <Loading />;
  }

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