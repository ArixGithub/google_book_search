import Modal from 'react-modal';
import React, {useMemo, useContext} from 'react';
import './BookModal.css';
import {WishListContext} from '../../context/WishListContext';

function BookModal({book, onRequestClose}) {
  if (!book) return;
  const {wishList, setWishList} = useContext(WishListContext);

  const isBookAlreadyWishListed = useMemo(() => {
    return wishList?.map((wishBook) => wishBook.id)?.includes(book.id);
  }, [wishList]);
  const {title, description, authors, publishedDate, imageLinks} = book.volumeInfo;

  return (
    <Modal
      isOpen={true}
      onRequestClose={onRequestClose}
      style={{
        content: {
          background: 'white',
          borderRadius: '10px',
          outline: 'none',
          boxShadow: '0px 3px 10px red',
          maxHeight: '75%',
          height: 'fit-content',
        },
      }}
    >
      <div className="book_info">
        <div>
          <h2>Book Title: {title}</h2>
          {description && <p>Description: {description}</p>}
          {authors && <div>Authors: {authors}</div>}
          {publishedDate && <div>Publish Year: {publishedDate}</div>}
        </div>
        <img src={imageLinks.thumbnail} alt="not Found" className="book_image" />
      </div>
      <button
        className="book_modal_button"
        onClick={() => {
          setWishList((prevWishList) => {
            if (isBookAlreadyWishListed) {
              return prevWishList.filter((wishBook) => wishBook.id !== book.id);
            }

            return [...prevWishList, book];
          });
        }}
      >
        {isBookAlreadyWishListed ? 'Remove From WishList' : 'Add to Wishlist'}
      </button>
    </Modal>
  );
}

export default React.memo(BookModal);
