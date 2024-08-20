import React, { useState } from 'react';
import SuperAdminSidebar from '../../partials/SuperAdminSidebar';
import SuperAdminHeader from '../../partials/SuperAdminHeader';
import WelcomeBanner from '../../partials/dashboard/WelcomeBanner';

const AllPartnerPayment = () => {
    const [partners, setPartners] = useState([
        { id: 1, name: 'Partner1', monthlySales: 5000, totalBookings: 50, earnings: 4500, statusPaid: false },
        { id: 2, name: 'Partner2', monthlySales: 3000, totalBookings: 30, earnings: 2700, statusPaid: false },
        { id: 3, name: 'Partner3', monthlySales: 8000, totalBookings: 80, earnings: 7200, statusPaid: false },
        // More dummy data...
    ]);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [paymentModalOpen, setPaymentModalOpen] = useState(false);
    const [priceModalOpen, setPriceModalOpen] = useState(false);
    const [currentPartner, setCurrentPartner] = useState(null);
    const [price, setPrice] = useState('');
    const [discount, setDiscount] = useState('');

    const togglePaymentStatus = (id) => {
        setPartners(partners.map(partner => partner.id === id ? { ...partner, statusPaid: !partner.statusPaid } : partner));
    };

    const openPaymentModal = (partner) => {
        setCurrentPartner(partner);
        setPrice(partner.monthlySales);
        setPaymentModalOpen(true);
    };

    const handlePaymentFormSubmit = () => {
        console.log(`Price: ${price}`);
        setPaymentModalOpen(false);
    };

    const handleAddPriceClick = () => {
        setPrice('');
        setDiscount('');
        setPriceModalOpen(true);
    };

    const handlePriceFormSubmit = () => {
        console.log(`Price: ${price}, Discount: ${discount}`);
        setPriceModalOpen(false);
    };

    const handleCancel = () => {
        setPaymentModalOpen(false);
        setPriceModalOpen(false);
    };

    return (
        <div className="flex h-screen overflow-hidden">
            {/* Sidebar */}
            <SuperAdminSidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

            {/* Content area */}
            <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden bg-gray-100">
                {/* Site header */}
                <SuperAdminHeader sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

                <main>
                    <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
                        {/* Welcome banner */}
                        <WelcomeBanner />

                        {/* Add Price Button */}
                        <div className="mb-4">
                            <button
                                onClick={handleAddPriceClick}
                                className="px-4 py-2 rounded-lg bg-green-500 text-white transition duration-150"
                            >
                                Add Price
                            </button>
                        </div>

                        {/* Partner List Table */}
                        <div className="overflow-x-auto bg-white rounded-lg shadow-lg">
                            <table className="min-w-full">
                                <thead className="bg-[#4A686A] text-white">
                                    <tr>
                                        <th className="w-1/8 py-3 px-6 text-left">ID</th>
                                        <th className="w-1/8 py-3 px-6 text-left">Name</th>
                                        <th className="w-1/8 py-3 px-6 text-left">Monthly Sales</th>
                                        <th className="w-1/8 py-3 px-6 text-left">Total Bookings</th>
                                        <th className="w-1/8 py-3 px-6 text-left">Earnings After Service Charge</th>
                                        <th className="w-1/8 py-3 px-6 text-left">Payment Status</th>
                                        <th className="w-1/8 py-3 px-6 text-left">Actions</th>
                                    </tr>
                                </thead>

                                <tbody className="text-gray-800">
                                    {partners.map(partner => (
                                        <tr key={partner.id} className="bg-white hover:bg-gray-200 transition duration-150">
                                            <td className="w-1/8 py-3 px-6 border">{partner.id}</td>
                                            <td className="w-1/8 py-3 px-6 border">{partner.name}</td>
                                            <td className="w-1/8 py-3 px-6 border">${partner.monthlySales}</td>
                                            <td className="w-1/8 py-3 px-6 border">{partner.totalBookings}</td>
                                            <td className="w-1/8 py-3 px-6 border">${partner.earnings}</td>
                                            <td className="w-1/8 py-3 px-6 border text-center">
                                                <button
                                                    onClick={() => togglePaymentStatus(partner.id)}
                                                    className={`px-4 py-2 rounded-lg ${partner.statusPaid ? 'bg-green-500' : 'bg-red-500'} text-white transition duration-150`}
                                                >
                                                    {partner.statusPaid ? 'Paid' : 'Unpaid'}
                                                </button>
                                            </td>
                                            <td className="w-1/8 py-3 px-6 border text-center">
                                                <button
                                                    onClick={() => openPaymentModal(partner)}
                                                    className="px-4 py-2 rounded-lg bg-blue-500 text-white transition duration-150"
                                                >
                                                    Price Adjustment
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </main>
            </div>

            {/* Payment Modal */}
            {paymentModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                        <h2 className="text-xl font-bold mb-4">Price Adjustment for {currentPartner.name}</h2>
                        <div className="mb-4">
                            <label className="block text-gray-700">Price</label>
                            <input
                                type="text"
                                className="w-full px-3 py-2 border rounded-lg"
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                            />
                        </div>
                        <div className="flex justify-end">
                            <button
                                onClick={handleCancel}
                                className="px-4 py-2 rounded-lg bg-gray-300 text-gray-700 mr-2"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handlePaymentFormSubmit}
                                className="px-4 py-2 rounded-lg bg-blue-500 text-white"
                            >
                                Submit
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Add Price Modal */}
            {priceModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                        <h2 className="text-xl font-bold mb-4">Add Price and Discount</h2>
                        <div className="mb-4">
                            <label className="block text-gray-700">Price</label>
                            <input
                                type="text"
                                className="w-full px-3 py-2 border rounded-lg"
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700">Discount</label>
                            <input
                                type="text"
                                className="w-full px-3 py-2 border rounded-lg"
                                value={discount}
                                onChange={(e) => setDiscount(e.target.value)}
                            />
                        </div>
                        <div className="flex justify-end">
                            <button
                                onClick={handleCancel}
                                className="px-4 py-2 rounded-lg bg-gray-300 text-gray-700 mr-2"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handlePriceFormSubmit}
                                className="px-4 py-2 rounded-lg bg-green-500 text-white"
                            >
                                Submit
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AllPartnerPayment;
