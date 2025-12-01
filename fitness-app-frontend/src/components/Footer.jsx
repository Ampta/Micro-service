import { Box, Button, Toolbar } from '@mui/material'
import { useNavigate } from 'react-router'

const Footer = () => {

  const navigate = useNavigate();

  return (
    
      <Box
        component="footer"
        sx={{
          mb: 2,
          display: 'flex',
          justifyContent: 'center',
          gap: 2,
          flexShrink: 0 // Prevents footer from squishing
        }}
      >
        <Button variant="contained" onClick={() => navigate('/activities')}>Home</Button>
        <Button variant="contained" color="warning" onClick={() => navigate('/who')}>Who Am I</Button>
      </Box>
    
  )
}

export default Footer