import React, { useState, useRef, useCallback } from "react";
import { Autocomplete, useJsApiLoader } from "@react-google-maps/api";
import config from "../../config";
import urlockerLogo from "/files/img/home-two/logo3.svg"; // Adjust the path as needed
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

const libraries = ["places"];

const LugNavbar = ({ onLocationSelected, updateLocations }) => {
  const [autocomplete, setAutocomplete] = useState(null);
  const locationInputRef = useRef(null);

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
        onLocationSelected({
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng(),
        });
        updateLocations({
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng(),
        });
      } else {
        console.log("No geometry available for the selected place");
      }
    } else {
      console.log("Autocomplete is not loaded yet!");
    }
  };

  if (loadError) return <div>Error loading maps</div>;
  if (!isLoaded) return <div>Loading Maps</div>;

  return (
    <nav className="bg-white shadow-md p-4 flex justify-between items-center flex-shrink-0">
      {/* <div className="flex items-center">
        <button
          onClick={() => (window.location.href = "/")}
          className="focus:outline-none"
        >
          <img src={urlockerLogo} alt="Urloker Logo" width={80} height={80} />
        </button>
      </div> */}
      <div className="relative flex-grow w-full ring-custom-teal-deep ring-1 rounded-sm">
        <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3">
              <FontAwesomeIcon icon={faSearch} className="text-gray-500" />
            </span>
            <input
              type="text"
              id="location"
              className="form-input p-2 pl-10 pr-4 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-200 w-full"
              placeholder="Search location..."
              ref={locationInputRef}
            />
          </div>
        </Autocomplete>
      </div>
    </nav>
  );
};

export default LugNavbar;
