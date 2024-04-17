import { create } from 'zustand';

export const useTaskStore = create()(
  (set, get) => ({
    tasks: [],
    createTask: (task) => {
      set({ tasks: [...get().tasks, task] });
    },
    updateTask: (updatedTask) => {
      set({tasks: get().tasks.map(task => task.id === updatedTask.id ? updatedTask : task)})
    },
    deleteTask: (taskId) => {
      set({tasks: get().tasks.filter(task => task.id !== taskId)})
    },
}));