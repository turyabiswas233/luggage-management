import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';

const PaymentCancelled = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    localStorage.clear();  // Clear all items from local storage
    navigate('/');  // Navigate to the home page
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-4">Payment Cancelled</h1>
      <p className="text-lg text-gray-700 mb-8">Your payment has been cancelled. You can try again later.</p>
      <Button 
        variant="primary" 
        onClick={handleGoHome} 
        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-300"
      >
        Go to Home
      </Button>
    </div>
  );
};

export default PaymentCancelled;
