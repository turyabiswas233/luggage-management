import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminProfile.css';
import SuperAdminSidebar from '../../partials/SuperAdminSidebar';
import SuperAdminHeader from '../../partials/SuperAdminHeader';
import AdminChangePasswordModal from './AdminChangePasswordModal'; // Import the modal
import config from '../../config';

const AdminProfile = () => {
    const [editMode, setEditMode] = useState(false);
    const [profile, setProfile] = useState({
        name: '',
        email: '',
        username: '',
        phoneNumber: '',
    });
    const [isModalOpen, setIsModalOpen] = useState(false); // Modal state

    const navigate = useNavigate();

    useEffect(() => {
        const fetchProfileData = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                // Redirect to home page if there is no token
                navigate('/');
                return;
            }

            try {
                const response = await fetch(`${config.API_BASE_URL}/api/v1/users/profile/superadmin`, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });
                const result = await response.json();
                if (response.ok) {
                    setProfile({
                        name: result.user.username,
                        email: result.user.email,
                        username: result.user.username,
                        phoneNumber: result.user.phoneNumber || '',
                    });
                } else {
                    console.error('Error:', result);
                    // Handle error
                }
            } catch (error) {
                console.error('Error:', error);
                // Handle error
            }
        };

        fetchProfileData();
    }, [navigate]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProfile((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleEditClick = () => {
        setEditMode(!editMode);
    };

    const handleSaveClick = () => {
        setEditMode(false);
        // Add save functionality here, e.g., API call to save the profile details
    };

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div className="min-h-screen flex flex-col">
            <SuperAdminHeader />
            <div className="flex flex-grow bg-gray-100 p-6">
                <SuperAdminSidebar />
                <div className="flex-grow bg-white rounded-lg shadow-lg p-6">
                    <div className="flex flex-col md:flex-row">
                        <div className="flex flex-col items-center md:w-1/3">
                            <img
                                className="rounded-full h-32 w-32 mt-5"
                                src="https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg"
                                alt="Profile"
                            />
                            <h2 className="text-xl font-bold mt-4">{profile.name}</h2>
                            <p className="text-gray-600">{profile.email}</p>
                        </div>
                        <div className="md:w-2/3 mt-6 md:mt-0 md:pl-6">
                            <div className="flex justify-between items-center">
                                <h3 className="text-xl font-semibold">Super Admin Profile Settings</h3>
                                <button className="btn btn-secondary" onClick={handleEditClick}>
                                    {editMode ? 'Cancel' : 'Edit'}
                                </button>
                            </div>
                            {editMode ? (
                                <div className="mt-4">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">Name</label>
                                            <input type="text" className="mt-1 p-2 border rounded-md w-full" name="name" placeholder="Name" value={profile.name} onChange={handleInputChange} />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">Email</label>
                                            <input type="email" className="mt-1 p-2 border rounded-md w-full" name="email" placeholder="Email" value={profile.email} onChange={handleInputChange} />
                                        </div>
                                        <div className="mt-3">
                                            <label className="block text-sm font-medium text-gray-700">Username</label>
                                            <input type="text" className="mt-1 p-2 border rounded-md w-full" name="username" placeholder="Username" value={profile.username} onChange={handleInputChange} />
                                        </div>
                                        <div className="mt-3">
                                            <label className="block text-sm font-medium text-gray-700">Phone Number</label>
                                            <input type="text" className="mt-1 p-2 border rounded-md w-full" name="phoneNumber" placeholder="Phone Number" value={profile.phoneNumber} onChange={handleInputChange} />
                                        </div>
                                    </div>
                                    <div className="mt-6 text-center">
                                        <button className="bg-purple-600 text-white px-4 py-2 rounded-md" onClick={handleSaveClick}>Save Profile</button>
                                    </div>
                                </div>
                            ) : (
                                <div className="mt-4">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">Name</label>
                                            <p className="mt-1">{profile.name}</p>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">Email</label>
                                            <p className="mt-1">{profile.email}</p>
                                        </div>
                                        <div className="mt-3">
                                            <label className="block text-sm font-medium text-gray-700">Username</label>
                                            <p className="mt-1">{profile.username}</p>
                                        </div>
                                        <div className="mt-3">
                                            <label className="block text-sm font-medium text-gray-700">Phone Number</label>
                                            <p className="mt-1">{profile.phoneNumber}</p>
                                        </div>
                                    </div>
                                </div>
                            )}

                            <div className="mt-6 text-center">
                                <button className="bg-indigo-600 text-white px-4 py-2 rounded-md" onClick={handleOpenModal}>
                                    Change Password
                                </button>
                            </div>

                            <div className="mt-6">
                                <h3 className="text-xl font-semibold">Management History</h3>
                                {/* Add management history components here */}
                            </div>

                        </div>
                    </div>
                </div>
            </div>
            <AdminChangePasswordModal isOpen={isModalOpen} onClose={handleCloseModal} />
        </div>
    );
};

export default AdminProfile;
