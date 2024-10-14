import React, { useState, useRef, useCallback, lazy } from "react";
import { useNavigate } from "react-router-dom";
import { Autocomplete, useJsApiLoader } from "@react-google-maps/api";
import backgroundImage from "/img/home-two/luggage-1.webp";
import "./Banner.css";
import config from "../../config";
import { useTranslation } from "react-i18next";

const libraries = ["places"];

function Banner() {
  const navigate = useNavigate();
  const [autocomplete, setAutocomplete] = useState(null);
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [loadingLocation, setLoadingLocation] = useState(false);
  const locationInputRef = useRef(null);
  const { t } = useTranslation();
  const translate = t("home");

  const GOOGLE_MAPS_API_KEY = config.GOOGLE_API_KEY;

  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: GOOGLE_MAPS_API_KEY,
    libraries,
  });

  const onLoad = useCallback((autocompleteInstance) => {
    setAutocomplete(autocompleteInstance);
  }, []);

  const onPlaceChanged = () => {
    if (autocomplete !== null) {
      const place = autocomplete.getPlace();
      if (place.geometry) {
        setSelectedPlace(place);
      } else {
        console.log("No geometry available for the selected place");
      }
    } else {
      console.log("Autocomplete is not loaded yet!");
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (selectedPlace && selectedPlace.geometry) {
      const location = {
        lat: selectedPlace.geometry.location.lat(),
        lng: selectedPlace.geometry.location.lng(),
      };
      navigate("/luggage_locations", {
        state: { location, inputLocation: locationInputRef.current.value },
      });
    } else {
      console.log("Please select a valid place");
    }
  };

  const handleNearMyLocationClick = () => {
    if (navigator.geolocation) {
      setLoadingLocation(true);
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const location = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          navigate("/luggage_locations", { state: { location, nearby: true } });
          setLoadingLocation(false);
        },
        (error) => {
          console.error("Error fetching location:", error);
          setLoadingLocation(false);
        }
      );
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  };

  if (loadError) return <div>Error loading maps</div>;
  if (!isLoaded) return <div>Loading Maps</div>;

  // Fetch translations for the current language
  const {
    title,
    subtitle,
    searchPlaceholder,
    searchButton,
    findLocationsButton,
  } = translate?.heroSection;

  return (
    <div
      className="banner bg-cover bg-center mt-28 h-screen flex items-center justify-center relative"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="absolute inset-0 bg-gray-800 opacity-40 backdrop-blur-md"></div>
      <div className="relative z-10 text-center text-white px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold drop-shadow-lg capitalize">
          <span className="slogan-color">{title.split(" ")[0]}</span>{" "}
          {title.split(" ")[1]}{" "}
          <span className="slogan-color">
            {title.split(" ")[2]} {title.split(" ")[3]}
          </span>
        </h1>
        <p className="mt-4 text-base sm:text-lg lg:text-xl drop-shadow-md">
          {subtitle}
        </p>
        <form
          id="locationForm"
          className="mt-4"
          onSubmit={handleSubmit}
          aria-label="Location search form"
        >
          <div className="flex flex-col sm:flex-row justify-center items-center relative">
            <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
              <input
                type="text"
                id="location"
                className="form-input p-3 rounded-none sm:rounded-l-md shadow-md focus:outline-none focus:ring-1 focus:ring-blue-100 w-full sm:w-96 lg:w-[500px] mb-4 sm:mb-0 relative"
                placeholder={searchPlaceholder}
                ref={locationInputRef}
              />
            </Autocomplete>
            <button
              type="submit"
              className="search-button bg-green-600 hover:bg-green-800 text-white rounded-none sm:rounded-r-md shadow-md transition duration-300 ease-in-out p-3 sm:px-6 w-full sm:w-auto"
            >
              {searchButton}
            </button>
          </div>
          <button
            type="button"
            onClick={handleNearMyLocationClick}
            className={`find-button bg-green-600 hover:bg-green-800 text-white rounded-md shadow-md transition duration-300 ease-in-out mt-4 px-8 py-3 w-full sm:w-auto ${
              loadingLocation ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={loadingLocation}
          >
            {findLocationsButton}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Banner;
