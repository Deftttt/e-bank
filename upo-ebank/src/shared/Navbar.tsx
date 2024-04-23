import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import { useState, MouseEvent, useContext } from 'react';
import { getToken, logout } from '../auth/services/AuthService';
import Button from '@mui/material/Button';
import useAuth from '../hooks/useAuth';

export default function MenuAppBar() {

  const { auth, setAuth } = useAuth();

  const handleLogout = () => {
    logout();
    setAuth(null);
  }

  return (
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Upo E-Bank
          </Typography>
          {!auth ? (
          <div>
            <Button color="inherit" href='/login'>Login</Button>
            <Button color="inherit" href='/register'>Register</Button>
          </div>
        ) : (
          <div>
            <Button color="inherit" onClick={handleLogout}>Logout</Button>
          </div>
        )}
        </Toolbar>
      </AppBar>
  );
}