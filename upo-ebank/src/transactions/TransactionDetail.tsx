import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Card, CardContent, Typography, Grid, Container } from '@mui/material';
import { Transaction, getTransactionById } from './services/TransactionService';
import Navbar from '../shared/ui/Navbar';

const TransactionDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [transaction, setTransaction] = useState<Transaction | null>(null);

  useEffect(() => {
    const fetchTransaction = async () => {
      const data = await getTransactionById(id);
      setTransaction(data);
    };

    fetchTransaction();
  }, [id]);

  return (
    transaction && (
    <>
    <Navbar />
      <Container maxWidth={false}></Container>
      <Card sx={{ margin: '20px auto', padding: '20px', maxWidth: '600px' }} variant="outlined">
        <CardContent>
          <Typography variant="h5" sx={{ marginBottom: '20px' }} component="div">
            Transaction ID: {transaction.id}
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Typography variant="body2" sx={{ marginBottom: '10px' }}>
                Amount: {transaction.amount}
              </Typography>
              <Typography variant="body2" sx={{ marginBottom: '10px' }}>
                Transaction Date: {transaction.transactionDate}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body2" sx={{ marginBottom: '10px' }}>
                Sender Account Number: {transaction.senderAccountNumber}
              </Typography>
              <Typography variant="body2" sx={{ marginBottom: '10px' }}>
                Recipient Account Number: {transaction.recipientAccountNumber}
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </>
    )
  );
};

export default TransactionDetail;