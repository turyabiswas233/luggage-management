import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import ThemeProvider from "./utils/ThemeContext";
import "./i18";
import { HelmetProvider } from "react-helmet-async";
import "./index.css";
import App from "./App";

// Import pages
import AboutDetails from "./pages/About/AboutDetails";
import Home from "./pages/Home/Home";
import Service from "./pages/Home/Service";
import Support from "./pages/Support";
import Terms from "./pages/Terms";
import Blog from "./pages/Home/Blog";
import BlogDetails from "./pages/BlogDetails";
import Privacy from "./pages/Privacy";
import UrlokerKeys from "./pages/UrlokerKeys/UrlokerKeys";
import PaymentSuccess from "./pages/SearchLugLocation/LuggageDetails/PaymentSuccess";
import UrlokerKeysMap from "./pages/UrlokerKeys/UrlokerKeysMap";
import UnauthorizedPage from "./pages/UnauthorizedPage";
import ComingSoon from "./pages/CominSoon";
import SearchLuggage from "./pages/SearchLuggage";
import PartnerAgreement from "./pages/legal/PartnerAgreement";
import UserServiceAgency from "./pages/UserServiceAgency";
import AllPartner from "./pages/SuperAdmin/AllPartner";
import AllUser from "./pages/SuperAdmin/AllUser";
import Reservations from "./pages/User/Reservations";
import AllLuggage from "./pages/Luggage/AllLuggage";
import LuggageDetails from "./pages/Luggage/LuggageDetails";
import AllCustomer from "./pages/Partner/AllCustomer";
import PartnerAnalytics from "./pages/Partner/PartnerAnalytics";
import AdminAnalytics from "./pages/SuperAdmin/AdminAnalytics";
import ResetPasswordForm from "./pages/ResetPasswordForm";

import LuggageStoreDetails from "./pages/SearchLugLocation/LuggageDetails/LuggageStoreDetails";
import LuggageLocation from "./pages/SearchLugLocation/LuggageLocation";
import PartnerAvailabilityCalendar from "./pages/Partner/PartnerAvailabilityCalender";
import AdminLoginForm from "./pages/SuperAdmin/AdminLoginForm";
import PartnerProfile from "./pages/Partner/PartnerProfile";
import AdminProfile from "./pages/SuperAdmin/AdminProfile";
import AllClient from "./pages/SuperAdmin/AllClient";
import ClientProfile from "./pages/User/ClientProfile";

import ClientBooking from "./pages/User/ClientBooking";
import AllLocations from "./pages/SuperAdmin/AllLocations";
import PartnerLocations from "./pages/Partner/PartnerLocation";
import AllBookings from "./pages/SuperAdmin/AllBookings";
import PartnerBookings from "./pages/Partner/PartnerBookings";
import Logout from "./pages/Home/Logout";
import BookingConfirmation from "./pages/SearchLugLocation/BookingConfirmation";
import ClientMenu from "./pages/User/ClientMenu";
import ClientWallet from "./pages/User/ClientWallet";
import ClientBookingHistory from "./pages/User/ClientBookingHistory";
import PartnerDetails from "./pages/SuperAdmin/PartnerDetails";
import ClientDetails from "./pages/SuperAdmin/ClientDetails";
import ClientRefundForm from "./pages/User/ClientRefundFOrm";
import ClientHome from "./pages/User/ClientHome";
import CreatePartnerLocation from "./pages/Partner/AddLocation/CreatePartnerLocation";
import CreateAdminLocation from "./pages/SuperAdmin/AddLocation/CreateAdminLocation";
import EditSpecialClosedDays from "./pages/Partner/EditSpecialClosedDays";
import EditPartnerLocation from "./pages/Partner/EditLocation/EditPartnerLocation";
import SuperAdminPartnerAnalytics from "./pages/SuperAdmin/SuperAdminPartnerAnalytics";
import PaymentCancelled from "./pages/SearchLugLocation/LuggageDetails/PaymentCancelled";
import LocationReviews from "./pages/SuperAdmin/LocationReviews";
import AllPartnerPayment from "./pages/SuperAdmin/AllPartnerPayment";
import AddNotification from "./pages/SuperAdmin/Notification/NtAdd";
import AllNotificationAdmin from "./pages/SuperAdmin/Notification/NtList";
import AllNotificationPartner from "./pages/Partner/Notification/NtList";
import SuperAdminUrloker from "./pages/UrlokerKeys/SuperAdminUrloker";
import PartnerUrloker from "./pages/UrlokerKeys/PartnerUrloker";
import PartnerKeyDetails from "./pages/SuperAdmin/PartnerKeyDetails";

// city files [6]
import MelbourneCBD from "./pages/City/Page1";
import AirportPage from "./pages/City/Page2";
import FlindersPage from "./pages/City/Page3";
import Melbourne from "./pages/City/Page4";
import SouthernStation from "./pages/City/Page5";
import MelbourneCentral from "./pages/City/Page6";
// error page
import ErrorPage from "./pages/404";

