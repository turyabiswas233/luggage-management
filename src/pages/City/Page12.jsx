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
import Template from "./Template";

const libraries = ["places"];
const GOOGLE_MAPS_API_KEY = config.GOOGLE_API_KEY;

function PerthCBD() {
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
  const faqs = [
    {
      question: "Can I Store My Luggage Overnight?",
      answer: "Yes, overnight storage is available at Urloker.",
    },
    {
      question: "Do I Need to Book in Advance?",
      answer:
        "While not necessary, booking agead ensures your spot, especially during busy periods.",
    },
    {
      question: "Are the Lockers Suitable for Large Suitcases?",
      answer: "Absolutely. We cater to all luggage sizes.",
    },
    {
      question: "Is There Insurance for My Belongings?",
      answer: `While we ensure maximum security, we recommend checking your travel insurance for additional coverage.`,
    },
    {
      question: "What Payment Methods Do You Accept?",
      answer: "We accept cards and cash for your convenience.",
    },
  ];
  const { searchPlaceholder, findLocationsButton } = translate?.heroSection;

  const schemaCode = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Luggage Storage Perth CBD Central - Urloker",
    image:
      "https://s3.ap-southeast-2.amazonaws.com/s3.urlocker.io/public/files/city/cbd/cbd.jpeg",
    "@id":
      "https://urloker.com/luggage-storage-perth-cbd/#LuggageStorageMelbourneCBD",
    url: "https://urloker.com/luggage-storage-perth-cbd",
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

  const data = [
    {
      type: "h2",
      heading: "Experience the Freedom of Luggage Storage in Perth CBD",
      para: [
        "Travelling to Perth CBD is exciting but lugging heavy bags can ruin your plans. Whether you are here for a quick visit, a day of exploring or waiting between check-out and your next stop, your luggage should not hold you back. Luggage storage at Urloker offers a simple way to enjoy the city without being weighed down.",
        "At <b>Urloker</b>, we make exploring Perth CBD hassle-free. Our secure, convenient storage lets you visit Elizabeth Quay, shop at Hay Street Mall or enjoy Kings Park without dragging your bags around. This guide covers everything you need to know about luggage storage so that you can make the most of your time in Perth.",
      ],
    },
    {
      type: "h2",
      heading: "Why Do You Need Luggage Storage in Perth CBD?",
      para: [
        "Travelling light is not just a luxury, it is the key to enjoying Perth's bustling city centre to the fullest. Imagine strolling through the vibrant streets of Perth CBD, unburdened by bags. From impromptu shopping sprees to spontaneous photo opportunities, having a storage spot for your luggage makes everything smoother. At Urloker, we give you the freedom to explore the city your way by offering secure and convenient luggage storage options so that you can make the most of your day.",
        "<b>Why use luggage storage in Perth CBD?</b>",
      ],
      list: [
        "Enjoy a quick, Seamless and easy booking experience.",
        "Flat Rate for all Sizes, no matter the size of your luggage.",
        "Store your bags all day with a single booking fee.",
        "Spend your day exploring bag-free.",
        "Enjoy Perth's attractions without dragging heavy suitcases.",
        "Make layovers and short stays more comfortable.",
      ],
    },
    {
      type: "h3",
      heading: "Where Is Urloker Located in Perth CBD?",
      para: [
        "Urloker’s luggage storage facility in Perth CBD is strategically located in the heart of Perth CBD and gives you easy access to all the main attractions. Whether you are arriving by train, bus or even car, our central location means you can drop off your luggage quickly and get on with your adventure. You'll find us just a short walk away from popular hotspots, making us the ideal option for tourists, business travellers and day trippers.",
        "<b>Highlights of our location:</b>",
      ],
      list: [
        "Easy to reach from Perth Train Station.",
        "Close to major shopping streets and cultural centres.",
        "Centrally located for quick drop-offs and pick-ups.",
        "Surrounded by popular cafes and restaurants for a relaxed start or end to your day.",
        "Situated in a safe area and ensures that your belongings are always protected.",
      ],
    },
    {
      type: "h3",
      heading: "What Makes Urloker Stand Out for Luggage Storage in Perth CBD?",
      para: [
        "At Urloker, we are not just about storing luggage but also providing convenience, safety and peace of mind. Our modern lockers come equipped with the latest security features so that you can rest easy knowing your belongings are in safe hands. We focus on delivering a simple and seamless experience that lets you get on with exploring Perth without a care in the world.",
        "<b>Why choose us?</b>",
      ],
      list: [
        "State of the art lockers for maximum security.",
        "Affordable pricing options for different durations.",
        "Our seamless booking process ensures an easy and intuitive online booking system.",
        "Store your luggage for a few hours or the entire day at one flat rate with no hourly fees.",
        "We have no Size Limits and one flat rate applies regardless of your luggage size.",
        "Our convenient Locations are Strategically placed for quick and hassle free access.",
        "Friendly staff to assist you at all times.",
      ],
    },
    {
      type: "h3",
      heading: "Is Luggage Storage Safe in Perth CBD at Urloker?",
      para: [
        "Absolutely. Safety is a top priority at Urloker. We use modern, highly secure lockers with 24/7 monitoring and gives you complete peace of mind. Our facility is designed to keep your belongings secure, no matter how long you choose to store them. When you store your bags with us, you can focus on enjoying your day knowing that everything is taken care of.",
        "<b>Safety features include:</b>",
      ],
      list: [
        "24/7 CCTV surveillance.",
        "Secure lockers with advanced locking mechanisms.",
        "Staff on site during business hours for extra security.",
      ],
    },
    {
      type: "h2",
      heading: "Benefits of Luggage Storage in Perth CBD with Urloker",
      para: [
        "Urloker isn't just another storage service. We are designed to make your travel experience seamless, offering a range of perks that go beyond basic storage.",
        "<b>Perks of Using Urloker:</b>",
      ],
      list: [
        "Safety First: State-of-the-art security measures to protect your belongings.",
        "Affordable Rates: Save money while enjoying top notch service.",
        "Accessibility: Easily reachable from public transport hubs.",
        "No Hidden Fees: Transparent pricing with no surprises.",
      ],
    },
    {
      type: "h4",
      heading: "How Much Does Luggage Storage cost at Urloker?",
      para: [
        "Transparent pricing with no hidden fees because surprises belong in your itinerary, not your bill. Urloker offers affordable rates and clear pricing so that you always know what to expect.",
        "<b>Pricing Highlights:</b>",
      ],
      list: [
        "Fixed Flat Rate: No matter the size of your bag, enjoy our unbeatable flat rate with no extra charges for larger luggage.",
        "No Hourly Charges: Flat rates with no surprises.",
        "All-Day Storage with a Single Fee: With one simple booking fee, you can store your luggage for the entire day, offering you the freedom to explore without any worries.",
      ],
    },
    {
      type: "h4",
      heading: "Can I Store My Bags for Just a Few Hours?",
      para: [
        "Of course. At Urloker, we have a fixed price for storage. You simply pay the price and you can store your bag for as long as you need, without worrying about hourly rates. Whether you are between check out and your next destination or just need a secure place for your bags while you explore, we've got you covered.",
        "<b>Benefits of fixed-price storage:</b>",
      ],
      list: [
        "Fixed hours for straightforward planning",
        "Enjoy flexible storage without worrying about hourly charges",
        "Ideal for layovers, day trips or simply exploring the city without the hassle of carrying bags",
      ],
    },
    {
      type: "h4",
      heading: "What Kind of Bags Can I Store?",
      para: [
        "Whether you are carrying a suitcase, a backpack or a shopping haul, Urloker can accommodate it all. Our spacious lockers are designed to fit a variety of luggage sizes, from small daypacks to oversized suitcases. We aim to make your experience as smooth as possible, no matter what type of bag you are travelling with.",
        "<b>Bag types we accept:</b>",
      ],
      list: [
        "Suitcases of all sizes",
        "Backpacks and travel bags",
        "Shopping bags and oversized items",
      ],
    },
    {
      type: "h3",
      heading: "How to Book Luggage Storage in Perth CBD?",
      para: [
        "Booking your luggage storage with Urloker could not be easier. You can either book online through our simple and user-friendly website or walk in and store your bags on the spot. Our online booking system lets you check availability and secure your storage space in just a few clicks.",
        "<b>Booking options:</b>",
      ],
      list: [
        "Instant online booking for convenience using our seamless online booking process.",
        "Walk-in availability for spontaneous plans and you can book from our storage locations using Urloker qr code.",
        "Simple and hassle-free.",
      ],
    },
    {
      type: "h4",
      heading: "Is Same-Day Luggage Storage Available?",
      para: [
        "Yes. At Urloker, we understand that plans can change in an instant. That is why we offer same-day luggage storage for all our customers. Whether you are on a layover, just arrived in Perth or need a quick storage solution, you can count on us. Just walk in, and we will take care of your luggage for as long as you need.",
      ],
      list: [
        "No pre-booking needed, just walk in.",
        "Immediate storage solutions for sudden plans.",
        "Available all day, every day.",
      ],
    },
    {
      type: "h3",
      heading: "Why Travellers Love Perth CBD for Exploring?",
      para: [
        "Perth CBD is the heart of the city, brimming with culture, shopping, dining and entertainment. From the stunning views at Elizabeth Quay to the lush expanses of Kings Park, Perth’s central district is best enjoyed bag-free. By using Urloker’s luggage storage services, you can fully immerse yourself in all that the city has to offer without the burden of your belongings.",
      ],
      list: [
        "Elizabeth Quay: River views and waterfront activities.",
        "Kings Park: One of the largest city parks in the world.",
        "Perth Cultural Centre: Museums, galleries, and more.",
        "Hay Street and Murray Street Malls: Enjoy shopping from local stores and street performers.",
        "Swan River Foreshore: soak in the natural beauty of the Swan River.",
        "Perth Mint: Discover Australia’s oldest operating mint and learn about the city’s gold rush history.",
      ],
    },
    {
      type: "h4",
      heading: "How to Make the Most of Your Day in Perth Without Luggage?",
      para: [
        "Exploring Perth is all about freedom and freedom means no bags weighing you down. Start your day by dropping off your luggage at Urloker and make the most of Perth's vibrant streets, scenic parks and bustling cafes. From early morning walks in Kings Park to late-night dining at Elizabeth Quay, you will experience Perth at its best completely unburdened.",
      ],
      list: [
        "Drop off your luggage first thing in the morning",
        "Enjoy the convenience of bag-free shopping",
        "Stroll through parks and markets without hassle",
      ],
    },
    {
      type: "h3",
      heading: "What’s Nearby Urloker’s Luggage Storage in Perth CBD?",
      para: [
        "Urloker’s central location means you are never far from Perth’s most popular attractions. Once you have stored your bags, you can easily explore everything from shopping streets to cultural hotspots, all just a short walk away. With Urloker as your storage solution, you’ll be at the centre of it all.",
      ],
      list: [
        "Shopping precincts like Hay Street Mall",
        "Cafes and restaurants for a quick bite",
        "Cultural spots like the Perth Art Gallery",
      ],
    },
    {
      type: "h3",
      heading: "How Urloker Keeps Your Belongings Secure?",
      para: [
        "Your peace of mind is our priority at Urloker. Our lockers are designed with advanced security features, ensuring that your belongings stay safe. We employ 24/7 surveillance, modern locking systems, and an accessible yet secure environment that lets you store and retrieve your items with ease.",
      ],
      list: [
        "24/7 CCTV monitoring.",
        "Secure lockers.",
        "Staff presence for extra assistance.",
      ],
    },
    {
      type: "h4",
      heading: "Can Tourists Store Shopping Bags Too?",
      para: [
        "Yes, absolutely. Whether you have gone on a shopping spree or simply have extra bags from your day out, Urloker is here to help. Store your shopping bags safely with us and continue exploring without having to worry about carrying all your purchases.",
      ],
      list: [
        "Keep your hands free for more shopping.",
        "Securely store valuable purchases.",
        "No need to carry multiple bags around.",
      ],
    },
    {
      type: "h3",
      heading: "How Early Can I Drop Off My Luggage?",
      para: [
        "Urloker offers convenient operating hours so you can drop off your luggage as early as you need. Check our opening times to plan your day accordingly whether you are starting your adventure at sunrise or need early morning storage, we’ve got you covered.",
      ],
      list: [
        "Early opening to suit morning arrivals",
        "Convenient hours for all day storage",
        "Drop off your bags and get started with your plans",
      ],
    },
    {
      type: "h4",
      heading: "Is Urloker Convenient for Business Travellers?",
      para: [
        "Urloker is ideal for business travellers needing a reliable storage solution between meetings or after hotel check-out. Store your work materials, presentation items or even personal luggage while you focus on your busy schedule in Perth CBD. Our location, flexible hours and secure environment make it perfect for professionals on the move.",
      ],
      list: [
        "Centrally located for easy access.",
        "Secure storage for work materials.",
        "Flexible options for short or extended storage.",
      ],
    },
    {
      type: "h3",
      heading: "How Long Can I Store My Luggage at Urloker?",
      para: [
        "At Urloker, we offer storage options tailored to your needs from just a few hours to several days. Whether you are in Perth for a quick visit or an extended stay, you can store your luggage for as long as you need. Simply choose the duration that works for you when booking.",
      ],
      list: [
        "Hourly storage for short stays.",
        "Overnight storage available.",
        "Long-term storage for extended stays.",
      ],
    },
    {
      type: "h4",
      heading: "What Happens If I Need More Time for Storage?",
      para: [
        "No worries. We understand that travel plans can change. If you need more time to explore or your schedule shifts, you can easily extend your storage duration with Urloker. Just let us know, and we will make the necessary adjustments so you can stay flexible and stress-free.",
      ],
      list: [
        "Extend your booking at any time.",
        "No penalties for changing your plans.",
        "Pay only for the time you use.",
      ],
    },
    {
      type: "h3",
      heading:
        "How Does Urloker Compare to Other Luggage Storage Options in Perth CBD?",
      para: [
        "Urloker stands out from other luggage storage providers in Perth CBD for several reasons such as our central location, competitive pricing and secure facilities. Unlike airport storage or other less convenient options, Urloker puts you right in the heart of Perth, close to everything you want to see and do.",
      ],
      list: [
        "More affordable than airport storage.",
        "Centrally located for easy access.",
        "Top-notch security for peace of mind.",
      ],
    },
    {
      type: "h4",
      heading: "Can I Store Valuable Items Safely?",
      para: [
        "Yes, our lockers are secure enough to store all of your essentials, including valuable items. From electronics to important documents, our advanced security measures ensure your belongings are safe and sound while you enjoy Perth without any worries.",
      ],
      list: [
        "Lockers designed for personal items.",
        "24/7 CCTV for added security.",
        "Store electronics, jewellery, and documents safely.",
      ],
    },
    {
      type: "h3",
      heading: "How to Reach Urloker From Perth’s Main Train Station?",
      para: [
        "Urloker is conveniently located just a short walk from Perth’s main train station. Whether you are arriving from another part of the city or straight from the airport via train, getting to us is quick and easy. Follow the directions from the station, and you will find us right in the centre of all the action.",
      ],
      list: [
        "Short walking distance from Perth Station.",
        "Easily accessible via public transport.",
        "Located near major streets for convenience.",
      ],
    },
    {
      type: "h3",
      heading: "Are There Hidden Fees for Luggage Storage?",
      para: [
        "Nope. At Urloker, we believe in transparency. There are no hidden fees or unexpected charges when you store your luggage with us. What you see is what you get and we pride ourselves on our straightforward pricing. You’ll never have to worry about surprise costs.",
      ],
      list: [
        "No hidden fees or surprise charges.",
        "Affordable rates with full transparency.",
        "Flat rate for all the luggage sizes.",
        "Pay only for the storage duration you choose.",
      ],
    },
    {
      type: "h4",
      heading: "Why Choose Urloker Over Airport Luggage Storage?",
      para: [
        "Airport luggage storage can be inconvenient, especially if you are planning to spend the day exploring Perth CBD. With Urloker, you are closer to the action. Our central location means you won’t have to travel back and forth to access your luggage, and our prices are much more reasonable compared to airport rates.",
      ],
      list: [
        "Central location for easy access.",
        "More affordable rates.",
        "No need to travel back to the airport just for your bags.",
      ],
    },
    {
      type: "h2",
      heading: "How to Check Availability for Luggage Storage in Perth CBD?",
      para: [
        "You can check the availability of our luggage storage facilities easily through our website. Real time availability updates ensure that you will always know if there is space for your luggage. You can also book online to guarantee your spot and make your visit to Perth as seamless as possible.",
      ],
      list: [
        "Real time updates on our website.",
        "Easy online booking for guaranteed storage.",
        "Walk-in availability for last minute plans.",
      ],
    },
    {
      type: "h4",
      heading: "Tips for Travelling Around Perth Without Bags",
      para: [
        "Travelling light means travelling smart. By storing your luggage with Urloker, you will free yourself up to experience everything Perth has to offer. Here are some tips for making the most of your time in Perth while staying bag-free:",
      ],
      list: [
        "Store luggage early to maximise your day.",
        "Plan activities that are easier without bags (like walking tours).",
        "Enjoy public transport without the hassle of carrying heavy bags.",
      ],
    },
    {
      type: "h2",
      heading: "Why Urloker Is the Top Choice for Perth CBD Luggage Storage",
      para: [
        "At Urloker, we take pride in offering convenient, secure and affordable luggage storage services right in the heart of Perth CBD. Our prime location, combined with competitive pricing and a focus on security, makes us the ideal choice for travellers. Whether you are in Perth for just a few hours or staying a few days, we are here to simplify your journey. Store your luggage with Urloker and experience the ease and freedom that so many travellers enjoy.",
      ],
    },
  ];

  return (
    <div>
      {/*  SEO Header */}
      <Helmet>
        <title>Luggage Storage Perth CBD Central - Urloker</title>
        <meta
          property="og:title"
          content="Luggage Storage Perth CBD Central - Urloker"
        />
        <meta
          name="description"
          content="Luggage storage Perth CBD - affordable, secure and convenient luggage storage with Urloker. Explore the city hand free and easy online booking."
        />
        <meta name="keywords" content="luggage-storage-perth-cbd" />
        <meta
          property="og:url"
          content="https://urloker.com/luggage-storage-perth-cbd"
        />
        <meta
          property="og:description"
          content="Luggage storage Perth CBD - affordable, secure and convenient luggage storage with Urloker. Explore the city hand free and easy online booking."
        />
        <link
          rel="canonical"
          href="https://urloker.com/luggage-storage-perth-cbd"
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
                alt="luggage storage perth cbd"
                loading="lazy"
              />
              <h1 className="text-4xl md:text-6xl font-bold my-4 text-green-800">
                Luggage Storage Perth CBD
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
                      defaultValue={"Sydney, Australia"}
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
              alt="luggage storage perth cbd"
              loading="lazy"
            />
          </div>
        </header>
        <AttractionBox
          locationImage={locImage}
          me={"Perth CBD"}
          cityType="Sydney"
        />

        <main className="p-5 bg-white xl:px-52 w-full mx-auto space-y-10">
          {data.map((item, index) => (
            <Template
              key={index}
              type={item.type}
              heading={item.heading}
              para={item.para}
              list={item?.list || []}
            />
          ))}
        </main>

        <FaqCard t={faqs} />
        <p className="p-10 xl:px-52 bg-white">
        Urloker makes storing your luggage in Perth CBD seamless, secure and hassle free so that you can focus on what really matters. Enjoy freedom in every journey with Urloker.

        </p>
      </div>
    </div>
  );
}

export default PerthCBD;
