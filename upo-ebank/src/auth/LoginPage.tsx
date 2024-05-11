import React, { useState } from 'react';
import { LockOutlined as LockOutlinedIcon } from '@mui/icons-material';
import {
    Avatar, Box, Button, Checkbox, Container, CssBaseline, FormControlLabel,
    Grid, TextField, Typography
} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import { LoginData } from './services/AuthService';

const LoginPage: React.FC = () => {
    const navigate = useNavigate();
    const { login } = useAuth();
    const [showMfaInput, setShowMfaInput] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const loginData: LoginData = {
            email: data.get('email') as string,
            password: data.get('password') as string,
            mfaCode: data.get('mfaCode') as string,
        };
        try {
            await login(loginData);
            navigate('/');
        } catch (err: any) {
            console.error('Error during login:', err);
            setError(err?.response?.data?.message || 'Login failed');
        }
    };

    const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setShowMfaInput(event.target.checked);
    };

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
                sx={{
                    paddingTop: 4,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign in
                </Typography>
                <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        error={!!error}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        error={!!error}
                    />
                    {showMfaInput && (
                        <TextField
                            margin="normal"
                            fullWidth
                            name="mfaCode"
                            label="MFA Code"
                            id="mfaCode"
                        />
                    )}
                    {error && (
                        <Typography variant="body2" color="error" align="center" sx={{ fontWeight: 'bold' }}>
                            {error}
                        </Typography>
                    )}
                    <Box display="flex" justifyContent="center">
                        <FormControlLabel
                            control={<Checkbox color="primary" onChange={handleCheckboxChange} />}
                            label="Show MFA input"
                        />
                    </Box>
                    <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                        Sign In
                    </Button>
                    <Grid container>
                        <Grid item xs>
                            <Link to="/forgot-password" variant="body2">
                                {"Forgot password?"}
                            </Link>
                        </Grid>
                        <Grid item>
                            <Link to="/register" variant="body2">
                                {"Don't have an account? Sign Up"}
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Container>
    );
};

export default LoginPage;
