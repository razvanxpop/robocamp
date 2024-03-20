import React from 'react'

const SearchBox = ({ searchChange }) => {
  return (
    <div className='pa2'>
      <input
        className='bg-lightest-blue pa3 ba b--green'
        type="serch"
        placeholder="Search robots"
        onChange={searchChange} 
      />
    </div>
  );
}

export default SearchBox;
