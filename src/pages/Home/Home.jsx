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
import { FaMinusCircle, FaPlusCircle } from "react-icons/fa";
import { Link } from "react-router-dom";

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
      <Demo />
      <CityInfo />
      <CurrentCities />
      <FAQ />
      <Blog />
      <Footer />
      {/* <ScrollToTopButton /> */}
    </div>
  );
};
const Demo = () => {
  const [openFAQ, setOpenFAQ] = useState(0);
  const { t: tl } = useTranslation();
  const t = tl("home")?.demo;

  const toggleFAQ = (index) => {
    setOpenFAQ((p) => (p == index ? -1 : index));
  };
  return (
    <section
      className="py-16 bg-gradient-to-r from-gray-200 to-custom-gray scroll-mt-20"
      id="faq"
    >
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl text-left font-extrabold md:text-center text-custom-teal mb-12 transition duration-500 ease-in-out hover:text-custom-teal-deep">
          {t?.title}
        </h2>
        <div className="flex flex-wrap -mx-4">
          <div className="w-full lg:w-3/4 py-4 mx-auto h-full">
            {t.list.map((faq, index) => (
              <div
                key={index}
                className={`p-4 border-y border-gray-400 text-gray-900 group transition-all ease-out duration-500 h-full ${
                  openFAQ == index
                    ? "max-h-52 overflow-y-auto min-h-full"
                    : "max-h-20"
                }`}
              >
                <h3
                  className="text-xl font-bold transition-colors group-hover:text-gray-500 cursor-pointer flex items-center justify-between select-none"
                  onClick={() => toggleFAQ(index)}
                >
                  {faq.title}
                  {openFAQ == index ? (
                    <FaMinusCircle color="#23a373" />
                  ) : (
                    <FaPlusCircle color="#23a373" />
                  )}
                </h3>
                {openFAQ == index && (
                  <div
                    className="transition group-hover:text-gray-500 mt-2 overflow-x-hidden break-words text-justify px-5 font-medium select-none"
                    dangerouslySetInnerHTML={{
                      __html: faq.desc,
                    }}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
const CurrentCities = () => {
  const cities = [
    {
      name: "Melbourne CBD",
      to: "/luggage-storage-melbourne-cbd",
    },
    {
      name: "Melbourne Airport",
      to: "/luggage-storage-melbourne-airport",
    },
    {
      name: "Flinders Street Station",
      to: "/flinders-street-station-luggage-storage",
    },
  ];
  return (
    <div className="p-10 bg-gray-50 w-full">
      <h2 className="text-3xl font-bold">
        Store your luggage to your closet location
      </h2>
      <br />
      <h4 className="text-xl font-bold">Newly added lcoations</h4>
      <div className="flex flex-wrap gap-3 my-5">
        {cities?.sort()?.map((loc) => (
          <Link to={loc?.to} key={`city-${loc?.name}`} className="relative after:absolute after:w-full after:h-1 after:bg-custom-teal-deep after:left-0 after:-bottom-2 after:rounded-full hover:after:h-2 after:transition-all">
            {loc?.name}
          </Link>
        ))}
      </div>
    </div>
  );
};
export default Home;
