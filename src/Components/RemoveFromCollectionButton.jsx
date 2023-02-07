import React, { useContext } from 'react';
import firebase from '../database/firebase';
import { getDatabase, ref, update } from 'firebase/database';
import { FaMinus } from 'react-icons/fa';
import { successAlert, errorAlert, deletePrompt } from '../utils/alerts';
import { AppContext } from './context/AppContext';

const RemoveFromCollectionButton = ({ game, children }) => {
  const { collection } = useContext(AppContext);
  const keyFromCollection = collection.filter((item) => item.id === game.id)[0].key;
  const removeFromCollection = (key) => {
    const db = getDatabase(firebase);
    const collectionRef = ref(db, '/collection');
    update(collectionRef, { [key]: null })
      .then(() => {
        successAlert(`${game.name} has been removed from your collection!`);
      })
      .catch((err) => {
        errorAlert(`Error: ${err}`);
      });
  };

  const handleClick = () => {
    deletePrompt(keyFromCollection, game.name, 'collection', removeFromCollection);
  };
  return (
    <button
      className='button'
      aria-label='remove from collection'
      onClick={handleClick}
    >
      <FaMinus />
      {children}
    </button>
  );
};

export default RemoveFromCollectionButton;
