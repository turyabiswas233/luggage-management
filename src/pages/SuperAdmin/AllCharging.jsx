import React, { useState, useEffect } from "react";
import axios from "axios";
import SuperAdminSidebar from "../../partials/SuperAdminSidebar";
import SuperAdminHeader from "../../partials/SuperAdminHeader";
import { MdDelete, MdEdit } from "react-icons/md";
import config from "../../config";

const AllChargings = () => {
  const [bookings, setBookings] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [bookingsPerPage] = useState(50);

  const [cancelPopup, setCancelPopup] = useState(false);
  const [cancelBookingId, setCancelBookingId] = useState(null);

  const fetchBookings = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `${config.API_BASE_URL}/api/v1/charging/bookings`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data?.data);
      if (Array.isArray(response.data?.data)) {
        setBookings(response.data?.data);
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

  useEffect(() => {
    fetchBookings();
  }, []);

  const filteredBookings = bookings
    .sort((X, Y) => {
      // REVERSE ORDER BY bookingDate
      let x = new Date(X.bookingDate).getTime();
      let y = new Date(Y.bookingDate).getTime();
      if (x < y) return 1;
      else return -1;
    })
    .filter(
      (booking) =>
        booking.guest &&
        booking.guest.name &&
        booking.guest.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

  const indexOfLastBooking = currentPage * bookingsPerPage;
  const indexOfFirstBooking = indexOfLastBooking - bookingsPerPage;
  const currentBookings = filteredBookings.slice(
    indexOfFirstBooking,
    indexOfLastBooking
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const getClientInfo = (client, guest) => {
    if (guest) {
      return (
        <>
          <div>{guest.name}</div>
          <div>{guest.email}</div>
        </>
      );
    } else {
      return (
        <>
          <div>Guest</div>
        </>
      );
    }
  };

  const formatDate = (dateString) => {
    // if (!dateString || !timeString) return "";
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      timeZone: "Australia/Sydney",
    };
    const date = new Date(dateString);

    return {
      rootDate: date,
      localDT: date.toLocaleString("en-AU", options),
    };
  };

  const getPaginationGroup = () => {
    let start = Math.max(1, currentPage - 2);
    let end = Math.min(
      start + 4,
      Math.ceil(filteredBookings.length / bookingsPerPage)
    );
    if (end - start < 4) {
      start = Math.max(1, end - 4);
    }
    return [...Array(end - start + 1).keys()].map((num) => start + num);
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

        {cancelPopup && (
          <div className="fixed top-0 left-0 z-50 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white shadow-lg rounded-lg p-5">
              <p className="text-lg mb-5">
                Are you sure you want to cancel this booking?
              </p>
              <div>
                <div className="font-bold">
                  <p>
                    Guest Name:{" "}
                    {currentBookings.find(
                      (booking) => booking._id === cancelBookingId
                    )?.guest?.name || "N/A"}
                  </p>
                  <p>
                    Guest Eamil:{" "}
                    {currentBookings.find(
                      (booking) => booking._id === cancelBookingId
                    )?.guest?.email || "N/A"}
                  </p>
                  <p>
                    Location Name:{" "}
                    {currentBookings.find(
                      (booking) => booking._id === cancelBookingId
                    )?.location?.name || "N/A"}
                  </p>
                  <p>
                    Paid Amount: $
                    {Number(
                      currentBookings.find(
                        (booking) => booking._id === cancelBookingId
                      )?.payment?.amount
                    ).toFixed(2) || "N/A"}
                  </p>
                </div>
              </div>
              <div className="flex gap-2 items-center justify-center mt-2">
                <button
                  className="bg-red-500 hover:bg-red-700 text-white px-4 py-2 rounded-md transition-colors"
                  onClick={async () => {
                    try {
                      setLoading(true);
                      const response = await axios.put(
                        `${config.API_BASE_URL}/api/v1/superadmin/bookings/${cancelBookingId}/cancel`,
                        {},
                        {
                          headers: {
                            Authorization: `Bearer ${localStorage.getItem(
                              "token"
                            )}`,
                          },
                        }
                      );
                      console.log("response", response);
                      setBookings((prev) =>
                        prev.map((booking) =>
                          booking._id !== cancelBookingId
                            ? booking
                            : response.data.data
                        )
                      );
                      alert(
                        response.data.message ||
                          "Booking cancelled successfully"
                      );
                      setCancelBookingId(null);
                      setCancelPopup(false);
                      // window.location.reload();
                    } catch (error) {
                      console.error("Failed to cancel booking", error);
                      alert("Failed to cancel booking");
                    } finally {
                      setLoading(false);
                    }
                  }}
                >
                  Yes
                </button>
                <button
                  className="bg-green-500 hover:bg-green-700 text-white px-4 py-2 rounded-md transition-colors"
                  onClick={() => {
                    setCancelBookingId(null);
                    setCancelPopup(false);
                  }}
                >
                  No
                </button>
              </div>
            </div>
          </div>
        )}

        <main>
          <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
            {/* Search bar */}
            <div className="mb-4">
              <input
                type="text"
                placeholder="Search by Client/Guest Name"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="px-4 py-2 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-600 transition duration-300"
              />
            </div>

            <div className="bg-white p-4 rounded-lg shadow-lg mb-4 flex flex-col justify-between">
              <p>
                Total Charging Booking: <b>{bookings.length || 0}</b>{" "}
              </p>
              <p>
                Total Paid Booking:{" "}
                <b>
                  {bookings.reduce(
                    (total, b) => (b.status == "paid" ? total + 1 : total),
                    0
                  ) || 0}
                </b>{" "}
              </p>
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
                      <th className="w-1/5 py-3 px-6 text-left">Client Info</th>
                      <th className="w-1/5 py-3 px-6 text-left">
                        Location Name
                      </th>
                      <th className="w-1/5 py-3 px-6 text-left">
                        Charging Duration
                      </th>
                      <th className="w-1/5 py-3 px-6 text-left">
                        Charging Time
                      </th>
                      <th className="w-1/5 py-3 px-6 text-left">
                        Paid Amount [in AUD]
                      </th>
                      <th className="w-1/5 py-3 px-6 text-left">
                        Booking Date
                      </th>

                      <th className="w-1/5 py-3 px-6 text-left">Status</th>
                    </tr>
                  </thead>

                  <tbody className="text-gray-800">
                    {currentBookings
                      .sort((a, b) => {
                        let x = new Date(a.bookingDate).getTime();
                        let y = new Date(b.bookingDate).getTime();
                        if (x < y) return 1;
                        else return -1;
                      })
                      .map((booking) => {
                        const charging = booking?.chargingStation;
                        return (
                          booking?.keyStorage?.isKeyStorage == false && (
                            <tr
                              key={booking._id}
                              className="bg-white hover:bg-gray-200 transition duration-150"
                            >
                              <td className="w-1/5 py-3 px-6 border">
                                {getClientInfo(booking?.client, booking?.guest)}
                                <div className="flex gap-2 items-center">
                                  <button
                                    className="bg-red-50 rounded-md p-2 text-red-500 ring-1 ring-red-900 hover:bg-red-500 hover:text-red-50"
                                    type="button"
                                    onClick={() => {
                                      setCancelBookingId(booking._id);
                                      setCancelPopup(true);
                                    }}
                                  >
                                    <MdDelete size={20} />
                                  </button>
                                </div>
                              </td>
                              <td className="w-1/5 py-3 px-6 border">
                                {booking.location
                                  ? booking.location.name
                                  : "N/A"}
                              </td>
                              <td className="w-1/5 py-3 px-6 border">
                                {charging?.durationInMinutes} Minutes
                              </td>
                              <td className="w-1/5 py-3 px-6 border">
                                {formatDate(charging.dropOffTime).localDT} (in
                                Australia/Sydney)
                              </td>
                              <td className="w-1/5 py-3 px-6 border">
                                ${Number(booking?.payment?.amount).toFixed(2)}
                              </td>
                              <td className="w-1/5 py-3 px-6 border">
                                {formatDate(
                                  booking.bookingDate
                                ).rootDate.toLocaleDateString("en-AU", {
                                  year: "numeric",
                                  month: "long",
                                  day: "numeric",
                                })}
                              </td>

                              <td
                                className={`w-1/5 text-center py-3 px-6 border ${
                                  booking.status == "paid"
                                    ? "bg-green-100 text-green-800"
                                    : "bg-red-100 text-red-800"
                                }`}
                              >
                                {booking.status}
                              </td>
                            </tr>
                          )
                        );
                      })}
                  </tbody>
                </table>
              )}
            </div>

            {/* Pagination */}
            <div className="mt-6 flex justify-center items-center space-x-2">
              <button
                onClick={() => currentPage > 1 && paginate(currentPage - 1)}
                className={`px-4 py-2 border rounded-md ${
                  currentPage === 1
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : "bg-blue-500 text-white"
                }`}
                disabled={currentPage === 1}
              >
                Previous
              </button>
              {getPaginationGroup().map((number) => (
                <button
                  key={number}
                  onClick={() => paginate(number)}
                  className={`px-4 py-2 border rounded-md ${
                    currentPage === number
                      ? "bg-blue-500 text-white"
                      : "bg-white text-blue-500 hover:bg-blue-100"
                  }`}
                >
                  {number}
                </button>
              ))}
              <button
                onClick={() =>
                  currentPage <
                    Math.ceil(filteredBookings.length / bookingsPerPage) &&
                  paginate(currentPage + 1)
                }
                className={`px-4 py-2 border rounded-md ${
                  currentPage ===
                  Math.ceil(filteredBookings.length / bookingsPerPage)
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : "bg-blue-500 text-white"
                }`}
                disabled={
                  currentPage ===
                  Math.ceil(filteredBookings.length / bookingsPerPage)
                }
              >
                Next
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AllChargings;
