import React, { useState, useRef, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import Transition from "../utils/Transition";
import axios from "axios";
import { MdArrowRightAlt } from "react-icons/md";
import config from "../config";
function DropdownNotifications({ align, hasNewNoti }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const [list, setList] = useState([]);

  const trigger = useRef(null);
  const dropdown = useRef(null);

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }) => {
      if (!dropdown.current) return;
      if (
        !dropdownOpen ||
        dropdown.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setDropdownOpen(false);
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }) => {
      if (!dropdownOpen || keyCode !== 27) return;
      setDropdownOpen(false);
    };
    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  });

  const fetchNoti = async (p) => {
    const token = localStorage.getItem("token");

    const url = config.API_BASE_URL;
    const response = await axios.get(
      `${url}/api/v1/notifications/partner?page=${p}&limit=7`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (response.status == 200) {
      console.log("getAll");
    }
    setList(response.data?.notifications);
  };
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/logout");
      return;
    }
    fetchNoti(1);
  }, []);

  return (
    <div className="relative inline-flex">
      <button
        ref={trigger}
        className={`w-8 h-8 flex items-center justify-center bg-slate-100 hover:bg-slate-200 dark:bg-slate-700 dark:hover:bg-slate-600/80 rounded-full ${
          dropdownOpen && "bg-slate-200"
        }`}
        aria-haspopup="true"
        onClick={() => setDropdownOpen(!dropdownOpen)}
        aria-expanded={dropdownOpen}
      >
        <span className="sr-only">Notifications</span>
        <svg
          className="w-4 h-4"
          viewBox="0 0 16 16"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            className="fill-current text-slate-500 dark:text-slate-400"
            d="M6.5 0C2.91 0 0 2.462 0 5.5c0 1.075.37 2.074 1 2.922V12l2.699-1.542A7.454 7.454 0 006.5 11c3.59 0 6.5-2.462 6.5-5.5S10.09 0 6.5 0z"
          />
          <path
            className="fill-current text-slate-400 dark:text-slate-500"
            d="M16 9.5c0-.987-.429-1.897-1.147-2.639C14.124 10.348 10.66 13 6.5 13c-.103 0-.202-.018-.305-.021C7.231 13.617 8.556 14 10 14c.449 0 .886-.04 1.307-.11L15 16v-4h-.012C15.627 11.285 16 10.425 16 9.5z"
          />
        </svg>
        <div className="absolute top-0 right-0 w-2.5 h-2.5 bg-rose-500 border-2 border-white dark:border-[#182235] rounded-full"></div>
      </button>

      <Transition
        className={`origin-top-right z-10 absolute top-full min-w-80 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 py-1.5 rounded shadow-lg overflow-hidden mt-1 right-0`}
        show={dropdownOpen}
        enter="transition ease-out duration-200 transform"
        enterStart="opacity-0 -translate-y-2"
        enterEnd="opacity-100 translate-y-0"
        leave="transition ease-out duration-200"
        leaveStart="opacity-100"
        leaveEnd="opacity-0"
      >
        <div
          ref={dropdown}
          onFocus={() => setDropdownOpen(true)}
          onBlur={() => setDropdownOpen(false)}
        >
          <div className="text-xs font-semibold text-slate-400 uppercase pt-1.5 pb-2 px-4">
            Notifications
          </div>
          <ul>
            {list.map((nt, nid) => {
              const seenId = localStorage.getItem(nt?._id);

              return (
                <li
                  key={nid}
                  className="border-b border-slate-200 dark:border-slate-700 last:border-0"
                  onClick={() => {
                    localStorage.setItem(nt?._id, "seen");
                    navigate("/partner/notification", {
                      state: {
                        ntId: nt?._id,
                      },
                    });
                  }}
                >
                  <Link
                    className={`block py-2 px-4 hover:bg-slate-200/70 transition-colors  ${
                      seenId === "seen" && "opacity-50"
                    }`}
                    to="#0"
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                  >
                    <span className="block text-xs font-medium text-slate-400 dark:text-slate-500 text-start">
                      {new Date(nt?.activationDate)?.toDateString()}
                    </span>
                    <p className="block text-sm mb-2 text-left">
                      📣{" "}
                      <span className="font-medium text-slate-800 dark:text-slate-100">
                        {nt?.title}
                      </span>
                    </p>
                  </Link>
                </li>
              );
            })}
          </ul>
          <NavLink
            to={"/partner/notification"}
            className={
              "text-sm flex items-center justify-center text-teal-600 bg-teal-50 hover:bg-teal-100/80"
            }
          >
            See All Notification <MdArrowRightAlt />{" "}
          </NavLink>
        </div>
      </Transition>
    </div>
  );
}

export default DropdownNotifications;
