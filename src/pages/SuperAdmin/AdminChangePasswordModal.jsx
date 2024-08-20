import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { ClipLoader } from 'react-spinners';
import config from '../../config';

const AdminChangePasswordModal = ({ isOpen, onClose }) => {
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleChangePassword = async () => {
        setLoading(true);
        setError('');

        const token = localStorage.getItem('token');
        if (!token) {
            setError('Unauthorized');
            setLoading(false);
            return;
        }

        try {
            const response = await fetch(`${config.API_BASE_URL}/api/v1/users/change-password`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({
                    oldPassword,
                    newPassword,
                }),
            });
            const result = await response.json();
            if (response.ok) {
                onClose();
            } else {
                setError(result.error || 'An error occurred');
            }
        } catch (error) {
            setError('An error occurred');
        } finally {
            setLoading(false);
        }
    };

    return (
        isOpen && (
            <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
                <div className="bg-white p-6 rounded-md shadow-lg w-96">
                    <h2 className="text-xl font-semibold mb-4">Change Password</h2>
                    {error && <p className="text-red-500 mb-4">{error}</p>}
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Old Password</label>
                        <input
                            type="password"
                            className="mt-1 p-2 border rounded-md w-full"
                            value={oldPassword}
                            onChange={(e) => setOldPassword(e.target.value)}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">New Password</label>
                        <input
                            type="password"
                            className="mt-1 p-2 border rounded-md w-full"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                        />
                    </div>
                    <div className="flex justify-end">
                        <button
                            className="bg-gray-500 text-white px-4 py-2 rounded-md mr-2"
                            onClick={onClose}
                        >
                            Cancel
                        </button>
                        <button
                            className="bg-indigo-600 text-white px-4 py-2 rounded-md"
                            onClick={handleChangePassword}
                            disabled={loading}
                        >
                            {loading ? <ClipLoader size={20} color="#ffffff" /> : 'Change Password'}
                        </button>
                    </div>
                </div>
            </div>
        )
    );
};

AdminChangePasswordModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
};

export default AdminChangePasswordModal;
