import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import config from "../../config";
import "react-slideshow-image/dist/styles.css";
// Import images
const avalonAirport =
  config.BUCKET_URL + "/files/img/location_common/Avalon Airport.webp";
const melbourneCBD =
  config.BUCKET_URL + "/files/img/location_common/Melbourne CBD.webp";
const melbourneAirport =
  config.BUCKET_URL + "/files/img/location_common/Melbourne Airport.webp";
const southbank =
  config.BUCKET_URL + "/files/img/location_common/Southbank.jpg";
const southernCrossStation =
  config.BUCKET_URL + "/files/img/location_common/Southern Cross Station.jpg";
const melbourneCentralStation =
  config.BUCKET_URL +
  "/files/img/location_common/Melbourne Central Station.webp";
const flindersStreetStation =
  config.BUCKET_URL + "/files/img/location_common/Flinders Street Station.webp";
const parliamentStation =
  config.BUCKET_URL + "/files/img/location_common/Parliament Station.jpg";
const flagstaffStation =
  config.BUCKET_URL + "/files/img/location_common/Flagstaff Station.webp";
const swanstonStreet =
  config.BUCKET_URL + "/files/img/location_common/Swanston Street.jpg";
const spencerStreet =
  config.BUCKET_URL + "/files/img/location_common/Spencer Street.jpg";
const melbourneConventionCentre =
  config.BUCKET_URL +
  "/files/img/location_common/Melbourne Convention Centre.webp";
const queenVictoriaMarket =
  config.BUCKET_URL + "/files/img/location_common/Queen Victoria Market.jpg";
const crownCasinoMelbourne =
  config.BUCKET_URL + "/files/img/location_common/Crown Casino Melbourne.webp";
const chinaTownMelbourne =
  config.BUCKET_URL + "/files/img/location_common/Chinatown Melbourne.webp";
const melbourneCricketGround =
  config.BUCKET_URL +
  "/files/img/location_common/Melbourne Cricket Ground (MCG).jpg";
const marvelStadium =
  config.BUCKET_URL + "/files/img/location_common/Marvel Stadium.webp";
const newQuay = config.BUCKET_URL + "/files/img/location_common/New Quay.jpg";
const stKildaPier =
  config.BUCKET_URL + "/files/img/location_common/St Kilda Pier.jpg";
const docklands =
  config.BUCKET_URL + "/files/img/location_common/Docklands.webp";
const portMelbourne =
  config.BUCKET_URL + "/files/img/location_common/Port Melbourne.jpg";
const albertPark =
  config.BUCKET_URL + "/files/img/location_common/Albert Park.webp";
const dfoMelbourne =
  config.BUCKET_URL + "/files/img/location_common/DFO Melbourne.webp";
const chadstone =
  config.BUCKET_URL + "/files/img/location_common/Chadstone.webp";
import { useTranslation } from "react-i18next";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import { Autoplay } from "swiper/modules";
import axios from "axios";

