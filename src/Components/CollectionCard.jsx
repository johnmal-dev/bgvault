import React from 'react';
import { Link } from 'react-router-dom';
import GameDetailsButton from './GameDetailsButton';
import RemoveFromCollectionButton from './RemoveFromCollectionButton';

const CollectionCard = ({ game }) => {
  const {
    id,
    key,
    name,
    images: { small: image },
  } = game;
  return (
    <div
      key={key}
      className='collection-card'
    >
      <div className='img-container'>
        <Link to={`/gameDetails/${id}`}>
          <img
            src={image}
            alt={name}
          />
        </Link>
      </div>
      <div className='game-info'>
        <div className='bold text-center'>{name}</div>
      </div>
      <div className='game-buttons'>
        <Link to={`/gameDetails/${id}`}>
          <GameDetailsButton>
            <div className='button-text'>Game Details</div>
          </GameDetailsButton>
        </Link>
        <RemoveFromCollectionButton game={game}>
          <div className='button-text'>Remove</div>
        </RemoveFromCollectionButton>
      </div>
    </div>
  );
};

export default CollectionCard;
