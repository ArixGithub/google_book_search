import {Link} from 'react-router-dom';
import './NavigationLinks.css';
import {useSearchParams} from 'react-router-dom';

export default function NavigationLinks()
{
    const [searchParams] = useSearchParams();
    const userName = searchParams.get('username');

    return  <>
                <div className='page_links'>
                    <Link className='page_link' to={`/search?username=${userName}`}>Search</Link>
                    <Link className='page_link' to={`/wishlist?username=${userName}`}>Wish List</Link>
                </div>
                <h1>Welcome, {userName}</h1>
            </>
}