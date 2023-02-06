import React from 'react';
import WishlistCard from './WishlistCard';

const WishlistDisplay = ({ wishlist }) => {
  return (
    <div className='wishlist-display text-center'>
      <div className='container'>
        <h2>Wishlist</h2>
        <div className='wishlist-list'>
          {wishlist.length > 0 &&
            wishlist.map((game) => {
              return <WishlistCard game={game} />;
            })}
        </div>
      </div>
    </div>
  );
};

export default WishlistDisplay;
