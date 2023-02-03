import React from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import './CollectionDisplay.scss';
import 'react-toastify/dist/ReactToastify.css';

const CollectionDisplay = ({ collection, removeFromCollection }) => {
  return (
    <div className='collection-display text-center'>
      <div className='container'>
        <h2>Collection</h2>
        <div className='collection-list'>
          {collection.map((game) => {
            return (
              <div
                key={game.key}
                className='collection-card'
              >
                <div className='img-container'>
                  <img
                    src={game.images.small}
                    alt={game.name}
                  />
                </div>
                <div className='game-info'>
                  <div className='bold text-center'>{game.name}</div>
                  <Link to={game.key}>
                    <button className='button'>Details</button>
                  </Link>
                </div>
                <button
                  onClick={() => {
                    removeFromCollection(game.key);
                    toast(`${game.name} has been removed from your collection.`);
                  }}
                >
                  Remove
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CollectionDisplay;
