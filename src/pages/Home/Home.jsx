import React, { useState } from "react";

import NavbarComp from "./NavbarComp";
import Banner from "./Banner";
import FAQ from "./FAQ";
import Review from "./Review";
import Footer from "./Footer";
import Choose from "./Choose";
import Blog from "./Blog";
import CityInfo from "./CityInfo";
import LuggageStorageLocations from "../SearchLugLocation/LuggageStorageLocations";
// import ScrollToTopButton from "./ScrollToTopButton";
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
      <HowItWorks />

      <Review />
      <Choose />
      <CityInfo />
      <Demo />
      <Blog />
      <FAQ />
      <Footer />
      {/* <ScrollToTopButton /> */}
    </div>
  );
};
const Demo = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
      <div className="p-10 bg-slate-100">
        <h2 className="font-extrabold text-4xl my-4">
          Hassle Free Luggage Storage, Book in Seconds
        </h2>
        <article className="mt-10">
          <ul className="pl-10 list-disc text-lg font-medium">
            <li>Security Guaranteed</li>
            <li>$1000 protection</li>
            <li>Size Doesn't Matter</li>
            <li>
              Flat Rate for All Bag Size No Need to Pay Extra No Hourly Fees
            </li>
          </ul>
        </article>
      </div>
      <div className="p-10 bg-gradient-to-br from-custom-teal-deep to-custom-teal/80 text-white">
        <h2 className="font-extrabold text-4xl my-4">Need a lot!</h2>
        <article className="my-10 space-y-6 text-lg">
          <p>
            Enjoy Full Day Flexibility with a Fixed Price. You Won't find better
            24/7 Support. We are always here for you.
          </p>
          <p>Enjoy Freedom in Every Journey with Urloker.</p>
        </article>
      </div>
    </div>
  );
};
export default Home;
