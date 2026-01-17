import React from 'react';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Chip,
  Checkbox,
  alpha,
} from '@mui/material';
import {
  AccessTime as AccessTimeIcon,
  CheckCircle as CheckCircleIcon,
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import { theme } from '../theme'; 
import { UpcomingTasksProps } from '../types/types';

export const StyledCard = styled(Card)(({ theme }) => ({
  borderRadius: 16,
  background: `linear-gradient(135deg, ${alpha(theme.palette.customColors.grey, 0.3)} 30%, ${alpha(theme.palette.customColors.brown, 0.2)} 100%)`,
  boxShadow: '0 6px 20px rgba(0, 0, 0, 0.1)',
  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: '0 12px 24px rgba(0, 0, 0, 0.15)',
  },
  '& .MuiCardContent-root': {
    paddingBottom: 16, 
    flexGrow: 1,    
  },
  '& .MuiCardContent-root:last-child': {
    paddingBottom: 16, 
  },
}));

export const PriorityChip = styled(Chip)<{ priority: 'low' | 'medium' | 'high' }>(({ theme, priority }) => {
  const colors = {
    low: theme.palette.customColors.green,
    medium: theme.palette.customColors.brown,
    high: theme.palette.customColors.red,
  };
  return {
    backgroundColor: colors[priority],
    color: 'white',
    fontWeight: 600,
    borderRadius: 12,
    fontSize: '0.75rem',
  };
});

const formatDate = (date: Date) => {
  return date.toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
};

const getDaysRemaining = (finishAt: Date) => {
  const now = new Date();
  const diffTime = finishAt.getTime() - now.getTime();
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
};

const getPriorityLabel = (priority: 'low' | 'medium' | 'high') => {
  const labels = {
    low: 'Low',
    medium: 'Medium',
    high: 'High',
  };
  return labels[priority];
};

const getUrgencyColor = (days: number) => {
  if (days <= 0) return theme.palette.customColors.red;
  if (days <= 1) return theme.palette.customColors.red;
  if (days <= 3) return theme.palette.customColors.brown;
  return theme.palette.customColors.green;
};

const UpcomingTasks: React.FC<UpcomingTasksProps> = ({
  todos,
  onToggleComplete,
  title = 'The most pressing tasks',
  maxTasks = 3,
}) => {
  if (todos.length === 0) {
    return null;
  }

  const displayedTodos = todos.slice(0, maxTasks);

  return (
    <Box sx={{ mb: 6, borderBottom: `1px solid ${alpha(theme.palette.customColors.dark, 0.1)}` }}>
      {/* Header */}
      <Typography
        variant="h5"
        sx={{
          color: theme.palette.customColors.dark,
          mb: 3,
          display: 'flex',
          alignItems: 'center',
          gap: 1,
          fontWeight: 600,
        }}
      >
        <AccessTimeIcon />
        {title}
      </Typography>
      
      {/* Tasks list */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        {displayedTodos.map((todo) => {
          const daysRemaining = getDaysRemaining(todo.finishAt);
          const isOverdue = daysRemaining < 0;
          
          return (
            <Grid key={todo.id}>
              <StyledCard>
                <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                  {/* Priority and Urgency */}
                  <Box sx={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'flex-start', 
                    mb: 2 
                  }}>
                    <PriorityChip
                      label={getPriorityLabel(todo.priority)}
                      priority={todo.priority}
                      size="small"
                    />
                    <Chip
                      label={`${isOverdue ? 'Overdue' : ''} ${Math.abs(daysRemaining)} d.`}
                      size="small"
                      sx={{
                        backgroundColor: getUrgencyColor(daysRemaining),
                        color: theme.palette.customColors.grey,
                        fontWeight: 700,
                        fontSize: '0.75rem',
                        border: isOverdue ? `2px solid ${theme.palette.customColors.red}` : 'none',
                      }}
                    />
                  </Box>
                  
                  {/* Task description */}
                  <Typography
                    variant="h6"
                    sx={{
                      color: theme.palette.customColors.dark,
                      mb: 2,
                      fontWeight: 600,
                    }}
                  >
                    {todo.task}
                  </Typography>
                  
                  {/* Date and checkbox */}
                  <Box sx={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center',
                    pt: 2,
                    borderTop: `1px solid ${alpha(theme.palette.customColors.dark, 0.1)}`,
                    gap: 3
                  }}>
                    <Box>
                      <Typography
                        variant="caption"
                        sx={{
                          color: theme.palette.customColors.dark,
                          display: 'block',
                          fontWeight: 600,
                        }}
                      >
                        Till: {formatDate(todo.finishAt)}
                      </Typography>
                    </Box>
                    <Checkbox
                      checked={todo.completed}
                      onChange={() => onToggleComplete(todo.id)}
                      icon={<CheckCircleIcon sx={{ 
                        color: alpha(theme.palette.customColors.dark, 0.3),
                        fontSize: '1.5rem'
                      }} />}
                      checkedIcon={<CheckCircleIcon sx={{ 
                        color: theme.palette.customColors.green,
                        fontSize: '1.5rem'
                      }} />}
                      sx={{
                        padding: 0,
                        '& .MuiSvgIcon-root': {
                          fontSize: '1.8rem'
                        }
                      }}
                    />
                  </Box>
                </CardContent>
              </StyledCard>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
};

export default UpcomingTasks;

