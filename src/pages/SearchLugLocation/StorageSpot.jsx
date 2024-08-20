// StorageSpot.js

import React from 'react';
import { useNavigate } from 'react-router-dom';

const StorageSpot = ({ id, title, details, price, regularprice, link, image, lat, lng, availableFrom, availableTo, discountPercentage, openTime, closeTime, notes }) => {
  const defaultImage = "https://via.placeholder.com/150"; // Placeholder image URL
  const navigate = useNavigate();

  const handleDetailsClick = () => {
    navigate(`/${link}`, {
      state: { id, title, details,link, price, regularprice, image, lat, lng, availableFrom, availableTo, discountPercentage, openTime, closeTime, notes }
    });
  };

  return (
    <div className="storage-spot mt-4 max-w-xl rounded overflow-hidden shadow-lg transition-transform transform hover:shadow-xl animation-fadeIn">
      <img className="w-full h-48 object-cover" src={image || defaultImage} alt={title} />
      <div className="p-4">
        <div className="spot-details">
          <h3 className="text-xl font-bold mb-2">{title}</h3>
          <p className="text-gray-700 text-base">{details}</p>
          
        </div>
        <div className="spot-price mt-4 flex justify-between items-center">
          <p className="text-lg font-semibold text-green-600">$7.90 AUD / Per Day</p>
          {/* <p>{link}</p> */}
          {/* {link && <a href={link} className="text-blue-600">More Info</a>} */}
          <button onClick={handleDetailsClick} className="btn btn-primary btn-sm bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Book This Store
          </button>
        </div>
      </div>
    </div>
  );
};

export default StorageSpot;
