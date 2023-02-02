import React, { useState } from 'react';

const GameForm = ({ setGameQuery }) => {
  const [gameInput, setGameInput] = useState('');
  const handleSubmit = (e) => {
    e.preventDefault();
    setGameQuery(gameInput);
  };
  return (
    <form
      className='game-form'
      onSubmit={handleSubmit}
    >
      <label>
        Enter a board game title:
        <input
          type='text'
          value={gameInput}
          onChange={(e) => setGameInput(e.target.value)}
        />
      </label>
      <button>Search</button>
    </form>
  );
};

export default GameForm;
