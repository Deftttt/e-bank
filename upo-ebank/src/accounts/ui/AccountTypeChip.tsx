import React from 'react';
import { Chip } from '@mui/material';
import { lightGreen, lightBlue, pink, orange } from '@mui/material/colors';
import { AccountType } from '../services/AccountsService';

const AccountTypeChip = ({ accountType }: { accountType: AccountType }) => {
  const getAccountTypeChip = (type: AccountType) => {
    switch (type) {
      case 'PERSONAL_ACCOUNT':
        return <Chip label="Personal Account" style={{ backgroundColor: lightGreen[500] }} />;
      case 'STUDENT_ACCOUNT':
        return <Chip label="Student Account" style={{ backgroundColor: lightBlue[500] }} />;
      case 'RETIREMENT_ACCOUNT':
        return <Chip label="Retirement Account" style={{ backgroundColor: orange[500] }} />;
      case 'INVESTMENT_ACCOUNT':
        return <Chip label="Investment Account" style={{ backgroundColor: pink[500] }} />;
    }
  };

  return getAccountTypeChip(accountType);
};

export default AccountTypeChip;
