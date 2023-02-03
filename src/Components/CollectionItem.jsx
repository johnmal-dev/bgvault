import React, { useState, useEffect } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { getDatabase, ref, onValue } from 'firebase/database';
import firebase from '../database/firebase';

const CollectionItem = () => {
  const [game, setGame] = useState({});
  const [shouldRedirect, setShouldRedirect] = useState(false);
  const { gameId } = useParams();

  useEffect(() => {
    const database = getDatabase(firebase);
    const gameRef = ref(database, `/collection/${gameId}`);
    onValue(gameRef, (res) => {
      const data = res.val();
      console.log(data);
      if (data) {
        setGame(data);
      } else {
        setShouldRedirect(true);
      }
    });
  }, [gameId]);
  return (
    <>
      {shouldRedirect && (
        <Navigate
          replace
          to='/404'
        />
      )}
      {Object.keys(game).length > 0 && (
        <div className='collection-item'>
          <div className='container'>
            <div className='img-container'>
              <img
                src={game.images.medium}
                alt={game.name}
              />
            </div>
            <h2>{game.name}</h2>
            <div className='game-description'>{game.description_preview.split(' ').length <= 50 ? game.description_preview : game.description_preview.split(' ').slice(0, 50).join(' ') + '...'}</div>
          </div>
        </div>
      )}
    </>
  );
};

export default CollectionItem;
