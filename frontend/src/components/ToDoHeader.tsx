import React from 'react';
import { alpha, Box, Typography } from '@mui/material';
import { theme } from '../theme';
import { TodoHeaderProps } from '../types/types';

const TodoHeader: React.FC<TodoHeaderProps> = ({ 
  title = 'TO DO LIST', 
  subtitle = 'Organize your tasks with ease.' 
}) => {
  return (
    <Box sx={{ mb: 6, borderBottom: `1px solid ${alpha(theme.palette.customColors.dark, 0.1)}` }}>
      <Typography
        variant="h1"
        sx={{
          color: theme.palette.customColors.dark,
          fontWeight: 900,
          fontSize: { xs: '2.5rem', md: '3.5rem' },
          mb: 2,
          background: `linear-gradient(45deg, ${theme.palette.customColors.dark} 10%, ${theme.palette.customColors.green} 90%)`,
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
        }}
      >
        {title}
      </Typography>
      <Typography
        variant="h6"
        sx={{
          color: theme.palette.customColors.brown,
          fontWeight: 400,
        }}
        mb={2}
      >
        {subtitle}
      </Typography>
    </Box>
  );
};

export default TodoHeader;