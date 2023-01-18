import {Link} from 'react-router-dom';
import './NavigationLinks.css';
import {useSearchParams} from 'react-router-dom';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {
  faSearch,
  faStar,
  faBookReader,
  faRightFromBracket,
} from '@fortawesome/free-solid-svg-icons';
import React, {useContext} from 'react';
import {WishListContext} from '../../context/WishListContext';

function NavigationLinks() {
  const [searchParams] = useSearchParams();
  const {wishList} = useContext(WishListContext);
  const userName = searchParams.get('username');

  return (
    <nav className="navbar_container">
      <ul className="navbar_nav">
        <li className="logo">
          <div className="navbar_link">
            <span className="nav_link_text welcome_text">Welcome, {userName}</span>
            <FontAwesomeIcon icon={faBookReader} size="xl" />
          </div>
        </li>
        <li className="nav_item">
          <Link className="page_link navbar_link" to={`/search?username=${userName}`}>
            <FontAwesomeIcon icon={faSearch} size="xl" />
            <span className="nav_link_text">Search</span>
          </Link>
        </li>
        <li className="nav_item">
          <Link className="page_link navbar_link" to={`/wishlist?username=${userName}`}>
            <FontAwesomeIcon icon={faStar} size="xl" />
            <span className="nav_link_text">Wish List ({wishList?.length})</span>
          </Link>
        </li>
        <li className="nav_item">
          <Link className="page_link navbar_link" to={`/`}>
            <FontAwesomeIcon icon={faRightFromBracket} size="xl" />
            <span className="nav_link_text">Log Out</span>
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default React.memo(NavigationLinks);
