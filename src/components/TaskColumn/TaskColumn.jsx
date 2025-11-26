import TaskCard from '../TaskCard/TaskCard';
import './TaskColumn.css';
import { useDrop } from 'react-dnd';

const TaskColumn = ({ title, status, tasks, onTaskStatusChange, moveTask }) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'task',
    drop: (item) => {
      if (item.status !== status) {
        moveTask(item.id, status);
      }
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  const getStatusIcon = (status) => {
    switch (status) {
      case 'pending':
        return '⏳';
      case 'in_progress':
        return '🔄';
      case 'completed':
        return '✅';
      default:
        return '📋';
    }
  };

  const columnTasks = tasks.filter((task) => task.status === status);

  return (
    <div ref={drop} className={`task-column ${isOver ? 'drag-over' : ''}`}>
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
          <div className="empty-column">
            {isOver ? 'Solte aqui!' : 'Arraste tarefas aqui'}
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskColumn;
