import Modal from 'react-modal';
import './BookModal.css';

Modal.setAppElement(document.body);

export default function BookModal({book, onRequestClose, wishList, setWishList}) {
  if (!book) return;

  const isBookAlreadyWishListed = wishList?.map((wishBook) => wishBook.id)?.includes(book.id);
  const {title, description, authors, publishedDate, imageLinks} = book.volumeInfo;

  return (
    <Modal
      isOpen={true}
      onRequestClose={onRequestClose}
      style={{
        overlay: {
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(255, 255, 255, 0.75)',
        },
        content: {
          background: 'white',
          borderRadius: '10px',
          outline: 'none',
          boxShadow: '0px 3px 10px red',
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
