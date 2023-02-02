import React from 'react';
import './CollectionDisplay.scss';

const CollectionDisplay = ({ collection, removeFromCollection }) => {
  return (
    <div className='container'>
      <div className='collection-display'>
        <h2>Collection</h2>
        <div className='collection-list'>
          {collection.map((game) => {
            return (
              <div key={game.key} className='collection-card'>
                <div className='img-container'>
                  <img src={game.images.small} alt={game.name} />
                </div>
                <div className='game-info'>
                  <div>{game.name}</div>
                </div>
                <button onClick={() => removeFromCollection(game.key)}>Remove</button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CollectionDisplay;
