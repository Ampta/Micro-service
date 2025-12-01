import {
  Card,
  CardContent,
  Grid,
  Typography,
  Box,
  Chip,
  Divider,
  Stack,
  CardActionArea
} from '@mui/material';

// Icons
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import EventIcon from '@mui/icons-material/Event';

import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router';
import { getActivities } from '../services/api';

const ActivityList = ({ reload }) => {

  const [activities, setActivities] = useState([]);
  const navigate = useNavigate();

  const fetchActivities = async () => {
    try {
      const response = await getActivities();
      setActivities(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    fetchActivities();
  }, [reload]);

  const formatDate = (dateString) => {
    if (!dateString) return 'No date';
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      // hour: '2-digit',
      // minute: '2-digit'
    });
  };

  return (
    <Box sx={{ padding: 2 }}>
      <Grid container spacing={2}>
        {activities.map((activity) => (
          <Grid
            key={activity.id}
            size={{ xs: 12, sm: 6, md: 6 }}
          >
            <Card
              elevation={3}
              sx={{
                height: "100%",
                borderRadius: "16px",
                transition: "0.3s",
                "&:hover": { transform: "translateY(-4px)", boxShadow: 6 },
              }}
            >
              <CardActionArea onClick={() => navigate(`/activities/${activity.id}`)}>
                <CardContent>
                  {/* Header */}
                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                    mb={2}
                  >
                    <Chip
                      icon={<FitnessCenterIcon />}
                      label={activity.type}
                      color="primary"
                      variant="outlined"
                      sx={{ fontWeight: "bold" }}
                    />
                    <Stack direction="row" alignItems="center" spacing={0.5}>
                      <EventIcon color="action" fontSize="small" />
                      <Typography variant="caption" color="text.secondary">
                        {formatDate(activity.createdAt)}
                      </Typography>
                    </Stack>
                  </Stack>

                  <Divider sx={{ my: 1.5 }} />

                  {/* Core Stats */}
                  <Grid container spacing={2} sx={{ mb: 2 }}>
                    <Grid size={6}>
                      <Box display="flex" alignItems="center" gap={1}>
                        <AccessTimeIcon color="info" />
                        <Box>
                          <Typography variant="body2" color="text.secondary">
                            Duration
                          </Typography>
                          <Typography variant="h6" fontWeight="bold">
                            {activity.duration}{" "}
                            <span style={{ fontSize: "0.7em" }}>min</span>
                          </Typography>
                        </Box>
                      </Box>
                    </Grid>

                    <Grid size={6}>
                      <Box display="flex" alignItems="center" gap={1}>
                        <LocalFireDepartmentIcon color="error" />
                        <Box>
                          <Typography variant="body2" color="text.secondary">
                            Calories
                          </Typography>
                          <Typography variant="h6" fontWeight="bold">
                            {activity.caloriesBurned}{" "}
                            <span style={{ fontSize: "0.7em" }}>cal</span>
                          </Typography>
                        </Box>
                      </Box>
                    </Grid>
                  </Grid>

                  {/* Additional Metrics */}
                  {activity.additionalMetrics &&
                    Object.keys(activity.additionalMetrics).length > 0 && (
                      <Box
                        sx={{
                          bgcolor: "grey.50",
                          p: 1.5,
                          borderRadius: 2,
                        }}
                      >
                        <Typography
                          variant="subtitle2"
                          gutterBottom
                          sx={{
                            fontSize: "0.75rem",
                            textTransform: "uppercase",
                            color: "text.secondary",
                          }}
                        >
                          Metrics
                        </Typography>

                        <Grid container spacing={1}>
                          {Object.entries(activity.additionalMetrics).map(
                            ([key, value]) => (
                              <Grid size={6} key={key}>
                                <Typography
                                  variant="body2"
                                  sx={{ textTransform: "capitalize" }}
                                >
                                  <strong>{key}:</strong> {value}
                                </Typography>
                              </Grid>
                            )
                          )}
                        </Grid>
                      </Box>
                    )}
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>

  )
}

export default ActivityList