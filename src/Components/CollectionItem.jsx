import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getDatabase, ref, onValue } from 'firebase/database';
import firebase from '../database/firebase';
import './CollectionItem.scss';

const CollectionItem = () => {
  const [game, setGame] = useState({});
  const { gameId } = useParams();

  useEffect(() => {
    const database = getDatabase(firebase);
    const gameRef = ref(database, `/collection/${gameId}`);
    onValue(gameRef, (res) => {
      const data = res.val();
      console.log(data);
      setGame(data);
    });
  }, [gameId]);
  return (
    <>
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
