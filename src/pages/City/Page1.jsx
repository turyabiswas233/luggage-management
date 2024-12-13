import React, { useCallback, useRef, useState } from "react";
import { Helmet } from "react-helmet-async";
import config from "../../config";
const cbd = config.BUCKET_URL + "/files/city/cbd/cbd.jpeg";
const locImage = config.BUCKET_URL + "/files/city/cbd/locationMap.png";
import { useTranslation } from "react-i18next";
import AttractionBox from "./AttractionBox";
import { Autocomplete, useJsApiLoader } from "@react-google-maps/api";
import { useNavigate } from "react-router-dom";
import FaqCard from "./FaqCard";

const libraries = ["places"];
const GOOGLE_MAPS_API_KEY = config.GOOGLE_API_KEY;

function MelbourneCBD() {
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
        "Urloker has strategic locations for luggage storage in the heart of Melbourne. Our locations are close to Central Melbourne and significant attractions, transport hubs as well as Flinders Street Station and Melbourne Central Station and famous spots such as Federation Square and Queen Victoria Market.",
    },
    {
      question:
        "What's the pricing policy for Urloker's luggage storage Melbourne CBD ?",
      answer:
        "We offer flat rates and affordable pricing for all luggage and bag sizes.",
    },
    {
      question: "How does the Urloker luggage storage system work?",
      answer:
        "UrLoker provides collection and delivery services. Click on a location or book a van in the same way that you would book a doctor's appointment through the website. Book a flight by telephone, specifying the location, date and time. As for the dropping out, you will have to put your bag in a locker and as for pick up, the staff will take it and keep it safely.",
    },
    {
      question: "What things can I store?",
      answer: `
        <li>Luggage: franchises of suitcases, big bags duffle</li>
        <li>Personal items: Women's purses, Computer Case</li>
        <li>Bulky Items: Sporting equipment, Child params</li>
        `,
    },
    {
      question: "Are there size limits?",
      answer:
        "We welcome items of all sizes! However, for extra-large or bulky items like surfboards, skis, or bicycles, we kindly ask for prior approval to ensure our partners can accommodate your needs. Don’t worry—we’ll handle the coordination and keep you informed.",
    },
    {
      question: "Do larger bags cost more?",
      answer:
        "No. We won't charge you more for your bigger luggeages. So, enjoy the same rates, exclusively with Urloker.",
    },
    {
      question: "Is hourly luggage storage available at Urloker?",
      answer:
        "We offer a flat 24-hour rate, ensuring you get the same great price whether you store your items for just a few hours or the entire day.",
    },
    {
      question:
        "Can I book luggage storage for the whole day with a single booking?",
      answer: `Yes, you can easily book luggage storage for the entire day with just one booking, ensuring a hassle-free experience.`,
    },
    {
      question: "Looking for luggage lockers nearby?",
      answer:
        "We partner with trusted businesses that provide secure storage areas for your belongings, offering the same safety and convenience as traditional lockers—without the hassle of availability or size constraints.",
    },
    {
      question: "Need to change or cancel your booking?",
      answer:
        "We understand that plans can change! Easily modify or cancel your booking right from the details page in our app. Adjust dates, drop-off and pick-up times, or the number of bags with just a few taps.",
    },
    {
      question: "Can I get a refund if I cancel?",
      answer:
        "Absolutely! You can cancel your booking anytime before check-in for a full refund, and best of all—no cancellation fees!",
    },
    {
      question: "What security measures are in place?",
      answer: `
        <li>Super Locks</li>
        <li>CCTV</li>
        <li>Staff trained</li>
      `,
    },
    {
      question: "what kind of service Urloker Luggage Storage provide?",
      answer:
        "Urloker Luggage Storage provides secure and monitored luggage storage solutions with flexible options for all bag sizes. They also offer key storage services for Airbnb hosts and guests, with easy online and QR code booking at partner locations. Additionally, Urloker provides 24/7 customer support, real-time notifications, and optional insurance for added peace of mind.",
    },
  ];
  const { searchPlaceholder, findLocationsButton } = translate?.heroSection;

  const schemaCode = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Luggage Storage Melbourne CBD - Urloker",
    image:
      "https://s3.ap-southeast-2.amazonaws.com/s3.urlocker.io/public/files/city/cbd/cbd.jpeg",
    "@id":
      "https://urloker.com/luggage-storage-melbourne-cbd/#LuggageStorageMelbourneCBD",
    url: "https://urloker.com/luggage-storage-melbourne-cbd",
    telephone: "+61 3 7035 5653",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Melbourne CBD",
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
        <title>Luggage Storage Melbourne CBD - Urloker</title>
        <meta
          property="og:title"
          content="Luggage Storage Melbourne CBD - Urloker"
        />
        <meta
          name="description"
          content="Secure luggage storage Melbourne CBD by Urloker. Affordable, convenient spots near attractions and transport. Explore the city hands-free"
        />
        <meta name="keywords" content="luggage-storage-melbourne-cbd" />
        <meta
          property="og:url"
          content="https://urloker.com/luggage-storage-melbourne-cbd"
        />
        <meta
          property="og:description"
          content="Secure luggage storage Melbourne CBD by Urloker. Affordable, convenient spots near attractions and transport. Explore the city hands-free"
        />
        <link
          rel="canonical"
          href="https://urloker.com/luggage-storage-melbourne-cbd"
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
              className="aspect-video rounded-2xl max-w-2xl w-full hidden lg:block flex-1"
              alt="Luggage Storage Melbourne CBD"
              loading="lazy"
            />
          </div>
        </header>
        <AttractionBox locationImage={locImage} me={"Melbourne CBD"} cityType="Melbourne" />
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
    </div>
  );
}
 
export default MelbourneCBD;
