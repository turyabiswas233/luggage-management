import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import PartnerNavbarComp from './PartnerNavbarComp';
import config from '../../config';
import logo from '../../img/home-two/logo3.svg'; // Import the logo
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import './PartnerLocation.css';

const PartnerLocations = () => {
    const [locations, setLocations] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [locationsPerPage] = useState(3);
    const [qrCode, setQrCode] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [fetchingQRCode, setFetchingQRCode] = useState(false);
    const [qrCodeError, setQrCodeError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetchLocations();
    }, []);

    const fetchLocations = async () => {
        setLoading(true);
        setError(null);
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(`${config.API_BASE_URL}/api/v1/locations/my-locations`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            if (Array.isArray(response.data)) {
                setLocations(response.data);
            } else {
                setLocations([]); // Handle case where response is not an array
            }
        } catch (error) {
            if (error.response && error.response.status === 401) {
                localStorage.removeItem('token');
                navigate('/');
            } else {
                setError('Unable to fetch locations. Please try again later.');
            }
        } finally {
            setLoading(false);
        }
    };

    const deleteLocation = async (id) => {
        if (window.confirm("Are you sure you want to delete this location?")) {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.delete(`${config.API_BASE_URL}/api/v1/locations/${id}`, {
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
            }
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

    const handleDownloadPDF = () => {
        const input = document.getElementById('qrCodeModal');
        const originalClass = input.className;
        
        // Hide buttons before generating PDF
        input.className = `${originalClass} hide-buttons`;
    
        // Increase the scale to improve quality
        const scale = 3; // Increase this value to improve resolution
        html2canvas(input, { scale }).then((canvas) => {
            const imgData = canvas.toDataURL('image/png'); // Use PNG for better quality
            const pdf = new jsPDF();
    
            // Calculate X and Y positions to center the content
            const imgWidth = 190; // PDF width in mm
            const pageHeight = pdf.internal.pageSize.height;
            const imgHeight = (canvas.height * imgWidth) / canvas.width; // Keep aspect ratio
            const yPosition = (pageHeight - imgHeight) / 2; // Center vertically
    
            pdf.addImage(imgData, 'PNG', 10, yPosition, imgWidth, imgHeight); // Use 'PNG' format
            pdf.save('QRCode.pdf');
            
            // Restore original class
            input.className = originalClass;
        });
    };
    
    

    const filteredLocations = locations.filter(location => 
        location.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const indexOfLastLocation = currentPage * locationsPerPage;
    const indexOfFirstLocation = indexOfLastLocation - locationsPerPage;
    const currentLocations = filteredLocations.slice(indexOfFirstLocation, indexOfLastLocation);

    const paginate = pageNumber => setCurrentPage(pageNumber);

    return (
        <div className="flex flex-col h-screen overflow-hidden">
            <PartnerNavbarComp />

            {/* Content area */}
            <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden bg-gray-100">
                <main>
                    <div className="px-4 mt-32 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
                        {/* Create Location Button */}
                        <div className="mb-4">
                            <button
                                onClick={() => navigate('/partner/create-location')}
                                className="px-4 py-2 bg-blue-500 text-white rounded-lg"
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

                        {/* Error Message */}
                        {error && <div className="mb-4 text-red-500">{error}</div>}

                        {/* Loading Indicator */}
                        {loading && <div className="mb-4 text-blue-500">Loading...</div>}

                        {/* Location List Table */}
                        {!loading && !error && locations.length > 0 && (
                            <div className="overflow-x-auto bg-white rounded-lg shadow-lg">
                                <table className="min-w-full">
                                    <thead className="bg-[#4A686A] text-white">
                                        <tr>
                                            <th className="w-2/12 py-3 px-6 text-left">Name</th>
                                            <th className="w-3/12 py-3 px-6 text-left">Address</th>
                                            <th className="w-2/12 py-3 px-6 text-left">Open Time</th>
                                            <th className="w-2/12 py-3 px-6 text-left">Close Time</th>
                                            <th className="w-3/12 py-3 px-6 text-left">URL</th>
                                            <th className="w-1/12 py-3 px-6 text-left">Edit</th>
                                            <th className="w-1/12 py-3 px-6 text-left">Action</th>
                                        </tr>
                                    </thead>

                                    <tbody className="text-gray-800">
                                        {currentLocations.map(location => (
                                            <tr key={location._id} className="bg-white hover:bg-gray-200 transition duration-150">
                                                <td className="w-2/12 py-3 px-6 border">{location.name}</td>
                                                <td className="w-3/12 py-3 px-6 border">{`${location.address.street}, ${location.address.city}, ${location.address.state}, ${location.address.zipCode}, ${location.address.country}`}</td>
                                                <td className="w-2/12 py-3 px-6 border">{location.openTime}</td>
                                                <td className="w-2/12 py-3 px-6 border">{location.closeTime}</td>
                                                <td className="w-3/12 py-3 px-6 border text-blue-500 underline cursor-pointer" onClick={() => handleURLClick(location.url)}>
                                                    {location.url}
                                                </td>
                                                <td className="w-1/12 py-3 px-6 border text-center">
                                                    <button
                                                        onClick={() => navigate(`/partner/edit-location/${location._id}`, { state: { location } })}
                                                        className="px-4 py-2 rounded-lg bg-green-500 text-white transition duration-150"
                                                    >
                                                        Edit
                                                    </button>
                                                </td>
                                                <td className="w-1/12 py-3 px-6 border text-center">
                                                    <button
                                                        onClick={() => deleteLocation(location._id)}
                                                        className="px-4 py-2 rounded-lg bg-red-500 text-white transition duration-150"
                                                    >
                                                        Delete
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}

                        {/* No Locations Message */}
                        {!loading && !error && locations.length === 0 && (
                            <div className="text-center text-gray-500">
                                No locations found.
                            </div>
                        )}

                        {/* Pagination */}
                        <div className="mt-6 flex justify-center">
                            <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                                {[...Array(Math.ceil(filteredLocations.length / locationsPerPage)).keys()].map(number => (
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

            {/* QR Code Modal */}
            {showModal && (
                <div className="fixed inset-0 flex items-center justify-center z-50">
                    <div className="fixed inset-0 bg-gray-300 bg-opacity-75"></div> {/* Updated background color */}
                    <div id="qrCodeModal" className="bg-cyan-900 rounded-lg p-8 z-10 shadow-lg w-full max-w-md">
                        {fetchingQRCode ? (
                            <div className="flex justify-center">
                                <div className="loader"></div>
                            </div>
                        ) : qrCodeError ? (
                            <div className="text-red-500">{qrCodeError}</div>
                        ) : (
                            <div className="text-center">
                                <img src={logo} alt="Logo" className="mb-4 w-48 mx-auto" /> {/* Larger logo */}
                                <img src={qrCode} alt="QR Code" className="mb-4 w-48 mx-auto" /> {/* Smaller QR Code */}
                                <p
                                   
                                    className="px-2 mx-32  text-xl  text-white rounded-lg mt-4  transition duration-150"
                                >
                                    Book Now
                                </p>
                                <div className="buttons mt-4"> {/* Group buttons in a div */}
                                    <button
                                        onClick={handleDownloadPDF}
                                        className="px-4 py-2 bg-purple-400 text-white rounded-lg hover:bg-purple-500 transition duration-150"
                                    >
                                        Download as PDF
                                    </button>
                                    <button
                                        onClick={() => setShowModal(false)}
                                        className="px-4 py-2 bg-purple-400 text-white rounded-lg hover:bg-purple-500 transition duration-150 ml-2"
                                    >
                                        OK
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default PartnerLocations;
