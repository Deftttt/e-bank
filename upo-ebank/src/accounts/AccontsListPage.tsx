import React, { useEffect, useState } from 'react';
import { Box, Container, TablePagination } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import Loading from '../shared/ui/Loading';
import { BankAccount, getAllAccounts, getAccountsByClient, AccountType } from './services/AccountsService';
import AccountsTable from './ui/AccountsTable';
import AccountTypeFilter from './ui/AccountTypeFilter';
import { PagedResponse } from '../utils/PagedResponse';
import NoDataMessage from '../shared/NoDataMessage';
import { useTheme } from '@mui/material/styles';

const AccountsListPage = () => {
  const [accounts, setAccounts] = useState<BankAccount[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [sort, setSort] = useState('accountNumber,asc');
  const [totalAccounts, setTotalAccounts] = useState(0);
  const [accountType, setAccountType] = useState<AccountType | undefined>(undefined);
  const navigate = useNavigate();
  const { clientId } = useParams<{ clientId: string }>();
  const theme = useTheme();

  useEffect(() => {
    const fetchAccounts = async () => {
      setIsLoading(true);
      try {
        let data: PagedResponse<BankAccount>;
        if (clientId) {
          data = await getAccountsByClient(clientId, page, rowsPerPage, sort, accountType);
        } else {
          data = await getAllAccounts(page, rowsPerPage, sort, accountType);
        }
        setAccounts(data.content);
        setTotalAccounts(data.totalElements);
      } catch (error) {
        navigate('/error', { state: { message: 'Failed to load accounts' } });
      } finally {
        setIsLoading(false);
      }
    };

    fetchAccounts();
  }, [navigate, page, rowsPerPage, sort, accountType, clientId]);

  const handleSortChange = (sortField: string) => {
    const isAsc = sort.endsWith('asc');
    const direction = isAsc ? 'desc' : 'asc';
    setSort(`${sortField},${direction}`);
  };

  const handleTypeChange = (newType: string) => {
    setAccountType(newType as AccountType);
    setPage(0);
  };

  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  if (isLoading) {
    return <Loading />;
  }

  if (accounts.length === 0) {
    return (
      <>
        <Container maxWidth={false}>
          <h1>
            {clientId ? `Accounts of client ${clientId}:` : 'All Accounts'}
          </h1>
          <AccountTypeFilter onTypeChange={handleTypeChange} />
          <NoDataMessage message="No accounts with given criteria available." />
        </Container>
      </>
    );
  }

  return (
    <>

      <Container maxWidth={false}>
        <h1>
          {clientId ? `Accounts of client ${clientId}:` : 'All Accounts'}
        </h1>
        <AccountTypeFilter onTypeChange={handleTypeChange} />
        <Box pb={4}>
          <AccountsTable accounts={accounts} onSortChange={handleSortChange} />
          <TablePagination
            component="div"
            count={totalAccounts}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            style={{
              display: 'flex',
              justifyContent: 'center',
              backgroundColor: theme.palette.background.default,
              color: theme.palette.text.primary,
            }}
          />
        </Box>
      </Container>
    </>
  );
};

export default AccountsListPage;
