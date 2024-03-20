import React from 'react'

const NameInput = ( {nameChange} ) => {
  return(
    <div className='pa2'>
      <input
        className='bg-lightest-blue pa3 ba b--green'
        type="text"
        placeholder="Name"
        onInput={nameChange}
      />
    </div>
  );
}

export default NameInput;