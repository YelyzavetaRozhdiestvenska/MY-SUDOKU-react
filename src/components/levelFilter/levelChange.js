import React from 'react';

// export const levels = [
//   { name: 'Easy', className: 'easyButton' },
//   { name: 'Medium', className: 'mediumButton' },
//   { name: 'Expert', className: 'expertButton' },
// ];

// export function chooseLevel(className) {
//   let emptyCells;
//   if (className === 'easyButton') {
//     emptyCells = 10;
//   } else if (className === 'mediumButton') {
//     emptyCells = 30;
//   } else {
//     emptyCells = 80;
//   }
//   return emptyCells;
// }

const BtnLevelCont = ({ chooseLevel }) => {
  return (
    <div className="buttonLevel">
      {/* <button className={className} onClick={chooseLevel}>
        {name}
      </button> */}
      <button className="easyButton" onClick={chooseLevel}>
        Easy
      </button>
      <button className="mediumButton" onClick={chooseLevel}>
        Medium
      </button>
      <button className="expertButton" onClick={chooseLevel}>
        Expert
      </button>
    </div>
  );
};

export default BtnLevelCont;
