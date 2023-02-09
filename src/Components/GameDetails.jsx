import React, { useState, useEffect } from 'react';

import axios from 'axios';
import { useParams, Navigate } from 'react-router-dom';

import CollectionToggle from './CollectionToggle';
import StarRating from './StarRating';
import { errorAlert } from '../utils/alerts';
import WishlistToggle from './WishlistToggle';

const GameDetails = () => {
  const [game, setGame] = useState({});
  const [shouldRedirect, setShouldRedirect] = useState(false);
  const { gameId } = useParams();

  useEffect(() => {
    const getGame = async () => {
      try {
        const res = await axios({
          method: 'get',
          url: 'https://api.boardgameatlas.com/api/search',
          responseType: 'json',
          params: {
            client_id: 'lmhaeyUdQ0',
            ids: gameId,
          },
        });
        const gameData = res.data.games[0];
        if (gameData) {
          setGame(gameData);
          document.title = `BGV - ${gameData.name}`;
        } else {
          setShouldRedirect(true);
        }
      } catch (err) {
        errorAlert(`Error: ${err}`);
      }
    };
    getGame();
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
        <div className='game-details'>
          <div className='container'>
            <div className='img-container'>
              <img
                src={game.images.medium}
                alt={game.name}
              />
            </div>
            <div className='game-buttons'>
              <CollectionToggle game={game} />
              <WishlistToggle game={game} />
            </div>
            <StarRating game={game} />
            <h2 className='game-title'>
              {game.name} ({game.year_published})
            </h2>
            <div className='text-container'>
              <div className='game-stats'>
                <div>Players: {game.players}</div>
                <div>Playtime: {game.playtime}</div>
                <div>Age: {game.min_age}+</div>
                {game.average_strategy_complexity > 0 && <div>Complexity: {game.average_strategy_complexity.toFixed(2)}</div>}
              </div>
              <div className='game-description'>Description: {game.description_preview.split(' ').length <= 50 ? game.description_preview : game.description_preview.split(' ').slice(0, 50).join(' ') + '...'}</div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default GameDetails;