const root = document.getElementById("root");
const routerConfig = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/about",
        element: <AboutDetails />,
      },
      {
        path: "/services",
        element: <Service />,
      },
      {
        path: "/support",
        element: <Support />,
      },
      {
        path: "/privacy-policy",
        element: <Privacy />,
      },
      {
        path: "/terms-and-conditions",
        element: <Terms />,
      },
      // {
      //   path: "/legal/partner-agreement",
      //   element: <PartnerAgreement />,
      // },
      {
        path: "/blog",
        element: <Blog />,
      },
      {
        path: "/blog/:blogid",
        element: <BlogDetails />,
      },
      // lugage and keys
      {
        path: "/luggage-locations",
        element: <LuggageLocation />,
      },
      {
        path: "/:link",
        element: <LuggageStoreDetails />,
      },
      {
        path: "/allluggage",
        element: <AllLuggage />,
      },
      {
        path: "/luggage/:id",
        element: <LuggageDetails />,
      },
      {
        path: "/urlokerKeys",
        element: <UrlokerKeys />,
      },
      {
        path: "/urlokerkeysmap",
        element: <UrlokerKeysMap />,
      },
      {
        path: "/comingsoon",
        element: <ComingSoon />,
      },
      {
        path: "/payment-success",
        element: <PaymentSuccess />,
      },
      {
        path: "/payment-cancelled",
        element: <PaymentCancelled />,
      },
      {
        path: "/userserviceagency",
        element: <UserServiceAgency />,
      },
      {
        path: "/searchluggage",
        element: <SearchLuggage />,
      },
      {
        path: "/unauthorized",
        element: <UnauthorizedPage />,
      },
      // logout action page
      {
        path: "/logout",
        element: <Logout />,
      },
      {
        path: "/reset-password-form/:tokenId",
        element: <ResetPasswordForm />,
      },
      // 6 static page
      {
        path: "/luggage-storage-melbourne-cbd",
        element: <MelbourneCBD />,
      },
      {
        path: "/luggage-storage-melbourne-airport",
        element: <AirportPage />,
      },
      {
        path: "/flinders-street-station-luggage-storage",
        element: <FlindersPage />,
      },
      {
        path: "/luggage-storage-melbourne",
        element: <Melbourne />,
      },
      {
        path: "/southern-cross-station-luggage-storage",
        element: <SouthernStation />,
      },
      {
        path: "/luggage-storage-melbourne-central-station",
        element: <MelbourneCentral />,
      },
      // others
      {
        path: "/partner_availability_calendar",
        element: <PartnerAvailabilityCalendar />,
      },
    ],
  },
  {
    path: "/error",
    element: <ErrorPage />,
  },
  // superadmin
  {
    path: "/superadmin",
    element: (
      <>
        <Outlet />
      </>
    ),
    errorElement: <ErrorPage />,
    children: [
      {
        path: "login",
        element: <AdminLoginForm />,
      },
      {
        path: "profile",
        element: <AdminProfile />,
      },
      {
        path: "clients",
        element: <AllClient />,
      },
      {
        path: "user",
        element: <AllUser />,
      },
      {
        path: "partners",
        element: <AllPartner />,
      },
      {
        path: "partners-payment",
        element: <AllPartnerPayment />,
      },
      {
        path: "partners/:id",
        element: <PartnerDetails />,
      },
      {
        path: "partners/:id/urlokerkey",
        element: <PartnerKeyDetails />,
      },
      {
        path: "clients/:id",
        element: <ClientDetails />,
      },
      {
        path: "locations",
        element: <AllLocations />,
      },
      {
        path: "reviews/:locationId",
        element: <LocationReviews />,
      },
      {
        path: "create-location",
        element: <CreateAdminLocation />,
      },
      {
        path: "bookings",
        element: <AllBookings />,
      },
      {
        path: "analytics",
        element: <AdminAnalytics />,
      },
      {
        path: "partner-analytics",
        element: <SuperAdminPartnerAnalytics />,
      },
      {
        path: "notification/add",
        element: <AddNotification />,
      },
      {
        path: "notification/all",
        element: <AllNotificationAdmin />,
      },
      {
        path: "urlokerkey",
        element: <SuperAdminUrloker />,
      },
    ],
  },
  // partner
  {
    path: "/partner",
    element: (
      <>
        <Outlet />
      </>
    ),
    errorElement: <ErrorPage />,
    children: [
      {
        path: "create-location",
        element: <CreatePartnerLocation />,
      },
      {
        path: "edit-location/:locationId",
        element: <EditPartnerLocation />,
      },
      {
        path: "profile",
        element: <PartnerProfile />,
      },
      {
        path: "allcustomers",
        element: <AllCustomer />,
      },
      {
        path: "analytics",
        element: <PartnerAnalytics />,
      },
      {
        path: "home",
        element: <PartnerAnalytics />,
      },
      {
        path: "notification",
        element: <AllNotificationPartner />,
      },
      {
        path: "locations",
        element: <PartnerLocations />,
      },
      {
        path: "bookings",
        element: <PartnerBookings />,
      },
      {
        path: "edit-special-closed-days/:locationId",
        element: <EditSpecialClosedDays />,
      },
      {
        path: "urlokerkeys",
        element: <PartnerUrloker />,
      },
    ],
  },
  // client
  {
    path: "/client",
    element: (
      <>
        <Outlet />
      </>
    ),
    errorElement: <ErrorPage />,
    children: [
      {
        path: "home",
        element: <ClientHome />,
      },
      {
        path: "profile",
        element: <ClientProfile />,
      },
      {
        path: "reservation",
        element: <Reservations />,
      },
      {
        path: "booking",
        element: <ClientBooking />,
      },
      {
        path: "menu",
        element: <ClientMenu />,
      },
      {
        path: "refundform",
        element: <ClientRefundForm />,
      },
      {
        path: "bookingconfirmation",
        element: <BookingConfirmation />,
      },
      {
        path: "bookinghistory",
        element: <ClientBookingHistory />,
      },
      {
        path: "wallet",
        element: <ClientWallet />,
      },
    ],
  },
]);

createRoot(root).render(
  <StrictMode>
    <HelmetProvider>
      {/* <Router> */}
      <ThemeProvider>
        <RouterProvider router={routerConfig} />
      </ThemeProvider>
      {/* </Router> */}
    </HelmetProvider>
  </StrictMode>
);
