import GooglePayButton from "@google-pay/button-react";
import React, { useEffect } from "react";
import config from "../config";

const CustomGoogleBtn = ({ totalPrice }) => {
  const paymentDataRequest = {
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
            gateway: "stripe",
            gatewayMerchantId: config.STRIPE_PUBLIC_KEY,
            // Replace with your actual publishable key
          },
        },
      },
    ],
    transactionInfo: {
      totalPriceStatus: "FINAL",
      totalPriceLabel: "Total",
      totalPrice: `${totalPrice}`,
      currencyCode: "USD",
      countryCode: "US",
    },
  };

  useEffect(() => {
    // Load the Google Pay API script
    const script = document.createElement("script");
    script.src = "https://pay.google.com/gp/p/js/pay.js";
    script.onload = () => initializeGooglePay();
    document.body.appendChild(script);
  }, []);

  const initializeGooglePay = () => {
    // Check if Google Pay is available
    const paymentsClient = new window.google.payments.api.PaymentsClient({
      environment: "TEST",
    }); // Use 'PRODUCTION' in production

    paymentsClient
      .isReadyToPay(paymentDataRequest)
      .then((response) => {
        if (response.result) {
          // Show Google Pay button
          const button = paymentsClient.createButton({
            onClick: onGooglePayButtonClicked,
          });
          document.getElementById("gpay").removeChild(button);
          document.getElementById("gpay").appendChild(button);
        }
      })
      .catch((err) => {
        console.error("Error initializing Google Pay:", err);
      });
  };

  const onGooglePayButtonClicked = () => {
    const paymentsClient = new window.google.payments.api.PaymentsClient({
      environment: "TEST",
    }); // Use 'PRODUCTION' in production

    paymentsClient
      .loadPaymentData(paymentDataRequest)
      .then((paymentData) => {
        // Handle the payment data
        processPayment(paymentData);
      })
      .catch((err) => {
        console.error("Error processing payment data:", err);
      });
  };

  const processPayment = (paymentData) => {
    // Extract payment token from the response
    const paymentToken =
      paymentData?.paymentMethodData?.tokenizationData?.token;
    console.log(paymentToken);

    // Send the payment token to your server for processing
    // fetch("/api/process-payment", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({ paymentToken }),
    // })
    //   .then((response) => response.json())
    //   .then((data) => {
    //     // Handle response from your server
    //     if (data.success) {
    //       alert("Payment successful!");
    //     } else {
    //       alert("Payment failed!");
    //     }
    //   })
    //   .catch((err) => {
    //     console.error("Error sending payment token to server:", err);
    //   });
  };

  return <div id="gpay">{/* Google Pay button will be added here */}</div>;
};

export default CustomGoogleBtn;

/*

<GooglePayButton
            environment="TEST"
            buttonSizeMode="fill"
            paymentRequest={paymentDataRequest}
            onLoadPaymentData={(paymentRequest) => {
              console.log(paymentRequest);
            }}
            onError={(error) => {
              console.error("Google Pay Error:", error);
              setErrorMessage(
                "An error occurred during Google Pay transaction. Please try again."
              );
            }}
            onCancel={(ccc) => {
              console.log("cancel: ", ccc);
              setErrorMessage("Payment Cancelled");
            }}
            buttonColor="black"
            buttonType="pay"
          />

*/
