import './App.css';
import React, { useState, useEffect } from 'react';
import { generateSudoku } from '../sudokuGenerator/sudokuGenerator.js';
import BtnLevelCont from '../levelFilter/levelChange.js';
import { getDeepCopy, compareSudokus, solver } from './sudokuFunctions.js';

import ButtonCont from '../button/ButtonCont.jsx';
import Table from '../sudokuField/Table.jsx';
import NewGameBtn from '../newGame/NewGame.jsx';
// import Timer from './Timer.jsx';

const initial = generateSudoku();

export const App = () => {
  const [sudokuArr, setSudokuArr] = useState(getDeepCopy(initial));
  const [time, setTime] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);

  useEffect(() => {
    let timer;
    if (gameStarted) {
      timer = setInterval(() => {
        setTime(prevTime => prevTime + 1);
      }, 1000);
    }
    return () => {
      clearInterval(timer);
    };
  }, [gameStarted]);

  function newGame() {
    let newSudoku = generateSudoku();
    setSudokuArr(newSudoku);
    setGameStarted(true);
    setTime(0);
  }

  function chooseLevel(className) {
    let emptyCells;
    if (className === 'easyButton') {
      emptyCells = 20;
    } else if (className === 'mediumButton') {
      emptyCells = 40;
    } else if (className === 'mediumButton') {
      emptyCells = 60;
    } else {
      emptyCells = 1;
    }
    return { emptyCells, className };
  }

  function onInputChange(e, row, column) {
    var value = parseInt(e.target.value) || -1,
      grid = getDeepCopy(sudokuArr);
    if (value === -1 || (value >= 1 && value <= 9)) {
      grid[row][column] = value;
    }

    setSudokuArr(grid);
  }

  function checkSudoku() {
    let sudoku = getDeepCopy(initial);
    solver(sudoku);
    let compare = compareSudokus(sudokuArr, sudoku);
    if (compare.isComplete) {
      alert('Congratulations! You have solved Sudoku!');
    } else if (compare.isSolvable) {
      alert('Keep going!');
    } else {
      alert('Sudoku cannot be solved. Try again!');
    }
  }

  function solveSudoku() {
    let sudoku = getDeepCopy(initial);
    solver(sudoku);
    setSudokuArr(sudoku);
  }

  function resetSudoku() {
    let sudoku = getDeepCopy(initial);
    setSudokuArr(sudoku);
  }

  return (
    <div className="App">
      <div className="App-header">
        <h1>MY SUDOKU</h1>
        <BtnLevelCont chooseLevel={chooseLevel} />
        {/* <Timer /> */}
        <div>Time: {new Date(time * 1000).toISOString().substr(11, 8)}</div>
        <NewGameBtn newGame={newGame} />
        <Table
          sudokuArr={sudokuArr}
          initial={initial}
          onInputChange={onInputChange}
        />

        <ButtonCont
          checkSudoku={checkSudoku}
          solveSudoku={solveSudoku}
          resetSudoku={resetSudoku}
        />
      </div>
    </div>
  );
};