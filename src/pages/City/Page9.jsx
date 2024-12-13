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

function SydneyCircularQuay() {
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
      question: "Where exactly is Urloker located near Circular Quay?",
      answer:
        "We are just a short walk from Circular Quay’s main attractions, making it easy to store and retrieve your luggage.",
    },
    {
      question: "Can I store oversized items like surfboards or strollers?",
      answer:
        "Yes, we cater to oversized and unusual luggage  just let us know in advance.",
    },
    {
      question: "How secure is the storage facility?",
      answer:
        "We use advanced security systems and ensure your belongings are in safe hands.",
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
    name: "Luggage Storage Sydney Circular Quay - Urloker",
    image:
      "https://s3.ap-southeast-2.amazonaws.com/s3.urlocker.io/public/files/city/cbd/cbd.jpeg",
    "@id":
      "https://urloker.com/luggage-storage-sydney-circular-quay/#LuggageStorageSydneyCircularQuay",
    url: "https://urloker.com/luggage-storage-sydney-circular-quay",
    telephone: "+61 3 7035 5653",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Circular Quay",
      addressRegion: "NSW",
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
        "Convenient Luggage Storage at Sydney Circular Quay with Urloker",
      para: [
        "Looking for an easy way for Luggage Storage at Sydney Circular Quay? Urloker has you covered with convenient luggage storage options right at Sydney Circular Quay. No more lugging heavy bags around as you navigate this iconic part of the city – simply drop them off with us, and make the most of your day.",
        "Whether you are heading to the Opera House, taking a ferry to Manly or enjoying the vibrant atmosphere around Circular Quay, Urloker has you covered. Our secure and affordable luggage storage service at Circular Quay is perfectly positioned to help you explore worry-free. Let’s explore what makes Urloker the top choice for luggage storage in this stunning part of Sydney.",
      ],
      list: [],
    },
    {
      type: "h3",
      heading:
        "Why Circular Quay is the Perfect Spot for Luggage Storage with Urloker",
      para: [
        "Circular Quay is only just a transit hub but also a gateway to some of Sydney’s most famous attractions. Storing your luggage with Urloker here means you are right in the middle of all the action from the Harbour Bridge to the historic Rocks district. Urloker at Circular Quay offers unmatched convenience for travellers who want to get out and explore without worrying about their belongings.",
        "Why is Circular Quay such an ideal location for luggage storage?",
      ],
      list: [
        "Proximity to key Sydney landmarks like the Opera House, Royal Botanic Garden, and Museum of Contemporary Art.",
        "Easy access to ferries, buses, and trains, allowing you to move effortlessly around Sydney.",
        "Surrounded by cafes, restaurants, and shops perfect for spending time if you are between activities.",
        "Ferry to Manly and Beyond. If you are planning a ferry ride to Manly or other destinations, having your hands free from luggage makes the journey all the more enjoyable.",
      ],
    },
    {
      type: "h2",
      heading:
        "What Makes Urloker the Best Luggage Storage at Sydney Circular Quay?",
      para: [
        "At Urloker, we understand that travellers need security, convenience and affordability that is what sets us apart. Our luggage storage facility at Circular Quay is equipped with all the features you need to feel at ease while you explore Sydney.",
        "Why choose Urloker for Luggage Storage Sydney Circular Quay?",
      ],
      list: [
        "Secure Storage: We take your security seriously with advanced monitoring systems and tamper-proof lockers.",
        "Prime Location: Situated in the heart of Circular Quay, our storage facilities are easily accessible.",
        "Quick and Easy Drop-Off: Our luggage storage process is seamless and hassle-free. Simply book online, drop off your bags and get on with enjoying all that Sydney has to offer. No long queues or complicated procedures, just a smooth, efficient experience.",
        "Affordable Rates: We offer some of the most competitive rates in Sydney and give you great value without compromising on quality and security. Enjoy the convenience of secure luggage storage without breaking the bank.",
        "Flexible Storage Options: Whether you are looking to store your luggage for a few hours or several days, we have got a solution for you.",
      ],
    },
    {
      type: "h3",
      heading:
        "The Importance of Convenient Luggage Storage for Travellers at Sydney Circular Quay",
      para: [
        "Travelling, while exciting, comes with challenges, especially when you need to manage bulky suitcases. With Urloker's convenient luggage storage in Circular Quay, you will have the freedom to explore comfortably. Convenience is key for travellers, and we are all about giving you the flexibility to move around freely whether you are arriving early, leaving late or just looking to lighten your load while sightseeing. Our storage options are designed for flexibility, giving you more time to immerse yourself in the vibrant sights and experiences of Sydney.",
      ],
      list: [],
    },
    {
      type: "h3",
      heading:
        "How to Find Urloker For Luggage Storage at <a href='https://en.wikipedia.org/wiki/Circular_Quay'>Sydney Circular Quay</a>",
      para: [
        "Finding <a href='https://urloker.com'>Urloker</a> at Sydney Circular Quay is a breeze. You can use our website to easily locate all our nearest storage locations, ensuring you find the most convenient spot for your needs. We are centrally located so you can drop off your bags and head straight out to explore all that Sydney has to offer from the Sydney Opera House to the bustling promenade.",
        "Here is how to find us:",
      ],
      list: [
        "Landmark Directions: We are just a short walk from Circular Quay train station, right by the ferry terminal.",
        "Easy Access: Look for our distinctive blue signage near George Street. If you’re coming from the Opera House side, follow the signs to Circular Quay West.",
        "Walking Distance: Close to both the train station and the Overseas Passenger Terminal, making it ideal if you are arriving by cruise or train.",
      ],
    },
    {
      type: "h4",
      heading: "Planning Your Day Around at Sydney Circular Quay",
      para: [
        "Circular Quay is bustling with activities and attractions, and it is easy to fill your day once you have stored your luggage safely with us. Let's take a look at some of the things you can do without heavy bags weighing you down.",
      ],
      list: [
        "Sydney Opera House: Just a five minutes walk away, take a guided tour or enjoy a show.",
        "Royal Botanic Garden: Relax and enjoy the greenery while taking in the Harbour views.",
        "Ferries to Manly or Taronga Zoo: Hop on a ferry and see Sydney from a different angle.",
        "The Rocks Market: Explore this historic area with local stalls, artisans and live music every weekend.",
        "Sydney Harbour Bridge: Take a stroll across the iconic Harbour Bridge or join a bridge climb for breathtaking views of Sydney's skyline.",
        "Museum of Contemporary Art Australia (MCA): Located just minutes from Circular Quay, the MCA offers an impressive collection of modern art exhibitions to explore.",
        "Circular Quay Promenade: Wander along the promenade and enjoy the vibrant atmosphere, street performers and spectacular views of Sydney Harbour.",
        "Barangaroo Reserve: This waterfront park is perfect for a peaceful walk or a picnic, offering impressive views of the city and harbour.",
        "Dawes Point Park: Capture stunning panoramic views of the Harbour Bridge and Opera House from this location.",
        "Customs House: Discover Sydney’s rich history at Customs House, featuring an intricate model of the city beneath a glass floor as well as exhibitions and events.",
      ],
    },
    {
      type: "h3",
      heading:
        "Affordable Luggage Storage at Sydney Circular Quay to Fit Any Budget",
      para: [
        "At Urloker, we believe that luggage storage should be both straightforward and affordable. That's why we offer a fixed pricing model, ensuring you know exactly what to expect without any hidden fees.",
      ],
      list: [
        "Flat Rate: Enjoy a consistent, all-inclusive price for storing your luggage, regardless of size or weight.",
        "Flexible Duration: Whether you need storage for a few hours or several days, our fixed rate applies, providing excellent value for both short-term and long-term needs.",
        "No Hidden Costs: We pride ourselves on transparency. The price you see is the price you pay, with no additional charges.",
      ],
    },
    {
      type: "h3",
      heading:
        "Secure Luggage Storage at Sydney Circular Quay with Urloker - You Can Trust",
      para: [
        "Your belongings are important, and at Urloker, we make sure they are well looked after. Our Circular Quay luggage storage facility uses state of the art security features to keep your items safe, so you can enjoy Sydney without a care.",
      ],
      list: [
        "24/7 Surveillance: Our facility is monitored round the clock, providing an added layer of safety.",
        "Regular Staff Checks: Our staff conduct regular security checks to ensure everything remains in order.",
      ],
    },
    {
      type: "h4",
      heading: "How to Book Your Luggage Storage in Minutes",
      para: [
        "Booking with Urloker could not be simpler. You can reserve your luggage storage spot in just a few clicks, ensuring there is a spot ready for you when you arrive at Circular Quay.",
      ],
      list: [
        "Online Booking: Head over to <a href='https://urloker.com'>out website</a> and select Circular Quay as your location or simply click on find nearest locations. You will find all of our nearest locations and you can easily choose the best locations according to your convenience.",
        "Instant Confirmation: You will receive immediate confirmation, giving you peace of mind.",
        "Walk-Ins Welcome: While we recommend booking to secure your space, we also welcome walk-ins if we have availability. Simply scan the qr code from the store that will directly drag you to a particular booking page and then you can easily complete your booking through our secure booking process.",
      ],
    },
    {
      type: "h5",
      heading: "Why You Should not Carry Luggage Around Circular Quay",
      para: [
        "Carrying your bags as you explore Circular Quay is more hassle than it’s worth. Not only can heavy luggage make your day less enjoyable, but it can also restrict what you’re able to do.",
      ],
      list: [
        "Comfort and Safety: Navigating crowded areas with bulky bags is not only inconvenient but also it can also be unsafe.",
        "Freedom to Explore: Without bags, you can move freely, take the stairs, catch ferries and explore landmarks without worrying about your belongings.",
        "Better Experience: Taking photos, browsing shops and relaxing at cafes are all more enjoyable when you are not weighed down by luggage.",
      ],
    },
    {
      type: "h4",
      heading: "Explore Sydney Harbour Without Extra Baggage",
      para: [
        "Sydney Harbour is a must-see, and exploring it is so much better without having to worry about your bags. Storing your luggage with Urloker lets you fully appreciate all that this iconic location has to offer.",
      ],
      list: [
        "Take a Harbour Cruise: Enjoy uninterrupted views of Sydney’s skyline from the deck of a boat.",
        "Walk Across the Harbour Bridge: A great way to see the city from above without worrying about your baggage.",
        "Relax at Circular Quay Promenade: Take in the bustling atmosphere, watch the ferries and enjoy the street performers.",
        "Hop on a Ferry to Manly Beach: Take a scenic ferry ride to Manly Beach and enjoy the laid-back vibes, sun and surf without the burden of your luggage.",
        "Dine at Waterfront Restaurants: Savor delicious meals at one of the many waterfront restaurants or cafes in Circular Quay. Enjoy the fresh seafood while gazing out at the spectacular harbour views.",
      ],
    },
    {
      type: "h4",
      heading:
        "Flexible Luggage Storage Options for Travellers at Sydney Circular Quay with Urloker",
      para: [
        "We offer flexible storage solutions to cater to all kinds of travellers. With Urloker, you pay once and enjoy convenient storage for as long as you need, without worrying about time limits or luggage size.",
      ],
      list: [
        "Flat Rate Storage: Pay one fixed rate and enjoy convenient storage for as long as you need, regardless of luggage size or duration.",
        "Flexible Storage: Pay a one-time fee, and enjoy secure storage for as long as you need, without worrying about time limits or luggage size.",
        "Custom Storage Plans: Need something more specific? Contact Urloker to arrange a tailored storage solution that meets your unique needs.",
      ],
    },
    {
      type: "h3",
      heading: "Family-Friendly Luggage Storage for Sydney Visitors",
      para: [
        "Travelling with family, especially with young kids, can be a challenge but not when you use Urloker. We make it easy for families to store their luggage, allowing you to explore Sydney stress-free.",
      ],
      list: [
        "Stroller Storage: Securely store prams and strollers while you explore Sydney.",
        "Easy Accessibility: Our location is stroller-friendly and our lockers are at a convenient height for easy access.",
        "Family Discounts: We offer special discounts for families storing multiple bags.",
      ],
    },
    {
      type: "h3",
      heading:
        "Perfect for Backpackers and Budget Travellers Luggage Storage at Sydney Circular Quay",
      para: [
        "Backpackers and budget travellers will love our affordable luggage storage options at Circular Quay. We understand that travelling on a budget means making every dollar count, which is why we’ve designed our services to be accessible for everyone.",
      ],
      list: [
        "Low Rates: Urloker offers a flat rate which is only 7.90, our prices are unbeatable for luggage storage in Circular Quay.",
        "Flexible Timings: Store your backpack for just a couple of hours or for several days the choice is yours.",
        "Central Location: Our location means you are always close to transport and attractions, saving time and money on getting around.",
      ],
    },
    {
      type: "h4",
      heading: "Store Your Bags and Explore Iconic Landmarks",
      para: [
        "Sydney’s iconic landmarks are best experienced without the hassle of luggage. With your bags safely stored at Urloker, you can freely explore places like the Opera House, The Rocks and Darling Harbour.",
      ],
      list: [
        "Sydney Opera House: Just minutes from Circular Quay, this world-famous icon is a must-see.",
        "The Rocks: Discover the rich history of Sydney with cobblestone streets, historic pubs, and artisan markets.",
        "Museum of Contemporary Art: Immerse yourself in Australia’s modern art scene, just a stone’s throw from our location.",
      ],
    },
    {
      type: "h4",
      heading: "How We Handle Oversized or Special Items",
      para: [
        "Have something oversized or unusual to store? No problem. At Urloker, we can accommodate all sorts of items, from surfboards to musical instruments.",
      ],
      list: [
        "Advance Notice: Let us know in advance, and we’ll make sure we have the space you need.",
        "Special Storage Areas: We have designated areas for larger items that do not fit in our regular lockers.",
        "Extra Care: Our staff are experienced in handling delicate or oversized items with the utmost care.",
      ],
    },
    {
      type: "h3",
      heading:
        "What You Need to Know Before Storing Your Luggage at Sydney Circular Quay with Urloker",
      para: [
        "Before you store your luggage with Urloker, there are a few simple things to keep in mind to make the process seamless and easy.",
        "Here’s your checklist:",
      ],
      list: [
        "ID Required: Please bring a valid form of ID and booking details ready to store your luggage.",
        "Booking Ahead: While walk-ins are welcome, booking ahead is recommended to guarantee availability.",
        "Restricted Items: For safety reasons, we cannot store hazardous materials or illegal substances.",
      ],
    },
    {
      type: "h4",
      heading: "Flexible Drop-Off and Pick-Up Times for Your Convenience",
      para: [
        "We understand that travel plans can change, which is why we offer flexible drop-off and pick-up times. Whether you need to drop off early in the morning or pick up late at night, we work around your schedule.",
      ],
      list: [
        "Extended Hours: We are open early and close late, giving you the maximum time to enjoy your day.",
        "Size does not matter: Urloker offers a flat rate for all sizes of bags so that you do not need to worry about oversized bags.",
        "No Rush: We do not rush you take your time to explore Sydney, knowing your bags are in good hands.",
      ],
    },
    {
      type: "h4",
      heading: "Eco-Friendly Luggage Storage Practices at Urloker",
      para: [
        "At Urloker, we care about the environment and are committed to reducing our carbon footprint. Our luggage storage services at Circular Quay incorporate eco-friendly practices to help protect the planet.",
      ],
      list: [
        "Sustainable Materials: Our lockers are made from eco-friendly materials that are durable and reduce waste.",
        "Energy Efficiency: Our facilities are designed to use minimal energy, with LED lighting and energy-saving systems.",
        "Recycling Initiatives: We encourage recycling and ensure that any materials used in our facility are recycled properly.",
      ],
    },
    {
      type: "h5",
      heading: "What If Your Plans Change? Our Cancellation Policy",
      para: [
        "We understand that plans can change unexpectedly, and we want to make things as easy as possible for you. Our cancellation policy is designed to be fair and flexible.",
      ],
      list: [
        "Free Cancellations: Cancel up to 24 hours before your booking for a full refund.",
        "Flexible Changes: Need to change your drop off or pick up time? No problem, we will adjust your booking with no extra cost.",
        "Last-Minute Cancellations: If you need to cancel on the day, contact us, and we’ll do our best to accommodate you.",
      ],
    },
    {
      type: "h3",
      heading: "Digital Nomads Love Our Storage Solutions",
      para: [
        "If you are a digital nomad, Urloker’s luggage storage at Circular Quay is perfect for you. Keep your tech safe while you’re exploring, without the burden of carrying your laptop or equipment.",
      ],
      list: [
        "Safe Tech Storage: Secure lockers for laptops, cameras, and other digital equipment.",
        "Free Wi-Fi: Stay connected while you are in our facility, ideal for last-minute work tasks.",
        "Flexible Options: Store your gear for just a few hours while you get some sightseeing in or for several days while you explore Sydney.",
      ],
    },
    {
      type: "h3",
      heading: "The Hidden Gems Around Circular Quay Worth Visiting",
      para: [
        "Circular Quay is full of hidden gems that many travellers miss out on. With your luggage safely stored at Urloker, you can take your time to explore these lesser-known spots.",
      ],
      list: [
        "Cadmans Cottage: One of Sydney’s oldest surviving buildings, a fascinating glimpse into the past.",
        "First Fleet Park: A great place to relax away from the crowds, with beautiful harbour views.",
        "Glenmore Rooftop: A local favourite for views of the Harbour Bridge and Opera House without the hefty price tag.",
      ],
    },
    {
      type: "h3",
      heading: "Customer Safety First: Hygiene and Security Practices",
      para: [
        "Your safety is our top priority at Urloker. Our <a href='https://en.wikipedia.org/wiki/Baggage'>luggage</a> storage facility follows stringent hygiene and security practices to ensure your experience is not only convenient but also safe.",
      ],
      list: [
        "Regular Cleaning: All lockers and surfaces are cleaned regularly to maintain high hygiene standards.",
        "Contactless Service: We offer contactless drop-off and pick-up options for added safety.",
        "Trained Staff: Our staff are trained in the latest safety protocols to ensure your experience is smooth and secure.",
      ],
    },
    {
      type: "h3",
      heading:
        "From Cruise Ships to Land Adventures: Perfect for All Travellers",
      para: [
        "Whether you are arriving by cruise ship or spending a few days exploring Sydney, Urloker’s luggage storage at Circular Quay is perfect for all types of travellers.",
      ],
      list: [
        "Cruise Passengers: Drop your bags with us while you enjoy a day in Sydney before embarking.",
        "Day-Trippers: Store your luggage while you take in the sights around Circular Quay.",
        "Business Travellers: Make the most of your time in Sydney without being weighed down by your bags.",
      ],
    },
    {
      type: "h2",
      heading: "Why Choose Urloker for Circular Quay Luggage Storage?",
      para: [
        "Let’s recap why Urloker is your best choice for luggage storage at Circular Quay:",
      ],
      list: [
        "Convenient Location: Right by Sydney’s main attractions, making drop-off and pick-up a breeze.",
        "Affordable Rates: We have a fixed rate only at AUD 7.90, we offer the best value in Circular Quay.",
        "Secure and Reliable: Advanced security features ensure your belongings are always safe.",
        "Flexible Options: Whether short-term or long-term, we have a storage plan for everyone.",
        "Friendly Service: Our team is always here to help, making your experience as smooth as possible.",
      ],
    },
    {
      type: "h2",
      heading:
        "Ready to Store Your Luggage at Sydney Circular Quay with Urloker? Here is How to Get Started!",
      para: [
        "Ready to explore Sydney without the hassle of luggage? Getting started with Urloker is simple and straightforward.",
      ],
      list: [
        "Book Online: Visit <a href='https://urloker.com'>our website</a> and secure your storage spot today with just a few clicks.",
        "Drop Off Your Bags: Bring your luggage to our Circular Quay location and store it safely.",
        "Enjoy Sydney: Explore everything Circular Quay and beyond has to offer, free from baggage worries.",
      ],
    },
  ];
  return (
    <div>
      {/*  SEO Header */}
      <Helmet>
        <title>Luggage Storage Sydney Circular Quay - Urloker</title>
        <meta
          property="og:title"
          content="Luggage Storage Sydney Circular Quay - Urloker"
        />
        <meta
          name="description"
          content="Secure luggage storage at Sydney Circular Quay with flat-rate pricing and no size restrictions. Explore the city hands-free and worry-free."
        />
        <meta name="keywords" content="luggage-storage-sydney-circular-quay" />
        <meta
          property="og:url"
          content="https://urloker.com/luggage-storage-sydney-circular-quay"
        />
        <meta
          property="og:description"
          content="Secure luggage storage at Sydney Circular Quay with flat-rate pricing and no size restrictions. Explore the city hands-free and worry-free."
        />
        <link
          rel="canonical"
          href="https://urloker.com/luggage-storage-sydney-circular-quay"
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
                alt="luggage storage sydney circular quay"
                loading="lazy"
              />
              <h1 className="text-4xl md:text-6xl font-bold my-4 text-green-800">
                Luggage Storage Sydney Circular Quay
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
                      defaultValue={"Circular Quay, Australia"}
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
              alt="luggage storage sydney circular quay"
              loading="lazy"
            />
          </div>
        </header>
        <AttractionBox
          locationImage={locImage}
          me={"Sydney Circular Quay"}
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
          title={
            "FAQs: Everything You Need to Know About Luggage Storage at Sydney Circular Quay"
          }
        />
      </div>
    </div>
  );
}

export default SydneyCircularQuay;
