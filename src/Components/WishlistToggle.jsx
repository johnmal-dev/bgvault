import React, { useContext } from 'react';

import AddToWishlistButton from './AddToWishlistButton';
import { AppContext } from './context/AppContext';
import RemoveFromWishlistButton from './RemoveFromWishlistButton';

const WishlistToggle = ({ game }) => {
  const { isInWishlist } = useContext(AppContext);
  return (
    <div>
      {isInWishlist(game.id) ? (
        <RemoveFromWishlistButton game={game}>
          <div className='button-text'>Wishlist</div>
        </RemoveFromWishlistButton>
      ) : (
        <AddToWishlistButton game={game}>
          <div className='button-text'>Wishlist</div>
        </AddToWishlistButton>
      )}
    </div>
  );
};

export default WishlistToggle;
