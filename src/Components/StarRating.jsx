import React, { useEffect, useState, useContext } from 'react';

import { getDatabase, ref, update } from 'firebase/database';

import { AppContext } from './context/AppContext';
import firebase from '../database/firebase';
import { FaStar } from 'react-icons/fa';
import { errorAlert, successAlert } from '../utils/alerts';

const StarRating = ({ game }) => {
  const [rating, setRating] = useState(0);
  const [hoverFill, setHoverFill] = useState(null);
  const { isInCollection, collection } = useContext(AppContext);

  useEffect(() => {
    if (isInCollection(game.id)) {
      const gameRating = collection.filter((item) => item.id === game.id)[0].rating || 0;
      setRating(gameRating);
    }
  }, [rating, collection, game.id, isInCollection]);

  const updateRating = (newRating) => {
    const db = getDatabase(firebase);
    // get key for the current game
    const gameDbKey = collection.filter((item) => item.id === game.id)[0].key;
    // add the rating to the db
    const gameRef = ref(db, 'collection/' + gameDbKey);
    update(gameRef, { rating: newRating })
      .then(() => {
        successAlert('Rating updated!');
      })
      .catch((err) => {
        errorAlert(`Error: ${err}`);
      });
  };

  return (
    <>
      {isInCollection(game.id) && (
        <div className='stars'>
          {[...Array(5)].map((_, index) => {
            const ratingValue = index + 1;
            return (
              <button
                className='star-button'
                key={index}
                onMouseEnter={() => setHoverFill(ratingValue)}
                onMouseLeave={() => setHoverFill(null)}
                onClick={() => updateRating(ratingValue)}
              >
                <FaStar
                  className='star-icon'
                  size={100}
                  style={{
                    color: ratingValue <= (hoverFill || rating) ? '#464c58' : '#dce0e9',
                  }}
                  value={ratingValue}
                />
              </button>
            );
          })}
        </div>
      )}
    </>
  );
};

export default StarRating;
