import React from 'react';
import { useNavigate } from 'react-router-dom';

const UnauthorizedPage = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate('/');
  };

  const handleGoBack = () => {
    navigate(-1); // This goes back to the previous page
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-4xl font-bold text-gray-800 mb-6 animate__animated animate__fadeInDown">
        Unauthorized Access
      </h1>
      <p className="text-lg text-gray-600 mb-8 animate__animated animate__fadeInUp">
        You do not have permission to view this page.
      </p>
      <div className="flex space-x-4">
        <button
          onClick={handleGoHome}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 transform transition duration-500 hover:scale-105"
        >
          Home
        </button>
        <button
          onClick={handleGoBack}
          className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-75 transform transition duration-500 hover:scale-105"
        >
          Back
        </button>
      </div>
    </div>
  );
};

export default UnauthorizedPage;
