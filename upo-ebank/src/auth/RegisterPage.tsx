import React, { useState } from 'react';
import { Avatar, Box, Button, Container, CssBaseline, Grid, TextField, Typography, Link as MuiLink } from "@mui/material";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useNavigate } from "react-router-dom";
import { register } from './services/AuthService';

const RegisterPage = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        firstName: '',
        lastName: '',
        phoneNumber: '',
        pesel: '',
        city: '',
        street: '',
        localNumber: '',
        postCode: '',
        country: '',
    });
    const [errors, setErrors] = useState({});

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await register(formData);
            navigate('/register-instructions', { state: { email: formData.email } });
        } catch (error) {
            if (error.response && error.response.data && error.response.data.errors) {
                setErrors(error.response.data.errors);
            }
        }
    };

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box sx={{ pt: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign up
                </Typography>
                <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                    <Grid container spacing={2}>
                        {Object.keys(formData).map((key, index) => (
                            <Grid item xs={12} sm={index < 6 ? 6 : 12}>
                                <TextField
                                    required
                                    fullWidth
                                    id={key}
                                    label={key.charAt(0).toUpperCase() + key.slice(1)}
                                    name={key}
                                    autoComplete={key}
                                    type={key.includes("password") ? "password" : "text"}
                                    onChange={handleChange}
                                    error={!!errors[key]}
                                    helperText={errors[key]}
                                />
                            </Grid>
                        ))}
                    </Grid>
                    <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                        Sign Up
                    </Button>
                    <Grid container justifyContent="flex-end">
                        <Grid item>
                            <MuiLink href="/login" variant="body2">
                                Already have an account? Sign in
                            </MuiLink>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Container>
    );
};

export default RegisterPage;
