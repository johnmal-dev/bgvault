import React from 'react';
import CollectionCard from './CollectionCard';

const CollectionDisplay = ({ collection }) => {
  return (
    <div className='collection-display text-center'>
      <div className='container'>
        <h2>Collection</h2>
        <div className='collection-list'>
          {collection.map((game) => {
            return <CollectionCard game={game} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default CollectionDisplay;
