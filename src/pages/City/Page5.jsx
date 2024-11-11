import React, { useCallback, useRef, useState } from "react";
import { Helmet } from "react-helmet-async";
import config from "../../config";
// const cbd = config.BUCKET_URL + "/files/city/southern/scs.jpeg";
import cbd from "/files/city/southern/scs.jpeg";
const locImage = config.BUCKET_URL + "/files/city/cbd/locationMap.png";
import { useTranslation } from "react-i18next";
import { faMinusCircle, faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AttractionBox from "./AttractionBox";
import { Autocomplete, useJsApiLoader } from "@react-google-maps/api";
import { useNavigate } from "react-router-dom";

const libraries = ["places"];
const GOOGLE_MAPS_API_KEY = config.GOOGLE_API_KEY;

function SouthernStation() {
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
        "Can I store oversized items with Urloker at Southern Cross Station?",
      answer:
        "Yes, but we recommend contacting the specific location to ensure they can accommodate your item.",
    },
    {
      question: "Is my luggage safe with Urloker near Southern Cross Station?",
      answer:
        "Absolutely. Security is our top priority, with measures in place to protect your belongings.",
    },
    {
      question: "How do I find Urloker locations near Southern Cross Station?",
      answer:
        "Simply visit <a href='https://urloker.com'>Urloker</a> and search for Southern Cross Station to see all nearby options.",
    },
    {
      question: "How do I find Urloker locations near Southern Cross Station?",
      answer:
        "Simply visit <a href='https://urloker.com'>Urloker</a> and search for Southern Cross Station to see all nearby options.",
    },
    {
      question: "CanI store my luggage for more than one day?",
      answer:
        "Yes! Urloker offers both short-term and long-term luggage storage options.",
    },
    {
      question: "How do I book luggage storage at Southern Cross Station?",
      answer:
        "Simply go to Urloker, select your preferred location near Southern Cross Station and book your storage.",
    },
    {
      question: "Is my luggage safe at Urloker storage facilities?",
      answer:
        "Absolutely. Our storage locations are secure, monitored and insured to provide maximum safety.",
    },
    {
      question: "Can I store oversized luggage?",
      answer:
        "Yes, our facilities are designed to accommodate bags of all sizes.",
    },
    {
      question: "Do I need to pay extra for oversized luggages?",
      answer:
        "No, we do not charge extras for oversized baggage. We ensure a flat rate for all sizes of bags where size does not matter. So you do not need to pay extras.",
    },
    {
      question:
        "Can I Store My Luggage All Day with a single booking payment ?",
      answer:
        "Yes, you can. At Urloker, a single booking payment covers all day storage so there is no need to worry about hourly fees or additional costs. Once you drop off your bags for the entire day, they are securely stored and allows you to explore Melbourne without any time constraints. Your bag awaits so you do not need to rush at all.",
    },
  ];
  const { searchPlaceholder, findLocationsButton } = translate?.heroSection;

  const schemaCode = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Southern Cross Station Luggage Storage - Urloker",
    image:
      "https://s3.ap-southeast-2.amazonaws.com/s3.urlocker.io/public/files/city/cbd/cbd.jpeg",
    "@id":
      "https://urloker.com/southern-cross-station-luggage-storage/#SouthernCrossStationLuggageStorage",
    url: "https://urloker.com/southern-cross-station-luggage-storage",
    telephone: "+61 3 7035 5653",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Souther Cross Station",
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
        <title>Southern Cross Station Luggage Storage - Urloker</title>
        <meta
          property="og:title"
          content="Southern Cross Station Luggage Storage - Urloker"
        />
        <meta
          name="description"
          content="Southern Cross Station Luggage Storage at Urloker: provides Secure and affordable luggage storage solution —explore Melbourne hands-free"
        />
        <meta name="keywords" content="luggage-storage-melbourne-cbd" />
        <meta
          property="og:url"
          content="https://urloker.com/southern-cross-station-luggage-storage"
        />
        <meta
          property="og:description"
          content="Southern Cross Station Luggage Storage at Urloker: provides Secure and affordable luggage storage solution —explore Melbourne hands-free"
        />
        <link
          rel="canonical"
          href="https://urloker.com/southern-cross-station-luggage-storage"
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
                alt="Southern Cross Station Luggage Storage"
                loading="lazy"
              />
              <h1 className="text-4xl md:text-6xl font-bold my-4 text-green-800">
                Southern Cross Station Luggage Storage
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
                      defaultValue={"Southern Cross Station, Australia"}
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
              alt="Southern Cross Station Luggage Storage"
            />
          </div>
        </header>
        <AttractionBox
          locationImage={locImage}
          me={"Souther Cross Station Luggage Storage"}
        />
        <main className="p-5 bg-white xl:px-52 w-full mx-auto">
          <div className="space-y-6 my-5">
            <h2>
              H2 - Southern Cross Station Luggage Storage: Convenient and Secure
              Solutions with Urloker
            </h2>
            <p>
              Looking for southern cross station luggage storage? Heading to
              Southern Cross Station and wondering what to do with your heavy
              luggage? Finding luggage storage at Southern Cross Station can be
              a game-changer whether you are visiting Melbourne for a day or
              have some time before your flight from Melbourne Airport . Urloker
              offers a seamless, reliable and secure solution for storing your
              luggage so that you can enjoy Melbourne without the burden of
              heavy bags.
            </p>
          </div>

          <div className="space-y-6 my-5">
            <h2 className="text-3xl font-[900] text-black">
              Why You Need Luggage Storage at Southern Cross Station
            </h2>
            <p>
              Travelling can be stressful when you are carrying heavy luggage.
              Southern Cross Station is a major hub in Melbourn and connects
              travellers through the train network, SkyBus to Melbourne Airport
              and more. However carrying your bags while navigating the city can
              be challenging while you want to explore different places from
              your check list especially during peak hours.{" "}
            </p>
            <p>
              By using our secure and convenient luggage storage platform you
              can easily book your luggage storage in a few clicks. Whether you
              are off to enjoy Melbourne's bustling streets, hidden laneways or
              iconic landmarks like Federation Square and the Royal Botanic
              Gardens, our convenient storage options near Southern Cross
              Station are designed to give you the freedom to move around
              comfortably with a hassle free experience.
            </p>
          </div>

          <div className="space-y-6 my-5">
            <h3 className="text-2xl font-[900] text-black">
              Luggage Storage Options Near Southern Cross Station
            </h3>
            <p>
              You might be asking, "Where exactly can I find luggage storage
              near Southern Cross Station?" At Urloker, we offer secure,
              affordable and convenient luggage storage solutions. We provide
              storage locations near Melbourne Southern Cross Station to ensure
              your luggage is safe while you discover Melbourne's hidden gems.
              Luggage storage at Southern Cross Station can be easily booked
              online through our website with a few clicks.
            </p>
          </div>

          <div className="space-y-6 my-5">
            <h2 className="text-3xl font-[900] text-black">
              Benefits of Using Urloker for Luggage Storage at Southern Cross
              Station
            </h2>

            <ul className="px-5 list-disc text-lg">
              <li>
                <b>Convenient Locations: </b>
                We offer multiple convenient storage locations near Southern
                Cross Station and all within easy walking distance. This means
                more time for you to explore Melbourne with a hassle free
                experience.
              </li>
              <li>
                <b>Affordable Rates: </b>
                We offer flat rates for all sizes of bags. Our flexible pricing
                structure makes it easier to budget for your trip. Pay per bag
                per day has made it affordable and easier to budget for.
              </li>
              <li>
                <b>Secure Storage: </b> Safety and security are our top
                priorities. We provide a safe environment to store your luggage
                so you don't have to worry about your bags.
              </li>
              <li>
                <b>Simple Booking:</b>
                You can easily book online via Urloker and can secure your
                storage spot within minutes with a hassle-free seamless
                experience.
              </li>
            </ul>
          </div>

          <div className="space-y-6 my-5">
            <h3 className="text-2xl font-[900] text-black">
              How to Store Your Bags Near Southern Cross Station
            </h3>
            <p>
              With Urloker, it is super easy to store your luggage near Southern
              Cross Station by following these steps:
            </p>
            <ol className="px-5 list-decimal text-lg">
              <li>
                <b>Book Online: </b>
                Simply visit Urloker website and book your desired convenient
                luggage storage spot. Choose the number of bags and how long you
                will need the storage.
              </li>
              <li>
                <b>Drop Off Your Luggage: </b>
                Head to our convenient storage location which is just a short
                walk from Southern Cross Station and drop off your luggage
                easily by showing your booking details. Our friendly staff will
                be there to assist you and will ensure your bags are securely
                stored.
              </li>
              <li>
                <b>Enjoy Melbourne: </b> Explore the city without the weight of
                your luggage. Take in the sights like Flinders Street Station,
                Bourke Street or even the Old Melbourne Gaol. Luggage storage at
                Southern Cross Station allows you to experience Melbourne
                without any baggage related stress.
              </li>
            </ol>
          </div>

          {/* aro add kora baki */}

          <div className="space-y-6 my-5">
            <h2 className="text-3xl font-[900] text-black">
              How much Does Luggage Storage Cost at Southern Cross Station?
            </h2>

            <p>
              At Urloker, we believe in transparency. Our pricing is simple:
            </p>

            <ul className="px-5 list-disc text-lg">
              <li>
                <b>Per Bag Per Day: </b>
                You pay a flat rate per bag per day. No hidden cost.
              </li>
              <li>
                <b>Flexible Hours: </b>
                Whether you need storage for a few hours or a few days, we have
                got you covered. Luggage storage at Southern Cross Station is
                affordable and makes it easy for everyone to enjoy the service.
              </li>
            </ul>
          </div>

          <div className="space-y-6 my-5">
            <h4 className="text-xl font-[900] text-black">
              Storage Near Melbourne Southern Cross Station for Every Traveller
            </h4>
            <p className="text-lg font-normal lightShade">
              Whether you are a backpacker, a business traveller or on a family
              vacation, our luggage storage facilities are designed to meet
              every traveller's needs. We cater to those who want to explore
              Melbourne without the burden of carrying bags. Luggage storage at
              Southern Cross Station ensures you can have a stress-free trip.
            </p>
          </div>

          <div className="space-y-6 my-5">
            <h4 className="font-bold text-xl">
              How Secure Is the Luggage Storage Near Southern Cross Station?
            </h4>
            <p>Security is our priority. At Urloker, we:</p>
            <ul className="px-5 list-disc text-lg">
              <li>
                <b>Monitor All Locations:</b> Our storage locations are
                monitored for your safety.
              </li>
              <li>
                <b>Only Use Trusted Partners:</b>We work with businesses that
                have proven track records of secure luggage storage.
              </li>
              <li>
                <b>Provide Insurance:</b> Rest easy knowing your luggage is
                insured while in our care. Melbourne Southern Cross Station
                luggage storage with Urloker is not only convenient but also
                secure.
              </li>
            </ul>
          </div>

          <div className="space-y-6 my-5">
            <h3 className="text-2xl font-[900] text-black">
              Luggage Storage Locations Around Southern Cross Station
            </h3>
            <p className="text-lg font-normal lightShade">
              Urloker provides multiple storage locations around Melbourne,
              making it easier for you to choose a storage spot that best suits
              your travel itinerary. Our spots are conveniently located near
              major attractions and allow for easy drop-off and pick-up. Luggage
              storage at Southern Cross Station ensures you can travel freely
              means convenience, security and trust without any baggage
              constraints.
            </p>
          </div>
          <div className="space-y-6 my-5">
            <h4 className="text-xl font-bold text-black">
              Store Your Luggage and Enjoy Melbourne Worry-Free
            </h4>
            <p>
              Melbourne is a vibrant city with so much to explore from the
              bustling streets of Melbourne CBD to iconic spots like Federation
              Square. With Urloker, you can explore without the stress of
              carrying bags. Southern Cross Station luggage storage is the ideal
              solution for anyone wanting to fully enjoy their time in
              Melbourne.
            </p>
          </div>
          <div className="space-y-6 my-5">
            <h3 className="text-2xl font-bold text-black">
              Affordable Luggage Storage Around Melbourne Southern Cross Station{" "}
            </h3>
            <p>
              We understand that travelling can be expensive, that is why our
              luggage storage service is priced affordably. No need to worry
              about hefty locker fees with Urloker, you will get affordable
              rates,seamless experience and excellent service. Luggage storage
              at Southern Cross Station is within reach for all travellers.
            </p>
          </div>
          <div className="space-y-6 my-5">
            <h4 className="font-bold text-xl">
              Storage Spots Across Melbourne to Make Your Trip Easier
            </h4>
            <p>
              Apart from Southern Cross Station, we also offer luggage storage
              at key locations all around Melbourne. Whether you are catching a
              flight from Melbourne Airport or taking a train from Flinders
              Street Station, we have got you covered. Luggage storage at
              Southern Cross Station provides a central location for all your
              storage needs.
            </p>
          </div>
          <div className="space-y-6 my-5">
            <h3 className="font-bold text-2xl">
              Why You Should Store Your Luggage with Urloker Instead of Lockers
            </h3>
            <p>
              Lockers at train stations can be convenient but they come with
              limitations. Urloker offers:
            </p>
            <ul className="px-5 list-disc text-lg">
              <li>
                <b>Guaranteed Space:</b> Book ahead to secure your spot.
              </li>
              <li>
                <b>Flexible Sizes:</b> We can store bags of all sizes, from
                backpacks to oversized suitcases and best of all you don't need
                to pay an extra flat rate for all sizes of bags.
              </li>
              <li>
                <b>Easy Access:</b> Our locations are easily accessible and save
                you time. Luggage storage at Southern Cross Station with Urloker
                means you get the space you need when you need it.
              </li>
            </ul>
          </div>

          <div className="space-y-6 my-5">
            <h3 className="text-2xl font-bold text-black">
              How to Book Luggage Storage Near Southern Cross Station
            </h3>
            <p>
              Booking with Urloker is straightforward. Head to our website, find
              a location near Southern Cross Station and book the storage you
              need. You will get a confirmation instantly and our friendly team
              will be ready to welcome and assist when you arrive. Melbourne
              Southern Cross Station luggage storage has never been easier to
              arrange.
            </p>
          </div>

          <div className="space-y-6 my-5">
            <h2 className="text-3xl font-bold text-black">
              Luggage Storage Near Melbourne Southern Cross for Backpackers
            </h2>
            <p>
              Backpacking through Australia? Southern Cross Station is a gateway
              to Melbourne and beyond. Storing your luggage with Urloker allows
              you to experience the city comfortably without being weighed down.
              Luggage storage at Southern Cross Station is an ideal for those
              looking to travel light and explore more.
            </p>
          </div>

          <div className="space-y-6 my-5">
            <h4 className="text-xl font-bold text-black">
              Enjoy Melbourne Without Heavy Bags
            </h4>
            <p>
              As a city of mistry there is so much to see and do from visiting
              the Melbourne Aquarium to walking along the Yarra River, you do
              not want luggage slowing you down. Store your bags at Southern
              Cross Station with Urloker and make the most of your time in
              Melbourne. Southern Cross Station luggage storage helps you make
              the most of your time without being weighed down by bags.
            </p>
          </div>

          <div className="space-y-6 my-5">
            <h4 className="text-xl font-bold text-black">
              Store Your Luggage and Enjoy Melbourne's Attractions
            </h4>
            <p>
              From the Old Melbourne Gaol to the buzzing Melbourne Central,
              there is so much to explore. Urloker makes it easy by offering
              convenient luggage storage near Southern Cross Station so you can
              discover Melbourne's best spots hassle-free. Luggage storage at
              Southern Cross Station makes your visit to Melbourne more
              enjoyable and comfortable.
            </p>
          </div>

          <div className="space-y-4 my-5">
            <h3 className="text-2xl font-bold text-black">
              Simple and Secure Luggage Storage Solutions
            </h3>
            <p>
              With Urloker, luggage storage at Melbourne Southern Cross Station
              is simple and secure. Here is how it works:
            </p>

            <ol className="px-10 list-decimal">
              <li>
                Book Your Spot: Just go to Urloker and choose your preferred
                luggage storage location. Booking online ensures you get a spot,
                even during busy times.
              </li>
              <li>
                Drop Off Your Bags: Our convenient luggage storage locations are
                located close to Southern Cross Station, making drop-off easy.
                Our friendly staff will ensure your bags are stored securely.
              </li>
              <li>
                Explore Melbourne: Now that you are bag-free, you can explore
                Melbourne with ease! Visit places like Bourke Street Mall,
                Federation Square or the beautiful Royal Botanic Gardens.
              </li>
            </ol>
          </div>

          <div className="space-y-4 my-5">
            <h4 className="text-xl font-bold text-black">
              Safety First: Keeping Your Luggage Secure
            </h4>
            <p>Your luggage's safety is important to us:</p>

            <ul className="px-10 list-disc">
              <li>
                Monitored Locations: Our storage spots are watched to ensure
                security.
              </li>
              <li>
                Trusted Partners: We work with reliable businesses to store your
                luggage.
              </li>
              <li>
                Insurance Provided: Your luggage is insured while in our care.
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-xl font-bold text-black">
              Make the Most of Your Melbourne Adventure
            </h4>
            <p>
              Melbourne is a vibrant city with so much to see and do. From
              visiting the Melbourne Aquarium to strolling along the Yarra
              River, you do not want luggage slowing you down. Store your bags
              at Southern Cross Station with Urloker and enjoy your time to the
              fullest.
            </p>
          </div>

          <div>
            <h2 className="text-3xl font-bold text-black">
              Your Best Option for Southern Cross Station Luggage Storage—Book
              Today!
            </h2>
            <p>
              Do not let heavy luggage ruin your Melbourne adventure. Urloker
              provides safe, affordable, and convenient luggage storage at
              Southern Cross Station. Book today and travel with ease!
            </p>
            <p>
              Whether you are in Melbourne for a few hours or a few days,
              luggage storage at Southern Cross Station is an essential service
              for stress-free travel. Urloker offers affordable, convenient and
              secure luggage storage which helps you enjoy your trip without
              worrying about your bags. Book your luggage storage now and make
              the most of your Melbourne adventure!
            </p>
          </div>
        </main>
        <FaqCard t={data} />
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
      <h2 className="text-center font-bold text-2xl my-5">
        FAQs About Southern Cross Station Luggage Storage
      </h2>
      <div className="space-y-5 divide-y-3 divide-slate-800">
        {t.map((faq, index) => (
          <div
            key={index}
            className={`p-2 md:p-4 min-h-fit transition-all ease-out duration-1000 h-full ${
              openFAQ == index ? "max-h-52 overflow-y-auto" : "max-h-20"
            }`}
          >
            <h4
              className="text-xl font-bold text-gray-700 cursor-pointer flex items-center justify-between"
              onClick={() => toggleFAQ(index)}
            >
              {faq.question}
              {openFAQ == index ? (
                <FontAwesomeIcon icon={faMinusCircle} />
              ) : (
                <FontAwesomeIcon icon={faPlusCircle} />
              )}
            </h4>
            {openFAQ == index && (
              <p
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

export default SouthernStation;
