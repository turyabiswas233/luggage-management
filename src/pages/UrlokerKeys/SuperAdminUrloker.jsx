import React, { useState, useEffect } from "react";
import config from "../../config";
import axios from "axios";
import WelcomeBanner from "../../partials/dashboard/WelcomeBanner";
import SuperAdminSidebar from "../../partials/SuperAdminSidebar";
import SuperAdminHeader from "../../partials/SuperAdminHeader";
import { MdDelete } from "react-icons/md";
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
      else setBookingList([]);
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
    endDate,
    endTime,
    luggageCount,
  } = bookingData;
  if (_id === "6775cbc7c70f315803e82f47")
    console.log(
      startDate,
      startTime,
      "; ",
      endDate,
      endTime,
      keyStorage.keyPickUpTime
    );

  const [cancelPopup, setCancelPopup] = useState(false);
  const [cancelBookingId, setCancelBookingId] = useState(null);
  const [loadDelete, setLoadDelete] = useState(false);
  // delete booking by id
  const deleteBookingById = async () => {
    const url = `${config.API_BASE_URL}/api/v1/bookings/system/hard-delete-booking?bookingId=${_id}`;
    const token = `Bearer ${localStorage.getItem("token")}`;
    try {
      setLoadDelete(true);
      const response = await axios.delete(url, {
        headers: {
          Authorization: token,
        },
      });

      alert("Booking Deleted Successfully");
    } catch (err) {
      console.log(err);
      alert("Failed to delete booking");
    } finally {
      setLoadDelete(false);
    }
  };
  return (
    <div className="hover:bg-green-50 transition-colors text-sm grid grid-cols-4 gap-0">
      {cancelPopup && (
        <div className="fixed top-0 left-0 z-50 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white shadow-lg rounded-lg p-5">
            <p className="text-lg mb-5">
              Are you sure you want to cancel this booking?
            </p>
            <div>
              <div className="font-bold">
                <p>Guest Name: {guest?.name || "N/A"}</p>
                <p>Guest Email: {guest?.email || "N/A"}</p>
                <p>Location Name: {location?.name || "N/A"}</p>
                <p>
                  Paid Amount: ${Number(payment?.amount).toFixed(2) || "N/A"}
                </p>
              </div>
            </div>
            <div className="flex gap-2 items-center justify-center mt-2">
              <button
                className="bg-red-500 hover:bg-red-700 text-white px-4 py-2 rounded-md transition-colors disabled:opacity-50 disabled:pointer-events-none"
                type="button"
                disabled={loadDelete}
                onClick={async () => {
                  try {
                    setLoadDelete(true);
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

                    alert(
                      response.data.message || "Booking cancelled successfully"
                    );
                    setCancelBookingId(null);
                    setCancelPopup(false);
                  } catch (error) {
                    console.error("Failed to cancel booking", error);
                    alert("Failed to cancel booking");
                  } finally {
                    setLoadDelete(false);
                  }
                }}
              >
                Yes
              </button>
              <button
                className="bg-green-500 hover:bg-green-700 text-white px-4 py-2 rounded-md transition-colors disabled:pointer-events-none disabled:opacity-50"
                type="button"
                disabled={loadDelete}
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
      <section className="text-gray-700 px-4 border-b border border-black overflow-x-auto break-keep">
        <h2 className="font-medium text-gray-900">{`Booking ID: ${bookingData._id}`}</h2>

        <ul className="grid">
          <li>{`Name: ${guest?.name}`}</li>
          <li>{`Email: ${guest?.email}`}</li>
          {guest?.phone && <li>{`Phone: ${guest?.phone}`}</li>}

          <div className="flex gap-2 items-center">
            <button
              className="bg-red-50 rounded-md p-2 text-red-500 ring-1 ring-red-900 hover:bg-red-500 hover:text-red-50"
              type="button"
              onClick={() => {
                setCancelBookingId(_id);
                setCancelPopup(true);
              }}
            >
              <MdDelete size={20} />
            </button>
          </div>
        </ul>
      </section>
      <section className="text-gray-700 px-4 border-b border border-black overflow-x-auto break-keep">
        <ul className="grid">
          <li>{location?.name}</li>
          {keyStorage?.isKeyStorage && (
            <li>
              Key Storage Fee:{" "}
              <span className="math-inline bg-green-500 text-white rounded-md px-3 py-1">
                ${Number(keyStorage?.keyStorageFee).toFixed(2)}
              </span>{" "}
              AUD
            </li>
          )}
        </ul>
      </section>
      <section className="text-gray-700 px-4 border-b border border-black overflow-x-auto break-keep">
        <ul className="grid gap-1">
          <li className="mt-2">
            Drop off Time:
            <span className="bg-slate-900 text-slate-100 p-1 rounded-md">
            {new Date(startDate).toLocaleDateString("en-AU", {
              day: "2-digit",
              month: "short",
              year: "numeric",
            })}
            {onlyTimeFormat(startTime)}
            </span>
          </li>
          <li className="hidden">{`Kyes Count: ${luggageCount}`}</li>
          {/* <li>{`Payment Status: ${payment.status}`}</li> */}
          <li>
            Payment Method:{" "}
            <span className="bg-black text-white p-1 text-xs rounded-md uppercase">
              {payment.method}
            </span>
          </li>
          <li>
            Payment Status:{" "}
            <span className="bg-black text-white p-1 text-xs rounded-md uppercase">
              {payment.status}
            </span>
          </li>
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
            <li>{`Pickup By Email: ${
              keyStorage?.keyPickUpBy?.email || "--"
            }`}</li>

            <li className="break-keep">
              {/* {`Pickup Time: ${getFormattedUTCTime(
                keyStorage?.keyPickUpTime
              )} (Australian Time Zone)`} */}
              <b>Pickup Time:</b> <br />
              <span className="bg-slate-400/50 text-slate-700 p-1 rounded-md">
              Local Time by agent: {`${new Date(
                  keyStorage?.keyPickUpTime
                ).toLocaleDateString("en-AU", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                  timeZone: "GMT+0",
                })}${onlyTimeFormat(`${endTime}`)}`}
              </span>
            </li>
            <li className="break-keep my-2">
            <span className="bg-green-200/50 text-green-700 p-1 rounded-md">
            Time by Australian-Sydney Zone: {`${getFormattedUTCTime(
                keyStorage?.keyPickUpTime
              )}`}
              </span>
            </li>
          </ul>
        </section>
      )}
    </div>
  );
};

const getFormattedUTCTime = (time) => {
  const now = new Date(time);
  return now.toLocaleString("en-AU", {
    hour12: true,
    month: "short",
    day: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "Australia/Melbourne", 
  });
};
const onlyTimeFormat = (time) => {
  const timeList = time.split(":").map((f) => Number(f)) || [0, 0];
  const hour = String(
    timeList[0] == 0 ? 12 : timeList[0] > 12 ? timeList[0] - 12 : timeList[0]
  ).padStart(2, "0");
  const minutes = String(timeList[1] || 0).padStart(2, "0");
  return ` at ${hour}:${minutes} ${timeList[0] < 12 ? "AM" : "PM"}`;
};
export default SuperAdminUrloker;
