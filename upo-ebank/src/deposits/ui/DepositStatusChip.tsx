import React from 'react';
import { Chip } from '@mui/material';
import { DepositStatus } from '../services/DepositsService';

const getStatusColor = (status: DepositStatus): "default" | "success" | "error" => {
    switch (status) {
        case 'ACTIVE':
            return 'success';
        case 'CLOSED':
            return 'error';
        default:
            return 'default';
    }
};

const DepositStatusChip = ({ status }: { status: DepositStatus }) => {
    return <Chip label={status} color={getStatusColor(status)} />;
};

export default DepositStatusChip;
