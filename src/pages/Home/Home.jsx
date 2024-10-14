import React, { useState } from "react";
// import "tailwindcss/tailwind.css";
import NavbarComp from "./NavbarComp";
import Banner from "./Banner";
import FAQ from "./FAQ";
import Review from "./Review";
import Footer from "./Footer";
import Choose from "./Choose";
import Blog from "./Blog";
import CityInfo from "./CityInfo";
import LuggageStorageLocations from "../SearchLugLocation/LuggageStorageLocations";
import ScrollToTopButton from "./ScrollToTopButton";
import HowItWorks from "./Howitworks";
import { useTranslation } from "react-i18next";

const Home = () => {
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
  return (
    <div>
      <NavbarComp
        currentLanguage={currentLanguage}
        setLanguage={handleChangeLanguage}
      />
      <Banner />
      <LuggageStorageLocations />
      <CityInfo currentLanguage={currentLanguage} />
      <HowItWorks />
      <FAQ />

      <Review />
      <Choose />
      <Blog />
      <Footer />
      <ScrollToTopButton />
    </div>
  );
};

export default Home;
