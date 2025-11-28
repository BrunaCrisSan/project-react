import Header from './Header';
import TaskColumn from './components/TaskColumn/TaskColumn';
import AddTaskForm from './components/AddTaskForm/AddTaskForm';
import { useDragAndDrop } from './hooks/useDragAndDrop';
import './App.css';

function App() {
  const {
    tasks,
    isLoading,
    moveTask,
    addTask,
    updateTask,
    deleteTask,
    clearAllTasks,
  } = useDragAndDrop();

  const handleTaskStatusChange = (id, newStatus) => {
    updateTask(id, { status: newStatus });
  };

  const handleAddTask = (newTaskData) => {
    addTask(newTaskData);
  };

  if (isLoading) {
    return (
      <>
        <Header />
        <div className="main-content">
          <div className="loading-container">
            <div className="loading-spinner"></div>
            <p>Carregando suas tarefas...</p>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Header />

      <div className="main-content">
        <div className="app-header">
          <AddTaskForm onAddTask={handleAddTask} />

          <div className="app-actions">
            <button
              onClick={clearAllTasks}
              className="clear-btn"
              title="Limpar todas as tarefas"
            >
              🗑️ Limpar Tudo
            </button>

            <div className="tasks-stats">
              <span>Total: {tasks.length} tarefas</span>
              <span>•</span>
              <span>
                Concluídas:{' '}
                {tasks.filter((t) => t.status === 'completed').length}
              </span>
            </div>
          </div>
        </div>

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
