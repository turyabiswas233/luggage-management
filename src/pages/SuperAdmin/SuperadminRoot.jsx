import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";

function SuperadminRoot() {
  const token = localStorage.getItem("token");
  const loginTime = localStorage.getItem("loginTime");
  useEffect(() => {
    if (!token || !loginTime) {
      let param = window.location.pathname.split("/")[2];
      if (param === "login") return;
      alert("You are not authorized to access this page");
      window.location.href = "/";
    }
  }, []);
  return (
    <div>
      <Outlet />
    </div>
  );
}

export default SuperadminRoot;
