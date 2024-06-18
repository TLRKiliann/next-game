"use client";

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchTasks, deleteTask } from '@/app/_services/api';
import useTaskStore from '@/app/_store/useTaskStore';

const TaskList = () => {
  const queryClient = useQueryClient();
  const { data: tasks, isLoading } = useQuery(['tasks'], fetchTasks, {
    onSuccess: (data) => {
      setTasks(data.data);
    },
  });
  const removeTaskMutation = useMutation(deleteTask, {
    onSuccess: () => {
      queryClient.invalidateQueries(['tasks']);
    },
  });
  const { tasks: localTasks, setTasks } = useTaskStore();

  if (isLoading) return <div>Loading...</div>;

  return (
    <div>
      <h2>Task List</h2>
      <ul>
        {localTasks.map((task) => (
          <li key={task.id}>
            {task.name}
            <button onClick={() => removeTaskMutation.mutate(task.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
