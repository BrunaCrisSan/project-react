import { useState } from 'react';
import Header from './Header';
import TaskColumn from './components/TaskColumn/TaskColumn';
import AddTaskForm from './components/AddTaskForm/AddTaskForm';
import { useDragAndDrop } from './hooks/useDragAndDrop';
import './App.css';

function App() {
  const initialTasks = [
    {
      id: 1,
      title: 'Criar layout inicial',
      description: 'Desenvolver wireframes e protótipo do sistema',
      assignee: 'Bruna',
      priority: 'high',
      status: 'completed',
    },
    {
      id: 2,
      title: 'Implementar componente Header',
      description: 'Criar header responsivo com navegação',
      assignee: 'Bruna',
      priority: 'high',
      status: 'completed',
    },
    {
      id: 3,
      title: 'Sistema de drag and drop',
      description:
        'Implementar funcionalidade de arrastar tarefas entre colunas',
      assignee: 'Carlos',
      priority: 'medium',
      status: 'in_progress',
    },
    {
      id: 4,
      title: 'API de autenticação',
      description: 'Integrar com serviço de autenticação JWT',
      assignee: 'Ana',
      priority: 'high',
      status: 'pending',
    },
    {
      id: 5,
      title: 'Testes unitários',
      description: 'Criar suite de testes para componentes críticos',
      assignee: 'Pedro',
      priority: 'low',
      status: 'pending',
    },
  ];

  const { tasks, setTasks, moveTask } = useDragAndDrop(initialTasks);

  const handleTaskStatusChange = (id, newStatus) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, status: newStatus } : task,
      ),
    );
  };

  const handleAddTask = (newTask) => {
    setTasks((prev) => [...prev, newTask]);
  };

  return (
    <>
      <Header />

      <div className="main-content">
        <AddTaskForm onAddTask={handleAddTask} />

        <div className="columns">
          <TaskColumn
            title="Pendentes"
            status="pending"
            tasks={tasks}
            onTaskStatusChange={handleTaskStatusChange}
            moveTask={moveTask}
          />

          <TaskColumn
            title="Em Andamento"
            status="in_progress"
            tasks={tasks}
            onTaskStatusChange={handleTaskStatusChange}
            moveTask={moveTask}
          />

          <TaskColumn
            title="Concluídas"
            status="completed"
            tasks={tasks}
            onTaskStatusChange={handleTaskStatusChange}
            moveTask={moveTask}
          />
        </div>
      </div>
    </>
  );
}

export default App;
