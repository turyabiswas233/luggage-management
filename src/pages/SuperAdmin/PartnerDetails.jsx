import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faMapMarkerAlt, faIdBadge, faCalendarAlt, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import config from '../../config';
import SuperAdminSidebar from '../../partials/SuperAdminSidebar';
import SuperAdminHeader from '../../partials/SuperAdminHeader';

const PartnerDetails = () => {
    const { id } = useParams();
    const [partner, setPartner] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/');
            return;
        }

        const fetchPartnerDetails = async () => {
            setLoading(true);
            try {
                console.log('Fetching partner details...');
                const response = await axios.get(`${config.API_BASE_URL}/api/v1/users/partners/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                console.log('API response:', response);

                if (response.status === 200 && response.data) {
                    setPartner(response.data);
                    console.log('Partner data:', response.data);
                } else {
                    setError('Failed to fetch partner details');
                }
            } catch (err) {
                setError('Failed to fetch partner details');
                console.log('API error:', err);
            } finally {
                setLoading(false);
                console.log('Fetching completed');
            }
        };

        fetchPartnerDetails();
    }, [id, navigate]);

    if (loading) {
        return <div className="flex items-center justify-center h-screen"><div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div></div>;
    }

    if (error) {
        return <div className="flex items-center justify-center h-screen text-red-500">{error}</div>;
    }

    if (!partner) {
        return <div className="flex items-center justify-center h-screen">No partner details found</div>;
    }

    return (
        <div className="flex h-screen overflow-hidden bg-gray-50">
            {/* Sidebar */}
            <SuperAdminSidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

            {/* Content area */}
            <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
                {/* Site header */}
                <SuperAdminHeader sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

                <main className="flex-grow p-6">
                    <div className="max-w-3xl mx-auto">
                        <div className="bg-white p-8 rounded-lg shadow-lg transition-all transform hover:scale-105 duration-300">
                            <h1 className="text-4xl font-bold mb-6 text-center text-[#1a73a7]">{partner.user.username}  Details</h1>
                            <div className="mb-6">
                                <h2 className="text-2xl font-semibold mb-4 text-gray-800">{partner.user.username}</h2>
                                <div className="space-y-4">
                                    <p className="text-gray-600 flex items-center">
                                        <FontAwesomeIcon icon={faEnvelope} className="mr-2 text-[#1a73a7]" />
                                        <strong className="font-medium text-gray-700">Email:</strong> {partner.user.email}
                                    </p>
                                    <p className="text-gray-600 flex items-center">
                                        <FontAwesomeIcon icon={faMapMarkerAlt} className="mr-2 text-[#1a73a7]" />
                                        <strong className="font-medium text-gray-700">Business Address:</strong> {`${partner.businessAddress.street}, ${partner.businessAddress.district}, ${partner.businessAddress.city}, ${partner.businessAddress.state}, ${partner.businessAddress.zipCode}, ${partner.businessAddress.country}`}
                                    </p>
                                    <p className="text-gray-600 flex items-center">
                                        <FontAwesomeIcon icon={faIdBadge} className="mr-2 text-[#1a73a7]" />
                                        <strong className="font-medium text-gray-700">ABN Number:</strong> {partner.tradeLicenseNumber}
                                    </p>
       
                                </div>
                            </div>
                            <div className="flex justify-center">
                                <button
                                    onClick={() => navigate('/superadmin/partners')}
                                    className="px-6 py-2 bg-[#1a73a7] text-white rounded-full hover:bg-[#15628e] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-transform transform hover:-translate-y-1 flex items-center"
                                >
                                    <FontAwesomeIcon icon={faArrowLeft} className="mr-2" />
                                    Back to Partners List
                                </button>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default PartnerDetails;
