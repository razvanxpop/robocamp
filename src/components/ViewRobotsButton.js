import React from 'react'

const ViewRobotsButton = ( {viewRobotsChange} ) => {
  return (
    <div className="mt2">
      <button 
        className='white b pv2 ph3 bg-gray hover-bg-mid-gray bn br-pill'
        type="button" 
        onClick={viewRobotsChange}
      >View Robots</button>
    </div>
  );
}

export default ViewRobotsButton;