import React, { useEffect, useState } from 'react';
import { Transaction, TransactionDetailDTO, getTransactionById } from './services/TransactionService';
import { useParams } from 'react-router-dom';
import Navbar from '../shared/ui/Navbar';
import Loading from '../shared/ui/Loading';
import { useNavigate } from 'react-router-dom';
import { Container, Card, CardContent, Typography, Grid, Button } from '@mui/material';
import { PDFDownloadLink } from '@react-pdf/renderer';
import { PDFFile } from './PDFFile';

const TransactionDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [transaction, setTransaction] = useState<TransactionDetailDTO>();
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTransaction = async () => {
      setIsLoading(true);
      try {
        const data = await getTransactionById(id);
        setTransaction(data);
      } catch (error) {
        console.error('Error loading transaction:', error);
        navigate('/error', { state: { message: `Failed to load transaction ID: ${id}` } });
      } finally {
        setIsLoading(false);
      }
    };

    fetchTransaction();
  }, [id, navigate]);

  if (isLoading) {
    return <Loading />;
  }
  
  return (
    <>
      <Navbar />
      <Container maxWidth={false}>
  {transaction && (
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
            <Typography variant="body2" sx={{ marginBottom: '10px' }}>
              Message: {transaction.message}
            </Typography>
            <Typography variant="body2" sx={{ marginBottom: '10px' }}>
              Sender: {transaction.senderName} {transaction.senderSurname}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body2" sx={{ marginBottom: '10px' }}>
              Sender Account Number: {transaction.senderAccountNumber}
            </Typography>
            <Typography variant="body2" sx={{ marginBottom: '10px' }}>
              Recipient: {transaction.recipientName} {transaction.recipientSurname}
            </Typography>
            <Typography variant="body2" sx={{ marginBottom: '10px' }}>
              Recipient Account Number: {transaction.recipientAccountNumber}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <PDFDownloadLink
              document={<PDFFile transaction={transaction} />}
              fileName="transaction.pdf"
            >
              {({ blob, url, loading, error }) =>
                loading ? 'Loading document...' : <Button variant="contained">Download Transaction Detail</Button>
              }
            </PDFDownloadLink>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )}
</Container>
    </>
  );
};

export default TransactionDetail;