const locations = [
  { name: "Melbourne Airport", image: melbourneAirport },
  { name: "Avalon Airport", image: avalonAirport },
  { name: "Melbourne CBD", image: melbourneCBD },
  { name: "Southbank", image: southbank },
  { name: "Southern Cross Station", image: southernCrossStation },
  { name: "Melbourne Central Station", image: melbourneCentralStation },
  { name: "Flinders Street Station", image: flindersStreetStation },
  { name: "Parliament Station", image: parliamentStation },
  { name: "Flagstaff Station", image: flagstaffStation },
  { name: "Swanston Street", image: swanstonStreet },
  { name: "Spencer Street", image: spencerStreet },
  { name: "Melbourne Convention Centre", image: melbourneConventionCentre },
  { name: "Queen Victoria Market", image: queenVictoriaMarket },
  { name: "Crown Casino Melbourne", image: crownCasinoMelbourne },
  { name: "China Town Melbourne", image: chinaTownMelbourne },
  { name: "Melbourne Cricket Ground (MCG)", image: melbourneCricketGround },
  { name: "Marvel Stadium", image: marvelStadium },
  { name: "New Quay", image: newQuay },
  { name: "St Kilda Pier", image: stKildaPier },
  { name: "Docklands", image: docklands },
  { name: "Port Melbourne", image: portMelbourne },
  { name: "Albert Park", image: albertPark },
  { name: "DFO Melbourne", image: dfoMelbourne },
  { name: "Chadstone", image: chadstone },
];
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
const LuggageStorageLocations = ({ cityType }) => {
  const navigate = useNavigate();
  // Get translations for the current language
  const { t: tl } = useTranslation();
  const t = tl("home")?.luggageStorageLocations;
  const [allLoc, setLocations] = useState(locations);
  // const t = translations[currentLanguage]?.luggageStorageLocations;

  const handleSearchLocation = (locationName) => {
    const geocoder = new window.google.maps.Geocoder();
    geocoder.geocode({ address: locationName }, (results, status) => {
      if (status === "OK" && results[0].geometry) {
        const location = {
          lat: results[0].geometry.location.lat(),
          lng: results[0].geometry.location.lng(),
        };
        navigate("/luggage-locations", {
          state: { location, inputLocation: locationName },
        });
      } else {
        console.log(
          "Geocode was not successful for the following reason: " + status
        );
      }
    });
  };

  const getLocations = async () => {
    try {
      if (cityType !== "") {
        const url =
          config.API_BASE_URL + `/api/v1/featured/search?city=${cityType}`;
        if (cityType === "Melbourne") setLocations(locations);
        else {
          const res = await axios.get(url);
          setLocations([
            ...res.data?.data?.map((e) => ({
              name: e?.address,
              image: e?.images[0]?.url,
              alt: e?.images[0]?.alt || "Luggage Storage",
            })),
          ]);
        }
      } else {
        const url = config.API_BASE_URL + `/api/v1/featured/search?city=Melbourne`;
        const res = await axios.get(url);
        const combinedLocations = [
          ...locations,
          ...res.data?.data?.map((e) => ({
            name: e?.address,
            image: e?.images[0]?.url,
            alt: e?.images[0]?.alt || "Luggage Storage",
          })),
        ];
        setLocations(combinedLocations.sort(() => Math.random() - 0.5)); // this will shuffle the array by sorting them randomly
      }
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    getLocations();
  }, []);

  return (
    <div className="bg-gradient-to-t from-white via-white to-custom-teal-deep/20 py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-extrabold text-center mb-12 text-[#4A686A]">
          {t?.title}
        </h2>
        <Swiper
          modules={[Autoplay]}
          spaceBetween={10}
          slidesPerView={"auto"}
          loop={true}
          speed={1000}
          autoplay={{
            delay: 2000,
            pauseOnMouseEnter: true,
          }}
          className="relative flex gap-5"
        >
          {allLoc.map((location, index) => (
            <SwiperSlide
              key={index}
              className="grid gap-2 min-h-fit max-w-md bg-white shadow-md rounded-xl overflow-hidden md:mx-auto p-2 mb-20"
            >
              <img
                className="aspect-video w-full object-cover rounded-xl pointer-events-none"
                src={location.image}
                alt={location.name || "image file"}
                width={300}
                height={280}
                loading="lazy"
              />
              <div className="pt-3 text-lg">
                <h3 className="font-semibold mb-4 text-gray-800">
                  {location.name}
                </h3>
                <button
                  onClick={() => handleSearchLocation(location.name)}
                  className="bg-[#2a9b84] text-white px-4 py-2 rounded-full hover:bg-[#2a8b74] transition-colors duration-300"
                >
                  {t?.searchButton}
                </button>
              </div>
            </SwiperSlide>
          ))}
          <SwipeButton />
        </Swiper>
      </div>
    </div>
  );
};
const SwipeButton = () => {
  const swipe = useSwiper();
  return (
    <div className="absolute right-0 bottom-0 flex gap-3 items-center justify-end">
      <CustomPrevArrow onClick={() => swipe.slidePrev()} />
      <CustomNextArrow onClick={() => swipe.slideNext()} />
    </div>
  );
};
export default LuggageStorageLocations;
