import React from 'react';
import { Link } from 'react-router-dom';

const CollectionDisplay = ({ collection, removeFromCollection }) => {
  return (
    <div className='collection-display text-center'>
      <div className='container'>
        <h2>Collection</h2>
        <div className='collection-list'>
          {collection.map((game) => {
            const {
              id,
              key,
              name,
              images: { small: image },
            } = game;
            return (
              <div
                key={key}
                className='collection-card'
              >
                <div className='img-container'>
                  <img
                    src={image}
                    alt={name}
                  />
                </div>
                <div className='game-info'>
                  <div className='bold text-center'>{name}</div>
                  <Link to={`/gameDetails/${id}`}>
                    <button className='button'>Details</button>
                  </Link>
                </div>
                <button
                  className='button'
                  onClick={() => {
                    removeFromCollection(key, name);
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
