import axios from 'axios';
import ws from './socket-connection';

//import { configDotenv } from 'dotenv';

//configDotenv();

export const getRobotsApi = async (page, limit) => {
  const response = await axios.get(`http://localhost:8080/api/robots?page=${page}&limit=${limit}`);

  if(response.status !== 200){
    console.error("Error getting robots! Server is Down!");
    throw new Error("Error getting robots", response.data.message);
  }

  return response.data;
};

export const getRobotApi = async (id) => {
  const response = await axios.get(`http://localhost:8080/api/robots/${id}`);

  if(response.status !== 200){
    throw new Error("Error getting robot: ", response.data.message);
  }
  
  return response.data;
};

export const createRobotApi = async (newRobot) => {
  const response = await axios.post(`http://localhost:8080/api/robots`, newRobot);

  if(response.status !== 201){
    throw new Error("Error creating robot: ", response.data.message);
  }

  return response.data;
};

export const updateRobotApi = async (id, updatedRobot) => {
  const response = await axios.patch(`http://localhost:8080/api/robots/${id}`, updatedRobot);

  if(response.status !== 200){
    throw new Error("Error updating robot: ", response.data.message);
  }

  return response.data;
};

export const deleteRobotApi = async (id) => {
  const response = await axios.delete(`http://localhost:8080/api/robots/${id}`);

  if(response.status !== 204){
    throw new Error("Error deleting robot: ", response.data.message);
  }

  return response.data;
};