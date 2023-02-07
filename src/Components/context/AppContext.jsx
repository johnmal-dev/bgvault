import React, { createContext, useState } from 'react';

export const AppContext = createContext();

const ContextApp = ({ children }) => {
  const [searchResults, setSearchResults] = useState([]);
  const [collection, setCollection] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [searchCount, setSearchCount] = useState(0);
  const [gameQuery, setGameQuery] = useState('');
  const [itemsPerPage, setItemsPerPage] = useState(25);
  const [itemOffset, setItemOffset] = useState(0);
  return (
    <AppContext.Provider
      value={{
        searchResults,
        setSearchResults,
        collection,
        setCollection,
        wishlist,
        setWishlist,
        searchCount,
        setSearchCount,
        gameQuery,
        setGameQuery,
        itemsPerPage,
        setItemsPerPage,
        itemOffset,
        setItemOffset,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default ContextApp;
