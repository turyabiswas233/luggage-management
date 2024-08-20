import React, { useState } from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { Modal, Button, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import config from "../../../config";
 const PaymentFormModal = ({
  clientSecret,
  clientDetails,
  bookingId,
  totalPrice,
}) => {
  const stripe = useStripe();
  const elements = useElements();
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // Define service fee
  const serviceFee = 2.6;

  //   // Calculate final total price including service fee
  //   const finalTotalPrice = (parseFloat(totalPrice) + serviceFee).toFixed(2);

  const handlePayment = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setIsLoading(true); // Show loading spinner when payment submission starts

    const cardElement = elements.getElement(CardElement);

    try {
      const { error, paymentIntent } = await stripe.confirmCardPayment(
        clientSecret,
        {
          payment_method: {
            card: cardElement,
            billing_details: {
              name: clientDetails.name,
            },
          },
        }
      );

      console.log("PaymentIntent:", paymentIntent);

      if (error) {
        setErrorMessage(error.message);
        setIsLoading(false);
      } else if (paymentIntent && paymentIntent.status === "succeeded") {
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
        console.log("Booking Update Response:", responseData);

        if (!response.ok) {
          throw new Error("Failed to update booking status");
        }

        navigate("/payment-success", {
          state: {
            paymentIntent,
            clientDetails,
            bookingDetails: {
              bookingId: responseData._id,
              bookingDate: responseData.bookingDate,
              startDate: responseData.startDate,
              startTime: responseData.startTime,
              endTime: responseData.endTime,
              endDate: responseData.endDate,
            },
            storeDetails,
          },
        });
      } else {
        navigate("/payment-cancelled");
      }
    } catch (error) {
      console.error("Error updating booking status:", error);
      setErrorMessage("Payment failed. Please try again.");
      setIsLoading(false);
    }
  };

  return (
    <Modal show onHide={() => {}} className="modal-dialog-centered">
      <Modal.Header closeButton className="bg-[#1A73A7] text-white">
        <Modal.Title>Complete Your Payment</Modal.Title>
      </Modal.Header>
      <Modal.Body className="bg-gray-100 p-6 rounded-lg">
        <form onSubmit={handlePayment} className="space-y-4">
          <div>
            <CardElement className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
          </div>
          <div className="text-center text-lg font-semibold my-4">
            Service Fee: ${serviceFee.toFixed(2)} AUD
          </div>
          <div className="text-center text-lg font-semibold my-4">
            Total Price (including Service Fee): ${totalPrice} AUD
          </div>
          {errorMessage && <div className="text-red-500">{errorMessage}</div>}
          <div className="flex items-center justify-center">
            {isLoading ? (
              <Spinner
                animation="border"
                role="status"
                variant="primary"
                className="text-primary"
              >
                <span className="sr-only">Loading...</span>
              </Spinner>
            ) : (
              <>
                <Button
                  variant="primary"
                  type="submit"
                  className="w-full bg-[#1A73A7] text-white py-3 rounded-lg hover:bg-blue-500 transition duration-300"
                >
                  Pay Now
                </Button>
              </>
            )}
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default PaymentFormModal;
