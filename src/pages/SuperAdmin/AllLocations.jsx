import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import config from '../../config';
import SuperAdminSidebar from '../../partials/SuperAdminSidebar';
import SuperAdminHeader from '../../partials/SuperAdminHeader';
import WelcomeBanner from '../../partials/dashboard/WelcomeBanner';
import EditLocationModal from './EditLocationModal';
import AssignPartnerModal from './AssignPartnerModal';
import DeleteConfirmationModal from './DeleteConfirmationModal';

const AllLocations = () => {
    const [locations, setLocations] = useState([]);
    const [partners, setPartners] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [locationsPerPage] = useState(50);
    const [isEditing, setIsEditing] = useState(false);
    const [currentLocation, setCurrentLocation] = useState(null);
    const [isAssigning, setIsAssigning] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [locationToDelete, setLocationToDelete] = useState(null);
    const [qrCode, setQrCode] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [fetchingQRCode, setFetchingQRCode] = useState(false);
    const [qrCodeError, setQrCodeError] = useState(null);
    const [deleteType, setDeleteType] = useState(''); // To differentiate between soft and hard delete

    const navigate = useNavigate();

    useEffect(() => {
        fetchLocations();
        fetchPartners();
    }, []);

    const getToken = () => {
        const token = localStorage.getItem('token');
        if (!token) {
            window.location.href = '/logout';
            return null;
        }
        return token;
    };

    const handleUnauthorized = () => {
        navigate('/logout');
    };

    const fetchLocations = async () => {
        setLoading(true);
        const token = getToken();
        if (!token) return;
    
        try {
            const response = await axios.get(`${config.API_BASE_URL}/api/v1/locations/all`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            if (Array.isArray(response.data)) {
                setLocations(response.data);
            } else {
                setLocations([]);
            }
            setLoading(false);
        } catch (error) {
            setLoading(false);
            if (error.response && error.response.status === 401) {
                handleUnauthorized();
            } else {
                setError('Failed to fetch locations');
            }
        }
    };

    const fetchPartners = async () => {
        const token = getToken();
        if (!token) return;

        try {
            const response = await axios.get(`${config.API_BASE_URL}/api/v1/users/all-partners`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.data && Array.isArray(response.data)) {
                setPartners(response.data);
            } else if (response.data.status === 'success' && Array.isArray(response.data.data)) {
                setPartners(response.data.data);
            } else {
                setError('Failed to fetch partner data');
            }
        } catch (err) {
            if (err.response && err.response.status === 401) {
                handleUnauthorized();
            } else {
                setError('Failed to fetch partner data');
            }
        }
    };

    const confirmDeleteLocation = (id, type) => {
        setLocationToDelete(id);
        setDeleteType(type);
        setShowDeleteModal(true);
    };
    
    const deleteLocation = async () => {
        const token = getToken();
        if (!token) return;
    
        try {
            const url = deleteType === 'soft' 
                ? `${config.API_BASE_URL}/api/v1/locations/soft-delete/${locationToDelete}`
                : `${config.API_BASE_URL}/api/v1/locations/${locationToDelete}/hard`;

            const response = await axios.delete(url, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            if (response.status === 200) {
                fetchLocations();
            } else {
                alert('Failed to delete location.');
            }
        } catch (error) {
            alert('An error occurred. Please try again.');
        } finally {
            setShowDeleteModal(false);
        }
    };

    const getPartnerDetails = (partnerId) => {
        const partner = partners.find(p => p._id === partnerId || (p.user && p.user._id === partnerId));
        if (partner) {
            const username = partner.user?.username || partner.username;
            const email = partner.user?.email || partner.email;
            return { username, email };
        }
        return { username: '', email: '' };
    };

    const filteredLocations = locations.filter(location =>
        location.name.toLowerCase().includes(searchQuery.toLowerCase()) 
    );

    const indexOfLastLocation = currentPage * locationsPerPage;
    const indexOfFirstLocation = indexOfLastLocation - locationsPerPage;
    const currentLocations = filteredLocations.slice(indexOfFirstLocation, indexOfLastLocation);

    const paginate = pageNumber => setCurrentPage(pageNumber);

    const updateLocation = (updatedLocation) => {
        setLocations(locations.map(location => location._id === updatedLocation._id ? updatedLocation : location));
        setIsEditing(false);
    };

    const assignPartner = async (locationId, partnerId) => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.post(`${config.API_BASE_URL}/api/v1/locations/assign`, {
                locationId,
                partnerId
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            if (response.status === 200) {
                fetchLocations();
            } else {
                alert('Failed to assign partner.');
            }
        } catch (error) {
            alert('An error occurred. Please try again.');
        }
    };

    const handleURLClick = async (url) => {
        setFetchingQRCode(true);
        setQrCodeError(null);
        try {
            const response = await axios.get(`${config.API_BASE_URL}/api/v1/qr-code/${url}`);
            setQrCode(response.data.qrCode);
            setShowModal(true);
        } catch (error) {
            setQrCodeError('Unable to fetch QR code. Please try again later.');
        } finally {
            setFetchingQRCode(false);
        }
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

                        {/* Buttons */}
                        <div className="mb-4 flex justify-between">
                            <button
                                onClick={() => navigate('/superadmin/create-location')}
                                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300"
                            >
                                Create Location
                            </button>
                        </div>

                        {/* Search bar */}
                        <div className="mb-4">
                            <input
                                type="text"
                                placeholder="Search by Location Name"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="px-4 py-2 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-600 transition duration-300"
                            />
                        </div>

                        {/* Location List Table */}
                        <div className="overflow-x-auto bg-white rounded-lg shadow-lg">
                            {loading ? (
                                <div className="flex justify-center items-center p-8">
                                    <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full" role="status">
                                        <span className="visually-hidden">Loading...</span>
                                    </div>
                                </div>
                            ) : error ? (
                                <div className="flex justify-center items-center p-8 text-red-500">{error}</div>
                            ) : (
                                <table className="min-w-full">
                                    <thead className="bg-[#4A686A] text-white">
                                        <tr>
                                            <th className="py-3 px-6 text-left font-bold">Name</th>
                                            <th className="py-3 px-6 text-left font-bold">Address</th>
                                            <th className="py-3 px-6 text-left font-bold">Open Time</th>
                                            <th className="py-3 px-6 text-left font-bold">Close Time</th>
                                            <th className="py-3 px-6 text-left font-bold">Partner</th>
                                            <th className="py-3 px-6 text-left font-bold">Actions</th>
                                            <th className="py-3 px-6 text-left font-bold">Trash</th>
                                        </tr>
                                    </thead>

                                    <tbody className="text-gray-800">
                                        {currentLocations.map(location => {
                                            const { username, email } = getPartnerDetails(location.partner);
                                            return (
                                                <tr key={location._id} className="hover:bg-gray-100 transition duration-150">
                                                <td className="py-3 px-6 border-b text-blue-500 cursor-pointer"
                                                    onClick={() => navigate(`/superadmin/reviews/${location._id}`)}>
                                                    {location.name}
                                                </td>
                                                    <td className="py-3 px-6 border-b">
                                                        {`${location.address.street},  ${location.address.city}, ${location.address.state}, ${location.address.zipCode}, ${location.address.country}`}
                                                    </td>
                                                    <td className="py-3 px-6 border-b">{location.openTime}</td>
                                                    <td className="py-3 px-6 border-b">{location.closeTime}</td>
                                                    <td className="py-3 px-6 border-b">
                                                        {location.partner ? (
                                                            <>
                                                                {username} ({email})
                                                            </>
                                                        ) : (
                                                            <button
                                                                onClick={() => {
                                                                    setIsAssigning(true);
                                                                    setCurrentLocation(location);
                                                                }}
                                                                className="px-4 py-2 rounded-lg bg-blue-500 text-white transition duration-150"
                                                            >
                                                                Assign Partner
                                                            </button>
                                                        )}
                                                    </td>
                                                    <td className="py-3 px-6 border-b text-center">
                                                        <button
                                                            onClick={() => {
                                                                setIsEditing(true);
                                                                setCurrentLocation(location);
                                                            }}
                                                            className="px-4 py-2 rounded-lg bg-yellow-500 text-white transition duration-150 mr-2"
                                                        >
                                                            Edit
                                                        </button>
                                                        <button
                                                            onClick={() => confirmDeleteLocation(location._id, 'hard')}
                                                            className="px-4 py-2 rounded-lg bg-red-500 text-white transition duration-150"
                                                        >
                                                            Delete
                                                        </button>
                                                    </td>
                                                    <td className="py-3 px-6 border-b text-center">
                                                        {location.isDeleted ? (
                                                            <span className="text-gray-500">Soft Deleted</span>
                                                        ) : (
                                                            <button
                                                                onClick={() => confirmDeleteLocation(location._id, 'soft')}
                                                                className="px-4 py-2 rounded-lg bg-orange-500 text-white transition duration-150"
                                                            >
                                                                Trash
                                                            </button>
                                                        )}
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            )}
                        </div>

                        {/* Pagination */}
                        <div className="mt-6 flex justify-center">
                            <nav className="relative z-0 inline-flex rounded-md shadow-sm" aria-label="Pagination">
                                {[...Array(Math.ceil(filteredLocations.length / locationsPerPage)).keys()].map(number => (
                                    <button
                                        key={number}
                                        onClick={() => paginate(number + 1)}
                                        className={`relative inline-flex items-center px-4 py-2 border border-gray-300 rounded-full text-sm font-medium hover:bg-blue-500 hover:text-white transition duration-300 ${currentPage === number + 1 ? 'bg-blue-500 text-white' : ''}`}
                                    >
                                        {number + 1}
                                    </button>
                                ))}
                            </nav>
                        </div>
                    </div>
                </main>
                {isEditing && (
                    <EditLocationModal
                        location={currentLocation}
                        onClose={() => setIsEditing(false)}
                        onUpdate={updateLocation}
                    />
                )}
                {isAssigning && (
                    <AssignPartnerModal
                        location={currentLocation}
                        partners={partners}
                        onClose={() => setIsAssigning(false)}
                        onAssign={assignPartner}
                    />
                )}
                {showDeleteModal && (
                    <DeleteConfirmationModal
                        onClose={() => setShowDeleteModal(false)}
                        onDelete={deleteLocation}
                    />
                )}
                {showModal && (
                    <div className="fixed inset-0 flex items-center justify-center z-50">
                        <div className="fixed inset-0 bg-gray-600 bg-opacity-75"></div>
                        <div className="bg-white rounded-lg p-8 z-10 shadow-lg w-full max-w-md">
                            {fetchingQRCode ? (
                                <div className="flex justify-center">
                                    <div className="loader"></div>
                                </div>
                            ) : qrCodeError ? (
                                <div className="text-red-500">{qrCodeError}</div>
                            ) : (
                                <div className="text-center">
                                    <img src={qrCode} alt="QR Code" className="mb-4 mx-auto" />
                                    <button
                                        onClick={() => setShowModal(false)}
                                        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700 transition duration-150"
                                    >
                                        OK
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AllLocations;
