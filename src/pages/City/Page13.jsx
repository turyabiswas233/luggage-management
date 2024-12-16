import React, { useCallback, useRef, useState } from "react";
import { Helmet } from "react-helmet-async";
import config from "../../config";
const cbd = config.BUCKET_URL + "/files/city/canberra/cbd.jpg";
// const cbd = "/files/city/canberra/cbd.jpg";
const locImage = config.BUCKET_URL + "/files/city/canberra/locationMap.png";
import { useTranslation } from "react-i18next";
import AttractionBox from "./AttractionBox";
import { Autocomplete, useJsApiLoader } from "@react-google-maps/api";
import { useNavigate } from "react-router-dom";
import FaqCard from "./FaqCard";
import Template from "./Template";

const libraries = ["places"];
const GOOGLE_MAPS_API_KEY = config.GOOGLE_API_KEY;

function Canberra() {
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
      question: "Can I book Urloker storage last minute?",
      answer:
        "Yes. Our service is designed to be flexible and convenient, even for last-minute plans.",
    },
    {
      question: "Are there size limits for storage?",
      answer:
        "Not really. We accommodate most luggage sizes. Contact with us for any oversized items.",
    },
    {
      question: "How secure is my luggage with Urloker?",
      answer:
        "We use top notch security measures like CCTV and lockers to ensure your items are safe.",
    },
    {
      question: "Do I need to print my booking confirmation?",
      answer: "No need. A digital confirmation works perfectly.",
    },
    {
      question: "Can I access my luggage during the storage period?",
      answer:
        "Yes, with prior arrangement, you can retrieve your items during operating hours.",
    },
  ];
  const { searchPlaceholder, findLocationsButton } = translate?.heroSection;

  const schemaCode = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Secure Luggage Storage Canberra at Urloker",
    image:
      "https://s3.ap-southeast-2.amazonaws.com/s3.urlocker.io/public/files/city/cbd/cbd.jpeg",
    "@id":
      "https://urloker.com/luggage-storage-canberra/#LuggageStorageMelbourneCBD",
    url: "https://urloker.com/luggage-storage-canberra",
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
      heading: "Experience Convenient Luggage Storage in Canberra with Urloker",
      para: [
        "Travelling is exciting but carrying heavy bags can ruin the experience. Whether you are exploring Canberra's landmarks or waiting between flights, you do not want luggage holding you back. That is where Urloker comes in a secure, hassle-free solution for your luggage storage needs in Canberra. At Urloker, we offer simple, flat-rate pricing and seamless hassle free booking experience. No confusing time limits or hidden fees, just convenient luggage storage to make your trip easier. Let's explore why Urloker is the best choice for luggage storage in Canberra.",
      ],
    },
    {
      type: "h2",
      heading: "Why Choose Luggage Storage in Canberra?",
      para: [
        "Exploring Canberra should be about enjoying the beautiful sights and not worrying about where to store your bags. With Urloker, you can securely store your luggage while you visit must-see spots like the National Gallery or Parliament House. Here is why choosing luggage storage in Canberra makes perfect sense:",
      ],
      list: [
        "Free yourself from lugging around heavy bags.",
        "Safeguard your belongings in a secure facility.",
        "Make the most of your travel itinerary, hands-free.",
        "Utilize your waiting time by exploring the city hands free.",
        "Navigate public transport, taxis, or walking routes without extra baggage.",
        "Visit landmarks, cafes and events without worrying about your belongings.",
      ],
    },
    {
      type: "h2",
      heading:
        "Who Needs Luggage Storage in <a href='https://en.wikipedia.org/wiki/Canberra'>Canberra</a>?",
      para: [
        "Luggage storage is not just for tourists. It is ideal for anyone who finds themselves between destinations or in need of temporary storage. Let's explore who can benefit from this service:",
      ],
      list: [
        "Travellers Between Check-ins: If you have some time before your check-in or after your check-out, drop off your bags and explore freely.",
        "Day Trippers: On a day trip and do not want to carry excess baggage? Luggage storage is your answer.",
        "Business Travelers: Store your luggage securely and attend meetings or conferences while you focus on work.",
        "Backpackers and Adventurers: Travel light and enjoy the city without being weighed down by your gear.",
        "Locals in Need of Extra Storage: Even locals sometimes need temporary storage for their belongings and we are here for you too.No matter your reason for visiting or your needs, Urloker makes exploring Canberra effortless and enjoyable.",
      ],
    },
    {
      type: "h3",
      heading: "What Makes Urloker the Best Option in Canberra?",
      para: [
        "When it comes to luggage storage in Canberra, Urloker stands out for multiple reasons. We provide a blend of security, convenience and affordability that is hard to beat:",
      ],
      list: [
        "Security: We use advanced security measures to keep your items safe.",
        "Accessibility: Our locations are near major attractions and transport hubs, making drop-offs and pickups a breeze.",
        "Affordability: We offer budget-friendly options tailored to your needs.",
        "Flat-Rate Pricing: Pay a single, transparent fee for all bag sizes, no hidden charges, no weight or size restrictions.",
        "Whole-Day Booking: Enjoy peace of mind by booking your luggage for an entire day with just one flat-rate fee, no matter how long you need.",
        "Hassle-Free Process: Reserve your space online in minutes with our seamless and secure booking process and avoid the stress of finding storage last minute.",
        "Flexible Options: Whether it is a short-term or long-term need, our storage solutions adapt to your schedule.",
      ],
    },
    {
      type: "h3",
      heading: "How Does Urloker Work for <a href='https://en.wikipedia.org/wiki/Baggage'>Luggage</a> Storage Canberra?",
      para: [
        "Using Urloker is simple and straightforward. We know you are busy, so we have made the process as easy as possible:",
      ],
      list: [
        "Visit Our Website: Head to <a href='https://urloker.com'>urloker.com</a> and choose your location.",
        "Select Your Storage Option: Decide on the drop-off location, duration and size of storage.",
        "Drop Off Your Bags: Head to your chosen storage point and leave your luggage with us.",
      ],
    },
    {
      type: "h3",
      heading: "Is Luggage Storage in Canberra at Urloker Affordable?",
      para: [
        "Absolutely. At Urloker, we believe in providing quality service without the hefty price tag. Here is what you can expect:",
      ],
      list: [
        "Competitive Pricing: We offer storage starting at affordable rates to fit any budget.",
        "No Hidden Fees: Our pricing is transparent, with no unexpected charges.",
        "Flexible Options: Whether you need short-term or long-term storage, we have got you covered.",
        "Instant Online Booking: Reserve your storage spot in just a few clicks through our user-friendly platform.",
        "Convenient Locations: All our storage facilities are close to Canberra's top attractions and transport hubs for your convenience.",
        "24/7 Customer Support: If you have questions or need assistance, our friendly team is available around the clock to ensure a seamless experience.",
      ],
    },
    {
      type: "h3",
      heading: "Where Are Urloker's Luggage Storage Locations in Canberra?",
      para: [
        "We have strategically placed our storage facilities in Canberra to make things easy for you. You will find us conveniently located near popular spots:",
      ],
      list: [
        "Canberra Airport: Perfect for storing bags before or after flights.",
        "Civic Centre: Ideal for exploring Canberra without dragging bags around.",
        "Major Transport Hubs: Close to bus and train stations so that you can drop off luggage as soon as you arrive.",
      ],
      para2:
        "Wherever you are, we are nearby to make your luggage worries disappear.",
    },
    {
      type: "h4",
      heading: "Can I Store Bags for a Few Hours in Canberra?",
      para: [
        "Of course. At Urloker, we have a fixed price for storage. You simply pay the price and you can store your bag for as long as you need, without worrying about hourly rates.",
        "Whether you are between check-out and your next destination or just need a secure place for your bags while you explore, we have got you covered.",
      ],
      list: [
        "Fixed hours for straightforward planning.",
        "Enjoy flexible storage without worrying about hourly charges.",
        "Ideal for layovers, day trips or simply exploring the city without the hassle of carrying bags.",
      ],
    },
    {
      type: "h3",
      heading: "How Secure Is Urloker's Luggage Storage in Canberra?",
      para: [
        "We know that security is your top concern when it comes to luggage storage. At Urloker, we take the safety of your belongings seriously. Here is how we ensure your luggage is in safe hands:",
      ],
      list: [
        "24/7 CCTV Monitoring: All our locations are monitored to keep your items secure.",
        "Secure Lockers: Robust lockers to ensure your luggage stays untouched.",
        "Insured Service: We offer insurance for added peace of mind.",
      ],
      para2:
        "When you store with Urloker, rest assured that your luggage is safe and secure.",
    },
    {
      type: "h4",
      heading: "Is There Luggage Storage Near Canberra Airport?",
      para: [
        "Definitely. We know that one of the most convenient times to store luggage is right after you land or before you depart. That is why Urloker offers luggage storage solutions near Canberra Airport:",
      ],
      list: [
        "Convenient Access: Just a short distance from the terminal.",
        "Flexible Storage Options: Available for both short and long-term needs.",
        "Travel Stress-Free: Drop off your luggage and make the most of your time in Canberra.",
      ],
    },
    {
      type: "h4",
      heading: "Luggage Storage Near Canberra Train Station",
      para: [
        "If you are planning a rail journey, you will want to leave your luggage behind so you can relax or explore before your departure. Our luggage storage near Canberra Train Station offers:",
      ],
      list: [
        "Quick Drop-Off: Store your bags right before hopping on your train.",
        "Easy Retrieval: Pick up your items whenever you need.",
        "Nearby Attractions: Go explore the area while your bags are safely stored.",
      ],
      para2:
        "Whether you are coming into Canberra or leaving by train, we have got a secure spot for your luggage.",
    },
    {
      type: "h3",
      heading: "What Can I Store at Urloker?",
      para: [
        "At Urloker, we do not just handle suitcases. We offer storage for various items to accommodate all types of travellers:",
      ],
      list: [
        "Backpacks and Suitcases: Ideal for travellers of all kinds.",
        "Sports Equipment: Bikes, skis and more, we have got room for them.",
        "Odd-Sized Items: Even if you got something unusual, We are ready to help.",
      ],
      para2:
        "Our storage facilities are designed to cater to all kinds of luggage, making Urloker your go to choice.",
    },
    {
      type: "h2",
      heading: "How Do I Book Urloker Luggage Storage in Canberra?",
      para: ["Booking luggage storage with Urloker is as easy as 1-2-3:"],
      list: [
        "Visit urloker.com: Navigate to our website and find the Canberra section.",
        "Choose Your Location and Duration: Select the storage point that is most convenient for you.",
        "Make Your Reservation: Pay online and you are good to go.",
      ],
      para2:
        "We have streamlined our booking process to make it as convenient as possible for you.",
    },
    {
      type: "h4",
      heading: "Are There Any Hidden Fees?",
      para: [
        "Transparency is key to our service. At Urloker, there are no hidden fees or nasty surprises:",
      ],
      list: [
        "Straightforward Pricing: What you see is what you pay.",
        "No Surprises: The price shown during booking is the price you will pay.",
        "All-Inclusive Rates: Taxes and fees are all included.",
      ],
      para2:
        "We keep things simple so you can focus on enjoying your time in Canberra.",
    },
    {
      type: "h4",
      heading: "What Are Urloker's Operating Hours?",
      para: [
        "We understand that travel plans do not always fit within a 9 to 5 schedule. That is why Urloker offers flexible operating hours:",
      ],
      list: [
        "Early Morning to Late Night: Depending on location, hours vary to accommodate travellers.",
        "Check Specific Locations: Visit <a href='https://urloker.com'>urloker.com</a> for exact times at your chosen storage facility.",
        "Flexible Access: We make sure you can drop off and pick up when it works best for you.",
      ],
      para2:
        "Our goal is to work around your travel needs, not the other way around.",
    },
    {
      type: "h2",
      heading: "Why Is Luggage Storage Essential for Travellers in Canberra?",
      para: [
        "When you are travelling, the last thing you want is to be burdened by heavy bags. Luggage storage at Urloker gives you freedom and flexibility, allowing you to fully experience Canberra's attractions like:",
      ],
      list: [
        "National Gallery of Australia: Enjoy your visit without lugging bags.",
        "Parliament House: Walk through this iconic landmark hands-free.",
        "Mount Ainslie: Trek up to get a view of the city without heavy gear.",
        "Australian War Memorial: Pay your respects and experience the history in peace without worrying about your belongings.",
        "Lake Burley Griffin: Stroll, cycle or paddle around the lake with total freedom from your luggage.",
        "Canberra Centre: Shop and dine to your heart's content at this popular mall without the inconvenience of heavy bags.",
        "National Museum of Australia: Discover Australia's rich history and culture while your belongings are securely stored.",
      ],
    },
    {
      type: "h4",
      heading: "Can Locals Use Urloker's Storage Service?",
      para: [
        "Yes, absolutely. <a href='https://urloker.com'>Urloker</a> is not just for tourists, locals can use our luggage storage services too:",
      ],
      list: [
        "Decluttering: Temporarily store extra items while organizing your space.",
        "Events and Activities: If you do not want to carry your bags around an event, drop them off with us.",
        "Between Moves: If you are moving homes but need a spot for your bags for a few days, we are here to help.",
      ],
      para2:
        "We are here for everyone who needs a convenient storage solution, whether you are from out of town or a Canberra local.",
    },
    {
      type: "h4",
      heading: "How to Find the Nearest Urloker Location in Canberra",
      para: [
        "Finding the nearest Urloker location is quick and easy. Here's how:",
      ],
      list: [
        "Use Our Website: Head to <a href='https://urloker.com'>urloker.com</a> and enter your current location.",
        "Mobile App: Use our mobile app for instant directions to the nearest storage facility.",
        "Quick Search: With just a few taps, you'll be on your way to a nearby Urloker location.",
      ],
      para2:
        "No need to stress about where to drop your bags; we make finding us easy.",
    },
    {
      type: "h2",
      heading:
        "What Sets Urloker Apart From Traditional Luggage Storage in Canberra?",
      para: [
        "Urloker is not your average luggage storage facility. We are here to revolutionize how you store your luggage in Canberra. Here's what makes us different:",
      ],
      list: [
        "Advanced Security: Unlike traditional lockers, we offer CCTV monitoring and insured storage.",
        "Convenient Booking: Book online or via our seamless booking process and no need to deal with manual, on-site payments.",
        "Affordable and Flexible: Pay for exactly what you need, no overcharging, no complications.",
      ],
      para2:
        "We are blending technology, convenience and affordability to provide the best possible storage service.",
    },
    {
      type: "h4",
      heading: "Do You Offer Group Storage Options?",
      para: [
        "Travelling with friends or family? We have got you covered with our group storage solutions:",
      ],
      list: [
        "Family Travel: Store all your bags in one place, hassle-free.",
        "Group Trips: Large groups can keep their luggage together for convenience.",
        "Discounts Available: Special rates for group storage make it more affordable.",
      ],
      para2:
        "Urloker ensures that storing multiple bags is just as easy as storing one.",
    },
    {
      type: "h4",
      heading: "Is My Luggage Insured at Urloker?",
      para: [
        "Yes, it is. We know how important peace of mind is when it comes to your belongings. That is why at Urloker, we offer insurance coverage for all stored items:",
      ],
      list: [
        "Insured Storage: Your belongings are covered against damage or theft.",
        "Extra Peace of Mind: Leave your bags knowing they are in safe, insured hands.",
        "No Extra Costs: Insurance is included in your storage fee.",
      ],
      para2:
        "We take the extra step to ensure you feel comfortable leaving your belongings with us.",
    },
    {
      type: "h3",
      heading: "What is the Booking Process at Urloker in Canberra?",
      para: [
        "Booking with Urloker is designed to be simple, so you can get on with your day without fuss:",
      ],
      list: [
        "Select Your Storage Location: Find the most convenient location in Canberra.",
        "Choose Your Duration: Pick the time period you need short-term or long-term.",
        "Secure Your Booking: Complete your reservation online and you are all set.",
      ],
      para2: "It is quick, easy and tailored to fit around your plans.",
    },
    {
      type: "h3",
      heading: "How Urloker Helps You Maximise Your Day in Canberra",
      para: [
        "Imagine exploring Canberra without dragging your bags around. With Urloker, you can fully immerse yourself in the experience:",
      ],
      list: [
        "Travel Light: Store your luggage and move freely around the city.",
        "Enjoy More: Spend more time at attractions and less time worrying about where your bags are.",
        "Flexible Storage: Whether you are on a short or long visit, we make it easy to make the most of your day.",
      ],
      para2:
        "Urloker helps you focus on what is important and making memories in Canberra.",
    },
    {
      type: "h2",
      heading: "Benefits of Luggage Storage in Perth CBD with Urloker",
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
      heading: "Any Tips for Travellers Using Luggage Storage?",
      para: [
        "Here are some quick tips to make the most of your Urloker experience:",
      ],
      list: [
        "Book Early: During peak seasons, it is best to book in advance to secure your spot.",
        "Keep Essentials With You: Things like passports, money and electronics are best kept on you.",
        "Double-Check Details: Make sure you have entered the correct location and duration when booking.",
      ],
      para2:
        "A little planning goes a long way in making your luggage storage experience smooth and worry-free.",
    },
    {
      type: "h3",
      heading: "Why Urloker's Luggage Storage in Canberra Is a Game-Changer",
      para: [
        "At Urloker, we are redefining what it means to store luggage while travelling. Here is why we think our service is a game changer:",
      ],
      list: [
        "Convenience: Strategic locations make it easy to find us.",
        "Flexibility: From a couple of hours to several weeks, we have got options for every need.",
        "Affordable Security: Safe, secure and without the hefty price tag.",
      ],
    },
  ];

  return (
    <div>
      {/*  SEO Header */}
      <Helmet>
        <title>Secure Luggage Storage Canberra at Urloker</title>
        <meta
          property="og:title"
          content="Secure Luggage Storage Canberra at Urloker"
        />
        <meta
          name="description"
          content="Secure and affordable luggage storage in Canberra with Urloker. Store your bags conveniently and explore the city hands free. Easy online booking."
        />
        <meta name="keywords" content="luggage-storage-canberra" />
        <meta
          property="og:url"
          content="https://urloker.com/luggage-storage-canberra"
        />
        <meta
          property="og:description"
          content="Secure and affordable luggage storage in Canberra with Urloker. Store your bags conveniently and explore the city hands free. Easy online booking."
        />
        <link
          rel="canonical"
          href="https://urloker.com/luggage-storage-canberra"
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
                alt="luggage storage canberra"
                loading="lazy"
              />
              <h1 className="text-4xl md:text-6xl font-bold my-4 text-green-800">
                Luggage Storage Canberra
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
                      defaultValue={"Canberra, Australia"}
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
              alt="luggage storage canberra"
              loading="lazy"
            />
          </div>
        </header>
        <AttractionBox
          locationImage={locImage}
          me={"Canberra"}
          cityType="Canberra"
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
        <FaqCard t={faqs} title={"FAQs About Luggage Storage in Canberra"} />
        <p className="p-5 xl:px-52 text-black/80 bg-white">
          Urloker is all about making travel lighter, seamless, simpler and
          hassle-free. Whether you are in Canberra for a few hours or a few
          weeks, we are here to keep your bags safe while you focus on enjoying
          the adventure.
        </p>
      </div>
    </div>
  );
}

export default Canberra;
