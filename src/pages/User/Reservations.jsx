import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ClientNavbarComp from './ClientNavbarComp';
import { Card } from 'flowbite-react'; // Assuming you have a Card component similar to the example
import { ClipLoader } from 'react-spinners';
import { FaCalendarAlt, FaSuitcase, FaUser, FaMapMarkerAlt } from 'react-icons/fa';

// Dummy data (replace with actual fetched data from API)
const dummyReservations = [
  {
    id: 1,
    hostId: 'host_id_1',
    storageSlotId: 'slot_id_1',
    startDate: '2024-06-15T10:00:00Z',
    endDate: '2024-06-20T10:00:00Z',
    luggageDetails: {
      weight: 20,
      size: 'large',
    },
  },
  {
    id: 2,
    hostId: 'host_id_2',
    storageSlotId: 'slot_id_2',
    startDate: '2024-06-16T10:00:00Z',
    endDate: '2024-06-21T10:00:00Z',
    luggageDetails: {
      weight: 15,
      size: 'medium',
    },
  },
  // Add more dummy data as needed
];

const ReservationCard = ({ reservation }) => {
  return (
    <Card className="bg-white shadow-lg rounded-lg p-6 mt-24 transform transition duration-500 hover:scale-105 hover:shadow-2xl">
      <div className="flex items-center mb-4">
        <FaCalendarAlt className="text-indigo-500 mr-2" />
        <p className="text-lg font-semibold text-gray-800">Reservation ID: {reservation.id}</p>
      </div>
      <div className="flex items-center mb-2">
        <FaCalendarAlt className="text-indigo-500 mr-2" />
        <p><span className="font-semibold">Start Date:</span> {new Date(reservation.startDate).toLocaleString()}</p>
      </div>
      <div className="flex items-center mb-2">
        <FaCalendarAlt className="text-indigo-500 mr-2" />
        <p><span className="font-semibold">End Date:</span> {new Date(reservation.endDate).toLocaleString()}</p>
      </div>
      <div className="flex items-center mb-2">
        <FaUser className="text-indigo-500 mr-2" />
        <p><span className="font-semibold">Host ID:</span> {reservation.hostId}</p>
      </div>
      <div className="flex items-center mb-2">
        <FaMapMarkerAlt className="text-indigo-500 mr-2" />
        <p><span className="font-semibold">Storage Slot ID:</span> {reservation.storageSlotId}</p>
      </div>
      <div className="mt-4">
        <p className="font-semibold text-gray-800">Luggage Details:</p>
        <ul className="list-disc pl-6 mt-2">
          <li className="flex items-center"><FaSuitcase className="text-indigo-500 mr-2" /> <span className="font-semibold">Weight:</span> {reservation.luggageDetails.weight} kg</li>
          <li className="flex items-center"><FaSuitcase className="text-indigo-500 mr-2" /> <span className="font-semibold">Size:</span> {reservation.luggageDetails.size}</li>
        </ul>
      </div>
    </Card>
  );
};

const Reservations = () => {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/');
      return;
    }

    // Simulate data fetching
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, [navigate]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <ClipLoader size={50} color="#4A90E2" />
      </div>
    );
  }

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Navbar */}
      <ClientNavbarComp />

      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        <main className="bg-gray-100 min-h-screen">
          <div className="container mx-auto py-8 px-4">
            <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">Your Reservations</h1>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {dummyReservations.map((reservation) => (
                <ReservationCard key={reservation.id} reservation={reservation} />
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Reservations;
