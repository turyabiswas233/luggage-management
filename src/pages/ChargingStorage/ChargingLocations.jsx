import React, { useEffect, useState } from "react";
// import banner from "/files/img/charger/banner.jpg";
// import final from "/files/img/charger/final.jpg";
import config from "../../config";
import axios from "axios";
import { LuLoader } from "react-icons/lu";
import { MdCurrencyExchange } from "react-icons/md";
import { json, Link, useNavigate } from "react-router-dom";
import DatePicker from "../SearchLugLocation/LuggageDetails/DatePicker";
const final = config.BUCKET_URL + "/files/img/charger/final.jpg";
// payment components
import {
  Elements,
  useStripe,
  useElements,
  PaymentElement,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

function getCharge(time) {
  if (time == 5) {
    return 6; // $1 per minute for up to 5 minutes
  } else return 10; // base $5 for the first 5 minutes, plus the additional time at new rate
}
const ChargingLocations = () => {
  const stripePromise = loadStripe(config.STRIPE_PUBLIC_KEY);

  const navigate = useNavigate();
  const times = [5, 10];
  const ratePerMinute = 0.5; // Rate per minute in USD
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [deviceInfo, setDeviceInfo] = useState("");
  const [chargeTime, setChargeTime] = useState(5); // Default time in minutes
  const [locs, setLocs] = useState([]);
  const [error, setError] = useState("");
  const [locationId, setLocationId] = useState("");
  const [pickUpDate, setPickUpDate] = useState(new Date());
  const [dropOffDate, setDropOffDate] = useState(new Date());
  const [bookingIndent, setBookingIndent] = useState(null);
  const [finalMessage, setFinalMessage] = useState("");

  const handleLoc = (event) => {
    setLocationId(event.target.value);
  };
  const handleDeviceTypeChange = (event) => {
    setDeviceInfo(event.target.value);
  };

  const handleTimeChange = (event) => {
    setChargeTime(parseInt(event.target.value));
  };

  const getAllLocations = async () => {
    const url = config.API_BASE_URL;
    try {
      const response = await axios.get(
        `${url}/api/v1/locations/public/all-locations`
      );
      const data = response.data;
      console.log("success", data);
      if (Array.isArray(data))
        setLocs(data.filter((a) => a.hasChargingStation === true));
      else {
        console.log("Data is not an array list");
      }
    } catch (err) {
      console.log("error", err);
    }
  };

  useEffect(() => {
    getAllLocations();
    return () => {
      console.log("cleanup");
    };
  }, []);
  useEffect(() => {
    if (error) {
      const confirm = window.confirm(error);
      setError("");
    }
  }, [error]);
  const handleBookingCreate = async (e) => {
    e.preventDefault();
    const url = config.API_BASE_URL;
    try {
      const response = await axios.post(
        `${url}/api/v1/charging/bookings`,
        {
          guest: {
            name: fullName,
            email: email,
            phone: phone || "00000000",
          },
          location: locationId,
          startDate: dropOffDate.toLocaleDateString(),
          startTime: dropOffDate.toLocaleTimeString(),
          endDate: pickUpDate.toLocaleDateString(),
          endTime: pickUpDate.toLocaleTimeString(),
          durationInMinutes: chargeTime,
          dropOffTime: dropOffDate.toISOString(),
          pickUpTime: pickUpDate.toISOString(),
          notes: deviceInfo,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = response.data;
      console.log("success", data);
      setBookingIndent(data?.data);
    } catch (err) {
      console.log("error", err);
      setError(err?.response?.data?.message);
    }
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
        <div className="mt-4 p-4 bg-teal-100 border border-teal-300 rounded-lg mx-auto w-fit h-fit">
          <img />
          <p className="text-teal-700 text-lg font-bold text-center hidden">
            Charging locations will be available soon. Stay tuned!
          </p>

          <img
            className="aspect-square mb-10 mx-auto object-cover rounded-xl"
            src={final}
            width={400}
            height={600}
          />
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
          {/* <img
            className="aspect-auto w-full mt-10 object-cover rounded-xl"
            src={banner}
            width={500}
            height={300}
          /> */}
        </div>
        <div className="bg-teal-50 ring-1 ring-teal-300 rounded-lg flex gap-10 flex-col justify-between h-auto flex-1 select-none    mx-auto max-w-md">
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
          {finalMessage ? (
            <div className="">
              {finalMessage === "PAYMENT SUCCESSFUL" && (
                <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
                  <h2 className="text-2xl font-bold mb-4">Booking Confirmed</h2>
                  <p className="text-gray-700 mb-2">
                    Your booking has been confirmed. Please check your email for
                    the booking details.
                  </p>
                </div>
              )}
            </div>
          ) : bookingIndent ? (
            <div>
              <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
                <h2 className="text-2xl font-bold mb-4">
                  Booking Confirmation
                </h2>
                <p className="text-gray-700 mb-2">
                  Booking ID: {bookingIndent?.bookingId}
                </p>
                <p className="text-gray-700 mb-2">
                  Charging Fee: ${bookingIndent?.chargingFee} AUD
                </p>
                <Elements
                  stripe={stripePromise}
                  options={{
                    clientSecret: bookingIndent?.clientSecret,
                  }}
                >
                  <PaymentFormModal
                    clientSecret={bookingIndent?.clientSecret}
                    bookingId={bookingIndent?.bookingId}
                    setFinalMessage={setFinalMessage}
                  />
                </Elements>
              </div>
            </div>
          ) : (
            <form
              onSubmit={handleBookingCreate}
              className="bg-white p-5 rounded-lg shadow-md w-full max-w-md mx-auto"
            >
              <div className="mb-4">
                <label
                  htmlFor="deviceType"
                  className="block text-sm text-gray-700 font-semibold"
                >
                  Your Full Name:
                </label>
                <input
                  type="text"
                  id="fullName"
                  value={fullName}
                  required
                  placeholder="John Doe"
                  onChange={(e) => setFullName(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm placeholder:text-xs"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="deviceType"
                  className="block text-sm text-gray-700 font-semibold"
                >
                  Email:
                </label>
                <input
                  type="text"
                  id="email"
                  value={email}
                  required
                  placeholder="john@example.com"
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm placeholder:text-xs"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="deviceType"
                  className="block text-sm text-gray-700 font-semibold"
                >
                  Phone:
                </label>
                <input
                  type="text"
                  id="phone"
                  value={phone}
                  placeholder="phone number"
                  onChange={(e) => setPhone(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm placeholder:text-xs"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="deviceType"
                  className="block text-sm text-gray-700 font-semibold"
                >
                  Device Information:
                </label>
                <input
                  type="text"
                  id="deviceType"
                  value={deviceInfo}
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
                  Location:
                </label>
                <select
                  id="locations"
                  value={locationId}
                  onChange={handleLoc}
                  required
                  className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                >
                  <option value={""}>Choose a location</option>
                  {locs.map((loc, i) => (
                    <option value={loc?._id} key={loc?._id}>
                      {loc?.name}
                    </option>
                  ))}
                </select>
                <button
                  className="bg-custom-teal-deep rounded-lg py-2 px-6 text-sm text-white mt-5"
                  type="button"
                  onClick={() => {
                    if (locationId === "") {
                      alert("Please select a location to check map");
                      return;
                    }
                    navigate("/luggage-locations", {
                      state: {
                        location: {
                          lat: locs.find((loc) => loc._id === locationId)
                            ?.coordinates?.coordinates[1],
                          lng: locs.find((loc) => loc._id === locationId)
                            ?.coordinates?.coordinates[0],
                        },
                        nearby: true,
                      },
                    });
                  }}
                >
                  Check Location
                </button>
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
                  required
                  className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                >
                  {times.map((time) => (
                    <option value={time} key={`time-${time}`}>
                      {time} (${getCharge(time)} AUD)
                    </option>
                  ))}
                </select>
              </div>

              <DatePicker
                setCheckinTime={setDropOffDate}
                setCheckoutTime={setPickUpDate}
                setLuggageQuantity={(e) => {
                  console.log("Luggage Quantity", e);
                }}
                hideBags={true}
              />

              <button
                type="submit"
                className="w-full inline-flex items-center justify-center px-4 py-2 bg-teal-600 border border-transparent rounded-md font-medium text-white hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm text-center disabled:pointer-events-none"
              >
                Pay Now <MdCurrencyExchange className="ml-3 text-teal-50" />
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
const PaymentFormModal = ({ clientSecret, bookingId, setFinalMessage }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handlePayment = async (e) => {
    e?.preventDefault();
    setLoading(true);

    if (!stripe || !elements) {
      setLoading(false);
      return;
    }

    // const cardElement = elements.getElement(PaymentElement);
    const { error: submitError } = await elements.submit();
    if (submitError) {
      setErrorMessage("Another error occurred with payment plugin.");
      console.log(submitError);
      setLoading(false);
      return;
    }
    const { error, paymentIntent } = await stripe.confirmPayment({
      clientSecret: clientSecret,
      elements: elements,
      redirect: "if_required",
    });

    if (error) {
      setErrorMessage(error.message);
      setLoading(false);
      setFinalMessage("PAYMENT FAILED");
    } else if (paymentIntent && paymentIntent.status === "succeeded") {
      console.log("Yahooo");

      // return;
      try {
        const response = await axios.put(
          `${config.API_BASE_URL}/api/v1/charging/bookings/${bookingId}/payment`,
          {
            paymentIntentId: paymentIntent.id,
            method: "stripe",
          }
        );

        if (response.data.success) setFinalMessage("PAYMENT SUCCESSFUL");
        else setFinalMessage("PAYMENT FAILED");
      } catch (error) {
        console.error("Error updating booking status:", error);
        setLoading(false);
      } finally {
        setLoading(false);
      }
    } else {
      setLoading(false);
      navigate("/payment-cancelled");
    }
  };

  return (
    <div>
      {errorMessage && (
        <p
          className={`flex gap-2 items-center p-2 my-2 bg-red-200 text-red-500  justify-center`}
        >
          <span>
            <MdClose />
          </span>
          <span className="text-lg font-bold">{errorMessage}</span>
        </p>
      )}
      <PaymentElement
        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
        options={{
          style: {
            base: {
              fontSize: "16px",
              color: "#32325d",
              "::placeholder": {
                color: "#a0aec0",
              },
            },
            invalid: {
              color: "#fa755a",
              iconColor: "#fa755a",
            },
          },
        }}
      />
      <div className="grid gap-2">
        <button
          className="bg-teal-500 text-white min-h-10 py-2 rounded-sm w-full disabled:pointer-events-none flex items-center justify-center gap-2"
          onClick={handlePayment}
          type="button"
          disabled={loading}
        >
          {loading ? <LuLoader className="animate-spin" /> : "  Pay Now"}
        </button>
        <button
          className="bg-rose-500 text-white min-h-10 py-2 rounded-sm w-full disabled:pointer-events-none flex items-center justify-center gap-2"
          onClick={() => {
            const check = window.confirm(
              "Are you sure you want to cancel the payment?"
            );
            if (check) {
              navigate("/");
            }
          }}
          type="reset"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};
export default ChargingLocations;
