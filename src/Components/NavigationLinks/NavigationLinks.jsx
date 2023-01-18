/* eslint-disable max-len */
import {Link} from 'react-router-dom';
import './NavigationLinks.css';
import {useSearchParams} from 'react-router-dom';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {
  faSearch,
  faStar,
  faAngleDoubleRight,
  faRightFromBracket,
} from '@fortawesome/free-solid-svg-icons';

export default function NavigationLinks() {
  const [searchParams] = useSearchParams();
  const userName = searchParams.get('username');

  return (
    <nav className="navbar">
      <ul className="navbar-nav">
        <li className="logo">
          <div className="nav-link">
            <span className="link-text logo-text">Welcome, {userName}</span>
            <FontAwesomeIcon icon={faAngleDoubleRight} size="xl" />
          </div>
        </li>
        <li className="nav-item">
          <Link className="page_link nav-link" to={`/search?username=${userName}`}>
            <FontAwesomeIcon icon={faSearch} size="xl" />
            <span className="link-text">Search</span>
          </Link>
        </li>
        <li className="nav-item">
          <Link className="page_link nav-link" to={`/wishlist?username=${userName}`}>
            <FontAwesomeIcon icon={faStar} size="xl" />
            <span className="link-text">Wish List</span>
          </Link>
        </li>
        <li className="nav-item">
          <Link className="page_link nav-link" to={`/`}>
            <FontAwesomeIcon icon={faRightFromBracket} size="xl" />
            <span className="link-text">Log Out</span>
          </Link>
        </li>
      </ul>
    </nav>
  );
}
