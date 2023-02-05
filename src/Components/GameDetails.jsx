import React, { useState, useEffect } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import axios from 'axios';

const GameDetails = () => {
  const [game, setGame] = useState({});
  const [shouldRedirect, setShouldRedirect] = useState(false);
  const { gameId } = useParams();

  useEffect(() => {
    const getGame = async () => {
      console.log('getting game');
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
        } else {
          setShouldRedirect(true);
        }
      } catch (err) {
        console.log(err);
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
            <h2>
              {game.name} ({game.year_published})
            </h2>
            <div className='text-container'>
              <div>Players: {game.players}</div>
              <div>Playtime: {game.playtime}</div>
              <div className='game-description'>Description: {game.description_preview.split(' ').length <= 50 ? game.description_preview : game.description_preview.split(' ').slice(0, 50).join(' ') + '...'}</div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default GameDetails;
