import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TableSortLabel, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { TimeDepositDto } from '../services/DepositsService';
import DepositStatusChip from './DepositStatusChip';
import DepositTypeChip from './DepositTypeChip'; // Import the new DepositTypeChip component

const DepositsTable = ({ deposits, onSortChange }: { deposits: TimeDepositDto[], onSortChange: (field: string) => void }) => {
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
                                Account Number
                        </TableCell>
                        <TableCell>
                            <TableSortLabel onClick={sortBy('depositAmount')}>
                                Deposit Amount
                            </TableSortLabel>
                        </TableCell>
                        <TableCell>
                            <TableSortLabel onClick={sortBy('depositType')}>
                                Deposit Type
                            </TableSortLabel>
                        </TableCell>
                        <TableCell>
                            <TableSortLabel onClick={sortBy('startDate')}>
                                Start Date
                            </TableSortLabel>
                        </TableCell>
                        <TableCell>
                            <TableSortLabel onClick={sortBy('endDate')}>
                                End Date
                            </TableSortLabel>
                        </TableCell>
                        <TableCell>Status</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {deposits.map((deposit) => (
                        <TableRow
                        key={deposit.id}
                        onClick={() => navigate(`/deposits/${deposit.id}`)}
                        style={{ cursor: 'pointer' }}
                        >
                            <TableCell>{deposit.id}</TableCell>
                            <TableCell>{deposit.accountNumber}</TableCell>
                            <TableCell>{deposit.depositAmount}</TableCell>
                            <TableCell><DepositTypeChip type={deposit.depositType} /></TableCell>
                            <TableCell>{new Date(deposit.startDate).toLocaleDateString()}</TableCell>
                            <TableCell>{new Date(deposit.endDate).toLocaleDateString()}</TableCell>
                            <TableCell><DepositStatusChip status={deposit.status} /></TableCell> 
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default DepositsTable;
