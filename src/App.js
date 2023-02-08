import React, { useEffect, useContext } from 'react';
import firebase from './database/firebase';
import { getDatabase, ref, onValue } from 'firebase/database';
import { Routes, Route } from 'react-router-dom';
import './App.scss';
import SearchDisplay from './Components/SearchDisplay';
import CollectionDisplay from './Components/CollectionDisplay';
import Home from './Components/Home';
import Wishlist from './Components/WishlistDisplay';
import GameDetails from './Components/GameDetails';
import Footer from './Components/Footer';
import Header from './Components/Header';
import ErrorPage from './Components/ErrorPage';
import { AppContext } from './Components/context/AppContext';
import fetchGames from './utils/services';
import { errorAlert } from './utils/alerts';

function App() {
  const { setSearchResults, setCollection, setWishlist, setSearchCount, gameQuery, itemsPerPage, itemOffset } = useContext(AppContext);

  useEffect(() => {
    const database = getDatabase(firebase);
    const collectionRef = ref(database, 'collection');
    const wishlistRef = ref(database, 'wishlist');
    onValue(collectionRef, (res) => {
      const data = res.val();
      const arr = [];
      for (let key in data) {
        arr.push({ key, ...data[key] });
      }
      setCollection(arr);
    });
    onValue(wishlistRef, (res) => {
      const data = res.val();
      const arr = [];
      for (let key in data) {
        arr.push({ key, ...data[key] });
      }
      setWishlist(arr);
    });
  }, [setCollection, setWishlist]);

  useEffect(() => {
    const getGames = async () => {
      const params = {
        name: gameQuery,
        skip: itemOffset,
        limit: itemsPerPage,
      };
      if (gameQuery) {
        const res = await fetchGames(params);
        setSearchCount(Math.min(res.data.count, 500));
        const gamesData = res.data.games;
        if (gamesData.length) {
          setSearchResults(gamesData);
        } else {
          errorAlert(`No games found for ${gameQuery}`);
        }
      }
    };
    getGames();
    if (gameQuery) getGames();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [itemOffset, itemsPerPage, gameQuery]);

  return (
    <div className='App'>
      <Header />
      <Routes>
        <Route
          path='/'
          element={<Home title='BGV - Home' />}
        />
        <Route
          path='/search'
          element={
            <>
              <SearchDisplay title='BGV - Search' />
            </>
          }
        />
        <Route
          path='/collection'
          element={<CollectionDisplay title='BGV - Collection' />}
        />
        <Route
          path='/gameDetails/:gameId'
          element={<GameDetails />}
        />

        <Route
          path='/wishlist'
          element={<Wishlist title='BGV - Wishlist' />}
        />
        <Route
          path='/error'
          element={<ErrorPage />}
        />
        <Route
          path='*'
          element={<ErrorPage />}
        />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
