import './AddTaskForm.css';
import { useState } from 'react';

const AddTaskForm = ({ onAddTask }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    assignee: '',
    priority: 'medium',
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.title.trim()) return;

    const newTask = {
      id: Date.now(), // ID temporário
      title: formData.title,
      description: formData.description,
      assignee: formData.assignee || 'Não atribuído',
      priority: formData.priority,
      status: 'pending',
    };

    onAddTask(newTask);
    setFormData({
      title: '',
      description: '',
      assignee: '',
      priority: 'medium',
    });
    setIsOpen(false);
  };

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className="add-task-form">
      {!isOpen ? (
        <button className="add-task-btn" onClick={() => setIsOpen(true)}>
          ➕ Nova Tarefa
        </button>
      ) : (
        <form onSubmit={handleSubmit} className="task-form">
          <h3>Adicionar Nova Tarefa</h3>

          <input
            type="text"
            name="title"
            placeholder="Título da tarefa *"
            value={formData.title}
            onChange={handleChange}
            required
            className="form-input"
          />

          <textarea
            name="description"
            placeholder="Descrição"
            value={formData.description}
            onChange={handleChange}
            className="form-textarea"
          />

          <input
            type="text"
            name="assignee"
            placeholder="Responsável"
            value={formData.assignee}
            onChange={handleChange}
            className="form-input"
          />

          <select
            name="priority"
            value={formData.priority}
            onChange={handleChange}
            className="form-select"
          >
            <option value="low">Baixa Prioridade</option>
            <option value="medium">Média Prioridade</option>
            <option value="high">Alta Prioridade</option>
          </select>

          <div className="form-actions">
            <button type="submit" className="submit-btn">
              ➕ Adicionar Tarefa
            </button>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="cancel-btn"
            >
              ❌ Cancelar
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default AddTaskForm;
