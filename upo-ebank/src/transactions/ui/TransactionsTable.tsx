import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TableSortLabel, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Transaction } from '../services/TransactionService';

const TransactionsTable = ({ transactions, onSortChange }: { transactions: Transaction[], onSortChange: (field: string) => void }) => {
    const sortBy = (field: string) => () => {
        onSortChange(field);
    };
    const navigate = useNavigate();

    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>
                            <TableSortLabel onClick={sortBy('id')}>
                                ID
                            </TableSortLabel>
                        </TableCell>
                        <TableCell>
                            <TableSortLabel onClick={sortBy('amount')}>
                                Amount
                            </TableSortLabel>
                        </TableCell>
                        <TableCell>
                            <TableSortLabel onClick={sortBy('transactionDate')}>
                                Transaction Date
                            </TableSortLabel>
                        </TableCell>
                        <TableCell>
                                Sender Account
                        </TableCell>
                        <TableCell>
                                Recipient Account
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                {transactions.map((transaction) => (
                    <TableRow
                    key={transaction.id}
                    onClick={() => navigate(`/transactions/${transaction.id}`)}
                    style={{ cursor: 'pointer' }}
                    >
                            <TableCell>{transaction.id}</TableCell>
                            <TableCell>{transaction.amount}</TableCell>
                            <TableCell>{transaction.transactionDate}</TableCell>
                            <TableCell>{transaction.senderAccountNumber}</TableCell>
                            <TableCell>{transaction.recipientAccountNumber}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default TransactionsTable;
