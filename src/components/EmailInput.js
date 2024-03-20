import React from 'react'

const EmailInput = ( {emailChange} ) => {
  return(
    <div className="pa2">
      <input
        className='bg-lightest-blue pa3 ba b--green'
        type="email"
        placeholder="Email"
        onInput={emailChange}
      />
    </div>
  );
}

export default EmailInput;