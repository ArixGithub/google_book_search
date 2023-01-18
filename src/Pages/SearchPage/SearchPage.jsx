import React, {useCallback, useEffect, useMemo, useState} from 'react';
import BookModal from '../../Components/BookModal/BookModal';
import NavigationLinks from '../../Components/NavigationLinks/NavigationLinks';
import './SearchPage.css';
import {useDebouncedCallback} from 'use-debounce';

const SearchPage = ({wishList, setWishList}) => {
  const [books, setBooks] = useState([]);
  const [searchString, setSearchString] = useState('');
  const [pageNumber, setPageNumber] = useState(0);
  const [selectedBook, setSelectedBook] = useState(null);
  const MAX_NUMBER_OF_BOOKS = 20;

  const handleNewSearch = useCallback(
    (newSearchString) => {
      if (newSearchString) {
        fetch(
          // eslint-disable-next-line max-len
          `https://www.googleapis.com/books/v1/volumes?q=${newSearchString}&maxResults=${MAX_NUMBER_OF_BOOKS}&startIndex=${
            pageNumber * MAX_NUMBER_OF_BOOKS
          }`,
        )
          .then((response) => response.json())
          .then((data) => {
            // we want to use 'data.totalItems' for pagination but we can't, for 2 reasons:
            // 1. The totalItems value is different every time for any new startIndex and maxResults.
            // 2. The totalItems value seems to be very inaccurate at best.
            // see: https://github.com/evdhiggins/book-inquiry
            setBooks(data.items);
          });
      }
    },
    [pageNumber],
  );

  const handleChange = useDebouncedCallback(handleNewSearch, 200);

  useEffect(() => {
    handleChange(searchString);
  }, [handleChange, searchString, handleNewSearch]);

  const bookList = useMemo(() => {
    return books?.map((book) => (
      <li
        key={book.id}
        onClick={() => {
          setSelectedBook(book);
        }}
      >
        <b>{book.volumeInfo.title}</b>
      </li>
    ));
  }, [books]);

  return (
    <>
      <NavigationLinks />
      <div className="search_page page">
        <label>
          <b>Search for books:</b>
          <input
            type="text"
            className="input_styling"
            onChange={(e) => {
              setSearchString(e.target.value);
            }}
          />
        </label>
        {!!books?.length && <ul className="book_list">{bookList}</ul>}
        {!!books?.length && (
          <div className="pagination_buttons">
            <button
              className="previous"
              disabled={pageNumber === 0} // disabled on the first page
              onClick={() => {
                setPageNumber((currentPage) => currentPage - 1);
              }}
            >
              Previous Page
            </button>
            <button
              className="next"
              disabled={books?.length < 19} // disabled when the page holds less than 20 books (hence no more books)
              onClick={() => {
                setPageNumber((currentPage) => currentPage + 1);
              }}
            >
              Next Page
            </button>
          </div>
        )}
      </div>
      <BookModal
        book={selectedBook}
        onRequestClose={() => {
          setSelectedBook(null);
        }}
        setWishList={setWishList}
        wishList={wishList}
      />
    </>
  );
};

export default React.memo(SearchPage);
