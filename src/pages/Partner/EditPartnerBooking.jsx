import React, { useState } from 'react';

const EditPartnerBooking = ({ currentBooking, updateBooking, setIsEditing }) => {
    const [booking, setBooking] = useState(currentBooking);
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setBooking({ ...booking, [name]: value });
    };

    const validate = () => {
        const newErrors = {};
        if (!booking.clientId) newErrors.clientId = 'Client ID is required.';
        if (!booking.location) newErrors.location = 'Location is required.';
        if (!booking.bookingDate) {
            newErrors.bookingDate = 'Booking Date is required.';
        } else if (new Date(booking.bookingDate) < new Date()) {
            newErrors.bookingDate = 'Booking Date cannot be in the past.';
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validate()) {
            updateBooking(booking);
            setIsEditing(false);
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
            <div className="bg-white p-6 rounded-lg shadow-lg">
                <h2 className="text-xl mb-4">Edit Booking</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block mb-1">Client ID</label>
                        <input
                            type="text"
                            name="clientId"
                            value={booking.clientId}
                            onChange={handleChange}
                            className="px-4 py-2 border rounded-lg w-full"
                        />
                        {errors.clientId && <p className="text-red-500 text-sm">{errors.clientId}</p>}
                    </div>
                    <div className="mb-4">
                        <label className="block mb-1">Location</label>
                        <input
                            type="text"
                            name="location"
                            value={booking.location}
                            onChange={handleChange}
                            className="px-4 py-2 border rounded-lg w-full"
                        />
                        {errors.location && <p className="text-red-500 text-sm">{errors.location}</p>}
                    </div>
                    <div className="mb-4">
                        <label className="block mb-1">Booking Date</label>
                        <input
                            type="date"
                            name="bookingDate"
                            value={booking.bookingDate}
                            onChange={handleChange}
                            className="px-4 py-2 border rounded-lg w-full"
                        />
                        {errors.bookingDate && <p className="text-red-500 text-sm">{errors.bookingDate}</p>}
                    </div>
                    <div className="mb-4">
                        <label className="block mb-1">Status</label>
                        <select
                            name="status"
                            value={booking.status}
                            onChange={handleChange}
                            className="px-4 py-2 border rounded-lg w-full"
                        >
                            <option value="pending">Pending</option>
                            <option value="confirmed">Confirmed</option>
                            <option value="cancelled">Cancelled</option>
                            <option value="completed">Completed</option>
                        </select>
                    </div>
                    <div className="flex justify-end">
                        <button
                            type="button"
                            onClick={() => setIsEditing(false)}
                            className="px-4 py-2 bg-red-500 text-white rounded-lg mr-2"
                        >
                            Cancel
                        </button>
                        <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-lg">
                            Save
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditPartnerBooking;
