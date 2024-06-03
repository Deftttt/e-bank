import React from 'react';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { LoanStatus } from '../services/LoanService';

const LoanStatusFilter = ({ onStatusChange }: { onStatusChange: (status: LoanStatus) => void }) => {
    const theme = useTheme();

    const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        onStatusChange(event.target.value as LoanStatus);
    };

    return (
        <FormControl
            variant="outlined"
            fullWidth
            margin="normal"
            style={{ backgroundColor: theme.palette.background.paper, borderRadius: '4px' }}
        >
            <InputLabel id="loan-status-label">Loan Status</InputLabel>
            <Select
                labelId="loan-status-label"
                onChange={handleChange}
                label="Loan Status"
            >
                <MenuItem value=""><em>All</em></MenuItem>
                <MenuItem value="REQUESTED">Requested</MenuItem>
                <MenuItem value="APPROVED">Approved</MenuItem>
                <MenuItem value="DENIED">Denied</MenuItem>
                <MenuItem value="REJECTED">Rejected</MenuItem>
                <MenuItem value="ACCEPTED">Accepted</MenuItem>
            </Select>
        </FormControl>
    );
};

export default LoanStatusFilter;
