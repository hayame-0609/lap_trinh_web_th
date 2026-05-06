export type TaskStatus = 'todo' | 'doing' | 'done';
export type TaskPriority = 'high' | 'medium' | 'low';

export interface Task {
  id: string;
  name: string;
  description?: string;
  deadline?: string;
  priority: TaskPriority;
  status: TaskStatus;
  tags?: string[];
  createdAt: string;
};