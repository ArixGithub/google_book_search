import React, {useEffect, useState} from 'react';
import BookModal from '../../Components/BookModal/BookModal';
import NavigationLinks from '../../Components/NavigationLinks/NavigationLinks';
import './SearchPage.css';

const SearchPage = ({wishList, setWishList}) => {
  const [books, setBooks] = useState([]);
  const [searchString, setSearchString] = useState('');
  const [pageNumber, setPageNumber] = useState(0);
  const [selectedBook, setSelectedBook] = useState(null);
  const MAX_NUMBER_OF_BOOKS = 20;

  useEffect(() => {
    if (!!searchString) {
      fetch(
        `https://www.googleapis.com/books/v1/volumes?q=${searchString}&maxResults=${MAX_NUMBER_OF_BOOKS}&startIndex=${
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
  }, [pageNumber, searchString]);

  return (
    <>
      <NavigationLinks />
      <label>
        Search for books:
        <input
          type="text"
          onChange={(e) => {
            setSearchString(e.target.value);
          }}
        />
      </label>
      <ul>
        {books?.map((book) => (
          <li
            key={book.id}
            onClick={() => {
              setSelectedBook(book);
            }}
          >
            {book.volumeInfo.title}
          </li>
        ))}
      </ul>
      <BookModal
        book={selectedBook}
        onRequestClose={() => {
          setSelectedBook(null);
        }}
        setWishList={setWishList}
        wishList={wishList}
      />
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
    </>
  );
};

export default SearchPage;
