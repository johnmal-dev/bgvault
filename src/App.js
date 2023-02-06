import React, { useState, useEffect } from 'react';
import axios from 'axios';
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
import { ToastContainer } from 'react-toastify';

function App() {
  const [searchResults, setSearchResults] = useState([]);
  const [collection, setCollection] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [searchCount, setSearchCount] = useState(0);
  const [gameQuery, setGameQuery] = useState('');
  const [itemsPerPage, setItemsPerPage] = useState(25);
  const [itemOffset, setItemOffset] = useState(0);

  useEffect(() => {
    const database = getDatabase(firebase);
    const collectionRef = ref(database, '/collection');
    const wishlistRef = ref(database, '/wishlist');
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
  }, []);

  useEffect(() => {
    const getGames = async () => {
      try {
        const res = await axios({
          method: 'get',
          url: 'https://api.boardgameatlas.com/api/search',
          responseType: 'json',
          params: {
            client_id: 'lmhaeyUdQ0',
            name: gameQuery,
            skip: itemOffset,
            limit: itemsPerPage,
          },
        });
        setSearchCount(Math.min(res.data.count, 500));
        setSearchResults(res.data.games);
      } catch (err) {
        console.log(err);
      }
    };
    if (gameQuery) getGames();
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
              <SearchDisplay
                searchResults={searchResults}
                itemsPerPage={itemsPerPage}
                setItemsPerPage={setItemsPerPage}
                searchCount={searchCount}
                setItemOffset={setItemOffset}
                gameQuery={gameQuery}
                setGameQuery={setGameQuery}
              />
            </>
          }
        />
        <Route
          path='/collection'
          element={<CollectionDisplay collection={collection} />}
        />
        <Route
          path='/gameDetails/:gameId'
          element={<GameDetails isInCollection={isInCollection} />}
        />

        <Route
          path='/wishlist'
          element={<Wishlist wishlist={wishlist} />}
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
      <ToastContainer
        position='bottom-right'
        autoClose={1000}
        hideProgressBar
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable={false}
        pauseOnHover
        theme='dark'
      />
    </div>
  );
}

export default App;
