import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TableSortLabel, Paper } from '@mui/material';
import { BankAccount } from '../services/AccountsService';
import { useNavigate } from 'react-router-dom';
import AccountTypeChip from './AccountTypeChip';

interface Props {
  accounts: BankAccount[];
  onSortChange: (field: string) => void;
}

const AccountsTable: React.FC<Props> = ({ accounts, onSortChange }) => {
  const navigate = useNavigate();

  const sortBy = (field: string) => () => {
    onSortChange(field);
  };

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>
              <TableSortLabel onClick={sortBy('accountNumber')}>
                Account Number
              </TableSortLabel>
            </TableCell>
            <TableCell>
              <TableSortLabel onClick={sortBy('balance')}>
                Balance
              </TableSortLabel>
            </TableCell>
            <TableCell>
              <TableSortLabel onClick={sortBy('openingDate')}>
                Opening Date
              </TableSortLabel>
            </TableCell>
            <TableCell>Account Type</TableCell>
            <TableCell>
              <TableSortLabel onClick={sortBy('clientId')}>
                Client ID
              </TableSortLabel>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {accounts.map((account) => (
            <TableRow
              key={account.accountNumber}
              onClick={() => navigate(`/accounts/${account.accountNumber}`)}
              style={{ cursor: 'pointer' }}
            >
              <TableCell>{account.accountNumber}</TableCell>
              <TableCell>{account.balance}</TableCell>
              <TableCell>{account.openingDate}</TableCell>
              <TableCell><AccountTypeChip accountType={account.accountType} /></TableCell>
              <TableCell>{account.clientId}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default AccountsTable;
