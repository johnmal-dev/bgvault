import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = () => {
  return (
    <div>
      <nav className='navbar'>
        <ul>
          <li>
            <Link to='/'>Home</Link>
          </li>
          <li>
            <Link to='/search'>Search</Link>
          </li>
          <li>
            <Link to='/collection'>Collection</Link>
          </li>
          <li>
            <Link to='/wishlist'>Wishlist</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default NavBar;
