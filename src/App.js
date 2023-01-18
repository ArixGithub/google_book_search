import React, {useState} from 'react';
import {Routes, Route, BrowserRouter} from 'react-router-dom';
import WelcomeScreen from './Pages/WelcomePage/WelcomeScreen';
import SearchPage from './Pages/SearchPage/SearchPage';
import WishListPage from './Pages/WishListPage/WishListPage';
import {WishListContext} from './context/WishListContext';
import './App.css';

function App() {
  const [wishList, setWishList] = useState([]);

  return (
    <WishListContext.Provider value={{wishList, setWishList}}>
      <BrowserRouter>
        <Routes>
          <Route path="/" exact element={<WelcomeScreen />}></Route>
          <Route path="/search" element={<SearchPage />} />
          <Route path="/wishlist" element={<WishListPage />} />
        </Routes>
      </BrowserRouter>
    </WishListContext.Provider>
  );
}

export default App;
