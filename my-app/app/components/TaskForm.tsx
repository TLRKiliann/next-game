"use client";

import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createTask } from '../_services/api';
import useTaskStore from '../_store/useTaskStore';

const TaskForm = () => {
  const [taskName, setTaskName] = useState('');
  const queryClient = useQueryClient();
  const { addTask } = useTaskStore();

  const createTaskMutation = useMutation(createTask, {
    onSuccess: (data: {data: any}) => {
      addTask(data.data);
      queryClient.invalidateQueries(['tasks']);
    },
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    createTaskMutation.mutate({ name: taskName });
    setTaskName('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={taskName}
        onChange={(e) => setTaskName(e.target.value)}
        placeholder="Enter task name"
      />
      <button type="submit">Add Task</button>
    </form>
  );
};

export default TaskForm;
