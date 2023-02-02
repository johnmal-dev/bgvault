import React, { useState, useEffect } from 'react';
import axios from 'axios';
import firebase from './database/firebase';
import { getDatabase, ref, push, onValue, remove } from 'firebase/database';
import { Routes, Route } from 'react-router-dom';
import './App.scss';
import SearchDisplay from './Components/SearchDisplay';
import CollectionDisplay from './Components/CollectionDisplay';
import NavBar from './Components/NavBar';
import Home from './Components/Home';
import Wishlist from './Components/Wishlist';

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
        setSearchCount(Math.min(res.data.count, 1000));
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
    push(collectionRef, game);
  };

  const addToWishlist = (game) => {
    // TODO
    console.log('add to wishlist');
  };

  const removeFromCollection = (key) => {
    const db = getDatabase(firebase);
    const gameRef = ref(db, `/collection/${key}`);
    remove(gameRef);
  };

  return (
    <div className='App'>
      <h1 className='text-center'>Board Game Vault</h1>
      <NavBar />
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
        <Route
          path='/collection'
          element={
            <CollectionDisplay
              collection={collection}
              removeFromCollection={removeFromCollection}
            />
          }
        />
        <Route
          path='/wishlist'
          element={<Wishlist />}
        />
      </Routes>
    </div>
  );
}

export default App;
