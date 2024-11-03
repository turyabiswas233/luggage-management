import React, { useState, useEffect } from "react";

// payment components
import {
  Elements,
  useStripe,
  useElements,
  PaymentElement,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

//other components
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faMapMarkerAlt,
  faClock,
  faStar,
  faWifi,
  faShieldAlt,
  faTag,
} from "@fortawesome/free-solid-svg-icons";
import ClientNavbarComp from "../../User/ClientNavbarComp";
import { useLocation, useNavigate } from "react-router-dom";
import config from "../../../config";
import LuggageStoreInfo from "./LuggageStoreInfo";
import BookingForm from "./BookingForm";
import NavbarComp from "../../Home/NavbarComp";
import { Button, Modal } from "react-bootstrap";
import { FiAlertCircle } from "react-icons/fi";
library.add(faMapMarkerAlt, faClock, faStar, faWifi, faShieldAlt, faTag);

const LuggageStoreDetails = () => {
  const stripePromise = loadStripe(config.STRIPE_PUBLIC_KEY);

  const { state, pathname } = useLocation();
  const navigate = useNavigate();

  const [storeDetails, setStoreDetails] = useState(null);
  const [luggageQuantity, setLuggageQuantity] = useState(1);
  const [serviceOption, setServiceOption] = useState("standard");
  const [promoCode, setPromoCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [qrChecked, setQrcode] = useState(false);

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [clientId, setClientId] = useState(null);
  const [clientDetails, setClientDetails] = useState({
    name: "",
    email: "",
    phone: "",
    luggagePhotos: [],
    specialRequests: "",
    notes: "",
  });

  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [clientSecret, setClientSecret] = useState("");
  const [bookingId, setBookingId] = useState("");
  const [isBookingAllowd, setBookingAllowed] = useState(false);
  const [bookingError, setBookingError] = useState("");
  const [showBookingErrorModal, setShowBookingErrorModal] = useState(false);
  const [guestDetails, setGuestDetails] = useState(null);

  const fetchStoreDetails = async () => {
    if (!state || !state.link) {
      const pName = pathname.split("/").pop();
      const url = `${config.API_BASE_URL}/api/v1/locations/url/${pName}`;

      try {
        const response = await fetch(url);
        const data = await response.json();
        setBookingAllowed(data?.canStoreLuggage);
        console.log(data);

        if (response.ok) {
          setStoreDetails({
            id: data?._id,
            title: data?.name,
            details: data?.description,
            price: data?.regularPrice,
            lat: data?.coordinates.coordinates[1],
            lng: data?.coordinates.coordinates[0],
            regularprice: data?.regularPrice,
            availableFrom: data?.availableFrom,
            availableTo: data?.availableTo,
            discountPercentage: data?.discountPercentage,
            openTime: data?.openTime,
            closeTime: data?.closeTime,
            notes: data?.notes,
            link: data?.url,
            isAllowd: data?.canStoreLuggage,
          });
        } else {
          console.error("Error fetching store details:", data);
          navigate("/error"); // Redirect to an error page
        }
      } catch (error) {
        console.error("Error:", error);
        navigate("/error"); // Redirect to an error page
      }
    } else {
      setStoreDetails(state); // Use the data passed via location.state
    }
  };

  useEffect(() => {
    fetchStoreDetails();
  }, [state]);

  const handleSubmit = async (bookingData, guestDetails) => {
    console.log("Guest Details:", guestDetails); // Log guest details to the console
    console.log("Boking Details:", bookingData); // Log booking details to the console

    setGuestDetails(guestDetails); // Store guestDetails in state

    const token = localStorage.getItem("token");
    const url = `${config.API_BASE_URL}/api/v1/bookings/instant-booking`;
    // console.log(bookingData);
    // return;
    const fetchOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(isLoggedIn && { Authorization: `Bearer ${token}` }),
      },
      body: JSON.stringify(bookingData),
    };

    try {
      const response = await fetch(url, fetchOptions);
      const result = await response.json();

      console.log("Instant booking result:", result);

      if (result.status === "success") {
        setClientSecret(result.clientSecret);
        setBookingId(result.booking._id);
        console.log("Booking ID:", result.booking._id);
        setShowPaymentModal(true);
      } else {
        console.error("Booking error:", result);

        // Check for specific error messages and set them in the state
        if (result.message.includes("Location is not available")) {
          setBookingError(
            "Location is not available for the selected dates and times."
          );
          setShowBookingErrorModal(true);
        } else if (
          result.message.includes("Booking dates cannot be in the past")
        ) {
          setBookingError("Booking dates cannot be in the past.");
          setShowBookingErrorModal(true);
        } else {
          setBookingError(
            "An unexpected error occurred. Please try again later."
          );
          setShowBookingErrorModal(true);
        }
      }
    } catch (error) {
      console.error("Error:", error);
      setBookingError("An unexpected error occurred. Please try again later.");
      setShowBookingErrorModal(true);
    }
  };

  useEffect(() => {
    const fetchProfileData = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const response = await fetch(
            `${config.API_BASE_URL}/api/v1/users/profile/client`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          const result = await response.json();
          if (response.ok) {
            setClientId(result._id);
            setClientDetails({
              name: result.user.username,
              email: result.user.email,
              phone: result.user.phoneNumber || "",
              luggagePhotos: result.user.luggagePhotos || [],
              specialRequests: "",
              notes: "",
            });
            setIsLoggedIn(true);
          } else {
            console.error("Error:", result);
          }
        } catch (error) {
          console.error("Error:", error);
        }
      }
    };

    fetchProfileData();
  }, []);

  const handleBookingErrorModalClose = () => {
    setShowBookingErrorModal(false);
    window.location.reload(); // Refresh the page when OK is clicked
  };

  return (
    <div>
      {isLoggedIn ? <ClientNavbarComp /> : <NavbarComp />}

      {
        <div>
          {bookingId == "" && clientSecret == "" && (
            <div className="container mx-auto pt-10">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  {storeDetails ? (
                    <LuggageStoreInfo
                      id={storeDetails.id}
                      title={storeDetails.title}
                      details={storeDetails.details}
                      price={storeDetails.price}
                      lat={storeDetails.lat}
                      lng={storeDetails.lng}
                      availableFrom={storeDetails.availableFrom}
                      availableTo={storeDetails.availableTo}
                      discountPercentage={storeDetails.discountPercentage}
                      openTime={storeDetails.openTime}
                      closeTime={storeDetails.closeTime}
                      notes={storeDetails.notes}
                    />
                  ) : (
                    <div>Loading...</div>
                  )}
                </div>
                <div>
                  {bookingError && (
                    <div className="alert alert-danger">{bookingError}</div>
                  )}
                  {storeDetails && isBookingAllowd ? (
                    <BookingForm
                      locationid={storeDetails?.id}
                      handleSubmit={handleSubmit}
                      luggageQuantity={luggageQuantity}
                      setLuggageQuantity={setLuggageQuantity}
                      serviceOption={serviceOption}
                      setServiceOption={setServiceOption}
                      promoCode={promoCode}
                      setPromoCode={setPromoCode}
                      discount={discount}
                      setDiscount={setDiscount}
                      totalPrice={totalPrice}
                      setTotalPrice={setTotalPrice}
                      regularprice={storeDetails?.regularprice}
                      clientId={clientId}
                      setClientId={setClientId}
                      clientDetails={clientDetails}
                      setClientDetails={setClientDetails}
                      setQrcode={setQrcode}
                    />
                  ) : (
                    <div className="text-center py-10 px-2 mb-10">
                      <p className="text-3xl font-bold">
                        This luggage storage shop is currently full.
                      </p>
                      <p>Please try another location</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {showPaymentModal && clientSecret && (
            <Elements
              stripe={stripePromise}
              options={{
                clientSecret: clientSecret,
              }}
            >
              <PaymentFormModal
                clientSecret={clientSecret}
                clientDetails={clientDetails}
                guestDetails={guestDetails}
                bookingId={bookingId}
                storeDetails={storeDetails}
                totalPrice={totalPrice} // Pass the total price here
                qrChecked={qrChecked}
                luggageQuantity={luggageQuantity}
              />
            </Elements>
          )}
          {/* Booking Error Modal */}
          <Modal
            show={showBookingErrorModal}
            onHide={handleBookingErrorModalClose}
            className="modal-dialog-centered"
          >
            <Modal.Header closeButton>
              <Modal.Title className="bg-gray-200 text-red-500">
                Booking Error
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <p>{bookingError}</p>{" "}
              {/* Display the dynamic booking error message here */}
              <Button variant="primary" onClick={handleBookingErrorModalClose}>
                OK
              </Button>
            </Modal.Body>
          </Modal>
        </div>
      }
    </div>
  );
};

const PaymentFormModal = ({
  clientSecret,
  clientDetails,
  guestDetails,
  bookingId,
  storeDetails,
  totalPrice,
  luggageQuantity,
  qrChecked,
}) => {
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
      alert("Another error occurred with payment plugin.");
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
    } else if (paymentIntent && paymentIntent.status === "succeeded") {
      console.log("Yahooo", paymentIntent, bookingId);

      // return;
      try {
        const response = await fetch(
          `${config.API_BASE_URL}/api/v1/bookings/${bookingId}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ status: "paid" }),
          }
        );

        const responseData = await response.json();
        console.log(responseData);

        if (!response.ok) {
          throw new Error("Failed to update booking status");
        }

        navigate("/payment-success", {
          state: {
            paymentIntent,
            guestDetails: guestDetails || clientDetails, // Use guestDetails if it exists, otherwise use clientDetails
            bookingDetails: {
              bookingId: responseData._id,
              bookingDate: responseData.bookingDate,
              startDate: responseData.startDate,
              startTime: responseData.startTime,
              endTime: responseData.endTime,
              endDate: responseData.endDate,
              locationid: storeDetails.id,
            },
            qrChecked: qrChecked,
            storeDetails,
            totalPrice, // Pass the total price here
            luggageQuantity, // Pass the luggage quantity here
          },
        });
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

  if (bookingId !== "" && clientSecret !== "")
    return (
      <div className="my-3">
        <header closeButton className="bg-[#1A73A7] text-white p-3">
          <h3 className="text-lg font-semibold">Complete Your Payment</h3>
        </header>
        <div className="bg-gray-100 p-2 rounded-lg">
          <form onSubmit={handlePayment} className="space-y-6">
            <div className="p-4 bg-white shadow-md rounded-lg">
              <h6 className="text-gray-800 font-medium mb-3">
                Enter Your Payment Details
              </h6>
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
              <div className="bg-white p-4  ">
                <div className="flex  items-center py-2">
                  <FiAlertCircle className="text-gray-700  " />
                  <span className="text-gray-600 mx-2">Service Charge:</span>
                  <span className="text-gray-800 font-semibold">
                    A$2.60 per day
                  </span>
                </div>
                <div className="flex  items-center py-2 my-2 border-t border-gray-200">
                  <FiAlertCircle className="text-gray-700  " />
                  <span className="text-gray-600 mx-2">Total Price:</span>
                  <span className="text-gray-800 font-semibold">
                    A${totalPrice.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
            {errorMessage && (
              <div
                className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg relative flex items-center space-x-3"
                role="alert"
              >
                <FiAlertCircle className="text-red-700 w-5 h-5" />
                <span className="block sm:inline">{errorMessage}</span>
              </div>
            )}
            <div className="flex items-center gap-3 justify-between">
              <Button
                variant="primary"
                type="submit"
                className="w-full bg-[#1A73A7] text-white py-3 rounded-lg hover:bg-blue-600 transition duration-300 font-semibold"
                disabled={loading}
              >
                {loading ? "loading..." : "Pay Now"}
              </Button>
              <Button
                variant="primary"
                type="reset"
                onClick={() => window?.location?.reload()}
                className="w-full bg-gray-700 text-white py-3 rounded-lg hover:bg-gray-800 transition duration-300 font-semibold"
              >
                {loading ? "loading..." : "Cancel"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    );
};

export default LuggageStoreDetails;
