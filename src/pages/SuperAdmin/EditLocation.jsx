import React, { useState, useEffect } from 'react';

const EditLocation = ({ currentLocation, updateLocation, setIsEditing }) => {
    const [step, setStep] = useState(1);
    const [location, setLocation] = useState(currentLocation);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        setLocation(currentLocation);
    }, [currentLocation]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setLocation(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const validateStep = () => {
        const newErrors = {};
        if (step === 1) {
            if (!location.id) newErrors.id = 'ID is required';
            if (!location.name) newErrors.name = 'Name is required';
        }
        if (step === 2) {
            if (!location.description) newErrors.description = 'Description is required';
            if (!location.price) newErrors.price = 'Price is required';
            if (location.discount < 0 || location.discount > 100) {
                newErrors.discount = 'Discount must be between 0 and 100';
            }
        }
        if (step === 3) {
            if (!location.startDate) newErrors.startDate = 'Start date is required';
            if (!location.endDate) newErrors.endDate = 'End date is required';
        }
        if (step === 4) {
            if (!location.recurringTimes) newErrors.recurringTimes = 'Recurring times is required';
            if (!location.partnerId) newErrors.partnerId = 'Partner ID is required';
            if (!location.locationType) newErrors.locationType = 'Location type is required';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleNext = () => {
        if (validateStep()) {
            setStep(prevStep => prevStep + 1);
        }
    };

    const handlePrevious = () => {
        setStep(prevStep => prevStep - 1);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateStep()) {
            updateLocation(location);
            setIsEditing(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg relative">
                <button
                    type="button"
                    className="absolute top-4 right-4 text-gray-700 hover:text-gray-900 transition duration-150"
                    onClick={() => setIsEditing(false)}
                >
                    <span className="text-2xl">&times;</span>
                </button>
                <h2 className="text-2xl font-bold mb-6 text-center">Edit Location</h2>
                <form onSubmit={handleSubmit}>
                    {step === 1 && (
                        <>
                            <div className="mb-4">
                                <label className="block mb-2 text-gray-700">ID</label>
                                <input
                                    type="text"
                                    name="id"
                                    value={location.id}
                                    onChange={handleChange}
                                    className="px-4 py-2 border rounded-lg w-full focus:outline-none focus:border-blue-500"
                                    readOnly
                                />
                                {errors.id && <p className="text-red-500 text-xs mt-1">{errors.id}</p>}
                            </div>
                            <div className="mb-4">
                                <label className="block mb-2 text-gray-700">Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={location.name}
                                    onChange={handleChange}
                                    className="px-4 py-2 border rounded-lg w-full focus:outline-none focus:border-blue-500"
                                />
                                {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                            </div>
                        </>
                    )}
                    {step === 2 && (
                        <>
                            <div className="mb-4">
                                <label className="block mb-2 text-gray-700">Description</label>
                                <textarea
                                    name="description"
                                    value={location.description}
                                    onChange={handleChange}
                                    className="px-4 py-2 border rounded-lg w-full focus:outline-none focus:border-blue-500"
                                ></textarea>
                                {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description}</p>}
                            </div>
                            <div className="mb-4">
                                <label className="block mb-2 text-gray-700">Price</label>
                                <input
                                    type="number"
                                    name="price"
                                    value={location.price}
                                    onChange={handleChange}
                                    className="px-4 py-2 border rounded-lg w-full focus:outline-none focus:border-blue-500"
                                />
                                {errors.price && <p className="text-red-500 text-xs mt-1">{errors.price}</p>}
                            </div>
                            <div className="mb-4">
                                <label className="block mb-2 text-gray-700">Discount</label>
                                <input
                                    type="number"
                                    name="discount"
                                    value={location.discount}
                                    onChange={handleChange}
                                    className="px-4 py-2 border rounded-lg w-full focus:outline-none focus:border-blue-500"
                                />
                                {errors.discount && <p className="text-red-500 text-xs mt-1">{errors.discount}</p>}
                            </div>
                        </>
                    )}
                    {step === 3 && (
                        <>
                            <div className="mb-4">
                                <label className="block mb-2 text-gray-700">Start Date</label>
                                <input
                                    type="date"
                                    name="startDate"
                                    value={location.startDate}
                                    onChange={handleChange}
                                    className="px-4 py-2 border rounded-lg w-full focus:outline-none focus:border-blue-500"
                                />
                                {errors.startDate && <p className="text-red-500 text-xs mt-1">{errors.startDate}</p>}
                            </div>
                            <div className="mb-4">
                                <label className="block mb-2 text-gray-700">End Date</label>
                                <input
                                    type="date"
                                    name="endDate"
                                    value={location.endDate}
                                    onChange={handleChange}
                                    className="px-4 py-2 border rounded-lg w-full focus:outline-none focus:border-blue-500"
                                />
                                {errors.endDate && <p className="text-red-500 text-xs mt-1">{errors.endDate}</p>}
                            </div>
                        </>
                    )}
                    {step === 4 && (
                        <>
                            <div className="mb-4">
                                <label className="block mb-2 text-gray-700">Recurring Times</label>
                                <input
                                    type="number"
                                    name="recurringTimes"
                                    value={location.recurringTimes}
                                    onChange={handleChange}
                                    className="px-4 py-2 border rounded-lg w-full focus:outline-none focus:border-blue-500"
                                />
                                {errors.recurringTimes && <p className="text-red-500 text-xs mt-1">{errors.recurringTimes}</p>}
                            </div>
                            <div className="mb-4">
                                <label className="block mb-2 text-gray-700">Partner ID</label>
                                <input
                                    type="text"
                                    name="partnerId"
                                    value={location.partnerId}
                                    onChange={handleChange}
                                    className="px-4 py-2 border rounded-lg w-full focus:outline-none focus:border-blue-500"
                                />
                                {errors.partnerId && <p className="text-red-500 text-xs mt-1">{errors.partnerId}</p>}
                            </div>
                            <div className="mb-6">
                                <label className="block mb-2 text-gray-700">Location Type</label>
                                <input
                                    type="text"
                                    name="locationType"
                                    value={location.locationType}
                                    onChange={handleChange}
                                    className="px-4 py-2 border rounded-lg w-full focus:outline-none focus:border-blue-500"
                                />
                                {errors.locationType && <p className="text-red-500 text-xs mt-1">{errors.locationType}</p>}
                            </div>
                        </>
                    )}
                    <div className="flex justify-between">
                        {step > 1 && (
                            <button
                                type="button"
                                onClick={handlePrevious}
                                className="px-4 py-2 bg-gray-500 text-white rounded-lg mr-2 hover:bg-gray-600 transition duration-150"
                            >
                                Previous
                            </button>
                        )}
                        {step < 4 ? (
                            <button
                                type="button"
                                onClick={handleNext}
                                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-150 ml-auto"
                            >
                                Next
                            </button>
                        ) : (
                            <button
                                type="submit"
                                className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition duration-150 ml-auto"
                            >
                                Save
                            </button>
                        )}
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditLocation;
