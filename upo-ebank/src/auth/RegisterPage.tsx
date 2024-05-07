import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { Avatar, Box, Button, Container, CssBaseline, Grid, TextField, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { RegisterData, register } from './services/AuthService';
import { useState } from 'react';

const RegisterPage = () => {
    const navigate = useNavigate();
    const [errors, setErrors] = useState({});
    
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const registerData: RegisterData = {
            email: data.get('email') as string,
            password: data.get('password') as string,
            firstName: data.get('firstName') as string,
            lastName: data.get('lastName') as string,
            phoneNumber: data.get('phoneNumber') as string,
            pesel: data.get('pesel') as string,
            city: data.get('city') as string,
            street: data.get('street') as string,
            localNumber: data.get('localNumber') as string,
            postCode: data.get('postCode') as string,
            country: data.get('country') as string,
        };
        try {
            const response = await register(registerData);
            navigate('/register-instructions', { state: { email: registerData.email } });
        } catch (error) {
          if (error.response && error.response.data && error.response.data.errors) {
            setErrors(error.response.data.errors);
          }
        }

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
              Sign up
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    autoComplete="given-name"
                    name="firstName"
                    required
                    fullWidth
                    id="firstName"
                    label="First Name"
                    autoFocus
                    error={!!errors.firstName}
                    helperText={errors.firstName}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    id="lastName"
                    label="Last Name"
                    name="lastName"
                    autoComplete="family-name"
                    error={!!errors.lastName}
                    helperText={errors.lastName}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    error={!!errors.email}
                    helperText={errors.email}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="new-password"
                    error={!!errors.password}
                    helperText={errors.password}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="phoneNumber"
                    label="phoneNumber"
                    id="phoneNumber"
                    error={!!errors.phoneNumber}
                    helperText={errors.phoneNumber}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="pesel"
                    label="pesel"
                    id="pesel"
                    error={!!errors.pesel}
                    helperText={errors.pesel}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    name="city"
                    required
                    fullWidth
                    id="city"
                    label="city"
                    autoFocus
                    error={!!errors.city}
                    helperText={errors.city}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    id="postCode"
                    label="postCode"
                    name="postCode"
                    error={!!errors.postCode}
                    helperText={errors.postCode}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    name="street"
                    required
                    fullWidth
                    id="street"
                    label="street"
                    autoFocus
                    error={!!errors.street}
                    helperText={errors.street}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    id="localNumber"
                    label="localNumber"
                    name="localNumber"
                    error={!!errors.localNumber}
                    helperText={errors.localNumber}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="country"
                    label="country"
                    id="country"
                    error={!!errors.country}
                    helperText={errors.country}
                  />
                </Grid>
                
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign Up
              </Button>
              <Grid container justifyContent="flex-end">
                <Grid item sx={{mb:5}}>
                  <Link to="/login" variant="body2">
                    Already have an account? Sign in
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Container>
    );
  }

  export default RegisterPage;