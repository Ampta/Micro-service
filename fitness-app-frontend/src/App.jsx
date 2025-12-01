import { Box, Container, Grid, Typography, useTheme, useMediaQuery, Button, Paper, Stack } from '@mui/material'
import { useContext, useEffect, useState } from 'react'
import { AuthContext } from 'react-oauth2-code-pkce'
import { useDispatch } from 'react-redux'
import { BrowserRouter, Navigate, Routes, Route } from 'react-router'
import { setCreadentials } from './store/authSlice'
import ActivityDetails from './components/ActivityDetails'
import Update from './components/Footer'
import ActivityForm from './components/ActivityForm'
import ActivityList from './components/ActivityList'
import WhoAmI from './components/WhoAmI'
import DashboardIcon from '@mui/icons-material/Dashboard';
import Navbar from './components/Navbar'
import Footer from './components/Footer'

import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import LoginIcon from '@mui/icons-material/Login';

const ActivitiesPage = () => {
  const [reloadFlag, setReloadFlag] = useState(0);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const refresh = () => setReloadFlag((prev) => prev + 1);

  return (
    <Box component="section" sx={{ bgcolor: '#f4f6f8', minHeight: '100vh', py: 1 }}>
      <Container maxWidth="xl">

        {/* Page Header */}
        <Box sx={{ mb: 4, display: 'flex', alignItems: 'center', gap: 2 }}>
          <DashboardIcon color="primary" sx={{ fontSize: 40 }} />
          <Typography variant="h4" fontWeight="bold" color="text.primary">
            Activity Tracker
          </Typography>
        </Box>

        <Grid container spacing={3}>
          {/* Left Column */}
          <Grid size={{ xs: 12, md: 4, lg: 3 }}>
            <Box sx={{ position: isMobile ? 'static' : 'sticky', top: 24 }}>
              <ActivityForm onActivityAdded={refresh} />
            </Box>
          </Grid>

          {/* Right Column */}
          <Grid size={{ xs: 12, md: 8, lg: 9 }}>
            <ActivityList reload={reloadFlag} />
          </Grid>
        </Grid>

      </Container>
    </Box>
  );
};

const App = () => {

  const { token, tokenData, logIn, logOut, isAuthenticated } = useContext(AuthContext);
  const dispatch = useDispatch();
  const [authReady, setAuthReady] = useState(false);

  useEffect(() => {
    if (token) {
      dispatch(setCreadentials({ token, user: tokenData }));
      setAuthReady(true);
    }
  }, [token, tokenData, dispatch]);

  return (
    <BrowserRouter>
      {!token ? (

        <Box
          sx={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            // A modern, subtle gradient background
            background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
            p: 2,
          }}
        >

          <Container maxWidth="sm">
            <Paper
              elevation={6}
              sx={{
                p: 5,
                borderRadius: 5,
                textAlign: 'center',
                background: 'rgba(255, 255, 255, 0.95)', // Slight transparency
                backdropFilter: 'blur(10px)',
                transition: 'transform 0.3s',
                '&:hover': {
                  transform: 'translateY(-5px)',
                }
              }}
            >
              {/* Logo / Brand Icon */}
              <Box
                sx={{
                  display: 'inline-flex',
                  p: 2.5,
                  borderRadius: '50%',
                  bgcolor: 'primary.main',
                  color: 'white',
                  mb: 3,
                  boxShadow: '0 8px 20px rgba(25, 118, 210, 0.3)',
                }}
              >
                <FitnessCenterIcon sx={{ fontSize: 50 }} />
              </Box>

              <Typography variant="h3" component="h1" fontWeight="800" gutterBottom color="text.primary">
                Fitness Tracker
              </Typography>

              <Typography variant="h6" color="text.secondary" sx={{ mb: 4, lineHeight: 1.6, fontWeight: 400 }}>
                Track your workouts, analyze your performance with AI, and reach your fitness goals faster.
              </Typography>

              <Stack direction="column" spacing={2} alignItems="center">
                <Button
                  variant="contained"
                  size="large"
                  onClick={() => { logIn() }}
                  startIcon={<LoginIcon />}
                  sx={{
                    px: 6,
                    py: 1.5,
                    borderRadius: 3,
                    fontSize: '1.1rem',
                    fontWeight: 'bold',
                    textTransform: 'none',
                    boxShadow: '0 4px 14px 0 rgba(0,118,255,0.39)',
                  }}
                >
                  Login to Dashboard
                </Button>

                <Typography variant="caption" color="grey[500]" sx={{ mt: 2 }}>
                  © 2025 https://github.com/ampta
                </Typography>
              </Stack>
            </Paper>
          </Container>

        </Box>

      ) : (

        <Box component="main"
          sx={{
            height: '100vh',
            display: 'flex',
            flexDirection: 'column',

          }}>

          <Navbar logOut={logOut} />

          <Box
            component="main"
            sx={{
              flexGrow: 1,    // Takes up all available space
              overflow: 'auto', // ADDS SCROLLBAR HERE if content is too long
              mt: 2,          // Spacing from Navbar
              mb: 2,           // Spacing from Footer
              scrollBehavior: 'smooth'
            }}
            >
              
            <Routes>
              <Route path='/who' element={<WhoAmI token={token} tokenData={tokenData} />} />
              <Route path='/activities' element={<ActivitiesPage />} />
              <Route path='/activities/:id' element={<ActivityDetails />} />
              <Route path='/' element={token ? <Navigate to='/activities' replace /> : <div>Welcome! Please Login.</div>} />
            </Routes>
          </Box>

          <Footer />
        </Box>

      )}


    </BrowserRouter>
  )
}

export default App