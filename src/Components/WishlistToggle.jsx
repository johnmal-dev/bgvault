import React, { useContext } from 'react';
import { AppContext } from './context/AppContext';
import RemoveFromWishlistButton from './RemoveFromWishlistButton';
import AddToWishlistButton from './AddToWishlistButton';

const WishlistToggle = ({ game }) => {
  const { isInWishlist } = useContext(AppContext);
  return <div>{isInWishlist(game.id) ? <RemoveFromWishlistButton game={game} /> : <AddToWishlistButton game={game} />}</div>;
};

export default WishlistToggle;
