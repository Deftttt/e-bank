import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { TextField, Button, Box, Card, CardContent, Container, Typography } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { CreateTransactionDTO, createTransaction } from './services/TransactionService';
import Navbar from '../shared/ui/Navbar';
import Loading from '../shared/ui/Loading';

const MoneyTransferPage: React.FC = () => {
  const { accountNumber } = useParams<{ accountNumber: string }>();
  const { register, handleSubmit } = useForm<CreateTransactionDTO>();
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const onSubmit = async (data: CreateTransactionDTO) => {
    setIsLoading(true);
    try {
      await createTransaction(accountNumber as string, data);
      navigate(`/transactions/account/${accountNumber}`);
    } catch (errors) {
      console.error('Error creating transaction:', errors);
      setErrors(errors.response.data.errors);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <Navbar />
      <Container maxWidth="sm" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
        <Card sx={{ width: '100%', mt: 4 }}>
          <CardContent>
            <Typography variant="h4" component="div" gutterBottom textAlign="center">
              Money Transfer Form
            </Typography>
            <form onSubmit={handleSubmit(onSubmit)}>
              <TextField
                fullWidth
                margin="normal"
                label="Amount"
                type="number"
                {...register('amount')}
                error={!!errors.amount}
                helperText={errors.amount}
              />
              <TextField
                fullWidth
                margin="normal"
                label="Transaction title"
                error={!!errors.message}
                helperText={errors.message}
                {...register('message')}
              />
              <TextField
                fullWidth
                margin="normal"
                label="Sender Account Number"
                value={accountNumber}
                disabled
              />
              <TextField
                fullWidth
                margin="normal"
                label="Recipient Account Number"
                {...register('recipientAccountNumber')}
                error={!!errors.recipientAccountNumber}
                helperText={errors.recipientAccountNumber}
              />
              <Box mt={2}>
                <Button type="submit" variant="contained" color="primary" fullWidth>
                  Submit
                </Button>
              </Box>
            </form>
          </CardContent>
        </Card>
      </Container>
    </>
  );
};

export default MoneyTransferPage;
