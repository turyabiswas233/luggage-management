import React, { useCallback, useRef, useState } from "react";
import { Helmet } from "react-helmet-async";
import config from "../../config";
const cbd = config.BUCKET_URL + "/files/city/flinders/flinders.png";
const locImage = config.BUCKET_URL + "/files/city/flinders/locationMap.png";
import { useTranslation } from "react-i18next";
import { faMinusCircle, faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AttractionBox from "./AttractionBox";
import { Autocomplete, useJsApiLoader } from "@react-google-maps/api";
import { useNavigate } from "react-router-dom";

const libraries = ["places"];
const GOOGLE_MAPS_API_KEY = config.GOOGLE_API_KEY;

function FlindersPage() {
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
          if (navigator.permissions) {
            navigator.permissions
              .query({ name: "geolocation" })
              .then(function (result) {
                if (result.state === "denied") {
                  alert("Please enable location services to use this feature");
                }
              });
          }
        },
        (error) => {
          console.error("Error fetching location:", error);
          setLoadingLocation(false);
        }
      );
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  };
  const data = [
    {
      question: "Is luggage storage at Flinders Street Station safe?",
      answer:
        "Yes, Urloker uses 24/7 CCTV monitoring, digital locks and other security measures to ensure your belongings are safe.",
    },
    {
      question:
        "How much does it cost to store luggage at Flinders Street Station?",
      answer:
        "For Flinders Street Station Luggage Storage, we offer flat rates and affordable pricing for all luggage and bag sizes.",
    },
  ];
  const { searchPlaceholder, findLocationsButton } = translate?.heroSection;

  const schemaCode = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Flinders Street Station Luggage Storage - Urloker",
    image:
      "https://s3.ap-southeast-2.amazonaws.com/s3.urlocker.io/public/files/city/flinders/flinders.png",
    "@id":
      "https://urloker.com/flinders-street-station-luggage-storage/#FlindersStreetStationLuggageStorage",
    url: "https://urloker.com/flinders-street-station-luggage-storage",
    telephone: "+61 3 7035 5653",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Flinders Street Station",
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
        <title>Flinders Street Station Luggage Storage - Urloker</title>
        <meta
          property="og:title"
          content="Flinders Street Station Luggage Storage - Urloker"
        />
        <meta
          property="og:description"
          content="Urloker: Flinders Street Station luggage storage made easy. Secure, affordable options in Melbourne's heart. Drop your bags and explore freely"
        />
        <meta
          name="description"
          content="Urloker: Flinders Street Station luggage storage made easy. Secure, affordable options in Melbourne's heart. Drop your bags and explore freely"
        />
        <meta
          name="keywords"
          content="flinders-street-station-luggage-storage"
        />
        <meta
          property="og:url"
          href="https://urloker.com/flinders-street-station-luggage-storage"
        />
        <link
          rel="canonical"
          href="https://urloker.com/flinders-street-station-luggage-storage"
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
              alt="flinders street station luggage storage"
              loading="lazy"
            />
            <h1 className="text-4xl md:text-6xl font-bold my-4 text-green-800">
              Flinders Street Station Luggage Storage
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
                    defaultValue={"Flinders Street Melbourne VIC, Australia"}
                  />
                </Autocomplete>
              )}
            </div>
            <button
              type="button"
              onClick={handleNearMyLocationClick}
              className={`bg-custom-teal hover:bg-custom-teal-deep text-white font-bold text-lg rounded-full shadow-md transition duration-300 ease-in-out mt-4 px-6 md:px-12 py-4 w-full md:w-fit ${
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
            alt="Luggage Storage Flinders Street Station "
            loading="lazy"
          />
        </div>
      </header>
      <AttractionBox locationImage={locImage} me={"Flinders Street Station"} />

      <main className="p-5 bg-white xl:px-52 w-full mx-auto">
        <div className="space-y-6 my-5">
          <h2 className="text-3xl font-bold">
            Flinders Street Station Luggage Storage: Prise for the Convenience
            in Melbourne
          </h2>
          <p>
            Carrying heavy bags is a challenge anytime one is sightseeing in
            Melbourne. Whether you are navigating the busy streets, visiting
            iconic attractions or waiting to catch a train, it is essential to
            safely store your bags where you can trust. At
            <a href="/" className="text-custom-teal-deep font-bold">
              Urloker
            </a>{" "}
            we offer reliable flinders street station luggage storage - an easy
            and hassle free solution for travellers to enjoy the city without
            the burden of heavy bags.
          </p>
        </div>
        <div className="space-y-6 my-5">
          <h2 className="text-3xl font-bold">
            Why Flinders Street Station Luggage Storage is Worth It?
          </h2>
          <article className="space-y-3">
            <p>
              Flinders Street Station isn't just busy with commuters; tourists
              and visitors also notice the limited space and crowded feel.
              That's where the luggage storage services come in handy! These
              facilities allow anyone, not just travellers, to explore the city
              without the hassle of carrying heavy bags. Here's why storing your
              luggage at Urloker near Flinders Street Station is a smart and
              budget-friendly choice:
            </p>
            <ul className="grid gap-3">
              <li>
                <b>Convenient Location:</b> Flinders Street Station is
                conveniently located in the center of Melbourne and gives access
                to most of the well known places like Federation Square,
                Southbank, among many others the Royal botanic gardens making it
                easy to take the luggage within. You can store your bags at
                Urloker and enjoy the city without any inconvenience.
              </li>
              <li>
                <b>Cost Effective Prices:</b> We know you are paying the hourly
                or daily charges to use the Flinders Street luggage lockers for
                hours and also for days which are quite reasonable. For long
                term and short term requirements, most of the service providers
                will have a well dubbed pricing structure, which you can opt for
                in putting your items to be stored.
              </li>
              <li>
                <b>Secure Your Belongings:</b> Security concerns are paramount
                when it comes to storing your luggage. Just like other luggage
                storage facilities in Melbourne, Flinders Street Station has
                baggage lockers that have digital locks and CCTVs to protect
                your items while touring the wonders of the city without your
                baggage.
              </li>
              <li>
                <b>Different Storage Space :</b> You may find at Urloker for
                Flinders street station luggage storage, people's lockers,
                medium lockers for backpacks and other small items, large
                compartments (rest rooms) that accommodate warmers, strollers,
                wheeled sport bags. This certainty makes sure that there's a
                safe place whenever the size of the luggage comes in.
              </li>
            </ul>
          </article>
        </div>
        <div className="space-y-6 my-5">
          <h3 className="text-2xl font-bold">
            Exploring the Flinders Street Station
          </h3>
          <p>
            If you are looking for some out-of-the-city travel, the Southern
            Cross, Melbourne Central, and Flinders Street train stations located
            within the Central Business District (CBD) are also well connected
            for that purpose. There is also a network of tram services from the
            CBD to the other parts of central Melbourne. There is a great deal
            of pedestrian infrastructure in the area, which allows for easy
            sightseeing.
          </p>
        </div>

        <div className="space-y-6 my-5">
          <h3 className="font-bold text-xl">
            How to Use Urloker for Luggage Storage at Flinders Street Station
          </h3>
          <p>
            It is very easy to use Urloker for any luggage storage facility
            within the Flinders Street Station. Generally, most providers of
            luggage storage have a very easy way of storing and collecting the
            stored luggage. This is how it usually works:
          </p>
          <ul className="px-5 list-disc">
            <li>
              <b>Online Booking or On-the-Spot Service:</b> It is possible to
              make an online reservation for some of the luggage storage areas.
              This is to ensure that a locker will be available when you turn up
              such as during the peak seasons. Alternatively, you can avail of
              the on-the-spot service by physically going to the storage
              facility.
            </li>
            <li>
              <b>Drop Off Your Luggage:</b> As soon as you reach Flinders street
              station you do not have to worry about carrying any of your
              luggage around, simply go to the luggage storage area which is
              clearly marked out on the station. Follow the steps to lock away
              the bag in the locker or hand it over to the attendant lady if it
              is a proper luggage storage.
            </li>
            <li>
              <b>Payment Options:</b> Many payment methods are accepted from a
              person who wishes to pay for the storage; credit cards, debit
              cards and now mobile money transfer applications. Storage of bags
              attracts a timewise duration based price rather than a flat rate
              with some firms going the extra mile in offering a discount on
              bags storage court of at least a week.
            </li>
            <li>
              <b>Retrieve Your Belongings :</b> In case one chooses to reclaim
              his or her bag, one lifts his disposition and walks up to the
              storage room, types the access code and/or positive identification
              or payment receipt and opens up the locker whose content needs to
              be retrieved.
            </li>
          </ul>
        </div>

        <div className="space-y-6 my-5">
          <h3 className="text-2xl font-bold">
            Benefits of Luggage Storage in Flinders Street Station for Tourists
            and Business People
          </h3>
          <p>
            For tourists and working professionals, at Urloker Flinders Street
            Station luggage storage has a number of features that come in handy
            especially if you still have time to kill after checking out of the
            hotel or before taking a train. Following are the salient features
            of these offerings:
          </p>
          <ul className="list-decimal px-5">
            <li>
              <b>Maximize Your Time:</b> When you use the luggage storage, you
              get to make the most of your time spent in Melbourne since you
              will not be encumbered by your bags. Tour some of the attractions,
              have a nice meal somewhere, or even stroll down the Yarra River.
            </li>
            <li>
              <b>Peace of Mind:</b> Making sure some items are left behind in a
              safe and secure place, enables them to be free to enjoy everything
              from art galleries to business meetings and even shopping around
              the CBD.
            </li>
            <li>
              <b>Perfect for Layovers :</b> For those passing through the city
              for only a few hours in between flights or trains, Flinders Street
              Station provides a great service whereby travellers can leave
              their luggage and go exploring the city.
            </li>
          </ul>
        </div>
        <div className="space-y-6 my-5">
          <h3 className="text-2xl font-bold">
            Other Services Available in the Vicinity of the Flinders Street
            Railway Station
          </h3>
          <p>
            In addition to storing their luggage, the visitors at Flinders
            Street Station can find a lot of facilities that help in movement.
            While you can search for the information about the interesting
            sites, yourself, restaurants, cafes or any other tourist information
            centers, you will get them all there in a close range.
          </p>
          <ul className="list-decimal px-5">
            <li>
              <b>Refreshments:</b> A number of fast food outlets and other more
              formal servicing restaurants are in close range of the station
              allowing an opportunity to have a bite or coffee while waiting and
              your bag safely stored away.
            </li>
            <li>
              <b>Public Transport Facilities:</b> The hub of aerial commuting is
              the Flinders Street Station connecting to trams, buses and intra
              city portable vehicles suggesting ease of going round Melbourne
              and the suburbs.
            </li>
            <li>
              <b>Nearby Places of Interest :</b> To the relief of the tourists,
              some famous places to visit in Melbourne such as the National
              Gallery of Victoria, the ACMI and the Saint Paul's Cathedral are
              just a few minutes walking distance which will be even more
              enjoyable when the visitors do not have to carry their bags with
              them.
            </li>
          </ul>
        </div>
        <div className="space-y-6 my-5">
          <h3 className="text-2xl font-bold">
            How to Identify the Best Luggage Storage Service at Flinders Street
            Station
          </h3>
          <p>
            There are many providers in the area offering luggage storage. This
            time, you want to make an effort and choose the best Luggage Storage
            provider. Here are some factors to consider when selecting the right
            service:
          </p>
          <ul className="list-decimal px-5">
            <li>
              <b>Location:</b> Choose a secure storage, like Urloker located
              inside Flinders Street Station or is within a walking distance
              from Flinders Station. This will prevent you from carrying your
              bags for long distances.
            </li>
            <li>
              <b>Price:</b> Compare prices among providers and take advantage of
              Urloker’s competitive rates and long-term storage discounts.
            </li>
            <li>
              <b>Locker Sizes :</b> Ensure the provider offers various locker
              sizes to accommodate your luggage, whether it's small, medium, or
              large.
            </li>
            <li>
              <b>Security :</b> Ensure that the storage unit has adequate safety
              features such as closed circuit TV, electric locks, security cards
              and security codes.
            </li>
            <li>
              <b>Customer Reviews :</b> Go through reviews from other users who
              have made use of the service in the past. These reviews show that
              the provider has received positive clouds in terms of security,
              convenience and customer support.
            </li>
          </ul>
        </div>

        <div className="space-y-6 my-5">
          <h2 className="text-3xl font-bold">
            Why Urloker is the best choice for Flinders Street Station Luggage
            Storage
          </h2>
          <p>
            Whether you are visiting Melbourne for the day or looking for
            long-term storage, Urloker offers the perfect solution. With our
            central location, competitive pricing, and robust security, Urloker
            provides a reliable and hassle-free way to store your luggage,
            allowing you to make the most of your time in Melbourne.
          </p>
        </div>
      </main>
      <FaqCard t={data} />
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
      <h3 className="text-center font-bold text-2xl my-5">
        Common Questions for Flinders Street Station Luggage Storage
      </h3>
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
              Q: {faq.question}
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

export default FlindersPage;
