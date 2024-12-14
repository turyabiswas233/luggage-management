import React, { useCallback, useRef, useState } from "react";
import { Helmet } from "react-helmet-async";
import config from "../../config";
const cbd = config.BUCKET_URL + "/files/city/adelaide/cbd.jpeg";
// const cbd ="/files/city/adelaide/cbd.jpeg";
const locImage = config.BUCKET_URL + "/files/city/adelaide/locationMap.png";
import { useTranslation } from "react-i18next";
import AttractionBox from "./AttractionBox";
import { Autocomplete, useJsApiLoader } from "@react-google-maps/api";
import { useNavigate } from "react-router-dom";
import FaqCard from "./FaqCard";
import Template from "./Template";

const libraries = ["places"];
const GOOGLE_MAPS_API_KEY = config.GOOGLE_API_KEY;

function Adelaide() {
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
      question: "What is Urloker, and how does it work in Adelaide?",
      answer:
        "Urloker is a convenient luggage storage service where you can securely store your bags while exploring Adelaide. Simply book online, drop off your luggage and enjoy your day hassle-free.",
    },
    {
      question: "Where is Urloker located in Adelaide?",
      answer:
        "Urloker offers central locations in Adelaide which is close to popular attractions and transport hubs like the Adelaide Train Station.",
    },
    {
      question: "Can I store my luggage overnight in Adelaide?",
      answer:
        "Yes, Urloker offers overnight storage for travellers who need flexibility in their schedules.",
    },
    {
      question: "What size of luggage can I store?",
      answer:
        "Urloker accepts bags of all sizes, from small backpacks to large suitcases.",
    },
    {
      question: "How do I book luggage storage in Adelaide?",
      answer:
        "Booking is quick and easy on the Urloker website. Choose your location, storage duration and pay securely online.",
    },
    {
      question: "Is there a limit to how long I can store my luggage?",
      answer:
        "Urloker offers both short-term and long-term storage solutions to fit your travel plans.",
    },
    {
      question: "Are there discounts for storing multiple bags?",
      answer:
        "Yes, Urloker provides discounts for storing multiple items. Check the website for special offers.",
    },
    {
      question: "Can I cancel or modify my booking?",
      answer:
        "Yes, Urloker offers flexible booking options with easy cancellations or modifications.",
    },
  ];
  const { searchPlaceholder, findLocationsButton } = translate?.heroSection;

  const schemaCode = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Luggage Storage Adelaide 24/7 - Urloker",
    image:
      "https://s3.ap-southeast-2.amazonaws.com/s3.urlocker.io/public/files/city/cbd/cbd.jpeg",
    "@id":
      "https://urloker.com/luggage-storage-adelaide/#LuggageStorageMelbourneCBD",
    url: "https://urloker.com/luggage-storage-adelaide",
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
      heading: "Secure and Affordable Luggage Storage in Adelaide with Urloker",
      para: [
        "Adelaide is a city with endless possibilities, from gorgeous parklands, vibrant arts scene to bustling shopping streets. But nothing spoils a perfect day faster than having to drag your bags around while you explore. Urloker is here to make sure that your luggage does not weigh you down so you can enjoy all that Adelaide has to offer. Let's dive into why Urloker is the perfect partner for your adventure.",
      ],
    },
    {
      type: "h2",
      heading:
        "Why Finding Reliable Luggage Storage in Adelaide Is a Game-Changer",
      para: [
        "Imagine arriving in Adelaide early in the morning, bags in tow, but your accommodation is not ready yet. It is a typical travel hassle, but it does not have to be. Finding a secure place to store your luggage is a game-changer that frees you up to explore, go sightseeing or even attend meetings without the burden of heavy bags. It is all about turning what could be an inconvenience into an opportunity. At Urloker, we provide a convenient, secure and reliable place for you to leave your luggage so that you can start making memories the moment you arrive. With your bags securely stored, you can focus on enjoying everything Adelaide has to offer.",
      ],
      list: [
        "Frees you from the burden of heavy bags.",
        "Let you start exploring right away.",
        "Allows you to attend meetings without hassle.",
        "Turns potential inconvenience into an opportunity.",
        "Perfect for day trips or stopovers.",
        "Provides peace of mind.",
        "Lets you shop without limits.",
        "Ensures flexibility in your schedule.",
      ],
    },
    {
      type: "h2",
      heading: "Urloker - Your Handy Solution for Luggage Storage in Adelaide",
      para: [
        "<a href='https://urloker.com'>Urloker</a> is designed with one mission: to take the load off your shoulders (literally). We offer centrally located luggage storage in Adelaide that is secure and easy to access. Whether you are a backpacker, a family on holiday or someone passing through for the day, our services cater to all types of travellers. Flexibility is key when you are on the move, which is why Urloker offers short-term and long-term storage options to fit your schedule perfectly. With Urloker, you will have peace of mind knowing your belongings are safe while you explore Adelaide without limits.",
      ],
      list: [
        "Centrally located for easy access.",
        "Secure and reliable storage options.",
        "Flexible short-term and long-term storage.",
        "Suitable for all types of travellers.",
        "No Hourly Fees.",
        "Whole-Day booking with a single fee.",
        "Unbeatable pricing.",
      ],
    },
    {
      type: "h3",
      heading:
        "Where Can I Store My Luggage in <a hrf='https://en.wikipedia.org/wiki/Adelaide'>Adelaide</a>?",
      para: [
        "We get it, finding the right place to leave your bags can be a bit of a headache. Fortunately, Urloker has several locations strategically placed in central Adelaide, near key attractions and transport hubs. Whether you need to store your luggage near Adelaide Train Station, Rundle Mall or any of the city’s highlights, Urloker’s got you covered. Our goal is to make sure you are never more than a few minutes away from safe and secure luggage storage.",
      ],
      list: [
        "Adelaide Train Station.",
        "Rundle Mall.",
        "North Terrace and other key attractions.",
        "Adelaide Central Market.",
        "Glenelg Beach.",
        "Victoria Square.",
      ],
    },
    {
      type: "h3",
      heading:
        "How Urloker Makes Luggage Storage in Adelaide Simple and Stress-Free",
      para: [
        "With Urloker, storing your <a href='https://en.wikipedia.org/wiki/Baggage'>luggage</a> in Adelaide is designed to be as smooth as possible. You can book your storage space online in minutes, making it easy to secure your spot even before you arrive. When you drop off your bags, you will find our staff friendly and the process seamless. We use secure lockers and monitored areas so that you do not have to worry about anything. That is right you can finally explore Adelaide with peace of mind.",
      ],
      list: [
        "Fast and easy online booking process.",
        "Central locations close to main attractions.",
        "Secure lockers and monitored storage areas.",
        "Flexible options where you can book for a few hours or an entire day with no extra fees.",
        "Affordable prices tailored to different needs.",
      ],
    },
    {
      type: "h4",
      heading: "Adelaide City Highlights You Can Explore Without Carrying Bags",
      para: [
        "Adelaide is full of amazing places to visit but carrying bags around can turn excitement into exhaustion. When you store your luggage with Urloker, you are free to discover the gems of this beautiful city without any baggage-related stress. Spend the afternoon wandering around Rundle Mall, take a walk through the Adelaide Botanic Garden or explore the cultural heart of Adelaide on North Terrace all without worrying about your belongings. There is so much to see and do and we want to make sure you enjoy every bit of it. From iconic landmarks to hidden gems, Urloker ensures your hands are free and your focus is on making the most of your time.",
      ],
      list: [
        "Rundle Mall.",
        "Adelaide Botanic Garden.",
        "North Terrace cultural precinct.",
        "Adelaide Central Market.",
        "Adelaide Oval.",
        "Glenelg Beach.",
        "Victoria Square.",
      ],
    },
    {
      type: "h3",
      heading:
        "Safe and Secure: What Makes Urloker’s Luggage Storage Reliable?",
      para: [
        "We understand that safety is your top priority when it comes to leaving your luggage with someone. Urloker takes security seriously, offering both lockers and monitored storage spaces. We have installed CCTV cameras, strong locks and maintain vigilance to ensure your belongings are well-protected. You can drop off your bags knowing that they are in good hands allows you to enjoy your time in Adelaide without a single worry.",
      ],
      list: [
        "CCTV cameras for 24/7 monitoring",
        "Secure lockers with strong locks",
        "Staff vigilance and safety protocols",
      ],
    },
    {
      type: "h3",
      heading:
        "Affordable Luggage Storage Options in Adelaide – Tailored for Travellers",
      para: [
        "Travel can get expensive, and the last thing you need is overpriced luggage storage. Urloker offers some of the most competitive rates in Adelaide, with flexible options to suit everyone. Whether you are looking for a few hours or an entire day’s storage, we provide cost-effective solutions that fit your travel budget.",
      ],
      list: [
        "Flat Rate for All-Day Storage: Store your luggage for an entire day with just one affordable fee with no hourly charges and no hidden costs.",
        "Same Fee for All Bag Sizes: Whether it is a small backpack or oversized luggage, you pay the same low rate for all sizes.",
        "Unbeatable Value: Get high-quality, secure luggage storage at the best prices in Adelaide.",
      ],
    },
    {
      type: "h4",
      heading: "What Types of Bags Can You Store with Urloker in Adelaide?",
      para: [
        "One of the great things about Urloker is that we accommodate all sorts of luggage. Whether you are carrying a small backpack, a suitcase or even oversized items like sports equipment, we have got you covered.",
      ],
      list: [
        "Small backpacks and day bags.",
        "Carry-on luggage.",
        "Full-sized suitcases.",
        "Oversized items (subject to availability)",
      ],
    },
    {
      type: "h4",
      heading:
        "Urloker’s Flexible Luggage Storage Timings to Suit Your Schedule",
      para: [
        "We know that travel does not always go according to plan. That is why Urloker offers flexible timings to accommodate your schedule. Whether you need early-morning drop-off or late-night collection, our storage options are there to suit your needs. Many of our locations are open from early morning until late evening and makes it easier for you to plan your day around what is most important: enjoying Adelaide.",
      ],
      list: [
        "Early-morning drop-offs.",
        "Late-evening collections.",
        "Open during peak hours to suit your schedule.",
      ],
    },
    {
      type: "h2",
      heading:
        "Quick Access: Find Luggage Storage Near Adelaide Central Locations",
      para: [
        "Being central is what makes Urloker super convenient for anyone visiting Adelaide. Our locations are positioned close to transport links and major tourist attractions, meaning you are never far from the action. If you need to catch a bus, hop on a tram, or get to a landmark, rest assured there is a Urloker storage nearby.",
      ],
      list: [
        "Adelaide Train Station",
        "Main bus and tram stops",
        "Close proximity to popular landmarks",
      ],
    },
    {
      type: "h4",
      heading: "How Urloker Helps You Enjoy Adelaide Hassle-Free",
      para: [
        "There is nothing quite like exploring a city without feeling bogged down by your luggage. With Urloker, you can finally travel light and focus on the experience. Whether that is grabbing lunch at the Central Market or snapping photos at Glenelg Beach. We are here to help make your visit as enjoyable as possible and travelling light is a big part of that.",
      ],
      list: [
        "Securely store all luggage types.",
        "Enjoy Adelaide's attractions bag-free.",
        "Convenient pick-up and drop-off services.",
        "Flexible Storage Durations.",
        "Affordable Flat-Rate Pricing",
        "Seamless and instant Online Booking process.",
      ],
    },
    {
      type: "h4",
      heading:
        "Need a Last-Minute Storage Solution? Try Urloker’s Instant Service",
      para: [
        "Sometimes, plans change and you need a quick fix. Urloker’s instant booking service allows you to store your bags without any hassle. No matter where you are in Adelaide, you can quickly find a storage location, book it online and drop off your bags within minutes. This flexibility is perfect for those last-minute changes in plans that often come with travel.",
      ],
      list: [
        "Last-minute booking made it easy with our fast and secure booking process.",
        "Find storage quickly online.",
        "Drop off bags within minutes.",
        "Flexible Timing Options",
      ],
    },
    {
      type: "h4",
      heading: "Day Trips from Adelaide? Stash Your Luggage and Go Explore",
      para: [
        "Adelaide isn’t just a city to see — it’s also a gateway to some incredible day trips. Whether you’re heading out to the Barossa Valley for wine tasting, exploring the wildlife of Kangaroo Island, or checking out Hahndorf, you don’t want luggage slowing you down. Leave your bags with Urloker and enjoy a hassle-free day trip beyond the city that will create unforgettable memories.",
      ],
      list: [
        "Barossa Valley for wine tasting",
        "Kangaroo Island for wildlife",
        "Hahndorf for a quaint German village experience",
        "McLaren Vale for scenic vineyards",
        "Victor Harbor to experience whale watching, penguin spotting, and breathtaking coastal scenery.",
        "Fleurieu Peninsula for relaxing on pristine beaches, enjoy water activities and savor delicious seafood.",
      ],
    },
    {
      type: "h3",
      heading: "Why Adelaide Visitors Trust Urloker for Luggage Storage Needs",
      para: [
        "Travellers love Urloker because we put convenience, security and affordability at the forefront. We have served countless visitors and our goal is always the same to provide a seamless luggage storage experience. Whether it is our easy booking system, central locations or attentive customer support, we make sure you are in good hands.",
      ],
      list: [
        "Easy-to-use booking system",
        "Strategic central locations",
        "Attentive and friendly customer support",
        "Proven track record of customer satisfaction",
      ],
    },
    {
      type: "h3",
      heading:
        "Secure Storage Near Adelaide Train Station: No More Bag Worries",
      para: [
        "Arriving or departing by train? Do not worry about dragging your bags along. Urloker has a storage location conveniently situated near Adelaide Train Station, giving you easy access to leave or retrieve your belongings as you move in and out of the city. This allows you to make the most of your time, whether that is catching a last minute attraction or simply enjoying the city before your departure.",
      ],
      list: [
        "Convenient for early arrivals or late departures",
        "Easy drop-off and pick-up for train travellers",
        "Save time and explore more without luggage",
      ],
    },
    {
      type: "h4",
      heading: "Can't Check In Yet? Store Your Bags with Urloker and Relax",
      para: [
        "Early arrivals can be tricky, especially when your accommodation is not ready for check-in. Instead of sitting in a cafe with all your luggage, use Urloker to store your bags and make the most of your time in Adelaide. With our easy storage solutions, you can dive straight into your Adelaide adventure.",
      ],
      list: [
        "Make the most of early arrivals",
        "Enjoy the city instead of waiting",
        "Convenient and secure storage",
      ],
    },
    {
      type: "h4",
      heading: "Urloker’s Storage Facilities: Safety Meets Convenience",
      para: [
        "At Urloker, our storage facilities are designed with both safety and convenience in mind. Our lockers and storage areas are secure, clean and easily accessible. We make sure your luggage is safe while also providing a convenient drop-off and pick-up process. It is all part of making your travel as smooth and enjoyable as possible.",
      ],
      list: [
        "Clean and secure storage areas",
        "Easy drop-off and pick-up process",
        "Well-maintained lockers for all luggage sizes",
      ],
    },
    {
      type: "h2",
      heading:
        "How to Book Luggage Storage in Adelaide with Urloker in Minutes",
      para: [
        "Booking with Urloker is incredibly easy. Head to our website, choose a location, select your storage duration and book securely online. The whole process takes just a few minutes and you will receive a confirmation with all the details you need. When you arrive, simply drop off your luggage and you are ready to explore Adelaide bag-free.",
      ],
      list: [
        "Visit our website.",
        "Choose your preferred location.",
        "Select the storage duration.",
        "Pay securely online.",
        "Drop off your luggage and enjoy Adelaide.",
      ],
    },
    {
      type: "h3",
      heading: "Perfect for Backpackers: Affordable Storage in Adelaide",
      para: [
        "If you want backpacking through Adelaide, Urloker is an ideal solution for budget travellers looking for an affordable place to store their gear. We offer competitive pricing that ensures you get to spend more on experiences and less on storage. Plus, with our central locations, it is easy to grab your bag and move on to the next adventure.",
      ],
      list: [
        "Budget-friendly storage options.",
        "Central locations for easy access.",
        "Secure and reliable storage for all your gear.",
      ],
    },
    {
      type: "h4",
      heading: "Travelling with Family? Urloker Has Room for Everyone’s Bags",
      para: [
        "Family trips can mean lots of luggage and carrying all those bags while exploring Adelaide is no fun. Urloker provides ample storage options for families so that you can store everything from the kids backpacks to your big suitcases. Spend your day making memories rather than managing bags.",
      ],
      list: [
        "Room for all family members bags.",
        "Safe and convenient storage.",
        "Focus on family activities, not luggage.",
        "Affordable flat rates that make family travel easier on your budget.",
      ],
    },
    {
      type: "h3",
      heading: "Is Urloker the Best Luggage Storage Option in Adelaide?",
      para: [
        "When it comes to luggage storage, Urloker stands out for all the right reasons such as affordability, convenience and security. Our customers love the ease of booking, our strategic locations across Adelaide and the peace of mind that comes from knowing their belongings are safe. We are confident that once you use Urloker, you will see why we are the best option for luggage storage in Adelaide.",
      ],
      list: [
        "Affordable and competitive rates.",
        "Easy booking and central locations.",
        "High level of security and customer satisfaction.",
        "Hassle-Free Service ensures quick drop offs and pick ups ensure your travel plans remain uninterrupted.",
        "No Extra Fees for Sizes so you have flexibility to store anything from small backpacks to oversized luggage at the same flat rate.",
      ],
    },
    {
      type: "h2",
      heading: "What Makes Urloker Unique for Luggage Storage in Adelaide?",
      para: [
        "Urloker is not just about storage but it is also about making your experience in Adelaide enjoyable and hassle-free. We focus on providing the best customer experience by offering easy online bookings, secure facilities and friendly customer service. Our goal is to make your journey seamless from the moment you arrive until the time you leave Adelaide.",
      ],
      list: [
        "Exceptional customer service",
        "User-friendly online booking platform",
        "Secure facilities that give peace of mind",
        "Commitment to a hassle-free experience",
      ],
    },
    {
      type: "h3",
      heading: "How Much Does Luggage Storage in Adelaide Cost?",
      para: [
        "Urloker offers a fixed price for luggage storage in Adelaide, regardless of the size of your luggage. This means you can store any bag, big or small for one affordable daily rate. Our goal is to keep our service simple and affordable for all travellers. Check our website for the latest pricing details.",
      ],
      list: [
        "One flat rate for all luggage sizes",
        "No additional charges for oversized bags",
        "Affordable daily storage with no hidden fees",
      ],
    },
    {
      type: "h4",
      heading: "How Urloker Keeps Your Bags Safe While You Explore Adelaide",
      para: [
        "At Urloker, security is our priority. Our storage facilities are equipped with CCTV cameras, secure locks and trained staff to ensure that your belongings are always safe. We’ve taken all the steps to provide a secure environment so that you can enjoy Adelaide without a care in the world.",
      ],
      list: [
        "CCTV surveillance for monitoring",
        "Secure locks on all lockers",
        "Staff trained to ensure safety protocols",
      ],
    },
    {
      type: "h3",
      heading:
        "Discover Adelaide Without the Weight of Your Bags – Urloker’s Got Your Back",
      para: [
        "Whether it is a casual stroll along the River Torrens or a visit to Adelaide Oval, Urloker makes it possible to explore the city without dragging your luggage around. We provide a convenient, safe and affordable luggage storage solution that helps you make the most of your time in Adelaide.",
      ],
      list: [
        "Explore the River Torrens carefree",
        "Visit Adelaide Oval without baggage",
        "Make the most of your time, bag-free and enjoy freedom in every journey with Urloker.",
      ],
    },
  ];
  return (
    <div>
      {/*  SEO Header */}
      <Helmet>
        <title>Luggage Storage Adelaide 24/7 - Urloker</title>
        <meta
          property="og:title"
          content="Luggage Storage Adelaide 24/7 - Urloker"
        />
        <meta
          name="description"
          content="Luggage Storage Adelaide - Secure, affordable and convenient luggage storage at Urloker. Drop your bags and explore the city. Book online now."
        />
        <meta name="keywords" content="luggage-storage-adelaide" />
        <meta
          property="og:url"
          content="https://urloker.com/luggage-storage-adelaide"
        />
        <meta
          property="og:description"
          content="Luggage Storage Adelaide - Secure, affordable and convenient luggage storage at Urloker. Drop your bags and explore the city. Book online now."
        />
        <link
          rel="canonical"
          href="https://urloker.com/luggage-storage-adelaide"
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
                alt="luggage storage adelaide"
                loading="lazy"
              />
              <h1 className="text-4xl md:text-6xl font-bold my-4 text-green-800">
                Luggage Storage Adelaide
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
                      defaultValue={"Adelaide, Australia"}
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
              alt="luggage storage adelaide"
              loading="lazy"
            />
          </div>
        </header>
        <AttractionBox
          locationImage={locImage}
          me={"Adelaide"}
          cityType="Sydney"
        />

        <main className="p-5 bg-white xl:px-52 w-full mx-auto space-y-10">
          {data?.map((item, index) => {
            return (
              <Template
                heading={item.heading}
                type={item.type}
                para={item.para}
                list={item?.list || []}
              />
            );
          })}
        </main>
        <FaqCard t={faqs} title={"FAQs About Luggage Storage in Adelaide"} />
      </div>
    </div>
  );
}

export default Adelaide;
