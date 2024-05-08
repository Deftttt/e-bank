import React, { useEffect, useState } from 'react';
import { BankAccount, getAccountsByClient } from './services/AccountsService';
import AccountsTable from './ui/AccountsTable';
import { useNavigate, useParams } from 'react-router-dom';
import Navbar from '../shared/ui/Navbar';
import Loading from '../shared/ui/Loading';
import { Container } from '@mui/material';

const AccountsByClientId = () => {
  const { clientId } = useParams<{ clientId: string }>();
  const [accounts, setAccounts] = useState<BankAccount[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAccounts = async () => {
      setIsLoading(true);
      try {
        const data = await getAccountsByClient(clientId);
        setAccounts(data);
      } catch (error) {
        navigate('/error', { state: { message: `Failed to load accounts for client ID: ${clientId}` } });
      } finally {
        setIsLoading(false);
      }
    };

    fetchAccounts();
  }, [clientId, navigate]);

  if (isLoading) {
    return Loading();
  }

  return (
    <>
      <Navbar />
      <Container maxWidth={false}>
        <h1>Accounts for Client: {clientId}</h1>
        <AccountsTable accounts={accounts} />
      </Container>
    </>
  );
};

export default AccountsByClientId;