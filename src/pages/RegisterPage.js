import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import { registerApi } from '../services/api/auth-api';
import { isValidEmail } from '../utils/healpers';

const RegisterPage = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState(null);
  const [goToLogin, setGoToLogin] = useState(false);

  const onRegister = async () => {
    if(username.length === 0 || email.length === 0 || password.length === 0){
      setStatus("Please fill all the fields!")
      return ;
    }

    if(!isValidEmail(email)){
      setStatus("Please enter a valid email!")
      return ;
    }

    if(username.length < 4 || password.length < 5){
      setStatus("The username or password is too short!")
      return ;
    }


    try{
      await registerApi({username: username, email: email, password: password});
      setStatus('Successfully registered!');
      setGoToLogin(true);
    } catch(error){
      setStatus(error.message);
    }
  }

  return(
    <div className="tc">
      <h1>Register Page</h1>

      <Button onClick={() => setGoToLogin(true)}>Go to Login</Button>
      {goToLogin && <Navigate to='/login' />}
      <br/>
      <Input type="text" placeholder="Username" onChange={event => setUsername(event.target.value)}/><br/>
      <Input type="email" placeholder="Email" onChange={event => setEmail(event.target.value)}/><br/>
      <Input type="password" placeholder="Password" onChange={event => setPassword(event.target.value)}/><br/>
      {status && <p>{status}</p>}
      <Button onClick={onRegister}>Register</Button>
    </div>
  )
};

export default RegisterPage;