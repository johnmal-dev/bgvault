import React from 'react';
import './SearchDisplay.scss';

const SearchDisplay = ({ searchResults, addToCollection }) => {
  return (
    <div className='container'>
      <div className='search-display'>
        <h2>Search Results</h2>
        <div className='search-list'>
          {searchResults.map((game) => {
            // console.log(game);
            return (
              <div key={game.id} className='search-card'>
                <div className='img-container'>
                  <img src={game.images.small} alt={game.name} />
                </div>
                <div className='game-info'>
                  <div>{game.name}</div>
                </div>
                <button onClick={() => addToCollection(game)}>Add</button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default SearchDisplay;
