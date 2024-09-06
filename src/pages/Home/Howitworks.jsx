import React, { useState } from "react";
import book from "/img/home-two/book.jpg";
import lock from "/img/home-two/lock.jpg";
import enjoy from "/img/home-two/enjoy.jpg";
import guideline from "/img/home-two/luggage-1.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faPlay } from "@fortawesome/free-solid-svg-icons";
import { useTranslation } from "react-i18next";

function HowItWorks() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  // Get the translations for the current language
  const { t: tl } = useTranslation();

  const t = tl("home")?.howItWorks;

  return (
    <section className="bg-gradient-to-b from-gray-50 to-gray-100 py-24">
      <div className="container mx-auto">
        <h2 className="text-4xl font-bold text-center text-[#4A686A] mb-16">
          {t?.title}
        </h2>
        <div className="flex flex-wrap justify-center lg:justify-between items-center space-y-12 lg:space-y-0">
          <div className="w-full lg:w-7/12 px-4 grid grid-cols-1 lg:grid-cols-3 gap-y-16 lg:gap-x-12">
            {/* Book Step */}
            <div className="group relative bg-white p-10 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 transform hover:scale-105">
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
              <div className="absolute bottom-1/2 right-0 transform translate-y-1/2 translate-x-1/2">
                <FontAwesomeIcon
                  icon={faArrowRight}
                  className="text-4xl text-blue-500 animate-pulse ps-5"
                />
              </div>
            </div>
            {/* Lock Step */}
            <div className="group relative bg-white p-10 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 transform hover:scale-105">
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
              <div className="absolute bottom-1/2 right-0 transform translate-y-1/2 translate-x-1/2">
                <FontAwesomeIcon
                  icon={faArrowRight}
                  className="text-4xl text-blue-500 animate-pulse ps-5"
                />
              </div>
            </div>
            {/* Enjoy Step */}
            <div className="group relative bg-white p-10 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 transform hover:scale-105">
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
          {/* Video Section */}
          <div className="w-full lg:w-5/12 px-4 mt-12 lg:mt-0">
            <div className="relative w-full h-96 rounded-xl shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300 group">
              <img
                src={guideline}
                alt={t?.video?.altText}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 group-hover:bg-opacity-60 transition-all duration-300">
                <button
                  onClick={openModal}
                  className="bg-green-600 hover:bg-green-700 p-6 rounded-full text-white transition-colors duration-300"
                >
                  <FontAwesomeIcon icon={faPlay} className="text-4xl" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {isModalOpen && (
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
