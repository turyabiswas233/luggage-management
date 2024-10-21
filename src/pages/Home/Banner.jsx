import React, { useState, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Autocomplete, useJsApiLoader } from "@react-google-maps/api"; 
import backgroundImage from "/img/home-two/luggage-1.png";
import "./Banner.css";
import config from "../../config";
import { useTranslation } from "react-i18next";

const libraries = ["places"];
const GOOGLE_MAPS_API_KEY = config.GOOGLE_API_KEY;

function Banner() {
  const navigate = useNavigate();
  const [autocomplete, setAutocomplete] = useState(null);
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [loadingLocation, setLoadingLocation] = useState(false);
  const locationInputRef = useRef(null);
  const { t } = useTranslation();
  const translate = t("home");

  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: GOOGLE_MAPS_API_KEY,
    libraries: libraries,
  });

  const onLoad = useCallback((autocompleteInstance) => {
    setAutocomplete(autocompleteInstance);
  }, []);

  const onPlaceChanged = () => {
    if (autocomplete !== null) {
      const place = autocomplete.getPlace();
      if (place.geometry) {
        setSelectedPlace(place);
        if (place && place.geometry) {
          const location = {
            lat: place.geometry.location.lat(),
            lng: place.geometry.location.lng(),
          };
          navigate("/luggage_locations", {
            state: { location, inputLocation: locationInputRef.current.value },
          });
        } else {
          console.log("Please select a valid place");
        }
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
      // className="banner bg-cover bg-center bg-no-repeat mt-28 h-screen flex items-center justify-center relative"
      // style={{ backgroundImage: `url(${backgroundImage})` }}
      className="bg-custom-teal-deep/10 min-h-fit h-auto w-screen bg-cover backdrop-blur bg-no-repeat"
    >
      {/* <div className="absolute inset-0 bg-teal-100 opacity-80 backdrop-blur blur"></div> */}
      <div className=" grid grid-cols-1 min-h-[75vh] h-full mt-24 md:grid-cols-2 md:items-center divide-x-reverse max-w-screen-xl mx-auto py-20">
        <div className="p-10 max-w-screen-md">
          <img
            // className="rounded-2xl w-full max-w-md mx-auto aspect-auto skew-x-3 -skew-y-12 rotate-2 scale-x-90 mb-5"
            className="mx-auto w-full aspect-video object-cover"
            src={backgroundImage}
            width={800}
            height={(800 * 9) / 16}
            alt="bg-image"
            loading="lazy"
          />
        </div>
        <div className="relative z-10 text-white px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold drop-shadow-lg capitalize text-center">
            <span className="slogan-color">{title.split(" ")[0]}</span>{" "}
            {title.split(" ")[1]}{" "}
            <span className="slogan-color">
              {title.split(" ")[2]} {title.split(" ")[3]}
            </span>
          </h1>
          <p className="mt-4 text-base sm:text-lg lg:text-xl drop-shadow-md text-custom-teal-deep">
            {subtitle}
          </p>

          {/* <form
            id="locationForm"
            className="mt-4"
            onSubmit={handleSubmit}
            aria-label="Location search form"
          > */}
            <div className="flex flex-col sm:flex-row justify-center items-center relative">
              {isLoaded && <Autocomplete
                onLoad={onLoad}
                onPlaceChanged={onPlaceChanged}
                className="flex items-center h-fit w-full"
              >
                <input
                  type="text"
                  id="location"
                  className="bg-white text-black placeholder:text-gray-700 rounded-full p-3 w-full h-fit"
                  placeholder={searchPlaceholder}
                  ref={locationInputRef}
                />
              </Autocomplete>}
              {/* <button
                type="submit"
                className="w-full rounded-full bg-custom-teal hover:bg-custom-teal-deep py-2 mt-2 hidden"
              >
                {searchButton}
              </button> */}
            </div>
            <button
              type="button"
              onClick={handleNearMyLocationClick}
              className={`bg-custom-teal hover:bg-custom-teal-deep text-white font-bold text-lg rounded-full shadow-md transition duration-300 ease-in-out mt-4 px-12 py-4 w-full md:w-fit ${
                loadingLocation ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={loadingLocation}
            >
              {findLocationsButton}
            </button>
          {/* </form> */}
        </div>
      </div>
    </div>
  );
}

export default Banner;
