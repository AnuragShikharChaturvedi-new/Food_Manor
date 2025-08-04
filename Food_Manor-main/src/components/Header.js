import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import useOnlineStatus from '../utils/useOnlineStatus';
import UserContext from '../utils/UserContext';
import { useSelector } from 'react-redux';
import LoginModal from './LoginModal';

const Header = () => {
  const [user, setUser] = useState(null);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const onlineStatus = useOnlineStatus();
  const { loggedInUser } = useContext(UserContext);
  const cartItems = useSelector((store) => store.cart.items);

  useEffect(() => {
    const savedUser = localStorage.getItem('foodManorUser');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const handleLogin = (userData) => {
    setUser(userData);
    localStorage.setItem('foodManorUser', JSON.stringify(userData));
    setShowLoginModal(false);
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('foodManorUser');
  };

  return (
    <header className="fixed top-0 left-0 right-0 bg-white shadow-lg z-50 h-20">
      <div className="container mx-auto">
        <div className="flex items-center justify-between px-4 py-4">
          {/* Logo Section */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <img
                src="https://tse3.mm.bing.net/th/id/OIP.kr3sfUf91z4hPJHBdsmGzwAAAA?w=360&h=360&rs=1&pid=ImgDetMain&o=7&rm=3"
                alt="App Logo"
                className="w-12 h-12 object-contain"
              />
              <span className="ml-2 text-xl font-bold text-gray-800">Food_Manor</span>
            </Link>
          </div>

          {/* Navigation Section */}
          <nav className="hidden md:flex items-center space-x-8">
            <div className="flex items-center space-x-8">
              {/* Online Status */}
              <div className="flex items-center">
                <span className="text-sm text-gray-600">
                  {onlineStatus ? (
                    <span className="flex items-center">
                      <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                      Online
                    </span>
                  ) : (
                    <span className="flex items-center">
                      <span className="w-2 h-2 bg-red-500 rounded-full mr-2"></span>
                      Offline
                    </span>
                  )}
                </span>
              </div>

              {/* Navigation Links */}
              <Link to="/" className="text-gray-700 hover:text-orange-500 transition-colors duration-200">
                Home
              </Link>
              <Link to="/about" className="text-gray-700 hover:text-orange-500 transition-colors duration-200">
                About
              </Link>
              <Link to="/contact" className="text-gray-700 hover:text-orange-500 transition-colors duration-200">
                Contact
              </Link>
              <Link to="/grocery" className="text-gray-700 hover:text-orange-500 transition-colors duration-200">
                Grocery
              </Link>

              {/* Cart Button */}
              <Link 
                to="/cart" 
                className="relative flex items-center text-gray-700 hover:text-orange-500 transition-colors duration-200"
              >
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-6 w-6" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" 
                  />
                </svg>
                {cartItems.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                    {cartItems.length}
                  </span>
                )}
              </Link>

              {/* User Section */}
              <div className="flex items-center space-x-4">
                {user && <span className="text-gray-700 font-medium">Hi, {user.name}</span>}
                <button
                  onClick={user ? handleLogout : () => setShowLoginModal(true)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 
                    ${user 
                      ? 'bg-red-500 text-white hover:bg-red-600' 
                      : 'bg-orange-500 text-white hover:bg-orange-600'
                    }`}
                >
                  {user ? 'Logout' : 'Login'}
                </button>
              </div>
            </div>
          </nav>

          {/* Mobile Menu Button - Only visible on mobile */}
          <button className="md:hidden p-2 rounded-lg hover:bg-gray-100">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-6 w-6" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M4 6h16M4 12h16M4 18h16" 
              />
            </svg>
          </button>
        </div>
      </div>
      <LoginModal 
        isOpen={showLoginModal} 
        onClose={() => setShowLoginModal(false)} 
        onLogin={handleLogin} 
      />
    </header>
  );
};

export default Header;
