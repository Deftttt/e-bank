import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button, Box, Card, CardContent, Container, Typography, MenuItem, Select, InputLabel, FormControl } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Loading from '../shared/ui/Loading';
import { AccountType, CreateClientBankAccountDto, createBankAccount } from './services/AccountsService';
import useAuth from '../hooks/useAuth';

const accountTypes: AccountType[] = ['PERSONAL_ACCOUNT', 'STUDENT_ACCOUNT', 'RETIREMENT_ACCOUNT', 'INVESTMENT_ACCOUNT'];

const CreateAccountPage: React.FC = () => {
  const { register, handleSubmit } = useForm<CreateClientBankAccountDto>();
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { auth } = useAuth();

  const onSubmit = async (data: CreateClientBankAccountDto) => {
    setIsLoading(true);
    try {
      await createBankAccount(data);
      navigate(`/accounts/clients/${auth.id}`);
    } catch (error) {
      console.error('Error creating account:', error);
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <Container maxWidth="sm" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
        <Card sx={{ width: '100%', mt: 4 }}>
          <CardContent> 
            <Typography variant="h4" component="div" gutterBottom textAlign="center">
              Create Account Form
            </Typography>
            <form onSubmit={handleSubmit(onSubmit)}>
              <FormControl fullWidth margin="normal">
                <InputLabel id="accountType-label">Account Type</InputLabel>
                <Select
                  labelId="accountType-label"
                  label="Account Type"
                  defaultValue=""
                  {...register('accountType', { required: 'Account Type is required' })}
                >
                  {accountTypes.map((type) => (
                    <MenuItem key={type} value={type}>
                      {type.replace('_', ' ').toLowerCase().replace(/\b\w/g, l => l.toUpperCase())}
                    </MenuItem>
                  ))}
                </Select>
                {error && <Typography color="error">{error}</Typography>}
              </FormControl>
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

export default CreateAccountPage;
