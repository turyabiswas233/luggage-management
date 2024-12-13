import React, { useCallback, useRef, useState } from "react";
import { Helmet } from "react-helmet-async";
import config from "../../config";
// const cbd = config.BUCKET_URL + "/files/city/cbd/cbd.jpeg";
const cbd = "/files/city/goldcoast/cbd.jpg";

const locImage = config.BUCKET_URL + "/files/city/cbd/locationMap.png";
import { useTranslation } from "react-i18next";
import AttractionBox from "./AttractionBox";
import { Autocomplete, useJsApiLoader } from "@react-google-maps/api";
import { useNavigate } from "react-router-dom";
import FaqCard from "./FaqCard";
import Template from "./Template";

const libraries = ["places"];
const GOOGLE_MAPS_API_KEY = config.GOOGLE_API_KEY;

function GoldCoast() {
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
        "How secure are Urloker’s luggage storage services in Gold Coast?",
      answer:
        "Your safety is our priority. We use modern locker systems, CCTV and secure access protocols.",
    },
    {
      question: "Can I store my luggage for more than one day?",
      answer:
        "Absolutely. Urloker offers flexible storage durations to suit your needs.",
    },
    {
      question: "What payment methods do you accept?",
      answer:
        "We accept all major payment methods, making it easy and convenient for everyone.",
    },
    {
      question: "Is luggage storage near Gold Coast beaches available?",
      answer:
        "Yes, we have locations close to popular beaches so that you can enjoy the sun without worrying about your bags.",
    },
    {
      question: "How do I find the nearest Urloker location?",
      answer:
        "Use our website or app to locate the nearest storage spot in seconds.",
    },
    {
      question: "Can I book luggage storage in advance?",
      answer:
        "Yes, we recommend pre-booking during peak seasons to secure your spot.",
    },
    {
      question: "Are there any prohibited items I can’t store?",
      answer:
        "Yes, items like perishables, hazardous materials and illegal goods are not allowed.",
    },
    {
      question: "Can I cancel my booking if my plans change?",
      answer:
        "Yes, we have a flexible cancellation policy to accommodate your changing plans.",
    },
  ];
  const { searchPlaceholder, findLocationsButton } = translate?.heroSection;

  const data = [
    {
      type: "h2",
      heading: "Hassle Free Luggage Storage in Gold Coast with Urloker",
      para: [
        "Welcome to your ultimate guide for everything you need to know about luggage storage in Gold Coast. Whether you are soaking in the sun at Surfers Paradise, exploring the iconic Hinterland or enjoying the vibrant culture downtown, Urloker has you covered for secure, hassle-free luggage storage. Travelling is all about freedom and we are here to ensure you get to experience Gold Coast without the burden of carrying heavy bags. Travel light, explore more and experience the freedom to enjoy Gold Coast at its best.",
      ],
    },
    {
      type: "h3",
      heading:
        "Why Gold Coast Visitors Love Luggage Storage Services at Urloker",
      para: [
        "Gold Coast is a top destination, attracting millions of visitors each year, and it is easy to see why. From stunning beaches to thrilling theme parks, there is so much to explore but lugging your bags around a definite no go. Luggage storage services in Gold Coast at Urloker let you drop your bags off and fully enjoy your day without worrying about your stuff. Smart travellers know the value of freedom, leave your bags with us and make every minute count.",
      ],
      list: [
        "No more lugging heavy bags around.",
        "Enjoy freedom to explore the city with ease.",
        "Perfect for day-trippers and layover travellers.",
      ],
    },
    {
      type: "h2",
      heading:
        "What Is Luggage Storage <a href='https://en.wikipedia.org/wiki/Gold_Coast,_Queensland'>Gold Coast</a>, and How Does It Work?",
      para: [
        "If you are new to the idea of luggage storage, no worries—we'll break it down. Luggage storage is just like it sounds: a secure space where you can leave your bags for a short period while you explore. Urloker offers a simple, easy-to-use solution for luggage storage in Gold Coast. Just book online, drop off your bags at one of our convenient locations, and set out on your Gold Coast adventure without the weight on your shoulders.",
      ],
      list: [
        "Easy booking online or through our app.",
        "Convenient drop-off locations across Gold Coast.",
        "Flexible hours to match your travel schedule.",
      ],
    },
    {
      type: "h2",
      heading: "Why Choose Urloker for Luggage Storage in Gold Coast?",
      para: [
        "Urloker is not just a luggage storage service. It is a trusted partner in making your trip smooth and stress-free. With competitive rates, easy booking and locations near all major Gold Coast attractions, we are here to offer convenience like no other. Our customer-first approach and state of the art security are just a few of the reasons visitors keep coming back to Urloker.",
      ],
      list: [
        "Affordable prices with no hidden fees.",
        "Flat Rate for All Luggage Sizes.",
        "No Hourly Fees and offers storage for the entire day with a single booking fee.",
        "Convenient Locations which are strategically located near Gold Coast’s top attractions.",
        "Customer-first service, always ready to help.",
        "Comprehensive security measures for peace of mind.",
      ],
    },
    {
      type: "h3",
      heading:
        "Where Can You Find Urloker’s Luggage Storage Locations in Gold Coast?",
      para: [
        "Wondering where to find us? Urloker’s luggage storage locations are strategically placed throughout Gold Coast so you can easily drop off your bags wherever you are. We are close to popular beaches, bustling shopping areas and major transport hubs, making it convenient for you to store your luggage and go enjoy the sights.",
      ],
      list: [
        "Locations near Surfers Paradise and Main Beach.",
        "Close to major transit hubs for easy access.",
        "Storage points at shopping and entertainment areas.",
      ],
    },
    {
      type: "h3",
      heading: "Affordable and Transparent Luggage Storage in Gold Coast",
      para: [
        "At Urloker, we offer simple and competitive pricing for luggage storage in Gold Coast. Our flat rates come with no hidden fees, ensuring you know exactly what you are paying. Experience the best value and peace of mind with Urloker's straightforward pricing.",
      ],
      list: [
        "Fixed Price for Luggage Storage: Enjoy a consistent, flat rate without any surprises.",
        "No Hidden Fees: What you see is what you pay and there are no additional charges.",
        "Best Value in Gold Coast: Our competitive rates make us the top choice for luggage storage.",
      ],
    },
    {
      type: "h4",
      heading: "Travelling Light: The Perks of Dropping Off Your Bags",
      para: [
        "Travelling light is not just a luxury but also it is a game changer. Dropping off your luggage at Urloker’s storage points allows you to explore without feeling weighed down. Whether you are hitting up the theme parks or heading out for a day hike, not having to drag your luggage along means you can be spontaneous and flexible with your plans.",
      ],
      list: [
        "Freedom to change plans without worrying about your bags.",
        "Easier access to attractions that do not allow large items.",
        "A true hands-free holiday experience.",
      ],
    },
    {
      type: "h3",
      heading: "Who Can Benefit from Luggage Storage in Gold Coast?",
      para: [
        "Luggage storage is not just for tourists. Business travellers, backpackers, day-trippers and even locals can benefit from Urloker’s services. If you have a few hours to kill before your flight or just need somewhere",
      ],
    },
    {
      type: "h3",
      heading: "Who Can Benefit from Luggage Storage in Gold Coast?",
      para: [
        "Luggage storage is not just for tourists. Business travellers, backpackers, day-trippers and even locals can benefit from Urloker’s services. If you have a few hours to kill before your flight or just need somewhere",
      ],
      list: [
        "Tousists wanting to explore without baggage.",
        "Business travellers needing to store bags during meetings.",
        "Backpackers looking for a secure spot while they wander.",
      ],
    },
    {
      type: "h3",
      heading:
        "Is My Luggage Safe with Urloker for Luggage Storage in Gold Coast?",
      para: [
        "Your belongings are precious, and we get it. That is why safety is our top priority at Urloker. Our storage facilities are equipped with modern locker systems, 24/7 CCTV and secure access protocols. You can travel worry-free, knowing that your belongings are in safe hands.",
      ],
      list: [
        "Secure lockers with staff monitoring.",
        "24/7 CCTV monitoring at all locations.",
        "Regular security checks for additional peace of mind.",
      ],
    },
    {
      type: "h3",
      heading: "Top Attractions Near Our Gold Coast Luggage Storage Locations",
      para: [
        "Urloker’s locations are strategically chosen so you can store your luggage and start exploring right away. With our storage spots near popular attractions, you can visit the best spots in Gold Coast without any baggage hassle.",
      ],
      list: [
        "Surfers Paradise Beach: Iconic golden sands and great vibes.",
        "SkyPoint Observation Deck: Amazing views from up high.",
        "Cavill Avenue: Perfect for shopping and entertainment.",
      ],
    },
    {
      type: "h2",
      heading: "Benefits of Luggage Storage in Gold Coast with Urloker",
      para: [
        "Urloker is not just another storage service. We are designed to make your travel experience seamless, offering a range of perks that go beyond basic storage.",
      ],
      list: [
        "Safety First: State of the art security measures to protect your belongings.",
        "Affordable Rates: Save money while enjoying top-notch service.",
        "Accessibility: Easily reachable from public transport hubs.",
        "No Hidden Fees: Transparent pricing with no surprises.",
      ],
    },
    {
      type: "h4",
      heading: "What Can I Store with Urloker in Gold Coast?",
      para: [
        "It is not just suitcases that you can store. Urloker accommodates all kinds of items whether it is your backpack, shopping bags or even odd-sized items like surfboards. If it fits in our lockers, it is good to go.",
      ],
      list: [
        "Suitcases of all sizes.",
        "Backpacks and carry-ons.",
        "Sports equipment like surfboards and beach gear.",
      ],
    },
    {
      type: "h4",
      heading:
        "What Makes Urloker Different from Other Luggage Storage Services?",
      para: [
        "Urloker stands out for a lot of reasons. We are not just about storing your luggage but also we are about making your experience seamless, secure and affordable. Our competitive rates, excellent customer service and convenient locations are just a few reasons travellers choose us.",
      ],
      list: [
        "Customer-first approach, always ready to help.",
        "Simple booking process with no hidden charges.",
        "Strategically located storage for ultimate convenience.",
      ],
    },
    {
      type: "h3",
      heading: "How to Book Luggage Storage with Urloker in Gold Coast",
      para: [
        "Booking with Urloker is as easy as pie. You can make a reservation online via our website or through our app. Choose the location that suits you, select the storage time, and you are all set. It is as simple as click, drop and go.",
      ],
      list: [
        "Visit our website or download the Urloker app.",
        "Select your desired location and storage time.",
        "Book in seconds and enjoy a stress-free day.",
      ],
    },
    {
      type: "h4",
      heading: "What Happens If You Need to Access Your Stored Luggage?",
      para: [
        "Need to access your stuff in the middle of the day. No problem. Urloker makes it super easy to get into your locker whenever you need. Just drop by the location, show your booking details and grab what you need and it is that simple.",
      ],
      list: [
        "Access during opening hours for convenience.",
        "Easy locker and access anytime.",
        "No extra charges for accessing your belongings.",
      ],
    },
    {
      type: "h4",
      heading: "Can I Store My Bags Overnight in Gold Coast?",
      para: [
        "Yes, you can. Urloker offers overnight storage which is perfect if you are catching a late flight or want to keep your bags safe while you explore the nightlife. Drop off your luggage and enjoy Gold Coast without any stress.",
      ],
      list: [
        "Overnight storage options available.",
        "Secure and monitored throughout the night.",
        "Convenient for late flights or early checkouts.",
      ],
    },
    {
      type: "h3",
      heading:
        "Travelling with Kids? Why Luggage Storage in Gold Coast Is a Game-Changer",
      para: [
        "Travelling with little ones can be challenging, and juggling bags does not make it easier. With Urloker’s luggage storage, you can drop off your bags and focus on what matters most, making memories with your family. Enjoy Gold Coast’s theme parks and beaches hands-free.",
      ],
      list: [
        "Free up your hands to manage your little ones.",
        "Less stress and more fun for family adventures.",
        "Access your bags easily when you need.",
      ],
    },
    {
      type: "h3",
      heading: "Last-Minute Luggage Storage Options in Gold Coast",
      para: [
        "Life is unpredictable and travel plans change. With Urloker, you can book storage even at the last minute. Whether you suddenly need a safe spot for your bags or a layover turned into an all day adventure, Urloker’s here for you.",
      ],
      list: [
        "Instant bookings available online or via app.",
        "Convenient locations for quick drop off.",
        "Flexible timings to suit your needs.",
      ],
    },
    {
      type: "h4",
      heading: "Planning a Day Trip from Gold Coast? Leave Your Bags Behind",
      para: [
        "Day trips are exciting but lugging bags can ruin your day. If you are planning to explore nearby destinations like Byron Bay or Brisbane, just leave your luggage with Urloker and make the most of your time without any extra weight on your back.",
      ],
      list: [
        "Perfect for day trips to Byron Bay or Hinterland.",
        "No hassle of carrying bags on public transport.",
        "Enjoy your day, luggage-free.",
      ],
    },
    {
      type: "h3",
      heading: "Can I Trust Urloker for Luggage Storage in Gold Coast?",
      para: [
        "Absolutely. Urloker’s lockers are built for security and convenience. Our modern, high-tech locker systems ensure that your belongings are safe. With features like secure access and constant surveillance, you can leave your luggage knowing it is in good hands.",
      ],
      list: [
        "Modern lockers.",
        "24/7 CCTV coverage for all storage points.",
        "Regular maintenance checks for your safety.",
      ],
    },
    {
      type: "h4",
      heading: "What Are the Alternatives to Luggage Storage in Gold Coast?",
      para: [
        "There are not many good alternatives to luggage storage but you might consider options like leaving bags at a hotel or trying self-storage units. However, these options often come with higher costs and less flexibility compared to a dedicated luggage storage service like Urloker.",
      ],
      list: [
        "Hotels: Expensive and often limited to guests.",
        "Self-storage: Complicated and not ideal for short-term.",
        "Urloker: Affordable, flexible and perfectly convenient.",
      ],
    },
    {
      type: "h4",
      heading: "How Luggage Storage Helps Digital Nomads in Gold Coast",
      para: [
        "Digital nomads, rejoice. If you are working remotely while exploring Gold Coast, Urloker can be a game changer. Drop your bags off at a secure location, grab your laptop and work from a beachside cafe or a co-working space hands-free and stress-free.",
      ],
      list: [
        "Perfect for remote workers needing mobility.",
        "Secure your equipment while you work or explore.",
        "Make the most of work-life balance without the baggage.",
      ],
    },
    {
      type: "h4",
      heading: "Common Mistakes to Avoid When Using Luggage Storage",
      para: [
        "To get the best out of your luggage storage experience, make sure you avoid common pitfalls like forgetting to check opening hours or not securing your booking in advance. A little planning goes a long way to ensure a smooth experience with Urloker.",
      ],
      list: [
        "Double-check opening and closing times.",
        "Secure your booking during peak seasons.",
        "Avoid storing prohibited items to prevent hassles.",
      ],
    },
    {
      type: "h3",
      heading:
        "Can Luggage Storage in Gold Coast Save You Money While Travelling?",
      para: [
        "Believe it or not, using luggage storage can actually save you money. Instead of paying for extra transport or carting your bags around on public transport, dropping them at Urloker allows you to explore efficiently. Less hassle, less expense that is a win win.",
      ],
      list: [
        "Save on taxi or Uber costs.",
        "Avoid paying for unnecessary hotel day rates.",
        "Enjoy attractions without extra storage fees.",
      ],
    },
    {
      type: "h2",
      heading:
        "Are There Any Weight or Size Limits for the Luggage Storage in Gold Coast with Urloker?",
      para: [
        "Urloker prides itself on flexibility and that includes accommodating a variety of luggage sizes. Whether you have a small carry on or a massive suitcase, we have got a spot for you. Just make sure to check our guidelines for specific size and weight limitations.",
      ],
      list: [
        "Accommodate a wide range of luggage sizes.",
        "No extra charges for larger items just book the right size.",
        "Clear guidelines for size and weight on our website.",
      ],
    },
    {
      type: "h2",
      heading: "Experience the Best Luggage Storage in Gold Cost with Urloker",
      para: [
        "Exploring the vibrant Gold Coast is a delight but managing your luggage can be a hassle. Whether you are between accommodations, have a late flight or simply want to enjoy the city unencumbered, finding a reliable luggage storage solution is essential. Urloker offers convenient and secure luggage storage options throughout the Gold Coast and allows you to make the most of your visit without the burden of heavy bags.",
        "Using Urloker is straightforward and hassle free. Visit our website to locate the nearest storage point in Gold Coast, reserve your spot through our user-friendly online system and drop off your bags at the chosen location. With flexible storage options, affordable pricing and robust security measures, Urloker ensures your belongings are safe so that you can explore the city with peace of mind. Do not let your luggage hold you back and experience Gold Coast unburdened with Urloker.",
      ],
    },
  ];

  const schemaCode = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Luggage Storage Gold Coast - Urloker",
    image:
      "https://s3.ap-southeast-2.amazonaws.com/s3.urlocker.io/public/files/city/cbd/cbd.jpeg",
    "@id":
      "https://urloker.com/luggage-storage-gold-coast/#LuggageStorageMelbourneCBD",
    url: "https://urloker.com/luggage-storage-gold-coast",
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
        <title>Luggage Storage Gold Coast - Urloker</title>
        <meta
          property="og:title"
          content="Luggage Storage Gold Coast - Urloker"
        />
        <meta
          name="description"
          content="Secure and affordable luggage storage in Gold Coast with Urloker. Store any bag size at a flat rate and explore the city hands free."
        />
        <meta name="keywords" content="luggage-storage-gold-coast" />
        <meta
          property="og:url"
          content="https://urloker.com/luggage-storage-gold-coast"
        />
        <meta
          property="og:description"
          content="Secure and affordable luggage storage in Gold Coast with Urloker. Store any bag size at a flat rate and explore the city hands free."
        />
        <link
          rel="canonical"
          href="https://urloker.com/luggage-storage-gold-coast"
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
                alt="luggage storage gold coast"
                loading="lazy"
              />
              <h1 className="text-4xl md:text-6xl font-bold my-4 text-green-800">
                Luggage Storage Gold Coast
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
                      defaultValue={"Gold Coast, Australia"}
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
              alt="luggage storage gold coast"
              loading="lazy"
            />
          </div>
        </header>
        <AttractionBox
          locationImage={locImage}
          me={"Sydney Gold Coast"}
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

        <FaqCard t={faqs} title={"FAQs: Luggage Storage Gold Coast"} />
      </div>
    </div>
  );
}

export default GoldCoast;
