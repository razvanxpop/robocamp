import React from 'react';

const RobotImage = ({id, height, width}) => {
    return <img alt='robots' width={width} height={height} src={`https://robohash.org/${id}?size=200x200`} />
}

export default RobotImage;