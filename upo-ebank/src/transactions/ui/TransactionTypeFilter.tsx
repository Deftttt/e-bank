import React from 'react';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { TransactionType } from '../services/TransactionService';

const TransactionTypeFilter = ({ onTypeChange: onTypeChange }: { onTypeChange: (status: TransactionType) => void }) => {
  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    onTypeChange(event.target.value as TransactionType);
  };

  return (
    <FormControl variant="outlined" fullWidth margin="normal" style={{ backgroundColor: 'white', borderRadius: '4px' }}>
      <InputLabel id="transaction-type-label">Transaction Type</InputLabel>
      <Select
        labelId="transaction-type-label"
        onChange={handleChange}
        label="Transaction Type"
      >
        <MenuItem value=""><em>All</em></MenuItem>
        <MenuItem value="OUTGOING">Outgoing</MenuItem>
        <MenuItem value="INCOMING">Incoming</MenuItem>
      </Select>
    </FormControl>
  );
};

export default TransactionTypeFilter;