import React, { useState } from 'react';
// import axios from 'axios'; // Commented out for dummy data

import SuperAdminSidebar from '../../partials/SuperAdminSidebar';
import SuperAdminHeader from '../../partials/SuperAdminHeader';
import WelcomeBanner from '../../partials/dashboard/WelcomeBanner';

const AllUsers = () => {
    // Commented out API related states and useEffect for dummy data
    const [users, setUsers] = useState([
        { id: 1, username: 'User1', email: 'user1@example.com', role: 'client', primaryPhoneNumber: '1234567890', secondaryPhoneNumber: '0987654321', secondaryEmail: 'user1alt@example.com', locked: false },
        { id: 2, username: 'User2', email: 'user2@example.com', role: 'partner', primaryPhoneNumber: '1234567891', secondaryPhoneNumber: '0987654322', secondaryEmail: 'user2alt@example.com', locked: true },
        { id: 3, username: 'User3', email: 'user3@example.com', role: 'superadmin', primaryPhoneNumber: '1234567892', secondaryPhoneNumber: '0987654323', secondaryEmail: 'user3alt@example.com', locked: false },
        // More dummy data...
    ]);
    const [searchQuery, setSearchQuery] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [usersPerPage] = useState(3);

    const filteredUsers = users.filter(user => user.username.toLowerCase().includes(searchQuery.toLowerCase()));

    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

    const paginate = pageNumber => setCurrentPage(pageNumber);

    const toggleLock = (id) => {
        setUsers(users.map(user => user.id === id ? { ...user, locked: !user.locked } : user));
    };

    // useEffect(() => {
    //     const fetchUsers = async () => {
    //         try {
    //             setLoading(true);
    //             const response = await axios.get('http://localhost:3001/api/admin/users');
    //             setUsers(response.data);
    //             setLoading(false);
    //         } catch (error) {
    //             setError(error);
    //             setLoading(false);
    //         }
    //     };

    //     fetchUsers();
    // }, []);

    // if (loading) return <p>Loading...</p>;
    // if (error) return <p>Error loading data: {error.message}</p>;

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
                                placeholder="Search by Username"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="px-4 py-2 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-600 transition duration-300"
                            />
                        </div>

                        {/* User List Table */}
                        <div className="overflow-x-auto bg-white rounded-lg shadow-lg">
                            <table className="min-w-full">
                                <thead className="bg-[#4A686A] text-white">
                                    <tr>
                                        <th className="w-1/8 py-3 px-6 text-left">ID</th>
                                        <th className="w-1/8 py-3 px-6 text-left">Username</th>
                                        <th className="w-1/8 py-3 px-6 text-left">Email</th>
                                        <th className="w-1/8 py-3 px-6 text-left">Role</th>
                                        <th className="w-1/8 py-3 px-6 text-left">Primary Phone</th>
                                        <th className="w-1/8 py-3 px-6 text-left">Secondary Phone</th>
                                        <th className="w-1/8 py-3 px-6 text-left">Secondary Email</th>
                                        <th className="w-1/8 py-3 px-6 text-left">Actions</th>
                                    </tr>
                                </thead>

                                <tbody className="text-gray-800">
                                    {currentUsers.map(user => (
                                        <tr key={user.id} className="bg-white hover:bg-gray-200 transition duration-150">
                                            <td className="w-1/8 py-3 px-6 border">{user.id}</td>
                                            <td className="w-1/8 py-3 px-6 border">{user.username}</td>
                                            <td className="w-1/8 py-3 px-6 border">{user.email}</td>
                                            <td className="w-1/8 py-3 px-6 border">{user.role}</td>
                                            <td className="w-1/8 py-3 px-6 border">{user.primaryPhoneNumber}</td>
                                            <td className="w-1/8 py-3 px-6 border">{user.secondaryPhoneNumber}</td>
                                            <td className="w-1/8 py-3 px-6 border">{user.secondaryEmail}</td>
                                            <td className="w-1/8 py-3 px-6 border text-center">
                                                <button
                                                    onClick={() => toggleLock(user.id)}
                                                    className={`px-4 py-2 rounded-lg ${user.locked ? 'bg-red-500' : 'bg-green-500'} text-white transition duration-150`}
                                                >
                                                    {user.locked ? 'Unlock' : 'Lock'}
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Pagination */}
                        <div className="mt-6 flex justify-center">
                            <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                                {[...Array(Math.ceil(filteredUsers.length / usersPerPage)).keys()].map(number => (
                                    <button
                                        key={number}
                                        onClick={() => paginate(number + 1)}
                                        className={`relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium hover:bg-blue-500 hover:text-black transition duration-300 ${currentPage === number + 1 ? 'bg-[blue-500] text-[#4A686A]' : ''}`}
                                    >
                                        {number + 1}
                                    </button>
                                ))}
                            </nav>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default AllUsers;
