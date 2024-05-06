import './App.css';
import React, { useRef, useState } from 'react';
import { generateSudoku } from '../sudokuGenerator/sudokuGenerator.js';
// import Timer from './Timer.jsx';

// const initial = [
//   [-1, 5, -1, 9, -1, -1, -1, -1, -1],
//   [8, -1, -1, -1, 4, -1, 3, -1, 7],
//   [-1, -1, -1, 2, 8, -1, 1, 9, -1],
//   [5, 3, 8, 6, -1, 7, 9, 4, -1],
//   [-1, 2, -1, 3, -1, 1, -1, -1, -1],
//   [1, -1, 9, 8, -1, 4, 6, 2, 3],
//   [9, -1, 7, 4, -1, -1, -1, -1, -1],
//   [-1, 4, 5, -1, -1, -1, 2, -1, 9],
//   [-1, -1, -1, -1, 3, -1, -1, 7, -1],
// ];

const initial = generateSudoku();

export const App = () => {
  const [sudokuArr, setSudokuArr] = useState(getDeepCopy(initial));
  const [time, setTime] = useState(0);
  const initialTime = useRef(new Date().getTime());
  // const setTimeCallback = useRef(t => setTime(t));

  function newGame() {
    let newSudoku = generateSudoku();
    setSudokuArr(newSudoku);
  }

  function getDeepCopy(arr) {
    return JSON.parse(JSON.stringify(arr));
  }

  const timerClickedHandler = () => {
    setTime(0);
    initialTime.current = new Date().getTime();
  };

  function onInputChange(e, row, column) {
    var value = parseInt(e.target.value) || -1,
      grid = getDeepCopy(sudokuArr);
    if (value === -1 || (value >= 1 && value <= 9)) {
      grid[row][column] = value;
    }

    setSudokuArr(grid);
  }

  function compareSudokus(currentSudoku, solvedSudoku) {
    let res = {
      isComplete: true,
      isSolvable: true,
    };
    for (var i = 0; i < 9; i++) {
      for (var j = 0; j < 9; j++) {
        if (currentSudoku[i][j] !== solvedSudoku[i][j]) {
          if (currentSudoku[i][j] !== -1) {
            res.isSolvable = false;
          }
          res.isComplete = false;
        }
      }
    }
    return res;
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

  function checkRow(grid, row, num) {
    return grid[row].indexOf(num) === -1;
  }
  function checkColumn(grid, column, num) {
    return grid.map(row => row[column]).indexOf(num) === -1;
  }
  function checkBox(grid, row, column, num) {
    let boxArr = [],
      rowStart = row - (row % 3),
      columnStart = column - (column % 3);
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        boxArr.push(grid[rowStart + i][columnStart + j]);
      }
    }
    return boxArr.indexOf(num) === -1;
  }

  function checkValid(grid, row, column, num) {
    if (
      checkRow(grid, row, num) &&
      checkColumn(grid, column, num) &&
      checkBox(grid, row, column, num)
    ) {
      return true;
    }
    return false;
  }

  function getNext(row, column) {
    return column !== 8 ? [row, column + 1] : row !== 8 ? [row + 1, 0] : [0, 0];
  }

  function solver(grid, row = 0, column = 0) {
    if (grid[row][column] !== -1) {
      let isLast = row >= 8 && column >= 8;
      if (!isLast) {
        let [newRow, newColumn] = getNext(row, column);
        return solver(grid, newRow, newColumn);
      }
    }

    for (let num = 1; num <= 9; num++) {
      if (checkValid(grid, row, column, num)) {
        grid[row][column] = num;
        let [newRow, newColumn] = getNext(row, column);

        if (!newRow && !newColumn) {
          return true;
        }

        if (solver(grid, newRow, newColumn)) {
          return true;
        }
      }
    }
    grid[row][column] = -1;
    return false;
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

  // useEffect(() => {
  //   initialTime.current = new Date().getTime();
  //   const timer = setInterval(() => {
  //     const delay = new Date().getTime() - initialTime.current;
  //     setTimeCallback.current(delay / 1000);
  //   }, 1000);
  //   return () => {
  //     clearInterval(timer);
  //   };
  // });

  return (
    <div className="App">
      <div className="App-header">
        <h1>MY SUDOKU</h1>
        <div className="buttonLevel">
          <button className="easyButton">Easy</button>
          <button className="mediumButton">Medium</button>
          <button className="expertButton">Expert</button>
        </div>
        {/* <Timer /> */}
        {new Date(time * 1000).toISOString().substr(11, 8)}
        <button className="newGameButton" onClick={newGame}>
          New Game
        </button>
        <table>
          <tbody>
            {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((row, rIndex) => {
              return (
                <tr
                  key={rIndex}
                  className={(row + 1) % 3 === 0 ? 'bBorder' : ''}
                >
                  {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((column, cIndex) => {
                    return (
                      <td
                        key={rIndex + cIndex}
                        className={(column + 1) % 3 === 0 ? 'rBorder' : ''}
                      >
                        <input
                          onChange={e => {
                            onInputChange(e, row, column);
                            timerClickedHandler();
                          }}
                          value={
                            sudokuArr[row][column] === -1
                              ? ''
                              : sudokuArr[row][column]
                          }
                          className="cellInput"
                          disabled={initial[row][column] !== -1}
                        />
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
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
      </div>
    </div>
  );
};
