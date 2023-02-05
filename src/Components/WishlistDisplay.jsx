import React from 'react';
import { Link } from 'react-router-dom';

const WishlistDisplay = ({ wishlist, removeFromWishlist }) => {
  return (
    <div className='wishlist-display text-center'>
      <div className='container'>
        <h2>Wishlist</h2>
        <div className='wishlist-list'>
          {wishlist.length > 0 &&
            wishlist.map((game) => {
              const {
                id,
                key,
                name,
                images: { small: image },
              } = game;
              return (
                <div
                  key={key}
                  className='wishlist-card'
                >
                  <div className='img-container'>
                    <img
                      src={image}
                      alt={name}
                    />
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
            })}
        </div>
      </div>
    </div>
  );
};

export default WishlistDisplay;
