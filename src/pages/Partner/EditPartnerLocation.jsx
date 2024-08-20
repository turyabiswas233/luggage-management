import React, { useState, useEffect } from 'react';

const EditLocation = ({ currentLocation, updateLocation, setIsEditing }) => {
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

    const validate = () => {
        const newErrors = {};
        if (!location.id) newErrors.id = 'ID is required';
        if (!location.name) newErrors.name = 'Name is required';
        if (!location.description) newErrors.description = 'Description is required';
        if (!location.price) newErrors.price = 'Price is required';
        if (location.discount < 0 || location.discount > 100) {
            newErrors.discount = 'Discount must be between 0 and 100';
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validate()) {
            updateLocation(location);
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded-lg shadow-lg">
                <h2 className="text-2xl mb-4">Edit Location</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block mb-2">ID</label>
                        <input type="text" name="id" value={location.id} onChange={handleChange} className="px-4 py-2 border rounded-lg w-full" readOnly />
                        {errors.id && <p className="text-red-500 text-xs mt-1">{errors.id}</p>}
                    </div>
                    <div className="mb-4">
                        <label className="block mb-2">Name</label>
                        <input type="text" name="name" value={location.name} onChange={handleChange} className="px-4 py-2 border rounded-lg w-full" />
                        {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                    </div>
                    <div className="mb-4">
                        <label className="block mb-2">Description</label>
                        <textarea name="description" value={location.description} onChange={handleChange} className="px-4 py-2 border rounded-lg w-full"></textarea>
                        {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description}</p>}
                    </div>
                    <div className="mb-4">
                        <label className="block mb-2">Price</label>
                        <input type="number" name="price" value={location.price} onChange={handleChange} className="px-4 py-2 border rounded-lg w-full" />
                        {errors.price && <p className="text-red-500 text-xs mt-1">{errors.price}</p>}
                    </div>
                    <div className="mb-4">
                        <label className="block mb-2">Discount</label>
                        <input type="number" name="discount" value={location.discount} onChange={handleChange} className="px-4 py-2 border rounded-lg w-full" />
                        {errors.discount && <p className="text-red-500 text-xs mt-1">{errors.discount}</p>}
                    </div>
                    <div className="flex justify-end">
                        <button type="button" onClick={() => setIsEditing(false)} className="px-4 py-2 bg-gray-500 text-white rounded-lg mr-2">Cancel</button>
                        <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-lg">Save</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditLocation;
