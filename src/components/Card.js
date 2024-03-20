import React from 'react'

const Card = ({id, name, email}) => {
  return(
    <div className='bg-light-green dib br3 pa3 ma2 grow bw shadow-5'>
      <img alt='robots' width='200' height='200' src={`https://robohash.org/${id}?size=200x200`} />
        <div>
          <h2>{name}</h2>
          <p>{email}</p>
        </div>
    </div> 
  );
}

export default Card;