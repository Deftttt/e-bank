import React, { useEffect, useState } from 'react';
import { BankAccount, getAccountsByClient } from './AccountsService';
import AccountsTable from './AccountsTable';
import { useParams } from 'react-router-dom';
import Navbar from '../shared/ui/Navbar';

const AccountsByClientId = () => {
  const { clientId } = useParams<{ clientId: string }>();
  const [accounts, setAccounts] = useState<BankAccount[]>([]);

  useEffect(() => {
    const fetchAccounts = async () => {
      const data = await getAccountsByClient(clientId);
      setAccounts(data);
    };

    fetchAccounts();
  }, [clientId]);

  return (
    <>
      <Navbar />
      <div>
        <h1>Accounts for Client: {clientId}</h1>
        <AccountsTable accounts={accounts} />
      </div>
    </>
  );
};

export default AccountsByClientId;