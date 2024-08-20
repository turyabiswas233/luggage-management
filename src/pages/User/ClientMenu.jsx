import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar, faWallet, faUser, faHeart, faGift, faBox, faFileContract, faCookie, faLifeRing, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import 'tailwindcss/tailwind.css';
import ClientNavbarComp from './ClientNavbarComp';
import { useNavigate } from 'react-router-dom';

const ClientMenu = () => {
  const [token, setToken] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
    } else {
      navigate('/');
    }
  }, [navigate]);

  if (!token) {
    return null; // Do not display the menu if there's no token
  }

  const handleNavigation = (route) => {
    navigate(route);
  };

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Navbar */}
      <ClientNavbarComp />

      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-y-auto mt-12 pt-12 overflow-x-hidden">
        <main className="flex flex-1 items-center justify-center bg-gradient-to-r from-blue-200 to-purple-200 p-6">
          <div className="w-96 bg-white shadow-2xl rounded-lg overflow-hidden">
            <div className="p-6 flex justify-around items-center bg-gradient-to-r from-blue-700 to-purple-500">
              <button className="flex flex-col items-center focus:outline-none" onClick={() => handleNavigation('/comingsoon')}>
                <FontAwesomeIcon icon={faCalendar} size="2x" className="text-white" />
                <span className="text-sm mt-2 text-white">Bookings</span>
              </button>
              <button className="flex flex-col items-center focus:outline-none" onClick={() => handleNavigation('/comingsoon')}>
                <FontAwesomeIcon icon={faWallet} size="2x" className="text-white" />
                <span className="text-sm mt-2 text-white">Wallet</span>
              </button>
              <button className="flex flex-col items-center focus:outline-none" onClick={() => handleNavigation('/client/profile')}>
                <div className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-lg font-bold text-white">A</div>
                <span className="text-sm mt-2 text-white">Profile</span>
              </button>
            </div>
            <div className="border-t">
              <div className="p-4 flex items-center hover:bg-gray-100 cursor-pointer" onClick={() => handleNavigation('/comingsoon')}>
                <FontAwesomeIcon icon={faHeart} className="text-red-500 mr-4" />
                <span>Favorites</span>
              </div>
              <div className="p-4 flex items-center hover:bg-gray-100 cursor-pointer" onClick={() => handleNavigation('/comingsoon')}>
                <FontAwesomeIcon icon={faGift} className="text-yellow-500 mr-4" />
                <span>Refer a friend</span>
              </div>
              <div className="p-4 flex items-center hover:bg-gray-100 cursor-pointer" onClick={() => handleNavigation('/comingsoon')}>
                <FontAwesomeIcon icon={faBox} className="text-purple-500 mr-4" />
                <span>Receive packages</span>
              </div>
              <div className="p-4 flex items-center hover:bg-gray-100 cursor-pointer" onClick={() => handleNavigation('/comingsoon')}>
                <FontAwesomeIcon icon={faFileContract} className="text-blue-500 mr-4" />
                <span>Terms of Service</span>
              </div>
              <div className="p-4 flex items-center hover:bg-gray-100 cursor-pointer" onClick={() => handleNavigation('/comingsoon')}>
                <FontAwesomeIcon icon={faCookie} className="text-brown-500 mr-4" />
                <span>Manage cookie preferences</span>
              </div>
              <div className="p-4 flex items-center hover:bg-gray-100 cursor-pointer" onClick={() => handleNavigation('/comingsoon')}>
                <FontAwesomeIcon icon={faLifeRing} className="text-blue-500 mr-4" />
                <span>Support</span>
              </div>
              <div className="p-4 flex items-center hover:bg-gray-100 cursor-pointer" onClick={() => handleNavigation('/logout')}>
                <FontAwesomeIcon icon={faSignOutAlt} className="text-red-500 mr-4" />
                <span>Log out</span>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default ClientMenu;
