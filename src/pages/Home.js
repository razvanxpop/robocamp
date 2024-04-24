import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import Button from '../components/ui/Button';

const Home = () => {
  const [goToRobots, setGoToRobots] = useState(false);
  const [goToTasks, setGoToTasks] = useState(false);
  const [goToAbout, setGoToAbout] = useState(false);

  return(
    <>
      <h1>Home Page</h1>


      <Button onClick={() => setGoToRobots(true)}>Go to Robots</Button>
      {goToRobots && <Navigate to='/robots' />}
      <Button onClick={() => setGoToTasks(true)}>Go to Tasks</Button>
      {goToTasks && <Navigate to='/tasks' />}
      <Button onClick={() => setGoToAbout(true)}>Go to About</Button>
      {goToAbout && <Navigate to='/about' />}
    </>
  )
}

export default Home;