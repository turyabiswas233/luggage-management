import React, { useState } from 'react';
import Sidebar from '../partials/Sidebar';
import Header from '../partials/Header';

const SearchLuggage = () => {
  const [location, setLocation] = useState('Sydney'); // Default location
  const [date, setDate] = useState('2024-06-15'); // Default date
  const [time, setTime] = useState('10:00'); // Default time
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [selectedReservation, setSelectedReservation] = useState(null); // State for selected reservation

  const dummyLuggageData = [
    {
      id: 1,
      location: 'Sydney',
      date: '2024-06-15',
      time: '10:00',
      capacity: 20,
      available: 15,
    },
    {
      id: 2,
      location: 'Sydney',
      date: '2024-06-15',
      time: '12:00',
      capacity: 10,
      available: 5,
    },
    // Add more dummy data as needed
  ];

  const handleSearch = () => {
    console.log(`Searching for luggage storage in ${location} on ${date} at ${time}`);

    // Filter dummy data based on location, date, and time
    const filteredData = dummyLuggageData.filter(item => 
      item.location.toLowerCase() === location.toLowerCase() &&
      item.date === date &&
      item.time === time
    );

    console.log('Filtered data:', filteredData);

    // Update state with search results
    setSearchResults(filteredData);
    setSelectedReservation(null); // Reset selected reservation when performing a new search
  };

  const handleReservation = (selectedItem) => {
    setSelectedReservation(selectedItem);
    // Additional logic for booking the slot with the host can be implemented here
    // For demonstration purposes, you can log the selected item
    console.log('Selected Reservation:', selectedItem);
    // Implement API call here if using a real backend
  };

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        {/* Site header */}
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <main>
          <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
            {/* Search Form */}
            <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-lg">
              <h2 className="text-xl font-semibold mb-4">Search Luggage Storage</h2>

              {/* Location input */}
              <div className="mb-4">
                <label htmlFor="location" className="block text-sm font-medium text-gray-700">
                  Location
                </label>
                <input
                  type="text"
                  id="location"
                  aria-label="Location"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
              </div>

              {/* Date input */}
              <div className="mb-4">
                <label htmlFor="date" className="block text-sm font-medium text-gray-700">
                  Date
                </label>
                <input
                  type="date"
                  id="date"
                  aria-label="Date"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                />
              </div>

              {/* Time input */}
              <div className="mb-4">
                <label htmlFor="time" className="block text-sm font-medium text-gray-700">
                  Time
                </label>
                <input
                  type="time"
                  id="time"
                  aria-label="Time"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                />
              </div>

              {/* Submit button */}
              <button
                type="button"
                className="w-full bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
                onClick={handleSearch}
              >
                Search
              </button>
            </div>

            {/* Display search results */}
            <div className="mt-8">
              {searchResults.length > 0 && (
                <div className="bg-white rounded-lg shadow-lg p-6">
                  <h3 className="text-lg font-semibold mb-4">Search Results</h3>
                  <ul>
                    {searchResults.map(item => (
                      <li key={item.id}>
                        <p>
                          Location: {item.location}, Date: {item.date}, Time: {item.time}
                          <br />
                          Capacity: {item.capacity}, Available: {item.available}
                        </p>
                        <button
                          className="mt-2 bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
                          onClick={() => handleReservation(item)}
                        >
                          Reserve
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

           
            {selectedReservation && (
              <div className="mt-8 bg-white rounded-lg shadow-lg p-6">
                <h3 className="text-lg font-semibold mb-4">Selected Reservation</h3>
                <p>
                  Location: {selectedReservation.location}, Date: {selectedReservation.date}, Time: {selectedReservation.time}
                </p>
                
              </div>
            )}

          </div>
        </main>
      </div>
    </div>
  );
};

export default SearchLuggage;
