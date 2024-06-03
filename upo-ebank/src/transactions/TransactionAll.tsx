import React, { useEffect, useState } from 'react';
import { Box, Container, TablePagination, TextField, Button } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import Loading from '../shared/ui/Loading';
import Navbar from '../shared/ui/Navbar';
import TransactionsTable from './ui/TransactionsTable';
import { Transaction, getAllTransactions } from './services/TransactionService';
import { PagedResponse } from '../utils/PagedResponse';
import NoDataMessage from '../shared/NoDataMessage';
import { useTheme } from '@mui/material/styles';

const TransactionsListPage = () => {
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [sort, setSort] = useState('id,asc');
    const [totalTransactions, setTotalTransactions] = useState(0);
    const { accountNumber, clientId } = useParams();
    const navigate = useNavigate();
    const theme = useTheme();

    useEffect(() => {
        const fetchTransactions = async () => {
            setIsLoading(true);
            try {
                let data: PagedResponse<Transaction>;
                data = await getAllTransactions(page, rowsPerPage, sort);
                setTransactions(data.content);
                setTotalTransactions(data.totalElements);
            } catch (error) {
                navigate('/error', { state: { message: 'Failed to load transactions' } });
            } finally {
                setIsLoading(false);
            }
        };

        fetchTransactions();
    }, [navigate, page, rowsPerPage, sort, accountNumber, clientId]);

    const handleSortChange = (sortField: string) => {
        const isAsc = sort.endsWith('asc');
        const direction = isAsc ? 'desc' : 'asc';
        setSort(`${sortField},${direction}`);
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

    if (transactions.length === 0) {
        return (
          <>
            <Navbar />
            <Container maxWidth={false}>
            <h1>
                List of all transactions:
            </h1>
              <NoDataMessage message="No transactions with given criteria available." />
            </Container>
          </>
        );
      }

    return (
        <>
            <Navbar />
            <Container maxWidth={false}>
                <h1>
                  List of all transactions:
                </h1>
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
                            backgroundColor: theme.palette.background.default,
                            color: theme.palette.text.primary,
                          }}
                    />
            </Container>
        </>
    );
};

export default TransactionsListPage;
