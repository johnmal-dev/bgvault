import React from 'react';
import firebase from '../database/firebase';
import { getDatabase, ref, update } from 'firebase/database';
import { FaHeartBroken } from 'react-icons/fa';
import { successAlert, errorAlert, deletePrompt } from '../utils/alerts';

const RemoveFromWishlistButton = ({ game }) => {
  const removeFromWishlist = (key) => {
    const db = getDatabase(firebase);
    const wishlistRef = ref(db, '/wishlist');
    update(wishlistRef, { [key]: null })
      .then(() => {
        successAlert(`${game.name} has been removed from your wishlist!`);
      })
      .catch((err) => {
        errorAlert(`Error: ${err}`);
      });
  };

  const handleClick = () => {
    deletePrompt(game.key, game.name, 'collection', removeFromWishlist);
  };
  return (
    <button
      className='button'
      aria-label='remove from wishlist'
      onClick={handleClick}
    >
      <FaHeartBroken />
    </button>
  );
};

export default RemoveFromWishlistButton;
