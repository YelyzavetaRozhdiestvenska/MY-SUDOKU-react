import React from 'react';

const Table = ({ sudokuArr, initial, onInputChange }) => {
  return (
    <table>
      <tbody>
        {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((row, rIndex) => {
          return (
            <tr key={rIndex} className={(row + 1) % 3 === 0 ? 'bBorder' : ''}>
              {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((column, cIndex) => {
                return (
                  <td
                    key={rIndex + cIndex}
                    className={(column + 1) % 3 === 0 ? 'rBorder' : ''}
                  >
                    <input
                      onChange={e => {
                        onInputChange(e, row, column);
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
  );
};
export default Table;
