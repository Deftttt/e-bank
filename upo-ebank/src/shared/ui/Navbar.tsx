import MenuIcon from '@mui/icons-material/Menu';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import useAuth from '../../hooks/useAuth';
import { Box } from '@mui/material';

export default function MenuAppBar() {

  const { auth, logout } = useAuth();

  const handleLogout = () => {
    logout();
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
        <Box display="flex" alignItems="center">
          <Button color="inherit" href='/login'>Login</Button>
          <Button color="inherit" href='/register'>Register</Button>
        </Box>
      ) : (
        <Box display="flex" alignItems="center">
          <Typography variant="subtitle1" color="inherit" sx={{ pr: 2 }}>
            Logged in as: {auth.email}
          </Typography>
          <Button color="inherit" onClick={handleLogout}>Logout</Button>
        </Box>
      )}
    </Toolbar>
  </AppBar>
);
}