import React from 'react';
import Button from './ui/Button';
import RobotImage from './ui/RobotImage';

const TaskCard = ( { id, name, description, status, robotId, onUpdate, onDelete } ) => {
  return(
    <div className='bg-dark-blue dib br3 pa3 ma2 bw shadow-5 w-40 h-50'>
      <p>Assigned to: {robotId}</p>
      <RobotImage id={robotId} width={100} height={100}/>
      <h2>{name}</h2>
      <p>{description}</p>
      <p>{status}</p>
      <Button onClick={() => onUpdate({id})}>Edit</Button>
      <Button onClick={(id) => onDelete({id})}>Delete</Button>
    </div> 
  );
}

export default TaskCard;