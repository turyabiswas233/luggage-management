import React, { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import DatePicker from "./DatePicker";
import moment from "moment-timezone";
import { Link, useSearchParams } from "react-router-dom";
import config from "../../../config";
import axios from "axios";

const BookingForm = ({
  handleSubmit,
  luggageQuantity,
  setLuggageQuantity,
  promoCode,
  setPromoCode,
  discount,
  setDiscount,
  totalPrice,
  setTotalPrice,
  locationid,
  clientId,
  clientDetails,
  setClientDetails,
  setQrcode,
}) => {
  const search = useSearchParams();

  const [errorMessage, setErrorMessage] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [errors, setErrors] = useState({});
  const [promoApplied, setPromoApplied] = useState(false);
  const [loading, setLoading] = useState(false);
  const [checkinTime, setCheckinTime] = useState(new Date());
  const [checkoutTime, setCheckoutTime] = useState(new Date());
  const [guestDetails, setGuestDetails] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const handleApplyPromo = async () => {
    const url = config.API_BASE_URL;
    try {
      const { data } = await axios.get(
        `${url}/api/v1/promocode/check/${promoCode}`
      );

      console.log(data);
      if (data?.discountPercentage && data?.discountPercentage > 0) {
        setDiscount(data?.discountPercentage);
        setPromoApplied(true);
        console.log(totalPrice - totalPrice * (data.discountPercentage / 100));
      } else {
        setDiscount(0);
        setPromoApplied(false);
        setErrorMessage(data?.message);
      }
    } catch (error) {
      console.log(error);
      setErrorMessage(error?.response?.data?.message || "Invalid promo code.");
    }
  };

  const handleRemovePromo = () => {
    setPromoCode("");
    setDiscount(0);
    setPromoApplied(false);
    const dailyRate = 10.5; // Combined service fee and luggage price per day
    const duration = calculateDuration(checkinTime, checkoutTime);
    let price = dailyRate * duration * luggageQuantity;
    price = parseFloat(price.toFixed(2)); // Round to two decimal places
    setTotalPrice(price);
  };

  const handleCheckoutTimeChange = () => {
    if (checkoutTime.getTime() < checkinTime.getTime()) {
      setErrorMessage("Pickup date can't be before the drop-off date.");
    } else {
      setErrorMessage("");
    }
  };

  const calculateDuration = (checkin, checkout) => {
    if (!checkin || !checkout) return 1;
    // Convert both dates to only date components (ignore time)
    const start = checkin?.getTime();
    const end = checkout?.getTime();

    // Calculate the difference in milliseconds
    const diffInMs = end - start;

    // Convert milliseconds to days
    const diffInDays = diffInMs / (1000 * 60 * 60 * 24);

    //round figure duration to check either it crosses 24h or not
    const rd = Math.round(diffInDays);
    // Since any date change counts as an extra day, add 1 if there's a difference
    return rd < 1 ? 1 : diffInDays > rd ? rd + 1 : rd;
  };

  const validateDateTime = (checkin, checkout) => {
    const now = new Date();
    const newNow = new Date(
      now.getFullYear,
      now.getMonth(),
      now.getDate(),
      now.getHours(),
      now.getMinutes() < 30 ? 0 : 30
    );
    if (checkin < newNow) {
      setErrorMessage("Check-in time must be in the future.");
      return false;
    } else if (checkout < checkin) {
      setErrorMessage("Pickup date can't be before the drop-off date.");
      return false;
    }
    setErrorMessage("");
    return true;
  };

  useEffect(() => {
    if (
      validateDateTime(checkinTime, checkoutTime) &&
      checkinTime &&
      checkoutTime
    ) {
      const dailyRate = 10.5; // Combined service fee and luggage price per day
      const duration = calculateDuration(checkinTime, checkoutTime);
      let price = discount
        ? discount == 101
          ? 0
          : dailyRate * duration * luggageQuantity -
            (discount / 100) * 7.9 * duration * luggageQuantity
        : dailyRate * duration * luggageQuantity; // URL192BDD101

      price = parseFloat(price.toFixed(2)); // Round to two decimal places
      setTotalPrice(price);
    }
  }, [discount, checkinTime, checkoutTime, luggageQuantity]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setGuestDetails({
      ...guestDetails,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setClientDetails({
      ...clientDetails,
      luggagePhotos: files,
    });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!guestDetails.name && !clientId) newErrors.name = "Name is required";
    if (!guestDetails.email && !clientId) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(guestDetails.email) && !clientId) {
      newErrors.email = "Email is invalid";
    }
    // if (!guestDetails.phone && !clientId)
    //   newErrors.phone = "Phone number is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }

    if (!validateDateTime(checkinTime, checkoutTime)) {
      return;
    }

    setLoading(true); // Set loading to true

    const bookingData = {
      location: locationid,
      startDate: moment(checkinTime).format("YYYY-MM-DD"),
      startTime: moment(checkinTime).format("HH:mm"),
      endDate: moment(checkoutTime).format("YYYY-MM-DD"),
      endTime: moment(checkoutTime).format("HH:mm"),
      // dropOffTime: checkinTime.toISOString(),
      // pickUpTime: checkoutTime.toISOString(),
      totalPricePaid: parseFloat(totalPrice).toFixed(2),
      specialRequests: clientDetails.specialRequests || "No requirement",
      luggageQuantity: luggageQuantity,
      // timezone: Intl?.DateTimeFormat()?.resolvedOptions()?.timeZone,
    };

    console.log(bookingData);

    if (clientId) {
      bookingData.client = clientId;
    } else {
      bookingData.guest = {
        name: guestDetails.name,
        email: guestDetails.email,
        phone: guestDetails.phone,
      };
    }

    try {
      setQrcode(Boolean(search[0].get("isQrcode")) || false);
      await handleSubmit(
        {
          ...bookingData,
          qrChecked: Boolean(search[0].get("isQrcode")) || false,
        },
        guestDetails
      );
      setShowModal(false); // Close modal on successful submission
    } catch (error) {
      setErrorMessage("Submission failed. Please try again.");
    } finally {
      setLoading(false); // Set loading to false
    }
  };

  return (
    <div className="bg-white text-slate-900 shadow-md rounded-lg p-6 mb-10">
      <h5 className="text-2xl font-bold mb-4">Your Booking</h5>
      {errorMessage && <div className="text-red-500 mb-4">{errorMessage}</div>}
      <form id="booking-form" onSubmit={handleFormSubmit}>
        <div className="space-y-4">
          <DatePicker
            setCheckinTime={setCheckinTime}
            setCheckoutTime={setCheckoutTime}
            setLuggageQuantity={setLuggageQuantity}
          />
          <div>
            <label htmlFor="clientName" className="block font-semibold mb-1">
              Name:
            </label>
            <input
              type="text"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              id="clientName"
              name="name"
              value={guestDetails.name}
              onChange={handleInputChange}
              required
            />
            {errors.name && <p className="text-red-500">{errors.name}</p>}
          </div>
          <div>
            <label htmlFor="clientEmail" className="block font-semibold mb-1">
              Email:
            </label>
            <input
              type="email"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              id="clientEmail"
              name="email"
              value={guestDetails.email}
              onChange={handleInputChange}
              required
            />
            {errors.email && <p className="text-red-500">{errors.email}</p>}
          </div>
          <div>
            <label htmlFor="clientPhone" className="block font-semibold mb-1">
              Phone Number (optional):
            </label>
            <input
              type="text"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              id="clientPhone"
              name="phone"
              value={guestDetails.phone}
              onChange={handleInputChange}
            />
            {errors.phone && <p className="text-red-500">{errors.phone}</p>}
          </div>
          <div>
            <label htmlFor="luggagePhotos" className="block font-semibold mb-1">
              Luggage Photos (optional):
            </label>
            <input
              type="file"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              id="luggagePhotos"
              name="luggagePhotos"
              multiple
              onChange={handleFileChange}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="promoCode" className="block font-bold mb-1">
              Promo Code:
            </label>
            <div className="flex items-center">
              <input
                type="text"
                className="w-full p-2 border border-gray-300 rounded"
                id="promoCode"
                name="promoCode"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
                disabled={promoApplied}
              />
              {promoApplied ? (
                <button
                  type="button"
                  className="ml-2 bg-red-500 text-white py-1 px-3 rounded hover:bg-red-700 transition duration-300"
                  onClick={handleRemovePromo}
                >
                  Remove
                </button>
              ) : (
                <button
                  type="button"
                  className="ml-2 bg-blue-500 text-white py-1 px-3 rounded hover:bg-blue-700 transition duration-300"
                  onClick={handleApplyPromo}
                >
                  Apply
                </button>
              )}
            </div>
          </div>
          <div className="Mb-4 flex gap-2 items-center mb-6 group w-fit">
            <label htmlFor="isAgree" className="text-base">
              By continuing the booking you are agreeing to our{" "}
              <Link
                className="text-teal-500 font-medium hover:underline"
                to={"/terms-and-conditions"}
              >
                terms and conditions.
              </Link>
            </label>
          </div>
          <div className="border-t border-gray-300 pt-4">
            <h6 className="font-bold mb-2">Price details</h6>
            <div className="flex justify-between">
              <span>
                {luggageQuantity} Checked bag
                {luggageQuantity > 1 ? "s" : ""} (A$
                {(7.9).toFixed(2)}) x{" "}
                {calculateDuration(checkinTime, checkoutTime)} day
                {calculateDuration(checkinTime, checkoutTime) > 1 ? "s" : ""}
              </span>
              <span>
                A$
                {(
                  luggageQuantity *
                  7.9 *
                  calculateDuration(checkinTime, checkoutTime)
                ).toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between pt-2">
              <span>
                Total Service Charge per day (A$2.60 x{" "}
                {calculateDuration(checkinTime, checkoutTime)} day
                {calculateDuration(checkinTime, checkoutTime) > 1
                  ? "s"
                  : ""} x {luggageQuantity} bag{luggageQuantity > 1 ? "s" : ""})
              </span>
              <span>
                A$
                {(
                  2.6 *
                  luggageQuantity *
                  calculateDuration(checkinTime, checkoutTime)
                ).toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between font-bold text-xl mt-4">
              <span>
                Total{" "}
                {promoApplied && (
                  <small className="font-thin text-sm">
                    ({discount == 101 ? 'Full Free': discount+'% discount'})
                  </small>
                )}{" "}
              </span>
              <span>
                A${totalPrice.toFixed(2)}{" "}
                {promoApplied && (
                  <small
                    style={{
                      textDecoration: "line-through",
                    }}
                  >
                    {10.5 *
                      calculateDuration(checkinTime, checkoutTime) *
                      luggageQuantity}
                  </small>
                )}
              </span>
            </div>
          </div>
          {/* Show error message */}
          {errorMessage && <p className="text-red-500">{errorMessage}</p>}{" "}
          {loading ? (
            <div className="flex justify-center items-center h-32">
              <Spinner animation="border" variant="primary" />
              <span className="ml-3 text-gray-500">Submitting...</span>
            </div>
          ) : (
            <div></div>
          )}
          <button
            type="submit"
            className="w-full bg-[#1A73A7] text-white py-2 rounded-lg hover:bg-[#1a6397] transition duration-300"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default BookingForm;
