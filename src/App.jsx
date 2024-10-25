import React, { useEffect } from "react";

import { Routes, Route, useLocation } from "react-router-dom";

import "./css/style.css";

// Import pages
import SearchLuggage from "./pages/SearchLuggage";
import UserServiceAgency from "./pages/UserServiceAgency";
import AllPartner from "./pages/SuperAdmin/AllPartner";
import AllUser from "./pages/SuperAdmin/AllUser";
import Reservations from "./pages/User/Reservations";
import AllLuggage from "./pages/Luggage/AllLuggage";
import LuggageDetails from "./pages/Luggage/LuggageDetails";
import AllCustomer from "./pages/Partner/AllCustomer";
import PartnerAnalytics from "./pages/Partner/PartnerAnalytics";
import AdminAnalytics from "./pages/SuperAdmin/AdminAnalytics";
import AboutDetails from "./pages/About/AboutDetails";
import Home from "./pages/Home/Home";
import Service from "./pages/Home/Service";
import Support from "./pages/Support";
import Terms from "./pages/Terms";
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
import ComingSoon from "./pages/CominSoon";
import ClientDetails from "./pages/SuperAdmin/ClientDetails";
import UnauthorizedPage from "./pages/UnauthorizedPage";
import ClientRefundForm from "./pages/User/ClientRefundFOrm";
import ClientHome from "./pages/User/ClientHome";
import PaymentSuccess from "./pages/SearchLugLocation/LuggageDetails/PaymentSuccess";
import CreatePartnerLocation from "./pages/Partner/AddLocation/CreatePartnerLocation";
import CreateAdminLocation from "./pages/SuperAdmin/AddLocation/CreateAdminLocation";
import EditSpecialClosedDays from "./pages/Partner/EditSpecialClosedDays";
import EditPartnerLocation from "./pages/Partner/EditLocation/EditPartnerLocation";
import SuperAdminPartnerAnalytics from "./pages/SuperAdmin/SuperAdminPartnerAnalytics";
import PaymentCancelled from "./pages/SearchLugLocation/LuggageDetails/PaymentCancelled";
import LocationReviews from "./pages/SuperAdmin/LocationReviews";
import AllPartnerPayment from "./pages/SuperAdmin/AllPartnerPayment";
import TawkTo from "./TawkTo";
import BlogDetails from "./pages/BlogDetails";
import Privacy from "./pages/Privacy";
import UrlokerKeys from "./pages/UrlokerKeys/UrlokerKeys";
import AddNotification from "./pages/SuperAdmin/Notification/NtAdd";
import AllNotificationAdmin from "./pages/SuperAdmin/Notification/NtList";
import AllNotificationPartner from "./pages/Partner/Notification/NtList";
import SuperAdminUrloker from "./pages/UrlokerKeys/SuperAdminUrloker";
import PartnerUrloker from "./pages/UrlokerKeys/PartnerUrloker";
import PartnerKeyDetails from "./pages/SuperAdmin/PartnerKeyDetails";
import UrlokerKeysMap from "./pages/UrlokerKeys/UrlokerKeysMap";

// city files 
import MelbourneCBD from "./pages/City/Page1";
import AirportPage from "./pages/City/Page2";
import FlindersPage from "./pages/City/Page3";
import ErrorPage from "./pages/404";

