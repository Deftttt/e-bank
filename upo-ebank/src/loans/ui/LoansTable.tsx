import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TableSortLabel, Paper } from '@mui/material';
import { LoanDto } from '../services/LoanService';
import LoanStatusChip from './LoanStatusChip';

const LoansTable = ({ loans, onSortChange }: { loans: LoanDto[], onSortChange: (field: string) => void }) => {
    const sortBy = (field: string) => () => {
        onSortChange(field);
    };

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
                            <TableSortLabel onClick={sortBy('clientId')}>
                                Client ID
                            </TableSortLabel>
                        </TableCell>
                        <TableCell>
                            <TableSortLabel onClick={sortBy('employeeId')}>
                                Employee ID
                            </TableSortLabel>
                        </TableCell>
                        <TableCell>
                            <TableSortLabel onClick={sortBy('amount')}>
                                Amount
                            </TableSortLabel>
                        </TableCell>
                        <TableCell>Status</TableCell>
                        <TableCell>
                            <TableSortLabel onClick={sortBy('applicationDate')}>
                                Application Date
                            </TableSortLabel>
                        </TableCell>
                        <TableCell>
                            <TableSortLabel onClick={sortBy('decisionDate')}>
                                Decision Date
                            </TableSortLabel>
                        </TableCell>
                        <TableCell>Loan Purpose</TableCell>
                        <TableCell>
                            <TableSortLabel onClick={sortBy('loanTermMonths')}>
                                Loan Term (Months)
                            </TableSortLabel>
                        </TableCell>
                        <TableCell>
                            <TableSortLabel onClick={sortBy('startDate')}>
                                Start Date
                            </TableSortLabel>
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {loans.map((loan) => (
                        <TableRow key={loan.id}>
                            <TableCell>{loan.id}</TableCell>
                            <TableCell>{loan.clientId}</TableCell>
                            <TableCell>{loan.employeeId}</TableCell>
                            <TableCell>{loan.amount}</TableCell>
                            <TableCell><LoanStatusChip status={loan.status} /></TableCell>
                            <TableCell>{loan.applicationDate}</TableCell>
                            <TableCell>{loan.decisionDate ? loan.decisionDate : "No decision yet"}</TableCell>
                            <TableCell>{loan.loanPurpose}</TableCell>
                            <TableCell>{loan.loanTermMonths}</TableCell>
                            <TableCell>{loan.startDate}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default LoansTable;
