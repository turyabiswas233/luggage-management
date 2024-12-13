import React, { useCallback, useRef, useState } from "react";
import { Helmet } from "react-helmet-async";
import config from "../../config";
const cbd = config.BUCKET_URL + "/files/city/mcs/mcs.jpeg";
// import cbd from "/files/city/mcs/mcs.jpeg";

const locImage = config.BUCKET_URL + "/files/city/cbd/locationMap.png";
import { useTranslation } from "react-i18next";
import AttractionBox from "./AttractionBox";
import { Autocomplete, useJsApiLoader } from "@react-google-maps/api";
import { useNavigate } from "react-router-dom";
import FaqCard from "./FaqCard";
import Template from "./Template";
const libraries = ["places"];
const GOOGLE_MAPS_API_KEY = config.GOOGLE_API_KEY;
const content = [
  {
    title:
      "Stress Free Luggage Storage Melbourne Central Station: Safe, Convenient and Affordable",
    type: "h2",
    para: [
      "Luggage Storage Melbourne Central Station: Safe, Convenient and Affordable",
    ],
  },
  {
    title: "The Struggle with Luggage at Melbourne Central Station",
    type: "h4",
    para: [
      "Navigating the bustling streets around luggage storage Melbourne central station with luggage is no picnic. The crowds, the trams and the narrow sidewalks make it a challenge. Trust me, I have felt the strain of hauling bags through the busy city centre and it is not fun.",
    ],
  },
  {
    title: "Why Carrying Luggage Around Melbourne is a Hassle",
    type: "h4",
    list: [
      "<b>Limited Mobility:</b> Carrying bags slows you down and makes it hard to enjoy spontaneous activities. With hands full of luggage, it becomes nearly impossible to make spontaneous stops at interesting shops, parks or street performances that Melbourne is famous for.",
      "<b>Security Concerns:</b> Worrying about the safety of your belongings distracts from your experience and makes it difficult for you to enjoy the moment.",
      "<b>Physical Strain:</b> Lugging heavy bags can lead to fatigue and even injury. Hauling heavy bags is not just uncomfortable but also it can lead to back, neck, or shoulder pain, especially if you are covering long distances. Navigating through crowded areas or getting on and off trams becomes exhausting and this strain can leave you too tired to fully enjoy your day.",
      "<b>Restricted Access:</b> Some attractions and venues do not allow large bags inside. This means that you might find yourself turned away from remarkable destinations like galleries, theatres or busy eateries just because of your luggage.",
    ],
  },
  {
    title: "The Importance of Luggage Storage at Melbourne Central Station",
    type: "h3",
    para: [
      "So, what is the solution? Finding reliable luggage storage near Melbourne central station is a game changer. It allows you to explore freely, without the burden of your bags.",
    ],
  },
  {
    title: "Why Luggage Storage at Melbourne Central Station is Essential",
    type: "h4",
    list: [
      "<b>Freedom to Explore:</b> Imagine being able to explore Melbourne's vibrant streets without the burden of luggage slowing you down. Without bags, you can fully immerse yourself in the city's offerings.",
      "<b>Peace of Mind:</b> Knowing your luggage is safe lets you relax and enjoy your day. Whether you are enjoying a performance at the Melbourne Arts Centre or losing track of time in a quirky bookshop, the peace of mind that your belongings are secure makes every experience richer. You are here to make memories but not keep watch over your bags.",
      "<b>Convenient Access:</b> Store your bags  right at Melbourne central station with Urloker and retrieve them when needed . This convenience lets you move seamlessly from one part of your itinerary to another and gives you more freedom to fully experience all that Melbourne has to offer.",
      "<b>FMaximise Time:</b> Especially useful during layovers or before hotel check-in. You can now make the most of every moment. For example you can catch that early museum tour, grab breakfast at that cozy cafe or spend an hour exploring Federation Square. Time in a new city is very precious so it is important to make sure you use every minute wisely.",
    ],
  },
  {
    title:
      "Urloker: Your Solution for Luggage Storage at Melbourne Central Station",
    type: "h3",
    para: [
      "At Urloker, We offer a hassle-free way to store your luggage near luggage storage Melbourne central station. We understand the needs of travellers because we have been there ourselves looking to explore the beauty of travelling without being weighed down by bags that is why we are here to offer you a seamless luggage storage solution.",
    ],
  },
  {
    title:
      "What Makes Our Luggage Storage Near Melbourne Central Station Stand Out?",
    type: "h4",
    list: [
      "<b>Proximity: </b> We are just minutes away from the station, making drop-off and pick-up a breeze. Whether you are arriving by train or need quick access to your belongings before heading to the airport, we are always right where you need us.",
      "<b>Affordable Rates:</b> We believe in transparent and fair pricing which means no hidden fees, just competitive rates that let you enjoy Melbourne without worrying about your budget. Spend more on experiences and less on storage, knowing you're getting the best value.",
      "<b>Flexible Hours:</b>  Open early and close late to fit your schedule. Whether you are starting your adventure early in the morning or wrapping up a late night out, our flexible hours mean you have one less thing to worry about. Best thing is you can book your luggage for the whole day with a single booking fee.  Our pay per bag per day policy makes it easier for our guests to get the freedom they want.",
      "<b>Secure Facilittes:</b> Your belongings are safe with us. Our secure storage facilities feature monitoring policy and safety measures that give you complete peace of mind. Travel confidently, knowing your bags are safe with us.",
    ],
  },
  {
    title: "Secure Luggage Storage Facilities at Melbourne Central Station",
    type: "h3",
    para: ["Your belongings are safe with us."],
    list: [
      "<b>Top-Notch Security Features</b>",
      [
        "Modern Equipment: Up to date security technology ensures maximum protection. <br />Strict Protocols: Only authorised personnel can access the storage area. <br />Fire Safety Measures: Our facility is equipped with fire alarms and extinguishers.",
      ],
      "<b>Regular Maintenance</b>",
      [
        " Clean and Organised: We maintain a tidy environment for your comfort.",
        "Pest Control: Regular inspections to keep the facility pest free.",
      ],
    ],
  },
];
function MelbourneCentral() {
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

  const schemaCode = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Luggage Storage Melbourne Central Station - Urloker",
    image:
      "https://s3.ap-southeast-2.amazonaws.com/s3.urlocker.io/public/files/city/cbd/cbd.jpeg",
    "@id":
      "https://urloker.com/luggage-storage-melbourne-central-station/#SouthernCrossStationLuggageStorage",
    url: "https://urloker.com/luggage-storage-melbourne-central-station",
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
        <title>Luggage Storage Melbourne Central Station - Urloker</title>
        <meta
          property="og:title"
          content="Luggage Storage Melbourne Central Station - Urloker"
        />
        <meta
          name="description"
          content="Looking for Luggage Storage Melbourne Central Station? Urloker provides secure and affordable storage—enjoy the city without extra baggage"
        />
        <meta name="keywords" content="luggage-storage-melbourne-cbd" />
        <meta
          property="og:url"
          content="https://urloker.com/luggage-storage-melbourne-central-station"
        />
        <meta
          property="og:description"
          content="Looking for Luggage Storage Melbourne Central Station? Urloker provides secure and affordable storage—enjoy the city without extra baggage"
        />
        <link
          rel="canonical"
          href="https://urloker.com/luggage-storage-melbourne-central-station"
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
                alt="Luggage Storage Melbourne Central Station"
                loading="lazy"
              />
              <h1 className="text-4xl md:text-6xl font-bold my-4 text-green-800">
                Luggage Storage Melbourne Central Station
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
                      defaultValue={"Melbourne Central Station, Australia"}
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
              alt="Luggage Storage Melbourne Central Station"
            />
          </div>
        </header>
        <AttractionBox
          locationImage={locImage}
          me={"Luggage Storage Melbourne Central Station"}
           cityType="Melbourne"
        />
        <main className="p-5 bg-white xl:px-52 w-full mx-auto">
          {content.map((item, index) => (
            <Template
              key={index}
              heading={item.title}
              type={item.type}
              para={item.para}
              list={item?.list || []}
            />
          ))}
        </main>
      </div>
    </div>
  );
}

export default MelbourneCentral;