function App() {
  const location = useLocation();

  useEffect(() => {
    document.querySelector("html").style.scrollBehavior = "auto";
    window.scroll({ top: 0 });
    document.querySelector("html").style.scrollBehavior = "";
  }, [location.pathname]); // triggered on route change

  return (
    <>
      <Routes>
        {/* common  */}
        <Route exact path="/" element={<Home />} />
        <Route exact path="/blog-details/:blogid" element={<BlogDetails />} />
        <Route exact path="/about" element={<AboutDetails />} />
        <Route exact path="/services" element={<Service />} />
        <Route exact path="/support" element={<Support />} />
        <Route exact path="/privacy-policy" element={<Privacy />} />
        <Route exact path="/terms-and-conditions" element={<Terms />} />
 
        <Route path="/logout" element={<Logout />} />
        <Route path="/urlokerKeys" element={<UrlokerKeys />} />
        <Route path="/urlokerKeysMap" element={<UrlokerKeysMap />} />
        <Route path="/comingsoon" element={<ComingSoon />} />
        <Route path="/payment-success" element={<PaymentSuccess />} />
        <Route path="/unauthorized" element={<UnauthorizedPage />} />
        <Route
          path="/reset-password-form/:tokenId"
          element={<ResetPasswordForm />}
        />
        {/* for error or not found page */}
        <Route exact path="/error" element={<ErrorPage />} />
        <Route path="*" element={<ErrorPage />} />

        {/* admin  */}

        <Route exact path="/superadmin/login" element={<AdminLoginForm />} />
        <Route exact path="/superadmin/profile" element={<AdminProfile />} />
        <Route exact path="/superadmin/clients" element={<AllClient />} />
        <Route exact path="/superadmin/user" element={<AllUser />} />
        <Route exact path="/superadmin/partners" element={<AllPartner />} />
        <Route
          exact
          path="/superadmin/partners-payment"
          element={<AllPartnerPayment />}
        />
        <Route
          exact
          path="/superadmin/partners/:id"
          element={<PartnerDetails />}
        />
        <Route
          exact
          path="/superadmin/partners/:id/urlokerkey"
          element={<PartnerKeyDetails />}
        />
        <Route
          exact
          path="/superadmin/clients/:id"
          element={<ClientDetails />}
        />
        <Route exact path="/superadmin/locations" element={<AllLocations />} />
        <Route
          path="/superadmin/reviews/:locationId"
          element={<LocationReviews />}
        />
        <Route
          exact
          path="/superadmin/create-location"
          element={<CreateAdminLocation />}
        />
        <Route exact path="/superadmin/bookings" element={<AllBookings />} />
        <Route
          exact
          path="/superadmin/analytics"
          element={<AdminAnalytics />}
        />
        <Route
          exact
          path="/superadmin/partner-analytics"
          element={<SuperAdminPartnerAnalytics />}
        />

        {/* partner  */}
        <Route
          exact
          path="/partner/create-location"
          element={<CreatePartnerLocation />}
        />
        <Route
          exact
          path="/partner/edit-location/:locationId"
          element={<EditPartnerLocation />}
        />
        <Route exact path="/partner/profile" element={<PartnerProfile />} />
        <Route exact path="/partner/allcustomers" element={<AllCustomer />} />
        <Route exact path="/partner/analytics" element={<PartnerAnalytics />} />
        <Route exact path="/partner/home" element={<PartnerAnalytics />} />
        <Route
          exact
          path="/partner_availability_calender"
          element={<PartnerAvailabilityCalendar />}
        />
        <Route
          exact
          path="/partner/notification"
          element={<AllNotificationPartner />}
        />
        <Route exact path="/partner/locations" element={<PartnerLocations />} />
        <Route exact path="/partner/bookings" element={<PartnerBookings />} />
        <Route
          path="/partner/edit-special-closed-days/:locationId"
          element={<EditSpecialClosedDays />}
        />

        {/* clients  */}
        <Route exact path="/client/home" element={<ClientHome />} />
        <Route exact path="/client/reservations" element={<Reservations />} />
        <Route exact path="/client/booking" element={<ClientBooking />} />
        <Route exact path="/client/profile" element={<ClientProfile />} />
        <Route exact path="/client/menu" element={<ClientMenu />} />
        <Route exact path="/client/refundform" element={<ClientRefundForm />} />
        <Route
          exact
          path="/client/bookingconfirmation"
          element={<BookingConfirmation />}
        />
        <Route
          exact
          path="/client/bookinghistory"
          element={<ClientBookingHistory />}
        />
        <Route exact path="/client/wallet" element={<ClientWallet />} />
        <Route path="/payment-success" element={<PaymentSuccess />} />
        {/* <Route path="/payment-cancel" element={<PaymentCancel />}  /> */}
        <Route path="/payment-cancelled" element={<PaymentCancelled />} />

        {/* luggage  */}
        <Route exact path="/luggage_locations" element={<LuggageLocation />} />
        <Route exact path="/:link" element={<LuggageStoreDetails />} />
        <Route
          exact
          path="/userserviceagency"
          element={<UserServiceAgency />}
        />
        <Route exact path="/searchluggage" element={<SearchLuggage />} />
      
        <Route
          exact
          path="/superadmin/notification/add"
          element={<AddNotification />}
        />
        <Route
          exact
          path="/superadmin/notification/all"
          element={<AllNotificationAdmin />}
        />
        <Route
          exact
          path="/superadmin/urlokerkey"
          element={<SuperAdminUrloker />}
        />
        <Route exact path="/partner/urlokerkeys" element={<PartnerUrloker />} />
        <Route exact path="/allluggage" element={<AllLuggage />} />
        <Route exact path="/luggage/:id" element={<LuggageDetails />} />

        {/* city routes */}
        <Route exact path="/luggage-storage-melbourne-cbd" element={<MelbourneCBD />} />
        <Route exact path="/luggage-storage-melbourne-airport" element={<AirportPage />} />
        <Route exact path="/flinders-street-station-luggage-storage" element={<FlindersPage />} />
      </Routes>

      <TawkTo />
    </>
  );
}

export default App;
