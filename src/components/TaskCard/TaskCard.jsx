import { TASK_PRIORITY } from '../../types/task';

const TaskCard = ({ task, onStatusChange }) => {
  const getPriorityClass = (priority) => {
    switch (priority) {
      case 'high':
        return 'priority-high';
      case 'medium':
        return 'priority-medium';
      case 'low':
        return 'priority-low';
      default:
        return '';
    }
  };
};
const handleStatusChange = (newStatus) => {
  if (onStatusChange) {
    onStatusChange(task.id, newStatus);
  }
};
return (
  <div className={`task-card ${getPriorityClass(task.priority)}`}>
    <div className="task-header">
      <h3 className="task-title">{task.title}</h3>
      <span className={`priority-badge ${getPriorityClass(task.priority)}`}>
        {task.priority}
      </span>
    </div>
    <p className="task-description">{task.description}</p>
    <div className="task-footer">
      <span className="task-assignee">👤 {task.assignee}</span>
      <div className="task-actions">
        <select
          value={task.status}
          onChange={(e) => handleStatusChange(e.target.value)}
          className="status-select"
        >
          <option value="pending">⏳ Pendente</option>
          <option value="in-progress">🔄 Em Andamento</option>
          <option value="completed">✅ Concluída</option>
        </select>
      </div>
    </div>
  </div>
);
export default TaskCard;
