import React, { useEffect, useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Checkbox,
  IconButton,
  Typography,
  Stack,
  alpha,
  TablePagination,
  Box,
} from '@mui/material';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Archive as ArchiveIcon,
  CheckCircle as CheckCircleIcon,
  Add as AddIcon,
  KeyboardArrowLeft,
  KeyboardArrowRight,
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import { theme } from '../theme';
import { Todo, TodoTableProps } from '../types/types';

export const StyledTableContainer = styled(TableContainer)(({ theme }) => ({
  borderRadius: 16,
  overflow: 'hidden',
  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08)',
  background: alpha(theme.palette.customColors.grey, 0.3),
}));

export const StyledTableCell = styled(TableCell)(({ theme }) => ({
  borderBottom: `1px solid ${alpha(theme.palette.customColors.dark, 0.1)}`,
  alignItems: 'center',
  textAlign: 'center',
}));

export const StyledTableHeadCell = styled(TableCell)(({ theme }) => ({
  backgroundColor: theme.palette.customColors.dark,
  color: theme.palette.customColors.grey,
  fontWeight: 600,
  fontSize: '1rem',
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

const StyledPaginationBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '16px',
}));

const PaginationButton = styled(IconButton)(({ theme }) => ({
  backgroundColor: alpha(theme.palette.customColors.green, 0.2),
  color: theme.palette.customColors.dark,
  margin: '0 8px',
  '&:hover': {
    backgroundColor: theme.palette.customColors.green,
  },
  '&.Mui-disabled': {
    backgroundColor: alpha(theme.palette.customColors.grey, 0.5),
    color: alpha(theme.palette.customColors.dark, 0.3),
  },
}));

const PageNumberButton = styled(IconButton)(({ theme }) => ({
  backgroundColor: 'transparent',
  color: theme.palette.customColors.dark,
  minWidth: '32px',
  height: '40px',
  width: '40px',
  margin: '0 4px',
  fontWeight: 600,
  '&.Mui-selected': {
    backgroundColor: theme.palette.customColors.green,
    color: theme.palette.customColors.dark,
  },
  '&:hover': {
    backgroundColor: alpha(theme.palette.customColors.green, 0.3),
  },
  fontSize: '1rem',
}));

