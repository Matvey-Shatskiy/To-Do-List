import { ApiError, Todo, TodoCreateRequest, TodoCreateResponse, TodoFromAPI, TodoUpdateRequest } from "../types/types";

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000/api/todos'; 

const transformTodo = (todo: TodoFromAPI): Todo => ({
  ...todo,
  createdAt: new Date(todo.createdAt),
  finishAt: new Date(todo.finishAt),
});

const handleResponse = async <T>(response: Response): Promise<T> => {
  if (!response.ok) {
    const error: ApiError = {
      message: `API Error: ${response.statusText}`,
      status: response.status,
    };
    throw error;
  }
  return response.json();
};

export const fetchTodos = async (): Promise<Todo[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}`);
    const apiTodos: TodoFromAPI[] = await handleResponse<TodoFromAPI[]>(response);
    return apiTodos.map(transformTodo);
  } catch (error) {
    console.error('Error fetching todos:', error);
    throw error;
  }
};

export const fetchTodoById = async (id: number): Promise<Todo> => {
  try {
    const response = await fetch(`${API_BASE_URL}/${id}`);
    const apiTodo: TodoFromAPI = await handleResponse<TodoFromAPI>(response);
    return transformTodo(apiTodo);
  } catch (error) {
    console.error(`Error fetching todo ${id}:`, error);
    throw error;
  }
};

export const createTodo = async (todo: TodoCreateRequest): Promise<Todo> => {
  try {
    const response = await fetch(`${API_BASE_URL}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(todo),
    });
    const createResponse: TodoCreateResponse = await handleResponse<TodoCreateResponse>(response);
    console.log('createResponse', createResponse)
    const createdTodo = await fetchTodoById(createResponse.inserted_task_id);
    return createdTodo;
  } catch (error) {
    console.error('Error creating todo:', error);
    throw error;
  }
};

export const updateTodo = async (id: number, todo: Partial<TodoUpdateRequest>): Promise<Todo> => {
  try {
    const response = await fetch(`${API_BASE_URL}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(todo),
    });
    const apiTodo: void = await handleResponse<void>(response);
    const updatedTodo = await fetchTodoById(id);
    return updatedTodo;
  } catch (error) {
    console.error(`Error updating todo ${id}:`, error);
    throw error;
  }
};

export const deleteTodo = async (id: number): Promise<void> => {
  try {
    const response = await fetch(`${API_BASE_URL}/${id}`, {
      method: 'DELETE',
    });
    
    if (!response.ok) {
      const error: ApiError = {
        message: `API Error: ${response.statusText}`,
        status: response.status,
      };
      throw error;
    }
  } catch (error) {
    console.error(`Error deleting todo ${id}:`, error);
    throw error;
  }
};

export const toggleTodoComplete = async (id: number, completed: boolean): Promise<Todo> => {
  try {
    const response = await fetch(`${API_BASE_URL}/${id}/complete`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ completed }),
    });
    const apiTodo: void = await handleResponse<void>(response);
    const updatedTodo = await fetchTodoById(id);
    return updatedTodo;
  } catch (error) {
    console.error(`Error toggling todo ${id}:`, error);
    throw error;
  }
};

export const archiveTodo = async (id: number): Promise<Todo> => {
  try {
    const response = await fetch(`${API_BASE_URL}/${id}/archive`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ archived: true }),
    });
    const apiTodo: void = await handleResponse<void>(response);
    const archivedTodo = await fetchTodoById(id);
    return archivedTodo;
  } catch (error) {
    console.error(`Error archiving todo ${id}:`, error);
    throw error;
  }
};

export const fetchActiveTodos = async (): Promise<Todo[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/todos?archived=false`);
    const apiTodos: TodoFromAPI[] = await handleResponse<TodoFromAPI[]>(response);
    return apiTodos.map(transformTodo);
  } catch (error) {
    console.error('Error fetching active todos:', error);
    throw error;
  }
};

export const fetchArchivedTodos = async (): Promise<Todo[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/todos?archived=true`);
    const apiTodos: TodoFromAPI[] = await handleResponse<TodoFromAPI[]>(response);
    return apiTodos.map(transformTodo);
  } catch (error) {
    console.error('Error fetching archived todos:', error);
    throw error;
  }
};

