import React from 'react';
import { Link } from 'react-router-dom';
import HomeCard from './HomeCard';

const Home = () => {
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
          <Link to='/'>
            <HomeCard title='randomize' />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
