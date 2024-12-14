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
  const [loginFormType, setLoginFormType] = useState(null);

  const toggleMenu = () => {
    setIsMenuOpen((pre) => !pre);
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
    <nav className="p-3 sticky top-0 left-0 z-50 w-full mx-auto bg-white">
      <div className="flex flex-wrap items-center justify-between max-w-7xl mx-auto">
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
        <div className="flex md:hidden">
          <button id="hamburger" type="button" onClick={toggleMenu}>
            {!isMenuOpen ? (
              <img
                src="https://img.icons8.com/fluent-systems-regular/2x/menu-squared-2.png"
                width="48"
                height="48"
              />
            ) : (
              <img
                src="https://img.icons8.com/fluent-systems-regular/2x/close-window.png"
                width="48"
                height="48"
              />
            )}
          </button>
        </div>

        <div
          className={`fixed top-24 left-0 w-screen md:w-fit md:static md:flex md:flex-row md:space-x-16 text-[#208873] ${
            isMenuOpen
              ? "translate-x-0 space-y-3 md:space-y-0"
              : "opacity-0 pointer-events-none -translate-x-20 -z-10"
          } transition-all md:translate-x-0 duration-200 md:opacity-100 md:pointer-events-auto bg-white md:bg-transparent shadow-xl shadow-slate-300 md:shadow-none rounded-md p-3`}
        >
          <Link
            to="/urlokerkeysmap"
            className="hidden md:block text-[#208873] no-underline my-auto"
          >
            <FontAwesomeIcon icon={faKey} className="mr-2" />{" "}
            {currentTranslations.header.urlokerKeys}
          </Link>
          <div className="relative group py-2 w-fit">
            <button
              type="button"
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
              className={`absolute z-40 left-0 md:right-0 top-full bg-blue-900 text-white shadow-lg rounded-md overflow-hidden transition-all md:group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto opacity-0 w-48 group-hover:opacity-100`}
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
          <div className="relative group py-2 w-fit">
            <button
              type="button"
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
              className={`absolute z-40 left-0 md:right-0 top-full bg-blue-900 text-white shadow-lg rounded-md overflow-hidden transition-all md:group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto opacity-0 w-48 group-hover:opacity-100`}
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
          <div></div>
          <div></div>
        </div>
        {loginFormType && (
          <LoginForm loginType={loginFormType} onClose={closeLoginForm} />
        )}
      </div>
    </nav>
  );
};

export default NavbarComp;
