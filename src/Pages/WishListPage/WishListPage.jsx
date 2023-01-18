import React, {useContext, useMemo} from 'react';
import NavigationLinks from '../../Components/NavigationLinks/NavigationLinks';
import {WishListContext} from '../../context/WishListContext';
import './WishListPage.css';

const WishListPage = () => {
  const {wishList, setWishList} = useContext(WishListContext);
  const wishedBooks = useMemo(() => {
    return wishList?.map((book) => (
      <li key={book.id}>
        <div className="wish_book_info">
          <img src={book.volumeInfo.imageLinks.thumbnail} alt="not Found" className="book_image" />
          <div className="book_title_author_info">
            <b>{book.volumeInfo.title}</b>
            <br></br>
            {book.volumeInfo.authors && `By ${book.volumeInfo.authors}`}
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
    ));
  }, [wishList]);

  return (
    <>
      <NavigationLinks />
      <ul className="wishlist_page page">{wishedBooks}</ul>
    </>
  );
};

export default React.memo(WishListPage);
