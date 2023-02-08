import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import HomeCard from './HomeCard';
import fetchGames from '../utils/services';

const Home = ({ title }) => {
  const [randomId, setRandomId] = useState(0);
  useEffect(() => {
    document.title = title;
    const getRandomGame = async () => {
      try {
        const res = await fetchGames({ random: true });
        setRandomId(res.data.games[0].id);
      } catch (err) {
        console.log(err);
      }
    };
    getRandomGame();
  }, [title]);
  return (
    <div className='home'>
      <div className='container'>
        <h2 className='text-center'>Welcome to Board Game Vault!</h2>
        <div className='cards'>
          <Link to='/search'>
            <HomeCard title='search' />
          </Link>
          <Link to='/collection'>
            <HomeCard title='collection' />
          </Link>
          <Link to='/wishlist'>
            <HomeCard title='wishlist' />
          </Link>
          <Link to={`/gameDetails/${randomId}`}>
            <HomeCard title='randomize' />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
