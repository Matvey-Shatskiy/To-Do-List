import React from 'react';
import { Box, ToggleButton, ToggleButtonGroup, Typography, alpha } from '@mui/material';
import { theme } from '../theme';
import { TodoTabsProps } from '../types/types';

const TodoTabs: React.FC<TodoTabsProps> = ({
  activeTab,
  onTabChange,
  activeCount,
  archivedCount,
}) => {
  const handleTabChange = (
    event: React.MouseEvent<HTMLElement>,
    newTab: 'active' | 'archived' | null,
  ) => {
    if (newTab !== null) {
      onTabChange(newTab);
    }
  };

  return (
    <Box sx={{ mb: 3 }}>
      <ToggleButtonGroup
        value={activeTab}
        exclusive
        onChange={handleTabChange}
        aria-label="task type"
        sx={{
          width: '50%',
          '& .MuiToggleButtonGroup-grouped': {
            border: 0,
            borderRadius: 2,
            margin: '0',
            '&:not(:first-of-type)': {
              borderRadius: 2,
            },
            '&:first-of-type': {
              borderRadius: 2,
            },
          },
        }}
      >
        <ToggleButton
          value="active"
          sx={{
            flex: 1,
            py: 2,
            px: 3,
            color: activeTab === 'active' 
              ? theme.palette.customColors.dark 
              : alpha(theme.palette.customColors.dark, 0.6),
            '&:hover': {
              backgroundColor: activeTab === 'active'
                ? alpha(theme.palette.customColors.green, 0.3)
                : alpha(theme.palette.customColors.brown, 0.1),
            },
            '&.Mui-selected': {
              backgroundColor: alpha(theme.palette.customColors.green, 0.3), 
              color: theme.palette.customColors.dark,
              '&:hover': {
                backgroundColor: alpha(theme.palette.customColors.green, 0.3), 
              },
            },
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Typography sx={{ fontWeight: 600, color: theme.palette.customColors.dark }}>
              Active tasks
            </Typography>
            <Box
              sx={{
                backgroundColor: theme.palette.customColors.green,
                color: theme.palette.customColors.dark,
                borderRadius: '50%',
                width: 24,
                height: 24,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '0.75rem',
                fontWeight: 700,
                ml: 1,
              }}
            >
              {activeCount}
            </Box>
          </Box>
        </ToggleButton>
        
        <ToggleButton
          value="archived"
          sx={{
            flex: 1,
            py: 2,
            px: 3,
            mx: '10px !important',
            color: activeTab === 'archived' 
              ? theme.palette.customColors.dark 
              : alpha(theme.palette.customColors.dark, 0.6),
            '&:hover': {
              backgroundColor: activeTab === 'archived'
                ? alpha(theme.palette.customColors.green, 0.3)
                : alpha(theme.palette.customColors.brown, 0.1),
            },
            '&.Mui-selected': {
              backgroundColor: alpha(theme.palette.customColors.green, 0.3), 
              color: theme.palette.customColors.dark,
              '&:hover': {
                backgroundColor: alpha(theme.palette.customColors.green, 0.3), 
              },
            },
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Typography sx={{ fontWeight: 600 }}>
              Archived tasks
            </Typography>
            <Box
              sx={{
                backgroundColor: alpha(theme.palette.customColors.brown, 0.5),
                color: theme.palette.customColors.dark,
                borderRadius: '50%',
                width: 24,
                height: 24,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '0.75rem',
                fontWeight: 700,
                ml: 1,
              }}
            >
              {archivedCount}
            </Box>
          </Box>
        </ToggleButton>
      </ToggleButtonGroup>
    </Box>
  );
};

export default TodoTabs;