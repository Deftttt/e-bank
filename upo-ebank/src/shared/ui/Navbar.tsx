import MenuIcon from '@mui/icons-material/Menu';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { logout } from '../../auth/services/AuthService';
import useAuth from '../../hooks/useAuth';

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