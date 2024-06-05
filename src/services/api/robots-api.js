import axios from 'axios';
//import ws from './socket-connection';

//import { configDotenv } from 'dotenv';

//configDotenv();

export const getRobotsApi = async (user_id, page, limit) => {
  try{
    const response = await axios.get(`http://localhost:8080/api/robots?page=${page}&limit=${limit}&user_id=${user_id}`, {user_id: user_id});

    return response.data;
  } catch(error){
    throw new Error(error.response.data.message);
  }
};

export const getRobotApi = async (id) => {
  const response = await axios.get(`http://localhost:8080/api/robots/${id}`);

  if(response.status !== 200){
    throw new Error("Error getting robot: ", response.data.message);
  }
  
  return response.data;
};

export const createRobotApi = async (newRobot) => {
  try{
    const response = await axios.post(`http://localhost:8080/api/robots`, newRobot);

    return response.data;
  } catch(error){
    throw new Error(error.response.data.message);
  }
};

export const updateRobotApi = async (id, updatedRobot) => {
  try{
    const response = await axios.patch(`http://localhost:8080/api/robots/${id}`, updatedRobot);

    return response.data;
  } catch(error){
    throw new Error(error.response.data.message);
  }
};

export const deleteRobotApi = async (id) => {
  try{
    const response = await axios.delete(`http://localhost:8080/api/robots/${id}`);

    return response.data;
  } catch(error){
    throw new Error(error.response.data.message);
  }
};