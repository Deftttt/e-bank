import React, { useEffect, useState } from 'react';
import { BankAccount, getAllAccounts } from './AccountsService'; 
import AccountsTable from './AccountsTable'; 
import { Container } from '@mui/material';
import Navbar from '../shared/ui/Navbar'; 

const AccountAll = () => {
  const [accounts, setAccounts] = useState<BankAccount[]>([]); 

  useEffect(() => { 
    const fetchAccounts = async () => { 
      const data = await getAllAccounts(); 
      setAccounts(data); 
    };

    fetchAccounts(); 
  }, []); 

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

export default AccountAll; 
