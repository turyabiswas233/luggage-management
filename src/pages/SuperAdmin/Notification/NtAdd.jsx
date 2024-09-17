import React, { useEffect, useState } from "react";
import WelcomeBanner from "../../../partials/dashboard/WelcomeBanner";
import SuperAdminSidebar from "../../../partials/SuperAdminSidebar";
import SuperAdminHeader from "../../../partials/SuperAdminHeader";
import { useNavigate } from "react-router-dom";
import TextFormatter from "./TextFormatter";
import { IoCheckmark, IoClose } from "react-icons/io5";
import axios from "axios";
import config from "../../../config";
const today = new Date();
function AddNotification() {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [title, setTitle] = useState("");
  const [notificationText, setNotificationText] = useState("");
  const [notificationDate, setNotificationDate] = useState(today.toISOString());

  const [submitMessage, setSubmitMessage] = useState("");
  const [error, setError] = useState("");

  // handle submit
  const handleSubmit = async (event) => {
    event.preventDefault();
    // Handle notification creation here, e.g., send to a server
    if (title.length == 0) {
      setError("Title cannot be empty");
      return;
    }
    if (notificationText.length == 0) {
      setError("Text field cannot be empty");
      return;
    }
    setError("");

    try {
      const url = config.API_BASE_URL;
      const token = localStorage.getItem("token");

      const response = await axios.post(
        `${url}/api/v1/notifications/create`,
        {
          title: title,
          message: notificationText,
          activationDate: new Date(
            new Date(notificationDate + ":00").toISOString()
          ),
          isActive: true,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status == 201) {
        setSubmitMessage("Notification Has Been Created");
        console.log("SUccess");
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      } else {
        setError("Failed to create a notice");
      }
    } catch (err) {
      console.log("error", err);
      setError("Failed to create a notice");
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/logout");
      return;
    }
  }, []);

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <SuperAdminSidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden bg-gray-100">
        {/* Site header */}
        <SuperAdminHeader
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />

        <main>
          <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
            {/* Welcome banner */}
            <WelcomeBanner />
          </div>

          {/* notification-component  */}
          <div className="p-3 w-full max-w-screen-xl mx-auto">
            <form
              className="bg-white text-black rounded-md shadow-md shadow-slate-500/30 p-10"
              onSubmit={handleSubmit}
            >
              <div className="flex flex-col space-y-4">
                <section className="grid gap-2">
                  <label className="text-gray-700">Notification Title:</label>
                  <input
                    className="p-2 m-2 rounded-md"
                    type="text"
                    name="title"
                    id="title"
                    placeholder="Add a title"
                    value={title}
                    onChange={(e) => {
                      setTitle(e.target.value);
                    }}
                  />
                </section>

                <section>
                  <label className="text-gray-700">Notification Message:</label>
                  <TextFormatter
                    placeholder="Enter notification text"
                    value={notificationText}
                    setValue={setNotificationText}
                  />
                </section>

                <div className="grid grid-cols-1 gap-2">
                  <div>
                    <label className="text-gray-700">Activation Time:</label>
                    <input
                      type="datetime-local"
                      className="border rounded px-4 py-2 w-full"
                      required
                      pattern="DD/MM/YYYY hh:mm A"
                      onChange={(e) => setNotificationDate(e.target.value)}
                    />
                  </div>
                </div>
                {error && (
                  <p className="p-2 text-sm font-medium flex items-center gap-2 text-red-600 bg-red-50 rounded-sm ring-2 ring-red-500 mb-3">
                    <IoClose />
                    <span>{error}</span>
                  </p>
                )}
                {submitMessage && (
                  <p className="p-2 text-sm font-medium flex items-center gap-2 text-green-600 bg-green-50 rounded-sm ring-2 ring-green-500 mb-3">
                    <IoCheckmark />
                    <span>{submitMessage}</span>
                  </p>
                )}
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:pointer-events-none"
                  disabled={submitMessage.length > 0}
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
}

export default AddNotification;
