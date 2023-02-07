import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import PaginationDisplay from './PaginationDisplay';
import SearchForm from './SearchForm';
import GameDetailsButton from './GameDetailsButton';
import { AppContext } from './context/AppContext';
import CollectionToggle from './CollectionToggle';
import WishlistToggle from './WishlistToggle';

const SearchDisplay = () => {
  const { searchResults, searchCount, setGameQuery } = useContext(AppContext);
  return (
    <div className='search-display'>
      <div className='container'>
        <h2 className='text-center'>Search</h2>
        <SearchForm />
        <button
          className='button'
          onClick={() => {
            setGameQuery('game');
          }}
        >
          What's Popular?
        </button>
        <div className='search-results'>
          {searchCount > 0 && (
            <>
              <PaginationDisplay />
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
                  {searchResults &&
                    searchResults.map((game) => {
                      const {
                        id,
                        name,
                        year_published,
                        description_preview,
                        players,
                        playtime,
                        average_user_rating,
                        num_user_ratings,
                        price_text,
                        images: { small: image },
                      } = game;
                      return (
                        <tr
                          key={id}
                          className='search-row'
                        >
                          <td className='game-img-container'>
                            <Link
                              to={`/gameDetails/${id}`}
                              className='bold'
                            >
                              <img
                                src={image}
                                alt={name}
                              />
                            </Link>
                          </td>
                          <td className='game-info'>
                            <div>
                              <Link
                                to={`/gameDetails/${id}`}
                                className='bold'
                              >
                                {name}
                              </Link>{' '}
                              <span className='italic'>({year_published})</span>
                            </div>
                            <div className='game-description'>{description_preview.split(' ').length <= 20 ? description_preview : description_preview.split(' ').slice(0, 20).join(' ') + '...'}</div>
                          </td>
                          <td className='game-players'>{players}</td>
                          <td className='game-playtime'>{playtime}</td>
                          <td className='game-rating'>{average_user_rating.toFixed(2)}</td>
                          <td className='game-votes'>{num_user_ratings}</td>
                          <td className='game-price'>{price_text}</td>
                          <td className='game-buttons'>
                            <Link to={`/gameDetails/${id}`}>
                              <GameDetailsButton>
                                <div className='button-text'>Details</div>
                              </GameDetailsButton>
                            </Link>
                            <CollectionToggle game={game} />
                            <WishlistToggle game={game} />
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
              <PaginationDisplay />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchDisplay;
