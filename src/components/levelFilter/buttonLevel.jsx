import React from 'react';
import Button from './button';

const BtnLevelCont = ({ handleClickLevel }) => {
  return (
    <div className="buttonLevel">
      <Button className="easyButton" onClick={() => handleClickLevel(20)}>
        Easy
      </Button>
      <Button className="mediumButton" onClick={() => handleClickLevel(40)}>
        Medium
      </Button>
      <Button className="expertButton" onClick={() => handleClickLevel(60)}>
        Expert
      </Button>
    </div>
  );
};

export default BtnLevelCont;
