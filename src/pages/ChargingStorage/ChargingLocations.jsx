import React, { useState } from "react";
import banner from "/files/img/charger/banner.jpg";
import final from "/files/img/charger/final.jpg";

import { MdCurrencyExchange } from "react-icons/md";
import { Link } from "react-router-dom";
function getCharge(time) {
  if (time == 5) {
    return 6; // $1 per minute for up to 5 minutes
  } else return 10; // base $5 for the first 5 minutes, plus the additional time at new rate
}
const ChargingLocations = () => {
  const times = [5, 10];
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

      <div className="space-y-4 md:space-y-0 gap-20 my-20 md:my-0 col-span-2 lg:grid grid-cols-2 mx-auto w-fit">
        {/* <img
          className="aspect-square mx-auto object-cover rounded-xl"
          src={final}
          width={400}
          height={600}
        /> */}
        <div className="mt-4 p-4 bg-teal-100 border border-teal-300 rounded-lg mx-auto w-fit">
          <img />
          <p className="text-teal-700 text-lg font-bold text-center">
            Charging locations will be available soon. Stay tuned!
          </p>
          <p className="text-black">
            See our{" "}
            <Link
              className="text-custom-teal-deep underline font-semibold"
              to="/terms-for-charging-station"
            >
              Terms and condtion
            </Link>{" "}
            for Urloker Chargin Station
          </p>
          <img
            className="aspect-auto w-full mt-10 object-cover rounded-xl"
            src={banner}
            width={500}
            height={300}
          />
        </div>
        <div className="bg-teal-50 ring-1 ring-teal-300 rounded-lg flex gap-10 flex-col justify-between h-auto flex-1 select-none cursor-not-allowed grayscale opacity-60 mx-auto max-w-md">
          <ul className="px-10 list-disc mt-6 max-w-md">
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
                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
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
              className="w-full inline-flex items-center justify-center px-4 py-2 bg-teal-600 border border-transparent rounded-md font-medium text-white hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm text-center disabled:pointer-events-none"
              disabled
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
