const TASKS_STORAGE_KEY = 'techcorp_tasks';

export const taskService = {
  // Salvar tarefas no localStorage
  saveTasks: (tasks) => {
    try {
      localStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(tasks));
      return true;
    } catch (error) {
      console.error('Error saving tasks:', error);
      return false;
    }
  },

  // Carregar tarefas do localStorage
  loadTasks: () => {
    try {
      const tasks = localStorage.getItem(TASKS_STORAGE_KEY);
      return tasks ? JSON.parse(tasks) : null;
    } catch (error) {
      console.error('Error loading tasks:', error);
      return null;
    }
  },

  // Gerar ID único para novas tarefas
  generateId: () => {
    return Date.now() + Math.random().toString(36).substr(2, 9);
  },

  // Backup de dados iniciais caso não existam
  getInitialTasks: () => {
    return [
      {
        id: 1,
        title: 'Bem-vindo ao TechCorp Dashboard!',
        description:
          'Este é seu sistema de gerenciamento de tarefas. Arraste cards entre colunas para mudar o status.',
        assignee: 'Sistema',
        priority: 'high',
        status: 'completed',
        createdAt: new Date().toISOString(),
      },
      {
        id: 2,
        title: 'Adicione novas tarefas',
        description:
          'Use o botão "Nova Tarefa" para adicionar itens ao seu quadro.',
        assignee: 'Sistema',
        priority: 'medium',
        status: 'in_progress',
        createdAt: new Date().toISOString(),
      },
      {
        id: 3,
        title: 'Personalize prioridades',
        description: 'Use os badges de prioridade para organizar seu trabalho.',
        assignee: 'Sistema',
        priority: 'low',
        status: 'pending',
        createdAt: new Date().toISOString(),
      },
    ];
  },
};
