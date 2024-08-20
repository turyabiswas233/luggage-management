import React, { useState } from 'react';
// import axios from 'axios'; // Commented out for dummy data

import PartnerNavbarComp from './PartnerNavbarComp';


const AllCustomer = () => {
    // Commented out API related states and useEffect for dummy data
    const [customers, setCustomers] = useState([
        { id: 1, name: 'Customer Name 1', locationBooked: 'Location 1', startDate: '2021-01-01', endDate: '2021-01-10', amountPaid: '$1000', recurringTimes: 3 },
        { id: 2, name: 'Customer Name 2', locationBooked: 'Location 2', startDate: '2021-02-01', endDate: '2021-02-10', amountPaid: '$2000', recurringTimes: 2 },
        { id: 3, name: 'Customer Name 3', locationBooked: 'Location 3', startDate: '2021-03-01', endDate: '2021-03-10', amountPaid: '$1500', recurringTimes: 4 }
    ]);
    const [searchQuery, setSearchQuery] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    const filteredCustomers = customers.filter(customer => customer.id.toString().includes(searchQuery));

    // useEffect(() => {
    //     const fetchCustomers = async () => {
    //         try {
    //             setLoading(true);
    //             const response = await axios.get('http://localhost:3001/api/admin/customers');
    //             setCustomers(response.data);
    //             setLoading(false);
    //         } catch (error) {
    //             setError(error);
    //             setLoading(false);
    //         }
    //     };

    //     fetchCustomers();
    // }, []);

    // if (loading) return <p>Loading...</p>;
    // if (error) return <p>Error loading data: {error.message}</p>;

    return (
        <div className="flex flex-col h-screen overflow-hidden">
            <PartnerNavbarComp />

            {/* Content area */}
            <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
                <main>
                    <div className="px-4 sm:px-6 mt-32 lg:px-8 py-8 w-full max-w-9xl mx-auto">


                        {/* Search bar */}
                        <div className="mb-4">
                            <input
                                type="text"
                                placeholder="Search by ID"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="px-4 py-2 border rounded-lg w-full"
                            />
                        </div>

                        {/* Customer List Table */}
                        <div className="overflow-x-auto">
                            <table className="min-w-full bg-white">
                                <thead className="bg-gray-800 text-white">
                                    <tr>
                                        <th className="w-1/9 py-3 px-6 text-left">ID</th>
                                        <th className="w-1/9 py-3 px-6 text-left">Name</th>
                                        <th className="w-1/9 py-3 px-6 text-left">Location Booked</th>
                                        <th className="w-1/9 py-3 px-6 text-left">Start Date</th>
                                        <th className="w-1/9 py-3 px-6 text-left">End Date</th>
                                        <th className="w-1/9 py-3 px-6 text-left">Amount Paid</th>
                                        <th className="w-1/9 py-3 px-6 text-left">Recurring Times</th>
                                    </tr>
                                </thead>

                                <tbody className="text-gray-700">
                                    {filteredCustomers.map(customer => (
                                        <tr key={customer.id}>
                                            <td className="w-1/9 py-3 px-6 border">{customer.id}</td>
                                            <td className="w-1/9 py-3 px-6 border">{customer.name}</td>
                                            <td className="w-1/9 py-3 px-6 border">{customer.locationBooked}</td>
                                            <td className="w-1/9 py-3 px-6 border">{formatDate(customer.startDate)}</td>
                                            <td className="w-1/9 py-3 px-6 border">{formatDate(customer.endDate)}</td>
                                            <td className="w-1/9 py-3 px-6 border">{customer.amountPaid}</td>
                                            <td className="w-1/9 py-3 px-6 border">{customer.recurringTimes}</td>
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

export default AllCustomer;
