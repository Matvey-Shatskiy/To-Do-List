import React from 'react';
import { Box, keyframes } from '@mui/material';
import { theme } from '../theme';

const gradientAnimation = keyframes`
  0%, 100% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
`;

const AnimatedBackground: React.FC = () => {
  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: -1,
        overflow: 'hidden',
        background: `linear-gradient(-45deg, 
          ${theme.palette.customColors.green} 0%, 
          ${theme.palette.customColors.grey} 25%, 
          ${theme.palette.customColors.green} 50%, 
          ${theme.palette.customColors.grey} 75%, 
          ${theme.palette.customColors.green} 100%)`,
        backgroundSize: '400% 400%',
        animation: `${gradientAnimation} 15s ease infinite`,
      }}
    >
    </Box>
  );
};

export default AnimatedBackground;