import React, { useEffect } from 'react';
import useGoogleMapsApi from '../Partner/AddLocation/useGoogleMapsApi';
import config from '../../config';

const MapContainer = ({ locations, setVisibleLocations, center }) => {
  const GOOGLE_MAPS_API_KEY = config.GOOGLE_API_KEY;
  const isLoaded = useGoogleMapsApi(GOOGLE_MAPS_API_KEY);

  useEffect(() => {
    if (isLoaded && window.google && window.google.maps) {
      initMap();
    }
  }, [isLoaded, locations, center]);

  const initMap = () => {
    if (!window.google || !window.google.maps) {
      console.error('Google Maps JavaScript API not loaded properly.');
      return;
    }

    const map = new google.maps.Map(document.getElementById('map'), {
      center: center || { lat: -33.8688, lng: 151.2093 },
      zoom: 7,
    });

    const bounds = new google.maps.LatLngBounds();

    locations.forEach(location => {
      const marker = new google.maps.Marker({
        position: { lat: location.coordinates.coordinates[1], lng: location.coordinates.coordinates[0] },
        map: map,
        title: location.name,
      });

      bounds.extend(marker.position);
    });

    if (!center) {
      map.fitBounds(bounds);
    } else {
      map.setZoom(14);  // Adjust zoom level as needed
    }

    google.maps.event.addListener(map, 'idle', () => {
      updateVisibleLocations(map, locations);
    });
  };

  const updateVisibleLocations = (map, locations) => {
    const bounds = map.getBounds();

    if (!bounds) return;

    const visibleLocations = locations.filter(location => {
      const latLng = new google.maps.LatLng(location.coordinates.coordinates[1], location.coordinates.coordinates[0]);
      return bounds.contains(latLng);
    });

    setVisibleLocations(visibleLocations);
  };

  return <div id="map" className="w-full h-full min-h-[400px] rounded-lg overflow-hidden"></div>;
};

export default MapContainer;
