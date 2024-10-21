import React, { useEffect } from "react";
import useGoogleMapsApi from "../Partner/AddLocation/useGoogleMapsApi";
import config from "../../config";
import googleMapIcon from "/img/home-two/gmi.svg";
import userLocation from "/img/home-two/userLocation.svg"; 

const MapContainer = ({ locations, setVisibleLocations, center }) => {
  const GOOGLE_MAPS_API_KEY = config.GOOGLE_API_KEY;
  const isLoaded = useGoogleMapsApi(GOOGLE_MAPS_API_KEY);

  useEffect(() => {
    if (isLoaded && window.google && window.google.maps.Map) {
      try {
        initMap();
      } catch (error) {
        console.log(error);
      }
    }
  }, [isLoaded, locations, center]);

  const initMap = async () => {
    if (window.google && window.google.maps.Map) {
      const map = new google.maps.Map(document.getElementById("map"), {
        center: center || { lat: -36.8688, lng: 144.9093 },
        mapId: "mapId",
        minZoom: 12,
        zoom: 15,
        maxZoom: 30,
      });
      if (!map) return;

      const bounds = new google.maps.LatLngBounds();
      const { AdvancedMarkerElement } = await google.maps.importLibrary(
        "marker"
      );
      const userIcon = document.createElement("img");
      userIcon.src = userLocation;
      userIcon.width = 30;
      userIcon.height = 30;

      const userMarker = new AdvancedMarkerElement({
        position: {
          lat: center?.lat || -37.8295,
          lng: center?.lng || 144.905,
        },
        map: map,
        title: "You",
        content: userIcon,
      });

      locations.forEach((location) => {
        const markerIcon = document.createElement("img");
        markerIcon.src = googleMapIcon;
        markerIcon.width = 30;
        markerIcon.height = 30;

        const marker = new AdvancedMarkerElement({
          position: {
            lat: location.coordinates.coordinates[1],
            lng: location.coordinates.coordinates[0],
          },
          map: map,
          title: location.name,

          content: markerIcon,
        });
        bounds.extend(marker.position);
      });

      bounds.extend(userMarker.position);

      if (!center) {
        map.fitBounds(bounds);
      } else {
        map.setZoom(15); // Adjust zoom level as needed
      }

      google.maps.event.addListener(map, "idle", () => {
        updateVisibleLocations(map, locations);
      });
    } else {
      console.error("Google Maps JavaScript API not loaded properly.");
      return;
    }
  };

  const updateVisibleLocations = (map, locations) => {
    const bounds = map.getBounds();

    if (!bounds) return;

    const visibleLocations = locations.filter((location) => {
      const latLng = new google.maps.LatLng(
        location.coordinates.coordinates[1],
        location.coordinates.coordinates[0]
      );
      return bounds.contains(latLng);
    });

    setVisibleLocations(visibleLocations);
  };

  return (
    <div id="map" className="w-full h-full min-h-[500px] overflow-hidden"></div>
  );
};

export default MapContainer;
