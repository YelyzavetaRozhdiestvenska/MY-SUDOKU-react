import React from 'react';

const Timer = ({ time }) => {
  return <div>Time: {new Date(time * 1000).toISOString().substr(11, 8)}</div>;
};
export default Timer;
