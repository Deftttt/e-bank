import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import useAuth from '../../hooks/useAuth';
import { Box } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import { useNavigate } from 'react-router-dom';

export default function MenuAppBar() {

  const { auth, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
  }

  return (
    <AppBar position="static">
      <Toolbar>
        <Box onClick={() => navigate('/')} sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer', flexGrow: 1 }}>
          <IconButton edge="start" color="inherit" aria-label="home">
            <HomeIcon />
          </IconButton>
          <Typography variant="h6" component="div">
            Upo E-Bank
          </Typography>
        </Box>
        {!auth ? (
          <Box display="flex" alignItems="center">
            <Button variant="contained" size="large" href='/login' sx={{ bgcolor: 'primary.light', mr: 2 }}>Login</Button>
            <Button variant="contained" size="large" href='/register' sx={{ bgcolor: 'primary.dark', mr: 2 }}>Register</Button>
          </Box>
        ) : (
          <Box display="flex" alignItems="center">
            <Typography variant="subtitle1" color="inherit" sx={{ pr: 2 }}>
              Logged in as: {auth.email}
            </Typography>
            <Button variant="contained" size="large" onClick={handleLogout} sx={{ bgcolor: 'primary.light' }}>Logout</Button>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );

}