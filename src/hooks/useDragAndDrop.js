import { useState, useEffect, useCallback } from 'react';
import { taskService } from '../services/taskService';

export const useDragAndDrop = () => {
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Carregar tarefas do localStorage na inicialização
  useEffect(() => {
    const loadTasks = () => {
      setIsLoading(true);
      try {
        const savedTasks = taskService.loadTasks();

        if (savedTasks && savedTasks.length > 0) {
          setTasks(savedTasks);
        } else {
          // Dados iniciais se não houver nada salvo
          const initialTasks = taskService.getInitialTasks();
          setTasks(initialTasks);
          taskService.saveTasks(initialTasks);
        }
      } catch (error) {
        console.error('Error loading tasks:', error);
        const initialTasks = taskService.getInitialTasks();
        setTasks(initialTasks);
      } finally {
        setIsLoading(false);
      }
    };

    loadTasks();
  }, []);

  // Salvar tarefas sempre que houver mudanças
  useEffect(() => {
    if (!isLoading && tasks.length > 0) {
      taskService.saveTasks(tasks);
    }
  }, [tasks, isLoading]);

  // Mover tarefa entre colunas
  const moveTask = useCallback((taskId, newStatus) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId
          ? {
              ...task,
              status: newStatus,
              updatedAt: new Date().toISOString(),
            }
          : task,
      ),
    );
  }, []);

  // Adicionar nova tarefa
  const addTask = useCallback((newTaskData) => {
    const newTask = {
      ...newTaskData,
      id: taskService.generateId(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    setTasks((prevTasks) => [...prevTasks, newTask]);
    return newTask;
  }, []);

  // Atualizar tarefa existente
  const updateTask = useCallback((taskId, updates) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId
          ? {
              ...task,
              ...updates,
              updatedAt: new Date().toISOString(),
            }
          : task,
      ),
    );
  }, []);

  // Deletar tarefa
  const deleteTask = useCallback((taskId) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
  }, []);

  // Limpar todas as tarefas (reset)
  const clearAllTasks = useCallback(() => {
    const initialTasks = taskService.getInitialTasks();
    setTasks(initialTasks);
    taskService.saveTasks(initialTasks);
  }, []);

  return {
    tasks,
    setTasks,
    isLoading,
    moveTask,
    addTask,
    updateTask,
    deleteTask,
    clearAllTasks,
  };
};
