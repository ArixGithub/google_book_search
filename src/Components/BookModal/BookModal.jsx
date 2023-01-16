import Modal from 'react-modal';
import './BookModal.css';

Modal.setAppElement(document.body);

export default function BookModal({book, onRequestClose, wishList, setWishList}) {
    if(!book) return;

    const isBookAlreadyWishListed = wishList?.map(wishBook => wishBook.id)?.includes(book.id);
    const {title, description, authors, publishedDate, imageLinks} = book.volumeInfo;

    return <Modal
                isOpen={true} 
                onRequestClose={onRequestClose}
            >
                <div className="book_info">
                    <div>
                        <h2>Book Title: {title}</h2>
                        {description && <p>Description: {description}</p>}
                        {authors && <div>Authors: {authors}</div>}
                        {publishedDate && <div>Publish Year: {publishedDate}</div>}
                    </div>
                    <img src={imageLinks.thumbnail} alt="not Found"/>
                </div>
                <button 
                    className='book_modal_button' 
                    onClick={() => {
                        setWishList(prevWishList => {
                            if(isBookAlreadyWishListed)
                            {
                                return prevWishList.filter(wishBook=> wishBook.id !== book.id);
                            }
                            
                            return [...prevWishList, book]
                        });
                    }}>
                    {isBookAlreadyWishListed ? "Remove From WishList" : "Add to Wishlist"}
                </button>
            </Modal>;
}