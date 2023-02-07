import React from 'react';
import { FaInfo } from 'react-icons/fa';

const GameDetailsButton = ({ children }) => {
  return (
    <button className='button'>
      <FaInfo />
      {children}
    </button>
  );
};

export default GameDetailsButton;
