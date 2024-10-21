import React from "react";
import { useNavigate } from "react-router-dom";
import "react-slideshow-image/dist/styles.css";
// Import images
import avalonAirport from "/img/location_common/Avalon Airport.webp";
import melbourneCBD from "/img/location_common/Melbourne CBD.webp";
import melbourneAirport from "/img/location_common/Melbourne Airport.webp";
import southbank from "/img/location_common/Southbank.jpg";
import southernCrossStation from "/img/location_common/Southern Cross Station.jpg";
import melbourneCentralStation from "/img/location_common/Melbourne Central Station.webp";
import flindersStreetStation from "/img/location_common/Flinders Street Station.webp";
import parliamentStation from "/img/location_common/Parliament Station.jpg";
import flagstaffStation from "/img/location_common/Flagstaff Station.webp";
import swanstonStreet from "/img/location_common/Swanston Street.jpg";
import spencerStreet from "/img/location_common/Spencer Street.jpg";
import melbourneConventionCentre from "/img/location_common/Melbourne Convention Centre.webp";
import queenVictoriaMarket from "/img/location_common/Queen Victoria Market.jpg";
import crownCasinoMelbourne from "/img/location_common/Crown Casino Melbourne.webp";
import chinaTownMelbourne from "/img/location_common/Chinatown Melbourne.webp";
import melbourneCricketGround from "/img/location_common/Melbourne Cricket Ground (MCG).jpg";
import marvelStadium from "/img/location_common/Marvel Stadium.webp";
import newQuay from "/img/location_common/New Quay.jpg";
import stKildaPier from "/img/location_common/St Kilda Pier.jpg";
import docklands from "/img/location_common/Docklands.webp";
import portMelbourne from "/img/location_common/Port Melbourne.jpg";
import albertPark from "/img/location_common/Albert Park.webp";
import dfoMelbourne from "/img/location_common/DFO Melbourne.webp";
import chadstone from "/img/location_common/Chadstone.webp";
import { useTranslation } from "react-i18next";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import { Autoplay } from "swiper/modules";

const locations = [
  { name: "Melbourne Airport", image: melbourneAirport },
  { name: "Avalon Airport", image: avalonAirport },
  { name: "Melbourne CBD", image: melbourneCBD },
  { name: "Southbank", image: southbank },
  { name: "Southern Cross Station", image: southernCrossStation },
  { name: "Melbourne Central Station", image: melbourneCentralStation },
  { name: "Flinders Street Station", image: flindersStreetStation },
  { name: "Parliament Station", image: parliamentStation },
  { name: "Flagstaff Station", image: flagstaffStation },
  { name: "Swanston Street", image: swanstonStreet },
  { name: "Spencer Street", image: spencerStreet },
  { name: "Melbourne Convention Centre", image: melbourneConventionCentre },
  { name: "Queen Victoria Market", image: queenVictoriaMarket },
  { name: "Crown Casino Melbourne", image: crownCasinoMelbourne },
  { name: "China Town Melbourne", image: chinaTownMelbourne },
  { name: "Melbourne Cricket Ground (MCG)", image: melbourneCricketGround },
  { name: "Marvel Stadium", image: marvelStadium },
  { name: "New Quay", image: newQuay },
  { name: "St Kilda Pier", image: stKildaPier },
  { name: "Docklands", image: docklands },
  { name: "Port Melbourne", image: portMelbourne },
  { name: "Albert Park", image: albertPark },
  { name: "DFO Melbourne", image: dfoMelbourne },
  { name: "Chadstone", image: chadstone },
];
const CustomPrevArrow = (props) => {
  const { className, onClick } = props;
  return (
    <button
      className={`${className} custom-arrow custom-prev-arrow`}
      onClick={onClick}
    >
      <MdKeyboardArrowLeft size={'1.5em'} />
    </button>
  );
};

const CustomNextArrow = (props) => {
  const { className, onClick } = props;
  return (
    <button
      className={`${className} custom-arrow custom-next-arrow`}
      onClick={onClick}
    >
      <MdKeyboardArrowRight size={'1.5em'} />
    </button>
  );
};
const LuggageStorageLocations = () => {
  const navigate = useNavigate();

  const handleSearchLocation = (locationName) => {
    const geocoder = new window.google.maps.Geocoder();
    geocoder.geocode({ address: locationName }, (results, status) => {
      if (status === "OK" && results[0].geometry) {
        const location = {
          lat: results[0].geometry.location.lat(),
          lng: results[0].geometry.location.lng(),
        };
        navigate("/luggage_locations", {
          state: { location, inputLocation: locationName },
        });
      } else {
        console.log(
          "Geocode was not successful for the following reason: " + status
        );
      }
    });
  };

  // Get translations for the current language
  const { t: tl } = useTranslation();
  const t = tl("home")?.luggageStorageLocations;
  // const t = translations[currentLanguage]?.luggageStorageLocations;

  return (
    <div className="bg-gradient-to-t from-white via-white to-custom-teal-deep/20 py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-extrabold text-center mb-12 text-[#4A686A]">
          {t?.title}
        </h2>
        <Swiper
          modules={[Autoplay]}
          spaceBetween={10}
          slidesPerView={"auto"}
          loop={true}
          speed={1000}
          autoplay={{
            delay: 2000,
            pauseOnMouseEnter: true,
          }}
          className="relative flex gap-5 pb-12"
        >
          {locations.map((location, index) => (
            <SwiperSlide
              key={index}
              className="grid gap-2 min-h-fit max-w-md h-80 bg-white shadow-md rounded-xl overflow-hidden md:mx-auto p-2 mb-14"
            >
              <img
                className="aspect-video w-full object-cover rounded-xl"
                src={location.image}
                alt={location.name}
                width={300}
                height={280}
                loading="lazy"
              />
              <div className="pt-3 text-lg">
                <h3 className="font-semibold mb-4 text-gray-800">
                  {location.name}
                </h3>
                <button
                  onClick={() => handleSearchLocation(location.name)}
                  className="bg-[#2a9b84] text-white px-4 py-2 rounded-full hover:bg-[#2a8b74] transition-colors duration-300"
                >
                  {t?.searchButton}
                </button>
              </div>
            </SwiperSlide>
          ))}
          <SwipeButton />
        </Swiper>
      </div>
    </div>
  );
};
const SwipeButton = () => {
  const swipe = useSwiper();
  return (
    <div className="absolute right-0 bottom-10 flex gap-3 items-center justify-end">
      <CustomPrevArrow onClick={() => swipe.slidePrev()} />
      <CustomNextArrow onClick={() => swipe.slideNext()} />
    </div>
  );
};
export default LuggageStorageLocations;
