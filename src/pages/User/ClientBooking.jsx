import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ClientNavbarComp from './ClientNavbarComp';
import { ClipLoader } from 'react-spinners';

const ClientBooking = () => {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/');
      return;
    }

    // Simulate data fetching or any other async operation
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
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden mt-20 pt-16">
        <main className="flex-grow container mx-auto mt-4 mb-4">
          <div className="flex justify-center">
            <div className="w-full max-w-md">
              <div className="bg-white shadow-lg rounded-lg px-8 pt-6 pb-8 mb-4 transition-transform duration-500 hover:shadow-2xl">
                <h3 className="text-center text-2xl font-extrabold text-blue-700 mb-6 transition-transform duration-500 transform hover:scale-105">
                  User Booking of Luggage Shop
                </h3>
                <form>
                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="emailAddress">
                      Email Address
                    </label>
                    <input
                      type="email"
                      className="shadow appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline transition duration-300 ease-in-out focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                      id="emailAddress"
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="storeDate">
                      Luggage Store Date
                    </label>
                    <input
                      type="date"
                      className="shadow appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline transition duration-300 ease-in-out focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                      id="storeDate"
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="luggageQuantity">
                      Luggage Quantity
                    </label>
                    <input
                      type="number"
                      className="shadow appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline transition duration-300 ease-in-out focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                      id="luggageQuantity"
                      required
                    />
                  </div>
                  <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="comments">
                      Comments
                    </label>
                    <textarea
                      className="shadow appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline transition duration-300 ease-in-out focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                      id="comments"
                      rows="3"
                    ></textarea>
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105"
                  >
                    Request Luggage Store
                  </button>
                </form>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default ClientBooking;
