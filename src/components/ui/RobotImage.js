import React from 'react';

const RobotImage = ({id}) => {
    return <img alt='robots' width='200' height='200' src={`https://robohash.org/${id}?size=200x200`} />
}

export default RobotImage;