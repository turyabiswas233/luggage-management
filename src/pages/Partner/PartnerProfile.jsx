import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ClipLoader } from 'react-spinners';
import PartnerNavbarComp from './PartnerNavbarComp';
import config from '../../config';
import PartnerChangePasswordModal from './PartnerChangePasswordModal'; // Import the modal
import './PartnerProfile.css'; // If you still have some custom styles

const PartnerProfile = () => {
    const [editMode, setEditMode] = useState(false);
    const [loading, setLoading] = useState(true);
    const [profile, setProfile] = useState({
        name: '',
        email: '',
        username: '',
        street: '',
        district: '',
        city: '',
        state: '',
        zipCode: '',
        country: '',
        tradeLicense: '',
        earnings: 0,
        locations: '',
    });
    const [isModalOpen, setIsModalOpen] = useState(false); // Modal state

    const navigate = useNavigate();

    useEffect(() => {
        const fetchProfileData = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                navigate('/');
                return;
            }

            try {
                const response = await fetch(`${config.API_BASE_URL}/api/v1/users/profile/partner`, {
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
                        street: result.businessAddress.street,
                        district: result.businessAddress.district,
                        city: result.businessAddress.city,
                        state: result.businessAddress.state,
                        zipCode: result.businessAddress.zipCode,
                        country: result.businessAddress.country,
                        tradeLicense: result.tradeLicenseNumber,
                        earnings: result.earnings,
                        locations: result.locations.join(', '),
                    });
                } else {
                    console.error('Error:', result);
                }
            } catch (error) {
                console.error('Error:', error);
            } finally {
                setLoading(false);
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

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <ClipLoader size={70} color="#4A90E2" />
            </div>
        );
    }

    return (
        <div className="flex flex-col h-screen overflow-hidden">
            <PartnerNavbarComp />

            <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
                <main className="flex-grow container mx-auto mt-32 mb-4">
                    <div className="flex justify-center">
                        <div className="w-full max-w-4xl">
                            <div className="bg-white shadow-lg rounded-lg px-8 pt-6 pb-8 mb-4 transition-transform duration-500 hover:shadow-2xl">
                                <h2 className="text-3xl font-extrabold text-center text-blue-700 mb-6 transition-transform duration-500 transform hover:scale-105">
                                    Partner Profile
                                </h2>
                                <div className="flex flex-col md:flex-row">
                                    <div className="flex flex-col items-center md:w-1/3">
                                        <img
                                            className="rounded-full h-32 w-32 mt-5 border-4 border-indigo-500 shadow-lg"
                                            src="https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg"
                                            alt="Profile"
                                        />
                                        <h2 className="text-2xl font-bold mt-4 text-gray-800">{profile.name}</h2>
                                        <p className="text-gray-600">{profile.email}</p>
                                    </div>
                                    <div className="md:w-2/3 mt-6 md:mt-0 md:pl-6">
                                        <div className="flex justify-between items-center">
                                            <h3 className="text-xl font-semibold text-gray-800">Partner Profile Settings</h3>
                                            <button
                                                className="btn btn-secondary transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110"
                                                onClick={handleEditClick}
                                            >
                                                {editMode ? 'Cancel' : 'Edit'}
                                            </button>
                                        </div>
                                        {editMode ? (
                                            <div className="mt-4">
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                    <div>
                                                        <label className="block text-sm font-medium text-gray-700">Name</label>
                                                        <input
                                                            type="text"
                                                            className="mt-1 p-2 border rounded-md w-full"
                                                            name="name"
                                                            placeholder="Name"
                                                            value={profile.name}
                                                            onChange={handleInputChange}
                                                        />
                                                    </div>
                                                    <div>
                                                        <label className="block text-sm font-medium text-gray-700">Email</label>
                                                        <input
                                                            type="email"
                                                            className="mt-1 p-2 border rounded-md w-full"
                                                            name="email"
                                                            placeholder="Email"
                                                            value={profile.email}
                                                            onChange={handleInputChange}
                                                        />
                                                    </div>
                                                    <div className="mt-3">
                                                        <label className="block text-sm font-medium text-gray-700">Username</label>
                                                        <input
                                                            type="text"
                                                            className="mt-1 p-2 border rounded-md w-full"
                                                            name="username"
                                                            placeholder="Username"
                                                            value={profile.username}
                                                            onChange={handleInputChange}
                                                        />
                                                    </div>
                                                    <div className="mt-3">
                                                        <label className="block text-sm font-medium text-gray-700">Street</label>
                                                        <input
                                                            type="text"
                                                            className="mt-1 p-2 border rounded-md w-full"
                                                            name="street"
                                                            placeholder="Street"
                                                            value={profile.street}
                                                            onChange={handleInputChange}
                                                        />
                                                    </div>
                                                    <div className="mt-3">
                                                        <label className="block text-sm font-medium text-gray-700">District</label>
                                                        <input
                                                            type="text"
                                                            className="mt-1 p-2 border rounded-md w-full"
                                                            name="district"
                                                            placeholder="District"
                                                            value={profile.district}
                                                            onChange={handleInputChange}
                                                        />
                                                    </div>
                                                    <div className="mt-3">
                                                        <label className="block text-sm font-medium text-gray-700">City</label>
                                                        <input
                                                            type="text"
                                                            className="mt-1 p-2 border rounded-md w-full"
                                                            name="city"
                                                            placeholder="City"
                                                            value={profile.city}
                                                            onChange={handleInputChange}
                                                        />
                                                    </div>
                                                    <div className="mt-3">
                                                        <label className="block text-sm font-medium text-gray-700">State</label>
                                                        <input
                                                            type="text"
                                                            className="mt-1 p-2 border rounded-md w-full"
                                                            name="state"
                                                            placeholder="State"
                                                            value={profile.state}
                                                            onChange={handleInputChange}
                                                        />
                                                    </div>
                                                    <div className="mt-3">
                                                        <label className="block text-sm font-medium text-gray-700">Zip Code</label>
                                                        <input
                                                            type="text"
                                                            className="mt-1 p-2 border rounded-md w-full"
                                                            name="zipCode"
                                                            placeholder="Zip Code"
                                                            value={profile.zipCode}
                                                            onChange={handleInputChange}
                                                        />
                                                    </div>
                                                    <div className="mt-3">
                                                        <label className="block text-sm font-medium text-gray-700">Country</label>
                                                        <input
                                                            type="text"
                                                            className="mt-1 p-2 border rounded-md w-full"
                                                            name="country"
                                                            placeholder="Country"
                                                            value={profile.country}
                                                            onChange={handleInputChange}
                                                        />
                                                    </div>
                                                    <div className="mt-3">
                                                        <label className="block text-sm font-medium text-gray-700">Trade License</label>
                                                        <input
                                                            type="text"
                                                            className="mt-1 p-2 border rounded-md w-full"
                                                            name="tradeLicense"
                                                            placeholder="Trade License"
                                                            value={profile.tradeLicense}
                                                            onChange={handleInputChange}
                                                        />
                                                    </div>
                                                    <div className="mt-3">
                                                        <label className="block text-sm font-medium text-gray-700">Earnings</label>
                                                        <input
                                                            type="number"
                                                            className="mt-1 p-2 border rounded-md w-full"
                                                            name="earnings"
                                                            placeholder="Earnings"
                                                            value={profile.earnings}
                                                            onChange={handleInputChange}
                                                        />
                                                    </div>
                                                    <div className="mt-3">
                                                        <label className="block text-sm font-medium text-gray-700">Locations</label>
                                                        <input
                                                            type="text"
                                                            className="mt-1 p-2 border rounded-md w-full"
                                                            name="locations"
                                                            placeholder="Locations"
                                                            value={profile.locations}
                                                            onChange={handleInputChange}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="mt-6 text-center">
                                                    <button
                                                        className="bg-indigo-600 text-white px-4 py-2 rounded-md transition duration-500 ease-in-out transform hover:bg-indigo-700 hover:-translate-y-1 hover:scale-110"
                                                        onClick={handleSaveClick}
                                                    >
                                                        Save Profile
                                                    </button>
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
                                                        <label className="block text-sm font-medium text-gray-700">Street</label>
                                                        <p className="mt-1">{profile.street}</p>
                                                    </div>
                                                    <div className="mt-3">
                                                        <label className="block text-sm font-medium text-gray-700">Suburb</label>
                                                        <p className="mt-1">{profile.district}</p>
                                                    </div>
                                                    <div className="mt-3">
                                                        <label className="block text-sm font-medium text-gray-700">City</label>
                                                        <p className="mt-1">{profile.city}</p>
                                                    </div>
                                                    <div className="mt-3">
                                                        <label className="block text-sm font-medium text-gray-700">State</label>
                                                        <p className="mt-1">{profile.state}</p>
                                                    </div>
                                                    <div className="mt-3">
                                                        <label className="block text-sm font-medium text-gray-700">Zip Code</label>
                                                        <p className="mt-1">{profile.zipCode}</p>
                                                    </div>
                                                    <div className="mt-3">
                                                        <label className="block text-sm font-medium text-gray-700">Country</label>
                                                        <p className="mt-1">{profile.country}</p>
                                                    </div>
                                                    <div className="mt-3">
                                                        <label className="block text-sm font-medium text-gray-700">ABN Number</label>
                                                        <p className="mt-1">{profile.tradeLicense}</p>
                                                    </div>


                                                </div>
                                                <div className="mt-4 pb-4 mx-24  ">
                                                    <button
                                                        className="bg-indigo-600 text-white px-4 py-2  rounded-md transition duration-500 ease-in-out transform hover:bg-indigo-700 hover:-translate-y-1 hover:scale-110"
                                                        onClick={handleOpenModal}
                                                    >
                                                        Change Password
                                                    </button>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>

            <PartnerChangePasswordModal isOpen={isModalOpen} onClose={handleCloseModal} />
        </div>
    );
};

export default PartnerProfile;
