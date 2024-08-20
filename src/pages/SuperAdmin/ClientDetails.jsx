import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faCalendarAlt, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import config from '../../config';
import SuperAdminSidebar from '../../partials/SuperAdminSidebar';
import SuperAdminHeader from '../../partials/SuperAdminHeader';

const ClientDetails = () => {
    const { id } = useParams();
    const [client, setClient] = useState(null);
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

        const fetchClientDetails = async () => {
            setLoading(true);
            try {
                console.log('Fetching client details...');
                const response = await axios.get(`${config.API_BASE_URL}/api/v1/users/client/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                console.log('API response:', response);

                if (response.status === 200 && response.data) {
                    setClient(response.data);
                    console.log('Client data:', response.data);
                } else {
                    setError('Failed to fetch client details');
                }
            } catch (err) {
                setError('Failed to fetch client details');
                console.log('API error:', err);
            } finally {
                setLoading(false);
                console.log('Fetching completed');
            }
        };

        fetchClientDetails();
    }, [id, navigate]);

    if (loading) {
        return <div className="flex items-center justify-center h-screen"><div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div></div>;
    }

    if (error) {
        return <div className="flex items-center justify-center h-screen text-red-500">{error}</div>;
    }

    if (!client) {
        return <div className="flex items-center justify-center h-screen">No client details found</div>;
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
                            <h1 className="text-4xl font-bold mb-6 text-center text-[#1a73a7]">{client.user.username} Details</h1>
                            <div className="mb-6">
                                <h2 className="text-2xl font-semibold mb-4 text-gray-800">{client.user.username}</h2>
                                <div className="space-y-4">
                                    <p className="text-gray-600 flex items-center">
                                        <FontAwesomeIcon icon={faEnvelope} className="mr-2 text-[#1a73a7]" />
                                        <strong className="font-medium text-gray-700">Email:</strong> {client.user.email}
                                    </p>
                                    <p className="text-gray-600 flex items-center">
                                        <FontAwesomeIcon icon={faCalendarAlt} className="mr-2 text-[#1a73a7]" />
                                        <strong className="font-medium text-gray-700">Account Created At:</strong> {new Date(client.user.createdAt).toLocaleDateString()}
                                    </p>
                                    <p className="text-gray-600 flex items-center">
                                        <FontAwesomeIcon icon={faCalendarAlt} className="mr-2 text-[#1a73a7]" />
                                        <strong className="font-medium text-gray-700">Account Updated At:</strong> {new Date(client.user.updatedAt).toLocaleDateString()}
                                    </p>
                                </div>
                            </div>
                            <div className="flex justify-center">
                                <button
                                    onClick={() => navigate('/superadmin/clients')}
                                    className="px-6 py-2 bg-[#1a73a7] text-white rounded-full hover:bg-[#15628e] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-transform transform hover:-translate-y-1 flex items-center"
                                >
                                    <FontAwesomeIcon icon={faArrowLeft} className="mr-2" />
                                    Back to Clients List
                                </button>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default ClientDetails;
