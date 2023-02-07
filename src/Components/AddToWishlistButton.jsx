import React from 'react';
import firebase from '../database/firebase';
import { getDatabase, ref, push, update } from 'firebase/database';
import { FaHeart } from 'react-icons/fa';
import { successAlert, errorAlert } from '../utils/alerts';

const AddToWishlistButton = ({ game }) => {
  const addToWishlist = (game) => {
    const db = getDatabase(firebase);
    const wishlistRef = ref(db, '/wishlist');
    const newGameKey = push(wishlistRef).key;
    update(wishlistRef, { [newGameKey]: game })
      .then(() => {
        successAlert(`${game.name} has been added to your wishlist!`);
      })
      .catch((err) => {
        errorAlert(`Error: ${err}`);
      });
  };
  return (
    <button
      className='button'
      aria-label='add to wishlist'
      onClick={() => {
        addToWishlist(game);
      }}
    >
      <FaHeart />
    </button>
  );
};

export default AddToWishlistButton;
