import React from 'react';
import { Link } from 'react-router-dom';

const WishlistCard = ({ game, removeFromWishlist }) => {
  const {
    id,
    key,
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
        <Link to={`/gameDetails/${id}`}>
          <button className='button'>Details</button>
        </Link>
      </div>
      <button
        className='button'
        onClick={() => {
          removeFromWishlist(key, name);
        }}
      >
        Remove
      </button>
    </div>
  );
};

export default WishlistCard;
