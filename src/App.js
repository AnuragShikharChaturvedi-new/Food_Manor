// src/App.js
import { Toaster } from 'react-hot-toast';
import React, { Suspense } from 'react';
import './App.css';
import Header from './components/Header';
import Body from './components/Body';
import Footer from './components/Footer';
import { Route, Routes } from 'react-router-dom';
import About from './components/About';
import Error from './components/Error';
import RestaurantMenu from './components/RestaurantMenu';
import Profile from './components/Profile';
import UserContext from './utils/UserContext';
import { lazy } from 'react';
import { useEffect, useState } from 'react';
import { Provider } from 'react-redux';
import appStore from './utils/appStore';
import Cart from './components/Cart';
import Contact from './components/Contact';

const Grocery = lazy(() => import('./components/Grocery'));

const App = () => {
  const [userName, setUserName] = useState("Rahul");

  useEffect(() => {
    setUserName("Anurag");
  }, []);

  return (
    <Provider store={appStore}>
      <UserContext.Provider value={{ loggedInUser: userName, setUserName }}>
      <Toaster 
        position="top-center"
        reverseOrder={false}
      />
        <div className="app">
          <Header />
          <Routes>
            <Route path="/" element={<Body />} />
            <Route path="/about" element={<About />}>
              <Route path="profile" element={<Profile />} />
            </Route>
            {/* Update this route path to match the Link in Body.js */}
            <Route path="/restaurant/:resId" element={<RestaurantMenu />} />
            <Route 
              path="/grocery" 
              element={
                <Suspense fallback={<div>Loading...</div>}>
                  <Grocery />
                </Suspense>
              } 
            />
            <Route path="/cart" element={<Cart />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<Error />} />
          </Routes>
          <Footer />
        </div>
      </UserContext.Provider>
    </Provider>
  );
};

export default App;
