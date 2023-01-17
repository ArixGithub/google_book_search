import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import './WelcomeScreen.css';

const WelcomeScreen = ({userName, setUsername}) => {
  const [error, setError] = useState('');
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

  return (
    <form onSubmit={handleSubmit} className={'welcome_page'}>
      <label>
        Username:
        <input type="text" value={userName} onChange={(e) => setUsername(e.target.value)} />
      </label>
      {error && <p>{error}</p>}
      <button type="submit">Continue</button>
    </form>
  );
};

export default WelcomeScreen;
