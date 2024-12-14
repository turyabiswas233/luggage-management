import React, { useCallback, useRef, useState } from "react";
import { Helmet } from "react-helmet-async";
import config from "../../config";
// const cbd = config.BUCKET_URL + "/files/city/cbd/cbd.jpeg";
const cbd = "/files/city/brisbane/cbd.jpeg";
const locImage = config.BUCKET_URL + "/files/city/brisbane/locationMap.png";
import { useTranslation } from "react-i18next";
import AttractionBox from "./AttractionBox";
import { Autocomplete, useJsApiLoader } from "@react-google-maps/api";
import { useNavigate } from "react-router-dom";
import FaqCard from "./FaqCard";
import Template from "./Template";

const libraries = ["places"];
const GOOGLE_MAPS_API_KEY = config.GOOGLE_API_KEY;

function BrisbaneCBD() {
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
      question: "Where is your luggage storage located in Brisbane CBD?",
      answer:
        "We are centrally located near major attractions and transit hubs. Check our website for directions.",
    },
    {
      question: "How do I know my luggage is safe?",
      answer:
        "We prioritise your luggage's safety with secure facilities and trained staff.",
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
    name: "Luggage Storage Brisbane CBD - Urloker",
    image:
      "https://s3.ap-southeast-2.amazonaws.com/s3.urlocker.io/public/files/city/cbd/cbd.jpeg",
    "@id":
      "https://urloker.com/luggage-storage-brisbane-cbd/#LuggageStorageBrisbaneCBD",
    url: "https://urloker.com/luggage-storage-brisbane-cbd",
    telephone: "+61 3 7035 5653",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Brisbane CBD",
      addressRegion: "QLD",
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
      heading:
        "Luggage Storage Brisbane CBD: Safe, Convenient, and Affordable Solutions",
      para: [
        "Are you exploring Brisbane CBD and wondering where to keep your luggage safe? Look no further than Urloker, the trusted choice for travellers needing secure, convenient and affordable luggage storage in Brisbane CBD. Whether you are here for a quick business trip, a sightseeing adventure or simply passing through, our secure and affordable luggage storage services let you enjoy the city hands-free. From iconic landmarks like South Bank Parklands and Queen Street Mall to hidden gems tucked away in Brisbane’s bustling laneways, the CBD is packed with opportunities to explore. With Urloker, you can focus on creating memories, not on carrying your luggage.",
        "Our centrally located storage facility ensures that your bags are not only safe but also just a short walk away from Brisbane’s top attractions and transport hubs. Say goodbye to the hassle of dragging your luggage around crowded streets, public transport or cafes. Let us handle the weight so you can dive into Brisbane's culture, food and entertainment without worrying about carrying your heavy luggage.",
      ],
      list: [],
    },
    {
      type: "h2",
      heading: "Why Choose Urloker for Luggage Storage in Brisbane CBD?",
      para: [
        "We are centrally located, secure, and hassle-free. Brisbane CBD is full of activities and attractions and having a place to store your bags means you can dive into everything without being weighed down.",
        "With Urloker, you are steps away from top attractions, major transport hubs and the bustling city center. Whether you are here for a layover or an extended visit, storing your luggage with us gives you the freedom in every journey to explore Brisbane.",
      ],
      list: [],
    },
    {
      type: "h3",
      heading: "Benefits of Choosing Urloker Luggage Storage Brisbane CBD",
      para: [],
      list: [
        "Central Location: Stay steps away from attractions like South Bank Parklands and Story Bridge.",
        "Seamless Booking Process: Booking your storage is quick and easy. With just a few clicks, you can reserve your spot and leave your luggage worries behind.",
        "No Hourly Fees: Unlike other storage options, Urloker does not charge by the hour. With a single booking fee, you can store your luggage for the entire day which gives you flexibility and value for money.",
        "Affordable Pricing: No matter the size of your bag. Big or small we store it all. Enjoy a flat rate for storage. Size does not matter at Urloker.",
        "Secure Facilities: 24/7 CCTV and trained staff ensure your belongings safety.",
        "Hassle-Free Drop-Off: Store and retrieve your bags quickly through our user-friendly system.",
      ],
    },
    {
      type: "h3",
      heading: "What Makes Luggage Storage in Brisbane CBD Essential?",
      para: [
        "From exploring the South Bank to catching a flight, you do not want heavy bags slowing you down. Brisbane CBD has iconic spots like Queen Street Mall, Story Bridge and Riverside precinct that are best enjoyed hands-free.",
        "Whether you are shopping at Brisbane Arcade, dining along Eagle Street Pier or waiting for a late flight, luggage storage in Brisbane CBD gives you the flexibility you need to make the most of your time in the city. With Urloker, you can explore with ease while knowing your belongings are safe and secure.",
      ],
      list: [],
    },
    {
      type: "h3",
      heading: "Who Benefits from Luggage Storage in Brisbane CBD?",
      para: [
        "Luggage storage is not only just for travelers but also it is for anyone looking to experience Brisbane CBD hands-free. Here is who can benefit the most:",
      ],
      list: [
        "Tourists: Enjoy the city’s top attractions, like the Wheel of Brisbane and cultural hotspots without being weighed down by heavy bags.",
        "Business Travellers: Store your bags during meetings, conferences or networking events.",
        "Families: Free your hands while exploring with the kids. Enjoy stress-free visits to family-friendly attractions like Streets Beach or Roma Street Parkland and so on.",
        "Event Attendees: Keep your bags safe while you enjoy events in the CBD.",
        "Late Checkouts and Early Arrivals: Got time to kill before your hotel check-in or flight? Secure your bags and make the most of your free time.",
      ],
    },
    {
      type: "h3",
      heading:
        "Where Can You Find the Best Luggage Storage in <a href='https://en.wikipedia.org/wiki/Brisbane_central_business_district'>Brisbane CBD</a>?",
      para: [
        "At Urloker, of course! Our facilities are strategically located for easy access. Drop off your bags on your way to a meeting or before exploring the city.",
        "Our locations are near major transport hubs and popular attractions. You can find us near places like Queen Street Mall, Central Station, South Bank Parklands, Eagle Street Pier and other key points. With Urloker, you get the perfect combination of accessibility, affordability and peace of mind. Say goodbye to heavy bags and hello to a hassle-free day in Brisbane with Urloker.",
      ],
      list: [],
    },
    {
      type: "h4",
      heading: "Why Urloker is the Best Choice",
      para: [
        "When it comes to <a href='https://en.wikipedia.org/wiki/Baggage'>luggage</a> storage in Brisbane CBD, Urloker stands out for its unbeatable convenience, safety and flexibility. Here is why we are the trusted choice for travelers, business professionals and locals alike:",
      ],
      list: [
        "Convenient Locations: Our storage facilities are strategically located near major transport hubs and iconic attractions such as Queen Street Mall, South Bank Parklands and Brisbane Central Station which makes it easy to drop off and pick up your bags.",
        "Safe and Reliable: Trusted by thousands of travelers every week, we offer top-notch security features.",
        "Flexible Storage Plans: Whether you need to store your luggage for just a few hours, a whole day or even a week, we have got you covered with customizable plans tailored to your needs.",
        "Flat Rates for All Bag Sizes: No surprises here. Our flat-rate pricing means the size of your luggage does not matter. You just need to pay the same affordable rate no matter what the size of your bag is.",
      ],
    },
    {
      type: "h3",
      heading: "How Does Brisbane CBD Luggage Storage Work?",
      para: [
        "Drop off your bags, enjoy your day and pick them up when you are ready. Our process is designed to be simple so you can make the most of your time in Brisbane.",
        "Booking with <a href='https://urloker.com'>Urloker</a> is easy. Use our online booking system to reserve your spot, drop your bags at our location and enjoy the city hands-free.",
      ],
      list: [],
    },
    {
      type: "h4",
      heading: "Step-by-Step Guide to Using Urloker Luggage Storage",
      para: [],
      list: [
        "Book Online: Choose your preferred location and select drop off and pick up time according to your convenience and secure your luggage storage with our seamless booking process.",
        "Drop Off: Head to the Urloker location, show your booking confirmation and securely store your bags with the help of our friendly staff.",
        "Explore Brisbane: Enjoy your day without baggage.",
        "Pick Up: Collect your items at a time that suits you. Your bags await, no rush.",
      ],
    },
    {
      type: "h4",
      heading: "Why Urloker is the Go-To Choice in Brisbane CBD",
      para: [
        "Our affordable, flexible options are designed for busy travellers like you. We ensure your belongings are secure, allowing you to focus on enjoying Brisbane.",
        "With easy to access locations, user-friendly booking and a dedicated team ready to help, Urloker is the top choice for luggage storage in Brisbane CBD.",
      ],
      list: [
        "Transparent Pricing: No hidden fees. You know exactly what you are paying for.",
        "Flexible Storage Duration: Store luggage for hours or days with a flat rate whatever fits your travel plans.",
        "Convenient Booking Process: Book your storage in seconds with our user-friendly online system that gives you more time to enjoy Brisbane stress-free.",
        "Flat Rates for All Bag Sizes: Size does not matter at Urloker. Whether you are storing a backpack, a suitcase or oversized items, you pay the same flat rate.",
        "No Hourly Fees: With Urloker, you do not have to worry about hourly charges. One single booking fee covers your storage for the entire day.",
        "Customer Support: Our team is here to help you have a smooth experience.",
        "Expertise You Can Trust: Urloker has years of experience in luggage storage, so we know what travellers need.",
      ],
    },
    {
      type: "h3",
      heading: "Luggage Storage Options Near Brisbane’s Top Attractions",
      para: [
        "Whether it is Story Bridge or Queen Street Mall, Urloker has you covered. We have storage near major attractions, so you are always close to a place to stash your bags.",
        "Having convenient storage means you can enjoy Brisbane’s best-known spots without the hassle. Our locations are near South Bank Parklands, Queensland Art Gallery and Roma Street Parklands.",
      ],
      list: [],
    },
    {
      type: "h4",
      heading: "Top Attractions Near Our Storage Locations",
      para: [],
      list: [
        "South Bank Parklands: Enjoy the riverside, dining and cultural spots without extra baggage.",
        "Story Bridge: Climb or walk across Brisbane’s iconic bridge bag-free.",
        "Roma Street Parklands: Enjoy one of Brisbane’s most beautiful green spaces without the hassle of carrying extra baggage.",
        "Queen Street Mall: Shop freely, then pick up your bags when you are done.",
        "Eagle Street Pier: Dine at Brisbane’s best riverside restaurants with peace of mind, knowing your luggage is in safe hands with Urloker.",
      ],
    },
    {
      type: "h4",
      heading: "Heading to the South Bank? Store Your Bags First!",
      para: [
        "Make the most of Brisbane’s cultural hub without carrying extra weight. South Bank is best explored on foot so store your bags with Urloker and enjoy the art galleries, markets and riverside walks.",
      ],
      list: [],
    },
    {
      type: "h3",
      heading: "Secure Luggage Storage for Brisbane CBD Shoppers",
      para: [
        "Shopping at Brisbane Arcade or Queen Street Mall? Leave your bags with us and keep shopping hands-free.",
        "Rather than carrying multiple shopping bags, drop them off with us and continue your day unburdened.",
      ],
      list: [],
    },
    {
      type: "h3",
      heading:
        "Flying Out of Brisbane Airport? Store Your Bags in the CBD First",
      para: [
        "We are the perfect stop before heading to the airport. Store your bags in Brisbane CBD and enjoy your final hours in the city instead of waiting at the airport.",
      ],
      list: [],
    },
    {
      type: "h4",
      heading: "Save Time with Quick Drop-Offs and Pick-Ups",
      para: [
        "We value your time. Urloker makes drop-offs and pick-ups quick, so you can get back to enjoying Brisbane.",
        "Our service is designed to minimize waiting times. Whether you are in a hurry or just want to make the most of your time, our efficient process is here to help.",
      ],
      list: [],
    },
    {
      type: "h4",
      heading: "Affordable Luggage Storage Options for Every Traveller",
      para: [
        "Whether you are here for a day or a week, Urloker has rates to suit your needs. We offer affordable services for all types of travellers, with flexible pricing for short or extended stays.",
      ],
      list: [],
    },
    {
      type: "h5",
      heading: "Can You Store Large Bags or Special Items?",
      para: [
        "Absolutely. From suitcases to oversized items, Urloker has you covered. If you are traveling with bulky gear like surfboards or bicycles, we can store it securely.",
      ],
      list: [],
    },
    {
      type: "h4",
      heading: "Enjoy Brisbane’s Nightlife Without Luggage Worries",
      para: [
        "Brisbane’s nightlife is vibrant, and there is no need to carry your bags while enjoying it. Whether you are out for dinner, visiting bars in Fortitude Valley, or seeing a show, store your bags with Urloker and enjoy your night.",
      ],
      list: [],
    },
    {
      type: "h3",
      heading: "Flexible Luggage Storage Plans for Brisbane CBD Visitors",
      para: [
        "Short-term or long-term, our storage options are designed to fit your itinerary. Whether you are here for a few hours or several days, Urloker has the solution you need.",
      ],
      list: [],
    },
    {
      type: "h3",
      heading: "Storing Your Bags While Attending Events in Brisbane CBD",
      para: [
        "Concerts, exhibitions, or conventions? Store your luggage with Urloker. Brisbane hosts plenty of events and we help make attending them hassle-free.",
        "Leave your belongings with us while you attend concerts or games and immerse yourself in the experience.",
      ],
      list: [],
    },
    {
      type: "h4",
      heading: "Travelling Light in Brisbane CBD Just Got Easier",
      para: [
        "Focus on enjoying your trip, not managing your bags. Urloker makes travelling light easy and enjoyable.",
        "Whether you are on a layover or waiting for accommodation, storing your bags with us lets you make the most of your time.",
      ],
      list: [],
    },
    {
      type: "h3",
      heading: "How Safe is Luggage Storage in Brisbane CBD at Urloker?",
      para: [
        "Your bags are safe with Urloker. Our first priority is security. We take measures like 24/7 CCTV surveillance and restricted access to keep your belongings secure.",
      ],
      list: [],
    },
    {
      type: "h2",
      heading:
        "Why Convenience is King in Brisbane CBD Luggage Storage with Urloker",
      para: [
        "We are close to transport, attractions and everything you want to see. With strategically placed facilities, Urloker makes exploring Brisbane convenient.",
        "Our prime locations make it easy to drop off your luggage and dive into your plans without missing a beat.",
      ],
      list: [],
    },
    {
      type: "h3",
      heading: "Last-Minute Luggage Storage in Brisbane CBD? No Problem",
      para: [
        "We are here when you need us, even at the last minute. Plans change and Urloker is ready to help you adapt.",
        "Whether you have arrived unexpectedly or extended your stay, our last-minute solutions make things easy.",
      ],
      list: [],
    },
    {
      type: "h3",
      heading: "What to Know About Luggage Storage Pricing in Brisbane CBD",
      para: [
        "Transparent pricing with no hidden fees because surprises belong in your itinerary, not your bill. Urloker offers affordable rates and clear pricing so that you always know what to expect.",
      ],
      list: [],
    },
    {
      type: "h4",
      heading: "How to Book Your Luggage Storage Spot at Urloker",
      para: [
        "Booking is easy. Use our online platform or walk in whatever works for you. We make reserving your spot simple so that you can spend less time worrying and more time enjoying Brisbane.",
      ],
      list: [],
    },
    {
      type: "h4",
      heading: "Maximise Your Day in Brisbane CBD with Hands-Free Travel",
      para: [
        "From city tours to river cruises, travel light and make the most of it. The less you have to carry, the more you can enjoy and Urloker’s luggage storage makes exploring the city effortless.",
        "Imagine taking a city tour or hopping on a river cruise without worrying about your bags. Hands-free travel is all about convenience and comfort, allowing you to take in the sights without a single distraction.",
      ],
      list: [],
    },
    {
      type: "h4",
      heading: "Exploring Brisbane’s Hidden Gems? Leave Your Bags with Urloker",
      para: [
        "Discover local favourites without worrying about your luggage. Brisbane CBD is full of hidden gems that are best explored with a clear mind and empty hands. Let Urloker take care of your bags.",
        "The CBD and surrounding areas are home to a variety of lesser-known cafes, parks and shops that can easily be missed if you are too focused on managing your luggage. With our services, you can fully immerse yourself in the city and discover something new.",
      ],
      list: [],
    },
    {
      type: "h3",
      heading: "Why Trust Urloker with Your Luggage?",
      para: [
        "We are all about offering you freedom and keeping your travel hassle-free. At Urloker, we understand the importance of trust when it comes to handling your belongings and we pride ourselves on our secure, reliable services.",
        "Trust is at the core of everything we do. Our facilities are designed with safety in mind, and our team is trained to ensure that every aspect of the storage process is seamless and secure.",
      ],
      list: [],
    },
    {
      type: "h4",
      heading: "Need Help? We are Here for You",
      para: [
        "Got questions or special requests? Just ask from us, we are happy to help. Whether it is about storage durations, special items or anything else, our team is here to assist.",
        "At Urloker, we believe in exceptional customer service. Our friendly staff is always ready to help with any questions or concerns you may have, ensuring that your experience with us is positive from start to finish.",
      ],
      list: [],
    },
    {
      type: "h2",
      heading:
        "Explore Brisbane Freely with Urloker – Book Your Luggage Storage Now",
      para: [
        "Do not let heavy bags hold you back from discovering Brisbane’s vibrant city life. At Urloker, we offer secure, affordable, and centrally located luggage storage in Brisbane CBD, making your travels stress-free and enjoyable.",
        "Book your spot today and enjoy the freedom to explore Queen Street Mall, South Bank or the Story Bridge, hands-free. Whether it is a short visit or an extended stay, Urloker is here to ensure your luggage is in safe hands.",
        "Your adventure awaits – let us carry the load!",
      ],
      list: [],
    },
  ];
  return (
    <div>
      {/*  SEO Header */}
      <Helmet>
        <title>Luggage Storage Brisbane CBD - Urloker</title>
        <meta
          property="og:title"
          content="Luggage Storage Brisbane CBD - Urloker"
        />
        <meta
          name="description"
          content="Secure and convenient luggage storage in Brisbane CBD. Store your bags hassle free and explore the city hands free. Book now at Urloker"
        />
        <meta name="keywords" content="luggage-storage-brisbane-cbd" />
        <meta
          property="og:url"
          content="https://urloker.com/luggage-storage-brisbane-cbd"
        />
        <meta
          property="og:description"
          content="Secure and convenient luggage storage in Brisbane CBD. Store your bags hassle free and explore the city hands free. Book now at Urloker"
        />
        <link
          rel="canonical"
          href="https://urloker.com/luggage-storage-brisbane-cbd"
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
                alt="luggage storage brisbane cbd"
                loading="lazy"
              />
              <h1 className="text-4xl md:text-6xl font-bold my-4 text-green-800">
                Luggage Storage Brisbane CBD
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
                      defaultValue={"Brisbane CBD, Australia"}
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
              alt="luggage storage brisbane cbd"
              loading="lazy"
            />
          </div>
        </header>
        <AttractionBox
          locationImage={locImage}
          me={"Brisbane CBD"}
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
        <FaqCard
          t={faqs}
          title={"FAQs About Luggage Storage in Brisbane CBD"}
        />
      </div>
    </div>
  );
}

export default BrisbaneCBD;
