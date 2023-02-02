import React, { useState, useEffect, useId } from 'react';
import './PaginationDisplay.scss';

const PaginationDisplay = ({ itemsPerPage, setItemsPerPage, searchCount, setItemOffset, searchResults }) => {
  const [pages, setPages] = useState([]);
  const selectId = useId();

  useEffect(() => {
    const pageCount = Math.ceil(searchCount / itemsPerPage);
    const newPages = [];

    for (let i = 0; i < pageCount; i++) {
      const currentPage = i + 1;
      newPages.push(
        <div
          key={i}
          onClick={() => handlePageClick(i)}
        >
          {currentPage}
        </div>
      );
    }
    setPages(newPages);
  }, [itemsPerPage, searchResults]);

  const handlePageClick = (pageIndex) => {
    const newOffset = pageIndex * itemsPerPage;
    setItemOffset(newOffset);
  };

  return (
    <div className='pagination'>
      <div className='container'>
        <div className='page-numbers'>{pages}</div>
        <form action='#'>
          <label>
            Items Per Page:
            <select
              name='itemsPerPage'
              id={selectId}
              onChange={(e) => setItemsPerPage(e.target.value)}
              value={itemsPerPage}
            >
              <option value='25'>25</option>
              <option value='50'>50</option>
              <option value='75'>75</option>
              <option value='100'>100</option>
            </select>
          </label>
        </form>
      </div>
    </div>
  );
};

export default PaginationDisplay;
