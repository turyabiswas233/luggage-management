import React from 'react';

const LocationDetails = ({ location }) => {
  if (!location) return null; // Guard clause to handle null or undefined location

  return (
    <div className="p-4 bg-white rounded shadow">
      <h3 className="text-lg font-semibold">{location.name}</h3>
      <p className="text-sm text-gray-600">{location.description}</p>
      <div className="flex justify-between items-center">
        <span className="text-sm">{location.price}</span>
        <span className="text-sm">Rating: {location.rating} ({location.reviews} reviews)</span>
      </div>
      <img src={location.image} alt={location.name} className="mt-2 rounded" style={{ width: '100%', height: '200px', objectFit: 'cover' }} />
      <button className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        More Details
      </button>
    </div>
  );
};

export default LocationDetails;
