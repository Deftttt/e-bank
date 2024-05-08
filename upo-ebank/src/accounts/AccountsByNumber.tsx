import React, { useEffect, useState } from 'react';
import { BankAccount, getAccountByNumber } from './services/AccountsService';
import AccountsTable from './ui/AccountsTable';
import { useNavigate, useParams } from 'react-router-dom';
import Navbar from '../shared/ui/Navbar';
import Loading from '../shared/ui/Loading';
import { Container } from '@mui/material';

const AccountsByNumber = () => {
  const { accountNumber } = useParams<{ accountNumber: string }>();
  const [account, setAccount] = useState<BankAccount | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAccount = async () => {
      setIsLoading(true);
      try {
        const data = await getAccountByNumber(accountNumber);
        setAccount(data);
      } catch (error) {
        navigate('/error', { state: { message: `Failed to load account for account number: ${accountNumber}` } });
      } finally {
        setIsLoading(false);
      }
    };

    fetchAccount();
  }, [accountNumber, navigate]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <Navbar />
      <Container maxWidth={false}>
        <h1>Account Details for Account Number: {accountNumber}</h1>
        {account && (
          <AccountsTable accounts={[account]} />
        )}
      </Container>
    </>
  );
};

export default AccountsByNumber;