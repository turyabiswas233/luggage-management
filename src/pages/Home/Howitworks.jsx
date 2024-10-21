import React, { useState } from "react";
import book from "/img/home-two/book.jpg";
import lock from "/img/home-two/lock.jpg";
import enjoy from "/img/home-two/enjoy.jpg"; 
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

function HowItWorks() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loadingLocation, setLoadingLocation] = useState(false);
  const navigate = useNavigate();
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  // Get the translations for the current language
  const { t: tl } = useTranslation();

  const t = tl("home")?.howItWorks;
  const { findLocationsButton } = tl("home")?.heroSection;
  const handleNearMyLocationClick = () => {
    if (navigator.geolocation) {
      setLoadingLocation(true);
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const location = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          navigate("/luggage_locations", { state: { location, nearby: true } });
          setLoadingLocation(false);
        },
        (error) => {
          console.error("Error fetching location:", error);
          setLoadingLocation(false);
          if (navigator.permissions) {
            navigator.permissions
              .query({ name: "geolocation" })
              .then(function (result) {
                if (result.state === "denied") {
                  alert("Please enable location services to use this feature");
                }
              });
          }
        }
      );
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  };
  return (
    <section className="bg-gradient-to-b from-gray-50 to-gray-100 px-3 py-10 md:p-14">
      <div className="mx-auto">
        <h2 className="px-3 text-4xl font-bold text-[#4A686A] mb-16">
          {t?.title}
        </h2>
        <div className="flex flex-col justify-center lg:justify-between items-center space-y-12">
          <div className="w-full px-4 grid grid-cols-1 lg:grid-cols-3 gap-y-16 lg:gap-x-12">
            {/* Book Step */}
            <div className="group relative bg-white p-10 rounded-xl shadow-lg hover:shadow-2xl ">
              <div className="flex flex-col items-center text-center">
                <div className="bg-gradient-to-r from-gray-500 to-green-500 rounded-full p-4 mb-4">
                  <img
                    src={book}
                    alt="Book Icon"
                    className="h-20 w-20 object-contain"
                  />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4 group-hover:text-blue-600 transition-colors duration-300">
                  {t?.steps?.book?.title}
                </h3>
                <p className="text-gray-600">{t?.steps?.book?.description}</p>
              </div>
            </div>
            {/* Lock Step */}
            <div className="group relative bg-white p-10 rounded-xl shadow-lg hover:shadow-2xl ">
              <div className="flex flex-col items-center text-center">
                <div className="bg-gradient-to-r from-gray-500 to-green-400 rounded-full p-4 mb-4">
                  <img
                    src={lock}
                    alt="Lock Icon"
                    className="h-20 w-20 object-contain"
                  />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4 group-hover:text-blue-600 transition-colors duration-300">
                  {t?.steps?.lock?.title}
                </h3>
                <p className="text-gray-600">{t?.steps?.lock?.description}</p>
              </div>
            </div>
            {/* Enjoy Step */}
            <div className="group relative bg-white p-10 rounded-xl shadow-lg hover:shadow-2xl ">
              <div className="flex flex-col items-center text-center">
                <div className="bg-gradient-to-r from-gray-500 to-green-500 rounded-full p-4 mb-4">
                  <img
                    src={enjoy}
                    alt="Enjoy Icon"
                    className="h-20 w-20 object-contain"
                  />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4 group-hover:text-blue-600 transition-colors duration-300">
                  {t?.steps?.enjoy?.title}
                </h3>
                <p className="text-gray-600">{t?.steps?.enjoy?.description}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <button
        type="button"
        onClick={handleNearMyLocationClick}
        className={`bg-custom-teal hover:bg-custom-teal-deep text-white text-xl font-bold rounded-full shadow-md transition duration-100 ease-in-out -translate-x-1/2 relative left-1/2 mt-10 px-8 py-3 w-fit ${
          loadingLocation ? "opacity-50 cursor-not-allowed" : ""
        }`}
        disabled={loadingLocation}
      >
        {findLocationsButton}
      </button>

      {false && isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75">
          <div className="relative w-full max-w-4xl p-8 bg-white rounded-lg shadow-lg">
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-2xl text-gray-700 hover:text-gray-900 transition-colors duration-300"
            >
              &times;
            </button>
            <div
              className="relative"
              style={{ paddingBottom: "56.25%", height: 0 }}
            >
              <iframe
                src="https://www.youtube.com/embed/video_id"
                title={t.video.title}
                className="absolute top-0 left-0 w-full h-full rounded-lg"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default HowItWorks;
