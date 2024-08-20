import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';
import 'tailwindcss/tailwind.css';
import PartnerNavbarComp from './PartnerNavbarComp';
import WelcomeBanner from '../../partials/dashboard/WelcomeBanner';
import config from '../../config';

const PartnerAnalytics = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('token'); // Retrieve token from local storage

        axios.get(`${config.API_BASE_URL}/api/v1/analytics/partner-analytics/`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(response => {
            setData(response.data);
            setLoading(false);
        })
        .catch(error => {
            console.error('Error fetching the data', error);
            setError('Failed to fetch data');
            setLoading(false);
        });
    }, []);

    if (loading) {
        return <div className="text-center mt-20">Loading...</div>;
    }

    if (error) {
        return <div className="text-center mt-20 text-red-500">{error}</div>;
    }

    if (!data) {
        return <div className="text-center mt-20">No data available</div>;
    }

    // Convert earnings from cents to AUD dollars
    const convertToDollars = (amountInCents) => (amountInCents / 100).toFixed(2);

    // Prepare data for the graph
    const labels = data.locations[0].bookings.pendingLast7Days.map(day => new Date(day.day).toLocaleDateString());
    const amounts = data.locations[0].bookings.pendingLast7Days.map(day => convertToDollars(day.total));

    const graphData = {
        labels: labels,
        datasets: [
            {
                label: 'Earnings in Last 7 Days (AUD)',
                data: amounts,
                fill: false,
                backgroundColor: 'rgb(75, 192, 192)',
                borderColor: 'rgba(75, 192, 192, 0.2)',
                tension: 0.1
            }
        ]
    };

    // Calculate total pending earnings in dollars
    const totalPendingEarnings = convertToDollars(data.locations[0].bookings.totalPending);

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

                        {/* Graph Component */}
                        <div className="mb-8">
                            <h1 className="text-2xl font-bold mb-4 text-center">Partner Analytics</h1>
                            <Line data={graphData} />
                        </div>

                        {/* Total Earnings and Indicators */}
                        <div className="flex justify-center items-center mb-8">
                            <div className="bg-white p-4 rounded-lg shadow-lg">
                                <h2 className="text-xl font-bold">Total Pending Earnings</h2>
                                <p className="text-3xl font-semibold text-green-500">${totalPendingEarnings} AUD</p>
                            </div>
                        </div>

                        {/* Table Component */}
                        <div className="overflow-x-auto bg-white rounded-lg shadow-lg">
                            <table className="table-auto w-full text-left">
                                <thead className="bg-gray-200">
                                    <tr>
                                        <th className="px-4 py-2">Start Date</th>
                                        <th className="px-4 py-2">End Date</th>
                                        <th className="px-4 py-2">Amount (AUD)</th>
                                        <th className="px-4 py-2">Status</th>
                                        <th className="px-4 py-2">Payment Method</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data.locations[0].bookings.pending.map((booking, index) => (
                                        <tr key={index} className="bg-white border-b">
                                            <td className="px-4 py-2">{new Date(booking.startDate).toLocaleDateString()}</td>
                                            <td className="px-4 py-2">{new Date(booking.endDate).toLocaleDateString()}</td>
                                            <td className="px-4 py-2">${convertToDollars(booking.payment.amount)}</td>
                                            <td className="px-4 py-2">
                                                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${booking.status === 'paid' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'}`}>
                                                    {/* {booking.status} */} paid
                                                </span>
                                            </td>
                                            <td className="px-4 py-2">{booking.payment.method}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default PartnerAnalytics;
