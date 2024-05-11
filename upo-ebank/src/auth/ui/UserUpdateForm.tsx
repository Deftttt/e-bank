import React, { useState, useMemo } from 'react';
import { Button, TextField, Box, Grid, Typography } from '@mui/material';
import { UserUpdateDto, AddressUpdateDto } from '../services/UserService';


interface UserUpdateFormProps {
    initialData: UserUpdateDto;
    errors: { [key: string]: string };
    onSubmit: (updatedData: UserUpdateDto) => void;
}

interface AddressFormProps {
    address: AddressUpdateDto;
    errors: { [key: string]: string };
    index: number;
    onChange: (index: number, event: React.ChangeEvent<HTMLInputElement>) => void;
    onRemove: (index: number) => void;
    canRemove: boolean;
}

const AddressForm: React.FC<AddressFormProps> = ({ address, errors, index, onChange, onRemove, canRemove }) => {
    const getAddressError = (field: string) => errors[`addresses[${index}].${field}`];

    return (
        <Box key={index}>
            <Typography variant="h6" align="center" gutterBottom>
                Address {index + 1}
            </Typography>
            <Grid container spacing={2} alignItems="center">
                {['street', 'city', 'country', 'postCode', 'localNumber'].map((field, idx) => (
                    <Grid item xs={12} sm={6} md={2} key={idx}>
                        <TextField
                            fullWidth
                            margin="normal"
                            name={field}
                            label={field.charAt(0).toUpperCase() + field.slice(1)}
                            value={(address as any)[field] || ''}
                            onChange={(e) => onChange(index, e)}
                            error={!!getAddressError(field)}
                            helperText={getAddressError(field)}
                        />
                    </Grid>
                ))}
                <Grid item>
                    <Button disabled={!canRemove} onClick={() => onRemove(index)}>
                        Remove
                    </Button>
                </Grid>
            </Grid>
        </Box>
    );
};



const UserUpdateForm: React.FC<UserUpdateFormProps> = ({ initialData, errors, onSubmit }) => {
    const [userUpdateDto, setUserUpdateDto] = useState<UserUpdateDto>(initialData);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUserUpdateDto({
            ...userUpdateDto,
            [event.target.name]: event.target.value,
        });
    };

    const handleAddressChange = (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
        const newAddresses = [...userUpdateDto.addresses];
        newAddresses[index] = { ...newAddresses[index], [event.target.name]: event.target.value };
        setUserUpdateDto({ ...userUpdateDto, addresses: newAddresses });
    };

    const handleAddAddress = () => {
        setUserUpdateDto({
            ...userUpdateDto,
            addresses: [...userUpdateDto.addresses, { street: '', city: '', country: '', postCode: '', localNumber: '' }],
        });
    };

    const handleRemoveAddress = (index: number) => {
        setUserUpdateDto({
            ...userUpdateDto,
            addresses: userUpdateDto.addresses.filter((_, i) => i !== index),
        });
    };

    const handleSubmit = () => {
        onSubmit(userUpdateDto);
    };

    return (
        <Box component="form">
            {['firstName', 'lastName', 'phoneNumber'].map((field) => (
                <TextField
                    key={field}
                    fullWidth
                    margin="normal"
                    name={field}
                    label={field.charAt(0).toUpperCase() + field.slice(1)}
                    value={(userUpdateDto as any)[field] || ''}
                    onChange={handleInputChange}
                    error={!!errors[field]}
                    helperText={errors[field]}
                />
            ))}
            {userUpdateDto.addresses.map((address, index) => (
                <AddressForm
                    key={index}
                    address={address}
                    errors={errors}
                    index={index}
                    onChange={handleAddressChange}
                    onRemove={handleRemoveAddress}
                    canRemove={userUpdateDto.addresses.length > 1}
                />
            ))}
            <Grid container direction="column" alignItems="center" spacing={2}>
                <Grid item>
                    <Button onClick={handleAddAddress}>Add Address</Button>
                </Grid>
                <Grid item>
                    <Button variant="contained" color="primary" onClick={handleSubmit}>
                        Update
                    </Button>
                </Grid>
            </Grid>
        </Box>
    );
};

export default UserUpdateForm;
