import "./NavBarComp.css";
import React, { useState } from "react";
import LoginForm from "./LoginForm"; // Assuming LoginForm is in the same directory
import logo from "/files/img/home-two/logo3.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faKey } from "@fortawesome/free-solid-svg-icons";
import translations from "./translations"; // Import your translations
import { Link } from "react-router-dom";

const NavbarComp = ({ currentLanguage = "en", setLanguage }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [loginFormType, setLoginFormType] = useState(null);

  const toggleMenu = () => {
    setIsMenuOpen((pre) => !pre);
  };

  const handleDropdownToggle = (dropdown) => {
    if (activeDropdown === dropdown) {
      setActiveDropdown(null);
    } else {
      setActiveDropdown(dropdown);
    }
  };

  const openLoginForm = (type) => {
    setLoginFormType(type);
    setActiveDropdown(null); // Close other dropdowns
  };

  const closeLoginForm = () => {
    setLoginFormType(null);
  };

  // Safeguard against invalid language keys
  const currentTranslations =
    translations[currentLanguage] || translations["en"];

  return (
    <div className="sticky top-0 left-0 w-full bg-white/90 backdrop-blur shadow-md z-50">
      <div className="mx-auto flex justify-between items-center p-4 md:py-4 md:px-24 md:w-5/6">
        <nav className="flex items-center">
          <a href="/" className="flex items-center no-underline">
            <img src={logo} alt="logo1" width={75} height={45} />
          </a>
          <div className="md:hidden ml-4">
            <Link
              to="/urlokerkeysmap"
              className="flex items-center text-[#208873] hover:text-[#208873] no-underline"
            >
              <FontAwesomeIcon icon={faKey} className="mr-2" />{" "}
              {currentTranslations.header.urlokerKeys}
            </Link>
          </div>
        </nav>
        <div className="md:hidden">
          <button
            aria-label="action-button"
            onClick={toggleMenu}
            className="text-[#208873] focus:outline-none"
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
        <nav
          className={`flex-col md:items-center gap-y-4 absolute top-24 left-0 w-screen md:w-fit md:static md:flex md:flex-row md:space-x-16 text-[#208873] ${
            isMenuOpen
              ? "flex bg-white md:bg-transparent shadow-xl shadow-slate-300 md:shadow-none rounded-md p-3"
              : "hidden"
          }`}
        >
          <div className="md:flex md:flex-row md:space-x-16">
            <a href="/" className="text-[#208873] no-underline">
              {currentTranslations.header.home}
            </a>
            <Link
              to="/urlokerkeysmap"
              className="hidden md:block text-[#208873] no-underline"
            >
              {currentTranslations.header.urlokerKeys}
            </Link>
          </div>
          <div className="md:flex md:flex-row md:space-x-4 grid gap-y-5">
            <div className="relative group">
              <button
                aria-label="action-button"
                onClick={() => handleDropdownToggle("login")}
                className="hover:text-[#208873] flex items-center focus:outline-none"
              >
                {currentTranslations.header.login}{" "}
                <svg
                  className="ml-1 w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  ></path>
                </svg>
              </button>
              <div
                className={`absolute z-40 left-0 md:right-0 top-full bg-blue-900 text-white shadow-lg mt-1 rounded-md overflow-hidden transition-all md:group-hover:opacity-100 pointer-events-none opacity-0 w-48 ${
                  activeDropdown === "login"
                    ? "opacity-100 pointer-events-auto"
                    : "pointer-events-none opacity-0"
                }`}
              >
                <button
                  aria-label="action-button"
                  onClick={(e) => {
                    e.preventDefault();
                    openLoginForm("Partner");
                    toggleMenu();
                  }}
                  className="block w-full text-left px-4 py-2 hover:bg-blue-800"
                >
                  Partner Login
                </button>
                <button
                  aria-label="action-button"
                  onClick={(e) => {
                    e.preventDefault();
                    openLoginForm("User");
                    toggleMenu();
                  }}
                  className="block w-full text-left px-4 py-2 hover:bg-blue-800"
                >
                  User Login
                </button>
              </div>
            </div>

            <div className="relative group">
              <button
                aria-label="action-button"
                onClick={() => handleDropdownToggle("language")}
                className="hover:text-[#208873] flex items-center focus:outline-none"
              >
                {currentTranslations.header.language}{" "}
                <svg
                  className="ml-1 w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  ></path>
                </svg>
              </button>
              <div
                className={`absolute z-40 left-0 md:right-0 top-full bg-blue-900 text-white shadow-lg mt-1 rounded-md overflow-hidden transition-all md:group-hover:opacity-100 pointer-events-none opacity-0 w-48 ${
                  activeDropdown === "language"
                    ? "opacity-100 pointer-events-auto"
                    : "pointer-events-none opacity-0"
                }`}
              >
                {["en", "es", "zh"].map((language) => (
                  <button
                    aria-label="action-button"
                    key={language}
                    className={`block w-full text-left px-4 py-2 hover:bg-blue-800 ${
                      language === currentLanguage &&
                      "bg-blue-500 text-blue-50 rounded-sm py-2"
                    }`}
                    onClick={(e) => {
                      e.preventDefault();
                      setLanguage(language);
                      handleDropdownToggle(null);
                      toggleMenu();
                    }}
                  >
                    {translations[language].header.language}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </nav>
      </div>
      {loginFormType && (
        <LoginForm loginType={loginFormType} onClose={closeLoginForm} />
      )}
    </div>
  );
};

export default NavbarComp;
