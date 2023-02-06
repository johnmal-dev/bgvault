import React from 'react';
import firebase from '../database/firebase';
import { getDatabase, ref, push, update } from 'firebase/database';
import { toast } from 'react-toastify';
import { FaHeart } from 'react-icons/fa';

const AddToWishlistButton = ({ game }) => {
  const addToWishlist = (game) => {
    const db = getDatabase(firebase);
    const wishlistRef = ref(db, '/wishlist');
    const newGameKey = push(wishlistRef).key;
    update(wishlistRef, { [newGameKey]: game })
      .then(() => {
        toast(`${game.name} has been added to your wishlist!`);
      })
      .catch((err) => {
        toast(`Database Error: ${err}`);
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
