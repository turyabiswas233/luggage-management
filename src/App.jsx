import React, { useState, useEffect } from "react";
import "./css/style.css";

import TawkTo from "./TawkTo";
import { Outlet, useLocation } from "react-router-dom";
import Schema from "./Schema";
import Footer from "./pages/Home/Footer";
import NavbarComp from "./pages/Home/NavbarComp";
import { useTranslation } from "react-i18next";

function App() {
  const { pathname } = useLocation();
  const [currentLanguage, setCurrentLanguage] = useState(
    localStorage.getItem("i18nextLng") == "en-US"
      ? "en"
      : localStorage.getItem("i18nextLng") || "en"
  );
  const { i18n } = useTranslation();
  const handleChangeLanguage = (lang) => {
    setCurrentLanguage(lang);
    i18n.changeLanguage(lang);
  };
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return (
    <>
      <NavbarComp
        currentLanguage={currentLanguage}
        setLanguage={handleChangeLanguage}
      />
      <Outlet />
      <Schema />
      <Footer />
      <TawkTo />
    </>
  );
}

export default App;
