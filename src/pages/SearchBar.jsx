import React from 'react';

const SearchBar = ({ onSearchClick, onNearMeClick , setSearchQuery}) => {
  return (
    <div className="max-w-xs mx-auto mt-2 p-8 bg-white rounded-lg shadow-lg">
      <h2 className="text-xl font-semibold mb-4">Search Luggage Storage Near Me</h2>
      <input type="text" placeholder="Search..." onChange={e => setSearchQuery(e.target.value)} className="mb-4 w-full p-2 border rounded" />
      <button 
        onClick={onSearchClick}
        className="w-full bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 mb-4">
        Search
      </button>
      <button 
        onClick={onNearMeClick}
        className="w-full bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50">
        Near Me
      </button>
    </div>
  );
};

export default SearchBar;
