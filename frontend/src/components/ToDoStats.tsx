import React from 'react';
import { Box, Grid, Paper, Typography, alpha } from '@mui/material';
import { theme } from '../theme';
import { TodoStatsProps } from '../types/types';

const TodoStats: React.FC<TodoStatsProps> = ({ todos, upcomingTodosCount }) => {
  const totalTasks = todos.filter(t => !t.archived).length;
  const completedTasks = todos.filter(t => t.completed && !t.archived).length;
  const highPriorityTasks = todos.filter(t => t.priority === 'high' && !t.archived).length;

  return (
    <Box sx={{ mt: 3, pt: 4, borderTop: `1px solid ${alpha(theme.palette.customColors.dark, 0.1)}` }}>
      <Grid container spacing={3}>
        <Grid>
          <Paper
            sx={{
              p: 3,
              borderRadius: 12,
              backgroundColor: alpha(theme.palette.customColors.green, 0.2),
              textAlign: 'center',
            }}
          >
            <Typography variant="h4" sx={{ color: theme.palette.customColors.dark, fontWeight: 700 }}>
              {totalTasks}
            </Typography>
            <Typography sx={{ color: theme.palette.customColors.brown }}>
              Total tasks
            </Typography>
          </Paper>
        </Grid>
        <Grid>
          <Paper
            sx={{
              p: 3,
              borderRadius: 12,
              backgroundColor: alpha(theme.palette.customColors.pink, 0.2),
              textAlign: 'center',
            }}
          >
            <Typography variant="h4" sx={{ color: theme.palette.customColors.dark, fontWeight: 700 }}>
              {completedTasks}
            </Typography>
            <Typography sx={{ color: theme.palette.customColors.brown }}>
              Completed
            </Typography>
          </Paper>
        </Grid>
        <Grid>
          <Paper
            sx={{
              p: 3,
              borderRadius: 12,
              backgroundColor: alpha(theme.palette.customColors.brown, 0.2),
              textAlign: 'center',
            }}
          >
            <Typography variant="h4" sx={{ color: theme.palette.customColors.dark, fontWeight: 700 }}>
              {highPriorityTasks}
            </Typography>
            <Typography sx={{ color: theme.palette.customColors.dark }}>
              High priority
            </Typography>
          </Paper>
        </Grid>
        <Grid>
          <Paper
            sx={{
              p: 3,
              borderRadius: 12,
              backgroundColor: alpha(theme.palette.customColors.red, 0.2),
              textAlign: 'center',
            }}
          >
            <Typography variant="h4" sx={{ color: theme.palette.customColors.dark, fontWeight: 700 }}>
              {upcomingTodosCount}
            </Typography>
            <Typography sx={{ color: theme.palette.customColors.dark }}>
              Urgent tasks
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default TodoStats;