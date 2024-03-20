import React from 'react'

const AddRobotButton = ( {addRobot} ) => {
  return(
    <div className="mt2">
      <button 
        className='white b pv2 ph3 bg-gray hover-bg-mid-gray bn br-pill'
        type="button"
        onClick={addRobot}
      >Add Robot</button>
    </div>
  );
}

export default AddRobotButton;