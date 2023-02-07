import React, { useContext } from 'react';
import { AppContext } from './context/AppContext';
import RemoveFromCollectionButton from './RemoveFromCollectionButton';
import AddToCollectionButton from './AddToCollectionButton';

const CollectionToggle = ({ game }) => {
  const { isInCollection } = useContext(AppContext);
  return <div>{isInCollection(game.id) ? <RemoveFromCollectionButton game={game} /> : <AddToCollectionButton game={game} />}</div>;
};

export default CollectionToggle;
