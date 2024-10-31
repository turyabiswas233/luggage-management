import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import Sidebar from "./Sidebar";
import MapContainer from "./MapContainer";

import "./luggagelocation.css";
import config from "../../config";
import { LuLoader } from "react-icons/lu";

const LuggageLocation = () => {
  const { state } = useLocation();
  const [locations, setLocations] = useState([]);
  const [visibleLocations, setVisibleLocations] = useState([]);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchLocations = async (loc, retryCount = 0) => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${config.API_BASE_URL}/api/v1/locations/nearest-locations`,
        {
          params: {
            latitude: loc?.lat || -37.805,
            longitude: loc?.lng || 144.805,
            maxDistance: 30000,
            limit: 30,
          },
        }
      );
      console.log(response.data);
      setLocations(response.data);
      setVisibleLocations(response.data);
      setLoading(false);
      return;
    } catch (error) {
      if (error.response && error.response.status === 429 && retryCount < 5) {
        const retryAfter = (error.response.headers["retry-after"] || 1) * 1000;
        setTimeout(() => fetchLocations(loc, retryCount + 1), retryAfter);
      } else {
        console.error("Error fetching locations:", error);
        setLoading(false);
      }
    } finally {
      setLoading(false);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (state?.location) {
      setCurrentLocation(state?.location);
      fetchLocations(state?.location);
    } else getNearestLocations();
  }, [state]);

  const handleLocationSelected = (location) => {
    setCurrentLocation(location);
  };

  const getNearestLocations = async (loc) => {
    if (loc) {
      setCurrentLocation(loc);
      fetchLocations(loc);
    } else if (state?.location) {
      setCurrentLocation(state?.location);
    } else if (navigator.geolocation) {
      setLoading(true);
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCurrentLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
          fetchLocations({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => {
          console.error("Error fetching location:", error);
          if (navigator.permissions) {
            navigator.permissions
              .query({ name: "geolocation" })
              .then(function (result) {
                if (result.state === "denied") {
                  alert("Please enable location services to use this feature");
                }
              });
          }
        }
      );
      if (currentLocation) {
        return currentLocation;
      }
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-dvh">
        <LuLoader size={"3em"} className="animate-spin" />
      </div>
    );
  }
  return (
    <div className="lg:h-screen overflow-y-hidden flex flex-col lg:flex-row">
      <Sidebar
        visibleLocations={visibleLocations}
        foundLocationLength={locations.length}
        onLocationSelected={handleLocationSelected}
        seeOnMyLocation={fetchLocations}
      />

      <div className="w-full lg:col-span-2 h-full">
        <MapContainer
          locations={locations}
          setVisibleLocations={setVisibleLocations}
          center={currentLocation}
        />
      </div>
    </div>
  );
};

export default LuggageLocation;
