import React from 'react'
import Card from './Card'

const CardList = ({robots, checkboxChange}) => {
  return(
    <div>
      {
        robots.map((user, index) => {
          return (
            <Card 
              id={robots[index].id}
              name={robots[index].name}
              email={robots[index].email}
              key={robots[index].id}
              checkboxChange={checkboxChange}
            />
          );
        })
      }
    </div>
  );
}

export default CardList; 