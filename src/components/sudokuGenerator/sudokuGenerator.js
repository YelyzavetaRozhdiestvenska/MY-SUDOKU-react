// import { chooseLevel } from '../levelFilter/levelChange.js';

const GRID_SIZE = 9;
const BOX_SIZE = 3;

export function generateSudoku() {
  const sudoku = createEmptyGrid();
  resolveSudoku(sudoku);
  // возвращаем незаполненную сетку для игры:
  return removeCells(sudoku);
}

// создаем 9 массивов и заполняем каждый из них массивом из 9
function createEmptyGrid() {
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

export function findEmptyCell(grid) {
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

function removeCells(grid) {
  // количество заполняемых ячеек
  // const DIFFICULTY = chooseLevel();
  const DIFFICULTY = 30;
  const resultGrid = [...grid].map(row => [...row]);

  let i = 0;
  while (i < DIFFICULTY) {
    let row = Math.floor(Math.random() * GRID_SIZE);
    let column = Math.floor(Math.random() * GRID_SIZE);
    if (resultGrid[row][column] !== -1) {
      resultGrid[row][column] = -1;
      i++;
    }
  }
  return resultGrid;
}

// Доделать динамическое значение сложностм
