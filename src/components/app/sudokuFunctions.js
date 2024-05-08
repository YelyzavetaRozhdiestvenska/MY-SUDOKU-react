export function getDeepCopy(arr) {
  return JSON.parse(JSON.stringify(arr));
}

export function compareSudokus(currentSudoku, solvedSudoku) {
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

export function checkRow(grid, row, num) {
  return grid[row].indexOf(num) === -1;
}
export function checkColumn(grid, column, num) {
  return grid.map(row => row[column]).indexOf(num) === -1;
}
export function checkBox(grid, row, column, num) {
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

export function checkValid(grid, row, column, num) {
  if (
    checkRow(grid, row, num) &&
    checkColumn(grid, column, num) &&
    checkBox(grid, row, column, num)
  ) {
    return true;
  }
  return false;
}

export function getNext(row, column) {
  return column !== 8 ? [row, column + 1] : row !== 8 ? [row + 1, 0] : [0, 0];
}

export function solver(grid, row = 0, column = 0) {
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
