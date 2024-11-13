import React from "react";
import LuggageStorageLocations from "../SearchLugLocation/LuggageStorageLocations";
import HowItWorks from "../Home/Howitworks";
import Review from "../Home/Review";
import { FaMapLocationDot, FaCity } from "react-icons/fa6";
import {
  MdArrowRight,
  MdKeyboardArrowLeft,
  MdKeyboardArrowRight,
  MdSecurity,
} from "react-icons/md";
import { MdMedicalServices } from "react-icons/md";
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

function AttractionBox({ locationImage, me }) {
  return (
    <div className="font-sans bg-white pb-6">
      <div className="px-5 w-full max-w-screen-xl mx-auto">
        <h2 className="text-4xl font-medium md:text-5xl xl:text-5xl mb-10">
          Luggage storage near {me}
        </h2>
        {/* add image of location */}
        <img
          src={locationImage}
          alt="Location Image"
          width={1080}
          height={(1080 * 9) / 16}
          className="aspect-video object-contain mx-auto w-full"
        />
      </div>

      <LuggageStorageLocations />

      <HowItWorks />
      <Review />

      <CustomInfo />
    </div>
  );
}
const CustomInfo = () => {
  const navigate = useNavigate();
  const handleNearMyLocationClick = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const location = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          navigate("/luggage-locations", { state: { location, nearby: true } });
        },
        (error) => {
          console.error("Error fetching location:", error);

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
  const data = [
    {
      icon: <FaMapLocationDot color="#2aaf88" size={"5em"} />,
      title: "100+ locations in Australia",
      desc: "No matter where you are in Australia, you can find a luggage storage location near you.",
    },
    {
      icon: <FaCity color="#2aaf88" size={"5em"} />,
      title: "10+ cities in Australia",
      desc: "Store your bages wherever in Australia.",
    },
    {
      icon: <MdSecurity color="#2aaf88" size={"5em"} />,
      title: "$1,000+ protection",
      desc: "We provide $1,000+ protection for your luggage. You can store your luggage with peace of mind.",
    },
    {
      icon: <MdMedicalServices color="#2aaf88" size={"5em"} />,
      title: "24/7 customer support",
      desc: "Our customer support team is available 24/7 to help you with any questions or concerns you may have.",
    },
  ];
  return (
    <div className=" px-5 md:px-20 py-10 mx-auto max-w-screen-2xl bg-teal-100 rounded-md">
      <div className="flex flex-col lg:flex-row gap-10">
        <div>
          <h3 className="font-bold text-4xl">
            Secure and Hassle Free Luggage Storage
          </h3>
          <div className="hidden lg:block py-20">
            <button
              className="text-custom-teal-deep font-bold flex gap-1 items-center bg-white rounded-full px-3 py-2 group hover:bg-slate-50 transition-colors"
              type="button"
              onClick={handleNearMyLocationClick}
            >
              Book now{" "}
              <MdArrowRight className="transition-transform group-hover:translate-x-1 duration-500" />
            </button>
          </div>
        </div>

        <div className="hidden lg:grid grid-cols-2 gap-5 overflow-x-auto p-5">
          {data.map((d, i) => (
            <div key={i} className="space-y-5 max-w-md min-w-[12em]">
              <div className="relative w-fit h-fit p-3">
                {d.icon}
                <span className="absolute top-0 left-0 rounded-md w-full h-full bg-custom-teal/20 "></span>
              </div>
              <div>
                <h4 className="text-xl font-black">{d.title}</h4>
                <p className="text-sm">{d.desc}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="lg:hidden">
          <Swiper
            modules={[Autoplay]}
            spaceBetween={20}
            slidesPerView={"auto"}
            loop={false}
            speed={600}
          >
            {/* desktop view content */}
            {data.map((d, i) => (
              <SwiperSlide key={i} className="space-y-5 max-w-md min-w-[12em]">
                <div className="relative w-fit h-fit p-3">
                  {d.icon}
                  <span className="absolute top-0 left-0 rounded-md w-full h-full bg-custom-teal/20 "></span>
                </div>
                <div>
                  <h4 className="text-xl font-black">{d.title}</h4>
                  <p className="text-sm">{d.desc}</p>
                </div>
              </SwiperSlide>
            ))}
            <SwipeButton />
          </Swiper>
        </div>
      </div>
    </div>
  );
};
const CustomPrevArrow = (props) => {
  const { className, onClick } = props;
  return (
    <button
      aria-label="Previous"
      className={`${className || ""} custom-arrow custom-prev-arrow`}
      onClick={onClick}
    >
      <MdKeyboardArrowLeft size={"1.5em"} />
    </button>
  );
};

const CustomNextArrow = (props) => {
  const { className, onClick } = props;
  return (
    <button
      aria-label="Forward"
      className={`${className || ""} custom-arrow custom-next-arrow`}
      onClick={onClick}
    >
      <MdKeyboardArrowRight size={"1.5em"} />
    </button>
  );
};
const SwipeButton = () => {
  const swipe = useSwiper();
  const navigate = useNavigate();
  const handleNearMyLocationClick = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const location = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          navigate("/luggage-locations", { state: { location, nearby: true } });
        },
        (error) => {
          console.error("Error fetching location:", error);

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
    <div className="flex justify-between items-center mt-6">
      <button
        className="text-custom-teal-deep font-bold flex gap-1 items-center bg-white rounded-full px-3 py-2 group hover:bg-slate-50 transition-colors"
        type="button"
        onClick={handleNearMyLocationClick}
      >
        Book now{" "}
        <MdArrowRight className="transition-transform group-hover:translate-x-1 duration-500" />
      </button>
      <div className="flex gap-3 items-center justify-end">
        <CustomPrevArrow onClick={() => swipe.slidePrev()} />
        <CustomNextArrow onClick={() => swipe.slideNext()} />
      </div>
    </div>
  );
};
export default AttractionBox;
