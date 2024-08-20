import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import config from '../../config';

const CreateLocation = ({ addLocation }) => {
    const [step, setStep] = useState(1);
    const [newLocation, setNewLocation] = useState({
        name: '',
        description: '',
        price: '',
        discount: '',
        availableFrom: '',
        availableTo: '',
        regularPrice: '',
        discountPercentage: '',
        priceCurrency: 'AUD',
        url: '',
        openTime: '',
        closeTime: '',
        closedDays: '',
        specialClosedDays: '',
        locationType: 'Other',
        street: '',
        district: '',
        city: '',
        state: '',
        zipCode: '',
        country: 'Bangladesh',
        coordinates: {
            type: 'Point',
            coordinates: []
        },
        timezone: 'Asia/Dhaka',
        notes: '',
        pictures: []
    });

    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewLocation(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const validateStep1 = () => {
        const newErrors = {};
        if (!newLocation.name) newErrors.name = 'Name is required';
        if (!newLocation.description) newErrors.description = 'Description is required';
        if (!newLocation.regularPrice) newErrors.regularPrice = 'Regular price is required';
        if (newLocation.discountPercentage < 0 || newLocation.discountPercentage > 100) {
            newErrors.discountPercentage = 'Discount percentage must be between 0 and 100';
        }
        if (!newLocation.availableFrom) newErrors.availableFrom = 'Available from date is required';
        if (!newLocation.availableTo) newErrors.availableTo = 'Available to date is required';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const validateStep2 = () => {
        const newErrors = {};
        if (!newLocation.street) newErrors.street = 'Street is required';
        if (!newLocation.city) newErrors.city = 'City is required';
        if (!newLocation.state) newErrors.state = 'State is required';
        if (!newLocation.zipCode) newErrors.zipCode = 'Zip Code is required';
        if (!newLocation.country) newErrors.country = 'Country is required';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validateStep2()) {
            try {
                const { street, city, state, zipCode, country } = newLocation;
                const address = `${street}, ${city}, ${state}, ${zipCode}, ${country}`;
                const response = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=YOUR_GOOGLE_MAPS_API_KEY`);
                const location = response.data.results[0].geometry.location;
                newLocation.coordinates.coordinates = [location.lng, location.lat];

                await axios.post(`${config.API_BASE_URL}/api/v1/locations/create`, newLocation);
                addLocation(newLocation);
                navigate('/superadmin/locations');
            } catch (error) {
                console.error('Error creating location:', error);
            }
        }
    };

    const nextStep = () => {
        if (step === 1 && validateStep1()) {
            setStep(step + 1);
        } else if (step === 2 && validateStep2()) {
            handleSubmit();
        }
    };

    const prevStep = () => {
        setStep(step - 1);
    };

    return (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg relative">
                <button
                    type="button"
                    className="absolute top-4 right-4 text-gray-700 hover:text-gray-900 transition duration-150"
                    onClick={() => navigate('/superadmin/locations')}
                >
                    <span className="text-2xl">&times;</span>
                </button>
                <h2 className="text-2xl font-bold mb-6 text-center">Create New Location</h2>
                <form onSubmit={handleSubmit}>
                    {step === 1 && (
                        <div>
                            <div className="mb-4">
                                <label className="block mb-2 text-gray-700">Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={newLocation.name}
                                    onChange={handleChange}
                                    className="px-4 py-2 border rounded-lg w-full focus:outline-none focus:border-blue-500"
                                />
                                {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                            </div>
                            <div className="mb-4">
                                <label className="block mb-2 text-gray-700">Description</label>
                                <textarea
                                    name="description"
                                    value={newLocation.description}
                                    onChange={handleChange}
                                    className="px-4 py-2 border rounded-lg w-full focus:outline-none focus:border-blue-500"
                                ></textarea>
                                {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description}</p>}
                            </div>
                            <div className="mb-4">
                                <label className="block mb-2 text-gray-700">Regular Price</label>
                                <input
                                    type="number"
                                    name="regularPrice"
                                    value={newLocation.regularPrice}
                                    onChange={handleChange}
                                    className="px-4 py-2 border rounded-lg w-full focus:outline-none focus:border-blue-500"
                                />
                                {errors.regularPrice && <p className="text-red-500 text-xs mt-1">{errors.regularPrice}</p>}
                            </div>
                            <div className="mb-4">
                                <label className="block mb-2 text-gray-700">Discount Percentage</label>
                                <input
                                    type="number"
                                    name="discountPercentage"
                                    value={newLocation.discountPercentage}
                                    onChange={handleChange}
                                    className="px-4 py-2 border rounded-lg w-full focus:outline-none focus:border-blue-500"
                                />
                                {errors.discountPercentage && <p className="text-red-500 text-xs mt-1">{errors.discountPercentage}</p>}
                            </div>
                            <div className="mb-4">
                                <label className="block mb-2 text-gray-700">Available From</label>
                                <input
                                    type="date"
                                    name="availableFrom"
                                    value={newLocation.availableFrom}
                                    onChange={handleChange}
                                    className="px-4 py-2 border rounded-lg w-full focus:outline-none focus:border-blue-500"
                                />
                                {errors.availableFrom && <p className="text-red-500 text-xs mt-1">{errors.availableFrom}</p>}
                            </div>
                            <div className="mb-4">
                                <label className="block mb-2 text-gray-700">Available To</label>
                                <input
                                    type="date"
                                    name="availableTo"
                                    value={newLocation.availableTo}
                                    onChange={handleChange}
                                    className="px-4 py-2 border rounded-lg w-full focus:outline-none focus:border-blue-500"
                                />
                                {errors.availableTo && <p className="text-red-500 text-xs mt-1">{errors.availableTo}</p>}
                            </div>
                        </div>
                    )}
                    {step === 2 && (
                        <div>
                            <div className="mb-4">
                                <label className="block mb-2 text-gray-700">Street</label>
                                <input
                                    type="text"
                                    name="street"
                                    value={newLocation.street}
                                    onChange={handleChange}
                                    className="px-4 py-2 border rounded-lg w-full focus:outline-none focus:border-blue-500"
                                />
                                {errors.street && <p className="text-red-500 text-xs mt-1">{errors.street}</p>}
                            </div>
                            <div className="mb-4">
                                <label className="block mb-2 text-gray-700">District</label>
                                <input
                                    type="text"
                                    name="district"
                                    value={newLocation.district}
                                    onChange={handleChange}
                                    className="px-4 py-2 border rounded-lg w-full focus:outline-none focus:border-blue-500"
                                />
                                {errors.district && <p className="text-red-500 text-xs mt-1">{errors.district}</p>}
                            </div>
                            <div className="mb-4">
                                <label className="block mb-2 text-gray-700">City</label>
                                <input
                                    type="text"
                                    name="city"
                                    value={newLocation.city}
                                    onChange={handleChange}
                                    className="px-4 py-2 border rounded-lg w-full focus:outline-none focus:border-blue-500"
                                />
                                {errors.city && <p className="text-red-500 text-xs mt-1">{errors.city}</p>}
                            </div>
                            <div className="mb-4">
                                <label className="block mb-2 text-gray-700">State</label>
                                <input
                                    type="text"
                                    name="state"
                                    value={newLocation.state}
                                    onChange={handleChange}
                                    className="px-4 py-2 border rounded-lg w-full focus:outline-none focus:border-blue-500"
                                />
                                {errors.state && <p className="text-red-500 text-xs mt-1">{errors.state}</p>}
                            </div>
                            <div className="mb-4">
                                <label className="block mb-2 text-gray-700">Zip Code</label>
                                <input
                                    type="text"
                                    name="zipCode"
                                    value={newLocation.zipCode}
                                    onChange={handleChange}
                                    className="px-4 py-2 border rounded-lg w-full focus:outline-none focus:border-blue-500"
                                />
                                {errors.zipCode && <p className="text-red-500 text-xs mt-1">{errors.zipCode}</p>}
                            </div>
                            <div className="mb-4">
                                <label className="block mb-2 text-gray-700">Country</label>
                                <input
                                    type="text"
                                    name="country"
                                    value={newLocation.country}
                                    onChange={handleChange}
                                    className="px-4 py-2 border rounded-lg w-full focus:outline-none focus:border-blue-500"
                                />
                                {errors.country && <p className="text-red-500 text-xs mt-1">{errors.country}</p>}
                            </div>
                        </div>
                    )}
                    <div className="flex justify-between">
                        {step > 1 && (
                            <button
                                type="button"
                                onClick={prevStep}
                                className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition duration-150"
                            >
                                Previous
                            </button>
                        )}
                        <button
                            type="button"
                            onClick={nextStep}
                            className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition duration-150"
                        >
                            {step === 2 ? 'Submit' : 'Next'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateLocation;
