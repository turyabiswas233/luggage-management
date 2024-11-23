import React, { useCallback, useRef, useState } from "react";
import { Helmet } from "react-helmet-async";
import config from "../../config";
const cbd = config.BUCKET_URL + "/files/city/cbd/cbd.jpeg";
const locImage = config.BUCKET_URL + "/files/city/cbd/locationMap.png";
import { useTranslation } from "react-i18next";
import { faMinusCircle, faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AttractionBox from "./AttractionBox";
import { Autocomplete, useJsApiLoader } from "@react-google-maps/api";
import { useNavigate } from "react-router-dom";
import Template from "./Template";
const libraries = ["places"];
const GOOGLE_MAPS_API_KEY = config.GOOGLE_API_KEY;

function MelbourneLocker() {
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

  const { searchPlaceholder, findLocationsButton } = translate?.heroSection;

  const schemaCode = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Luggage Lockers Melbourne - Urloker",
    image:
      "https://s3.ap-southeast-2.amazonaws.com/s3.urlocker.io/public/files/city/cbd/cbd.jpeg",
    "@id":
      "https://urloker.com/luggage-lockers-melbourne/#LuggageLockersMelbourne",
    url: "https://urloker.com/luggage-lockers-melbourne",
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

  const data = [
    {
      type: "h2",
      title:
        "Luggage Lockers Melbourne: Your Solution for Safe and Secure Storage",
      para: [
        "If you are exploring Melbourne and have bags you do not want to carry around,  Urloker has the perfect solution for you. Our luggage lockers in Melbourne  are the best way to store your belongings safely while you enjoy the city's vibrant culture without the hassle. In this article, I will walk you through everything you need to know about luggage lockers in Melbourne, from availability and pricing to why they are a lifesaver when exploring the city.",
      ],
    },
    {
      type: "h3",
      title: "Why You Need Luggage Locker in Melbourne",
      para: [
        "Urloker's luggage lockers in Melbourne provide you with the convenience of exploring the city without being weighed down by your bags. Imagine arriving in Melbourne early in the morning but your accommodation check-in is not until 3 PM. What do you do with all your luggage? Or maybe you are checking out but have an entire day to explore before your late-night flight. That is where our luggage lockers come to the rescue and gave you freedom to explore the city freely.",
      ],
    },
    {
      type: "h3",
      title: "Where to FInd Luggage Lockers in Melbourne",
      para: [
        "Melbourne has several convenient locations where you can drop off your bags. Train stations, bus stations and even popular tourist attractions offer luggage lockers. You can also rely on independent services like  <a href='https://urloker.com'>Urloker</a> for affordable, seamless, easy-to-use storage solutions that  are spread throughout the city. This way, you will always have a nearby place to keep your bags safe.",
      ],
    },
    {
      type: "h4",
      title: "How Luggage Lockers in Melbourne Work",
      para: [
        "Using a luggage locker is pretty straightforward and seamless. You just book a locker either online or on-site, drop your bags in, lock it securely and you are free to explore Melbourne.  We have made our process even easier by allowing you to reserve a locker in advance and ensuring there is a spot ready for your belongings exactly when you need it. Urloker's luggage storage lockers are designed for convenience so that you can focus on enjoying your trip rather than worrying about your bags.",
      ],
    },
    {
      type: "h2",
      title: "The Best Luggage Locker Locations in Melbourne",
      para: [
        "Melbourne is a big city, and it is important to have luggage lockers in key locations. Some of the best spots include Flinders Street Station, Southern Cross Station and key tourist hubs like Federation Square. <a href='http://urloker.com'>Urloker</a> offers convenient lockers close to major transit routes and iconic attractions making it ideal for travellers looking to store their luggage hassle-free.",
      ],
    },
    {
      type: "h3",
      title: "Safety Measures for Luggage Lockers in Melbourne",
      para: [
        "Safety is a top concern when it comes to leaving your belongings behind.  Urloker's luggage lockers in Melbourne have robust security measures, such as CCTV surveillance, secure locks and 24/7 monitoring so that you can relax and explore Melbourne knowing that your items are under reliable protection and are in safe hands. With Urloker, you are not just storing luggage but also you are safeguarding your peace of mind.",
      ],
    },
    {
      type: "h3",
      title: "How to Book Luggage Lockers in Melbourne",
      para: [
        "Booking luggage lockers in Melbourne is simple and can be done in advance online. With  Urloker, you can choose a locker booking according to your needs, specify the booking duration and reserve it all from your smartphone. You can also book from on-site if you prefer a spontaneous storage option by simply scanning the Qr code. This makes the whole process super convenient and helps avoid last-minute stress. With clear pricing and flexible booking options, Urloker has made it simple to secure your bags and provides you the flexibility to enjoy your day.",
      ],
    },
    {
      type: "h4",
      title: "Luggage Lockers Melbourne: Affordable and Flexible Rates",
      para: [
        "When it comes to luggage storage, price matters. Urloker offers competitive rates with flexible booking options allowing you to store your luggage for the whole day with a simple booking. This flexibility is perfect for those who need a quick stop-off for a few hours or long-term storage for extended city exploration without worrying about hourly charges.",
      ],
    },
    {
      type: "h4",
      title: "Benefits of Using Luggage Lockers in Melbourne",
      para: [
        "Urloker luggage lockers in Melbourne provide multiple benefits that make them a smart choice:",
      ],
      list: [
        "<b>Convenience: </b>Store your bags and explore without the burden.",
        "<b>Security: </b>Lockers  are monitored and secure.",
        "<b>Flexibility: </b>Book for as long as you need whether it is an hour or a whole day without any additional hourly costs.",
        "<b>Affordability: </b>Save on the cost compared to airport or hotel luggage holding",
        "<b>Flat Rate: </b>Size does not matter to us. You can book any size with a flat rate, ensuring you get the space you need without extra costs.",
        "<b>24/7 Customer Support: </b>Our team is available around the clock to assist you with any questions or concerns.",
      ],
    },
    {
      type: "h3",
      title: "Best Luggage Lockers Near Melbourne Attraction",
      para: [
        "Urloker provides luggage lockers near many Melbourne attractions, such as the Melbourne Museum, Queen Victoria Market, and the Royal Botanic Gardens. This allows you to make the most of your trip without worrying about lugging your bags around.",
      ],
    },
    {
      type: "h3",
      title: "Melbourne Airport Luggage Lockers and Alternatives",
      para: [
        "If you are coming directly from the airport, luggage lockers in the city are a great alternative to expensive airport storage. With convenient  Urloker locations downtown, you can easily store your bags, catch a ride and start your adventure without extra costs.",
      ],
    },
    {
      type: "h4",
      title: "Luggage Lockers Melbourne: Available Sizes",
      para: [
        "Depending on what you need to store, luggage lockers in Melbourne come in a variety of sizes.  Urloker offers everything from small compartments for backpacks to larger lockers for suitcases all available at a flat rate regardless of size so that you are covered no matter what kind of luggage you have.",
      ],
    },
    {
      type: "h5",
      title: "Short Term vs Long Term Luggage Lockers in Melbourne",
      para: [
        "Whether you need to store your luggage for a few hours or several days,  Urloker provides options for both short-term and long-term use. With lockers accessible 24/7, your bags  are always available when you need them.",
      ],
    },
    {
      type: "h4",
      title: "How to Find the Right Luggage Locker for Your Needs",
      para: [
        "Choosing the right luggage locker in Melbourne depends on factors like size, location and price.  Urloker offers a range of options, from small backpacks to oversized suitcases, all at convenient locations and flexible rates, ensuring there is something for everyone.",
      ],
    },
    {
      type: "h4",
      title: "Luggage Lockers vs Hotel Storage in Melbourne",
      para: [
        "Using luggage lockers in Melbourne offers more flexibility compared to hotel storage. Hotel luggage rooms might be limited to guests or have restricted hours whereas Urloker luggage lockers  are available 24/7",
      ],
    },
    {
      type: "h3",
      title: "How Luggage Lockers in Melbourne Make Travel Stress-Free",
      para: [
        "Imagine a day without having to carry your heavy bags around. With Urloker's luggage lockers, you can visit multiple attractions in Melbourne without worrying about the extra weight and paying extra money. This kind of freedom makes for a much more enjoyable travel experience.",
      ],
    },
    {
      type: "h4",
      title: "Luggage Storage for Events in Melbourne",
      para: [
        "Melbourne is known for its fantastic events, from sports games at the MCG to cultural festivals like White Night. With  Urloker's luggage lockers, you can attend these events without the hassle of dragging your luggage around. This is particularly helpful for those who have just arrived in the city and want to dive into the action right away. Our strategically placed lockers mean you can securely store your belongings and enjoy Melbourne's famous events without stress.",
      ],
    },
    {
      type: "h5",
      title: "How  Urloker Supports Melbourne Tourism",
      para: [
        "Tourism is the lifeblood of Melbourne, and  Urloker is proud to be part of making every tourist's journey more enjoyable. With our luggage lockers, travellers can make the most of their time exploring the city laneways, shopping districts, and iconic spots. By providing accessible, affordable and safe storage options, we enhance the overall visitor experience, contributing to Melbourne's reputation as one of the world's most tourist-friendly cities.",
      ],
    },
    {
      type: "h3",
      title: "Family-Friendly Luggage Lockers in Melbourne",
      para: [
        "If you are travelling with your family and managing everyone's luggage then this can be a daunting task.  Urloker's luggage lockers  are designed with family needs in mind. We offer spacious lockers where you can store multiple bags, strollers or even sports equipment. This means you can take your family to attractions like the Melbourne Zoo or Scienceworks without feeling burdened by extra items. Let the kids enjoy the day without the hassle of carrying everything around!",
      ],
    },
    {
      type: "h4",
      title: "Using Luggage Lockers to Explore Melbourne's Food Scene",
      para: [
        "Melbourne is a food lover's paradise, with countless cafes, restaurants and street food vendors. However, enjoying a culinary tour is not quite as fun if you are carrying heavy bags.  Urloker's luggage lockers let you stow your belongings so you can dive into Melbourne's food scene. Picture yourself wandering through Queen Victoria Market, sampling gourmet cheeses, fresh oysters and artisanal bread all without bags weighing you down.",
      ],
    },
    {
      type: "h3",
      title: "Perfect for Backpackers: Affordable Luggage Lockers in Melbourne",
      para: [
        "Backpackers flock to Melbourne for its vibrant energy and endless adventure.  Urloker offers luggage lockers that  are perfect for backpackers needing affordable storage options. You can book a locker for as long as you need which gives you the freedom to explore the city or head out on a day trip without carrying all your belongings. Our lockers  are ideally placed near backpacker hostels, making them easy to access whenever needed.",
      ],
    },
    {
      type: "h3",
      title: "Business Travellers and Luggage Lockers in Melbourne",
      para: [
        "Melbourne is also a hub for business, attracting professionals from around the globe.  Urloker's luggage lockers  are a great asset for business travellers who need a place to store their bags before or after meetings. Instead of lugging a suitcase into a conference, store it in a secure and convenient Urloker locker and focus on making your business trip a success. Our lockers  are located near major business centres and hotels, offering convenience and ease of access.",
      ],
    },
    {
      type: "h4",
      title: "Flexible Luggage Lockers for Sporting Enthusiasts",
      para: [
        "Melbourne is a sports city through and through. From tennis tournaments at Melbourne Park to footy at the MCG, sports enthusiasts have plenty to look forward to. If you are coming from out of town to catch a game, Urloker's luggage lockers  are a perfect solution for storing your bags, sports gear or even a change of clothes. This means you can head straight from the airport or train station to the event without the hassle of your luggage.",
      ],
    },
  ];

  const faqs = [
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
  return (
    <div>
      {/*  SEO Header */}
      <Helmet>
        <title>Luggage Lockers Melbourne - Urloker</title>
        <meta
          property="og:title"
          content="Luggage Lockers Melbourne - Urloker"
        />
        <meta
          name="description"
          content="Urloker offers secure and affordable luggage lockers in Melbourne. Store your bags and explore the city hands free. Freedom in every journey"
        />
        <meta name="keywords" content="luggage-lockers-melbourne" />
        <meta
          property="og:url"
          content="https://urloker.com/luggage-lockers-melbourne"
        />
        <meta
          property="og:description"
          content="Urloker offers secure and affordable luggage lockers in Melbourne. Store your bags and explore the city hands free. Freedom in every journey"
        />
        <link
          rel="canonical"
          href="https://urloker.com/luggage-lockers-melbourne"
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
                alt="Luggage Lockers Melbourne"
                loading="lazy"
              />
              <h1 className="text-4xl md:text-6xl font-bold my-4 text-green-800">
                Luggage Lockers Melbourne
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
                      defaultValue={"Melbourne, Australia"}
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
              alt="luggage lockers melbourne"
              loading="lazy"
            />
          </div>
        </header>
        <AttractionBox
          locationImage={locImage}
          me={"Luggage Lockers Melbourne"}
        />
        <main className="p-5 bg-white xl:px-52 w-full mx-auto">
          {data.map((item, index) => (
            <Template
              key={index}
              heading={item.title}
              type={item.type}
              para={item?.para}
              list={item?.list || []}
            />
          ))}
          <FaqCard t={faqs} />
          <Template
            heading={"Plan Your Day with Luggage Lockers in Melbourne"}
            type={"h2"}
            para={[
              "You can enjoy Melbourne to the fullest when you do not have to worry about your luggage. With  Urloker luggage lockers, drop your bags off and start making memories right away. Visit all the iconic spots like St. Kilda Beach, Queen Victoria Market, Melbourne Zoo, South Bank, Docklands without having your luggage slowing you down. Your bag awaits, no rush.",
            ]}
            list={[]}
          />
          <Template
            heading={"Choose  Urloker for Luggage Storage in Melbourne"}
            type={"h2"}
            para={[
              "Urloker is more than just a place to store your bags. We are here to help you have the best possible experience in Melbourne. Our conveniently located, secure and affordable luggage lockers  are designed with travellers in mind, whether you are here for a day or a month. Forget about lugging bags around, and focus on what really matters for enjoying everything this amazing city has to offer. With  Urloker, Melbourne is yours to explore, free and unburdened. Enjoy freedom in every journey with Urloker.",
            ]}
            list={[]}
          />
        </main>
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
      <h3 className="text-center font-bold text-2xl my-5">FAQs</h3>
      <div className="space-y-5 divide-y-3 divide-slate-800">
        {t.map((faq, index) => (
          <div
            key={index}
            className={`p-2 md:p-4 min-h-fit transition-all ease-out duration-1000 h-full ${
              openFAQ == index ? "max-h-52 overflow-y-auto" : "max-h-20"
            }`}
          >
            <h3
              className="text-xl font-bold text-gray-700 cursor-pointer flex items-center justify-between"
              onClick={() => toggleFAQ(index)}
            >
              {faq.question}
              {openFAQ == index ? (
                <FontAwesomeIcon icon={faMinusCircle} />
              ) : (
                <FontAwesomeIcon icon={faPlusCircle} />
              )}
            </h3>
            {openFAQ == index && (
              <div
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

export default MelbourneLocker;
