const TaskCard = ({task, onStatusChange}) => {
  const getPriorityClass = (priority) => {
    switch (priority){
      case 'high': return 'priority-high';
      case 'medium': return 'priority-medium';
      case 'low': return 'priority-low';
      default: return '';
    }
  }
}