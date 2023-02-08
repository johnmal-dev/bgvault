import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaInfo } from 'react-icons/fa';

const GameDetailsButton = ({ id, children }) => {
  const navigate = useNavigate();
  return (
    <button
      className='button'
      onClick={() => navigate(`/gameDetails/${id}`)}
    >
      <FaInfo />
      {children}
    </button>
  );
};

export default GameDetailsButton;
