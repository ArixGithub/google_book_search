import React from 'react';
import NavigationLinks from '../../Components/NavigationLinks/NavigationLinks';
import './WishListPage.css';

const WishListPage = ({wishList, setWishList}) => {
  return (
    <>
      <NavigationLinks />
      <ul>
        {wishList?.map((book) => (
          <div key={book.id} className="book_entry">
            <div>
              <b>{book.volumeInfo.title}</b>{' '}
              {book.volumeInfo.authors && `By ${book.volumeInfo.authors}`}
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
          </div>
        ))}
      </ul>
    </>
  );
};

export default WishListPage;
