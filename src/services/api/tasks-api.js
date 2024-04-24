import axios from 'axios';
//import { configDotenv } from 'dotenv';

//configDotenv();

export const getTasksApi = async (page, limit) => {
  const response = await axios.get(`http://localhost:8080/api/tasks?page=${page}&limit=${limit}`);

  if(response.status !== 200){
    throw new Error("Error getting tasks: ", response.data.message);
  }

  return response.data;
}

export const getTaskApi = async (id) => {
  const response = await axios.get(`http://localhost:8080/api/tasks/${id}`);

  if(response.status !== 200){
    throw new Error("Error getting task: ", response.data.message);
  }
  
  return response.data
}

export const getTasksByRobotApi = async (robotId, order, page, limit) => {
  const response = await axios.get(`http://localhost:8080/api/tasks/robot/${robotId}?order=${order}&page=${page}&limit=${limit}`);

  if(response.status !== 200){
    throw new Error("Error getting tasks: ", response.data.message);
  } 
  
  return response.data
  
}

export const createTaskApi = async (newTask) => {
  const reponse = await axios.post(`http://localhost:8080/api/tasks`, newTask);

  if(reponse.status !== 201){
    throw new Error("Error creating task: ", reponse.data.message);
  } 
  
  return reponse.data;
}

export const updateTaskApi = async (id, updatedTask) => {
  const response = await axios.patch(`http://localhost:8080/api/tasks/${id}`, updatedTask);

  if(response.status !== 200){
    throw new Error("Error updating task: ", response.data.message);
  } 
  
  return response.data;
}

export const deleteTaskApi = async (id) => {
  const response = await axios.delete(`http://localhost:8080/api/tasks/${id}`);

  if(response.status !== 204){
    throw new Error("Error deleting task: ", response.data.message);
  }
  
  return response.data;
}


// export const assignTask = async (taskId, robotId) => {
//   return await axios.patch(`/api/tasks/${taskId}/assign`, { robotId }).then(response => response.data);
// }

// export const unassignTask = async (taskId) => {
//   return await axios.patch(`/api/tasks/${taskId}/unassign`).then(response => response.data);
// }

// export const completeTask = async (taskId) => {
//   return await axios.patch(`/api/tasks/${taskId}/complete`).then(response => response.data);
// }

// export const uncompleteTask = async (taskId) => {
//   return await axios.patch(`/api/tasks/${taskId}/uncomplete`).then(response => response.data);
// }