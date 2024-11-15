import React, { useCallback, useRef, useState } from "react";
import { Helmet } from "react-helmet-async";
import config from "../../config";
const cbd = config.BUCKET_URL + "/files/city/melbourne/cbd.jpeg";
// import cbd from "/files/city/melbourne/cbd.jpeg";

const locImage = config.BUCKET_URL + "/files/city/cbd/locationMap.png";
import { useTranslation } from "react-i18next";
import AttractionBox from "./AttractionBox";
import { Autocomplete, useJsApiLoader } from "@react-google-maps/api";
import { useNavigate } from "react-router-dom";
import FaqCard from "./FaqCard";
import Template from "./Template";

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
        <main className="p-5 bg-white xl:px-52 w-full mx-auto space-y-10">
          <Template
            type={"h2"}
            heading={
              "Luggage Storage Melbourne: Your Ultimate Solution with Urloker"
            }
            para={[
              "Traveling around Melbourne without the burden of heavy luggage is one of the simplest ways to enhance your experience. Imagine being able to explore the city freely from its vibrant lanes to iconic attractions without worrying about your bags. Luggage Storage services such as those provided by Urloker, make this a reality with its seamless and easy booking process. Whether you are arriving by train, bus or air, we ensure your belongings are safe and secure while you roam around the city. Let's dive into why Luggage Storage Melbourne is essential for your travels and how Urloker can help make your journey even easier.",
            ]}
          />
          <Template
            type={"h3"}
            heading={"What is Luggage Storage Melbourne?"}
            para={[
              `Luggage Storage Melbourne services allow you to store your bags at strategic locations across the city, so you don't have to carry them with you everywhere. These services are perfect for travelers who have long layovers, need to check out of their hotels but still want to explore, or anyone looking for a short-term place to store their luggage. At Urloker, we offer safe, secure, and easy-to-access storage spaces throughout Melbourne. Our flexible options allow you to store your luggage for a few hours or several days, depending on your needs.`,
              `Storing your bags can free up your hands and give you more flexibility in exploring Melbourne. Whether you're sightseeing, shopping, or simply enjoying a meal, Luggage Storage Melbourne gives you peace of mind.`,
            ]}
          />
          <Template
            type={"h3"}
            heading={"How Urloker Simplifies Your Luggage Storage in Melbourne"}
            para={[
              "Luggage Storage services offer you convenient locations across the city to securely store your bags so that you can explore without the hassle. When you choose Urloker for your Luggage Storage Melbourne needs, we prioritize convenience. Booking with Urloker is quick,easy and seamless. Our user-friendly online booking system lets you reserve your storage space before you even leave your accommodation and ensures a smooth and stress-free experience. You can also extend your storage time or change your reservation if your travel plans change unexpectedly.",
              "Our facilities are located near key transportation hubs and tourist attractions, so you are never far from your stored luggage. Whether you are using our service for just a few hours or multiple days,our flexible options are designed to meet your needs. We guarantee a seamless process from booking to retrieval. With Urloker, storing your luggage has never been easier.",
            ]}
          />
          <Template
            type={"h4"}
            heading={"Why You Need Luggage Storage in Melbourne"}
            para={[
              "The need for luggage storage arises from the inconvenience of carrying bags while exploring or waiting for flights. In a bustling city like Melbourne, Luggage Storage Melbourne services let you travel light, giving you the freedom to roam the city without any heavy baggage. For travelers arriving early or with a late flight, storing luggage for a few hours or a day can be extremely helpful, allowing you to enjoy Melbourne without the stress of managing your bags.",
              "Whether you are in between flights, sightseeing, or need a temporary spot to store your luggage during meetings or events, Urloker offers the flexibility you need. You can use our service in several scenarios, including when you are:",
            ]}
            list={[
              "Early for hotel check-in or waiting for check-out.",
              "On a layover at Melbourne Airport.",
              "Needing to store bags before a flight or train departure.",
              "Want to roam around the city for a short trip during a transit flight.",
            ]}
          />
          <Template
            type={"h2"}
            heading={
              "The Benefits of Using Urloker for Luggage Storage Melbourne"
            }
            para={[
              "Choosing Urloker for your Luggage Storage ensures that you benefit from the best of both worlds security and convenience. Our easy to use booking system as well as combined with strategically located facilities gives you freedom to store your bags in Melbourne with a hassle-free experience. We offer an unbeatable flat rate for all sizes of bags and you can book your luggage storage for a whole day with a single booking fee, no hourly fees. So whether you need short-term or long-term storage, we provide affordable options. Plus, we offer flexible storage times to accommodate travelers with varying needs.",
              "With Urloker, you can leave your bags in secure, monitored facilities while you explore. We also provide clear, upfront pricing with no hidden fees, ensuring that you know exactly what to expect when it comes to cost.",
            ]}
            list={[
              "<b>Affordable, transparent pricing.</b>",
              "Our convenience luggage storage locations are strategically placed near popular destinations, major transit hubs and central areas of Melbourne.",
              "<b>Flexible storage times</b> to suit your travel needs.",
              "<b>24/7 surveillance</b> for your peace of mind",
            ]}
          />
          <Template
            type={"h4"}
            heading={"How Does Luggage Storage Work with Urloker?"}
            para={[
              "With Urloker, the Luggage Storage in Melbourne process is quick and easy. After booking your storage space online, all you have to do is drop off your bags at one of our convenient locations. You will receive a confirmation email with all the details, including your unique access code which ensures only you can retrieve your items. Our staff will be available to help with any questions or concerns you might have during drop-off and pick-up.",
              "Once you are ready to retrieve your bags, simply head back to the storage facility and provide your booking details. The process is smooth, efficient and designed to save you time. Whether you need your luggage for just a few hours or several days, Urloker makes it simple.",
            ]}
            list={[
              "<b>Online booking</b> for quick reservations",
              "<b>No hourly fees</b>",
              "<b>Size does not matter. Flat rate for all kinds of bags</b>",
              "<b>Convenient drop-off and pick-up</b> locations",
              "<b>Security measures</b> to ensure your items are protected",
            ]}
          />
          <Template
            type={"h4"}
            heading={"Where to Store Your Luggage in Melbourne"}
            para={[
              "Urloker has strategically placed Luggage Storage locations in convenient areas around the city, ensuring you are never far from a secure spot to store your bags. Whether you are near Southern Cross Station, Flinders Street Station, Parliament Station or major tourist attractions like Federation Square,Dockland, MCG, Bourke Street Mall you will find one of our easy to access storage facilities close by. We have designed our locations to fit the needs of both travelers and business guests who are on the go.",
              "With our multiple Luggage Storage locations in Melbourne, you can drop off your bags at a place that suits you. Moreover if you need to pick up your luggage later, our centralized locations make it convenient to grab your bags without wasting time.",
            ]}
            list={[
              "Locations near <b>public transport</b> hubs.",
              "<b>Locations near Tourist hotspots</b> like <b>Queen Victoria Market</b> and <b>Federation Square, South Bank, Bourke Street Shopping Mall, State Library and all around the city.</b>",
              "Convenient for both <b>business travelers</b> and <b>tourists</b>",
            ]}
          />
          <Template
            type={"h3"}
            heading={"Is Luggage Storage Safe in Melbourne?"}
            para={[
              "Security is one of the top priorities when choosing a luggage storage service in Melbourne. At Urloker, we understand how important it is for you to trust that your belongings are in safe hands. That is why all of our facilities are equipped with 24/7 CCTV surveillance, ensuring that your bags are always monitored. In addition, each storage space is secured with digital access locks and you will receive a unique access code to retrieve your luggage.",
              "We also employ trained professionals who understand how to handle your items with care. Whether you are storing a backpack or valuable gear, you can count on Urloker to keep your luggage secure while you explore Melbourne.",
            ]}
            list={[
              " <b>24/7 monitoring</b> for maximum security",
              "<b>Staff only areas to</b> keep your luggage safe",
              "<b>Professional staff</b> traned to ensure your belongings are well cared for",
            ]}
          />
          <Template
            type={"h3"}
            heading={"What Types of Luggage Can I Store?"}
            para={[
              "At Urloker, we understand that travelers come with different types of luggage. Whether you are traveling with standard suitcases, sports equipment or even large items like bicycles and surfboards, we offer flexible storage options to accommodate them. Our storage facilities are designed to handle all kinds of luggage from small to large or even oversize items so that you can easily store your items without worrying about space or security.",
              "If you are carrying oversized items, just let us know when you book and we will ensure that we have the right space for you. From backpacks to sports gear, big or small we store it all. Urloker has the perfect storage solution with unbeatable pricing and flat rate for all kinds of bags.",
            ]}
            list={[
              "<b>Affordable pricing</b> with no hidden fees",
              "<b>No hourly fees</b>",
              "Competitive rates for <b>budget-conscious travelers</b>",
            ]}
          />
          <Template
            type={"h4"}
            heading={"Can I Store Luggage for a Few Hours in Melbourne?"}
            para={[
              "Many travelers find themselves with extra time before their hotel check-in, a flight or a meeting. That is where luggage storage service comes in handy. With Urloker, you can store your bags for just a few hours or longer. If you have a long layover or just need a break from carrying your luggage, we offer flexible storage options to make sure you do not have to wait around with your bags in tow.",
              "Our no hourly rates make it easy to store your luggage without worrying about picking it up early and gives you freedom in your journey knowing that your bags await no rush. It is an affordable and convenient solution for all the tourists with tight schedules or those who want to explore more.",
            ]}
            list={[
              "<b>NO Hourly rates with unbeatable pricing.</b>",
              "<b>No need to carry bags</b> while sigtseeing or meeting friends",
              "Convenient for travelers with right schedules.",
            ]}
          />
          <Template
            type={"h3"}
            heading={"How Long Can I Keep My Luggage in Storage?"}
            para={[
              "At Urloker, we believe in offering flexible storage options to cater to all types of travelers. Whether you need to store your luggage for just a few hours, a few days or even longer, we have got you covered. Our luggage storage Melbourne facilities allow for both short-term and long-term storage, depending on your needs. This flexibility is ideal for travelers with changing schedules or those who want to enjoy Melbourne without the burden of carrying their bags around.",
              "When you store with Urloker, you are not limited to a strict time frame. You can simply extend your storage time if needed, so you do not have to worry about rushing back to retrieve your belongings.",
            ]}
            list={[
              "<b>Flexible duration:</b> Store for hours, dats or even weeks. You can book your luggage storage for a whole day with a single booking fee.",
              "<b>No rush:</b> Extend your storage if plans change. Your bags await no rush.",
              "Convenient for <b>tourists</b> and <b>business travelers</b> with varying schedules",
            ]}
          />
          <Template
            type={"h3"}
            heading={
              "Booking Luggage Storage in Melbourne Made Easy with Urloker"
            }
            para={[
              "Booking luggage storage in Melbourne with Urloker is quick and hassle-free. Our online platform allows you to reserve storage space in just a few clicks, making it ideal for travelers who want a seamless experience from start to finish. Once you have made your reservation, you will  receive a booking confirmation with all the necessary details. Our seamless booking process is designed to be as simple as possible, so you do not waste time figuring out where to store your bags.",
              "In addition, Urloker allows you to modify or cancel your reservation if your travel plans change, ensuring flexibility in case of unexpected delays or shifts in your schedule.",
            ]}
            list={[
              "<b>Easy online booking in just a few clicks</b> in just a few clicks.",
              "<b>Booking confirmation:</b>with all the details.",
              "<b>Modify or cancel</b> your reservation with ease anytime before drop off time.",
            ]}
          />
          <Template
            type={"h3"}
            heading={"How Do I Retrieve My Stored Luggage?"}
            para={[
              "Retrieving your stored luggage from Urloker is a smooth and easy process. After storing your items, you will receive a booking confirmation email with an unique access code that allows you to easily retrieve your belongings. Our locations are staffed by friendly professionals who are always available to assist if you need help. When you return to pick up your luggage, simply provide your booking confirmation or access code and we will bring your bags to you right away.",
              "We prioritize convenience and security during the retrieval process, ensuring that you get your bags back quickly without any delays.",
            ]}
            list={[
              "<b>Quick retrieval</b> with a unique access code",
              "<b>Friendly staff</b> available to assist with any issues",
              "<b>Smooth and secure process</b>for picking up your luggage",
            ]}
          />
          {/* 7 page */}
        </main>
        <FaqCard t={data} />
      </div>
    </div>
  );
}

export default Melbourne;
