import React from 'react'

const DeleteButton = ( {deleteRobot} ) => {
  return(
    <div className="mt2">
      <button
        className='white b pv2 ph3 bg-gray hover-bg-mid-gray bn br-pill'
        type="button"
        onClick={deleteRobot}
      >Delete Robot</button>
    </div>
  );
}

export default DeleteButton;