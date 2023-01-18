import React from 'react';
import NavigationLinks from '../../Components/NavigationLinks/NavigationLinks';
import './WishListPage.css';

const WishListPage = ({wishList, setWishList}) => {
  return (
    <>
      <NavigationLinks />
      <ul className="wishlist_page page">
        {wishList?.map((book) => (
          <li key={book.id} className="book_entry">
            <div className="wish_book_info">
              <img
                src={book.volumeInfo.imageLinks.thumbnail}
                alt="not Found"
                className="book_image"
              />
              <div>
                <b>{book.volumeInfo.title}</b>{' '}
                {book.volumeInfo.authors && ` By ${book.volumeInfo.authors}`}
              </div>
            </div>
            <button
              onClick={() => {
                setWishList((prevWishList) =>
                  prevWishList.filter((wishBook) => wishBook.id !== book.id),
                );
              }}
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
    </>
  );
};

export default WishListPage;
