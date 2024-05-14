import React from 'react';
import { useForm } from 'react-hook-form';
import { TextField, Button, Box } from '@mui/material';
import axios from 'axios';
import { Typography } from '@mui/material';
import { CreateTransactionDTO, createTransaction } from './services/TransactionService';

const MoneyTransferPage: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<CreateTransactionDTO>();

  const onSubmit = async (data: CreateTransactionDTO) => {
    try {
      const response = await createTransaction(data);
      console.log(response);
    } catch (error) {
      console.error('Error creating transaction:', error);
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
    <form onSubmit={handleSubmit(onSubmit)}>
      <TextField
        label="Amount"
        {...register('amount', { required: 'Amount is required' })}
        error={Boolean(errors.amount)}
        helperText={errors.amount?.message}
      />
      <TextField
        label="Sender Account Number"
        {...register('senderAccountNumber', { required: 'Sender Account Number is required' })}
        error={Boolean(errors.senderAccountNumber)}
        helperText={errors.senderAccountNumber?.message}
      />
      <TextField
        label="Recipient Account Number"
        {...register('recipientAccountNumber', { required: 'Recipient Account Number is required' })}
        error={Boolean(errors.recipientAccountNumber)}
        helperText={errors.recipientAccountNumber?.message}
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