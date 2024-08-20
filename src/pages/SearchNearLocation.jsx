import React, { useState, useCallback, useEffect } from 'react';
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api';
import Sidebar from '../partials/Sidebar';
import Header from '../partials/Header';
import SearchBar from './SearchBar';
import LocationDetails from './LocationDetails';
import locations from './locationsData';

const containerStyle = {
  width: '100%',
  height: '750px',
};

const center = {
  lat: -33.8688,
  lng: 151.2093,
};



const SearchNearLocation = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredLocations, setFilteredLocations] = useState(locations);
  const [userLocation, setUserLocation] = useState(center);

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: 'AIzaSyCupdXut4FuMzxoOk6bw8B4gDAYfpOYcvo',
  });

  const handleMarkerClick = useCallback((location) => {
    setSelectedLocation(location);
  }, []);

  const handleSearch = useCallback(() => {
    if (searchQuery.trim()) {
      const filtered = locations.filter(location =>
        location.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredLocations(filtered);
    } else {
      setFilteredLocations(locations); // Reset to show all locations if search is cleared
    }
  }, [searchQuery]);

  useEffect(() => {
    handleSearch();
  }, [searchQuery, handleSearch]);

  useEffect(() => {
    setUserLocation({ lat: -33.8688, lng: 151.2093 });
  }, []);

  const handleNearMeClick = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({ lat: position.coords.latitude, lng: position.coords.longitude });
        },
        () => {
          console.error("User denied Geolocation");
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  };

  if (!isLoaded) return <div>Loading...</div>;

  return (
    <div className="flex h-screen overflow-hidden">
    <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
    <div className="flex-1 flex flex-col overflow-hidden">
      <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      <main className="flex-grow flex justify-center items-center p-10"> {/* Centered with padding */}
        <div className="bg-white shadow-lg rounded-lg p-6 w-1/3"> {/* Added background, shadow, and rounded corners */}
          <SearchBar setSearchQuery={setSearchQuery} onSearchClick={handleSearch} onNearMeClick={handleNearMeClick} />
          <div className="mt-4"> {/* Added margin-top for spacing */}
            {selectedLocation && <LocationDetails location={selectedLocation} />}
          </div>
        </div>

        <div className="flex-1 p-6">
          <div className="h-full border-2 border-gray-200 rounded-xl overflow-hidden">
            <GoogleMap mapContainerStyle={containerStyle} center={userLocation} zoom={14}>
              {filteredLocations.map((location) => (
                <Marker
                  key={location.id}
                  position={location.position}
                  onClick={() => handleMarkerClick(location)}
                />
              ))}
            </GoogleMap>
          </div>
        </div>
      </main>
    </div>
  </div>
  );
};

export default SearchNearLocation;
