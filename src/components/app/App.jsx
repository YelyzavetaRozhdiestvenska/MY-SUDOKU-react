import './App.css';
import React, { useState, useEffect } from 'react';
import { generateSudoku } from '../sudokuGenerator/sudokuGenerator.js';
import {
  getDeepCopy,
  compareSudokus,
  solver,
  checkValid,
} from './sudokuFunctions.js';
import ButtonCont from '../button/ButtonCont.jsx';
import Table from '../sudokuField/Table.jsx';
import NewGameBtn from '../newGame/NewGame.jsx';
import Timer from '../timer/Timer';
import BtnLevelCont from '../levelFilter/buttonLevel';

const initialGameLevel = localStorage.getItem('level');
const value = initialGameLevel ? initialGameLevel : 20;
const initial = generateSudoku(value);

export const App = () => {
  const [sudokuArr, setSudokuArr] = useState(getDeepCopy(initial));
  const [time, setTime] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [levelGame, setLevelGame] = useState(0);

  useEffect(() => {
    if (levelGame === 20 || levelGame === 40 || levelGame === 60)
      localStorage.setItem('level', levelGame);

    let timer;
    if (gameStarted) {
      timer = setInterval(() => {
        setTime(prevTime => prevTime + 1);
      }, 1000);
    }
    return () => {
      clearInterval(timer);
    };
  }, [gameStarted, levelGame]);

  function handleClickLevel(level) {
    setLevelGame(level);
  }

  function newGame() {
    let newSudoku = generateSudoku(value);
    setSudokuArr(newSudoku);
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
    let sudoku = getDeepCopy(initial);
    solver(sudoku);
    setSudokuArr(sudoku);
  }

  function checkSudoku() {
    let sudoku = getDeepCopy(initial);
    solver(sudoku);
    let compare = compareSudokus(sudokuArr, sudoku);
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
    let sudoku = getDeepCopy(initial);
    setSudokuArr(sudoku);
  }

  return (
    <div className="App">
      <main>
        <h1>MY SUDOKU</h1>
        <BtnLevelCont handleClickLevel={handleClickLevel} />
        <p>Your Level Game: {levelGame}</p>
        <Timer time={time} />
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
      </main>
    </div>
  );
};
