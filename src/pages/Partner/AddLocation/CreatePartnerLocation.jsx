import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import MapSelector from './MapSelector';
import LocationForm from './LocationForm';
import config from '../../../config';
import PartnerNavbarComp from '../PartnerNavbarComp';

const CreatePartnerLocation = () => {
    const [location, setLocation] = useState({});
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState({ text: '', type: '' });
    const navigate = useNavigate(); 

    const handleSelect = async ({ position, addressDetails, additionalDetails }) => {
        try {
            const timezoneResponse = await axios.get(`https://maps.googleapis.com/maps/api/timezone/json?location=${position.lat},${position.lng}&timestamp=${Math.floor(Date.now() / 1000)}&key=${config.GOOGLE_API_KEY}`);
            const timezone = timezoneResponse.data.timeZoneId || "Australia/Perth";
            setLocation({ coordinates: position, addressDetails, additionalDetails, timezone });
        } catch (error) {
            console.error('Error fetching timezone:', error);
            setLocation({ coordinates: position, addressDetails, additionalDetails, timezone: "Australia/Perth" });
        }
    };

    const handleSubmit = async (values) => {
        setLoading(true);
        setMessage({ text: '', type: '' });

        const formData = new FormData();
        formData.append('name', values.name);
        formData.append('description', values.description);
        formData.append('address[street]', values.street);
        formData.append('address[city]', values.city);
        formData.append('address[state]', values.state);
        formData.append('address[zipCode]', values.zipCode);
        formData.append('address[country]', values.country);
        formData.append('capacity', values.capacity);
        formData.append('availableSpace', 10000);  // Default value
        formData.append('regularPrice', 1000);   // Default value
        formData.append('discountPercentage', 10); // Default value
        formData.append('availableFrom', new Date().toISOString().split('T')[0]);  // Today's date
        formData.append('availableTo', new Date(new Date().setFullYear(new Date().getFullYear() + 20)).toISOString().split('T')[0]); // 20 years from now
        formData.append('amenities', JSON.stringify(["Wi-Fi", "Parking"]));  // Default value
        formData.append('notes', "Default notes");  // Default value
        formData.append('specialClosedDays', "");   // Default value
        formData.append('openTime', values.openTime);
        formData.append('closeTime', values.closeTime);
        formData.append('closedDays', values.closedDays);
        formData.append('locationType', values.locationType);
        formData.append('timezone', location.timezone);

        Array.from(values.files).forEach((file) => {
            formData.append('files', file);
        });

        formData.append('coordinates', JSON.stringify({
            type: "Point",
            coordinates: [location.coordinates.lng, location.coordinates.lat]
        }));

        const token = localStorage.getItem('token');
        const url = `${config.API_BASE_URL}/api/v1/locations/create`;

        try {
            const response = await axios.post(url, formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data'
                }
            });

            if (response.status >= 200 && response.status < 300) {
                setMessage({ text: 'Location created successfully!', type: 'success' });
                navigate('/partner/locations');
            } else {
                setMessage({ text: 'Failed to create location.', type: 'error' });
            }
        } catch (error) {
            if (error.response) {
                console.error('Error response data:', error.response.data);
                console.error('Error response status:', error.response.status);
                console.error('Error response headers:', error.response.headers);
                setMessage({ text: error.response.data.message || 'An error occurred. Please try again.', type: 'error' });
            } else {
                console.error('Error message:', error.message);
                setMessage({ text: 'An error occurred. Please try again.', type: 'error' });
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col h-screen overflow-hidden">
            <PartnerNavbarComp />
            <div className="flex-1 overflow-y-auto">
                <div className="container mx-auto mt-24 px-4 py-8">
                    <div className="flex justify-between items-center mb-6">
                        <button 
                            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition duration-300" 
                            onClick={() => navigate(-1)}
                        >
                            Back
                        </button>
                    </div>
                    {message.text && (
                        <div className={`alert ${message.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'} p-4 mb-6 rounded`}>
                            {message.text}
                        </div>
                    )}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="bg-white shadow-lg rounded p-6">
                            <MapSelector onSelect={handleSelect} />
                        </div>
                        <div className="bg-white shadow-lg rounded p-6">
                            <LocationForm onSubmit={handleSubmit} location={location} loading={loading} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreatePartnerLocation;
