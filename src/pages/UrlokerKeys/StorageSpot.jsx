import React from "react";
import { useNavigate } from "react-router-dom";
import { MdLocationOn } from "react-icons/md";
import { GiPathDistance } from "react-icons/gi";
const StorageSpot = ({
  id,
  title,
  details,
  link,
  image,
  distance,
  address,
}) => {
  const defaultImage = "https://via.placeholder.com/150"; // Placeholder image URL
  const navigate = useNavigate();

  const handleDetailsClick = () => {
    navigate(`/urlokerKeys?location=${link}`, {
      state: {
        id,
        title,
      },
    });
  };

  return (
    <div className="storage-spot max-w-xl mx-auto rounded overflow-hidden shadow-md animation-fadeIn">
      <div className="flex items-start gap-2 p-4">
        <img
          className="w-20 object-cover aspect-square rounded-lg h-20"
          src={image || defaultImage}
          alt={title}
        />
        <div className="spot-details text-balance">
          <h3 className="text-xl font-bold">{title}</h3>
          <p className="text-gray-700 text-sm">{details}</p>
        </div>
      </div>
      <div className=" px-4 mb-4">
        <p className="text-gray-700 text-sm flex gap-1">
          <GiPathDistance size={"1.5em"} /> {distanceConvert(distance)}
        </p>
        <p className="text-sm flex gap-1">
          <MdLocationOn size={"1.5em"} />
          {address?.street},{address?.city},{address?.state}-{address?.zipCode},
          {address?.country}
        </p>
      </div>
      <div className="spot-price py-2 mt-2 flex justify-between items-center border-t p-4">
        <p className="font-semibold text-green-600 text-base">A$15.00 </p>
        {/* <p>{link}</p> */}
        {/* {link && <a href={link} className="text-blue-600">More Info</a>} */}
        <button
          onClick={handleDetailsClick}
          className="bg-teal-600 hover:bg-teal-500 text-white font-bold py-2 px-4 text-xs rounded-full transition-colors"
        >
          Book key
        </button>
      </div>
    </div>
  );
};

const distanceConvert = (distance = 0) => {
  const distanceToString = `${(distance >= 1000
    ? distance / 1000
    : distance
  ).toFixed(2)} ${distance >= 1000 ? "KM" : "meter"}`;
  return distanceToString;
};
export default StorageSpot;
