import axios from 'axios';
import React, { useEffect } from 'react';
import { useTaskStore } from '../state/task-store';

function Tasks({ robotId }) {
  const { tasks, createTask, updateTask, deleteTask } = useTaskStore();

  useEffect(() => {
    axios.get(`http://localhost:8080/api/tasks?robotId=${robotId}`)
      .then(response => {
        // Add each task to the store
        response.data.forEach(task => createTask(task));
      })
      .catch(err => console.error(err));
  }, [robotId, createTask]);

  const onCreateTask = async (task) => {
    // Create task in the backend and in the store
    // TODO Implement this function
  };

  const onUpdateTask = async (taskId, updatedTask) => {
    // Update task in the backend and in the store
    // TODO Implement this function
  };

  const onDeleteTask = async (taskId) => {
    // Delete task in the backend and in the store
    // TODO Implement this function
  };

  // Render tasks and form...
  return(
    <>
      <h1>Tasks for Robot {robotId}</h1>
      {tasks.map(task => (
        <div key={task.id}>
          <h2>{task.name}</h2>
          <p>{task.description}</p>
          <button onClick={() => onUpdateTask(task.id, { ...task, completed: !task.completed })}>
            {task.completed ? 'Reopen' : 'Complete'}
          </button>
          <button onClick={() => onDeleteTask(task.id)}>Delete</button>
        </div>
      ))}
      <form onSubmit={onCreateTask}>
        <input type="text" placeholder="Task name" />
        <input type="text" placeholder="Task description" />
        <button type="submit">Create Task</button>
      </form>
    </>
  );
}

export default Tasks;