import axios from 'axios';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Navigate } from 'react-router-dom';
import RobotCard from '../components/RobotCard';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import useRobotSearch from '../hooks/useRobotSearch';
import { connection, createRobotApi, deleteRobotApi, getRobotApi, getRobotsApi, updateRobotApi } from '../services/api/robots-api';
import ws from '../services/api/socket-connection';
import { useRobotStore } from '../services/state/robot-store';
import { isValidEmail } from '../utils/healpers';

const RobotsPage = () => {
  const [goToHome, setGoToHome] = useState(false);
  const [goToTasks, setGoToTasks] = useState(false);
  const [goToAbout, setGoToAbout] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(2);

  const { robots, hasMore, loading, error } = useRobotSearch(page, limit);

  const observer = useRef()
  const lastRobotElementRef = useCallback(node => {
    if(loading) return
    if(observer.current) observer.current.disconnect()
    observer.current = new IntersectionObserver(entries => {
      if(entries[0].isIntersecting && hasMore){
        setPage(prevPage => prevPage + 1)
      }
    })
    if(node) observer.current.observe(node)
  }, [loading, hasMore])

  const { createRobot, updateRobot, deleteRobot } = useRobotStore()

  const onCreate = async () => {
    try{
      if(!isValidEmail(email) || name.length < 5){
        alert("The email of the user is not valid or the name is too short!");
        setEmail("")
        setName("")
        return ;
      }

      await createRobotApi({name: name, email: email})
    } catch(error){
      console.log(error.messages)
    }
  }

  const onUpdate = async () => {
    if(!isValidEmail(email) || name.length < 5){
      alert("The email of the user is not valid or the name is too short!");
      setEmail("")
      setName("")
      return ;
    }

    let updatedRobot;
    robots.forEach(robot => {
      if(robot.email.toLowerCase() === email.toLowerCase()){
        updatedRobot = {
          "id": robot.id,
          "name": name,
          "email": email
        }
      }
    })

    if(!updatedRobot){
      alert("There is no user in the database with the provided email address!");
      setEmail("")
      setName("")
      return ;
    }

    try {
      const robot = await updateRobotApi(updatedRobot.id, updatedRobot);
      updateRobot(robot);
    }catch(error){
      console.log(error.messages)
    }
  }

  const onDelete = async (id) => {
    try{
      const response = await deleteRobotApi(id);
      if(response)
        deleteRobot(id);
    }catch(error){
      console.log(error.messages)
    }
  }

  const onNameChange = (event) => {
    setName(event.target.value)
  }

  const onEmailChange = (event) => {
    setEmail(event.target.value)
  }

  return(
    <>
      <h1>Robots Page</h1>
      
      <Button onClick={() => setGoToHome(true)}>Go to Home</Button>
      {goToHome && <Navigate to='/' />}
      <Button onClick={() => setGoToTasks(true)}>Go to Tasks</Button>
      {goToTasks && <Navigate to='/tasks' />}
      <Button onClick={() => setGoToAbout(true)}>Go to About</Button>
      {goToAbout && <Navigate to='/about' />}

      <p>
        <Button onClick={onCreate} >Create Robot</Button>
        <Input type="text" name="name" placeholder='Name' onChange={onNameChange}/>
        <Input type="email" name="email" placeholder='Email' onChange={onEmailChange}/>
      </p>

      
      {robots.map((robot, index) => {
        if(robots.length === index + 1){
          return (
            <div ref={lastRobotElementRef}>
              <RobotCard
                id={robot.id}
                name={robot.name}
                email={robot.email}
                key={robot.id}
                onUpdate={onUpdate}
                onDelete={(id) => onDelete(id)}
              />
            </div>
          );
        } else {
          return (
            <RobotCard 
              id={robot.id} 
              name={robot.name} 
              email={robot.email} 
              key={robot.id} 
              onUpdate={onUpdate} 
              onDelete={onDelete}
            />
          );
        }
      })}
      <div>{loading && 'Loading...'}</div>
      <div>{error && 'Error'}</div>
    </>
  )
}

export default RobotsPage;