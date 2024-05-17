const GRID_SIZE = 9;
const BOX_SIZE = 3;
// >>>>>Генерация таблицы судоку>>>>>>>>

export function getDeepCopy(arr) {
  return JSON.parse(JSON.stringify(arr));
}

export function generateSudoku() {
  const sudoku = createEmptyGrid();
  resolveSudoku(sudoku);
  return sudoku;
}

// создаем 9 массивов и заполняем каждый из них массивом из 9
export function createEmptyGrid() {
  return new Array(GRID_SIZE).fill().map(() => new Array(GRID_SIZE).fill(-1));
}

// Заполняет двухмерный массив числами, чтоб получилась корректная сетка судоку
function resolveSudoku(grid) {
  // находим пустую ячейку
  const emptyCell = findEmptyCell(grid);
  //Eсли не находим пустую ячейку, таблица заполнена:
  if (!emptyCell) return true;

  const numbers = getRandomNumbers();

  // рекурсия
  for (let i = 0; i < numbers.length; i++) {
    if (!validate(grid, emptyCell.row, emptyCell.column, numbers[i])) continue;

    grid[emptyCell.row][emptyCell.column] = numbers[i];

    if (resolveSudoku(grid)) return true;

    grid[emptyCell.row][emptyCell.column] = -1;
  }
}

function findEmptyCell(grid) {
  for (let row = 0; row < GRID_SIZE; row++) {
    for (let column = 0; column < GRID_SIZE; column++) {
      if (grid[row][column] === -1) return { row, column };
    }
  }
  // Если нет пустых ячеек:
  return null;
}

function getRandomNumbers() {
  // создаем упорядоченный массив:
  const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  // перемешиваем массив:
  for (let i = numbers.length - 1; i >= 0; i--) {
    const randomIndex = Math.floor(Math.random() * (i + 1));
    [numbers[i], numbers[randomIndex]] = [numbers[randomIndex], numbers[i]];
  }

  return numbers;
}

function validate(grid, row, column, value) {
  return (
    validateColumn(grid, row, column, value) &&
    validateRow(grid, row, column, value) &&
    validateBox(grid, row, column, value)
  );
}

function validateColumn(grid, row, column, value) {
  // пробегаемся по всем строкам в столбце, кроме ячейки row, в которую вписываем значение.
  // iRow - индекс прoверяемой строки
  for (let iRow = 0; iRow < GRID_SIZE; iRow++) {
    if (grid[iRow][column] === value && iRow !== row) return false;
  }
  return true;
}

function validateRow(grid, row, column, value) {
  for (let iColumn = 0; iColumn < GRID_SIZE; iColumn++) {
    if (grid[row][iColumn] === value && iColumn !== column) return false;
  }
  return true;
}

//Чтоб получить координаты внутреннего верхнего левого квадрата, нужно найти смещение от среднего нижнего квардата.
//  Чтоб вычислить смещение, нужно получить остаток от деления координат нижней ячейки на размер маленького квадрата
function validateBox(grid, row, column, value) {
  const firstRowInBox = row - (row % BOX_SIZE);
  const firstColumnInBox = column - (column % BOX_SIZE);

  for (let iRow = firstRowInBox; iRow < firstRowInBox + BOX_SIZE; iRow++) {
    for (
      let iColumn = firstColumnInBox;
      iColumn < firstColumnInBox + BOX_SIZE;
      iColumn++
    ) {
      if (grid[iRow][iColumn] === value && iRow !== row && iColumn !== column)
        return false;
    }
  }
  return true;
}

export function removeCells(grid, difficulty) {
  // количество заполняемых ячеек

  const resultGrid = [...grid].map(row => [...row]);

  let i = 0;
  while (i < difficulty) {
    let row = Math.floor(Math.random() * GRID_SIZE);
    let column = Math.floor(Math.random() * GRID_SIZE);
    if (resultGrid[row][column] !== -1) {
      resultGrid[row][column] = -1;
      i++;
    }
  }
  return resultGrid;
}

// >>>>>>>>>>Решение игры>>>>>>>>>>>>>>>>>>>>>>>>

export function compareSudokus(currentSudoku, solvedSudoku) {
  let res = {
    isComplete: true,
    isSolvable: true,
  };
  for (var i = 0; i < 9; i++) {
    for (var j = 0; j < 9; j++) {
      console.log(`${currentSudoku[i][j]}-${solvedSudoku[i][j]}`);

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
