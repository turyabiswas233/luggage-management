import './NavBarComp.css';
import React, { useState, useEffect } from 'react';
import LoginForm from './LoginForm'; // Assuming LoginForm is in the same directory
import logo from '../../img/home-two/logo3.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faKey } from '@fortawesome/free-solid-svg-icons';
import translations from './translations'; // Import your translations

const NavbarComp = ({ currentLanguage = 'en', setLanguage }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [isHovering, setIsHovering] = useState(false);
  const [loginFormType, setLoginFormType] = useState(null);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleDropdownToggle = (dropdown) => {
    if (activeDropdown === dropdown) {
      setActiveDropdown(null);
    } else {
      setActiveDropdown(dropdown);
    }
  };

  useEffect(() => {
    if (!isHovering && activeDropdown) {
      const timer = setTimeout(() => {
        setActiveDropdown(null);
      }, 500); // Adjust the delay time as needed
      return () => clearTimeout(timer);
    }
  }, [isHovering, activeDropdown]);

  const openLoginForm = (type) => {
    setLoginFormType(type);
    setActiveDropdown(null); // Close other dropdowns
  };

  const closeLoginForm = () => {
    setLoginFormType(null);
  };

  // Safeguard against invalid language keys
  const currentTranslations = translations[currentLanguage] || translations['en'];

  return (
    <div className="fixed top-0 w-full bg-white shadow-md z-50">
      <div className="mx-auto flex justify-between items-center p-4 md:px-24">
        <div className="flex items-center">
          <a href="/" className="flex items-center">
            <img src={logo} alt="logo1" className="h-16 w-40" />
          </a>
          <div className="md:hidden ml-4">
            <a href="/comingsoon" className="flex items-center text-[#1a73a7] hover:text-[#2a9b84]">
              <FontAwesomeIcon icon={faKey} className="mr-2" /> {currentTranslations.header.urlokerKeys}
            </a>
          </div>
        </div>
        <div className="md:hidden">
          <button
            onClick={toggleMenu}
            className="text-[#1a73a7] focus:outline-none"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              ></path>
            </svg>
          </button>
        </div>
        <nav className={`flex-col absolute top-24 right-10 md:static md:flex md:flex-row md:space-x-16 text-[#1a73a7] ${isMenuOpen ? 'flex bg-white shadow-xl shadow-slate-300 md:shadow-none rounded-md p-3' : 'hidden'}`}>
          <div className="md:flex md:flex-row md:space-x-16">
            <a href="/" className="hover:text-[#2a9b84] ">{currentTranslations.header.home}</a>
            <a href="/comingsoon" className="hidden md:block  hover:text-[#2a9b84] ">{currentTranslations.header.urlokerKeys}</a>
          </div>
          <div className="md:flex md:flex-row md:space-x-4">
            <div 
              className="relative group"
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
            >
              <button onClick={() => handleDropdownToggle('login')} className="hover:text-[#2a9b84] flex items-center focus:outline-none">
                {currentTranslations.header.login} <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
              </button>
              <div className={`absolute bg-blue-900 text-white shadow-lg mt-1 rounded-md overflow-hidden ${activeDropdown === 'login' ? 'block' : 'hidden'} md:group-hover:block w-48`}>
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    openLoginForm('Partner');
                  }}
                  className="block px-4 py-2 hover:bg-blue-800"
                >
                  Partner Login
                </a>
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    openLoginForm('User');
                  }}
                  className="block px-4 py-2 hover:bg-blue-800"
                >
                  User Login
                </a>
              </div>
            </div>
            {setLanguage && (
              <div 
                className="relative group"
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
              >
                <button onClick={() => handleDropdownToggle('language')} className="hover:text-[#2a9b84] flex items-center focus:outline-none">
                  {currentTranslations.header.language} <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                </button>
                <div className={`absolute bg-blue-900 text-white shadow-lg mt-1 rounded-md overflow-hidden ${activeDropdown === 'language' ? 'block' : 'hidden'} md:group-hover:block w-48`}>
                  {["en", "es", "zh"].map(language => (
                    <a 
                      href="#" 
                      key={language} 
                      onClick={(e) => {
                        e.preventDefault();
                        setLanguage(language);
                      }}
                      className="block px-4 py-2 hover:bg-blue-800"
                    >
                      {translations[language].header.language}
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
        </nav>
      </div>
      {loginFormType && (
        <LoginForm
          loginType={loginFormType}
          onClose={closeLoginForm}
        />
      )}
    </div>
  );
};

export default NavbarComp;
