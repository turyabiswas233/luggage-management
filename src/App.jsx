import React, { useEffect } from "react";
import "./css/style.css";

import TawkTo from "./TawkTo";
import { Outlet, useLocation } from "react-router-dom";

function App() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return (
    <>
      <TawkTo />
      <Outlet />
    </>
  );
}

export default App;
