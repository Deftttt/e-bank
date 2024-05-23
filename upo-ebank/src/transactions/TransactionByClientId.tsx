import React, { useEffect, useState } from 'react';
import { Box, Container, TablePagination, Typography } from '@mui/material';
import { Transaction, TransactionType, getTransactionsByClient } from './services/TransactionService';
import TransactionsTable from './ui/TransactionsTable';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../shared/ui/Navbar';
import Loading from '../shared/ui/Loading';
import TransactionTypeFilter from './ui/TransactionTypeFilter';
import { PagedResponse } from '../utils/PagedResponse';

const TransactionByClientId = () => {
  const { clientId } = useParams<{ clientId: string }>();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [sort, setSort] = useState('id,asc');
  const [totalTransactions, setTotalTransactions] = useState(0);
  const [transactionType, setTransactionType] = useState<TransactionType | undefined>(undefined);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTransactions = async () => {
      setIsLoading(true);
      try {
        const data: PagedResponse<Transaction> = await getTransactionsByClient(Number(clientId), transactionType, page, rowsPerPage, sort);
        setTransactions(data.content);
        setTotalTransactions(data.totalElements);
      } catch (error) {
        console.error('Error loading transactions:', error);
        navigate('/error', { state: { message: `Failed to load transactions for client: ${clientId}` } });
      } finally {
        setIsLoading(false);
      }
    };

    fetchTransactions();
  }, [clientId, transactionType, page, rowsPerPage, sort, navigate]);

  const handleSortChange = (sortField: string) => {
    const isAsc = sort.endsWith('asc');
    const direction = isAsc ? 'desc' : 'asc';
    setSort(`${sortField},${direction}`);
  };

  const handleTypeChange = (newType: TransactionType) => {
    setTransactionType(newType);
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

  return (
    <>
      <Navbar />
      <Container maxWidth={false}>
      <h1>
        {`Transactions for client: ${clientId}`}
      </h1>
        <TransactionTypeFilter onTypeChange={handleTypeChange} />
        <Box pb={4}>
        <TransactionsTable transactions={transactions} onSortChange={handleSortChange} />
          <TablePagination
            component="div"
            count={totalTransactions}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            style={{
              display: 'flex',
              justifyContent: 'center',
              backgroundColor: 'white',
              color: 'black',
            }}
        />
        </Box>
      </Container>
    </>
    
  );
};

export default TransactionByClientId;