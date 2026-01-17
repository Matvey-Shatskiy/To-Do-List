export interface TodoFromAPI {
  id: number;
  task: string;
  priority: 'low' | 'medium' | 'high';
  createdAt: string;
  finishAt: string;
  completed: boolean;
  archived: boolean;
}

export interface TodoCreateResponse {
    inserted_task_id: number;
}

export interface TodoResponse {
    status: string;
    message: string;
}

export interface Todo {
  id: number;
  task: string;
  priority: 'low' | 'medium' | 'high';
  createdAt: Date;
  finishAt: Date;
  completed: boolean;
  archived: boolean;
}

export interface TodoCreateRequest {
  task: string;
  priority: 'low' | 'medium' | 'high';
  createdAt: string;
  finishAt: string; 
}

export interface TodoUpdateRequest {
  task: string;
  priority: 'low' | 'medium' | 'high';
  finishAt: string; 
}

export interface ApiError {
  message: string;
  status: number;
}

export interface TodoTableProps {
  todos: Todo[];
  onToggleComplete: (id: number) => void;
  onEdit: (todo: Todo) => void;
  onDelete: (id: number) => void;
  onArchive: (id: number) => void;
  isArchive?: boolean;
  onAddTask?: () => void; 
  rowsPerPageOptions?: number[];
  defaultRowsPerPage?: number;
}

export interface TodoDialogProps {
  open: boolean;
  onClose: () => void;
  onSubmit: () => void;
  editingTodo: boolean;
  newTask: string;
  setNewTask: (task: string) => void;
  priority: 'low' | 'medium' | 'high';
  setPriority: (priority: 'low' | 'medium' | 'high') => void;
  finishAt: string;
  setFinishAt: (date: string) => void;
}

export interface TodoHeaderProps {
  title?: string;
  subtitle?: string;
}

export interface TodoStatsProps {
  todos: {
    id: number;
    priority: 'low' | 'medium' | 'high';
    completed: boolean;
    archived: boolean;
  }[];
  upcomingTodosCount: number;
}

export interface TodoTabsProps {
  activeTab: 'active' | 'archived';
  onTabChange: (tab: 'active' | 'archived') => void;
  activeCount: number;
  archivedCount: number;
}

export interface UpcomingTasksProps {
  todos: Todo[];
  onToggleComplete: (id: number) => void;
  title?: string;
  maxTasks?: number;
}
