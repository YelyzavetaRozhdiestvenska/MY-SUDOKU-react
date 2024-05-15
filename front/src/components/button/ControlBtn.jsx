import React from 'react';

const ControlBtnCont = ({ solveSudoku, resetSudoku, checkSudoku }) => {
  return (
    <div className="buttonContainer">
      <button className="checkButton" onClick={checkSudoku}>
        Check
      </button>
      <button className="solveButton" onClick={solveSudoku}>
        Solve
      </button>
      <button className="resetButton" onClick={resetSudoku}>
        Reset
      </button>
    </div>
  );
};
export default ControlBtnCont;
