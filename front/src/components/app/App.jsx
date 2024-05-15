import './App.css';
import React, { useState, useEffect } from 'react';
import Table from '../sudokuField/Table.jsx';
import NewGameBtn from '../newGame/NewGame.jsx';
import Timer from '../timer/Timer';
import BtnCont from '../levelFilter/LevelGameBtn.jsx';
import ControlBtnCont from '../button/ControlBtn.jsx';
import {
  generateSudoku,
  getDeepCopy,
  removeCells,
  createEmptyGrid,
  checkValid,
  solver,
  compareSudokus,
} from './functionsSudoku';
export const App = () => {
  // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
  // const initial = generateSudoku();

  // const [sudokuArr, setSudokuArr] = useState(getDeepCopy(initial));
  // const [time, setTime] = useState(0);
  // const [gameStarted, setGameStarted] = useState(false);
  // const [levelGame, setLevelGame] = useState(0);

  // function solveSudoku() {
  //   let sudoku = getDeepCopy(initial);
  //   solver(sudoku);
  //   setSudokuArr(sudoku);
  // }

  // function checkSudoku() {
  //   let sudoku = getDeepCopy(initial);
  //   solver(sudoku);
  //   let compare = compareSudokus(sudokuArr, sudoku);
  //   if (compare.isComplete) {
  //     alert('Congratulations! You have solved Sudoku!');
  //     setGameStarted(false);
  //   } else if (compare.isSolvable) {
  //     alert('Keep going!');
  //   } else {
  //     alert('Sudoku cannot be solved. Try again!');
  //   }
  // }

  // function resetSudoku() {
  //   let sudoku = getDeepCopy(initial);
  //   setSudokuArr(sudoku);
  // }
  // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

  const [difficulty, setDifficulty] = useState(81);
  const [sudokuArr, setSudokuArr] = useState(createEmptyGrid());
  const [time, setTime] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);

  useEffect(() => {
    const initialSudoku = generateSudoku();
    const sudokuWithRemovedCells = removeCells(initialSudoku, difficulty);
    setSudokuArr(sudokuWithRemovedCells);

    let timer;
    if (gameStarted) {
      timer = setInterval(() => {
        setTime(prevTime => prevTime + 1);
      }, 1000);
    }
    return () => {
      clearInterval(timer);
    };
  }, [difficulty, gameStarted]);

  function newGame() {
    const newSudoku = generateSudoku();
    const sudokuWithRemovedCells = removeCells(newSudoku, difficulty);
    setSudokuArr(sudokuWithRemovedCells);
    setGameStarted(true);
    setTime(0);
  }

  function onInputChange(e, row, column) {
    var value = parseInt(e.target.value) || -1,
      grid = getDeepCopy(sudokuArr);
    if (
      value === -1 ||
      (value >= 1 && value <= 9 && checkValid(grid, row, column, value))
    ) {
      grid[row][column] = value;
    } else {
      alert('Incorrect value! Try again!!!');
    }

    setSudokuArr(grid);
    setGameStarted(true);
  }

  function solveSudoku() {
    let sudoku = getDeepCopy(sudokuArr);
    solver(sudoku);
    setSudokuArr(sudoku);
  }

  function checkSudoku() {
    let solvedSudoku = getDeepCopy(sudokuArr);
    solver(solvedSudoku);
    let compare = compareSudokus(sudokuArr, solvedSudoku);
    if (compare.isComplete) {
      alert('Congratulations! You have solved Sudoku!');
      setGameStarted(false);
    } else if (compare.isSolvable) {
      alert('Keep going!');
    } else {
      alert('Sudoku cannot be solved. Try again!');
    }
  }

  function resetSudoku() {
    setSudokuArr(getDeepCopy(sudokuArr));
  }

  return (
    <div className="App">
      <main>
        <h1>MY SUDOKU</h1>
        <p>Choose your game level:</p>

        <BtnCont switchDifficulty={setDifficulty} />
        <NewGameBtn newGame={newGame} />
        <Timer time={time} />
        <Table sudokuArr={sudokuArr} onInputChange={onInputChange} />
        <ControlBtnCont
          checkSudoku={checkSudoku}
          solveSudoku={solveSudoku}
          resetSudoku={resetSudoku}
        />
      </main>
    </div>
  );
};
