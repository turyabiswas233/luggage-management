import React, { useState } from "react";
import Banner from "./Banner";
import FAQ from "./FAQ";
import Review from "./Review";
import Choose from "./Choose";
import CityInfo from "./CityInfo";
import LuggageStorageLocations from "../SearchLugLocation/LuggageStorageLocations";
// import ScrollToTopButton from "./ScrollToTopButton";
import HowItWorks from "./Howitworks";
import { useTranslation } from "react-i18next";
import { FaMinusCircle, FaPlusCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";

const Home = () => {
  const { i18n } = useTranslation();
  const schemaCode = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Urloker",
    image:
      "https://s3.ap-southeast-2.amazonaws.com/s3.urlocker.io/public/files/img/location_common/home-banner.jpeg?v=01",
    "@id": "https://urloker.com/#luggagestorage",
    url: "https://urloker.com/",
    telephone: "+61 3 7035 5653",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Melbourne",
      addressRegion: "VIC",
      addressCountry: "AU",
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday",
        ],
        opens: "00:00",
        closes: "23:59",
      },
    ],
    sameAs: [
      "https://www.facebook.com/profile.php?id=61564185476772",
      "https://www.youtube.com/@urloker",
    ],
  };
  return (
    <>
      <Helmet>
        <link
          rel="preload"
          as="image"
          href="https://s3.ap-southeast-2.amazonaws.com/s3.urlocker.io/public/files/img/location_common/home-banner.jpeg"
        />
        <script type="application/ld+json">
          {JSON.stringify(schemaCode, null, 2)}
        </script>
      </Helmet>
      <Banner />
      <LuggageStorageLocations cityType={""} />
      <HowItWorks />

      <Review />
      <Choose />
      <Demo />
      <CityInfo />
      <CurrentCities />
      <FAQ />
    </>
  );
};
const Demo = () => {
  const [openFAQ, setOpenFAQ] = useState(-1);
  const { t: tl } = useTranslation();
  const t = tl("home")?.demo;

  const toggleFAQ = (index) => {
    setOpenFAQ((p) => (p == index ? -1 : index));
  };
  return (
    <section
      className="py-16 bg-gradient-to-r from-gray-200 to-custom-gray scroll-mt-20"
      id="hassle"
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
      name: "Melbourne",
      to: "/luggage-storage-melbourne",
      city: "melbourne",
    },
    {
      name: "Melbourne CBD",
      to: "/luggage-storage-melbourne-cbd",
      city: "melbourne",
    },
    {
      name: "Melbourne Airport",
      to: "/luggage-storage-melbourne-airport",
      city: "melbourne",
    },
    {
      name: "Flinders Street Station",
      to: "/flinders-street-station-luggage-storage",
      city: "melbourne",
    },
    {
      to: "/southern-cross-station-luggage-storage",
      name: "Southern Cross Station",
      city: "melbourne",
    },
    {
      to: "/luggage-storage-melbourne-central-station",
      name: "Melbourne Central Station",
      city: "melbourne",
    },
    {
      to: "/luggage-lockers-melbourne",
      name: "Luggage Locker Melbourne",
      city: "melbourne",
    },
    {
      to: "/melbourne-southern-cross-station-lockers",
      name: "Melbourne Southern cross Station Lockers",
      city: "melbourne",
    },
    {
      to: "/luggage-storage-sydney",
      name: "Luggage Storage Sydney",
      city: "sydney",
    },
    {
      to: "/luggage-storage-sydney-central",
      name: "Luggage Storage Sydney Central",
      city: "sydney",
    },
    {
      to: "/luggage-storage-sydney-circular-quay",
      name: "Luggage Storage Sydney Circular Quay",
      city: "sydney",
    },
    {
      to: "/luggage-storage-brisbane-cbd",
      name: "Luggage Storage Brisbane CBD",
      city: "Brisbane",
    },
    {
      to: "/luggage-storage-adelaide",
      name: "Luggage Storage Adelaide",
      city: "Adelaide",
    },
    {
      to: "/luggage-storage-perth-cbd",
      name: "Luggage Storage Perth CBD",
      city: "Perth",
    },
    {
      to: "/luggage-storage-canberra",
      name: "Luggage Storage Canberra",
      city: "Canberra",
    },
    {
      to: "/luggage-storage-gold-coast",
      name: "Luggage Storage Gold Coast",
      city: "Gold Coast",
    },
  ];
  const groupedCities = cities.reduce((acc, city) => {
    if (!acc[city.city]) {
      acc[city.city] = [];
    }
    acc[city.city].push(city);
    return acc;
  }, {});

  return (
    <div className="p-10 md:px-20 xl:container mx-auto bg-gray-50 w-full rounded-md my-5 shadow-custom-teal-deep/10 shadow-xl">
      <h2 className="text-3xl font-bold">
        Store your luggage to your closest location
      </h2>
      <br />
      <h4 className="text-xl font-bold">Newly added locations</h4>
      {Object.keys(groupedCities).map((cityKey) => (
        <div key={cityKey} className="my-5">
          <h5 className="text-lg font-semibold capitalize">{cityKey}</h5>
          <div className="flex flex-wrap gap-3">
            {groupedCities[cityKey].map((loc) => (
              <Link
                to={loc.to}
                key={`city-${loc.name}`}
                className="relative text-custom-teal-deep no-underline after:absolute after:w-full after:h-1 after:bg-custom-teal-deep after:left-0 after:-bottom-2 after:rounded-full hover:after:h-2 after:transition-all"
              >
                {loc.name}
              </Link>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};
export default Home;
