import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Modal from 'react-modal'; // Import the Modal component

import SuperAdminSidebar from '../../partials/SuperAdminSidebar';
import SuperAdminHeader from '../../partials/SuperAdminHeader';
import WelcomeBanner from '../../partials/dashboard/WelcomeBanner';
import config from '../../config';
import ErrorModal from '../components/ErrorModal'; // Import the ErrorModal component

Modal.setAppElement('#root'); // Ensure the app element is set for accessibility

const AllClient = () => {
    const [clients, setClients] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState(''); // For modal error message
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [clientsPerPage] = useState(50);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [selectedClient, setSelectedClient] = useState(null);
    const [actionType, setActionType] = useState('');

    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/logout');
            return;
        }

        const fetchClients = async () => {
            setLoading(true);
            try {
                const response = await axios.get(`${config.API_BASE_URL}/api/v1/users/all-clients`, { 
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                if (response.data.status === 'success') {
                    const fetchedClients = response.data.data.map(client => ({
                        id: client._id,
                        username: client.user.username,
                        email: client.user.email,
                        isDeleted: client.user.isDeleted,
                    }));
                    setClients(fetchedClients);
                } else {
                    setErrorMessage('Failed to fetch client data');
                }
            } catch (err) {
                if (err.response && err.response.status === 401) {
                    navigate('/logout');
                } else {
                    setErrorMessage('Failed to fetch client data');
                }
            } finally {
                setLoading(false);
            }
        };

        fetchClients();
    }, [navigate]);

    const handleAction = (client, type) => {
        setSelectedClient(client);
        setActionType(type);
        setModalIsOpen(true);
    };

    const confirmAction = async () => {
        const token = localStorage.getItem('token');
        try {
            if (actionType === 'softDelete') {
                const response = await axios.delete(`${config.API_BASE_URL}/api/v1/users/clients/${selectedClient.id}/soft`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                if (response.data.message) {
                    setClients(clients.map(client =>
                        client.id === selectedClient.id ? { ...client, isDeleted: true } : client
                    ));
                    setErrorMessage('Client soft deleted successfully');
                } else {
                    setErrorMessage('Failed to soft delete client');
                }
            } else if (actionType === 'hardDelete') {
                const response = await axios.delete(`${config.API_BASE_URL}/api/v1/users/clients/${selectedClient.id}/hard`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                if (response.data.message) {
                    setClients(clients.filter(client => client.id !== selectedClient.id));
                    setErrorMessage('Client deleted successfully');
                } else {
                    setErrorMessage('Failed to delete client');
                }
            }
        } catch (err) {
            setErrorMessage('Failed to perform action. Please try again.');
        } finally {
            setModalIsOpen(false);
            setSelectedClient(null);
            setActionType('');
        }
    };

    const filteredClients = clients.filter(client =>
        client.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
        client.email.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const indexOfLastClient = currentPage * clientsPerPage;
    const indexOfFirstClient = indexOfLastClient - clientsPerPage;
    const currentClients = filteredClients.slice(indexOfFirstClient, indexOfLastClient);

    const paginate = pageNumber => setCurrentPage(pageNumber);

    const handleCloseModal = () => {
        setErrorMessage('');
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen bg-gray-100">
                <div className="relative">
                    <div className="loader ease-linear rounded-full border-8 border-t-8 border-blue-400 h-32 w-32"></div>
                    <div className="absolute top-0 left-0 h-full w-full flex items-center justify-center">
                        <svg className="animate-spin h-24 w-24 text-blue-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4l-3 3-1-1-3 3a8 8 0 010-8z"></path>
                        </svg>
                    </div>
                </div>
            </div>
        );
    }

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

                        {/* Search bar */}
                        <div className="mb-4">
                            <input
                                type="text"
                                placeholder="Search by Username or Email"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="px-4 py-2 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-600 transition duration-300"
                            />
                        </div>

                        {/* Client List Table */}
                        <div className="overflow-x-auto bg-white rounded-lg shadow-lg">
                            <table className="min-w-full">
                                <thead className="bg-[#4A686A] text-white">
                                    <tr>
                                        <th className="w-1/4 py-3 px-6 text-left">Username</th>
                                        <th className="w-1/4 py-3 px-6 text-left">Email</th>
                                        <th className="w-1/4 py-3 px-6 text-left">Actions</th>
                                        <th className="w-1/4 py-3 px-6 text-left">Trash</th>
                                    </tr>
                                </thead>

                                <tbody className="text-gray-800">
                                    {currentClients.map(client => (
                                        <tr key={client.id} className="bg-white hover:bg-gray-200 transition duration-150">
                                            <td className="w-1/4 py-3 px-6 border">
                                                <button
                                                    onClick={() => navigate(`/superadmin/clients/${client.id}`)}
                                                    className="text-blue-600 hover:text-blue-800"
                                                >
                                                    {client.username}
                                                </button>
                                            </td>
                                            <td className="w-1/4 py-3 px-6 border">{client.email}</td>
                                            <td className="w-1/4 py-3 px-6 border text-center">
                                                <button
                                                    onClick={() => handleAction(client, 'hardDelete')}
                                                    className="px-2 py-2 bg-red-500 hover:bg-red-700 text-white rounded"
                                                >
                                                    Delete
                                                </button>
                                            </td>
                                            <td className="w-1/4 py-3 px-6 border text-center">
                                                {client.isDeleted ? (
                                                    <span className="text-gray-500">Soft Deleted</span>
                                                ) : (
                                                    <button
                                                        onClick={() => handleAction(client, 'softDelete')}
                                                        className="px-2 py-2 bg-orange-500 hover:bg-orange-700 text-white rounded"
                                                    >
                                                        Trash
                                                    </button>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Pagination */}
                        <div className="mt-6 flex justify-center">
                            <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                                {[...Array(Math.ceil(filteredClients.length / clientsPerPage)).keys()].map(number => (
                                    <button
                                        key={number}
                                        onClick={() => paginate(number + 1)}
                                        className={`relative inline-flex items-center px-4 py-2 border border-gray-300 bg-blue text-sm font-medium hover:bg-blue-500 hover:text-white transition duration-300 ${currentPage === number + 1 ? 'bg-blue-500 text-white' : ''}`}
                                    >
                                        {number + 1}
                                    </button>
                                ))}
                            </nav>
                        </div>
                    </div>
                </main>
            </div>

            {/* Confirmation Modal */}
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={() => setModalIsOpen(false)}
                className="fixed inset-0 flex items-center justify-center"
                overlayClassName="fixed inset-0 bg-black bg-opacity-50"
            >
                <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
                    <h2 className="text-xl font-semibold mb-4">
                        Confirm {actionType === 'softDelete' ? 'Soft Delete' : 'Hard Delete'} Action
                    </h2>
                    <p className="mb-6">
                        {actionType === 'hardDelete'
                            ? 'Are you sure you want to permanently delete this client? This action cannot be undone.'
                            : 'Are you sure you want to soft delete this client? You can restore it later if needed.'}
                    </p>
                    <div className="flex justify-end space-x-4">
                        <button
                            onClick={() => setModalIsOpen(false)}
                            className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-700 transition duration-300"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={confirmAction}
                            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition duration-300"
                        >
                            Confirm
                        </button>
                    </div>
                </div>
            </Modal>

            {/* Error Modal */}
            {errorMessage && <ErrorModal message={errorMessage} onClose={handleCloseModal} />}
        </div>
    );
};

export default AllClient;
