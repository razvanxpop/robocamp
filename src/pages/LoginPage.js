import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import { loginApi, userAuthenticateApi } from '../services/api/auth-api';

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [goToRegister, setGoToRegister] = useState(false);
  const [goToHome, setGoToHome] = useState(false);
  const [status, setStatus] = useState(null);
  const [loginStatus, setLoginStatus] = useState(false);

  const onLogin = async () => {
    try{
      const response = await loginApi({username: username, password: password});
      if(!response.auth){
        setStatus('Invalid username or password!');
        setLoginStatus(false);
      } else {
        localStorage.setItem('user_id', response.result);
        localStorage.setItem('token', response.token);
        setStatus('Successfully logged in!');
        setLoginStatus(true);
        setGoToHome(true);
      }
    } catch(error){
      setStatus(error.message)
    }
  }

  const onUserAuthenticated = async () => {
    try{
      const response = await userAuthenticateApi()
      if(response.auth){
        setGoToHome(true);
      } else {
        setStatus('Token is invalid');
      }
    } catch(error){
      setStatus(error.message)
    }
  }

  return(
    <div className="tc">
      <h1>Login Page</h1>
      {goToHome && <Navigate to='/' />}
      <Button onClick={() => setGoToRegister(true)}>Go to Register</Button>
      {goToRegister && <Navigate to='/register' />}

      <br/>

      <Input type="text" placeholder="Username" onChange={event => setUsername(event.target.value)}/><br/>
      <Input type="password" placeholder="Password" onChange={event => setPassword(event.target.value)}/><br/>
      {status && <p>{status}</p>}
      <Button onClick={onLogin}>Login</Button>
      {loginStatus && (
        <Button onClick={onUserAuthenticated}>Check if authenticated</Button>
      )}
    </div>
  )
}

export default LoginPage;