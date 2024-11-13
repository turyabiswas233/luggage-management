import React, { useState } from "react";
import banner from "/files/img/charger/banner.jpg";
import final from "/files/img/charger/final.jpg";

import { MdCurrencyExchange } from "react-icons/md";
function getCharge(time) {
  if (time <= 5) {
    return time * 1; // $1 per minute for up to 5 minutes
  } else if (time <= 10) {
    const rate = (8 - 5) / (10 - 5); // $0.60 per minute from 5 to 10 minutes
    return 5 + (time - 5) * rate; // base $5 for the first 5 minutes, plus the additional time at new rate
  } else {
    const rate = 2.5 / 10; // $0.80 per minute for more than 10 minutes
    return (time * rate).toFixed(2);
  }
}
const ChargingLocations = () => {
  const times = [5, 10, 20, 30, 40, 50, 60];
  const ratePerMinute = 0.5; // Rate per minute in USD
  const [deviceType, setDeviceType] = useState("");
  const [chargeTime, setChargeTime] = useState(5); // Default time in minutes

  const handleDeviceTypeChange = (event) => {
    setDeviceType(event.target.value);
  };

  const handleTimeChange = (event) => {
    setChargeTime(parseInt(event.target.value));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission here, e.g., send data to a server
    console.log("Device Type:", deviceType);
    console.log("Charge Time:", chargeTime, "minutes");
  };
  return (
    <div className="px-5 p-20 space-y-10 max-w-screen-lg mx-auto">
      <h1 className="text-4xl text-custom-teal-deep text-center font-bold">
        Charging Locations
      </h1>
      <div className="mt-4 p-4 bg-teal-100 border border-teal-300 rounded-lg">
        <img />
        <p className="text-teal-700 text-lg font-bold text-center">
          Charging locations will be available soon. Stay tuned!
        </p>
        <img
          className="aspect-auto w-full mt-10 object-cover rounded-xl"
          src={banner}
          width={500}
          height={300}
        />
      </div>
      <div className="space-y-4 flex gap-20 my-20 hidden">
        <img
          className="aspect-square mx-auto object-cover rounded-xl"
          src={final}
          width={400}
          height={600}
        />
        <div className="bg-teal-50 ring-1 ring-teal-300 rounded-lg flex gap-10 flex-col justify-between h-auto flex-1">
          <ul className="px-10 list-disc mt-6">
            <h4 className="text-xl font-semibold">
              Before you book for a charging space, let me inform you.
            </h4>
            <li>
              You can charge your device at our convenient charging stations
              located throughout the building.
            </li>
            <li>
              Please ensure you bring your own{" "}
              <strong className="text-custom-teal-deep">charging cable</strong>.
            </li>
          </ul>
          <form
            onSubmit={handleSubmit}
            className="bg-white p-5 rounded-lg shadow-md w-full max-w-md mx-auto"
          >
            <div className="mb-4">
              <label
                htmlFor="deviceType"
                className="block text-sm text-gray-700 font-semibold"
              >
                Device Type+Model:
              </label>
              <input
                type="text"
                id="deviceType"
                value={deviceType}
                required
                placeholder="Example: iPhone 12 Pro Max"
                onChange={handleDeviceTypeChange}
                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm placeholder:text-xs"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="chargeTime"
                className="block text-sm text-gray-700 font-semibold"
              >
                Charge Time (minutes):
              </label>
              <select
                id="chargeTime"
                value={chargeTime}
                onChange={handleTimeChange}
                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500   
 sm:text-sm"
              >
                {times.map((time) => (
                  <option value={time}>
                    {time} (${getCharge(time)} AUD)
                  </option>
                ))}
              </select>
            </div>

            <button
              type="submit"
              className="w-full inline-flex items-center justify-center px-4 py-2 bg-teal-600 border border-transparent rounded-md font-medium   
 text-white hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm text-center"
            >
              Pay Now <MdCurrencyExchange className="ml-3 text-teal-50" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChargingLocations;
