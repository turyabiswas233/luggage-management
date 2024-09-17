import React, { useState, useEffect } from "react";
import config from "../../config";
import axios from "axios";
import WelcomeBanner from "../../partials/dashboard/WelcomeBanner";
import SuperAdminSidebar from "../../partials/SuperAdminSidebar";
import SuperAdminHeader from "../../partials/SuperAdminHeader";
function SuperAdminUrloker() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [data, setData] = useState(null);
  const [bookingList, setBookingList] = useState([]);
  const fetchAllKeys = async () => {
    const url = `${config.API_BASE_URL}/api/v1/airbnb-keys/bookings`;
    try {
      const response = await axios.get(url);
      const d = response.data;
      setData(d);
      console.log(d);
      if (Array.isArray(d?.bookings))
        setBookingList(
          // d?.bookings
          d?.bookings?.filter((p) => p.payment.status !== "pending")
        );
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchAllKeys();
  }, []);

  const handleSearchKey = (e) => {
    const allList = data?.bookings?.filter(
      (p) => p.payment.status !== "pending"
    );
    let searchKey = String(e.target.value).toLowerCase();
    if (searchKey.length == 0)
      setBookingList(
        data?.bookings?.filter((p) => p.payment.status !== "pending")
      );
    else
      setBookingList(
        allList?.filter((p) =>
          p?.keyStorage?.keyOwner?.name?.toLowerCase()?.includes(searchKey)
        )
      );
  };

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <SuperAdminSidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden bg-gray-100">
        {/* Site header */}
        <SuperAdminHeader
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />

        <main className="px-8  max-w-9xl mx-auto w-full">
          <div className="py-8 w-full">
            {/* Welcome banner */}
            <WelcomeBanner />
          </div>

          <p className="p-2 rounded-sm bg-teal-50 ring-1 ring-teal-500 text-teal-600 font-semibold w-full mx-auto max-w-md text-center">
            Urloker Keys Booking Info{" "}
          </p>
          <br />
          <div className="mb-4 space-y-3">
            <p className="bg-green-200/50 rounded-md border p-2">
              <span className="font-bold">Total Keys Booked: </span>
              <span>
                {" "}
                {
                  data?.bookings?.filter((p) => p.payment.status !== "pending")
                    ?.length
                }
              </span>
            </p>
            <p className="bg-yellow-200/50 rounded-md border p-2">
              <span className="font-bold">
                NB:- Only successful bookings info are shown below.
              </span>
            </p>
            <input
              type="text"
              placeholder="Search by Drop off Agent name"
              onChange={handleSearchKey}
              className="px-4 py-2 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-600 transition duration-300"
            />
          </div>
          <div className="overflow-x-scroll w-full">
            {bookingList.length > 0 ? (
              <table className="p-2 w-fit mx-auto">
                <thead className="table-header-group">
                  <tr>
                    <td className="text-gray-200 font-bold text-center border border-black bg-gray-800 p-1 rounded-sm">
                      Guest Details
                    </td>
                    <td className="text-gray-200 font-bold text-center border border-black bg-gray-800 p-1 rounded-sm">
                      Location
                    </td>
                    <td className="text-gray-200 font-bold text-center border border-black bg-gray-800 p-1 rounded-sm">
                      Booking Details
                    </td>
                    <td className="text-gray-200 font-bold text-center border border-black bg-gray-800 p-1 rounded-sm">
                      Key Details
                    </td>
                  </tr>
                </thead>
                <tbody>
                  {bookingList.map((b) => {
                    return <BookingCard key={b?._id} bookingData={b} />;
                  })}
                </tbody>
              </table>
            ) : (
              <p>No Data Found</p>
            )}
          </div>
        </main>
        <br />
      </div>
    </div>
  );
}
const BookingCard = ({ bookingData }) => {
  const {
    guest,
    payment,
    keyStorage,
    location,
    startDate,
    startTime,
    luggageCount,
  } = bookingData;
 

  const formattedStartDate = new Date(startDate).toLocaleDateString();

  return (
    <tr className="hover:bg-green-50 transition-colors text-xs">
      <td className="text-gray-700 px-4 border-b border border-black">
        <h2 className="font-medium text-gray-900">{`Booking ID: ${bookingData._id}`}</h2>

        <ul className="list-disc pl-4 ">
          <li>{`Name: ${guest.name}`}</li>
          <li>{`Email: ${guest.email}`}</li>
          {guest.phone && <li>{`Phone: ${guest.phone}`}</li>}
        </ul>
      </td>
      <td className="text-gray-700 px-4 border-b border border-black">
        <ul className="list-disc pl-4 ">
          <li>{location.name}</li>
          {keyStorage.isKeyStorage && (
            <li>
              Key Storage Fee:{" "}
              <span className="math-inline">
                {Number(keyStorage.keyStorageFee).toFixed(2)}
              </span>{" "}
              AUD
            </li>
          )}
        </ul>
      </td>
      <td className="text-gray-700 px-4 border-b border border-black">
        <ul className="list-disc pl-4">
          <li>{`Drop off Time: ${formattedStartDate} - ${startTime}`}</li>
          <li className="hidden">{`Kyes Count: ${luggageCount}`}</li>
          {/* <li>{`Payment Status: ${payment.status}`}</li> */}
          <li>{`Payment Method: ${payment.method}`}</li>
          {payment.transactionId && (
            <li className="break-keep">{`Transaction ID: ${payment.transactionId}`}</li>
          )}
        </ul>
      </td>
      {keyStorage.isKeyStorage && (
        <td className="text-gray-700 px-4 border-b border border-black">
          <ul className="list-disc pl-4 ">
            <li>{`Drop Off by Agent: ${keyStorage.keyOwner.name}`}</li>
            <li>{`Pickup By: ${keyStorage.keyPickUpBy.name}`}</li>
            {keyStorage.keyPickUpBy.phone && (
              <li>{`Pickup Phone: ${keyStorage.keyPickUpBy.phone}`}</li>
            )}
            <li>{`Pickup Time: ${new Date(
              keyStorage.keyPickUpTime
            ).toLocaleString()}`}</li>
          </ul>
        </td>
      )}
    </tr>
  );
};
export default SuperAdminUrloker;
