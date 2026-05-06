import { useState, useEffect } from 'react';
import { Task, TaskStatus } from '../types';

const STORAGE_KEY = 'baith08_todo_tasks';

const getInitialTasks = (): Task[] => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) return JSON.parse(stored);
  } catch {}
  return [];
};

export const useTasks = () => {
  const [tasks, setTasks] = useState<Task[]>(getInitialTasks);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (values: Omit<Task, 'id' | 'createdAt'>) => {
    const newTask: Task = {
      ...values,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    };
    setTasks(prev => [newTask, ...prev]);
  };

  const updateTask = (updated: Task) => {
    setTasks(prev => prev.map(t => (t.id === updated.id ? updated : t)));
  };

  const deleteTask = (id: string) => {
    setTasks(prev => prev.filter(t => t.id !== id));
  };

  const moveTask = (id: string, status: TaskStatus) => {
    setTasks(prev => prev.map(t => (t.id === id ? { ...t, status } : t)));
  };

  return { tasks, addTask, updateTask, deleteTask, moveTask };
};