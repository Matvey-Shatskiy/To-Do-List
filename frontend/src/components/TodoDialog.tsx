import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Box,
  alpha,
} from '@mui/material';
import { theme } from '../theme';
import { TodoDialogProps } from '../types/types';

const TodoDialog: React.FC<TodoDialogProps> = ({
  open,
  onClose,
  onSubmit,
  editingTodo,
  newTask,
  setNewTask,
  priority,
  setPriority,
  finishAt,
  setFinishAt,
}) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          borderRadius: 5,
          backgroundColor: '#f7f3ef',
          minWidth: 400,
        },
      }}
    >
      <DialogTitle sx={{ color: theme.palette.customColors.dark, fontWeight: 600 }}>
        {editingTodo ? 'Edit task' : 'Add task'}
      </DialogTitle>
      <DialogContent>
        <Box sx={{ pt: 2, display: 'flex', flexDirection: 'column', gap: 3 }}>
          <TextField
            fullWidth
            label="Task"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            variant="outlined"
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: 12,
                backgroundColor: 'white',
              },
            }}
          />
          
          <FormControl fullWidth>
            <InputLabel>Priority</InputLabel>
            <Select
              value={priority}
              label="Priority"
              onChange={(e) => setPriority(e.target.value as 'low' | 'medium' | 'high')}
              sx={{ borderRadius: 12, outline: 'none' }}
            >
              <MenuItem value="low">Low</MenuItem>
              <MenuItem value="medium">Medium</MenuItem>
              <MenuItem value="high">High</MenuItem>
            </Select>
          </FormControl>
          
          <TextField
            fullWidth
            label="Finish date"
            type="date"
            value={finishAt}
            onChange={(e) => setFinishAt(e.target.value)}
            InputLabelProps={{ shrink: true }}
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: 12,
                backgroundColor: 'white',
              },
            }}
          />
        </Box>
      </DialogContent>
      <DialogActions sx={{ p: 3, pt: 0 }}>
        <Button
          onClick={onClose}
          sx={{
            color: theme.palette.customColors.brown,
            borderRadius: 12,
            px: 3,
          }}
        >
          Cancel
        </Button>
        <Button
          onClick={onSubmit}
          disabled={!newTask.trim() || !finishAt}
          sx={{
            backgroundColor: theme.palette.customColors.green,
            color: theme.palette.customColors.dark,
            borderRadius: 12,
            px: 4,
            '&:hover': {
              backgroundColor: theme.palette.customColors.dark,
              color: theme.palette.customColors.green,
            },
            '&:disabled': {
              backgroundColor: alpha(theme.palette.customColors.grey, 0.5),
              color: alpha(theme.palette.customColors.dark, 0.3),
            },
          }}
        >
          {editingTodo ? 'Save' : 'Add'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default TodoDialog;