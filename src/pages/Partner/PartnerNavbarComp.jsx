import React, { useState, useEffect } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import logo from "../../assets/img/home-two/logo3.svg";
import { HiMiniBellAlert } from "react-icons/hi2";
import Notifications from "../../components/DropdownNotifications";

const PartnerNavbarComp = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();
  const [toggleNoti, setNotiActive] = useState(false);

  const handleToggleNoti = () => setNotiActive((p) => !p);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("loginTime");
    navigate("/logout");
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleDropdownToggle = (dropdown) => {
    if (activeDropdown === dropdown) {
      setActiveDropdown(null);
    } else {
      setActiveDropdown(dropdown);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    const loginTime = localStorage.getItem("loginTime");
    if (token) {
      setIsAuthenticated(true);
      const currentTime = new Date().getTime();
      const timeDiff = currentTime - parseInt(loginTime, 10);
      const timeLimit = 50 * 60 * 1000; // 50 minutes in milliseconds

      if (timeDiff > timeLimit) {
        logout();
      } else {
        const timer = setTimeout(() => {
          logout();
        }, timeLimit - timeDiff);
        return () => clearTimeout(timer);
      }
    } else {
      navigate("/");
    }
  }, [navigate]);

  useEffect(() => {
    if (!isHovering && activeDropdown) {
      const timer = setTimeout(() => {
        setActiveDropdown(null);
      }, 500); // Adjust the delay time as needed
      return () => clearTimeout(timer);
    }
  }, [isHovering, activeDropdown]);

  return (
    <div className="fixed top-0 w-full bg-white shadow-md z-50">
      <div className="container mx-auto flex justify-between items-center py-4 px-6">
        <a href="/partner/home" className="flex items-center no-underline">
          <img src={logo} alt="logo1" className="h-16 w-40" />
        </a>

        <nav
          className={`flex-col absolute bg-white rounded-md px-2 py-3 origin-top-right top-full right-10 translate-y-5 md:translate-y-0 md:static md:flex md:flex-row md:space-x-4 text-[#1a73a7] ${
            isMenuOpen ? "flex" : "hidden"
          }`}
        >
          <div className="md:flex md:flex-row md:space-x-4">
            <a href="/partner/home" className="hover:text-[#FDB139] no-underline">
              Home
            </a>
          </div>
          {isAuthenticated && (
            <div className="md:flex md:flex-row md:space-x-4">
              <div
                className="relative group"
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
              >
                <button
                  onClick={() => handleDropdownToggle("partnerOptions")}
                  className="hover:text-[#FDB139] flex items-center focus:outline-none"
                >
                  Partner Menu{" "}
                  <svg
                    className="ml-1 w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 9l-7 7-7-7"
                    ></path>
                  </svg>
                </button>
                <div
                  className={`absolute bg-teal-100 text-white shadow-lg mt-1 rounded-md overflow-hidden ${
                    activeDropdown === "partnerOptions" ? "block" : "hidden"
                  } md:group-hover:block w-48`}
                >
                  <NavLink
                    to="/partner/bookings"
                    className="block px-4 py-2 text-custom-teal-deep no-underline  hover:bg-blue-200"
                  >
                    Partner Bookings
                  </NavLink>
                  <NavLink
                    to="/partner/urlokerkeys"
                    className="block px-4 py-2 text-custom-teal-deep no-underline  hover:bg-blue-200"
                  >
                    Partner Urloker Keys
                  </NavLink>
                  <NavLink
                    to="/partner/locations"
                    className="block px-4 py-2 text-custom-teal-deep no-underline  hover:bg-blue-200"
                  >
                    Partner's Location
                  </NavLink>
                  <NavLink
                    to="/partner/analytics"
                    className="block px-4 py-2 text-custom-teal-deep no-underline  hover:bg-blue-200"
                  >
                    Partner's Analytics
                  </NavLink>

                  <NavLink
                    to="/partner/profile"
                    className="block px-4 py-2 text-custom-teal-deep no-underline  hover:bg-blue-200"
                  >
                    Partner Profile
                  </NavLink>
                </div>
              </div>
              <a href="/logout" className="hover:text-[#FDB139] no-underline">
                Logout
              </a>
            </div>
          )}
        </nav>
        <div className="flex gap-2">
          <div onClick={handleToggleNoti} type="button">
            <Notifications align={"right"} />
          </div>
          <button
            onClick={toggleMenu}
            className="text-[#1a73a7] focus:outline-none md:hidden"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              ></path>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default PartnerNavbarComp;
