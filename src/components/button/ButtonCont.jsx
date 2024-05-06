// import './App.css';
// import { generateSudoku } from './sudokuGenerator.js';

// const initial = generateSudoku();

// export const ButtonCont = () => {
//   function checkSudoku() {
//     let sudoku = getDeepCopy(initial);
//     solver(sudoku);
//     let compare = compareSudokus(sudokuArr, sudoku);
//     if (compare.isComplete) {
//       alert('Congratulations! You have solved Sudoku!');
//     } else if (compare.isSolvable) {
//       alert('Keep going!');
//     } else {
//       alert('Sudoku cannot be solved. Try again!');
//     }
//   }

//   function checkRow(grid, row, num) {
//     return grid[row].indexOf(num) === -1;
//   }
//   function checkColumn(grid, column, num) {
//     return grid.map(row => row[column]).indexOf(num) === -1;
//   }
//   function checkBox(grid, row, column, num) {
//     let boxArr = [],
//       rowStart = row - (row % 3),
//       columnStart = column - (column % 3);
//     for (let i = 0; i < 3; i++) {
//       for (let j = 0; j < 3; j++) {
//         boxArr.push(grid[rowStart + i][columnStart + j]);
//       }
//     }
//     return boxArr.indexOf(num) === -1;
//   }

//   function checkValid(grid, row, column, num) {
//     if (
//       checkRow(grid, row, num) &&
//       checkColumn(grid, column, num) &&
//       checkBox(grid, row, column, num)
//     ) {
//       return true;
//     }
//     return false;
//   }

//   function getNext(row, column) {
//     return column !== 8 ? [row, column + 1] : row !== 8 ? [row + 1, 0] : [0, 0];
//   }

//   function solver(grid, row = 0, column = 0) {
//     if (grid[row][column] !== -1) {
//       let isLast = row >= 8 && column >= 8;
//       if (!isLast) {
//         let [newRow, newColumn] = getNext(row, column);
//         return solver(grid, newRow, newColumn);
//       }
//     }

//     for (let num = 1; num <= 9; num++) {
//       if (checkValid(grid, row, column, num)) {
//         grid[row][column] = num;
//         let [newRow, newColumn] = getNext(row, column);

//         if (!newRow && !newColumn) {
//           return true;
//         }

//         if (solver(grid, newRow, newColumn)) {
//           return true;
//         }
//       }
//     }
//     grid[row][column] = -1;
//     return false;
//   }

//   function solveSudoku() {
//     let sudoku = getDeepCopy(initial);
//     solver(sudoku);
//     setSudokuArr(sudoku);
//   }

//   function resetSudoku() {
//     let sudoku = getDeepCopy(initial);
//     setSudokuArr(sudoku);
//   }

//   return (
//     <div className="buttonContainer">
//       <button className="checkButton" onClick={checkSudoku}>
//         Check
//       </button>
//       <button className="solveButton" onClick={solveSudoku}>
//         Solve
//       </button>
//       <button className="resetButton" onClick={resetSudoku}>
//         Reset
//       </button>
//     </div>
//   );
// };
