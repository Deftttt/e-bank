import React from 'react';
import { Chip } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { AccountType } from '../services/AccountsService';

const AccountTypeChip = ({ accountType }: { accountType: AccountType }) => {
  const theme = useTheme();

  const getAccountTypeChip = (type: AccountType) => {
    switch (type) {
      case 'PERSONAL_ACCOUNT':
        return <Chip label="Personal Account" style={{ backgroundColor: theme.palette.custom.green, color: theme.palette.getContrastText(theme.palette.custom.green) }} />;
      case 'STUDENT_ACCOUNT':
        return <Chip label="Student Account" style={{ backgroundColor: theme.palette.custom.blue, color: theme.palette.getContrastText(theme.palette.custom.blue) }} />;
      case 'RETIREMENT_ACCOUNT':
        return <Chip label="Retirement Account" style={{ backgroundColor: theme.palette.custom.orange, color: theme.palette.getContrastText(theme.palette.custom.orange) }} />;
      case 'INVESTMENT_ACCOUNT':
        return <Chip label="Investment Account" style={{ backgroundColor: theme.palette.custom.red, color: theme.palette.getContrastText(theme.palette.custom.red) }} />;
      default:
        return <Chip label="Unknown Account" style={{ backgroundColor: theme.palette.grey[500], color: theme.palette.getContrastText(theme.palette.grey[500]) }} />;
    }
  };

  return getAccountTypeChip(accountType);
};

export default AccountTypeChip;
