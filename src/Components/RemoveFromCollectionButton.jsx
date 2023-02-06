import React from 'react';
import firebase from '../database/firebase';
import { getDatabase, ref, update } from 'firebase/database';
import { toast } from 'react-toastify';
import { FaMinus } from 'react-icons/fa';

const RemoveFromCollectionButton = ({ game }) => {
  const removeFromCollection = (key, gameName) => {
    const db = getDatabase(firebase);
    const collectionRef = ref(db, '/collection');
    update(collectionRef, { [key]: null })
      .then(() => {
        toast(`${gameName} has been removed from your collection!`);
      })
      .catch((err) => {
        toast(`Database Error: ${err}`);
      });
  };
  return (
    <button
      className='button'
      aria-label='remove from collection'
      onClick={() => {
        removeFromCollection(game.key, game.name);
      }}
    >
      <FaMinus />
    </button>
  );
};

export default RemoveFromCollectionButton;
