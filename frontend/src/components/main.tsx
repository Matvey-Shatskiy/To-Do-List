import React, { useState, useEffect } from 'react';
import {
  Container,
  Box,
  Typography,
  alpha,
  Paper,
} from '@mui/material';
import { theme } from '../theme';
import TodoTable from './Table';
import UpcomingTasks from './UpcomingTasks';
import TodoDialog from './TodoDialog';
import TodoHeader from './ToDoHeader';
import AnimatedBackground from './AnimatedBackground';
import TodoTabs from './ToDoTabs';
import {
  fetchTodos,
  createTodo,
  updateTodo,
  deleteTodo,
  toggleTodoComplete,
  archiveTodo,
} from '../api/api';
import { Todo } from '../types/types';

const TodoList: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [editingTodo, setEditingTodo] = useState<Todo | null>(null);
  const [newTask, setNewTask] = useState('');
  const [priority, setPriority] = useState<'low' | 'medium' | 'high'>('medium');
  const [finishAt, setFinishAt] = useState('');
  const [activeTab, setActiveTab] = useState<'active' | 'archived'>('active');

  useEffect(() => {
    loadTodos();
  }, []);

  const loadTodos = async () => {
    try {
      const fetchedTodos = await fetchTodos();
      setTodos(fetchedTodos);
    } catch (error) {
      console.error('Error loading todos:', error);
    }
  };

  const getUpcomingTodos = () => {
    const now = new Date();
    const active = todos.filter(todo => !todo.archived);
    const upcoming = active
      .filter(todo => !todo.completed && todo.finishAt > now)
      .sort((a, b) => a.finishAt.getTime() - b.finishAt.getTime())
      .slice(0, 3);
    
    return upcoming;
  };

  const handleToggleComplete = async (id: number) => {
    try {
      const todo = todos.find(t => t.id === id);
      if (!todo) return;

      const updatedTodo = await toggleTodoComplete(id, !todo.completed);
      setTodos(todos.map(t => t.id === id ? updatedTodo : t));
    } catch (error) {
      console.error('Error toggling todo:', error);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteTodo(id);
      setTodos(todos.filter(todo => todo.id !== id));
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  const handleArchive = async (id: number) => {
    try {
      const archivedTodo = await archiveTodo(id);
      setTodos(todos.map(todo => todo.id === id ? archivedTodo : todo));
    } catch (error) {
      console.error('Error archiving todo:', error);
    }
  };

  const handleEdit = (todo: Todo) => {
    setEditingTodo(todo);
    setNewTask(todo.task);
    setPriority(todo.priority);
    setFinishAt(todo.finishAt.toISOString().split('T')[0]);
    setOpenDialog(true);
  };

  const handleAddOrUpdateTodo = async () => {
    try {
      if (editingTodo) {
        const todoData = {
          task: newTask,
          priority,
          finishAt: new Date(finishAt).toISOString(),
        };
        const updatedTodo = await updateTodo(editingTodo.id, todoData);
        setTodos(todos.map(todo => todo.id === editingTodo.id ? updatedTodo : todo));
      } else {
        const todoData = {
          task: newTask,
          priority,
          createdAt: new Date().toISOString(),
          finishAt: new Date(finishAt).toISOString(),
        };
        const newTodo = await createTodo(todoData);
        setTodos([...todos, newTodo]);
      }
      
      setNewTask('');
      setPriority('medium');
      setFinishAt('');
      setEditingTodo(null);
      setOpenDialog(false);
    } catch (error) {
      console.error('Error saving todo:', error);
    }
  };

  const handleAddTaskClick = () => {
    setEditingTodo(null);
    setNewTask('');
    setPriority('medium');
    setFinishAt('');
    setOpenDialog(true);
  };

  const handleTabChange = (tab: 'active' | 'archived') => {
    setActiveTab(tab);
  };

  const upcomingTodos = getUpcomingTodos();
  const activeTodos = todos.filter(todo => !todo.archived);
  const archivedTodos = todos.filter(todo => todo.archived);

  return (
    <Box sx={{ position: 'relative', minHeight: '100vh' }}>
      {/* Animated background */}
      <AnimatedBackground />
      
      <Box
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '10%',
          height: '100vh',
          background: `linear-gradient(to right, 
            ${alpha(theme.palette.customColors.pink, 0.6)} 0%, 
            ${alpha(theme.palette.customColors.pink, 0.4)} 50%, 
            transparent 100%)`,
          zIndex: 0,
        }}
      />
      
      <Box
        sx={{
          position: 'fixed',
          top: 0,
          right: 0,
          width: '10%',
          height: '100vh',
          background: `linear-gradient(to left, 
            ${alpha(theme.palette.customColors.pink, 0.6)} 0%, 
            ${alpha(theme.palette.customColors.pink, 0.4)} 50%, 
            transparent 100%)`,
          zIndex: 0,
        }}
      />

      {/* Main content */}
      <Container 
        maxWidth="lg" 
        sx={{ 
          py: 4,
          position: 'relative',
          zIndex: 1,
        }}
      >
        <Paper
          elevation={8}
          sx={{
            borderRadius: 4,
            backgroundColor: alpha(theme.palette.customColors.grey, 0.95),
            backdropFilter: 'blur(10px)',
            border: `1px solid ${alpha(theme.palette.customColors.dark, 0.1)}`,
            overflow: 'hidden',
            position: 'relative',
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: '4px',
              background: `linear-gradient(90deg, 
                ${theme.palette.customColors.green} 0%, 
                ${theme.palette.customColors.pink} 50%, 
                ${theme.palette.customColors.brown} 100%)`,
              animation: 'gradient 3s ease infinite',
              backgroundSize: '200% 200%',
            },
          }}
        >
          <Box sx={{ p: 4 }}>
            {/* Header */}
            <TodoHeader />

            {/* Upcoming tasks */}
            <UpcomingTasks
              todos={upcomingTodos}
              onToggleComplete={handleToggleComplete}
            />

            {/* Toggle tabs */}
            <TodoTabs
              activeTab={activeTab}
              onTabChange={handleTabChange}
              activeCount={activeTodos.length}
              archivedCount={archivedTodos.length}
            />

            {/* Active or archived tasks */}
            {activeTab === 'active' ? (
              <Box>                
                {activeTodos.length > 0 ? (
                  <TodoTable
                    todos={activeTodos}
                    onToggleComplete={handleToggleComplete}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                    onArchive={handleArchive}
                    onAddTask={handleAddTaskClick}
                  />
                ) : (
                  <Box sx={{ 
                    textAlign: 'center', 
                    py: 8,
                    backgroundColor: alpha(theme.palette.customColors.grey, 0.5),
                    borderRadius: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                    <Typography sx={{ 
                      color: alpha(theme.palette.customColors.dark, 0.5),
                      fontSize: '1.2rem',
                      mb: 2
                    }}>
                      No active tasks found
                    </Typography>
                    <Box sx={{
                        
                    }}>
                      <Typography 
                        onClick={handleAddTaskClick}
                        sx={{ 
                          color: alpha(theme.palette.customColors.brown, 0.7),
                          // mb: 3,
                          height: '30px',
                          width: '100%',
                          borderRadius: 8,
                          cursor: 'pointer',
                          display: 'flex',
                          px: 2,
                          flexDirection: 'column',
                          alignItems: 'center',
                          justifyContent: 'center',
                          '&:hover': {
                            backgroundColor: alpha(theme.palette.customColors.green, 0.3),
                            color: theme.palette.customColors.dark
                          },
                        }}>
                        Create your first task to get started!
                      </Typography>
                    </Box>
                  </Box>
                )}
              </Box>
            ) : (
              <Box>                
                {archivedTodos.length > 0 ? (
                  <TodoTable
                    todos={archivedTodos}
                    onToggleComplete={handleToggleComplete}
                    isArchive={true}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                    onArchive={handleArchive}
                  />
                ) : (
                  <Box sx={{ 
                    textAlign: 'center', 
                    py: 8,
                    backgroundColor: alpha(theme.palette.customColors.grey, 0.5),
                    borderRadius: 2,
                  }}>
                    <Typography sx={{ 
                      color: alpha(theme.palette.customColors.dark, 0.5),
                      fontSize: '1.2rem',
                      mb: 2
                    }}>
                      No archived tasks
                    </Typography>
                    <Typography sx={{ 
                      color: alpha(theme.palette.customColors.brown, 0.7),
                    }}>
                      Archived tasks will appear here
                    </Typography>
                  </Box>
                )}
              </Box>
            )}

            {/* Dialog for add or edit task */}
            <TodoDialog
              open={openDialog}
              onClose={() => setOpenDialog(false)}
              onSubmit={handleAddOrUpdateTodo}
              editingTodo={!!editingTodo}
              newTask={newTask}
              setNewTask={setNewTask}
              priority={priority}
              setPriority={setPriority}
              finishAt={finishAt}
              setFinishAt={setFinishAt}
            />

            {/* Stats */}
            {/* <TodoStats
              todos={todos}
              upcomingTodosCount={upcomingTodos.length}
            /> */}
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default TodoList;