import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "tailwindcss/tailwind.css";
// payment components
import {
  Elements,
  useStripe,
  useElements,
  CardElement,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import GooglePayButton from "@google-pay/button-react";

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

import CustomGoogleBtn from "../../../components/CustomGoogleBtn";

library.add(faMapMarkerAlt, faClock, faStar, faWifi, faShieldAlt, faTag);

const stripePromise = loadStripe(config.STRIPE_PUBLIC_KEY);

const LuggageStoreDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [storeDetails, setStoreDetails] = useState(null);
  const [luggageQuantity, setLuggageQuantity] = useState(1);
  const [serviceOption, setServiceOption] = useState("standard");
  const [promoCode, setPromoCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [checkinTime, setCheckinTime] = useState("");
  const [checkoutTime, setCheckoutTime] = useState("");
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
  const [bookingError, setBookingError] = useState("");
  const [showBookingErrorModal, setShowBookingErrorModal] = useState(false);
  const [guestDetails, setGuestDetails] = useState(null);

  const GOOGLE_MAPS_API_KEY = config.GOOGLE_API_KEY;

  useEffect(() => {
    const fetchStoreDetails = async () => {
      if (!location.state || !location.state.link) {
        const pathName = location.pathname.split("/").pop();
        const url = `${config.API_BASE_URL}/api/v1/locations/url/${pathName}`;
        console.log(pathName);

        try {
          const response = await fetch(url);
          const data = await response.json();

          if (response.ok) {
            setStoreDetails({
              id: data._id,
              title: data.name,
              details: data.description,
              price: data.regularPrice,
              lat: data.coordinates.coordinates[1],
              lng: data.coordinates.coordinates[0],
              regularprice: data.regularPrice,
              availableFrom: data.availableFrom,
              availableTo: data.availableTo,
              discountPercentage: data.discountPercentage,
              openTime: data.openTime,
              closeTime: data.closeTime,
              notes: data.notes,
              link: data.url,
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
        setStoreDetails(location.state); // Use the data passed via location.state
      }
    };

    fetchStoreDetails();
  }, [location, navigate]);

  const handleSubmit = async (bookingData, guestDetails) => {
    console.log("Guest Details:", guestDetails); // Log guest details to the console

    setGuestDetails(guestDetails); // Store guestDetails in state

    const token = localStorage.getItem("token");
    const url = `${config.API_BASE_URL}/api/v1/bookings/instant-booking`;

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
    <Elements stripe={stripePromise}>
      <div>
        {isLoggedIn ? <ClientNavbarComp /> : <NavbarComp />}

        <div className="container mx-auto mt-12 pt-32">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="col-span-2">
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
                  GOOGLE_MAPS_API_KEY={GOOGLE_MAPS_API_KEY}
                />
              ) : (
                <div>Loading...</div>
              )}
            </div>
            <div>
              {bookingError && (
                <div className="alert alert-danger">{bookingError}</div>
              )}
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
                checkinTime={checkinTime}
                setCheckinTime={setCheckinTime}
                checkoutTime={checkoutTime}
                setCheckoutTime={setCheckoutTime}
                totalPrice={totalPrice}
                setTotalPrice={setTotalPrice}
                regularprice={storeDetails?.regularprice}
                clientId={clientId}
                setClientId={setClientId}
                clientDetails={clientDetails}
                setClientDetails={setClientDetails}
              />
            </div>
          </div>
        </div>
        {showPaymentModal && (
          <PaymentFormModal
            clientSecret={clientSecret}
            clientDetails={clientDetails}
            guestDetails={guestDetails}
            bookingId={bookingId}
            storeDetails={storeDetails}
            totalPrice={totalPrice} // Pass the total price here
            luggageQuantity={luggageQuantity}
          />
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
    </Elements>
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
}) => {
  const stripe = useStripe();
  const elements = useElements();
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  // handle google payment
  const paymentRequestHandle = {
    apiVersion: 2,
    apiVersionMinor: 0,
    allowedPaymentMethods: [
      {
        type: "CARD",
        parameters: {
          allowedAuthMethods: ["PAN_ONLY", "CRYPTOGRAM_3DS"],
          allowedCardNetworks: ["MASTERCARD", "VISA"],
        },
        tokenizationSpecification: {
          type: "PAYMENT_GATEWAY",
          parameters: {
            gateway: "STRIPE",
            gatewayMerchantId: config.STRIPE_PUBLIC_KEY,
            // Replace with your actual publishable key
          },
        },
      },
    ],
    merchantInfo: {
      merchantId: "12345678901234567890",
      merchantName: "Demo Merchant",
    },
    transactionInfo: {
      totalPriceStatus: "FINAL",
      totalPriceLabel: "Total",
      totalPrice: `${totalPrice}`,
      currencyCode: "BDT",
      countryCode: "BD",
    },
  };

  const handlePayment = async (e) => {
    e?.preventDefault();
    if (!stripe || !elements) return;

    const cardElement = elements.getElement(CardElement);

    const { error, paymentIntent } = await stripe.confirmCardPayment(
      clientSecret,
      {
        payment_method: {
          card: cardElement,
          billing_details: {
            name: guestDetails?.name || clientDetails.name, // Use guestDetails name if available
          },
        },
      }
    );

    if (error) {
      setErrorMessage(error.message);
    } else if (paymentIntent && paymentIntent.status === "succeeded") {
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
            storeDetails,
            totalPrice, // Pass the total price here
            luggageQuantity, // Pass the luggage quantity here
          },
        });
      } catch (error) {
        console.error("Error updating booking status:", error);
      }
    } else {
      navigate("/payment-cancelled");
    }
  };

  const handleClose = () => {
    window.location.reload(); // Reload the page when the modal is closed
  };

  return (
    <Modal show onHide={handleClose} className="modal-dialog-centered">
      <Modal.Header closeButton className="bg-[#1A73A7] text-white">
        <Modal.Title className="text-lg font-semibold">
          Complete Your Payment
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="bg-gray-100 p-6 rounded-lg">
        <form onSubmit={handlePayment} className="space-y-6">
          <div className="p-4 bg-white shadow-md rounded-lg">
            <h6 className="text-gray-800 font-medium mb-3">
              Enter Your Payment Details
            </h6>
            <CardElement
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
          <Button
            variant="primary"
            type="submit"
            className="w-full bg-[#1A73A7] text-white py-3 rounded-lg hover:bg-blue-600 transition duration-300 font-semibold"
          >
            Pay Now
          </Button>
          {/* <CustomGoogleBtn totalPrice={totalPrice} /> */}
          <GooglePayButton
            className="w-full"
            environment="TEST"
            buttonSizeMode="fill"
            buttonRadius={5}
            paymentRequest={{
              ...paymentRequestHandle,
              merchantInfo: {
                merchantId: "12345678901234567890",
                merchantName: "Demo Merchant",
              },
            }}
            onLoadPaymentData={async (paymentRequest) => {
              console.log("paymentRequest: ");
              if (paymentRequest?.paymentMethodData?.tokenizationData?.token);
              console.log(paymentRequest);
              alert("Payment done by GPAY")
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

                if (!response.ok) {
                  throw new Error("Failed to update booking status");
                }

                // navigate("/payment-success", {
                //   state: {
                //     paymentIntent,
                //     guestDetails: guestDetails || clientDetails, // Use guestDetails if it exists, otherwise use clientDetails
                //     bookingDetails: {
                //       bookingId: responseData._id,
                //       bookingDate: responseData.bookingDate,
                //       startDate: responseData.startDate,
                //       startTime: responseData.startTime,
                //       endTime: responseData.endTime,
                //       endDate: responseData.endDate,
                //       locationid: storeDetails.id,
                //     },
                //     storeDetails,
                //     totalPrice, // Pass the total price here
                //     luggageQuantity, // Pass the luggage quantity here
                //   },
                // });
              } catch (error) {
                console.error("Error updating booking status:", error);
              }
            }}
            onError={(error) => {
              console.error("Google Pay Error:", error);
              setErrorMessage(
                "An error occurred during Google Pay transaction. Please try again."
              );
            }}
            onClick={(e) => {
              console.log("triggers GPAY");
            }}
            onCancel={(ccc) => {
              console.log("cancel: ", ccc);
              setErrorMessage("Payment Cancelled");
              navigate("/payment-cancelled");
            }}
            buttonColor="black"
            buttonType="pay"
          />
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default LuggageStoreDetails;
