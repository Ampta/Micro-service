import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { getActivityDetail } from '../services/api';
import { Box, Card, CardContent, Chip, Container, Divider, Grid, List, ListItem, ListItemIcon, ListItemText, Paper, Stack, Typography, useTheme } from '@mui/material';

// Icons for better visual cues
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';

const ActivityDetails = () => {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const theme = useTheme();

  useEffect(() => {
    const fetchActivityDetail = async () => {
      try {
        const response = await getActivityDetail(id);
        // Assuming response.data matches the JSON provided in your prompt
        setData(response.data);
      } catch (error) {
        console.error("Failed to fetch details:", error);
      }
    };

    fetchActivityDetail();
  }, [id]);

  if (!data) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <Typography>Loading activity analysis...</Typography>
      </Box>
    );
  }

  // Formatting date safely
  const formattedDate = data.createdAt 
    ? new Date(data.createdAt).toLocaleDateString(undefined, {
        weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit'
      })
    : 'Unknown Date';

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      
      {/* --- HEADER SECTION: Activity Summary --- */}
      <Paper elevation={3} sx={{ p: 3, mb: 4, borderRadius: 2, background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)' }}>
        <Stack direction={{ xs: 'column', md: 'row' }} justifyContent="space-between" alignItems="center" spacing={2}>
          <Box>
            <Stack direction="row" alignItems="center" spacing={1} mb={1}>
              <FitnessCenterIcon color="primary" />
              <Typography variant="h4" component="h1" fontWeight="bold" color="text.primary">
                {data.activityType || 'Activity'} Analysis
              </Typography>
            </Stack>
            <Stack direction="row" spacing={2} color="text.secondary">
              <Box display="flex" alignItems="center" gap={0.5}>
                <CalendarTodayIcon fontSize="small" />
                <Typography variant="body2">{formattedDate}</Typography>
              </Box>
              {data.duration && (
                <Box display="flex" alignItems="center" gap={0.5}>
                  <AccessTimeIcon fontSize="small" />
                  <Typography variant="body2">{data.duration} min</Typography>
                </Box>
              )}
            </Stack>
          </Box>
          <Chip 
            label={data.activityType} 
            color="primary" 
            variant="filled" 
            sx={{ px: 2, py: 2.5, fontSize: '1rem', fontWeight: 'bold' }} 
          />
        </Stack>

        <Divider sx={{ my: 2 }} />

        {/* Overall Recommendation Text */}
        <Box sx={{ bgcolor: 'background.paper', p: 2, borderRadius: 1, borderLeft: `4px solid ${theme.palette.primary.main}` }}>
          <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
            Overall Assessment
          </Typography>
          <Typography variant="body1" color="text.secondary">
            {data.recommendation}
          </Typography>
        </Box>
      </Paper>


      {/* --- DETAILS GRID --- */}
      <Grid container spacing={3}>
        
        {/* 1. Improvements Column */}
        <Grid size={{ xs: 12, sm: 6}}>
          <Card elevation={2} sx={{ height: '100%', borderRadius: 2 }}>
            <CardContent>
              <Stack direction="row" alignItems="center" spacing={1} mb={2}>
                <TrendingUpIcon color="success" />
                <Typography variant="h6">Areas for Improvement</Typography>
              </Stack>
              <Divider sx={{ mb: 2 }} />
              
              <List dense>
                {data.improvements?.map((item, index) => (
                  <ListItem key={index} alignItems="flex-start" sx={{ px: 0 }}>
                    <ListItemIcon sx={{ minWidth: 32, mt: 0.5 }}>
                      <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: 'success.main' }} />
                    </ListItemIcon>
                    <ListItemText 
                      primary={item} 
                      primaryTypographyProps={{ variant: 'body2', lineHeight: 1.6 }} 
                    />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>

        {/* 2. Suggestions Column */}
        <Grid size={{ xs: 12, sm: 6 }}>
          <Card elevation={2} sx={{ height: '100%', borderRadius: 2 }}>
            <CardContent>
              <Stack direction="row" alignItems="center" spacing={1} mb={2}>
                <LightbulbIcon color="warning" />
                <Typography variant="h6">Training Suggestions</Typography>
              </Stack>
              <Divider sx={{ mb: 2 }} />

              <List dense>
                {data.suggestions?.map((item, index) => (
                  <ListItem key={index} alignItems="flex-start" sx={{ px: 0 }}>
                     <ListItemIcon sx={{ minWidth: 32, mt: 0.5 }}>
                      <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: 'warning.main' }} />
                    </ListItemIcon>
                    <ListItemText 
                      primary={item} 
                      primaryTypographyProps={{ variant: 'body2', lineHeight: 1.6 }} 
                    />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>

        {/* 3. Safety Guidelines (Full Width) */}
        <Grid size={{ xs: 12, sm: 6 }}>
          <Card elevation={2} sx={{ borderRadius: 2, border: '1px solid #e0e0e0' }}>
            <CardContent>
              <Stack direction="row" alignItems="center" spacing={1} mb={2}>
                <VerifiedUserIcon color="error" />
                <Typography variant="h6">Safety Guidelines</Typography>
              </Stack>
              <Divider sx={{ mb: 2 }} />

              <Grid container spacing={2}>
                {data.safety?.map((item, index) => (
                  <Grid size={{ xs: 12, sm: 6 }} key={index}>
                    <Box display="flex" gap={1.5}>
                      <Typography color="error" sx={{ fontWeight: 'bold' }}>•</Typography>
                      <Typography variant="body2" color="text.secondary">
                        {item}
                      </Typography>
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </CardContent>
          </Card>
        </Grid>

      </Grid>
    </Container>
  );
};

export default ActivityDetails;