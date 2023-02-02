import React from 'react';
import './Footer.scss';

const Footer = () => {
  return (
    <footer className='footer'>
      Created by{' '}
      <a
        href='https://johnmal.dev/'
        target='_blank'
        rel='noreferrer'
      >
        John Malapit
      </a>{' '}
      at{' '}
      <a
        href='https://junocollege.com/'
        target='_blank'
        rel='noreferrer'
      >
        Juno College
      </a>{' '}
      2023
    </footer>
  );
};

export default Footer;
