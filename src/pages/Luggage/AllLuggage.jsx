import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import Header from '../../partials/Header'; // Replace with actual path to Header component
import Sidebar from '../../partials/Sidebar'; // Replace with actual path to Sidebar component
import Pagination from '../Pagination'; // Replace with actual path to Pagination component
import { dummyLuggageData } from './dummydata';

const AllLuggage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(6); // Number of items per page
  const [searchTerm, setSearchTerm] = useState(''); // State to manage search term

  // Logic to calculate pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  // Filtered data based on search term
  const filteredLuggageData = dummyLuggageData.filter((luggage) =>
    luggage.id.toString().toLowerCase().includes(searchTerm.toLowerCase())
  );

  const currentItems = filteredLuggageData.slice(indexOfFirstItem, indexOfLastItem);

  // Total number of pages
  const totalPages = Math.ceil(filteredLuggageData.length / itemsPerPage);

  // Change page
  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="bg-gray-100 min-h-screen">
      <Header />
      <div className="flex">
        <Sidebar />
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-semibold mb-8">All Luggage</h1>
          
          {/* Search bar */}
          <div className="mb-6">
            <input
              type="text"
              placeholder="Search by ID"
              className="w-full p-2 border border-gray-300 rounded-lg"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {currentItems.map((luggage) => (
              <div key={luggage.id} className="bg-white rounded-lg shadow-lg p-4">
                <p><strong>ID:</strong> {luggage.id}</p>
                <p><strong>User ID:</strong> {luggage.userId}</p>
                <p><strong>Status:</strong> {luggage.status}</p>
                <p><strong>Weight:</strong> {luggage.weight} kg</p>
                <p><strong>Size:</strong> {luggage.size}</p>
                <p><strong>Created At:</strong> {luggage.createdAt}</p>
                <p><strong>Updated At:</strong> {luggage.updatedAt}</p>
                {/* Link to LuggageDetails component */}
                <Link
                  to={`/luggage/${luggage.id}`} // Dynamic path with luggage id
                  className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded inline-block"
                >
                  View Details
                </Link>
              </div>
            ))}
          </div>
          {/* Pagination component */}
          <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
        </div>
      </div>
    </div>
  );
};

export default AllLuggage;
