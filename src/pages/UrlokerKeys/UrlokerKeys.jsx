import React, { useEffect, useRef, useState, useMemo } from "react";
import { Card, Row, Col } from "react-bootstrap";

import { useNavigate, useSearchParams } from "react-router-dom";
import config from "../../config";
import axios from "axios";
import DatePicker from "../SearchLugLocation/LuggageDetails/DatePicker";
import { HiCheckCircle, HiCurrencyDollar } from "react-icons/hi";
import { LuLoader } from "react-icons/lu";
import { MdClose, MdDownload } from "react-icons/md";
import logo from "/files/img/home-two/logo3.svg";
// payment components
import {
  Elements,
  useStripe,
  useElements,
  PaymentElement,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useTranslation } from "react-i18next";
import { FaInfoCircle } from "react-icons/fa";

import html2canvas from "html2canvas";
import jsPDF from "jspdf";

function UrlokerKeys() {
  const stripePromise = loadStripe(config.STRIPE_PUBLIC_KEY);
  const { 0: sk } = useSearchParams();
  const [dropOffName, setDropOffName] = useState("");
  const [dropOffEmail, setDropOffEmail] = useState("");
  const [dropOffPhone, setDropOffPhone] = useState("");
  const [dropOffDate, setDropOffDate] = useState(new Date());
  const [pickUpName, setPickUpName] = useState("");
  const [pickUpEmail, setPickUpEmail] = useState("");
  const [pickUpPhone, setPickUpPhone] = useState("");
  const [pickUpDate, setPickUpDate] = useState(new Date());
  const [keysNum, setKeysNum] = useState(1);
  const [promoCode, setPromoCode] = useState(""); // promo_code
  const [isPromoApplied, setIsPromoApplied] = useState(false); // promo_code checker
  const [promoAlert, setPromoAlert] = useState("");
  const [load, setLoad] = useState(false);
  // const [location, setLocation] = useState(sk.get("location") || "");
  const [locs, setLocs] = useState([]);
  const [amount, setAmount] = useState(15.0);
  const [clientSecret, setClientSecret] = useState(null);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [bookingId, setBookingId] = useState(null);
  const [finalMessage, setFinalMessage] = useState("");
  const [currentLanguage, setCurrentLanguage] = useState(
    localStorage.getItem("i18nextLng") == "en-US"
      ? "en"
      : localStorage.getItem("i18nextLng") || "en"
  );
  const { i18n } = useTranslation();
  const contentRef = useRef(null);

  const handleDownload = async () => {
    const paySlip = contentRef.current;

    const originalClass = paySlip.className;

    html2canvas(paySlip, { scale: 3 }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png"); // Use PNG for better quality
      const pdf = new jsPDF("p", "mm", "a4");

      // Calculate X and Y positions to center the content
      const imgWidth = 210; // PDF width in mm
      const pageHeight = 297;
      const imgHeight = (canvas.height * imgWidth) / canvas.width; // Keep aspect ratio
      let heightLeft = imgHeight;
      let position = 0;

      pdf.addImage(imgData, "PNG", 0, position + 5, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft > 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, "PNG", 0, position + 5, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }
      pdf.save("keys-booking-invoice.pdf");
      paySlip.className = originalClass;
    });
  };

  useEffect(() => {
    getAllLocations();
  }, []);

  const location = useMemo(() => {
    const loc = sk.get("location") || "";
    return loc;
  }, [locs, sk]);

  const getAllLocations = async () => {
    const url = config.API_BASE_URL;
    try {
      const response = await axios.get(
        `${url}/api/v1/locations/public/all-locations`
      );
      const data = response.data;
      console.log("success", data);
      if (Array.isArray(data)) setLocs(data.filter((a) => a.canStoreKeys));
      else {
        console.log("Data is not an array list");
      }
    } catch (err) {
      console.log("error", err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Here, you would send the collected data to your backend for processing
    const url = config.API_BASE_URL;
    if (pickUpDate.getTime() <= dropOffDate.getTime()) {
      alert(
        "Pick-up date and time should be greater than drop-off date and time"
      );
      return;
    }
    try {
      setLoad(true);
      const response = await axios.post(`${url}/api/v1/airbnb-keys/bookings`, {
        guest: {
          name: dropOffName,
          email: dropOffEmail,
          phone: dropOffPhone || "0000000000",
        },
        location: location, // Valid location ID
        startDate: `${dropOffDate.getFullYear()}-${
          dropOffDate.getMonth() + 1
        }-${dropOffDate.getDate()}`, // Required start date
        startTime: `${dropOffDate.getHours()}:${dropOffDate.getMinutes()}`, // Required start time
        endDate: `${pickUpDate.getFullYear()}-${
          pickUpDate.getMonth() + 1
        }-${pickUpDate.getDate()}`, // Required start date
        endTime: `${pickUpDate.getHours()}:${pickUpDate.getMinutes()}`,

        keyPickUpBy: {
          name: pickUpName,
          email: pickUpEmail,
          phone: pickUpPhone || "0000000000",
        },
        // keyDropOffTime: dropOffDate.toISOString(), // Key pickup time
        keyPickUpTime: pickUpDate.toISOString(), // Key pickup time
        keyStorageFee: amount, // Optional, defaults to the location's hourly fee
        keyOwner: {
          name: "John Doe", // Required key owner name
          email: "john@example.com", // Required key owner email
        },
        // timezone: Intl?.DateTimeFormat()?.resolvedOptions()?.timeZone,
      });
      if (response.data?.success) {
        setClientSecret(response.data.clientSecret);
        setBookingId(response.data.booking?._id);
        // setBookingId(result.booking._id);
        console.log("AirBnB Key ID:", response.data);
        if (!isPromoApplied) setShowPaymentModal(true);
        else if (isPromoApplied && response.data.booking?._id) {
          const utilizeResponse = await axios.put(
            `${url}/api/v1/promocode/utilize/${promoCode}`,
            {}
          );
          if (
            utilizeResponse.data.message ===
            "Promo code is either already utilized or inactive"
          ) {
            alert("Promo code is either already utilized or inactive");
            return;
          }
          const promoResponse = await axios.put(
            `${url}/api/v1/airbnb-keys/bookings/${response.data.booking?._id}/discount`,
            {
              discountCode: promoCode,
              discountPercentage: 100,
              coversFullAmount: true,
            }
          );
          console.log("Promo Response:", promoResponse.data);
          setFinalMessage("PAYMENT SUCCESSFUL");
        }
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoad(false);
    }
  };

  return (
    <div
      className={`${
        finalMessage.includes("SUCCESSFUL") && "lg:grid lg:grid-cols-2"
      } gap-2`}
    >
      <form
        className="bg-white border p-4 grid lg:grid-cols-2 gap-3 mx-auto rounded-lg max-w-5xl mb-10 h-fit"
        onSubmit={handleSubmit}
      >
        {/* left part */}
        <div
          className="aria-hidden:hidden lg:block"
          hidden={finalMessage.includes("SUCCESSFUL") == true}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className=" border border-gray-600 p-2 rounded-md">
              <label className="block mb-2 text-sm">
                {"Drop-off Person/Agent"}
              </label>
              <input
                type="text"
                className="border rounded-md px-3 py-2 w-full"
                placeholder="Name"
                required
                minLength={3}
                value={dropOffName}
                onChange={(e) => setDropOffName(e.target.value)}
              />
              <input
                type="email"
                className="border rounded-md px-3 py-2 w-full mt-2"
                placeholder="Email"
                required
                value={dropOffEmail}
                onChange={(e) => setDropOffEmail(e.target.value)}
              />
            </div>
            <div className=" border border-gray-600 p-2 rounded-md">
              <label className="block mb-2 text-sm">Pick-up Person</label>
              <input
                type="text"
                className="border rounded-md px-3 py-2 w-full"
                placeholder="Name"
                required
                minlength={3}
                value={pickUpName}
                onChange={(e) => setPickUpName(e.target.value)}
              />
              <input
                type="email"
                className="border rounded-md px-3 py-2 w-full mt-2"
                placeholder="Email"
                required
                value={pickUpEmail}
                onChange={(e) => setPickUpEmail(e.target.value)}
              />
            </div>
          </div>
          <br />

          {/* middle part */}
          <DatePicker
            setCheckinTime={setDropOffDate}
            setCheckoutTime={setPickUpDate}
            setLuggageQuantity={setKeysNum}
            hideBags={true}
          />
        </div>
        {/* entire payment- right part */}
        <div className="bg-white border border-gray-400 p-2 rounded-md h-fit py-5">
          <p className="text-center font-bold text-2xl">Payment Checkout</p>
          <p className="flex flex-wrap items-center p-2 my-2 bg-teal-50">
            <span className="flex items-center gap-2">
              <span>
                <FaInfoCircle />
              </span>
              <span>Booking ID: </span>
            </span>
            <span className="font-bold ml-6 text-sm">
              {bookingId || "Click submit to proceed"}
            </span>
          </p>
          <p className="flex flex-wrap items-center p-2 my-2 bg-teal-50">
            <span className="flex items-center gap-2">
              <span>
                <FaInfoCircle />
              </span>
              <span>Location: </span>
            </span>
            <span className="font-bold ml-6 text-sm">
              {locs?.find((l) => l?._id === location)?.name || "No location"}
            </span>
          </p>
          <p className="flex gap-2 items-center p-2 my-2 bg-teal-50">
            <span>
              <HiCurrencyDollar />
            </span>
            <span>Payment Amount: </span>
            <span className="text-lg font-bold">${amount.toFixed(2)} AUD</span>
          </p>
          {showPaymentModal &&
            clientSecret &&
            (finalMessage.length == 0 ? (
              <Elements
                stripe={stripePromise}
                options={{
                  clientSecret: clientSecret,
                }}
              >
                <PaymentFormModal
                  clientSecret={clientSecret}
                  bookingId={bookingId}
                  setFinalMessage={setFinalMessage}
                />
              </Elements>
            ) : (
              <p
                className={`flex gap-2 items-center p-2 mt-10 ${
                  finalMessage.includes("SUCCESSFUL")
                    ? "bg-green-200 text-green-600"
                    : "bg-red-200 text-red-600"
                } justify-center`}
              >
                <span>
                  {finalMessage.includes("SUCCESSFUL") ? (
                    <HiCheckCircle />
                  ) : (
                    <MdClose />
                  )}
                </span>
                <span className="text-lg font-bold">{finalMessage}</span>
              </p>
            ))}
          {!showPaymentModal && !finalMessage.includes("SUCCESSFUL") && (
            <div>
              {/* promo code input box */}
              <label className="block mb-2 text-sm" htmlFor="promo_code">
                Promo Code
              </label>
              <section className="flex gap-4">
                <input
                  className="border rounded-md px-3 py-2 w-full flex-1"
                  placeholder="Enter Promo Code"
                  id="promo_code"
                  name="promo_code"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                />
                <button
                  className="bg-custom-teal text-white font-medium px-5 rounded-md hover:bg-custom-teal-deep transition-colors"
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    if (promoCode.length == 0) {
                      alert("Please enter a promo code");
                      return;
                    } else {
                      const url = config.API_BASE_URL;
                      setLoad(true);
                      axios
                        .get(`${url}/api/v1/promocode/check/${promoCode}`)
                        .then((res) => {
                          console.log(res.data);
                          if (res.data?.discountPercentage) {
                            console.log(
                              amount -
                                (amount * res.data?.discountPercentage) / 100
                            );
                            setAmount((p) =>
                              Number(
                                p - (p * res.data?.discountPercentage) / 100
                              )
                            );
                            setIsPromoApplied(true);
                          } else {
                            setAmount(15);
                          }
                          setPromoAlert(
                            res.data?.message || "Invalid promo code"
                          );
                        })
                        .catch((err) => {
                          setIsPromoApplied(false);
                          setPromoAlert(
                            err.response?.data?.message || "Invalid promo code"
                          );
                        })
                        .finally(() => {
                          setLoad(false);
                        });
                    }
                  }}
                >
                  Apply
                </button>
              </section>
              {promoAlert && (
                <p className="text-amber-700 font-semibold mt-2 text-base capitalize">
                  *{promoAlert}
                </p>
              )}
            </div>
          )}
        </div>

        {bookingId && clientSecret ? null : (
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 transition-colors lg:col-span-2 text-white px-4 py-2 min-h-10 rounded-md mt-4 flex items-center gap-2 w-full justify-center disabled:bg-blue-400/90 disabled:pointer-events-none"
            disabled={load}
          >
            {load ? <LuLoader className="animate-spin" /> : "Submit"}
          </button>
        )}
      </form>

      <div
        className="w-5/6 bg-white rounded-lg mx-auto px-3 mb-20 pt-3"
        hidden={finalMessage.includes("SUCCESSFUL") == false}
      >
        <button
          className={`flex gap-2 w-full items-center p-2 mt-5 bg-custom-teal hover:bg-custom-teal-deep text-green-100 transition-colors justify-center rounded-md`}
          type="button"
          onClick={handleDownload}
        >
          <span>
            <MdDownload />
          </span>
          <span className="text-lg font-bold">Download Billing Invoice</span>
        </button>
        <Card className="p-6 rounded-lg pointer-events-none" ref={contentRef}>
          <Card.Body>
            <div className="text-center mt-8">
              <img
                src={logo}
                alt="Logo"
                className="mx-auto mb-6"
                style={{ width: "150px", height: "auto" }}
              />
            </div>
            <h1 className="text-success font-bold mb-4 text-3xl">
              Booking and Payment Successful!
            </h1>
            <p className="text-muted mb-4 text-lg">
              We,ve sent a confirmation email with all the booking details.
              Please keep it handy for your records.
            </p>
            <p className="text-muted mb-4 text-lg">
              You can collect your key anytime from the pickup time, at your
              convenience. No need to rush—your key will be securely stored and
              available whenever you're ready to collect it.
            </p>

            <Row className="mb-3">
              <Col md={6}>
                <strong>{"Drop-off Person/Agent:"}</strong>
                <p className="m-0">{dropOffName}</p>
                <p className="m-0">{dropOffEmail}</p>
                {/* <p className="m-0">{dropOffPhone}</p> */}
              </Col>
              <Col md={6}>
                <strong>Pick-up Person:</strong>
                <p className="m-0">{pickUpName}</p>
                <p className="m-0">{pickUpEmail}</p>
                {/* <p className="m-0">{pickUpPhone}</p> */}
              </Col>
            </Row>

            <Row className="mb-3">
              <Col md={6} className="flex gap-2">
                <strong>Location:</strong>
                <p className="m-0">
                  {locs.find((e) => e._id == location)?.name}
                </p>
              </Col>
            </Row>

            <Row className="mb-3">
              <Col md={12}>
                <Card className="p-3 bg-light border rounded-lg bg-white">
                  <h3 className="text-center font-bold text-success">
                    Payment Success
                  </h3>
                  <Col className="flex flex-wrap break-all gap-2 items-center p-2 mt-2">
                    <span>Booking ID: </span>
                    <span className="text-lg font-bold">
                      {bookingId || "Click submit to proceed"}
                    </span>
                  </Col>
                  <Col className="flex gap-2 items-center p-2 mb-2">
                    <span>Payment Amount: </span>
                    <span className="text-lg font-bold">
                      ${amount.toFixed(2)} AUD
                    </span>
                    {isPromoApplied && (
                      <span className="text-sm font-thin">
                        {"(using promo code)"}
                      </span>
                    )}
                  </Col>
                </Card>
              </Col>
            </Row>

            <Row className="mb-3">
              <Col md={6}>
                <strong>Drop-off</strong>
                <p className="m-0">
                  {dropOffDate.toLocaleDateString()} at{" "}
                  {dropOffDate.toLocaleTimeString()}
                </p>
              </Col>
              <Col md={6}>
                <strong>Pick-up</strong>
                <p className="m-0">
                  {pickUpDate.toLocaleDateString()} at{" "}
                  {pickUpDate.toLocaleTimeString()}
                </p>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
}

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
          `${config.API_BASE_URL}/api/v1/airbnb-keys/bookings/${bookingId}/payment`,
          {
            paymentIntentId: paymentIntent.id,
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

export default UrlokerKeys;
