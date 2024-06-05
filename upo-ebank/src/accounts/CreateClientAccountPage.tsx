import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button, Box, Card, CardContent, Container, Typography, MenuItem, Select, InputLabel, FormControl, TextField } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import Loading from '../shared/ui/Loading';
import { AccountType, CreateEmployeeBankAccountDto, createAccountForClient } from './services/AccountsService';
import NoDataMessage from '../shared/NoDataMessage';

const accountTypes: AccountType[] = ['PERSONAL_ACCOUNT', 'STUDENT_ACCOUNT', 'RETIREMENT_ACCOUNT', 'INVESTMENT_ACCOUNT'];

const CreateClientAccountPage: React.FC = () => {
  const { clientId } = useParams<{ clientId: string }>();
  const { register, handleSubmit } = useForm<CreateEmployeeBankAccountDto>();
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const onSubmit = async (data: CreateEmployeeBankAccountDto) => {
    setIsLoading(true);
    try {
      await createAccountForClient(clientId as string, data);
      navigate(`/accounts/clients/${clientId}`);
    } catch (error) {
      if (error.response && error.response.data && error.response.data.errors) {
        setErrors(error.response.data.errors);
      }
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
        <Card sx={{ width: '100%', mt: 2 }}>
          <CardContent> 
            <Typography variant="h4" component="div" gutterBottom textAlign="center">
              Create Client Account Form
            </Typography>
            <form onSubmit={handleSubmit(onSubmit)}>
              <FormControl fullWidth margin="normal">
                <InputLabel id="accountType-label">Account Type</InputLabel>
                <Select
                  labelId="accountType-label"
                  label="Account Type"
                  error={!!errors.accountType}
                  helperText={errors.accountType}
                  {...register('accountType', {required: true }) }
                >
                  {accountTypes.map((type) => (
                    <MenuItem key={type} value={type}>
                      {type.replace('_', ' ').toLowerCase().replace(/\b\w/g, l => l.toUpperCase())}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <TextField
                fullWidth
                margin="normal"
                label="Initial Deposit"
                type="number"
                error={!!errors.initialDeposit}
                helperText={errors.initialDeposit}
                {...register('initialDeposit', {valueAsNumber: true })}
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

export default CreateClientAccountPage;
