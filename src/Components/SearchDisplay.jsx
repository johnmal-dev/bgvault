import React from 'react';
import './SearchDisplay.scss';

const SearchDisplay = ({ searchResults, addToCollection }) => {
  return (
    <div className='container'>
      <div className='search-display'>
        <h2>Search Results</h2>
        <table className='search-table'>
          <thead>
            <tr>
              <th></th>
              <th>Title</th>
              <th>Players</th>
              <th>Playtime (min)</th>
              <th>Avg Rating</th>
              <th>Num Voters</th>
              <th>Price</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {searchResults.map((game) => {
              return (
                <tr key={game.id} className='search-row'>
                  <td className='game-img-container'>
                    <img src={game.images.small} alt={game.name} />
                  </td>
                  <td className='game-info'>
                    <div>
                      <a href={game.url} className='bold'>
                        {game.name}
                      </a>{' '}
                      <span className='italic'>({game.year_published})</span>
                    </div>
                    <div className='game-description'>{game.description_preview.split(' ').length <= 20 ? game.description_preview : game.description_preview.split(' ').slice(0, 20).join(' ') + '...'}</div>
                  </td>
                  <td className='game-players'>{game.players}</td>
                  <td className='game-playtime'>{game.playtime}</td>
                  <td className='game-rating'>{game.average_user_rating.toFixed(2)}</td>
                  <td className='game-votes'>{game.num_user_ratings}</td>
                  <td className='game-price'>{game.price_text}</td>
                  <td className='game-buttons'>
                    <button onClick={() => addToCollection(game)}>Add</button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SearchDisplay;
