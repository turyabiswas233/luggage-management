import React, { useState, useEffect } from "react";
import axios from "axios";
import SuperAdminSidebar from "../../partials/SuperAdminSidebar";
import SuperAdminHeader from "../../partials/SuperAdminHeader";
import config from "../../config";

const AllChargings = () => {
  const [bookings, setBookings] = useState([]);
  const [clients, setClients] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [bookingsPerPage] = useState(50);
  const [currentBooking, setCurrentBooking] = useState(null);

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

  const fetchClients = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `${config.API_BASE_URL}/api/v1/users/all-clients`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setClients(response.data.data);
    } catch (error) {
      console.error("Failed to fetch clients", error);
    }
  };
  useEffect(() => {
    fetchBookings();
    // fetchClients();
  }, []);

  const clientMap = clients.reduce((map, client) => {
    map[client._id] = client.user;
    return map;
  }, {});

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
    if (client && client._id && clientMap[client._id]) {
      const clientDetails = clientMap[client._id];
      return (
        <>
          <div>{clientDetails.username}</div>
          <div>{clientDetails.email}</div>
        </>
      );
    } else if (guest) {
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
                  <thead className="bg-[#4A686A] text-white">
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
                                {getClientInfo(booking.client, booking.guest)}
                              </td>
                              <td className="w-1/5 py-3 px-6 border">
                                {booking.location
                                  ? booking.location.name
                                  : "N/A"}
                                {/* {JSON.stringify(booking,null,2)} */}
                              </td>
                              <td className="w-1/5 py-3 px-6 border">
                                {charging?.durationInMinutes} Minutes
                              </td>
                              <td className="w-1/5 py-3 px-6 border">
                                {formatDate(charging.dropOffTime).localDT} (in Australia/Sydney)
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