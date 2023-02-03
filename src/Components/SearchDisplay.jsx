import React from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
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
                  const {
                    id,
                    name,
                    url,
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
                        <img
                          src={image}
                          alt={name}
                        />
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