const TodoTable: React.FC<TodoTableProps> = ({
  todos,
  onToggleComplete,
  onEdit,
  onDelete,
  onArchive,
  isArchive = false,
  onAddTask,
  rowsPerPageOptions = [5, 10, 25],
  defaultRowsPerPage = 5,
}) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(defaultRowsPerPage);

  useEffect(() => {
    setPage(0);
  }, [isArchive]);

  useEffect(() => {
    setPage(0);
  }, [todos]);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const displayedTodos = todos.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  const totalPages = Math.ceil(todos.length / rowsPerPage);
  const hasPreviousPage = page > 0;
  const hasNextPage = page < totalPages - 1;

  const renderTableRow = (todo: Todo) => (
    <TableRow
      key={todo.id}
      sx={{
        backgroundColor: todo.completed ? alpha(theme.palette.customColors.green, 0.3) : 'inherit',
        opacity: todo.completed ? 0.7 : 1,
        alignItems: 'center',
      }}
    >
      {/* Status */}
      <StyledTableCell>
        {!isArchive && (
          <Checkbox
            checked={todo.completed}
            onChange={() => onToggleComplete(todo.id)}
            icon={<CheckCircleIcon sx={{ color: alpha(theme.palette.customColors.dark, 0.3) }} />}
            checkedIcon={<CheckCircleIcon sx={{ color: theme.palette.customColors.green }} />}
          />
        )}
        {isArchive && (
          <Chip
            label={todo.completed ? 'Completed' : 'Not completed'}
            size="small"
            sx={{
              backgroundColor: todo.completed
                ? alpha(theme.palette.customColors.green, 0.3)
                : alpha(theme.palette.customColors.red, 0.3),
              color: theme.palette.customColors.dark,
            }}
          />
        )}
      </StyledTableCell>

      {/* Task */}
      <StyledTableCell>
        <Typography
          sx={{
            textDecoration: todo.completed ? 'line-through' : 'none',
            color: todo.completed
              ? alpha(theme.palette.customColors.dark, 0.5)
              : theme.palette.customColors.dark,
            fontWeight: todo.priority === 'high' ? 600 : 400,
          }}
        >
          {todo.task}
        </Typography>
      </StyledTableCell>

      {/* Priority */}
      <StyledTableCell>
        <PriorityChip
          label={getPriorityLabel(todo.priority)}
          priority={todo.priority}
          size="small"
        />
      </StyledTableCell>

      {/* Finish date */}
      <StyledTableCell>
        <Typography sx={{ color: theme.palette.customColors.dark, fontWeight: 500 }}>
          {formatDate(todo.finishAt)}
        </Typography>
      </StyledTableCell>

      {/* Days left */}
      <StyledTableCell>
        <Chip
          label={`${getDaysRemaining(todo.finishAt)} d.`}
          size="small"
          sx={{
            backgroundColor: getDaysRemaining(todo.finishAt) <= 1
              ? theme.palette.customColors.red
              : getDaysRemaining(todo.finishAt) <= 3
              ? theme.palette.customColors.brown
              : theme.palette.customColors.green,
            color: theme.palette.customColors.grey,
            fontWeight: 600,
          }}
        />
      </StyledTableCell>

      {/* Actions */}
      {!isArchive && (
        <StyledTableCell align="center">
          <Stack direction="row" spacing={1} justifyContent="center">
            <IconButton
              size="small"
              onClick={() => onEdit(todo)}
              sx={{
                backgroundColor: alpha(theme.palette.customColors.brown, 0.1),
                '&:hover': { backgroundColor: theme.palette.customColors.brown },
              }}
            >
              <EditIcon fontSize="small" sx={{ color: theme.palette.customColors.dark }} />
            </IconButton>
            <IconButton
              size="small"
              onClick={() => onDelete(todo.id)}
              sx={{
                backgroundColor: alpha(theme.palette.customColors.red, 0.1),
                '&:hover': { backgroundColor: theme.palette.customColors.red },
              }}
            >
              <DeleteIcon fontSize="small" sx={{ color: theme.palette.customColors.dark }} />
            </IconButton>
            <IconButton
              size="small"
              onClick={() => onArchive(todo.id)}
              sx={{
                backgroundColor: alpha(theme.palette.customColors.pink, 0.1),
                '&:hover': { backgroundColor: theme.palette.customColors.pink },
              }}
            >
              <ArchiveIcon fontSize="small" sx={{ color: theme.palette.customColors.dark }} />
            </IconButton>
          </Stack>
        </StyledTableCell>
      )}
    </TableRow>
  );

  const renderTableHeaders = () => {
    const headers = isArchive
      ? ['Status', 'Task', 'Priority', 'Finish date', 'Days left']
      : ['Status', 'Task', 'Priority', 'Finish date', 'Days left', ''];
  
    return (
      <TableHead>
        <TableRow>
          {headers.map((header, index) => (
            <StyledTableHeadCell
              key={header}
              align='center'
            >
              {!isArchive && index === headers.length - 1 && onAddTask ? (
                <IconButton
                  onClick={onAddTask}
                  sx={{
                    backgroundColor: theme.palette.customColors.green,
                    color: theme.palette.customColors.dark,
                    '&:hover': {
                      backgroundColor: theme.palette.customColors.dark,
                      color: theme.palette.customColors.green,
                    },
                  }}
                >
                  <AddIcon />
                </IconButton>
              ) : (
                header
              )}
            </StyledTableHeadCell>
          ))}
        </TableRow>
      </TableHead>
    );
  };

  const renderCustomPagination = () => {
    const pageNumbers = [];
    const maxVisiblePages = 5;
    
    let startPage = Math.max(0, page - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages - 1, startPage + maxVisiblePages - 1);
    
    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(0, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }

    return (
      <StyledPaginationBox>
        <PaginationButton
          onClick={() => handleChangePage(null, page - 1)}
          disabled={!hasPreviousPage}
          aria-label="previous page"
        >
          <KeyboardArrowLeft />
        </PaginationButton>
        
        {startPage > 0 && (
          <>
            <PageNumberButton
              onClick={() => handleChangePage(null, 0)}
              className={page === 0 ? 'Mui-selected' : ''}
            >
              1
            </PageNumberButton>
            {startPage > 1 && <Typography sx={{ mx: 1, color: theme.palette.customColors.dark }}>...</Typography>}
          </>
        )}
        
        {pageNumbers.map((pageNumber) => (
          <PageNumberButton
            key={pageNumber}
            onClick={() => handleChangePage(null, pageNumber)}
            className={page === pageNumber ? 'Mui-selected' : ''}
          >
            {pageNumber + 1}
          </PageNumberButton>
        ))}
        
        {endPage < totalPages - 1 && (
          <>
            {endPage < totalPages - 2 && <Typography sx={{ mx: 1, color: theme.palette.customColors.dark }}>...</Typography>}
            <PageNumberButton
              onClick={() => handleChangePage(null, totalPages - 1)}
              className={page === totalPages - 1 ? 'Mui-selected' : ''}
            >
              {totalPages}
            </PageNumberButton>
          </>
        )}
        
        <PaginationButton
          onClick={() => handleChangePage(null, page + 1)}
          disabled={!hasNextPage}
          aria-label="next page"
        >
          <KeyboardArrowRight />
        </PaginationButton>
        
        <Typography sx={{ ml: 3, color: theme.palette.customColors.dark, fontWeight: 600 }}>
          {todos.length > 0 ? (
            `Showing ${page * rowsPerPage + 1}-${Math.min((page + 1) * rowsPerPage, todos.length)} of ${todos.length} tasks`
          ) : (
            'No tasks to display'
          )}
        </Typography>
      </StyledPaginationBox>
    );
  };

  return (
    <Box>
      <StyledTableContainer>
        <Table>
          {renderTableHeaders()}
          <TableBody>
            {displayedTodos.map(renderTableRow)}
          </TableBody>
        </Table>
      </StyledTableContainer>
      
      {todos.length > 0 && (
        <>
          {renderCustomPagination()}
        </>
      )}
    </Box>
  );
};

export default TodoTable;