import { useState } from 'react';
import Header from './Header';
import TaskColumn from './components/TaskColumn/TaskColumn';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([
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
  ]);

  const handleTaskStatusChange = (id, newStatus) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, status: newStatus } : task,
      ),
    );
  };

  return (
    <>
      <Header />

      <div className="columns">
        <TaskColumn
          title="Pendente"
          status="pending"
          tasks={tasks}
          onTaskStatusChange={handleTaskStatusChange}
        />

        <TaskColumn
          title="Em Andamento"
          status="in_progress"
          tasks={tasks}
          onTaskStatusChange={handleTaskStatusChange}
        />

        <TaskColumn
          title="Concluídas"
          status="completed"
          tasks={tasks}
          onTaskStatusChange={handleTaskStatusChange}
        />
      </div>
    </>
  );
}

export default App;
