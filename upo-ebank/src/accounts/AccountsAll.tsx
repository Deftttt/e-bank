import React, { useEffect, useState } from 'react';
import { BankAccount, getAllAccounts } from './services/AccountsService';
import AccountsTable from './ui/AccountsTable';
import { Container } from '@mui/material';
import Navbar from '../shared/ui/Navbar';
import Loading from '../shared/ui/Loading';
import { useNavigate } from 'react-router-dom';

const AccountsAll = () => {
  const [accounts, setAccounts] = useState<BankAccount[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAccounts = async () => {
      setIsLoading(true);
      try {
        const data = await getAllAccounts();
        setAccounts(data);
      } catch (error) {
        navigate('/error', { state: { message: 'Failed to load all accounts' } });
      } finally {
        setIsLoading(false);
      }
    };

    fetchAccounts();
  }, [navigate]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <Navbar />
      <Container maxWidth={false}>
        <h1>All Accounts</h1>
        <AccountsTable accounts={accounts} />
      </Container>
    </>
  );
};

export default AccountsAll;