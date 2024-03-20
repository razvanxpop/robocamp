import React from 'react'

const UpdateButton = ( {updateRobot} ) => {
  return(
    <div className="mt2">
      <button
        className='white b pv2 ph3 bg-gray hover-bg-mid-gray bn br-pill'
        type="button"
        onClick={updateRobot}
      >Update Robot</button>
    </div>
  );
}

export default UpdateButton;