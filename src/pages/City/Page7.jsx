import React, { useCallback, useRef, useState } from "react";
import { Helmet } from "react-helmet-async";
import config from "../../config";
const cbd = config.BUCKET_URL + "/files/city/cbd/cbd.jpeg";
const locImage = config.BUCKET_URL + "/files/city/cbd/locationMap.png";
import { useTranslation } from "react-i18next";
import AttractionBox from "./AttractionBox";
import { Autocomplete, useJsApiLoader } from "@react-google-maps/api";
import { useNavigate } from "react-router-dom";
import Template from "./Template";
import FaqCard from "./FaqCard";

const libraries = ["places"];
const GOOGLE_MAPS_API_KEY = config.GOOGLE_API_KEY;

function SydneyStorage() {
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
        "We welcome items of all sizes! However, for extra-large or bulky items like surfboards, skis, or bicycles, we kindly ask for prior approval to ensure our partners can accommodate your needs. Don't worry—we'll handle the coordination and keep you informed.",
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
    name: "Secure and Affordable Luggage Storage Sydney - Urloker",
    image:
      "https://s3.ap-southeast-2.amazonaws.com/s3.urlocker.io/public/files/city/cbd/cbd.jpeg",
    "@id":
      "https://urloker.com/luggage-storage-sydney/#LuggageStorageMelbourneCBD",
    url: "https://urloker.com/luggage-storage-sydney",
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
      heading: "Secure and Affordable Luggage Storage in Sydney",
      para: [
        "The first thing you want when you are visiting Sydney is the freedom to explore its iconic landmarks without worrying about your luggage. Whether you are a traveller on a quick stopover or exploring the city for the day, luggage storage Sydney can be a game-changer. At <a href='https://urloker.com'>Urloker</a>, we understand the importance of flexibility and convenience, especially when you are on the move. Let's dive into everything you need to know about luggage storage in Sydney to make your visit stress-free.",
      ],
    },
    {
      type: "h3",
      heading: "Why You Need Luggage Storage in Sydney",
      para: [
        "Picture this: You are planning an epic day out in Sydney, maybe exploring the iconic Opera House or wandering through Darling Harbour but instead of focusing on the moment, you are stuck hauling your bags. Do not let your luggage weigh you down. Luggage storage is the ideal solution to keep your bags safe while you immerse yourself in the city. It gives you the freedom to explore without constantly checking on your belongings, leaving you hands-free to enjoy Sydney's vibrant culture.",
      ],
      list: [
        "Avoid hauling heavy bags around the city.",
        "Enjoy hands-free sightseeing.",
        "Access luggage storage near major attractions for ultimate convenience during your exploration.",
        "Enjoy flexibility and affordability, with no hourly fees tailored to suit your travel schedule and plans.",
        "Keep your luggage secure while you explore.",
      ],
    },
    {
      type: "h3",
      heading:
        "Where to Find Convenient <a href='https://en.wikipedia.org/wiki/Baggage'>Luggage Storage</a> in Sydney",
      para: [
        "Sydney is a tour lover's dream destination which is packed with world-class attractions, vibrant neighbourhoods and iconic landmarks. Hauling your luggage around can be a real hassle. Urloker has convenient locations for luggage storage Sydney from the heart of the CBD to key transport hubs. At Urloker, we have strategically placed our storage points to ensure you have a place to drop off your bags near major attractions, bus terminals and train stations. You will find our lockers easily accessible, allowing you to store your luggage within minutes and get on with your adventure.",
      ],
      list: [
        "CBD: Perfect for exploring the city centre, Pitt Street Mall, Hyde Park, and the Queen Victoria Building.",
        "Circular Quay: Close to the Opera House and Harbour Bridge and ferry terminals which is ideal for exploring the harborfront without carrying heavy bags.",
        "Sydney Central Station: Ideal for travellers arriving by train which allows you quick access to the city's transport network.",
        "Darling Harbour: Close to top attractions like the SEA LIFE Sydney Aquarium, Madame Tussauds and the Australian National Maritime Museum.",
        "Bondi Beach: Store your luggage near Sydney's most famous world class beach and enjoy the sun, surf and sand without worrying about your bags.",
      ],
    },
    {
      type: "h4",
      heading: "How Does Luggage Storage Work?",
      para: [
        "New to luggage storage? It is simpler than you might think. Here at Urloker, we make the process as seamless as possible. You just need to book a locker online, drop off your bags, lock it up and you are good to go. Our online booking system allows you to reserve your locker ahead of time, saving you the hassle of last-minute arrangements.",
      ],
      list: [
        "Book your locker online by using our seamless easy booking process or on arrival by simply scanning the Qr code.",
        "Drop off your luggage in a secure locker by simply showing your booking details from Urloker.",
        "Enjoy your day with freedom and return when you are ready. Your bag awaits no rush.",
      ],
    },
    {
      type: "h3",
      heading:
        "Is Luggage Storage Sydney at <a href='https://urloker.com/'>Urloker</a> Safe?",
      para: [
        "Safety is our number one priority at Urloker. Our luggage storage solutions in Sydney are designed with state-of-the-art security measures, including CCTV monitoring and sturdy lockers. Rest assured, your belongings are in safe hands, allowing you to focus on your itinerary instead of worrying about your bags. You can lock up your luggage and explore Sydney with complete peace of mind.",
      ],
      list: [
        "CCTV monitoring for 24/7 security.",
        "High-quality lockers with strong locks.",
        "Secure booking and payment system.",
        "Regular Maintenance Checks.",
        "24/7 Customer Support.",
      ],
    },
    {
      type: "h3",
      heading:
        "Affordable Luggage Storage Options in <a href='https://en.wikipedia.org/wiki/Sydney'>Sydney</a>",
      para: [
        "Travelling in Sydney should not break the bank and at Urloker, we are here to ensure that it does not. We understand that travelling can be costly, which is why we offer unbeatable pricing and a seamless storage process. At Urloker, we offer fixed pricing for all luggage sizes with no hourly fees, ensuring that you get great value whether it is a single day drop-off or a longer-term storage plan. Urloker storage solutions are designed to cater to all kind of travellers whether you are backpackers, business people or a tourist exploring the city.",
      ],
      list: [
        "Fixed price for all sizes: Urloker offers a flat rate for all the sizes and ensures transparency and value for money.",
        "No hidden fees: With Urloker, what you see is what you pay. Enjoy the peace of mind that comes with clear, straightforward pricing.",
        "Best Prices in Sydney: Urloker offers competitive rates with unbeatable pricing, ensuring that you get exceptional value for your money.",
        "Seamless Booking Process: Reserve your locker with Urloker using our website in just a few clicks or book on arrival for ultimate flexibility.",
        "Flexible Duration Options: Whether you need storage for a few hours or an entire day, we have got you covered with options tailored to your schedule. Enjoy flexibility with no hourly fees knowing that your bag awaits, no need to rush.",
      ],
    },
    {
      type: "h2",
      heading: "Why Choose Urloker for Your Luggage Storage in Sydney?",
      para: [
        "Urloker is not just about storing your luggage but also about creating a hassle-free experience for you while you explore Sydney. Our locations are easily accessible, our pricing is transparent and our lockers are secure. We understand what travellers need and we aim to make it easy for you to make the most of your trip. Whether you are planning a quick stopover or a full day adventure, Urloker is designed to meet all your storage needs and exceed your expectations with a seamless experience.",
      ],
      list: [
        "Convenient locations across Sydney.",
        "Affordable, flexible pricing.",
        "Size Does not Matter and flat rate for all sizes of bags.",
        "Quick and Easy Booking.",
        "Flexible Storage Options with no hourly fees.",
        "Secure, easy to use lockers.",
      ],
    },
    {
      type: "h3",
      heading: "Hassle Free Luggage Storage in Sydney for Travellers",
      para: [
        "Travellers often need different storage options depending on their schedules. Whether you are stopping for a few hours or plan to explore Sydney for an entire day, Urloker has you covered. Our fixed-price storage options allow you to enjoy hassle-free storage for the entire day, without worrying about hourly rates or short-term limits.",
      ],
      list: [
        "Options for hassle free whole day storage.",
        "Ideal for travellers looking for convenient storage.",
        "Book online or on-site for a fixed-price storage.",
        "Easy Booking and Payment.",
        "No Stress, No Rush.",
      ],
    },
    {
      type: "h4",
      heading: "Top Places to Explore After Storing Your Luggage",
      para: [
        "Once you have safely stored your bags, Sydney is yours to discover. Make sure you visit must-see spots like Circular Quay for incredible harbour views or Darling Harbour for some entertainment and dining. Sydney is full of surprises so store your luggage with Urloker and let your feet take you anywhere.",
      ],
      list: [
        "Circular Quay: Harbour Bridge and Opera House views.",
        "Darling Harbour: Museums, restaurants, and entertainment.",
        "The Rocks: A charming historic area with unique shops.",
        "Bondi Beach: Dive into Sydney's beach culture, whether you are enjoying the surf, walking along the Bondi to Coogee Coastal Walk or indulging in beachside cafes.",
        "Taronga Zoo: Take a ferry ride from Circular Quay and explore one of the world's most renowned zoos which offers spectacular views of the city skyline.",
        "Luna Park Sydney: Have some fun at this retro amusement park, located near the Harbour Bridge.",
        "Royal Botanic Garden: Escape the urban hustle with a peaceful stroll through these stunning gardens, located near the Opera House.",
        "Chinatown and Haymarket: Explore a vibrant area filled with authentic Asian eateries, bustling markets and unique shops.",
      ],
    },
    {
      type: "h3",
      heading:
        "Perfect for Business Travellers: Luggage Storage Near Sydney CBD",
      para: [
        "Business travellers often face tight schedules. If you are attending a meeting in Sydney CBD or have a few hours before catching your flight, luggage storage is your best friend. You can drop your bags with Urloker near key business districts and keep your day efficient and productive.",
      ],
      list: [
        "Convenient storage near the CBD.",
        "Ideal for meetings, events, or quick plans.",
        "Secure your luggage and focus on work.",
      ],
    },
    {
      type: "h4",
      heading: "Can You Store Luggage Near Sydney Airport?",
      para: [
        "Yes, you can. Urloker offers convenient storage options near Sydney Airport, making it easy for travellers on a short layover or those with early arrivals to stash their bags. You can hop straight into exploring Sydney without the burden of your luggage.",
      ],
      list: [
        "Quick access from the airport.",
        "Ideal for layovers and early arrivals.",
        "Affordable short-term storage options.",
      ],
    },
    {
      type: "h4",
      heading: "Stress Free Day Trips With Luggage Storage",
      para: [
        "Sydney is not just about the city, there is Bondi Beach, the Blue Mountains and more waiting for you. Imagine trying to enjoy Bondi Beach while managing a suitcase not ideal, right? With Urloker's luggage storage, you can leave your bags behind and enjoy these incredible day trips stress-free.",
      ],
      list: [
        "Store your luggage and hit the beach.",
        "Travel light to the Blue Mountains.",
        "Make your day trip worry-free.",
      ],
    },
    {
      type: "h3",
      heading: "Store Your Luggage for Events in Sydney",
      para: [
        "Sydney is known for its vibrant events, concerts, sports games, beach culture festivals, you name it. If you are attending an event and do not want to drag your luggage along, we have got you covered. Store your bags with Urloker and enjoy the excitement without being weighed down.",
      ],
      list: [
        "Perfect for concerts, sports, and festivals.",
        "Secure your belongings for peace of mind.",
        "Convenient locations near major event venues.",
      ],
    },
    {
      type: "h4",
      heading: "How Long Can You Store Your Bags?",
      para: [
        "Business travellers often face tight schedules. If you are attending a meeting in Sydney CBD or have a few hours before catching your flight, luggage storage is an essential convenience. Drop your bags with Urloker near key business districts and make your day efficient and productive with hassle-free whole day storage.",
      ],
      list: [
        "Convenient storage near the CBD.",
        "Ideal for meetings, events, or quick plans.",
        "Secure your luggage and focus on work.",
      ],
    },
    {
      type: "h3",
      heading: "Sydney's Weather and Why Luggage Storage Is a Must",
      para: [
        "Sydney's weather can be unpredictable. For example one moment it is sunny, the next it is pouring rain. Lugging your bags around on a rainy day is far from ideal, and even in the sunshine, it is much easier to explore without extra baggage. Using luggage storage ensures that you are ready for whatever Sydney's weather throws at you.",
      ],
      list: [
        "Stay prepared for rain or shine.",
        "Explore comfortably without bags.",
        "Make the most of Sydney's beautiful weather.",
      ],
    },
    {
      type: "h4",
      heading: "What Can't You Store in Luggage Lockers?",
      para: [
        "While Urloker's luggage storage is versatile, there are some restrictions on what you can store. Items like flammable materials, illegal substances, and dangerous goods are not allowed. Before you book, make sure you are familiar with our guidelines to avoid any surprises.",
      ],
      list: [
        "No flammable or hazardous items.",
        "No illegal substances.",
        "General luggage and personal items are welcome.",
      ],
    },
    {
      type: "h2",
      heading: "Easy Online Booking for Luggage Storage in Sydney at Urloker",
      para: [
        "Booking your luggage storage with Urloker is seamless and hassle free. Our online platform allows you to reserve a locker in just a few clicks. Whether you are planning ahead or need a spot on the fly, our seamless booking process has you covered.",
      ],
      list: [
        "Reserve your locker in advance.",
        "Quick and easy online booking.",
        "Book from your phone, wherever you are.",
      ],
    },
    {
      type: "h3",
      heading: "What to Look for in a Luggage Storage Provider",
      para: [
        "When choosing a luggage storage provider, safety, affordability and accessibility are key factors. At Urloker, we tick all these boxes. We offer secure lockers, fair pricing, flat rate, size flexibility and convenient locations that make storing your luggage stress-free.",
      ],
      list: [
        "Safety: CCTV and sturdy lockers.",
        "Affordability: Fair pricing with no hidden fees.",
        "Accessibility: Multiple locations across Sydney.",
      ],
    },
    {
      type: "h3",
      heading: "Best Times to Use Luggage Storage in Sydney",
      para: [
        "There are many moments when luggage storage comes in handy for instance, early hotel checkouts, late flights or even if you just want to make the most of your sightseeing without extra baggage. Urloker is here to make your travel plans smoother, whatever the situation.",
      ],
      list: [
        "Early hotel checkout or late flight.",
        "Busy sightseeing days.",
        "Day trips and quick city explorations.",
      ],
    },
    {
      type: "h4",
      heading: "Is Luggage Storage Worth It for Backpackers?",
      para: [
        "If you are a backpacker travelling on a budget, luggage storage can be a lifesaver. Instead of carrying all your belongings everywhere, store your bag with Urloker and enjoy exploring Sydney without the extra weight. Our affordable rates are perfect for budget travellers looking for convenience.",
      ],
      list: [
        "Affordable rates for budget travellers.",
        "Explore without carrying your backpack.",
        "Perfect for day trips and sightseeing.",
      ],
    },
    {
      type: "h4",
      heading: "How to Choose the Right Luggage Storage Location",
      para: [
        "Choosing the best luggage storage location is all about convenience. Look for lockers that are near where you want to explore whether it is the CBD, Circular Quay or Darling Harbour. At Urloker, we have got locations that make it easy for you to drop off your bags and head straight to the sights.",
      ],
      list: [
        "Pick a location near your plans.",
        "Consider accessibility and opening hours.",
        "Choose Urloker for convenient, secure storage.",
      ],
    },
    {
      type: "h3",
      heading: "Travel Light: Luggage Storage Tips for Sydney Visitors",
      para: [
        "Travelling light is always a good idea, especially in a city like Sydney. Pack only what you need and leave the rest in a secure locker. With Urloker, you can access your luggage whenever you need, so you do not have to carry everything with you.",
      ],
      list: [
        "Pack essentials and store the rest.",
        "Use luggage storage to travel lighter.",
        "Access your bags easily when needed.",
      ],
    },
    {
      type: "h4",
      heading: "Are There Luggage Storage Options for Groups?",
      para: [
        "Travelling with a group? Urloker offers spacious lockers that can accommodate multiple bags, making group storage simple and affordable. Whether you are travelling with family or friends, our luggage storage solutions have you covered.",
      ],
      list: [
        "Spacious lockers for group luggage.",
        "Ideal for families or friends travelling together.",
        "Affordable and easy to book.",
      ],
    },
    {
      type: "h4",
      heading: "Explore Sydney's Hidden Gems After Storing Your Bags",
      para: [
        "Once your bags are safely stored, it is time to uncover Sydney's hidden gems. Visit places like the Royal Botanic Garden, Watsons Bay, or take a stroll through Glebe's markets. Sydney is full of off-the-beaten-path treasures waiting to be discovered all the better when you are not carrying heavy bags.",
      ],
      list: [
        "Royal Botanic Garden: Relax and enjoy nature.",
        "Watsons Bay: Beautiful views and seafood.",
        "Glebe Markets: Unique finds and local crafts.",
        "Bondi Beach: Famous for golden sands, surfing and the scenic Bondi to Coogee walk.",
        "Queen Victoria Building: A heritage shopping destination with luxury boutiques and cafes.",
        "Art Gallery of NSW: Home to Australian and international art collections in a stunning setting.",
        "Hyde Park: A historic green space perfect for relaxing and people-watching.",
        "Luna Park Sydney: Retro fun and Harbour Bridge views at this iconic amusement park.",
        "Wendy's Secret Garden: A hidden gem offering tranquillity and iconic harbour views.",
      ],
    },
    {
      type: "h3",
      heading:
        "Why Hassle-Free Whole Day Storage Is Ideal for Sydney Explorers",
      para: [
        "Book your luggage storage once and enjoy hassle-free storage for the entire day. With Urloker, you do not need to worry about dragging your bags everywhere, store your bags securely and make the most of your time exploring Sydney.",
      ],
      list: [
        "Store your bags for the whole day.",
        "Explore without the burden of luggage.",
        "Perfect for day trips or extended plans.",
      ],
    },
    {
      type: "h2",
      heading:
        "Make the Most of Your Sydney Adventure with Luggage Storage in Sydney",
      para: [
        "With Urloker, your luggage worries are a thing of the past. Explore Sydney with total freedom, knowing your bags are safe and secure. Whether you are heading to iconic landmarks, hidden gems or just enjoying a carefree day, Urloker is here to make it all possible. Book your locker now and make unforgettable memories without the hassle of carrying your baggage.",
        "Sydney is a city meant to be explored, not burdened by luggage. With Urloker's affordable and secure luggage storage options, you can enjoy everything Sydney has to offer, from iconic landmarks to hidden gems, with total freedom. Book your locker today, travel light and explore Sydney without the extra weight. With Urloker, experience the freedom in every journey because every step you take should be about the adventure, not the baggage.",
      ],
    },
  ];
  return (
    <div>
      {/*  SEO Header */}
      <Helmet>
        <title>Secure and Affordable Luggage Storage Sydney - Urloker</title>
        <meta
          property="og:title"
          content="Secure and Affordable Luggage Storage Sydney - Urloker"
        />
        <meta
          name="description"
          content="Secure luggage storage Sydney at Urloker. Store your bags safely and explore the city hands free. Multiple convenient locations available."
        />
        <meta name="keywords" content="luggage-storage-sydney" />
        <meta
          property="og:url"
          content="https://urloker.com/luggage-storage-sydney"
        />
        <meta
          property="og:description"
          content="Secure luggage storage Sydney at Urloker. Store your bags safely and explore the city hands free. Multiple convenient locations available."
        />
        <link
          rel="canonical"
          href="https://urloker.com/luggage-storage-sydney"
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
                alt="luggage storage Sydney"
                loading="lazy"
              />
              <h1 className="text-4xl md:text-6xl font-bold my-4 text-green-800">
                Luggage storage Sydney
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
              alt="luggage storage sydney"
              loading="lazy"
            />
          </div>
        </header>
        <AttractionBox
          locationImage={locImage}
          me={"Sydney"}
          cityType="Sydney"
        />
        <main className="p-5 bg-white xl:px-52 w-full mx-auto space-y-10">
          {data.map((item, index) => {
            return (
              <Template
                key={index}
                heading={item.heading}
                type={item.type}
                para={item?.para || []}
                list={item?.list || []}
              />
            );
          })}
        </main>
        <FaqCard t={faqs} />
      </div>
    </div>
  );
}

export default SydneyStorage;
