import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import Button from '../components/ui/Button';

const About = () => {
  const [goToHome, setGoToHome] = useState(false);
  const [goToRobots, setGoToRobots] = useState(false);
  const [goToTasks, setGoToTasks] = useState(false);

  return(
    <>
      <h1>About Page</h1>

      <p>
        This application is all about managing robots and their tasks. 
        You can create new robots, assign tasks to them, and track their progress. 
        Each robot can have multiple tasks, and you can easily create new tasks for each robot. 
        Whether you're a robot enthusiast or a productivity guru, this app has something for you.
      </p>

      <Button onClick={() => setGoToHome(true)}>Go to Home</Button>
      {goToHome && <Navigate to='/' />}
      <Button onClick={() => setGoToRobots(true)}>Go to Robots</Button>
      {goToRobots && <Navigate to='/robots' />}
      <Button onClick={() => setGoToTasks(true)}>Go to Tasks</Button>
      {goToTasks && <Navigate to='/tasks' />}
    </>
  )
}

export default About;