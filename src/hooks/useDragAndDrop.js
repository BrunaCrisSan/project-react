import { useState } from 'react';

export const useDragAndDrop = (initialTasks) => {
  const [tasks, setTasks] = useState(initialTasks);

  // Função para mover tarefa entre colunas
  const moveTask = (taskId, newStatus) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, status: newStatus } : task,
      ),
    );
  };

  return {
    tasks,
    setTasks,
    moveTask,
  };
};
