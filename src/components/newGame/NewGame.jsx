import React from 'react';

const NewGameBtn = ({ newGame }) => {
  return (
    <button className="newGameButton" onClick={newGame}>
      New Game
    </button>
  );
};

export default NewGameBtn;
