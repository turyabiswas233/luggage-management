import React, { useCallback, useRef, useState } from "react";
import { Helmet } from "react-helmet-async";
import config from "../../config";
const cbd = config.BUCKET_URL + "/files/city/melbourne/cbd.jpeg";
// import cbd from "/files/city/melbourne/cbd.jpeg";

const locImage = config.BUCKET_URL + "/files/city/cbd/locationMap.png";
import { useTranslation } from "react-i18next";
import { faMinusCircle, faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AttractionBox from "./AttractionBox";
import { Autocomplete, useJsApiLoader } from "@react-google-maps/api";
import { useNavigate } from "react-router-dom";

const libraries = ["places"];
const GOOGLE_MAPS_API_KEY = config.GOOGLE_API_KEY;

function Melbourne() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const translate = t("home");
  const [autocomplete, setAutocomplete] = useState(null);
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [loadingLocation, setLoadingLocation] = useState(false);
  const locationInputRef = useRef(null);
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: GOOGLE_MAPS_API_KEY,
    libraries,
  });

  const onLoad = useCallback((autocompleteInstance) => {
    setAutocomplete(autocompleteInstance);
  }, []);
  const onPlaceChanged = () => {
    if (autocomplete !== null) {
      const place = autocomplete.getPlace();
      if (place.geometry) {
        setSelectedPlace(place);
        if (place && place.geometry) {
          const location = {
            lat: place.geometry.location.lat(),
            lng: place.geometry.location.lng(),
          };
          navigate("/luggage-locations", {
            state: { location, inputLocation: locationInputRef.current.value },
          });
        } else {
          console.log("Please select a valid place");
        }
      } else {
        console.log("No geometry available for the selected place");
      }
    } else {
      console.log("Autocomplete is not loaded yet!");
    }
  };

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
  const data = [
    {
      question:
        "In which areas of the City of Melbourne can users find Urloker's luggage storage?",
      answer:
        "Urloker has seUrloker'sategic designations for luggage storage in the heart of Melbourne. Our locations are close to Central Bangkok and significant attractions, transport hubs such as Flinders Street Station and Melbourne Central Station and famous spots such as Federation Square and Queen Victoria Market.",
    },
    {
      question:
        "What's the price policy for Urloker's luggage storage Melbourne CBD ?",
      answer:
        "What'sffer affordabUrloker'sear pricing with flexible terms. Rates start at a low hourly rate, and even if you plan on renting for the whole day, there is a daily maximum. There are no extra fees, and one can choose the option that best fits one's time.",
    },
    {
      question:
        "Is it secure to leave my belongings with one's socketwitone'soker?",
      answer:
        "Of course. What is most important to us is that your belongings are well safeguarded. Our sites have CCTV monitoring and electronic access controls to enhance the protection of the premises at all times. Also, our all-risk insurance policy further ensures that all items being kept for storage are safe.",
    },
    {
      question: "What items are acceptable to put into Urloker?",
      answer:
        "We support keeping various items, ranging from towels, shoes, smaller backpacks, and handbags to giant bags like large suitcases and other bulky things such as sports equipment. If you have a concern, you can always reach out to our customer support for help.",
    },
    {
      question: "How do I reserve my luggage with Urloker?",
      answer:
        "The reservation process takes seconds and is straightforward. Go to your desired location in the Melbourne CBD, select the most appropriate locker size, and make the reservation. You will receive a confirmation that communicates everything that you require.",
    },
    {
      question: "How long is your business open?",
      answer:
        "In general, all our sites in Melbourne CBD are open daily, and most of them have longer business hours to accommodate the needs of different travellers. Since these hours typically vary by location, we recommend checking the details for the location you selected while booking.",
    },
    {
      question:
        "When I make a reservation, what if I cannot stay within the time indicated in my reservation?",
      answer:
        "Yes, we understand that sometimes the best plans… don't go as planned. You can modify the time in which don't belongings will be kept by simply making changes to your reservation or by contacting us.",
    },
    {
      question:
        "Is an identification certificate required while dropping off or picking up my cargo?",
      answer:
        "For security reasons, we ask for valid identification when you drop off your belongings. This ensures that all items are accounted for and received by the appropriate people.",
    },
  ];
  const { searchPlaceholder, findLocationsButton } = translate?.heroSection;

  const schemaCode = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Luggage Storage Melbourne - Urloker",
    image:
      "https://s3.ap-southeast-2.amazonaws.com/s3.urlocker.io/public/files/city/cbd/cbd.jpeg",
    "@id":
      "https://urloker.com/luggage-storage-melbourne/#LuggageStorageMelbourne",
    url: "https://urloker.com/luggage-storage-melbourne",
    telephone: "+61 3 7035 5653",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Melbourne",
      addressRegion: "VIC",
      addressCountry: "AU",
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday",
        ],
        opens: "00:00",
        closes: "23:59",
      },
    ],
    sameAs: [
      "https://www.facebook.com/profile.php?id=61564185476772",
      "https://www.youtube.com/@urloker",
    ],
  };
  return (
    <div>
      {/*  SEO Header */}
      <Helmet>
        <title>Luggage Storage Melbourne - Urloker</title>
        <meta
          property="og:title"
          content="Luggage Storage Melbourne - Urloker"
        />
        <meta
          name="description"
          content="Need a secure luggage storage in Melbourne? Urloker offers Safe, easy and affordable luggage storage solutions - enjoy the city hands-free."
        />
        <meta name="keywords" content="luggage-storage-melbourne-cbd" />
        <meta
          property="og:url"
          content="https://urloker.com/luggage-storage-melbourne"
        />
        <meta
          property="og:description"
          content="Need a secure luggage storage in Melbourne? Urloker offers Safe, easy and affordable luggage storage solutions - enjoy the city hands-free."
        />
        <link
          rel="canonical"
          href="https://urloker.com/luggage-storage-melbourne"
        />

        <script type="application/ld+json">
          {JSON.stringify(schemaCode, null, 2)}
        </script>
      </Helmet>
      <div className="content font-sans mx-auto w-full">
        <header className="py-10 px-5 text-black/80 bg-white">
          <div className="my-10 flex gap-10 flex-col lg:flex-row w-full max-w-screen-xl mx-auto">
            <div className="space-y-6">
              <p className="text-sm">
                Your Trusted Luggage Storage Partner in Australia
              </p>
              <img
                src={cbd}
                width={800}
                height={(800 * 9) / 16}
                className="aspect-video object-cover rounded-2xl w-full lg:hidden flex-1"
                alt="Luggage Storage Melbourne CBD"
                loading="lazy"
              />
              <h1 className="text-4xl md:text-6xl font-bold my-4 text-green-800">
                Luggage Storage Melbourne
              </h1>
              <p>Freedom in every journey with Urloker</p>
              <div className="flex flex-col sm:flex-row justify-center items-center relative">
                {isLoaded && (
                  <Autocomplete
                    onLoad={onLoad}
                    onPlaceChanged={onPlaceChanged}
                    className="flex items-center h-fit w-full"
                  >
                    <input
                      type="text"
                      id="location"
                      className="bg-white text-black placeholder:text-gray-700 rounded-full p-3 w-full h-fit"
                      placeholder={searchPlaceholder}
                      ref={locationInputRef}
                      defaultValue={"Melbourne VIC, Australia"}
                    />
                  </Autocomplete>
                )}
              </div>
              <button
                type="button"
                onClick={handleNearMyLocationClick}
                className={`bg-custom-teal hover:bg-custom-teal-deep text-white font-bold text-lg rounded-full shadow-md transition duration-300 ease-in-out mt-4 px-12 py-4 w-full md:w-fit ${
                  loadingLocation ? "opacity-50 cursor-not-allowed" : ""
                }`}
                disabled={loadingLocation}
              >
                {findLocationsButton}
              </button>
            </div>
            <img
              src={cbd}
              width={1280}
              height={720}
              className="aspect-video rounded-2xl max-w-2xl w-full hidden lg:block flex-1"
              alt="Luggage Storage Melbourne CBD"
            />
          </div>
        </header>
        <AttractionBox locationImage={locImage} me={"Melbourne"} />
      </div>
    </div>
  );
}
const FaqCard = ({ t }) => {
  const [openFAQ, setOpenFAQ] = useState(-1);

  const toggleFAQ = (index) => {
    setOpenFAQ((p) => (p == index ? -1 : index));
  };
  return (
    <div className="p-5 container mx-auto xl:px-52">
      <h3 className="text-center font-bold text-2xl my-5">FAQs</h3>
      <div className="space-y-5 divide-y-3 divide-slate-800">
        {t.map((faq, index) => (
          <div
            key={index}
            className={`p-2 md:p-4 min-h-fit transition-all ease-out duration-1000 h-full ${
              openFAQ == index ? "max-h-52 overflow-y-auto" : "max-h-20"
            }`}
          >
            <h3
              className="text-xl font-bold text-gray-700 cursor-pointer flex items-center justify-between"
              onClick={() => toggleFAQ(index)}
            >
              {faq.question}
              {openFAQ == index ? (
                <FontAwesomeIcon icon={faMinusCircle} />
              ) : (
                <FontAwesomeIcon icon={faPlusCircle} />
              )}
            </h3>
            {openFAQ == index && (
              <div
                className="text-gray-600 mt-2 overflow-x-hidden break-words text-justify px-4 font-medium"
                dangerouslySetInnerHTML={{
                  __html: faq.answer,
                }}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Melbourne;
