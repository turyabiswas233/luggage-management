import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

// Import images
import avalonAirport from '/img/location_common/Avalon Airport.jpg';
import melbourneCBD from '/img/location_common/Melbourne CBD.jpg';
import melbourneAirport from '/img/location_common/Melbourne Airport.jpg';
import southbank from '/img/location_common/Southbank.jpg';
import southernCrossStation from '/img/location_common/Southern Cross Station.jpg';
import melbourneCentralStation from '/img/location_common/Melbourne Central Station.jpg';
import flindersStreetStation from '/img/location_common/Flinders Street Station.jpg';
import parliamentStation from '/img/location_common/Parliament Station.jpg';
import flagstaffStation from '/img/location_common/Flagstaff Station.jpg';
import swanstonStreet from '/img/location_common/Swanston Street.jpg';
import spencerStreet from '/img/location_common/Spencer Street.jpg';
import melbourneConventionCentre from '/img/location_common/Melbourne Convention Centre.jpg';
import queenVictoriaMarket from '/img/location_common/Queen Victoria Market.jpg';
import crownCasinoMelbourne from '/img/location_common/Crown Casino Melbourne.jpg';
import chinaTownMelbourne from '/img/location_common/Chinatown Melbourne.jpg';
import melbourneCricketGround from '/img/location_common/Melbourne Cricket Ground (MCG).jpg';
import marvelStadium from '/img/location_common/Marvel Stadium.jpg';
import newQuay from '/img/location_common/New Quay.jpg';
import stKildaPier from '/img/location_common/St Kilda Pier.jpg';
import docklands from '/img/location_common/Docklands.jpg';
import portMelbourne from '/img/location_common/Port Melbourne.jpg';
import albertPark from '/img/location_common/Albert Park.jpg';
import dfoMelbourne from '/img/location_common/DFO Melbourne.jpg';
import chadstone from '/img/location_common/Chadstone.jpg';
import { useTranslation } from 'react-i18next';

const locations = [
  { name: 'Melbourne Airport', image: melbourneAirport },
  { name: 'Avalon Airport', image: avalonAirport },
  { name: 'Melbourne CBD', image: melbourneCBD },
  { name: 'Southbank', image: southbank },
  { name: 'Southern Cross Station', image: southernCrossStation },
  { name: 'Melbourne Central Station', image: melbourneCentralStation },
  { name: 'Flinders Street Station', image: flindersStreetStation },
  { name: 'Parliament Station', image: parliamentStation },
  { name: 'Flagstaff Station', image: flagstaffStation },
  { name: 'Swanston Street', image: swanstonStreet },
  { name: 'Spencer Street', image: spencerStreet },
  { name: 'Melbourne Convention Centre', image: melbourneConventionCentre },
  { name: 'Queen Victoria Market', image: queenVictoriaMarket },
  { name: 'Crown Casino Melbourne', image: crownCasinoMelbourne },
  { name: 'China Town Melbourne', image: chinaTownMelbourne },
  { name: 'Melbourne Cricket Ground (MCG)', image: melbourneCricketGround },
  { name: 'Marvel Stadium', image: marvelStadium },
  { name: 'New Quay', image: newQuay },
  { name: 'St Kilda Pier', image: stKildaPier },
  { name: 'Docklands', image: docklands },
  { name: 'Port Melbourne', image: portMelbourne },
  { name: 'Albert Park', image: albertPark },
  { name: 'DFO Melbourne', image: dfoMelbourne },
  { name: 'Chadstone', image: chadstone },
];

const LuggageStorageLocations = ({ currentLanguage }) => {
  const carouselRef = useRef(null);
  const navigate = useNavigate();

  const handleScrollLeft = () => {
    carouselRef.current.scrollBy({
      left: -carouselRef.current.clientWidth,
      behavior: 'smooth',
    });
  };

  const handleScrollRight = () => {
    carouselRef.current.scrollBy({
      left: carouselRef.current.clientWidth,
      behavior: 'smooth',
    });
  };

  const handleSearchLocation = (locationName) => {
    const geocoder = new window.google.maps.Geocoder();
    geocoder.geocode({ address: locationName }, (results, status) => {
      if (status === 'OK' && results[0].geometry) {
        const location = {
          lat: results[0].geometry.location.lat(),
          lng: results[0].geometry.location.lng(),
        };
        navigate('/luggage_locations', { state: { location, inputLocation: locationName } });
      } else {
        console.log('Geocode was not successful for the following reason: ' + status);
      }
    });
  };

  // Get translations for the current language
  const { t: tl } = useTranslation();
  const t = tl('home')?.luggageStorageLocations;
  // const t = translations[currentLanguage]?.luggageStorageLocations;

  return (
    <div className="bg-gradient-to-b from-gray-200 via-white to-gray-300 py-24">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-extrabold text-center mb-12 text-[#4A686A]">{t?.title}</h2>
        <div className="relative">
          <div className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10">
            <button
              className="bg-[#1a789e] text-white p-3 rounded-full shadow-md hover:bg-[#148dbc] transition-colors duration-300"
              onClick={handleScrollLeft}
            >
              <FontAwesomeIcon icon={faChevronLeft} />
            </button>
          </div>
          <div
            ref={carouselRef}
            className="flex overflow-x-scroll no-scrollbar space-x-8 pb-4"
            style={{ scrollBehavior: 'smooth' }}
          >
            {locations.map((location, index) => (
              <div
                key={index}
                className="mt-12 bg-white shadow-md rounded-xl overflow-hidden transform hover:scale-105 transition-transform duration-300 min-w-full sm:min-w-[300px] md:min-w-[400px] lg:min-w-[500px]"
              >
                <img className="w-full h-56 object-cover" src={location.image} alt={location.name} />
                <div className="p-6 text-center">
                  <h3 className="text-2xl font-semibold mb-4 text-gray-800">{location.name}</h3>
                  <button
                    onClick={() => handleSearchLocation(location.name)}
                    className="bg-[#2a9b84] text-white px-4 py-2 rounded-full hover:bg-[#2a8b74] transition-colors duration-300"
                  >
                    {t?.searchButton}
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10">
            <button
              className="bg-[#1a789e] text-white p-3 rounded-full shadow-md hover:bg-[#148dbc] transition-colors duration-300"
              onClick={handleScrollRight}
            >
              <FontAwesomeIcon icon={faChevronRight} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LuggageStorageLocations;
