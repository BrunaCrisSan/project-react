import './TaskColumn.css';
import TaskCard from '../TaskCard/TaskCard';

const TaskColumn = ({ title, status, tasks = [], onTaskStatusChange }) => {
  const normalize = (s) => (s ? s.replace('_', '-').replace(/\s+/g, '-') : s);

  const getStatusIcon = (st) => {
    const s = normalize(st);
    switch (s) {
      case 'pending':
        return '⏳';
      case 'in-progress':
        return '🔄';
      case 'completed':
        return '✅';
      default:
        return '📋';
    }
  };

  // compara aceitando "in-progress" ou "in_progress"
  const columnTasks = tasks.filter((task) => {
    const taskStatus = normalize(task?.status);
    const columnStatus = normalize(status);
    return taskStatus === columnStatus;
  });

  return (
    <div className="task-column">
      <div className="column-header">
        <h3>
          {getStatusIcon(status)} {title}
        </h3>
        <span className="task-count">{columnTasks.length}</span>
      </div>

      <div className="column-content">
        {columnTasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            onStatusChange={onTaskStatusChange}
          />
        ))}

        {columnTasks.length === 0 && (
          <div className="empty-column">Nenhuma tarefa aqui</div>
        )}
      </div>
    </div>
  );
};

export default TaskColumn;
