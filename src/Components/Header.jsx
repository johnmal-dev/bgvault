import React from 'react';
import './Header.scss';
import NavBar from './NavBar';

const Header = () => {
  return (
    <header className='header'>
      <h1 className='text-center'>Board Game Vault</h1>
      <NavBar />
    </header>
  );
};

export default Header;
