import React from 'react';
import firebase from '../database/firebase';
import { getDatabase, ref, update } from 'firebase/database';
import { toast } from 'react-toastify';
import { FaHeartBroken } from 'react-icons/fa';

const RemoveFromWishlistButton = ({ game }) => {
  const removeFromWishlist = (key, gameName) => {
    const db = getDatabase(firebase);
    const wishlistRef = ref(db, '/wishlist');
    update(wishlistRef, { [key]: null })
      .then(() => {
        toast(`${gameName} has been removed from your wishlist!`);
      })
      .catch((err) => {
        toast(`Database Error: ${err}`);
      });
  };
  return (
    <button
      className='button'
      aria-label='remove from wishlist'
      onClick={() => {
        removeFromWishlist(game.key, game.name);
      }}
    >
      <FaHeartBroken />
    </button>
  );
};

export default RemoveFromWishlistButton;
