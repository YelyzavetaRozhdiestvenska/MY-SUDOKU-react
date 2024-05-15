import React from 'react';

const ButtonCont = ({ checkSudoku, solveSudoku, resetSudoku }) => {
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

export default ButtonCont;