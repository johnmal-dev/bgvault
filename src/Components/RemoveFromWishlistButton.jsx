import React, { useContext } from 'react';
import firebase from '../database/firebase';
import { getDatabase, ref, update } from 'firebase/database';
import { FaHeartBroken } from 'react-icons/fa';
import { successAlert, errorAlert, deletePrompt } from '../utils/alerts';
import { AppContext } from './context/AppContext';

const RemoveFromWishlistButton = ({ game, children }) => {
  const { wishlist } = useContext(AppContext);
  const keyFromWishlist = wishlist.filter((item) => item.id === game.id)[0].key;
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
    deletePrompt(keyFromWishlist, game.name, 'wishlist', removeFromWishlist);
  };
  return (
    <button
      className='button'
      aria-label='remove from wishlist'
      onClick={handleClick}
    >
      <FaHeartBroken />
      {children}
    </button>
  );
};

export default RemoveFromWishlistButton;
