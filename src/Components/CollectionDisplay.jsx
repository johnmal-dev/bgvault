import React, { useContext, useEffect } from 'react';

import CollectionCard from './CollectionCard';
import { AppContext } from './context/AppContext';

const CollectionDisplay = ({ title }) => {
  const { collection } = useContext(AppContext);

  useEffect(() => {
    document.title = title;
  }, [title]);

  return (
    <div className='collection-display text-center'>
      <div className='container'>
        <h2>Collection</h2>
        <div className='collection-list'>
          {collection.map((game) => {
            return (
              <CollectionCard
                game={game}
                key={game.key}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CollectionDisplay;
