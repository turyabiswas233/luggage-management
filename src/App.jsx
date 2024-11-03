import React, { useEffect } from "react";
import "./css/style.css";

import TawkTo from "./TawkTo";
import { Outlet, useLocation } from "react-router-dom";
import Schema from "./Schema";
import Footer from "./pages/Home/Footer";

function App() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return (
    <>
      <TawkTo />
      <Outlet />
      <Schema />
      <Footer />
    </>
  );
}

export default App;
