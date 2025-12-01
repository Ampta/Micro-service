import { 
  Box, 
  Button, 
  FormControl, 
  InputLabel, 
  MenuItem, 
  Select, 
  TextField, 
  Paper, 
  Typography, 
  InputAdornment,
  Stack
} from '@mui/material';
import React, { useState } from 'react';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import DirectionsRunIcon from '@mui/icons-material/DirectionsRun';
import { addActivity } from '../services/api';

const ActivityForm = ({ onActivityAdded }) => {

  // We keep 'distance' separate in state for UI, but merge it into additionalMetrics on submit
  const [formData, setFormData] = useState({
    type: "RUNNING",
    duration: '',
    caloriesBurned: '',
    distance: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Prepare the object for the Backend
      const payload = {
        type: formData.type,
        duration: formData.duration,
        caloriesBurned: formData.caloriesBurned,
        // Construct the Map<String, Object> here
        additionalMetrics: {
          distance: formData.distance ? `${formData.distance} km` : 'N/A',
          notes: 'Logged via Web App' 
        }
      };

      await addActivity(payload);
      onActivityAdded();
      
      // Reset Form
      setFormData({ type: "RUNNING", duration: '', caloriesBurned: '', distance: '' });
      
    } catch (error) {
      console.error("Error adding activity", error);
    }
  };

  return (
    <Paper elevation={3} sx={{ p: 3, borderRadius: 4 }}>
      
      <Stack direction="row" alignItems="center" spacing={1} mb={3}>
        <DirectionsRunIcon color="primary" />
        <Typography variant="h6" fontWeight="bold">
          Log Workout
        </Typography>
      </Stack>

      <Box component="form" onSubmit={handleSubmit}>
        
        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel>Activity Type</InputLabel>
          <Select
            name="type"
            label="Activity Type"
            value={formData.type}
            onChange={handleChange}
          >
            <MenuItem value="RUNNING">Running</MenuItem>
            <MenuItem value="WALKING">Walking</MenuItem>
            <MenuItem value="CYCLING">Cycling</MenuItem>
            <MenuItem value="SWIMMING">Swimming</MenuItem>
          </Select>
        </FormControl>

        <Stack spacing={2}>
          {/* Duration Field with "min" suffix */}
          <TextField
            fullWidth
            label="Duration"
            name="duration"
            type="number"
            value={formData.duration}
            onChange={handleChange}
            InputProps={{
              endAdornment: <InputAdornment position="end">min</InputAdornment>,
            }}
          />

          {/* Calories Field with "kcal" suffix */}
          <TextField
            fullWidth
            label="Calories Burned"
            name="caloriesBurned"
            type="number"
            value={formData.caloriesBurned}
            onChange={handleChange}
            InputProps={{
              endAdornment: <InputAdornment position="end">kcal</InputAdornment>,
            }}
          />

          {/* Distance Field (Maps to additionalMetrics) */}
          <TextField
            fullWidth
            label="Distance (Optional)"
            name="distance"
            type="number"
            value={formData.distance}
            onChange={handleChange}
            InputProps={{
              endAdornment: <InputAdornment position="end">km</InputAdornment>,
            }}
          />
        </Stack>

        <Button 
          type="submit" 
          variant="contained" 
          fullWidth 
          size="large"
          startIcon={<AddCircleOutlineIcon />}
          sx={{ mt: 3, borderRadius: 2, textTransform: 'none', fontSize: '1rem' }}
        >
          Add Activity
        </Button>
      </Box>
    </Paper>
  );
};

export default ActivityForm;