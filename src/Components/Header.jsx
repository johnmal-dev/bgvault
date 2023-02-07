import React from 'react';
import NavBar from './NavBar';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className='header'>
      <Link to='/'>
        <h1 className='text-center'>Board Game Vault</h1>
      </Link>
      <NavBar />
    </header>
  );
};

export default Header;
