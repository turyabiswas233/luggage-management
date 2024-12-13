import React from "react";
import { useNavigate } from "react-router-dom";
import { MdLocationOn } from "react-icons/md";
import { GiPathDistance } from "react-icons/gi";
const StorageSpot = ({
  id,
  title,
  details,
  price,
  regularprice,
  link,
  image,
  lat,
  lng,
  availableFrom,
  availableTo,
  distance,
  discountPercentage,
  openTime,
  closeTime,
  notes,
  address,
  canStoreLuggage,
  overbooking,
}) => {
  const defaultImage = "https://via.placeholder.com/150"; // Placeholder image URL
  const navigate = useNavigate();

  const handleDetailsClick = () => {
    navigate(`/${link}`, {
      state: {
        id,
        title,
        details,
        link,
        price,
        regularprice,
        image,
        lat,
        lng,
        availableFrom,
        availableTo,
        discountPercentage,
        openTime,
        closeTime,
        notes,
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
          width={80}
          height={80}
        />
        <div className="spot-details text-balance">
          <h3 className="text-xl font-bold">{title}</h3>
          <p className="text-gray-700 text-sm">{details}</p>
        </div>
      </div>
      <div className=" px-4 mb-4">
        <p className="text-gray-700 text-sm flex gap-1">
          <GiPathDistance size={"1.5em"} width={25} height={25} />{" "}
          {distanceConvert(distance)}
        </p>
        <p className="text-sm flex gap-1">
          <MdLocationOn size={"1.5em"} />
          {address?.street},{address?.city},{address?.state}-{address?.zipCode},
          {address?.country}
        </p>
      </div>
      <div className="spot-price py-2 mt-2 flex justify-between items-center border-t p-4">
        <p className="font-semibold text-green-600 text-base">
          A$7.90{" "}
          <span className="font-light text-gray-800 text-xs">
            {"bag/Per Day"}
          </span>
        </p>
        {/* <p>{link}</p> */}
        {/* {link && <a href={link} className="text-blue-600">More Info</a>} */}
        {!canStoreLuggage || !overbooking ? (
          <button
            className="bg-gray-300 text-gray-500 cursor-not-allowed font-bold py-2 px-4 text-xs rounded-full transition-colors select-none"
            type="button"
            disabled
          >
            Only Key Service
          </button>
        ) : (
          <button
            className="bg-teal-600 hover:bg-teal-500 text-white font-bold py-2 px-4 text-xs rounded-full transition-colors"
            onClick={handleDetailsClick}
            type="button"
          >
            Book Now
          </button>
        )}
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
