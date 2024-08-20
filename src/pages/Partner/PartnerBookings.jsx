import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PartnerNavbarComp from './PartnerNavbarComp';
import WelcomeBanner from '../../partials/dashboard/WelcomeBanner';
import config from '../../config';

const PartnerBookings = () => {
    const [bookings, setBookings] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [bookingsPerPage] = useState(50);

    useEffect(() => {
        const fetchBookings = async () => {
            setLoading(true);
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get(`${config.API_BASE_URL}/api/v1/bookings/fetch/all/booking-info/`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                if (Array.isArray(response.data)) {
                    setBookings(response.data);
                } else {
                    setBookings([]);
                }
                setLoading(false);
            } catch (error) {
                setLoading(false);
                if (error.response && error.response.status === 401) {
                    window.location.href = '/logout';
                } else {
                    setError('Failed to fetch bookings');
                }
            }
        };

        fetchBookings();
    }, []);

    const filteredBookings = bookings.filter(booking =>
        booking.location.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const indexOfLastBooking = currentPage * bookingsPerPage;
    const indexOfFirstBooking = indexOfLastBooking - bookingsPerPage;
    const currentBookings = filteredBookings.slice(indexOfFirstBooking, indexOfLastBooking);

    const paginate = pageNumber => setCurrentPage(pageNumber);

    const formatDate = (dateString) => {
        if (!dateString) return '';
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    const formatDateTime = (dateString, timeString) => {
        if (!dateString || !timeString) return '';
        const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
        const date = new Date(dateString);
        const [hours, minutes] = timeString.split(':');
        date.setHours(hours, minutes);
        return date.toLocaleString(undefined, options);
    };

    return (
        <div className="flex flex-col h-screen overflow-hidden bg-gray-100">
            {/* Navbar */}
            <PartnerNavbarComp />

            {/* Content area */}
            <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
                <main>
                    <div className="px-4 mt-32 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
                        {/* Welcome banner */}
                        <WelcomeBanner />

                        {/* Search bar */}
                        <div className="mb-4">
                            <input
                                type="text"
                                placeholder="Search by Location"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="px-4 py-2 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-600 transition duration-300"
                            />
                        </div>

                        {/* Booking List Table */}
                        <div className="overflow-x-auto bg-white rounded-lg shadow-lg">
                            {loading ? (
                                <div className="flex justify-center items-center p-8">Loading...</div>
                            ) : error ? (
                                <div className="flex justify-center items-center p-8 text-red-500">{error}</div>
                            ) : (
                                <table className="min-w-full">
                                    <thead className="bg-[#4A686A] text-white">
                                        <tr>
                                            <th className="w-1/4 py-3 px-6 text-left">Location</th>
                                            <th className="w-1/6 py-3 px-6 text-left">Booking Date</th>
                                            <th className="w-1/4 py-3 px-6 text-left">Drop-off Time</th>
                                            <th className="w-1/4 py-3 px-6 text-left">Pick-up Time</th>
                                            <th className="w-1/6 py-3 px-6 text-left">Status</th>
                                        </tr>
                                    </thead>

                                    <tbody className="text-gray-800">
                                        {currentBookings.map((booking, index) => (
                                            <tr key={index} className="bg-white hover:bg-gray-200 transition duration-150">
                                                <td className="w-1/4 py-3 px-6 border">{booking.location.name || ''}</td>
                                                <td className="w-1/6 py-3 px-6 border">{formatDate(booking.bookingDate)}</td>
                                                <td className="w-1/4 py-3 px-6 border">{formatDateTime(booking.startDate, booking.startTime)}</td>
                                                <td className="w-1/4 py-3 px-6 border">{formatDateTime(booking.endDate, booking.endTime)}</td>
                                                <td className="w-1/6 py-3 px-6 border">{booking.status || ''}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            )}
                        </div>

                        {/* Pagination */}
                        <div className="mt-6 flex justify-center">
                            <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                                {[...Array(Math.ceil(filteredBookings.length / bookingsPerPage)).keys()].map(number => (
                                    <button
                                        key={number}
                                        onClick={() => paginate(number + 1)}
                                        className={`relative inline-flex items-center px-4 py-2 border border-gray-300 bg-blue text-sm font-medium hover:bg-blue-500 hover:text-black transition duration-300 ${currentPage === number + 1 ? 'bg-blue-500 text-blue' : ''}`}
                                    >
                                        {number + 1}
                                    </button>
                                ))}
                            </nav>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default PartnerBookings;
