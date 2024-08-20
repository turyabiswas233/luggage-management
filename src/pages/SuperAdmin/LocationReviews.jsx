import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import config from '../../config';
import SuperAdminSidebar from '../../partials/SuperAdminSidebar';
import SuperAdminHeader from '../../partials/SuperAdminHeader';
import { FaStar, FaEdit, FaPlus } from 'react-icons/fa';

const LocationReviews = () => {
    const { locationId } = useParams();
    const navigate = useNavigate();
    const [reviewsData, setReviewsData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [sidebarOpen, setSidebarOpen] = useState(false);

    // Modal and rating state for editing reviews
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentRating, setCurrentRating] = useState(0);
    const [currentReviewId, setCurrentReviewId] = useState(null);
    const [modalError, setModalError] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);

    // Modal state for adding reviews
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [newRating, setNewRating] = useState(0);
    const [newComment, setNewComment] = useState('');
    const [addModalError, setAddModalError] = useState(null);
    const [addSuccessMessage, setAddSuccessMessage] = useState(null);

    useEffect(() => {
        fetchReviews();
    }, [locationId]);

    const getToken = () => {
        const token = localStorage.getItem('token');
        if (!token) {
            window.location.href = '/logout';
            return null;
        }
        return token;
    };

    const fetchReviews = async () => {
        const token = getToken();
        if (!token) return;

        try {
            const response = await axios.get(`${config.API_BASE_URL}/api/v1/reviews/location/${locationId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            if (response.data.status === 'success') {
                setReviewsData(response.data.data);
            } else {
                setError('Failed to fetch reviews');
            }
        } catch (error) {
            setError('Failed to fetch reviews');
        } finally {
            setLoading(false);
        }
    };

    const renderStars = (rating, onClick = null) => {
        return [...Array(5)].map((_, index) => (
            <FaStar
                key={index}
                className={index < rating ? 'text-yellow-400' : 'text-gray-300'}
                onClick={() => onClick && onClick(index + 1)}
                style={{ cursor: onClick ? 'pointer' : 'default' }}
            />
        ));
    };

    const handleEditReview = (reviewId, rating) => {
        setCurrentReviewId(reviewId);
        setCurrentRating(rating);
        setIsModalOpen(true);
        setModalError(null);
        setSuccessMessage(null);
    };

    const handleRatingChange = (rating) => {
        setCurrentRating(rating);
    };

    const handleSubmitRating = async () => {
        const token = getToken();
        if (!token) return;

        try {
            const response = await axios.put(
                `${config.API_BASE_URL}/api/v1/reviews/${currentReviewId}`,
                { rating: currentRating },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            if (response.data.status === 'success') {
                setSuccessMessage('Rating updated successfully');
                setIsModalOpen(false);
                fetchReviews();
            } else {
                setModalError('Failed to update rating');
            }
        } catch (error) {
            setModalError('Failed to update rating');
        }
    };

    const handleAddReview = () => {
        setIsAddModalOpen(true);
        setNewRating(0);
        setNewComment('');
        setAddModalError(null);
        setAddSuccessMessage(null);
    };

    const handleSubmitNewReview = async () => {
        const token = getToken();
        if (!token) return;

        try {
            const response = await axios.post(
                `${config.API_BASE_URL}/api/v1/reviews`,
                {
                    locationId,
                    rating: newRating,
                    comment: newComment,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            if (response.data.status === 'success') {
                setAddSuccessMessage('Review added successfully');
                setIsAddModalOpen(false);
                fetchReviews();
            } else {
                setAddModalError('Failed to add review');
            }
        } catch (error) {
            setAddModalError('Failed to add review');
        }
    };

    return (
        <div className="flex h-screen overflow-hidden">
            <SuperAdminSidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

            <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden bg-gray-100">
                <SuperAdminHeader sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

                <main className="p-6">
                    <div className="max-w-6xl mx-auto bg-white p-6 rounded-lg shadow-lg">
                        <button
                            onClick={() => navigate(-1)}
                            className="mb-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300"
                        >
                            Back
                        </button>
                        <button
                            onClick={handleAddReview}
                            className="mb-4 ml-4 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition duration-300"
                        >
                            <FaPlus className="inline mr-2" />
                            Add Review
                        </button>

                        {loading ? (
                            <div>Loading...</div>
                        ) : error ? (
                            <div className="text-red-500">{error}</div>
                        ) : (
                            <div>
                                <h2 className="text-2xl font-bold mb-6 text-gray-800">Reviews for Location ID: {locationId}</h2>
                                <div className="mb-4 text-lg ">
                                    <strong>Average Rating:</strong> <p className='d-flex text-center justify-left'>{renderStars(reviewsData.averageRating)}</p>
                                </div>
                                <div className="mb-4 text-lg">
                                    <strong>Total Reviews:</strong> {reviewsData.reviewCount}
                                </div>
                                <div className="overflow-x-auto">
                                    <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
                                        <thead>
                                            <tr className="bg-gray-200 text-gray-600">
                                                <th className="py-3 px-6 text-left font-medium">Rating</th>
                                                <th className="py-3 px-6 text-left font-medium">Comment</th>
                                                <th className="py-3 px-6 text-left font-medium">Created At</th>
                                                <th className="py-3 px-6 text-left font-medium">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {reviewsData.reviews.map(review => (
                                                <tr key={review._id} className="border-t border-gray-200">
                                                    <td className="py-3 px-6 border-b border-gray-200 flex items-center">
                                                        {renderStars(review.rating)}
                                                    </td>
                                                    <td className="py-3 px-6 border-b border-gray-200">{review.comment}</td>
                                                    <td className="py-3 px-6 border-b border-gray-200">
                                                        {new Date(review.createdAt).toLocaleString()}
                                                    </td>
                                                    <td className="py-3 px-6 border-b border-gray-200">
                                                        <button
                                                            onClick={() => handleEditReview(review._id, review.rating)}
                                                            className="text-blue-500 hover:text-blue-600 transition duration-300"
                                                        >
                                                            <FaEdit size={20} />
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        )}
                    </div>
                </main>
            </div>

            {/* Modal for Editing Rating */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center">
                    <div className="bg-white p-6 rounded-lg shadow-lg">
                        <h2 className="text-xl font-bold mb-4">Edit Rating</h2>
                        <div className="flex justify-center mb-4">
                            {renderStars(currentRating, handleRatingChange)}
                        </div>
                        {modalError && <div className="text-red-500 mb-4">{modalError}</div>}
                        {successMessage && <div className="text-green-500 mb-4">{successMessage}</div>}
                        <div className="flex justify-end">
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="px-4 py-2 mr-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 transition duration-300"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleSubmitRating}
                                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300"
                            >
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Modal for Adding Review */}
            {isAddModalOpen && (
                <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center">
                    <div className="bg-white p-6 rounded-lg shadow-lg">
                        <h2 className="text-xl font-bold mb-4">Add Review</h2>
                        <div className="flex justify-center mb-4">
                            {renderStars(newRating, setNewRating)}
                        </div>
                        <textarea
                            className="w-full p-2 mb-4 border border-gray-300 rounded-lg"
                            placeholder="Enter your comment..."
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                        />
                        {addModalError && <div className="text-red-500 mb-4">{addModalError}</div>}
                        {addSuccessMessage && <div className="text-green-500 mb-4">{addSuccessMessage}</div>}
                        <div className="flex justify-end">
                            <button
                                onClick={() => setIsAddModalOpen(false)}
                                className="px-4 py-2 mr-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 transition duration-300"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleSubmitNewReview}
                                className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition duration-300"
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

export default LocationReviews;
