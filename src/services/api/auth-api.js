import axios from 'axios';

export const loginApi = async (credentials) => {
  try{
    const response = await axios.post(`http://localhost:8080/api/auth/login`, credentials);

    return response.data;
  } catch(error){
    console.log(error.message);
    throw new Error(error.response.data.message);
  }
};

export const userAuthenticateApi = async () => {
  await axios.get('http://localhost:8080/api/auth/verify-jwt', {
    headers: {
      "x-access-token": localStorage.getItem('token')
  }}).then(response => response.data).catch(error => error.response.data.message);
}

export const registerApi = async (credentials) => {
  try{
    const response = await axios.post(`http://localhost:8080/api/auth/register`, credentials);

    return response.data;
  } catch(error){
    throw new Error(error.response.data.message);
  }
};

export const verifyEmailApi = async (token) => {
  try {
    const response = await axios.get(`http://localhost:5000/api/verify-email?token=${token}`);
    const data = response.data;
    if(data.status === "success"){
      return "Account verified! Redirecting to login page...";
    } else {
      return "Invalid token. Please sign up first.";
    }
  } catch (error) {
    console.error(error.response.data.message);
    throw new Error("Error verifying email: ", error.response.data.message);
  }
};