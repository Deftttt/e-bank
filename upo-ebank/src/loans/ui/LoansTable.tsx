import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { LoanDto } from '../services/LoanService';
import LoanStatusChip from './LoanStatusChip';

const LoansTable = ({ loans }: { loans: LoanDto[] }) => {
    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>ID</TableCell>
                        <TableCell>Client ID</TableCell>
                        <TableCell>Employee ID</TableCell>
                        <TableCell>Amount</TableCell>
                        <TableCell>Status</TableCell>
                        <TableCell>Application Date</TableCell>
                        <TableCell>Decision Date</TableCell>
                        <TableCell>Loan Purpose</TableCell>
                        <TableCell>Loan Term (Months)</TableCell>
                        <TableCell>Start Date</TableCell>
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
                            <TableCell>{loan.decisionDate}</TableCell>
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