import React, { useState, useRef, useCallback } from "react";
import { Helmet } from "react-helmet-async";
import cbd from "../../assets/city/airport/airport.png";
import locImage from "../../assets/city/airport/locationMap.png";
import NavbarComp from "../Home/NavbarComp";
import { useTranslation } from "react-i18next";
import { faMinusCircle, faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Footer from "../Home/Footer";
import AttractionBox from "./AttractionBox";
import { useNavigate } from "react-router-dom";
import { Autocomplete, useJsApiLoader } from "@react-google-maps/api";
import config from "../../config";

const libraries = ["places"];
const GOOGLE_MAPS_API_KEY = config.GOOGLE_API_KEY;

function AirportPage() {
  const [currentLanguage, setCurrentLanguage] = useState(
    localStorage.getItem("i18nextLng") == "en-US"
      ? "en"
      : localStorage.getItem("i18nextLng") || "en"
  );
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
          navigate("/luggage_locations", {
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

  const handleChangeLanguage = (lang) => {
    setCurrentLanguage(lang);
    t.changeLanguage(lang);
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
  const data = [
    {
      question: "What services does Urloker provide?",
      answer:
        "UrLoker provides a service of securing your luggage with the help of its personnel. We provide luggage pickup and drop-off service at the accommodation, at the airport, or in Melbourne at any hour of the day. After temporarily securing the luggage, we hand it over to the owner at the appropriate time.",
    },
    {
      question:
        "How does Urloker ensure the safety and security of my luggage?",
      answer:
        "All bags are labelled with the customer's details, secured in tamper-evident plastic bags, and, most importantly, fitted with tracking devices. Storage is done under surveillance 24 hours a day with constant progress reported, and the safe remains under restrictions.",
    },
    {
      question: "Can Urloker store large or oddly shaped items?",
      answer:
        "Yes, we store large or odd items. If you have something that does not fit in the standard box, please let us know so we can make the necessary arrangements.",
    },
    {
      question: "Do you offer any additional services besides luggage storage?",
      answer:
        "Yes, we also help with luggage wrapping and can provide you with concierge service, among other things, that will make your travel more pleasurable.",
    },
    {
      question: "What are your pricing options and available discounts?",
      answer:
        "We have prices that are relatively lower within the market, with discounts set for prolonged storage or the storage of many bags. Delivery and collection services provide additional benefits, and the duration of storage is flexible.",
    },
  ];
  const { searchPlaceholder, findLocationsButton } = translate?.heroSection;
  return (
    <div className="font-sans">
      <NavbarComp
        setLanguage={handleChangeLanguage}
        currentLanguage={currentLanguage}
      />
      {/*  SEO Header */}
      <Helmet>
        <title>Luggage Storage Melbourne Airport - Urloker</title>
        <meta
          property="og:title"
          content="Luggage Storage Melbourne Airport - Urloker"
        />
        <meta name="description" content="Melbourne Airport" />
        <meta
          name="description"
          content="Secure, affordable luggage storage Melbourne Airport. Urlocker offers various sizes, flexible durations and easy booking for hassle free travel."
        />
        <meta name="keywords" content="luggage-storage-melbourne-airport" />
        <meta property="og:description" content="Melbourne Airport" />
        <meta property="og:url" href="https://urloker.com/luggage-storage-melbourne-airport" />
        <link rel="canonical" href="https://urloker.com/luggage-storage-melbourne-airport" />
      </Helmet>
      <header className="mt-10 py-20 px-5 text-black/80 bg-white">
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
              alt="Luggage Storage Melbourne Airport"
            />
            <h1 className="text-4xl md:text-6xl font-bold my-4 text-green-800">
              Luggage Storage Melbourne Airport
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
                    defaultValue={"Melbourne Airport VIC, Australia"}
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
            alt="Luggage Storage Melbourne Airport
             "
          />
        </div>
      </header>

      <AttractionBox locationImage={locImage} me={"Melbourne Airport"} />
      <main className="p-5 bg-white xl:px-52 w-full mx-auto">
        <div className="space-y-6 my-5">
          <h2 className="text-3xl font-bold">
            The most secure luggage storage Melbourne Airport - Urlocker
          </h2>
          <p>
            UrLocker is a Melbourne Airport luggage storage company that strives
            to offer affordable, safe, and practical solutions to customers'
            needs. The service's goal is clear: to enrich your experience. We
            have a cheap and secure space for all your things. Whether you are
            transferring for another flight or simply sightseeing for the day in
            Melbourne, we have covered your needs.
          </p>
        </div>
        <div className="space-y-6 my-5">
          <h2 className="text-3xl font-bold">
            Luggage Lockers Melbourne Airport at Urloker
          </h2>
          <p>
            Urlocker provides secure and accessible{" "}
            <a href="/" className="font-bold text-custom-teal-deep">
              luggage lockers
            </a>{" "}
            at Melbourne Airport, offering a convenient solution for travellers
            passing through. Located right within the terminal, these lockers
            make it easy to store your belongings, whether you're waiting for a
            flight or exploring Melbourne. With locker sizes ranging from small
            to large, UrLocker ensures every traveller can find a storage option
            that suits their needs.
            <br />
            <br />
            Urlocker's luggage lockers are available 24/7 and equipped with
            high-end security features like surveillance cameras and
            personalized locker codes. This allows travellers to store their
            items worry-free at an affordable price.
          </p>
        </div>
        <div className="space-y-6 my-5">
          <h3 className="text-2xl font-bold">Convenience and Access</h3>
          <p>
            Our luggage storage Melbourne Airport facility is hassle-free for
            all passengers regardless of the terminal used. On arrival, on
            departure or just in transit, time wasters and excess spending will
            be the least of your concerns.
            <br />
            <br />
            We provide an inexpensive solution to access appropriate bag storage
            facilities that will give you a chance to be unapologetically
            committed to your voyage sans the extra travel bags. The aim is to
            enhance your travel experience and make your things available
            wherever you want them whenever you feel the advantage of having
            them around.
          </p>
          <ul>
            <h4 className="font-bold text-black">Key Features:</h4>
            <ul className="list-disc px-10 text-lg">
              <li>Positioned inside the airport terminal for easy access</li>
              <li>Clear and visible signage across all major airport roads</li>
              <li>
                Open 24/7 to accommodate early-morning or late-night flights
              </li>
              <li>
                Competitive pricing with discounts available for long-term stays
                as well as frequent travellers
              </li>
            </ul>
          </ul>
        </div>
        <div className="space-y-6 my-5">
          <h2 className="text-3xl font-bold">
            Adaptable and Inexpensive Facilities for Luggage Storage Melbourne
            Airport
          </h2>
          <article className="space-y-3">
            <p>
              We treat our clients uniquely since we appreciate that they have
              different requirements and financial capabilities. For that
              reason, we have different levels of storage options, which exceed
              twenty in number. These categories offer various luggage sizes as
              well as different luggage storage durations, all at very
              affordable rates unique for luggage storage Melbourne airport. Our
              flexible style helps to find suitable storage for each customer,
              as it is easy for a backpacker with one bag and a family with
              several bags too.
            </p>
            <ul>
              <h4 className="font-bold text-black">Storage Sized:</h4>
              <ul className="list-disc px-10 text-lg">
                <li>
                  Small lockers for personal items and carry-on bags. For
                  day-trippers or light packers
                </li>
                <li>
                  Medium stock for personal standard cases. For a troubler or a
                  couple of people, only
                </li>
                <li>
                  Ample storage space for very large or two or more bags. For
                  any family travelling together
                </li>
                <li>
                  Competitive pricing with discounts available for long-term
                  stays as well as frequent travellers
                </li>
              </ul>
            </ul>
            <ul>
              <h4 className="font-bold text-black">Duration Options:</h4>
              <ul className="list-disc px-10 text-lg">
                <li>Hourly</li>
                <li>Daily</li>
                <li>Weekly</li>
                <li>Monthly</li>
                <li>Custom period</li>
              </ul>
            </ul>
          </article>
        </div>
        <div className="space-y-6 my-5">
          <h3 className="text-2xl font-bold">
            Latest Technology in Security Measures for Luggage Storage
          </h3>
          <p>
            At UrLocker, we understand the value of security. Your stuff is
            always in safe hands. We have advanced security measures for your
            belongings. All the security features are included in the package
            without additional charges. There is no need for trepidation as
            regards the storage of your right suitcase. No matter whether you
            are in Melbourne or simply have a transfer, you are safe. We provide
            storage, so it is convenient and secure. Your treasures are merely
            out of danger.
          </p>
          <ul>
            <h4 className="font-bold text-black">Security Features:</h4>
            <ul className="list-disc px-10 text-lg">
              <li>
                Every single storage area is equipped with surveillance cameras,
                regularly checked and recorded for monitoring purposes.
              </li>
              <li>
                Robust lockers are accessed only by registered individuals using
                security codes.
              </li>
              <li>
                Dedicated personnel manage the site and assist clients during
                operational hours to ensure safety.
              </li>
              <li>
                Regular system maintenance and safety precautions are performed.
              </li>
              <li>Some storage areas are restricted for extra security.</li>
              <li>Fire-resistant storage units reduce the risk of hazards.</li>
            </ul>
          </ul>
        </div>

        <div className="space-y-6 my-5">
          <h4 className="text-2xl font-bold">
            Simple and Efficient Way of Making Bookings and Storage
          </h4>
          <p>
            In terms of booking and storage of the facilities, we have
            simplified the entire process so that customers can make bookings
            easily and quickly, not wasting any time or money in the process.
            Our simple systems are user-oriented, particularly for travellers,
            in that they have many booking systems and a simple system and
            storage process that any person can use without difficulty.
          </p>
          <ul>
            <h4 className="font-bold text-black">Booking Options:</h4>
            <ul className="list-disc px-10 text-lg">
              <li>
                Online booking takes place through our website, where particular
                web-only offers are provided for those who wish to book storage
                space in advance.
              </li>
              <li>
                The mobile app & service allow you to place your order on the go
                as well as enable you to receive mobile-only discounts,
                tailor-made for when you need storage at short order.
              </li>
              <li>
                For travellers who want to arrange storage for their belongings
                at short notice, on a walk-in basis, with reasonable rates for
                all Storage hardware providers' uptimes
              </li>
            </ul>
          </ul>
          <ul>
            <h4 className="font-bold text-black">Storage Process:</h4>
            <ul className="list-disc px-10 text-lg">
              <li>
                First, look at storage size and duration based on one's
                particular needs.
              </li>
              <li>
                2 For added security, a code is sent through email or SMS, which
                is required to access the inner sanctum of the storage cubes.
              </li>
              <li>
                Find out which storage closet you put your goods in by using
                proper-aimed directional signs.
              </li>
              <li>Place your luggage items inside your locker.</li>
              <li>
                At her discretion, the member can pick up desired items and let
                herself in with the access code.
              </li>
            </ul>
          </ul>
        </div>

        <div className="space-y-4 my-5">
          <h3 className="text-3xl font-bold">
            Further Services and Customer Assistance for Luggage Storage
            Melbourne Airport
          </h3>

          <ul className="px-10 list-disc text-lg">
            <li>24/7 Online Support</li>
            <li>Multilingual Assistance</li>
            <li>Customer Satisfaction Surveys</li>
            <li>Personalized Locker Size Guidance</li>
            <li>Local Travel Recommendations</li>
            <li>Free Device Charging Stations</li>
            <li>Baggage Wrapping Services</li>
            <li>On-Site Printing Facilities</li>
            <li>Continuous Service Improvement</li>
          </ul>
        </div>

        <div>
          <h2 className="text-3xl font-bold">
            Why Choose Urloker when looking for luggage storage Melbourne
            Airport?
          </h2>
          <p>
            Out of the countless similar centres providing luggage storage at
            Melbourne Airport, the best alternative is definitively Urloker,
            which offers the best security, ease, quality, and price. From that
            position, it is easy to see what is so attractive about the service
            you offer: a feeling of a great partner when travelling—one who
            adequately understands one's needs and strives to exceed
            expectations.
          </p>

          <ul className="list-disc px-10 text-lg">
            <li>
              A reliable luggage storage service offering years of experience to
              people travelling from different origins
            </li>
            <li>
              Fair prices throughout the airport and different fees, but no
              surprises, ensure you get value for your money.
            </li>
            <li>
              The ability to change your mind about things without the fear of
              leaving your belongings or burning a hole in your pocket allows
              you to fill your schedule in Melbourne as you please.
            </li>
            <li>
              Security, guards and other sophisticated paraphernalia come with a
              minimal cost on top of their utility, so you can go out in the
              city free from worry.
            </li>
            <li>
              An easy and economical way to go around Melbourne or wait for your
              flight without the hassle of carrying heavy bags, which improves
              the quality of your travel even more.
            </li>
          </ul>
        </div>
      </main>
      <FaqCard t={data} />
      <Footer />
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
            className={`p-2 md:p-4 min-h-fit transition-all ease-out duration-500 h-full ${
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

export default AirportPage;
