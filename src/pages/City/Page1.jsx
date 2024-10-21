import React, { useCallback, useRef, useState } from "react";
import { Helmet } from "react-helmet-async";
import cbd from "/city/cbd/cbd.svg";
import locImage from "/city/cbd/locationMap.png";
import NavbarComp from "../Home/NavbarComp";
import { useTranslation } from "react-i18next";
import { faMinusCircle, faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Footer from "../Home/Footer";
import AttractionBox from "./AttractionBox";
import { Autocomplete, useJsApiLoader } from "@react-google-maps/api";
import config from "../../config";
import { useNavigate } from "react-router-dom";

const libraries = ["places"];
const GOOGLE_MAPS_API_KEY = config.GOOGLE_API_KEY;

function MelbourneCBD() {
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
  return (
    <div>
      <NavbarComp
        setLanguage={handleChangeLanguage}
        currentLanguage={currentLanguage}
      />
      {/*  SEO Header */}
      <Helmet>
        <title>Luggage Storage Melbourne CBD - Urloker</title>
        <meta
          property="og:title"
          content="Luggage Storage Melbourne CBD - Urloker"
        />
        <meta name="description" content="Melbourne CBD" />
        <meta
          name="description"
          content="Secure luggage storage Melbourne CBD by Urloker. Affordable, convenient spots near attractions and transport. Explore the city hands-free"
        />
        <meta name="keywords" content="luggage-storage-melbourne-cbd" />
        <link rel="canonical" href="/luggage-storage-melbourne-cbd" />
      </Helmet>
      <div className="content font-sans mx-auto w-full">
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
                className="aspect-video object-cover rounded-md w-full lg:hidden flex-1"
                alt="Luggage Storage Melbourne CBD "
              />
              <h1 className="text-4xl md:text-6xl font-bold my-4 text-green-800">
                Luggage Storage Melbourne CBD
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
                      defaultValue={"CBD Melbourne VIC, Australia"}
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
              className="aspect-video rounded-md max-w-2xl w-full hidden lg:block flex-1"
              alt="Luggage Storage Melbourne CBD "
            />
          </div>
        </header>
        <AttractionBox locationImage={locImage} me={"Melbourne CBD"} />
        <main className="p-5 bg-white xl:px-52 w-full mx-auto">
          <div className="space-y-6 my-5">
            <h2 className="text-4xl font-[900] text-black">
              Best Luggage Storage in Melbourne CBD with Urloker
            </h2>
            <p className="text-lg font-normal lightShade">
              Paying for a cab or trying to navigate a new subway or train
              system can take so much effort that even the idea of exploring a
              new city becomes a challenge.{" "}
              <a href="/" className="text-custom-teal-deep font-bold">
                Urloker
              </a>{" "}
              offers the best luggage storage in Melbourne CBD so that you can
              explore the city freely without feeling weighed down by bags.
              Being one of the critical business locations of Melbourne, our
              centres are in close proximity to significant visitations like
              Federation Square, Queen Victoria Market, Royal Botanic Gardens,
              etc. We have also placed many of our storage points at strategic
              locations near major transport hubs, including Flinders Street
              Station and Melbourne Central Station. This makes it very
              convenient for tourists to check in their bags and start their
              activities in the city.
            </p>
          </div>
          <div className="space-y-6 my-5">
            <h2 className="text-3xl font-bold text-black">
              Why Choose Urloker for Secure Luggage Storage Melbourne CBD?
            </h2>
            <article className="space-y-3">
              <p>
                Urloker provides its services for safe luggage storage in
                Melbourne CBD stands out for a number of reasons:
              </p>
              <ul className="grid gap-3 list-disc px-5 text-lg">
                <li>
                  <b>Secure Management:</b> We utilize very advanced management
                  systems for storing your goods, including 24 hours of CCTV
                  surveillance and secure access control.
                </li>
                <li>
                  <b>Convenient Hours of Operation:</b> Our outlets are open
                  every day of the week since they offer very convenient
                  locations with minimal limitations for your schedule.
                </li>
                <li>
                  <b>Assistance:</b> One of the best parts is that there is
                  always a polite person who is willing to help so that
                  everything works out without too many problems.
                </li>
                <li>
                  <b>Insurance Coverage:</b> To put all concerns to rest, every
                  piece of belonging stored with us is guaranteed under the
                  insurance coverage policy.
                </li>
              </ul>
            </article>
          </div>
          <div className="space-y-6 my-5">
            <h3 className="text-2xl font-bold text-black">
              Exploring the Melbourne CBD
            </h3>
            <p>
              If you are looking for some out-of-the-city travel, the Southern
              Cross, Melbourne Central, and Flinders Street train stations
              located within the Central Business District (CBD) are also well
              connected for that purpose. There is also a network of tram
              services from the CBD to the other parts of central Melbourne.
              There is a great deal of pedestrian infrastructure in the area,
              which allows for easy sightseeing.
            </p>
          </div>
          <div className="space-y-6 my-5">
            <h4 className="font-bold text-xl">
              Melbourne CBD Getting from the Airport to the CBD
            </h4>
            <p>
              The most convenient way to travel to the CBD from Melbourne
              Airport is by using the T4 Skybus service, which operates from the
              Airport coach terminus directly to Southern Cross Station, located
              in the city centre. This service is timely, taking about forty
              minutes, such as during peak hours, which one spends in a taxi.
              Southern Cross is easy to access by tram or just a bit of a walk
              to the desired place from the Southern Cross station.
            </p>
          </div>
          <div className="space-y-6 my-5">
            <h4 className="font-bold text-xl">
              Melbourne CBD City Train Links
            </h4>
            <p>
              While located mainly for the benefit of local workers, the CBD is
              provided with rapid transit facilities and a direct heavy rail
              line connection to some areas in metropolitan Melbourne and its
              suburbs.
            </p>
            <ul className="px-5 list-disc text-lg">
              <li>
                <b>Craigieburn Line:</b> Queens Park- (25 minutes) and
                Flemington Race Course- (18 minutes)
              </li>
              <li>
                <b>Glen Waverley Line:</b> Parliament- (15 minutes)
              </li>
              <li>
                <b>Belgrave Line:</b> Port Melbourne Beach- (30 minutes)
              </li>
              <li>
                <b>Cranbourne Line:</b> Royal Botanic Gardens- (12 minutes)
              </li>
              <li>
                <b>Williamstown Line:</b> Williamstown Beach- (30 minutes)
              </li>
            </ul>
          </div>

          <div className="space-y-6 my-5">
            <h3 className="text-2xl font-bold text-black">
              Travelling Using the Tram in the Melbourne CBD
            </h3>
            <p>
              Yarra Trams can be boarded at Flinders Street, Melbourne Central,
              or at any of the local stops in the CBD. The tramlines are
              circular, so almost the whole of the CBD is within a 10-minute
              walk from any tram stop.
            </p>
            <ul className="list-decimal px-5 text-lg">
              <p className="-translate-x-5">
                <b>Attractions Within Reach by Tram</b>
              </p>
              <li>
                <b>Royal Botanic Gardens:</b> 16 minutes
              </li>
              <li>
                <b>melbourne Museum:</b> 20 minutes
              </li>
              <li>
                <b>Melbourne Sporting Grounds:</b> 8 minutes
              </li>
              <li>
                <b>University of Melbourne:</b> 10 minutes
              </li>
              <li>
                <b>Docklands:</b> 15 minutes
              </li>
            </ul>
            <p className="mt-5">
              If you need the service{" "}
              <a
                className="text-teal-500"
                href="https://en.wikipedia.org/wiki/Baggage"
                target="_blank"
                title="Learn more about Luggage"
              >
                luggage storage
              </a>{" "}
              in Melbourne CBD, Unlocker would be the most reasonable decision
              in every respect. We aim to ensure each user experiences the most
              straightforward, most functional and most pleasing user interface.
              Our thorough approach provides reassurance that every step will be
              fun and uncomplicated. You can store your belongings safely with
              Unloker even when you are in the Melbourne CBD, and you wish to
              walk around and explore the city without your bags.
            </p>
          </div>

          <div className="space-y-6 my-5">
            <h2 className="text-3xl font-bold text-black">
              Luggage Lockers in Melbourne CBD Safe and Economical
            </h2>
            <p>
              Holidays are usually costly, but paying to keep your luggage is
              optional. Urloker provides economical and practical luggage
              lockers in Melbourne CBD. We operate with a very clear pricing
              policy with cheapest luggage storage service in Melbourne and
              ensuring safety and quality services, so there is no guesswork
              about what you are liable for. We have lockers of different sizes,
              from the smallest to the largest size, meant for larger suitcases.
              Booking the balcony over the internet is so straightforward.
            </p>
          </div>
          <div className="space-y-4 my-5">
            <h3 className="text-3xl font-bold text-black">
              Sponsored Travel by Urloker Melb CBD Heavy Bag Storage
            </h3>
            <p>It is simple to use Urloker:</p>
            <ul>
              <li>
                <p>
                  <b>Book Online:</b>
                </p>
                <ul className="px-10 list-disc">
                  <li>Go to out site</li>
                  <li>Check the area on the map</li>
                  <li>Choose the area in Melbourne CBD you need</li>
                </ul>
              </li>
              <li>
                <b>Choose Locker Size: </b> Validate the size of the locker
                according to your handbag.
              </li>
              <li>
                <b>Drop Off: </b> Come to the moll with your items and check
                them in.
              </li>
              <li>
                <b>Enjoy Melbourne: </b> Go around the city without lugging
                around heavy bags.
              </li>
              <li>
                <b>Pick Up:</b> You may come any time during the day and take
                your baggage back. Our method is intentionally constructed in
                such a manner that you stay calm, so please go on and have fun
                throughout the day.
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-3xl font-bold text-black">
              A New Way to Explore the City: Around Melbourne Flash-Free -
              Luggage Storage Service
            </h2>
            <p>
              Melbourne is still a very vibrant, cultured, and attractive place.
              Therefore, thanks to the luggage storage facilities near Melbourne
              Central Station, it is possible to take full advantage of what the
              city has to offer without any loads. For example, you can visit
              the National Gallery of Victoria, wander around the streets of
              Melbourne decorated with street art, and enjoy the tastes of
              Chinatown… all without the hassle of carrying your bags. Urloker,
              your Melbourne adventures are easy to realize with our reliable
              and secure luggage storage strategically located where you need it
              most.
            </p>
          </div>
        </main>
        <FaqCard t={data} />
      </div>
      <Footer />
    </div>
  );
}
const FaqCard = ({ t }) => {
  const [openFAQ, setOpenFAQ] = useState(0);

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
            className={`p-4 min-h-full transition-all ease-out duration-500 h-full ${
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
                className="text-gray-600 mt-2 overflow-x-hidden break-words text-justify px-5 font-medium"
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

export default MelbourneCBD;
