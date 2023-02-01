import React, { useState, useEffect } from 'react';

const GameForm = ({ getGames }) => {
  const [gameInput, setGameInput] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    getGames(gameInput);
  };
  return (
    <form className='game-form' onSubmit={handleSubmit}>
      <label>
        Enter a board game title:
        <input type='text' value={gameInput} onChange={(e) => setGameInput(e.target.value)} />
      </label>
      <button>Search</button>
    </form>
  );
};

export default GameForm;
