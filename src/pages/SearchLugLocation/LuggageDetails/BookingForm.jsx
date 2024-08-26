import React, { useEffect, useState } from "react";
import { Button, Modal, Spinner } from "react-bootstrap";
import { FiAlertCircle, FiCheck } from "react-icons/fi";
import DatePicker from "./DatePicker";
import moment from "moment-timezone";

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
  qrChecked,
  setQrChecked,
  isBookingAllowed,
  isAgree,
  setIsAgree,
}) => {
  console.log(isBookingAllowed);
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

  // Define the Australian time zone
  const australianTimeZone = "Australia/Sydney";

  useEffect(() => {
    // Set default check-in and check-out times
    const checkin = moment()
      .tz(australianTimeZone)
      .add(6, "hours")
      .format("YYYY-MM-DDTHH:mm");
    const checkout = moment(checkin)
      .tz(australianTimeZone)
      .add(20, "hours")
      .format("YYYY-MM-DDTHH:mm");

    //    setCheckinTime(checkin);
    //  setCheckoutTime(checkout);

    setTotalPrice(0);
    setDiscount(0);
  }, [setTotalPrice, setDiscount, setCheckinTime, setCheckoutTime]);

  const handleApplyPromo = () => {
    if (promoCode === "DISCOUNT10") {
      setDiscount(10);
      setPromoApplied(true);
    } else {
      setDiscount(0);
      setPromoApplied(false);
      setErrorMessage("Invalid promo code. Please try again.");
    }
  };

  const handleRemovePromo = () => {
    setPromoCode("");
    setDiscount(0);
    setPromoApplied(false);
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
      let price = dailyRate * duration * luggageQuantity - discount;
      price = parseFloat(price.toFixed(2)); // Round to two decimal places
      setTotalPrice(price > 0 ? price : 0);
    }
  }, [discount, checkinTime, checkoutTime, luggageQuantity, setTotalPrice]);

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
      startDate: moment(checkinTime)
        .tz(australianTimeZone)
        .format("YYYY-MM-DD"),
      startTime: moment(checkinTime).tz(australianTimeZone).format("HH:mm"),
      endDate: moment(checkoutTime).tz(australianTimeZone).format("YYYY-MM-DD"),
      endTime: moment(checkoutTime).tz(australianTimeZone).format("HH:mm"),
      totalPricePaid: parseFloat(totalPrice).toFixed(2),
      specialRequests: clientDetails.specialRequests || "No requirement",
      luggageQuantity: luggageQuantity,
    };

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
      await handleSubmit(
        { ...bookingData, qrChecked: qrChecked },
        guestDetails
      );
      setShowModal(false); // Close modal on successful submission
    } catch (error) {
      setErrorMessage("Submission failed. Please try again.");
    } finally {
      setLoading(false); // Set loading to false
    }
  };

  const openUserDetailsModal = () => {
    if (validateDateTime(checkinTime, checkoutTime)) {
      setShowModal(true);
    } else {
      setErrorMessage("Please fill out all required fields before proceeding.");
    }
  };

  return (
    <div className="bg-white text-slate-900 shadow-md rounded-lg p-6">
      <h5 className="text-2xl font-bold mb-4">Your Booking</h5>
      {errorMessage && <div className="text-red-500 mb-4">{errorMessage}</div>}
      <form id="booking-form" onSubmit={handleFormSubmit}>
        <DatePicker
          setCheckinTime={setCheckinTime}
          setCheckoutTime={setCheckoutTime}
          setLuggageQuantity={setLuggageQuantity}
        />

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

        <div className="mb-4">
          <h4 className="font-bold text-sm">
            Have you reached us through a QR Code?
          </h4>
          <div className="grid grid-cols-2 gap-4">
            <section className="p-1 flex justify-start items-center gap-2 border border-2 rounded-md mt-1">
              <input
                type="radio"
                name="qrChecker"
                id="qrCheckerYes"
                onChange={() => setQrChecked(true)}
              />
              <label className="flex-1" htmlFor="qrCheckerYes">
                Yes
              </label>
            </section>
            <section className="p-1 flex justify-start items-center gap-2 border border-2 rounded-md mt-1">
              <input
                type="radio"
                name="qrChecker"
                id="qrCheckerNo"
                onChange={() => setQrChecked(false)}
              />
              <label className="flex-1" htmlFor="qrCheckerNo">
                No
              </label>
            </section>
          </div>
        </div>

        <div className="Mb-4 flex gap-2 items-center mb-6 group w-fit">
          <input
            type="checkbox"
            hidden
            name="isAgree"
            id="isAgree"
            onChange={(e) => setIsAgree(e.target.checked)}
          />
          <label htmlFor="isAgree" className="text-base">
            <div
              className={`bg-gray-300 w-fit transition-colors duration-500 inline-block mr-2 rounded-sm ${
                isAgree ? "bg-teal-400/80" : "bg-gray-100"
              }`}
            >
              <FiCheck
                className={`p-px transition-colors ${!isAgree && "opacity-30"}`}
                enableBackground={"true"}
                color={"black"}
              />
            </div>
            I have read and agree to{" "}
            <a
              className="text-teal-500 font-medium hover:underline"
              href="/terms-and-conditions"
            >
              Terms and Conditions
            </a>{" "}
          </label>
        </div>

        <div className="border-t border-gray-300 pt-4">
          <h6 className="font-bold mb-2">Price details</h6>

          <div className="flex justify-between">
            <span>
              {luggageQuantity} Checked bag{luggageQuantity > 1 ? "s" : ""} (A$
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

          {/* <div className="flex justify-between">
  <span>Service Charge per day</span>
  <span>A${(2.60).toFixed(2)}</span>
</div> */}

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
            <span>Total</span>
            <span>A${totalPrice.toFixed(2)}</span>
          </div>
        </div>
        {false && (
          <div
            className="bg-yellow-100 flex items-center gap-2 border border-yellow-400 my-3 text-yellow-700 px-4 py-3 rounded"
            role="alert"
          >
            <span>
              <FiAlertCircle />{" "}
            </span>
            <p>
              <strong className="font-bold">
                Service Temporarily Blocked.
              </strong>{" "}
              Try another location.
            </p>
          </div>
        )}
        <Button
          variant="primary"
          onClick={openUserDetailsModal}
          className="w-full bg-[#1A73A7] text-white py-2 rounded hover:bg-blue-700 transition duration-300 mb-2"
          disabled={!checkinTime || !checkoutTime || !isAgree}
        >
          Book Now
        </Button>
      </form>

      <Modal
        show={showModal}
        onHide={() => setShowModal(false)}
        className="modal-dialog-centered"
      >
        <Modal.Header closeButton className="bg-[#1A73A7] text-white">
          <Modal.Title>User Details</Modal.Title>
        </Modal.Header>
        <Modal.Body className="bg-gray-100 p-6 rounded-lg">
          {loading ? (
            <div className="flex justify-center items-center h-32">
              <Spinner animation="border" variant="primary" />
              <span className="ml-3 text-gray-500">Submitting...</span>
            </div>
          ) : (
            <form onSubmit={handleFormSubmit} className="space-y-4">
              {!clientId && (
                <>
                  <div>
                    <label
                      htmlFor="clientName"
                      className="block font-semibold mb-1"
                    >
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
                    {errors.name && (
                      <p className="text-red-500">{errors.name}</p>
                    )}
                  </div>
                  <div>
                    <label
                      htmlFor="clientEmail"
                      className="block font-semibold mb-1"
                    >
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
                    {errors.email && (
                      <p className="text-red-500">{errors.email}</p>
                    )}
                  </div>
                  <div>
                    <label
                      htmlFor="clientPhone"
                      className="block font-semibold mb-1"
                    >
                      Phone Number:
                    </label>
                    <input
                      type="text"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      id="clientPhone"
                      name="phone"
                      value={guestDetails.phone}
                      onChange={handleInputChange}
                      //required
                    />
                    <p className="text-sm text-rose-500">
                      *phone number at least 10 digit long
                    </p>
                    {errors.phone && (
                      <p className="text-red-500">{errors.phone}</p>
                    )}
                  </div>
                </>
              )}
              <div>
                <label
                  htmlFor="luggagePhotos"
                  className="block font-semibold mb-1"
                >
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
              <Button
                variant="primary"
                type="submit"
                className="w-full bg-[#1A73A7] text-white py-3 rounded-lg hover:bg-blue-500 transition duration-300"
              >
                Submit
              </Button>
              {errorMessage && <p className="text-red-500">{errorMessage}</p>}{" "}
              {/* Show error message */}
            </form>
          )}
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default BookingForm;
