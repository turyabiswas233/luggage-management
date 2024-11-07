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
    if (!searchKey || searchKey?.length == 0)
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
              <div className="p-2 w-fit mx-auto">
                {/* header */}
                <div className="grid grid-cols-4 gap-0">
                  <section className="text-gray-200 font-bold text-center border border-black bg-gray-800 p-1 rounded-sm">
                    Guest Details
                  </section>
                  <section className="text-gray-200 font-bold text-center border border-black bg-gray-800 p-1 rounded-sm">
                    Location
                  </section>
                  <section className="text-gray-200 font-bold text-center border border-black bg-gray-800 p-1 rounded-sm">
                    Booking Details
                  </section>
                  <section className="text-gray-200 font-bold text-center border border-black bg-gray-800 p-1 rounded-sm">
                    Key Details
                  </section>
                </div>

                <div>
                  {bookingList.map((b) => {
                    return (
                      <BookingCard key={b?._id} bookingData={b} _id={b?._id} />
                    );
                  })}
                </div>
              </div>
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
const BookingCard = ({ bookingData, _id }) => {
  const {
    guest,
    payment,
    keyStorage,
    location,
    startDate,
    startTime,
    luggageCount,
  } = bookingData;

  const formattedStartDate = new Date(startDate);
  formattedStartDate.setHours(startTime?.split(":")[0]);
  formattedStartDate.setMinutes(startTime?.split(":")[1]);

  if (_id == "671ed29a98c385fa50366f28") {
    console.log(new Date(keyStorage?.keyPickUpTime)?.toISOString());
    console.log(new Date(keyStorage?.keyPickUpTime)?.toLocaleString());
  }

  // delete booking by id
  const deleteBookingById = async () => {
    const url = `${config.API_BASE_URL}/api/v1/bookings/system/hard-delete-booking?bookingId=${_id}`;
    const token = `Bearer ${localStorage.getItem("token")}`;
    try {
      const response = await axios.delete(url, {
        headers: {
          Authorization: token,
        },
      });

      alert("Booking Deleted Successfully");
      window.location?.reload();
    } catch (err) {
      console.log(err);
      alert("Failed to delete booking");
    }
  };
  return (
    <div className="hover:bg-green-50 transition-colors text-sm grid grid-cols-4 gap-0">
      <section className="text-gray-700 px-4 border-b border border-black overflow-x-auto break-keep">
        <h2 className="font-medium text-gray-900">{`Booking ID: ${bookingData._id}`}</h2>

        <ul className="grid">
          <li>{`Name: ${guest?.name}`}</li>
          <li>{`Email: ${guest?.email}`}</li>
          {guest?.phone && <li>{`Phone: ${guest?.phone}`}</li>}
        </ul>
      </section>
      <section className="text-gray-700 px-4 border-b border border-black overflow-x-auto break-keep">
        <ul className="grid">
          <li>{location?.name}</li>
          {keyStorage?.isKeyStorage && (
            <li>
              Key Storage Fee:{" "}
              <span className="math-inline">
                {Number(keyStorage?.keyStorageFee).toFixed(2)}
              </span>{" "}
              AUD
            </li>
          )}
        </ul>
      </section>
      <section className="text-gray-700 px-4 border-b border border-black overflow-x-auto break-keep">
        <ul className="grid">
          <li>{`Drop off Time: ${formattedStartDate.toLocaleString("en-AU", {
            hour12: true,
            month: "short",
            day: "2-digit",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          })} (Australian Time Zone)`}</li>
          <li className="hidden">{`Kyes Count: ${luggageCount}`}</li>
          {/* <li>{`Payment Status: ${payment.status}`}</li> */}
          <li>{`Payment Method: ${payment.method}`}</li>
          {payment.transactionId && (
            <li className="break-keep">{`Transaction ID: ${payment.transactionId}`}</li>
          )}
        </ul>
      </section>
      {keyStorage?.isKeyStorage && (
        <section className="text-gray-700 px-4 border-b border border-black overflow-x-auto break-keep">
          <ul className="grid">
            <li>{`Drop Off by Agent: ${keyStorage?.keyOwner?.name}`}</li>
            <li>{`Pickup By: ${keyStorage?.keyPickUpBy?.name}`}</li>
            {keyStorage?.keyPickUpBy?.phone && (
              <li>{`Pickup Phone: ${keyStorage?.keyPickUpBy?.phone}`}</li>
            )}

            <li className="break-keep">{`Pickup Time: ${getFormattedUTCTime(
              keyStorage?.keyPickUpTime
            )} (Australian Time Zone)`}</li>
          </ul>
        </section>
      )}
    </div>
  );
};

const getFormattedUTCTime = (time) => {
  const now = new Date(time);
  return now.toLocaleString("en-AU", {
    timeZone: "Australia/Sydney",
    hour12: true,
    month: "short",
    day: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

export default SuperAdminUrloker;
