import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaTools } from 'react-icons/fa'; // Using react-icons for a maintenance icon

const ComingSoon = () => {
  const navigate = useNavigate();

  const goHome = () => {
    navigate('/');
  };

  const goBack = () => {
    navigate(-1);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
      <div className="text-center p-10 bg-gray-800 shadow-md rounded-lg">
        <div className="flex justify-center mb-6">
          <FaTools className="text-6xl text-yellow-500" />
        </div>
        <h1 className="text-5xl font-bold text-yellow-500 mb-4">Under Maintenance</h1>
        <p className="text-gray-300 mb-8">We're working hard to bring you this feature. Stay tuned!</p>
        <div className="mt-4 flex justify-center space-x-4">
          <button
            onClick={goHome}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700 transition duration-300"
          >
            Go Back Home
          </button>
          <button
            onClick={goBack}
            className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-800 transition duration-300"
          >
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default ComingSoon;
