import React from 'react';
import Button from './ui/Button';
import RobotImage from './ui/RobotImage';

const RobotCard = ({id, name, email, onUpdate, onDelete}) => {
  return(
    <div className='bg-dark-blue dib br3 pa3 ma2 bw shadow-5 w-40 h-50'>
      <RobotImage id={id} width={200} height={200}/>
      <div>
        <h2>{name}</h2>
        <p>{email}</p>
      </div>
      <Button onClick={() => onUpdate({id})}>Edit</Button>
      <Button onClick={() => onDelete({id})}>Delete</Button>
    </div> 
  );
}

export default RobotCard;