import React, { useEffect, useState } from 'react';
import { BankAccount, getAccountByNumber } from './AccountsService';
import AccountsTable from './AccountsTable';
import { useParams } from 'react-router-dom';
import Navbar from '../shared/ui/Navbar';

const AccountsByNumber = () => {
  const { accountNumber } = useParams<{ accountNumber: string }>();
  const [account, setAccount] = useState<BankAccount | null>(null);

  useEffect(() => {
    const fetchAccount = async () => {
      const data = await getAccountByNumber(accountNumber);
      setAccount(data);
    };

    fetchAccount();
  }, [accountNumber]);

  return (
    <>
      <Navbar />
      <div>
        <h1>Account Details for Account Number: {accountNumber}</h1>
        {account && (
          <AccountsTable accounts={[account]} />
        )}
      </div>
    </>
  );
};

export default AccountsByNumber;