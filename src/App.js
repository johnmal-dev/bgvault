import React, { useState, useEffect } from 'react';
import axios from 'axios';
import firebase from './database/firebase';
import { getDatabase, ref, push, onValue, update } from 'firebase/database';
import { Routes, Route } from 'react-router-dom';
import './App.scss';
import SearchDisplay from './Components/SearchDisplay';
import CollectionDisplay from './Components/CollectionDisplay';
import Home from './Components/Home';
import Wishlist from './Components/Wishlist';
import GameDetails from './Components/GameDetails';
import Footer from './Components/Footer';
import Header from './Components/Header';
import ErrorPage from './Components/ErrorPage';
import { ToastContainer, toast } from 'react-toastify';

function App() {
  const [searchResults, setSearchResults] = useState([]);
  const [collection, setCollection] = useState([]);
  const [searchCount, setSearchCount] = useState(0);
  const [gameQuery, setGameQuery] = useState('');
  const [itemsPerPage, setItemsPerPage] = useState(25);
  const [itemOffset, setItemOffset] = useState(0);

  useEffect(() => {
    const database = getDatabase(firebase);
    const collectionRef = ref(database, '/collection');
    onValue(collectionRef, (res) => {
      console.log(res);
      const data = res.val();
      const arr = [];
      for (let key in data) {
        arr.push({ key, ...data[key] });
      }
      setCollection(arr);
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

  const addToCollection = (game) => {
    const db = getDatabase(firebase);
    const collectionRef = ref(db, '/collection');
    const newGameKey = push(collectionRef).key;
    update(collectionRef, { [newGameKey]: game })
      .then(() => {
        toast(`${game.name} has been added to your collection!`);
      })
      .catch((err) => {
        toast(`Database Error: ${err}`);
      });
  };

  const addToWishlist = (game) => {
    // TODO
    console.log('add to wishlist');
  };

  const removeFromCollection = (key, gameName) => {
    const db = getDatabase(firebase);
    const collectionRef = ref(db, '/collection');
    update(collectionRef, { [key]: null })
      .then(() => {
        toast(`${gameName} has been removed from your collection!`);
      })
      .catch((err) => {
        toast(`Database Error: ${err}`);
      });
  };

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
                addToCollection={addToCollection}
                addToWishlist={addToWishlist}
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
        <Route path='/collection'>
          <Route
            path=''
            element={
              <CollectionDisplay
                collection={collection}
                removeFromCollection={removeFromCollection}
              />
            }
          />
        </Route>
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
