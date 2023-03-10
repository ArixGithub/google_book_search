import React, {useState, useContext, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import {WishListContext} from '../../context/WishListContext';
import './WelcomeScreen.css';

const WelcomeScreen = () => {
  const [error, setError] = useState('');
  const [userName, setUsername] = useState('');
  const {setWishList} = useContext(WishListContext);
  const navigate = useNavigate();

  function handleSubmit(event) {
    event.preventDefault();
    if (!userName) {
      setError('Please enter a username');
      return;
    }

    setError('');
    navigate(`/search?username=${userName}`);
  }

  useEffect(() => {
    setWishList([]);
  }, []);

  return (
    <form onSubmit={handleSubmit} className={'page'}>
      <label>
        <b>Please Enter a Username:</b>
        <input
          type="text"
          value={userName}
          onChange={(e) => setUsername(e.target.value)}
          className="input_styling"
        />
      </label>
      {error && <p>{error}</p>}
      <button type="submit">Enter</button>
    </form>
  );
};

export default WelcomeScreen;
