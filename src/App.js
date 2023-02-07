import React, { useEffect, useContext } from 'react';
import firebase from './database/firebase';
import { getDatabase, ref, onValue } from 'firebase/database';
import { Routes, Route } from 'react-router-dom';
import './App.scss';
import SearchDisplay from './components/SearchDisplay';
import CollectionDisplay from './components/CollectionDisplay';
import Home from './components/Home';
import Wishlist from './components/WishlistDisplay';
import GameDetails from './components/GameDetails';
import Footer from './components/Footer';
import Header from './components/Header';
import ErrorPage from './components/ErrorPage';
import { AppContext } from './components/context/AppContext';
import fetchGames from './utils/services';

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
        setSearchResults(res.data.games);
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
          element={<Home />}
        />
        <Route
          path='/search'
          element={
            <>
              <SearchDisplay />
            </>
          }
        />
        <Route
          path='/collection'
          element={<CollectionDisplay />}
        />
        <Route
          path='/gameDetails/:gameId'
          element={<GameDetails />}
        />

        <Route
          path='/wishlist'
          element={<Wishlist />}
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
