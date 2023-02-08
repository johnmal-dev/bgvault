import React from 'react';
import { Link } from 'react-router-dom';
import GameDetailsButton from './GameDetailsButton';
import RemoveFromCollectionButton from './RemoveFromCollectionButton';
import StarRating from './StarRating';

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
        <StarRating game={game} />
      </div>
      <div className='game-buttons'>
        <GameDetailsButton id={id}>
          <div className='button-text'>Game Details</div>
        </GameDetailsButton>
        <RemoveFromCollectionButton game={game}>
          <div className='button-text'>Remove</div>
        </RemoveFromCollectionButton>
      </div>
    </div>
  );
};

export default CollectionCard;
