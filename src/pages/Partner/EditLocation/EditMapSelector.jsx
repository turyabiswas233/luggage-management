import React, { useState, useCallback, useRef, useEffect } from 'react';
import { GoogleMap, Marker, Autocomplete } from '@react-google-maps/api';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import debounce from 'lodash/debounce';
import useGoogleMapsApi from '../AddLocation/useGoogleMapsApi';
import config from '../../../config';

const EditMapSelector = ({ onSelect, initialPosition }) => {
    const isLoaded = useGoogleMapsApi(config.GOOGLE_API_KEY);
    const [selectedPosition, setSelectedPosition] = useState(null);
    const [autocomplete, setAutocomplete] = useState(null);
    const locationInputRef = useRef(null);

    useEffect(() => {
        if (initialPosition) {
            setSelectedPosition(initialPosition);
        }
    }, [initialPosition]);

    const onLoad = useCallback((autocompleteInstance) => {
        setAutocomplete(autocompleteInstance);
    }, []);

    const fetchAddressDetails = async (position) => {
        const { lat, lng } = position;
        try {
            const response = await axios.get(
                `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${config.GOOGLE_API_KEY}`
            );

            if (response.data.status === 'OK') {
                const addressComponents = response.data.results[0].address_components;
                const addressDetails = {
                    street: '',
                    city: '',
                    state: '',
                    zipCode: '',
                    country: '',
                };

                addressComponents.forEach((component) => {
                    if (component.types.includes('route')) {
                        addressDetails.street = component.long_name;
                    } else if (component.types.includes('locality')) {
                        addressDetails.city = component.long_name;
                    } else if (component.types.includes('administrative_area_level_1')) {
                        addressDetails.state = component.long_name;
                    } else if (component.types.includes('postal_code')) {
                        addressDetails.zipCode = component.long_name;
                    } else if (component.types.includes('country')) {
                        addressDetails.country = component.long_name;
                    }
                });

                onSelect({ position, addressDetails });
            } else {
                console.log('Failed to fetch address details:', response.data.status);
            }
        } catch (error) {
            console.error('Error fetching address details:', error);
        }
    };

    const debouncedFetchAddressDetails = useCallback(debounce(fetchAddressDetails, 500), []);

    const onPlaceChanged = () => {
        if (autocomplete !== null) {
            const place = autocomplete.getPlace();
            if (place.geometry) {
                const position = {
                    lat: place.geometry.location.lat(),
                    lng: place.geometry.location.lng(),
                };
                setSelectedPosition(position);
                debouncedFetchAddressDetails(position);
            } else {
                console.log('No geometry available for the selected place');
            }
        } else {
            console.log('Autocomplete is not loaded yet!');
        }
    };

    const handleMapClick = (event) => {
        const { lat, lng } = event.latLng;
        const position = { lat: lat(), lng: lng() };
        setSelectedPosition(position);
        debouncedFetchAddressDetails(position);
    };

    if (!isLoaded) {
        return <div className="flex items-center justify-center h-full">Loading...</div>;
    }

    return (
        <div className="relative p-4 bg-white shadow-lg rounded-lg">
            <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
                <div className="relative mb-4">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                        <FontAwesomeIcon icon={faSearch} className="text-gray-500" />
                    </span>
                    <input
                        type="text"
                        id="location"
                        className="form-input p-2 pl-10 pr-4 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-full transition duration-300"
                        placeholder="Search location..."
                        ref={locationInputRef}
                    />
                </div>
            </Autocomplete>
            <GoogleMap
                mapContainerStyle={{ width: '100%', height: '400px' }}
                center={selectedPosition || initialPosition || { lat: -31.950527, lng: 115.860457 }}
                zoom={15}
                onClick={handleMapClick}
                className="rounded-lg overflow-hidden"
            >
                {initialPosition && <Marker position={initialPosition} label="Old Location" />}
                {selectedPosition && <Marker position={selectedPosition} label="New Location" />}
            </GoogleMap>
        </div>
    );
};

export default EditMapSelector;
