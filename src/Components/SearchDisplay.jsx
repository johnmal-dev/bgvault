import React from 'react';
import { toast } from 'react-toastify';
import './SearchDisplay.scss';
import 'react-toastify/dist/ReactToastify.css';
import { FaPlus, FaHeart } from 'react-icons/fa';
import PaginationDisplay from './PaginationDisplay';
import GameForm from './GameForm';

const SearchDisplay = ({ searchResults, addToCollection, addToWishlist, itemsPerPage, setItemsPerPage, searchCount, setItemOffset, gameQuery, setGameQuery }) => {
  return (
    <div className='container'>
      <h2 className='text-center'>Search</h2>
      <GameForm
        gameQuery={gameQuery}
        setGameQuery={setGameQuery}
      />
      <div className='search-display'>
        {searchCount > 0 && (
          <>
            <PaginationDisplay
              itemsPerPage={itemsPerPage}
              setItemsPerPage={setItemsPerPage}
              searchCount={searchCount}
              setItemOffset={setItemOffset}
            />
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
                    <tr
                      key={game.id}
                      className='search-row'
                    >
                      <td className='game-img-container'>
                        <img
                          src={game.images.small}
                          alt={game.name}
                        />
                      </td>
                      <td className='game-info'>
                        <div>
                          <a
                            href={game.url}
                            className='bold'
                          >
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
                        <button
                          className='button'
                          aria-label='add to collection'
                          onClick={() => {
                            addToCollection(game);
                            toast(`${game.name} has been added to your collection!`);
                          }}
                        >
                          <FaPlus />
                        </button>
                        <button
                          className='button'
                          aria-label='add to wishlist'
                          disabled
                          onClick={() => addToWishlist(game)}
                        >
                          <FaHeart />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <PaginationDisplay
              itemsPerPage={itemsPerPage}
              setItemsPerPage={setItemsPerPage}
              searchCount={searchCount}
              setItemOffset={setItemOffset}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default SearchDisplay;
