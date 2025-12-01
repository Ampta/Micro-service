import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router';

const Navbar = ({ logOut }) => {

  const navigate = useNavigate();

  return (
    <AppBar position="sticky" color="primary"
            sx={{ 
        top: 0, // 2. Essential for sticky positioning
        zIndex: 1100 // 3. Ensures it stays above other content when scrolling
      }}>
        
      <Toolbar>

        {/* LEFT SIDE — LOGO / APP NAME */}
        <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: "bold", cursor: 'pointer' }} 
            onClick={() => navigate(`/activities`)}
        >
          Fitness App
        </Typography>

        {/* RIGHT SIDE — LOGOUT BUTTON
        <Button 
          variant="contained" 
          color="warning" 
          sx={{ mr: 2 }}
          onClick={() => navigate(`/who`)}
        >
          Who
        </Button> */}

        <Button 
          variant="contained" 
          color="secondary" 
          onClick={logOut}
        >
          Logout
        </Button>

      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
