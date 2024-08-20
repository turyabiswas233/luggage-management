import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { Spinner } from 'react-bootstrap';
import Sidebar from './Sidebar';
import MapContainer from './MapContainer';
import 'bootstrap/dist/css/bootstrap.min.css';
import './luggagelocation.css';
import config from '../../config';
import LugNavbar from './LugNavbar';

const LuggageLocation = () => {
  const { state } = useLocation();
  const [locations, setLocations] = useState([]);
  const [visibleLocations, setVisibleLocations] = useState([]);
  const [currentLocation, setCurrentLocation] = useState(state?.location);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLocations = async (retryCount = 0) => {
      try {
        const response = await axios.get(`${config.API_BASE_URL}/api/v1/locations/public/all-locations`);
        setLocations(response.data);
        setVisibleLocations(response.data);
        setLoading(false);
      } catch (error) {
        if (error.response && error.response.status === 429 && retryCount < 5) {
          const retryAfter = (error.response.headers['retry-after'] || 1) * 1000;
          setTimeout(() => fetchLocations(retryCount + 1), retryAfter);
        } else {
          console.error('Error fetching locations:', error);
          setLoading(false);
        }
      }
    };

    fetchLocations();
  }, []);

  const handleLocationSelected = (location) => {
    setCurrentLocation(location);
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center min-vh-100">
        <Spinner animation="border" role="status" variant="primary" style={{ width: '5rem', height: '5rem' }}>
          <span className="sr-only">Loading...</span>
        </Spinner>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <LugNavbar onLocationSelected={handleLocationSelected} />
      <div className="flex flex-col lg:flex-row flex-grow">
        <Sidebar
          className="w-full lg:w-1/3 p-2 lg:p-6 h-screen overflow-y-auto"
          storageSpots={visibleLocations}
          visibleLocations={visibleLocations}
        />
        <div className="w-full lg:w-2/3 h-screen">
          <MapContainer locations={locations} setVisibleLocations={setVisibleLocations} center={currentLocation} />
        </div>
      </div>
    </div>
  );
};

export default LuggageLocation;
