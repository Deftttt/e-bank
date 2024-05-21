import React from 'react';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';

const AccountTypeFilter = ({ onTypeChange }: { onTypeChange: (type: string) => void }) => {
    const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        onTypeChange(event.target.value as string);
    };

    return (
        <FormControl variant="outlined" fullWidth margin="normal" style={{ backgroundColor: 'white', borderRadius: '4px' }}>
            <InputLabel id="account-type-label">Account Type</InputLabel>
            <Select
                labelId="account-type-label"
                onChange={handleChange}
                label="Account Type"
            >
                <MenuItem value=""><em>All</em></MenuItem>
                <MenuItem value="PERSONAL_ACCOUNT">Personal Account</MenuItem>
                <MenuItem value="STUDENT_ACCOUNT">Student Account</MenuItem>
                <MenuItem value="RETIREMENT_ACCOUNT">Retirement Account</MenuItem>
                <MenuItem value="INVESTMENT_ACCOUNT">Investment Account</MenuItem>
            </Select>
        </FormControl>
    );
};

export default AccountTypeFilter;
