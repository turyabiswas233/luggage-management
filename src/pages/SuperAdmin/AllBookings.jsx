import React, { useState, useEffect } from "react";
import axios from "axios";
import { MdDelete, MdEdit } from "react-icons/md";
import SuperAdminSidebar from "../../partials/SuperAdminSidebar";
import SuperAdminHeader from "../../partials/SuperAdminHeader";
import config from "../../config";
import DatePicker from "../SearchLugLocation/LuggageDetails/DatePicker";
import moment from "moment-timezone";

const AllBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [clients, setClients] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [bookingsPerPage] = useState(50);
  const [editId, setEditId] = useState(null);
  const [preData, setPreData] = useState(null);
  const [cancelPopup, setCancelPopup] = useState(false);
  const [cancelBookingId, setCancelBookingId] = useState(null);

  useEffect(() => {
    const fetchBookings = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `${config.API_BASE_URL}/api/v1/bookings/all-bookings`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(response.data);

        if (Array.isArray(response.data)) {
          setBookings(
            response.data.filter(
              (booking) =>
                booking.chargingStation.isChargingStationBooking == false &&
                booking.keyStorage.isKeyStorage == false
            )
          );
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

    fetchBookings();
    fetchClients();
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

  const formatDate = (dateString, timeString) => {
    // if (!dateString || !timeString) return "";
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
                    Guest Email:{" "}
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
                Total Luggage Booking: <b>{bookings.length || 0}</b>{" "}
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
                  <thead className="bg-[#4A686A] text-white">
                    <tr>
                      <th className="w-1/5 py-3 px-6 text-left">Client Info</th>
                      <th className="w-1/5 py-3 px-6 text-left">
                        Location Name
                      </th>
                      <th className="w-1/5 py-3 px-6 text-left">
                        Luggage Count
                      </th>
                      <th className="w-1/5 py-3 px-6 text-left">
                        Paid Amount [in AUD]
                      </th>
                      <th className="w-1/5 py-3 px-6 text-left">
                        Booking Date
                      </th>
                      <th className="w-1/5 py-3 px-6 text-left">
                        Drop-off Time
                      </th>
                      <th className="w-1/5 py-3 px-6 text-left">
                        Pick-up Time
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
                      .map(
                        (booking) =>
                          booking?.keyStorage?.isKeyStorage == false && (
                            <tr
                              key={booking._id}
                              className="bg-white hover:bg-gray-200 transition duration-150"
                            >
                              <td className="w-1/5 py-3 px-6 border">
                                {getClientInfo(booking.client, booking.guest)}
                                <div className="flex gap-2 items-center">
                                  <button
                                    className="bg-blue-50 rounded-md p-2 text-black ring-1 ring-blue-500 hover:bg-blue-500 hover:text-white"
                                    type="button"
                                    onClick={() => {
                                      setPreData({
                                        startDate: booking.startDate,
                                        startTime: booking.startTime,
                                        endDate: booking.endDate,
                                        endTime: booking.endTime,
                                      });
                                      setEditId(booking._id);
                                    }}
                                  >
                                    <MdEdit size={20} />
                                  </button>
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
                                {/* {JSON.stringify(booking,null,2)} */}
                              </td>
                              <td className="w-1/5 py-3 px-6 border">
                                {booking?.luggageCount}
                              </td>
                              <td className="w-1/5 py-3 px-6 border">
                                ${Number(booking?.payment?.amount).toFixed(2)}
                              </td>
                              <td className="w-1/5 py-3 px-6 border">
                                {formatDate(
                                  booking.bookingDate,
                                  ""
                                ).rootDate.toLocaleDateString("en-AU", {
                                  year: "numeric",
                                  month: "long",
                                  day: "numeric",
                                })}
                              </td>
                              <td className="w-1/5 py-3 px-6 border">
                                {
                                  formatDate(
                                    booking.startDate,
                                    booking.startTime
                                  ).localDT
                                }
                              </td>
                              <td className="w-1/5 py-3 px-6 border">
                                {
                                  formatDate(booking.endDate, booking.endTime)
                                    .localDT
                                }
                              </td>
                              <td className="w-1/5 py-3 px-6 border">
                                {booking.status}
                              </td>
                            </tr>
                          )
                      )}
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
        {editId && (
          <EditBookingTime
            id={editId}
            preData={preData}
            hideDialog={() => {
              setPreData(null);
              setEditId(null);
            }}
          />
        )}
      </div>
    </div>
  );
};
const EditBookingTime = ({ id, preData, hideDialog }) => {
  const [startDate, setStartDate] = useState(preData.startDate);
  const [startTime, setStartTime] = useState(preData.startTime);
  const [endDate, setEndDate] = useState(preData.endDate);
  const [endTime, setEndTime] = useState(preData.endTime);
  const [checkinTime, setCheckinTime] = useState(
    new Date(preData.startDate.split("T")[0] + ":" + preData.startTime)
  );
  const [checkoutTime, setCheckoutTime] = useState(
    new Date(preData.endDate.split("T")[0] + ":" + preData.endTime)
  );
  // const [checkoutTime, setCheckoutTime] = useState(null);
  const [lug, setLug] = useState(null);
  const [falsy, setFalsy] = useState(false);

  useEffect(() => {
    if (checkinTime != null && checkoutTime != null) {
      setStartDate(moment(checkinTime).format("YYYY-MM-DD"));
      setStartTime(moment(checkinTime).format("HH:mm"));
      setEndDate(moment(checkoutTime).format("YYYY-MM-DD"));
      setEndTime(moment(checkoutTime).format("HH:mm"));
      if (checkinTime.getTime() >= checkoutTime.getTime()) {
        setFalsy(true);
      } else setFalsy(false);
    }
  }, [checkinTime, checkoutTime]);

  return (
    <div className="fixed top-0 left-0 z-50 w-svw h-svh bg-black bg-opacity-80 backdrop-blur-sm flex justify-center items-center p-5">
      <form
        className="bg-white shadow-lg rounded-lg p-5 min-w-[700px]"
        onSubmit={async (e) => {
          e.preventDefault();
          try {
            const response = await axios.put(
              `${config.API_BASE_URL}/api/v1/superadmin/bookings/${id}/times`,
              {
                startDate,
                startTime,
                endDate,
                endTime,
              },
              {
                headers: {
                  Authorization: `Bearer ${localStorage.getItem("token")}`,
                  "Content-Type": "application/json",
                },
              }
            );
            console.log("response", response);

            alert(response.data.message || "Booking time updated successfully");
            hideDialog();
          } catch (error) {
            console.error("Failed to update booking time", error);
            alert("Failed to update booking time");
          }
        }}
      >
        <p>ID: {id}</p>
        <DatePicker
          setCheckinTime={setCheckinTime}
          setCheckoutTime={setCheckoutTime}
          setLuggageQuantity={setLug}
          hideBags
        />
        <div className="flex gap-2 my-2">
          <button
            type="submit"
            className="bg-green-500 hover:bg-green-700 text-white px-4 py-2 rounded-md"
          >
            Save
          </button>
          <button
            type="reset"
            className="bg-red-500 hover:bg-red-700 text-white px-4 py-2 rounded-md"
            onClick={hideDialog}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};
export default AllBookings;
