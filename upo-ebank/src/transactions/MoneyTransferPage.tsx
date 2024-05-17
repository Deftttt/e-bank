import React from 'react';
import { useForm } from 'react-hook-form';
import { TextField, Button, Box } from '@mui/material';
import axios from 'axios';
import { Typography } from '@mui/material';
import { CreateTransactionDTO, createTransaction } from './services/TransactionService';
import { useParams } from 'react-router-dom';
import { useState } from 'react';

const MoneyTransferPage: React.FC = () => {
  const { accountNumber } = useParams<{ accountNumber: string }>();
  const { register, handleSubmit, formState: { errors } } = useForm<CreateTransactionDTO>();
  const [error, setError] = useState({});

  const onSubmit = async (data: CreateTransactionDTO) => {
    try {
      const response = await createTransaction(accountNumber, data);
      console.log(response);
    } catch (error) {
      console.error('Error creating transaction:', error);
      setError(error.response.data.errors);
    }
  };


return (
  <Box
    sx={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh',
      padding: "20px"
    }}
  >
    <Typography variant="h6" gutterBottom>
      Uzupełnij dane przelewu:
    </Typography>
    {error && <Typography color="error">{error.amount}</Typography>} 
    <form onSubmit={handleSubmit(onSubmit)}>
      <TextField
        label="Amount"
        {...register('amount')}
        error={error.amount}
        helperText={error.amount} 
      />
      <TextField
        label="Message"
        {...register('message')}
      />
      <TextField value={accountNumber} disabled/>
      <TextField
        label="Recipient Account Number"
        {...register('recipientAccountNumber')}
        error={error.recipientAccountNumber}
        helperText={error.recipientAccountNumber}
      />
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: 2 }}>
        <Button type="submit" variant="contained" color="primary">
          Submit
        </Button>
      </Box>
    </form>
  </Box>
);
}

export default MoneyTransferPage;