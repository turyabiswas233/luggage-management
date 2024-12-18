import React, { useState, useRef, useCallback } from "react";
import { Helmet } from "react-helmet-async";
import config from "../../config";
const cbd = config.BUCKET_URL + "/files/city/airport/airport.png";
const locImage = config.BUCKET_URL + "/files/city/airport/locationMap.png";
import { useTranslation } from "react-i18next";
import AttractionBox from "./AttractionBox";
import { useNavigate } from "react-router-dom";
import { Autocomplete, useJsApiLoader } from "@react-google-maps/api";
import FaqCard from "./FaqCard";

const libraries = ["places"];
const GOOGLE_MAPS_API_KEY = config.GOOGLE_API_KEY;

function AirportPage() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const translate = t("home");
  const [autocomplete, setAutocomplete] = useState(null);
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [loadingLocation, setLoadingLocation] = useState(false);
  const locationInputRef = useRef(null);
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: GOOGLE_MAPS_API_KEY,
    libraries: libraries,
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
      question: "What items are accepted for storage at Melbourne Airport?",
      answer:
        "We accept most types of luggage, from small bags to large suitcases and sports equipment. Contact us for specific inquiries.",
    },
    {
      question: " Is luggage storage at Melbourne Airport secure?",
      answer:
        "Yes, all storage facilities are monitored with CCTV and have secure access controls to ensure the safety of your belongings.",
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
    name: "Luggage Storage Melbourne Airport - Urloker",
    image:
      "https://s3.ap-southeast-2.amazonaws.com/s3.urlocker.io/public/files/city/airport/airport.png",
    "@id":
      "https://urloker.com/luggage-storage-melbourne-airport/#LuggageStorageMelbourneAirport",
    url: "https://urloker.com/luggage-storage-melbourne-airport",
    telephone: "+61 3 7035 5653",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Melbourne Airport",
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
    <div className="font-sans">
      {/*  SEO Header */}
      <Helmet>
        <title>Luggage Storage Melbourne Airport - Urloker</title>
        <meta
          property="og:title"
          content="Luggage Storage Melbourne Airport - Urloker"
        />
        <meta
          name="description"
          content="Secure, affordable luggage storage Melbourne Airport. Urlocker offers various sizes, flexible durations and easy booking for hassle free travel."
        />
        <meta name="keywords" content="luggage-storage-melbourne-airport" />
        <meta property="og:description" content="Melbourne Airport" />
        <meta
          property="og:url"
          href="https://urloker.com/luggage-storage-melbourne-airport"
        />
        <link
          rel="canonical"
          href="https://urloker.com/luggage-storage-melbourne-airport"
        />

        <script type="application/ld+json">
          {JSON.stringify(schemaCode, null, 2)}
        </script>
      </Helmet>
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
              alt="Luggage Storage Melbourne Airport"
              loading="lazy"
            />
            <h1 className="text-4xl md:text-6xl font-bold my-4 text-green-800">
              Luggage Storage Melbourne Airport
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
                    defaultValue={"Melbourne Airport VIC, Australia"}
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
            alt="Luggage Storage Melbourne Airport"
            loading="lazy"
          />
        </div>
      </header>

      <AttractionBox locationImage={locImage} me={"Melbourne Airport"}  cityType="Melbourne" />
      <main className="p-5 bg-white xl:px-52 w-full mx-auto">
        <div className="space-y-6 my-5">
          <h2 className="text-3xl font-bold">
            The most secure luggage storage Melbourne Airport - Urlocker
          </h2>
          <p>
            UrLocker is a Melbourne Airport luggage storage company that strives
            to offer affordable, safe, and practical solutions to customers'
            needs. The service's goal is clear: to enrich your experience. We
            have a cheap and secure space for all your things. Whether you are
            transferring for another flight or simply sightseeing for the day in
            Melbourne, we have covered your needs.
          </p>
        </div>
        <div className="space-y-6 my-5">
          <h2 className="text-3xl font-bold">
            Luggage Lockers Melbourne Airport at Urloker
          </h2>
          <p>
            Urlocker provides secure and accessible{" "}
            <a href="/" className="font-bold text-custom-teal-deep">
              luggage lockers
            </a>{" "}
            at Melbourne Airport, offering a convenient solution for travellers
            passing through. Located right within the terminal, these lockers
            make it easy to store your belongings, whether you're waiting for a
            flight or exploring Melbourne. With locker sizes ranging from small
            to large, UrLocker ensures every traveller can find a storage option
            that suits their needs.
            <br />
            <br />
            Urlocker's luggage lockers are available 24/7 and equipped with
            high-end security features like surveillance cameras and
            personalized locker codes. This allows travellers to store their
            items worry-free at an affordable price.
          </p>
        </div>
        <div className="space-y-6 my-5">
          <h3 className="text-2xl font-bold">Convenience and Access</h3>
          <p>
            Our luggage storage Melbourne Airport facility is hassle-free for
            all passengers regardless of the terminal used. On arrival, on
            departure or just in transit, time wasters and excess spending will
            be the least of your concerns.
            <br />
            <br />
            We provide an inexpensive solution to access appropriate bag storage
            facilities that will give you a chance to be unapologetically
            committed to your voyage sans the extra travel bags. The aim is to
            enhance your travel experience and make your things available
            wherever you want them whenever you feel the advantage of having
            them around.
          </p>
          <ul>
            <h4 className="font-bold text-black">Key Features:</h4>
            <ul className="list-disc px-10 text-lg">
              <li>Positioned inside the airport terminal for easy access</li>
              <li>Clear and visible signage across all major airport roads</li>
              <li>
                Open 24/7 to accommodate early-morning or late-night flights
              </li>
              <li>
                Competitive pricing with discounts available for long-term stays
                as well as frequent travellers
              </li>
            </ul>
          </ul>
        </div>
        <div className="space-y-6 my-5">
          <h2 className="text-3xl font-bold">
            Adaptable and Inexpensive Facilities for Luggage Storage Melbourne
            Airport
          </h2>
          <article className="space-y-3">
            <p>
              We treat our clients uniquely since we appreciate that they have
              different requirements and financial capabilities. For that
              reason, we have different levels of storage options, which exceed
              twenty in number. These categories offer various luggage sizes as
              well as different luggage storage durations, all at very
              affordable rates unique for luggage storage Melbourne airport. Our
              flexible style helps to find suitable storage for each customer,
              as it is easy for a backpacker with one bag and a family with
              several bags too.
            </p>
            <ul>
              <h4 className="font-bold text-black">Storage Sized:</h4>
              <ul className="list-disc px-10 text-lg">
                <li>
                  Small lockers for personal items and carry-on bags. For
                  day-trippers or light packers
                </li>
                <li>
                  Medium stock for personal standard cases. For a troubler or a
                  couple of people, only
                </li>
                <li>
                  Ample storage space for very large or two or more bags. For
                  any family travelling together
                </li>
                <li>
                  Competitive pricing with discounts available for long-term
                  stays as well as frequent travellers
                </li>
              </ul>
            </ul>
            <ul>
              <h4 className="font-bold text-black">Duration Options:</h4>
              <ul className="list-disc px-10 text-lg">
                <li>Hourly</li>
                <li>Daily</li>
                <li>Weekly</li>
                <li>Monthly</li>
                <li>Custom period</li>
              </ul>
            </ul>
          </article>
        </div>
        <div className="space-y-6 my-5">
          <h3 className="text-2xl font-bold">
            Latest Technology in Security Measures for Luggage Storage
          </h3>
          <p>
            At UrLocker, we understand the value of security. Your stuff is
            always in safe hands. We have advanced security measures for your
            belongings. All the security features are included in the package
            without additional charges. There is no need for trepidation as
            regards the storage of your right suitcase. No matter whether you
            are in Melbourne or simply have a transfer, you are safe. We provide
            storage, so it is convenient and secure. Your treasures are merely
            out of danger.
          </p>
          <ul>
            <h4 className="font-bold text-black">Security Features:</h4>
            <ul className="list-disc px-10 text-lg">
              <li>
                Every single storage area is equipped with surveillance cameras,
                regularly checked and recorded for monitoring purposes.
              </li>
              <li>
                Robust lockers are accessed only by registered individuals using
                security codes.
              </li>
              <li>
                Dedicated personnel manage the site and assist clients during
                operational hours to ensure safety.
              </li>
              <li>
                Regular system maintenance and safety precautions are performed.
              </li>
              <li>Some storage areas are restricted for extra security.</li>
              <li>Fire-resistant storage units reduce the risk of hazards.</li>
            </ul>
          </ul>
        </div>

        <div className="space-y-6 my-5">
          <h4 className="text-2xl font-bold">
            Simple and Efficient Way of Making Bookings and Storage
          </h4>
          <p>
            In terms of booking and storage of the facilities, we have
            simplified the entire process so that customers can make bookings
            easily and quickly, not wasting any time or money in the process.
            Our simple systems are user-oriented, particularly for travellers,
            in that they have many booking systems and a simple system and
            storage process that any person can use without difficulty.
          </p>
          <ul>
            <h4 className="font-bold text-black">Booking Options:</h4>
            <ul className="list-disc px-10 text-lg">
              <li>
                Online booking takes place through our website, where particular
                web-only offers are provided for those who wish to book storage
                space in advance.
              </li>
              <li>
                The mobile app & service allow you to place your order on the go
                as well as enable you to receive mobile-only discounts,
                tailor-made for when you need storage at short order.
              </li>
              <li>
                For travellers who want to arrange storage for their belongings
                at short notice, on a walk-in basis, with reasonable rates for
                all Storage hardware providers' uptimes
              </li>
            </ul>
          </ul>
          <ul>
            <h4 className="font-bold text-black">Storage Process:</h4>
            <ul className="list-disc px-10 text-lg">
              <li>
                First, look at storage size and duration based on one's
                particular needs.
              </li>
              <li>
                2 For added security, a code is sent through email or SMS, which
                is required to access the inner sanctum of the storage cubes.
              </li>
              <li>
                Find out which storage closest you put your goods in by using
                proper-aimed directional signs.
              </li>
              <li>Place your luggage items inside your locker.</li>
              <li>
                At her discretion, the member can pick up desired items and let
                herself in with the access code.
              </li>
            </ul>
          </ul>
        </div>

        <div className="space-y-4 my-5">
          <h3 className="text-3xl font-bold">
            Further Services and Customer Assistance for Luggage Storage
            Melbourne Airport
          </h3>

          <ul className="px-10 list-disc text-lg">
            <li>24/7 Online Support</li>
            <li>Multilingual Assistance</li>
            <li>Customer Satisfaction Surveys</li>
            <li>Personalized Locker Size Guidance</li>
            <li>Local Travel Recommendations</li>
            <li>Free Device Charging Stations</li>
            <li>Baggage Wrapping Services</li>
            <li>On-Site Printing Facilities</li>
            <li>Continuous Service Improvement</li>
          </ul>
        </div>

        <div>
          <h2 className="text-3xl font-bold">
            Why Choose Urloker when looking for luggage storage Melbourne
            Airport?
          </h2>
          <p>
            Out of the countless similar centres providing luggage storage at
            Melbourne Airport, the best alternative is definitively Urloker,
            which offers the best security, ease, quality, and price. From that
            position, it is easy to see what is so attractive about the service
            you offer: a feeling of a great partner when travelling—one who
            adequately understands one's needs and strives to exceed
            expectations.
          </p>

          <ul className="list-disc px-10 text-lg">
            <li>
              A reliable luggage storage service offering years of experience to
              people travelling from different origins
            </li>
            <li>
              Fair prices throughout the airport and different fees, but no
              surprises, ensure you get value for your money.
            </li>
            <li>
              The ability to change your mind about things without the fear of
              leaving your belongings or burning a hole in your pocket allows
              you to fill your schedule in Melbourne as you please.
            </li>
            <li>
              Security, guards and other sophisticated paraphernalia come with a
              minimal cost on top of their utility, so you can go out in the
              city free from worry.
            </li>
            <li>
              An easy and economical way to go around Melbourne or wait for your
              flight without the hassle of carrying heavy bags, which improves
              the quality of your travel even more.
            </li>
          </ul>
        </div>
      </main>
      <FaqCard t={data} />
    </div>
  );
}
 

export default AirportPage;
