import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';

const PaymentCancel = () => {
  const navigate = useNavigate();

  const handleBackToHome = () => {
    navigate('/');
  };

  return (
    <div className="container text-center mt-5">
      <h1 className="text-danger">Payment Cancelled</h1>
      <p>Your payment has been cancelled. Please try again or contact support.</p>
      <Button onClick={handleBackToHome} variant="primary" className="mt-3">
        Back to Home
      </Button>
    </div>
  );
};

export default PaymentCancel;
