import React from 'react';
import firebase from '../database/firebase';
import { getDatabase, ref, push, update } from 'firebase/database';
import { FaPlus } from 'react-icons/fa';
import { errorAlert, successAlert } from '../utils/alerts';

const AddToCollectionButton = ({ game }) => {
  const addToCollection = (game) => {
    const db = getDatabase(firebase);
    const collectionRef = ref(db, '/collection');
    const newGameKey = push(collectionRef).key;
    update(collectionRef, { [newGameKey]: game })
      .then(() => {
        successAlert(`${game.name} has been added to your collection!`);
      })
      .catch((err) => {
        errorAlert(`Error: ${err}`);
      });
  };
  return (
    <button
      className='button'
      aria-label='add to collection'
      onClick={() => {
        addToCollection(game);
      }}
    >
      <FaPlus />
    </button>
  );
};

export default AddToCollectionButton;
