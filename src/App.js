import React, { useState, useEffect } from 'react';
import axios from 'axios';
import firebase from './database/firebase';
import { getDatabase, ref, push, onValue, remove } from 'firebase/database';
import './App.scss';
import SearchDisplay from './Components/SearchDisplay';
import GameForm from './Components/GameForm';
import CollectionDisplay from './Components/CollectionDisplay';

function App() {
  const [searchResults, setSearchResults] = useState([]);
  const [collection, setCollection] = useState([]);
  useEffect(() => {
    const database = getDatabase(firebase);
    const collectionRef = ref(database, '/collection');
    console.log(database, collectionRef);
    onValue(collectionRef, (res) => {
      const data = res.val();
      const arr = [];
      for (let key in data) {
        arr.push({ key, ...data[key] });
      }
      setCollection(arr);
    });
    getGames('Catan');
  }, []);

  const getGames = (query) => {
    axios({
      method: 'get',
      url: 'https://api.boardgameatlas.com/api/search',
      responseType: 'json',
      params: {
        client_id: 'lmhaeyUdQ0',
        name: query,
      },
    }).then((res) => {
      setSearchResults(res.data.games);
    });
  };

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
      <h1>Board Game Vault</h1>
      <GameForm getGames={getGames} />
      <SearchDisplay searchResults={searchResults} addToCollection={addToCollection} addToWishlist={addToWishlist} />
      <CollectionDisplay collection={collection} removeFromCollection={removeFromCollection} />
    </div>
  );
}

export default App;
