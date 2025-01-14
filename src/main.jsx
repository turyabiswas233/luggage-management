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
import ResetPasswordForm from "./pages/ResetPasswordForm";

import LuggageStoreDetails from "./pages/SearchLugLocation/LuggageDetails/LuggageStoreDetails";
import LuggageLocation from "./pages/SearchLugLocation/LuggageLocation";
import PartnerAvailabilityCalendar from "./pages/Partner/PartnerAvailabilityCalender";
import AdminLoginForm from "./pages/SuperAdmin/AdminLoginForm";
import PartnerProfile from "./pages/Partner/PartnerProfile";
import SuperadminRoot from "./pages/SuperAdmin/SuperadminRoot";
import AdminProfile from "./pages/SuperAdmin/AdminProfile";
import AllClient from "./pages/SuperAdmin/AllClient";
import ClientProfile from "./pages/User/ClientProfile";

import ClientBooking from "./pages/User/ClientBooking";
import AllLocations from "./pages/SuperAdmin/AllLocations";
import PartnerLocations from "./pages/Partner/PartnerLocation";
import AllBookings from "./pages/SuperAdmin/AllBookings";
import AllChargings from "./pages/SuperAdmin/AllCharging";
import PartnerBookings from "./pages/Partner/PartnerBookings";
import Logout from "./pages/Home/Logout";
import BookingConfirmation from "./pages/SearchLugLocation/BookingConfirmation";
import ChargingLocations from "./pages/ChargingStorage/ChargingLocations";
import ChargingTerms from "./pages/ChargingStorage/ChargingTerms";
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
import Finance from "./pages/SuperAdmin/Finance";
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
import SydneyStorage from "./pages/City/Page7";
import SydneyCentral from "./pages/City/Page8";
import SydneyCircularQuay from "./pages/City/Page9";
import BrisbaneCBD from "./pages/City/Page10";
import Adelaide from "./pages/City/Page11";
import PerthCBD from "./pages/City/Page12";
import Canberra from "./pages/City/Page13";
import GoldCoast from "./pages/City/Page14";
import MelbourneLocker from "./pages/Lockers/Page1";
import SoutherLocker from "./pages/Lockers/Page2";
// error page
import ErrorPage from "./pages/404";
import PromoCodeManagement from "./pages/SuperAdmin/promocode/PromoCodeManagement";
import Invoice from "./partials/Invoice";
import LiveTracking from "./pages/LiveTracking";

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
        path: "/invoice",
        element: <Invoice />,
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
      {
        path: "/terms-for-charging-station",
        element: <ChargingTerms />,
      },
      {
        path: "/legal-partner-agreement",
        element: <PartnerAgreement />,
      },
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
        path: "/charging",
        element: <ChargingLocations />,
      },
      {
        path: "/charging/:link",
        element: <ChargingLocations />,
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
        path: "/live-tracking/:locationName",
        element: <LiveTracking />,
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
      {
        path: "/luggage-storage-sydney",
        element: <SydneyStorage />,
      },
      {
        path: "/luggage-storage-sydney-central",
        element: <SydneyCentral />,
      },
      {
        path: "/luggage-storage-sydney-circular-quay",
        element: <SydneyCircularQuay />,
      },
      {
        path: "/luggage-storage-brisbane-cbd",
        element: <BrisbaneCBD />,
      },
      {
        path: "/luggage-storage-adelaide",
        element: <Adelaide />,
      },
      {
        path: "/luggage-storage-perth-cbd",
        element: <PerthCBD />,
      },
      {
        path: "/luggage-storage-canberra",
        element: <Canberra />,
      },
      {
        path: "/luggage-storage-gold-coast",
        element: <GoldCoast />,
      },
      {
        path: "/luggage-lockers-melbourne",
        element: <MelbourneLocker />,
      },
      {
        path: "/melbourne-southern-cross-station-lockers",
        element: <SoutherLocker />,
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
    element: <SuperadminRoot />,
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
        element: <Finance />,
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
        path: "edit-location/:locationId",
        element: <EditPartnerLocation />,
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
        path: "chargings",
        element: <AllChargings />,
      },
      {
        path: "analytics",
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
      {
        path: "promocode",
        element: <PromoCodeManagement />,
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
