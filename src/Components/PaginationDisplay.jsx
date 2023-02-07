import React, { useState, useEffect, useId, useContext } from 'react';
import { AppContext } from './context/AppContext';

const PaginationDisplay = () => {
  const { itemsPerPage, setItemsPerPage, searchCount, setItemOffset } = useContext(AppContext);
  const [pages, setPages] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const selectId = useId();

  useEffect(() => {
    const pageCount = Math.ceil(searchCount / itemsPerPage);
    const newPages = [];

    const handlePageClick = (pageIndex) => {
      const newOffset = pageIndex * itemsPerPage;
      setCurrentPage(pageIndex + 1);
      setItemOffset(newOffset);
    };

    for (let i = 0; i < pageCount; i++) {
      const pageNumber = i + 1;
      newPages.push(
        <div
          key={i}
          onClick={() => handlePageClick(i)}
          style={{ textDecoration: currentPage === pageNumber && 'underline' }}
        >
          {pageNumber}
        </div>
      );
    }
    setPages(newPages);
  }, [itemsPerPage, searchCount, setItemOffset, currentPage]);

  const handleItemsPerPageClick = (e) => {
    setItemOffset(0);
    setItemsPerPage(e.target.value);
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
              onChange={handleItemsPerPageClick}
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
