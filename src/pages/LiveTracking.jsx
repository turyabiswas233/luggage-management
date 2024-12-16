import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import config from "../config";
function LiveTracking() {
  const { locationName } = useParams();
  const [storeDetails, setStoreDetails] = useState(null);

  const fetchStoreDetails = async (locName) => {
    const url = `${config.API_BASE_URL}/api/v1/locations/url/${locName}`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      setBookingAllowed(data?.canStoreLuggage);
      console.log(data);

      if (response.ok) {
        setStoreDetails({
          id: data?._id,
          title: data?.name,
          details: data?.description,
          price: data?.regularPrice,
          lat: data?.coordinates.coordinates[1],
          lng: data?.coordinates.coordinates[0],
          regularprice: data?.regularPrice,
          availableFrom: data?.availableFrom,
          availableTo: data?.availableTo,
          discountPercentage: data?.discountPercentage,
          canStoreLuggage: data?.canStoreLuggage,
          openTime: data?.openTime,
          closeTime: data?.closeTime,
          notes: data?.notes,
          link: data?.url,
          isAllowd: data?.canStoreLuggage,
        });
      } else {
        console.error("Error fetching store details:", data);
        alert("Error fetching store details. Please try again later.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error fetching store details. Please try again later.");
    }
  };

  return (
    <div className="h-full min-h-96 w-full max-w-screen-xl mx-auto my-10 p-5">
      <div className="bg-white h-full p-10 rounded-md shadow-xl ring-1">
        <h2 className="text-slate-800 text-3xl text-center font-bold">
          Live Location Tracking
        </h2>
        <p>{locationName}</p>
      </div>
    </div>
  );
}

export default LiveTracking;
