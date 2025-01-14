import React, { useState } from "react";
import config from "../../config";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { MdPlayCircleFilled } from "react-icons/md";
import ReactPlayer from "react-player";
function HowItWorks() {
  const book = config.BUCKET_URL + "/files/img/home-two/book.jpg";
  const lock = config.BUCKET_URL + "/files/img/home-two/lock.jpg";
  const enjoy = config.BUCKET_URL + "/files/img/home-two/enjoy.jpg";
  const vidFile = config.BUCKET_URL + "/files/videos/urloker.mp4?v=01";
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
          navigate("/luggage-locations", { state: { location, nearby: true } });
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
        <h2 className="px-3 text-4xl font-bold text-teal-def mb-16">
          {t?.title}
        </h2>
        <div className="flex flex-col justify-center lg:justify-between items-center space-y-12">
          <div className="w-full px-4 grid grid-cols-1 lg:grid-cols-3 gap-y-16 lg:gap-x-12">
            {/* Book Step */}
            <div className="group relative bg-white p-10 rounded-xl shadow-lg hover:shadow-2xl ">
              <div className="flex flex-col items-center text-center">
                <div className="bg-gradient-to-r from-gray-500 to-green-500 rounded-full p-4 mb-4">
                  <img
                    width={90}
                    height={90}
                    src={book}
                    alt="Book Icon"
                    className="object-contain"
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
                    width={90}
                    height={90}
                    src={lock}
                    alt="Lock Icon"
                    className="object-contain"
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
                    width={90}
                    height={90}
                    src={enjoy}
                    alt="Enjoy Icon"
                    className="object-contain"
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
      <div className="relative w-full md:w-3/4 2xl:w-1/2 mx-auto my-20 h-full rounded-lg overflow-hidden group">
        <div className="w-full mx-auto rounded-lg p-10">
          <iframe
            src="https://www.youtube.com/embed/HyPdRR9cJRI?si=cZ7JQ7wrlKtZdJG5"
            width={600} 
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture; fullscreen"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
            className="w-full max-w-screen-md mx-auto aspect-video rounded-2xl shadow-xl shadow-slate-600/20"
          ></iframe>
        </div>
        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/50 transition duration-300 hidden"></div>
        <div className="absolute inset-0 hidden flex-col items-center justify-center gap-4 text-white">
          <button
            className="bg-transparent bg-custom-teal-deep hover:text-black px-4 py-2 rounded-full"
            type="button"
            onClick={openModal}
          >
            <MdPlayCircleFilled size={54} color="white" />
          </button>
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

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75 ">
          <div className="relative w-full max-w-4xl p-8 bg-white rounded-lg shadow-xl ring ring-custom-teal-deep">
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-2xl text-gray-700 hover:text-gray-900 transition-colors duration-300"
            >
              &times;
            </button>
            <div className="relative max-h-fit">
              <div className="relative w-full h-fit rounded-xl overflow-hidden">
                <video
                  className="w-full h-fit object-fill aspect-video rounded-2xl "
                  controls
                  autoPlay
                  controlsList="nodownload"
                >
                  <source src={vidFile} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default HowItWorks;
