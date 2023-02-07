import React from 'react';
import { Link } from 'react-router-dom';
import GameDetailsButton from './GameDetailsButton';
import RemoveFromWishlistButton from './RemoveFromWishlistButton';

const WishlistCard = ({ game }) => {
  const {
    id,
    name,
    images: { small: image },
  } = game;
  return (
    <div className='wishlist-card'>
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
          <GameDetailsButton />
        </Link>
        <RemoveFromWishlistButton game={game} />
      </div>
    </div>
  );
};

export default WishlistCard;
