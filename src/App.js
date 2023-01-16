import React, {useState} from 'react';
import {Routes ,Route ,BrowserRouter} from 'react-router-dom';
import WelcomeScreen from './Pages/WelcomePage/WelcomeScreen';
import SearchPage from './Pages/SearchPage/SearchPage';
import WishListPage from './Pages/WishListPage/WishListPage';

function App() {
  const [wishList, setWishList] = useState([]);
  const [userName, setUsername] = useState('');

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" exact element={<WelcomeScreen userName={userName} setUsername={setUsername} />}></Route>
        <Route path="/search" element={<SearchPage wishList={wishList} setWishList={setWishList}/>} />
        <Route path="/wishlist" element={<WishListPage  wishList={wishList} setWishList={setWishList}/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;