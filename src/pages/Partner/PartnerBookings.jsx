import React, { useState, useEffect } from "react";
import axios from "axios";
import PartnerNavbarComp from "./PartnerNavbarComp";
import WelcomeBanner from "../../partials/dashboard/WelcomeBanner";
import config from "../../config";

const PartnerBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [bookingsPerPage] = useState(50);
  const [filtertype, setType] = useState("false");

  useEffect(() => {
    const fetchBookings = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `${config.API_BASE_URL}/api/v1/bookings/fetch/all/booking-info/`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log("data is fetched");
        if (Array.isArray(response.data)) {
          setBookings(response.data);
          console.log(response.data);
        } else {
          setBookings([]);
        }
        setLoading(false);
      } catch (error) {
        setLoading(false);
        if (error.response && error.response.status === 401) {
          window.location.href = "/logout";
        } else {
          setError("Failed to fetch bookings");
        }
      }
    };

    fetchBookings();
  }, []);
  const filteredBookings = bookings
    .filter(
      (p) => p.keyStorage.isKeyStorage == (filtertype == "true" ? true : false)
    )
    .filter(
      (booking) =>
        booking.location.name
          .toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        (booking.guest?.name || "")
          .toLowerCase()
          .includes(searchQuery.toLowerCase())
    );

  const indexOfLastBooking = currentPage * bookingsPerPage;
  const indexOfFirstBooking = indexOfLastBooking - bookingsPerPage;
  const currentBookings = filteredBookings.slice(
    indexOfFirstBooking,
    indexOfLastBooking
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const formatDateTime = (dateString, timeString) => {
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    const date = new Date(dateString);
    date.setHours(timeString.split(":")[0] || 0);
    date.setMinutes(timeString.split(":")[1] || 0);

    return {
      rootDate: date,
      localDT: date.toLocaleString("en-AU", options),
    };
  };
  const [totalPaid, setTotalPaid] = useState(0);
  useEffect(() => {
    setTotalPaid(0);
    currentBookings.forEach((e) => {
      if (e.status === "paid")
        setTotalPaid((p) => p + e.payment.amount * 0.38095);
    });
  }, [currentBookings]);

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-gray-100">
      {/* Navbar */}
      <PartnerNavbarComp />

      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        <main>
          <div className="px-4 mt-32 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
            {/* Welcome banner */}
            <WelcomeBanner />
            <div className="hidden mb-4 px-4 py-2 bg-black text-white rounded-md text-xl">
              Total Earned by booking: ${totalPaid.toFixed(0)} AUD
            </div>
            {/* Search bar */}
            <div className="mb-4 grid grid-cols-3 gap-2">
              <input
                type="text"
                placeholder="Search by Location or Guest Name"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="px-4 py-2 col-span-2 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-600 transition duration-300"
              />
              <select
                className="rounded-md border text-sm"
                value={filtertype}
                onChange={(e) => {
                  setType(e.target.value);
                }}
              >
                <option value={"false"}>Luggage</option>
                <option value={"true"}>Keys</option>
              </select>
            </div>

            {/* Booking List Table */}
            <div className="overflow-x-auto bg-white rounded-lg shadow-lg">
              {loading ? (
                <div className="flex justify-center items-center p-8">
                  Loading...
                </div>
              ) : error ? (
                <div className="flex justify-center items-center p-8 text-red-500">
                  {error}
                </div>
              ) : (
                <table className="min-w-full">
                  <thead className="bg-teal-def text-white">
                    <tr>
                      <th className="w-1/4 py-3 px-6 text-left">Location</th>
                      <th className="w-1/6 py-3 px-6 text-left">
                        Booking Date
                      </th>
                      <th className="w-1/4 py-3 px-6 text-left">
                        Drop-off Time
                      </th>
                      <th className="w-1/4 py-3 px-6 text-left">
                        Pick-up Time
                      </th>
                      <th className="w-1/4 py-3 px-6 text-left">
                        {filtertype == "true" ? "Agent" : "Guest"}
                      </th>
                      <th className="w-1/4 py-3 px-6 text-left">
                        {filtertype == "true"
                          ? "Pickup Info"
                          : "Luggage Number"}
                      </th>
                      <th className="w-1/6 py-3 px-6 text-left">
                        Payment Amount
                      </th>
                      <th className="w-1/6 py-3 px-6 text-left">Status</th>
                    </tr>
                  </thead>

                  <tbody className="text-gray-800">
                    {currentBookings.length == 0 ? (
                      <tr>
                        <td>No data to show</td>
                      </tr>
                    ) : (
                      currentBookings
                        .sort((a, b) => {
                          let x = new Date(a.bookingDate).getTime();
                          let y = new Date(b.bookingDate).getTime();
                          if (x < y) return 1;
                          else return -1;
                        })
                        .map((booking, index) => (
                          <tr
                            key={index}
                            className="bg-white hover:bg-gray-200 transition duration-150"
                          >
                            <td className="w-1/4 py-3 px-6 border">
                              {booking.location.name || ""}
                            </td>
                            <td className="w-1/6 py-3 px-6 border">
                              {formatDateTime(
                                booking.bookingDate,
                                ""
                              ).rootDate.toLocaleDateString("en-AU", {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                              })}
                            </td>
                            <td className="w-1/4 py-3 px-6 border">
                              {
                                formatDateTime(
                                  booking.startDate,
                                  booking.startTime
                                ).localDT
                              }
                            </td>
                            <td className="w-1/4 py-3 px-6 border">
                              {
                                formatDateTime(booking.endDate, booking.endTime)
                                  .localDT
                              }
                            </td>
                            <td className="w-1/6 py-3 px-6 border">
                              {booking.guest
                                ? `${booking.guest.name} ${
                                    booking.guest.email
                                  } ${booking.guest.phone || "no phone"}`
                                : "--No Info--"}
                            </td>
                            <td
                              className={`w-1/4 py-3 px-6 border ${
                                filtertype == "false" && "text-center"
                              }`}
                            >
                              {filtertype == "false"
                                ? booking.luggageCount || "--"
                                : `${booking?.keyStorage?.keyPickUpBy?.name} ${booking?.keyStorage?.keyPickUpBy?.email} ${booking?.keyStorage?.keyPickUpBy?.phone}`}
                            </td>
                            <td className="w-1/6 py-3 px-6 border">
                              $
                              {booking.payment.amount
                                ? (booking.payment.amount * 0.38095).toFixed(2)
                                : "0.00"}{" "}
                              AUD
                            </td>
                            <td className="w-1/6 py-3 px-6 border text-center">
                              <span
                                className={`px-3 py-1 rounded-full ${
                                  booking.status == "paid"
                                    ? "bg-green-100/80 text-green-500"
                                    : "bg-yellow-100/80 text-yellow-500"
                                }`}
                              >
                                {booking.status || ""}
                              </span>
                            </td>
                          </tr>
                        ))
                    )}
                  </tbody>
                </table>
              )}
            </div>

            {/* Pagination */}
            <div className="mt-6 flex justify-center">
              <nav
                className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
                aria-label="Pagination"
              >
                {[
                  ...Array(
                    Math.ceil(filteredBookings.length / bookingsPerPage)
                  ).keys(),
                ].map((number) => (
                  <button
                    key={number}
                    onClick={() => paginate(number + 1)}
                    className={`relative inline-flex items-center px-4 py-2 border border-gray-300 bg-blue text-sm font-medium hover:bg-blue-500 hover:text-black transition duration-300 ${
                      currentPage === number + 1 ? "bg-blue-500 text-blue" : ""
                    }`}
                  >
                    {number + 1}
                  </button>
                ))}
              </nav>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default PartnerBookings;
