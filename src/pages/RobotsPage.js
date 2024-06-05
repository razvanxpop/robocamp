import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Navigate } from 'react-router-dom';
import RobotCard from '../components/RobotCard';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import useRobotLoad from '../hooks/useRobotLoad';
import { createRobotApi, deleteRobotApi, getRobotApi, updateRobotApi } from '../services/api/robots-api';
import { isValidEmail } from '../utils/healpers';

const RobotsPage = () => {
  const [goToHome, setGoToHome] = useState(false);
  const [goToTasks, setGoToTasks] = useState(false);
  const [goToAbout, setGoToAbout] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(2);

  const { robots, hasMore, loading, error } = useRobotLoad(page, limit);

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

  // useEffect(() => {
  //   openDatabase(); // open the indexedDB database when the component mounts
  //   window.addEventListener('online', checkDatabase) // Check the database when the browser is online
  //   return () => window.removeEventListener('online', checkDatabase) // Clean up the event listener
  // }, [])

  const onCreate = async () => {
    if(!isValidEmail(email) || name.length < 5){
      alert("The email of the user is not valid or the name is too short!");
      return ;
    }
    
    try{
      const user_id = localStorage.getItem('user_id')
      const robot = await createRobotApi({name: name, email: email, user_id: user_id})
      console.log('created robot', robot)
    } catch(error){
      // if(error.message === "Network Error"){
      //   alert("The server is not responding. Please try again later!")
      //   console.log(localStorage.getItem("offlineData"))
      // }
      alert(error)
    }
  }

  const onUpdate = async (id) => {
    if(!isValidEmail(email) && name.length < 5){
      alert("The email of the user is not valid or the name is too short!");
      return ;
    }

    try {
      let updatedRobot = await getRobotApi(id);
      updatedRobot.name = name || updatedRobot.name;
      updatedRobot.email = email || updatedRobot.email;

      await updateRobotApi(updatedRobot.id, updatedRobot);
    }catch(error){
      alert(error)
    }
  }

  const onDelete = async (id) => {
    try{
      await deleteRobotApi(id);
    }catch(error){
      alert(error)
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
        <Button onClick={onCreate}>Create Robot</Button>
        <Input type="text" name="name" placeholder='Name' onChange={onNameChange}/>
        <Input type="email" name="email" placeholder='Email' onChange={onEmailChange}/>
      </p>

      
      {robots.map((robot, index) => {
        if(robots.length === index + 1){
          return (
            <div key={robot.id} ref={lastRobotElementRef}>
              <RobotCard
                id={robot.id}
                name={robot.name}
                email={robot.email}
                key={robot.id}
                onUpdate={() => onUpdate(robot.id)}
                onDelete={() => onDelete(robot.id)}
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
              onUpdate={() => onUpdate(robot.id)} 
              onDelete={() => onDelete(robot.id)}
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