import React from 'react';
import { Link } from 'react-router-dom';
import GameDetailsButton from './GameDetailsButton';
import RemoveFromWishlistButton from './RemoveFromWishlistButton';

const WishlistCard = ({ game }) => {
  const {
    id,
    name,
    price_text,
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
        <div className='game-price italic'>{price_text}</div>
      </div>
      <div className='game-buttons'>
        <GameDetailsButton id={id}>
          <div className='button-text'>Game Details</div>
        </GameDetailsButton>
        <RemoveFromWishlistButton game={game}>
          <div className='button-text'>Remove</div>
        </RemoveFromWishlistButton>
      </div>
    </div>
  );
};

export default WishlistCard;
