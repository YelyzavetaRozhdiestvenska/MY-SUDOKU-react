import React from 'react';

const BtnCont = ({ switchDifficulty }) => {
  return (
    <div className="buttonLevel">
      <button className="easyButton" onClick={() => switchDifficulty(20)}>
        Easy
      </button>
      <button className="mediumButton" onClick={() => switchDifficulty(40)}>
        Medium
      </button>
      <button className="expertButton" onClick={() => switchDifficulty(60)}>
        Expert
      </button>
    </div>
  );
};
export default BtnCont;
