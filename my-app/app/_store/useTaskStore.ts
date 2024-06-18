import { create } from 'zustand';

type Task = {
  id: number;
  task: string;
};

type States = {
  tasks: Task[];
};

type Actions = {
  addTask: (task: Task) => void;
  editTask: (id: number, updatedTask: Task) => void;
  removeTask: (id: number) => void;
};

const useTaskStore = create<States & Actions>((set) => ({
  tasks: [],
  addTask: (task) => set((state) => ({ tasks: [...state.tasks, task] })),
  editTask: (id, updatedTask) =>
    set((state) => ({
      tasks: state.tasks.map((task) =>
        task.id === id ? updatedTask : task
      ),
    })),
  removeTask: (id) =>
    set((state) => ({
      tasks: state.tasks.filter((task) => task.id !== id),
    })),
}));

export default useTaskStore;
