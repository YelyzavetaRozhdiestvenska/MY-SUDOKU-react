import './App.css';
import { useState } from 'react';

const initial = [
  [-1, 5, -1, 9, -1, -1, -1, -1, -1],
  [8, -1, -1, -1, 4, -1, 3, -1, 7],
  [-1, -1, -1, 2, 8, -1, 1, 9, -1],
  [5, 3, 8, 6, -1, 7, 9, 4, -1],
  [-1, 2, -1, 3, -1, 1, -1, -1, -1],
  [1, -1, 9, 8, -1, 4, 6, 2, 3],
  [9, -1, 7, 4, -1, -1, -1, -1, -1],
  [-1, 4, 5, -1, -1, -1, 2, -1, 9],
  [-1, -1, -1, -1, 3, -1, -1, 7, -1],
];

export const App = () => {
  const [sudokuArr, setSudokuArr] = useState(getDeepCopy(initial));

  function getDeepCopy(arr) {
    return JSON.parse(JSON.stringify(arr));
  }

  function onInputChange(e, row, column) {
    var value = parseInt(e.target.value) || -1,
      grid = getDeepCopy(sudokuArr);
    if (value === -1 || (value >= 1 && value <= 9)) {
      grid[row][column] = value;
    }

    setSudokuArr(grid);
  }

  return (
    <div className="App">
      <div className="App-header">
        <h1>MY SUDOKU</h1>
        <table>
          <tbody>
            {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((row, rIndex) => {
              return (
                <tr key={rIndex}>
                  {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((column, cIndex) => {
                    return (
                      <td key={rIndex + cIndex}>
                        <input
                          onChange={e => onInputChange(e, row, column)}
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
      </div>
    </div>
  );
};
