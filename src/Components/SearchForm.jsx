import React, { useState, useContext } from 'react';
import { AppContext } from './context/AppContext';

const SearchForm = () => {
  const { setGameQuery, gameQuery } = useContext(AppContext);
  const [gameInput, setGameInput] = useState(gameQuery);
  const handleSubmit = (e) => {
    e.preventDefault();
    setGameQuery(gameInput);
  };
  return (
    <form
      className='game-form text-center'
      onSubmit={handleSubmit}
    >
      <label
        htmlFor='game-input'
        className='sr-only'
      >
        Enter a board game title
      </label>
      <input
        className='game-input'
        id='game-input'
        type='text'
        value={gameInput}
        placeholder='Enter board game'
        onChange={(e) => setGameInput(e.target.value)}
        required
      />
      <button className='button'>Search</button>
    </form>
  );
};

export default SearchForm;
