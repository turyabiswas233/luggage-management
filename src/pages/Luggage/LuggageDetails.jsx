import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { dummyLuggageData } from './dummydata';
import './LuggageDetails.css';

const LuggageDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const handleCloseModal = () => {
    navigate('/allluggage');
  };

  const luggage = dummyLuggageData.find(item => item.id === id);

  if (!luggage) {
    return <div>Luggage not found.</div>;
  }

  const getStatusDetails = () => {
    const statuses = [
      { status: 'Deposited', details: `Initial deposit at ${luggage.statusStartTime}`, date: '15 Mar' },
      { status: 'In-Location', details: `Stored in ${luggage.location} from ${luggage.statusStartTime} to ${luggage.statusEndTime}`, date: '16 Mar' },
      { status: 'Checked-Out', details: `Checked out by user at ${luggage.statusStartTime}`, date: '17 Mar' },
      { status: 'In-Transit', details: `Moved from ${luggage.fromLocation} to ${luggage.toLocation} from ${luggage.statusStartTime} to ${luggage.statusEndTime}`, date: '18 Mar' },
      { status: 'Delivered', details: `Delivered to user at ${luggage.statusStartTime}`, date: '19 Mar' },
      { status: 'Lost', details: `Reported lost at ${luggage.statusStartTime}`, date: '20 Mar' },
      { status: 'Damaged', details: `Reported damaged at ${luggage.statusStartTime}`, date: '21 Mar' }
    ];

    const currentStatusIndex = statuses.findIndex(s => s.status === luggage.status);
    return statuses.slice(0, currentStatusIndex + 1);
  };

  const statusDetails = getStatusDetails();

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50 bg-gray-800 bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-3xl">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-semibold">Luggage Details</h1>
          <button
            onClick={handleCloseModal}
            className="text-gray-500 hover:text-gray-700 focus:outline-none"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>
        <p><strong>ID:</strong> {luggage.id}</p>
        <p><strong>User ID:</strong> {luggage.userId}</p>
        <p><strong>Weight:</strong> {luggage.weight} kg</p>
        <p><strong>Size:</strong> {luggage.size}</p>
        <p><strong>Created At:</strong> {luggage.createdAt}</p>
        <p><strong>Updated At:</strong> {luggage.updatedAt}</p>
        <p><strong>Status:</strong></p>
        <div className="flex flex-col">
          <div className="flex flex-row justify-between items-center mb-2">
            {statusDetails.map((status, index) => (
              <React.Fragment key={index}>
                <div className="flex flex-col items-center">
                  <span className="dot"></span>
                  <span className="text-muted small">{status.date}</span>
                  <span>{status.status}</span>
                </div>
                {index < statusDetails.length - 1 && <hr className="flex-grow track-line" />}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LuggageDetails;
