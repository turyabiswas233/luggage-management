import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import config from "../../config";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

function PartnerKeyDetails() {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [partner, setPartner] = useState();
  const [bookingList, setBookingList] = useState([]);
  const [filteredList, setFilterList] = useState([]);
  const [m, setm] = useState("");
  const [yy, setyy] = useState("");
  const [years, serYears] = useState([]);

  const navigate = useNavigate();
  const fetchAllKeys = async () => {
    if (!id) return;
    const url = `${config.API_BASE_URL}/api/v1/airbnb-keys/partners/${id}/bookings/grouped-by-month`;
    try {
      const response = await axios.get(url);
      const d = response.data;
      setData(d?.groupedBookings);
      // console.log(d?.groupedBookings)
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchAllKeys();
    serYears([]);
    for (let i = new Date().getFullYear(); i > 2000; i--) {
      serYears((p) => [...p, i]);
    }
  }, [id]);

  const handleSearchKey = (e) => {
    let searchKey = String(e.target.value).toLowerCase();
    if (searchKey.length == 0) setFilterList(bookingList);
    else
      setFilterList(
        bookingList?.filter((p) =>
          p?.keyStorage?.keyOwner?.name?.toLowerCase()?.includes(searchKey)
        )
      );
  };

  useEffect(() => {
    setBookingList(
      data?.find((p) => p?.month === `${m} ${yy}`)?.bookings || []
    );
  }, [m, yy, data]);

  useEffect(() => {
    setFilterList(bookingList);
  }, [bookingList]);

  const totalBookings = data?.reduce((p, c) => p + c?.totalBookings, 0);
  return (
    <div className="flex flex-col h-screen overflow-hidden bg-gray-100">
        <button className="bg-white right-full m-2 p-2 h-10 w-10 text-left flex justify-center items-center rounded-full ring-1 ring-teal-700 group" onClick={()=>{
            navigate(`/superadmin/partners/${id}`)
        }}>
            <FontAwesomeIcon icon={faArrowLeft} className="group-hover:-translate-x-1 transition-transform"/>
        </button>
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden bg-gray-100">
        <main className="p-8 max-w-9xl mx-auto w-full">
          <p className="p-2 rounded-sm bg-teal-50 ring-1 ring-teal-500 text-teal-600 font-semibold w-full mx-auto max-w-md text-center">
            Urloker Keys Booking Info{" "}
          </p>
          <br />
          <p className="p-2 rounded-sm bg-teal-50 ring-1 ring-teal-500 text-teal-600 font-semibold w-full mx-auto max-w-md text-center">
            Partner ID: {id}
          </p>
          <br />
          <div className="mb-4 space-y-3">
            <p className="bg-green-200/50 rounded-md border p-2">
              <span className="font-bold">Total Keys Booked: </span>
              <span>{totalBookings}</span>
            </p>
            <p className="bg-yellow-200/50 rounded-md border p-2">
              <span className="font-bold">
                NB:- Only successful bookings info are shown below.
              </span>
            </p>
            <div className="grid grid-cols-4 gap-2">
              <input
                type="text"
                placeholder="Search by Drop off Agent name"
                onChange={handleSearchKey}
                className="px-4 py-2 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-600 transition duration-300 col-span-2"
              />
              <select
                className="rounded-md border border-gray-500"
                value={m}
                onChange={(e) => setm(e.target.value)}
              >
                <option className="text-gray-300" value="" disabled>
                  Month
                </option>
                <option value="January">January</option>
                <option value="February">February</option>
                <option value="March">March</option>
                <option value="April">April</option>
                <option value="May">May</option>
                <option value="June">June</option>
                <option value="July">July</option>
                <option value="August">August</option>
                <option value="September">September</option>
                <option value="October">October</option>
                <option value="November">November</option>
                <option value="December">December</option>
              </select>
              <select
                className="rounded-md border border-gray-500"
                value={yy}
                onChange={(e) => setyy(e.target.value.toString())}
              >
                <option value="" disabled>
                  Year
                </option>
                {years.map((y) => (
                  <option key={y} value={y?.toString()}>
                    {y}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="overflow-x-auto w-full">
            {filteredList.length > 0 ? (
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
                  {filteredList.map((b) => {
                    return (
                      <BookingCard key={b?._id} bookingData={b} pid={partner} />
                    );
                  })}
                </tbody>
              </table>
            ) : (
              <p className="text-center font-bold">No Data Found</p>
            )}
          </div>
        </main>
      </div>
      <br />
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
    <tr className="hover:bg-green-50 transition-colors text-sm">
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
          <li className="hidden">{`Keys Count: ${luggageCount}`}</li>
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

export default PartnerKeyDetails;