import React, { useEffect, useState } from 'react';
import { BankAccountDetails, getAccountByNumber, blockAccount, unblockAccount } from './services/AccountsService';
import { useNavigate, useParams } from 'react-router-dom';
import Navbar from '../shared/ui/Navbar';
import Loading from '../shared/ui/Loading';
import { Container, Card, CardContent, Typography, Grid, Button, Chip } from '@mui/material';
import AccountTypeChip from './ui/AccountTypeChip';
import useAuth from '../hooks/useAuth';

const AccountsByNumber = () => {
  const { accountNumber } = useParams<{ accountNumber: string }>();
  const [account, setAccount] = useState<BankAccountDetails | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const { auth } = useAuth();
  const isEmployee = auth?.roles?.includes('MANAGE_ACCOUNTS');
  const isClient = auth?.roles?.includes('USER_RIGHTS');

  useEffect(() => {
    const fetchAccount = async () => {
      setIsLoading(true);
      try {
        const data = await getAccountByNumber(accountNumber as string);
        setAccount(data);
      } catch (error) {
        navigate('/error', { state: { message: `Failed to load account for account number: ${accountNumber}` } });
      } finally {
        setIsLoading(false);
      }
    };

    fetchAccount();
  }, [accountNumber, navigate]);

  const handleBlockAccount = async () => {
    if (account) {
      try {
        await blockAccount(account.accountNumber);
        const updatedAccount = await getAccountByNumber(account.accountNumber);
        setAccount(updatedAccount);
      } catch (error) {
        console.error('Error blocking account:', error);
      }
    }
  };

  const handleToggleBlockStatus = async () => {
    if (account) {
      try {
        if (account.blocked) {
          await unblockAccount(account.accountNumber);
        } else {
          await blockAccount(account.accountNumber);
        }
        const updatedAccount = await getAccountByNumber(account.accountNumber);
        setAccount(updatedAccount);
      } catch (error) {
        console.error('Error toggling block status:', error);
      }
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <Navbar />
      <Container maxWidth={false}>
        {account && (
          <Card sx={{ margin: '20px auto', padding: '20px', maxWidth: '600px' }} variant="outlined">
            <CardContent>
              <Typography variant="h5" sx={{ marginBottom: '20px' }} component="div">
                Account Details for Account Number: {accountNumber}
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Typography variant="body2" sx={{ marginBottom: '10px' }}>
                    <strong>Account number:</strong> {account.accountNumber}
                  </Typography>
                  <Typography variant="body2" sx={{ marginBottom: '10px' }}>
                    <strong>Balance:</strong> {account.balance}
                  </Typography>
                  <Typography variant="body2" sx={{ marginBottom: '10px' }}>
                    <strong>Opening Date:</strong> {account.openingDate}
                  </Typography>
                  <Typography variant="body2" sx={{ marginBottom: '10px' }}>
                    <strong>Account Type:</strong> <AccountTypeChip accountType={account.accountType} />
                  </Typography>
                  <Typography variant="body2" sx={{ marginBottom: '10px' }}>
                    <strong>Owner:</strong> {account.clientFirstName + ' ' + account.clientLastName}
                  </Typography>
                  <Typography variant="body2" sx={{ marginBottom: '10px' }}>
                    <strong>Status:</strong> 
                    <Chip
                      label={account.blocked ? 'Blocked' : 'Active'}
                      sx={{
                        backgroundColor: account.blocked ? 'red' : 'green',
                        color: 'white',
                        marginLeft: '10px'
                      }}
                    />
                  </Typography>
                </Grid>
                {isEmployee && (
                  <Grid item xs={12}>
                    <Button
                      variant="contained"
                      color="warning"
                      fullWidth
                      onClick={handleToggleBlockStatus}
                    >
                      {account.blocked ? 'Unblock Account' : 'Block Account'}
                    </Button>
                  </Grid>
                )}
                {isClient && !account.blocked && (
                  <Grid item xs={12}>
                    <Button
                      variant="contained"
                      color="primary"
                      fullWidth
                      onClick={() => navigate(`/transactions/account/${accountNumber}/transfer`)}
                    >
                      Transfer Money from this Account
                    </Button>
                  </Grid>
                )}
                <Grid item xs={12}>
                  <Button
                    variant="contained"
                    color="secondary"
                    fullWidth
                    onClick={() => navigate(`/transactions/account/${accountNumber}`)}
                  >
                    View Transactions from this Account
                  </Button>
                </Grid>
                {isClient && !account.blocked && (
                  <Grid item xs={12}>
                    <Button
                      variant="contained"
                      color="warning"
                      fullWidth
                      onClick={handleBlockAccount}
                    >
                      Block Account
                    </Button>
                  </Grid>
                )}
              </Grid>
            </CardContent>
          </Card>
        )}
      </Container>
    </>
  );
};

export default AccountsByNumber;
