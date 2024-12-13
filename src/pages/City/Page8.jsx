import React, { useCallback, useRef, useState } from "react";
import { Helmet } from "react-helmet-async";
import config from "../../config";
const cbd = config.BUCKET_URL + "/files/city/sydneycentral/cbd.jpeg";
// const cbd =  "/files/city/sydneycentral/cbd.jpeg";

const locImage = config.BUCKET_URL + "/files/city/sydney.png";
import { useTranslation } from "react-i18next";
import AttractionBox from "./AttractionBox";
import { Autocomplete, useJsApiLoader } from "@react-google-maps/api";
import { useNavigate } from "react-router-dom";
import FaqCard from "./FaqCard";
import Template from "./Template";
const libraries = ["places"];
const GOOGLE_MAPS_API_KEY = config.GOOGLE_API_KEY;

function SydneyCentral() {
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
      question: "How much does luggage storage at Sydney Central cost?",
      answer:
        "Urloker offers a flat rate for all kinds of sizes which is only 7.90 AUD for each bag, making it an affordable option for travellers.",
    },
    {
      question: "Can I book luggage storage online?",
      answer:
        "Yes, you can easily book online at <a href='https://urloker.com'>Urloker.com</a> with a seamless experience to secure your spot.",
    },
    {
      question: "Is it safe to leave my luggage in storage?",
      answer:
        "Absolutely. We use secure systems and have surveillance to ensure your belongings are safe at all times.",
    },
    {
      question: "Can I store my luggage if I’m not travelling by train?",
      answer:
        "Of course. Our luggage storage service is open to everyone, regardless of your mode of travel.",
    },
    {
      question: "Do I need an ID to store luggage?",
      answer: "Some services require ID, including ours, for added security.",
    },
    {
      question: "What’s the maximum luggage size you accept?",
      answer:
        "We can accommodate most luggage sizes with a flat rate. If you have oversized items, contact us to confirm availability.",
    },
    {
      question: "Are there any additional fees?",
      answer: "No hidden fees with Urloker. What you see is what you pay.",
    },
  ];

  const { searchPlaceholder, findLocationsButton } = translate?.heroSection;

  const schemaCode = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Luggage Storage Sydney Central Central - Urloker",
    image:
      "https://s3.ap-southeast-2.amazonaws.com/s3.urlocker.io/public/files/city/cbd/cbd.jpeg",
    "@id":
      "https://urloker.com/luggage-storage-sydney-central/#LuggageStorageMelbourneCBD",
    url: "https://urloker.com/luggage-storage-sydney-central",
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
      heading:
        "Luggage Storage Sydney Central: Your Ultimate Guide to Hassle-Free Travel",
      para: [
        "Travelling through Sydney and do not want to lug around heavy bags? Well, you are in the right place.  With Urloker's luggage storage at Sydney Central, you can make the most of your time in this beautiful city completely hands-free without worrying about your luggage. We are about to walk you through everything you need to know about luggage storage at Sydney Central. Whether you are in town for a few hours, waiting for a check-in or just want to enjoy the city hands-free, let Urloker handle your luggage while you explore so that you can focus on creating unforgettable memories. Here is your complete guide to a lighter, stress-free experience.",
      ],
      list: [],
    },
    {
      type: "h3",
      heading: "Why You Need Luggage Storage at Sydney Central",
      para: [
        "Imagine trying to explore Sydney while lugging around a 20kg suitcase, not ideal, right? Luggage storage at Sydney Central with Urloker can change your travel game completely which offers the perfect solution for travelers looking to explore the vibrant sights of Sydney without any baggage. If you are in the city for a layover, have time before your hotel check-in or just want to enjoy Sydney without being weighed down, leaving your bags in a secure facility is a lifesaver.",
      ],
      list: [],
    },
    {
      type: "h3",
      heading:
        "Top Reasons to Choose Urloker Luggage Storage at Sydney Central",
      para: [],
      list: [
        "Freedom to Explore: Store your luggage and roam around the beautiful sights hands-free.",
        "Convenience: No need to worry about keeping an eye on your belongings while enjoying Darling Harbour or other attractions.",
        "Flat Rate for All Sizes: No matter the size of your luggage, enjoy a flat rate. Big or small, all bags are treated equally, ensuring affordability without the worry of extra costs.",
        "Book for the Whole Day: No hourly fees, no rush. Secure your luggage for the entire day with just one booking which gives you peace of mind and complete flexibility.",
        "Stress-Free Travel: Avoid the physical burden of carrying luggage all day, especially when your travel plans are flexible.",
      ],
    },
    {
      type: "h2",
      heading: "Where Can You Find Luggage Storage Near Sydney Central?",
      para: [
        "Looking for luggage storage options around Sydney Central? I have got you covered. From professional storage services to conveniently located facilities like Urloker, there are plenty of options right by the station.",
      ],
      list: [],
    },
    {
      type: "h4",
      heading: "Urloker’s Advantages Over Others",
      para: [],
      list: [
        "Central Location: Urloker storage is ideally located right next to Sydney Central Station and makes it incredibly convenient for travellers.",
        "Easy and Seamless Booking Process: Reserve your luggage storage in just a few clicks with our user-friendly online booking system, making your experience quick and hassle-free.",
        "Personalised Service: Unlike automated lockers, Urloker offers a personalised touch with customer support to assist you with your needs.",
        "Affordable Flat Rates: No hidden fees, no hourly charges just a straightforward, affordable flat rate for your peace of mind.",
      ],
    },
    {
      type: "h4",
      heading: "How Does Luggage Storage at Sydney Central Work?",
      para: [
        "Booking your luggage storage with Urloker is incredibly easy. Use our simple online system to book your spot in just a few clicks to ensure your storage is ready when you arrive. Storing your bags with Urloker is as easy as pie. The process has been made as straightforward as possible so that you can get on with enjoying your day.",
      ],
      list: [
        "Drop Off: Visit the Urloker location near Sydney Central and drop off your luggage.",
        "Explore Sydney: Leave your bags in secure hands and explore the nearby sights without extra baggage.",
        "Pick Up: Once you are ready to move on, just come back and pick up your bags. Your bags awaits no rush.",
      ],
    },
    {
      type: "h3",
      heading: "Urloker: Your Go-To Luggage Storage Service at Sydney Central",
      para: [
        "At Urloker, we understand that every moment of your journey is valuable. That is why we offer quick, seamless, affordable and secure luggage storage services conveniently located near <a href='https://en.wikipedia.org/wiki/Central_railway_station%2C_Sydney'>Sydney Central Station</a>.",
      ],
      list: [],
    },
    {
      type: "h4",
      heading: "Benefits of Choosing Urloker Luggage Storage",
      para: [],
      list: [
        "Easy Online Booking: Book your spot in advance with our easy and seamless online booking system, ensuring a smooth experience upon arrival.",
        "Flexible Operating Hours: Our storage facility is open for extended hours and ensures you can drop off or pick up your <a href='https://en.wikipedia.org/wiki/Baggage'>luggage</a> when it suits your schedule.",
        "Affordable Pricing: We provide fixed flat unbeatable rates for all bag sizes, ensuring transparent and straightforward pricing without any hidden fees.",
        "Flexible Storage Durations: Whether you need to store your luggage for a few minutes or several days, we accommodate your schedule with ease.",
        "Secure Storage: Your belongings safety is our priority. Our facilities are equipped with secure locks and surveillance systems to ensure your items are well-protected.",
        "Excellent Customer Support: Our friendly staff is always ready to help you whether you need directions, travel tips or any assistance with your luggage.",
      ],
    },
    {
      type: "h3",
      heading: "What’s the Cost of Luggage Storage at Sydney Central?",
      para: [
        "At Urloker, we believe in straightforward, transparent pricing for your luggage storage needs near Sydney Central Station. Our fixed-rate system ensures you pay once and enjoy the day without worrying about hidden fees or time constraints.",
      ],
      list: [
        "Fixed-Rate Pricing: Enjoy a single, all-inclusive flat rate for all bag sizes whether big or small. Store your luggage securely with Urloker and explore Sydney unburdened.",
        "No Hidden Fees: Our transparent pricing means you will know exactly what you are paying for upfront, with no unexpected charges.",
      ],
    },
    {
      type: "h4",
      heading: "Is Luggage Storage Near Sydney Central Safe?",
      para: [
        "We know safety is your top concern and it is ours too. Urloker provides secure luggage storage at Sydney Central to make sure your belongings are well-protected.",
      ],
      list: [
        "Secure Locks: We utilize advanced locking systems to safeguard your luggage.",
        "Surveillance Cameras: Continuous monitoring through surveillance cameras enhances security.",
        "Staff on Duty: Our dedicated staff is always present to oversee operations and provide assistance.",
      ],
    },
    {
      type: "h3",
      heading: "Benefits of Luggage Storage in Sydney Central",
      para: [
        "Choosing luggage storage while at Sydney Central comes with numerous perks.",
      ],
      list: [
        "Hands-Free Exploration: Enjoy Sydney’s attractions without the burden of your luggage.",
        "Maximise Your Layover: Got a few hours before your flight or train? Store your bags and make the most of the time.",
        "Stay Flexible: No more worrying about check-in or check-out times. Store your luggage whenever you need.",
      ],
    },
    {
      type: "h3",
      heading: "Types of Travellers Who Need Luggage Storage at Sydney Central",
      para: [
        "At Urloker, we understand that various travellers passing through Sydney Central Station can greatly benefit from our secure and convenient luggage storage services. Here is how we cater to different needs:",
      ],
      list: [
        "Backpackers: Exploring Sydney's vibrant streets is more enjoyable without the burden of heavy backpacks. Our storage solutions allow you to roam freely and comfortably.",
        "Business Travellers: Attending meetings or conferences in the city? Store your luggage with us to navigate your professional commitments unencumbered.",
        "Families: Travelling with children can be challenging. By utilising our services, you can focus on creating memorable experiences without the hassle of managing multiple bags.",
      ],
    },
    {
      type: "h2",
      heading: "How to Choose the Best Luggage Storage Near Sydney Central",
      para: [
        "Selecting the right luggage storage near Sydney Central Station is crucial for a seamless travel experience. Here are key factors to consider:",
      ],
      list: [
        "Location: Choose a facility that is conveniently located near your planned activities. For instance, Urloker offers convenient storage solutions right next to Sydney Central Station and as well as all over the city allowing easy access to your belongings.",
        "Security: Safety should be your top priority as well as our. Prioritise services that implement robust security measures, including secure lock systems and surveillance cameras to ensure the safety of your items. Facilities like Urloker are designed with these features to provide peace of mind.",
        "Pricing: Look for transparent pricing structures without hidden fees. Urloker provides clear and unbeatable competitive rates, ensuring you know exactly what you are paying for.",
        "Customer Support: Looking for a storage service that provides helpful customer support to assist you whenever needed. Urloker’s friendly staff is available 24/7 to answer questions, provide assistance for your convenience.",
      ],
    },
    {
      type: "h4",
      heading: "Can I Store Large or Unusual Items at Sydney Central?",
      para: [
        "Not every luggage storage service can accommodate large or unusual items, but Urloker’s got you covered.",
      ],
      list: [
        "Oversized Luggage: Got a surfboard or a large suitcase? Contact Urloker in advance to confirm availability for oversized items.",
        "Special Requests: We are flexible and do our best to accommodate all types of luggage.",
      ],
    },
    {
      type: "h5",
      heading: "Storing Bags for the Day: Is It Worth It?",
      para: [
        "Storing your bags for the day is a practical choice that enhances your travel experience in Sydney. Here's why it's worthwhile:",
      ],
      list: [
        "Hands Free Exploration: Navigating attractions like the Sydney Opera House or enjoying a coffee at Circular Quay becomes more enjoyable without the burden of luggage.",
        "Comfort and Convenience: Secure storage allows you to dine, shop, and sightsee without worrying about your belongings.",
      ],
    },
    {
      type: "h4",
      heading: "How to Book Luggage Storage at Urloker",
      para: [
        "Booking luggage storage with Urloker is a straightforward process designed for your convenience:",
      ],
      list: [
        "Visit Our Website: Navigate to Urloker.com to begin your booking with our seamless online booking process.",
        "Select Your Location and Time: Choose the Sydney Central location and specify the duration for which you require storage.",
        "Secure Your Spot: Confirm your booking with a few simple clicks.",
      ],
    },
    {
      type: "h4",
      heading: "What to Do Near Sydney Central While Your Bags Are Stored",
      para: [
        "After storing your luggage at Urloker near Sydney Central Station, explore these nearby attractions:",
      ],
      list: [
        "Darling Harbour: A short walk away, Darling Harbour offers a variety of shops, eateries and scenic views. It is an ideal spot for dining and entertainment.",
        "Chinatown: Immerse yourself in Sydney's vibrant culture by visiting Chinatown. Experience diverse food stalls, unique shops and rich cultural heritage.",
        "Powerhouse Museum: Spend an afternoon at the Powerhouse Museum, exploring Australia's rich history through interactive exhibits and displays.",
        "Hyde Park: Relax and unwind at Hyde Park which is Sydney's oldest public park, known for its lush greenery, beautiful fountains and historical monuments. It is a perfect spot for a leisurely stroll.",
        "Paddy's Markets: Just a short walk away, Paddy's Markets offer a vibrant shopping experience with a wide array of souvenirs, fresh produce and local goods. It is a great place to pick up unique gifts or treats.",
        "Australian National Maritime Museum: Learn about Australia's maritime history at this fascinating museum. With indoor and outdoor exhibits, it is an ideal destination for history buffs and families.",
        "Barangaroo Reserve: Take a walk along Barangaroo Reserve, it is a stunning harborside park that offers spectacular views of Sydney Harbour and a tranquil escape from the bustling city.",
        "Queen Victoria Building (QVB): Shop and admire the stunning architecture at the Queen Victoria Building. This heritage landmark houses a range of boutique stores, cafes and beautiful art displays which will add sweet memories in your bucket.",
      ],
    },
    {
      type: "h3",
      heading: "Is Same-Day Luggage Storage Available at Sydney Central?",
      para: [
        "Yes! Urloker offers same-day luggage storage to keep things flexible.",
      ],
      list: [
        "No Booking Required: Walk-ins are welcome, so you can drop by and leave your bags whenever you need.",
        "Flexible Booking Options: You can easily book your luggage storage anytime early, on the spot or on arrival through the Urloker website or by scanning a QR code at our location. This will directly take you to the booking page, ensuring a quick and seamless experience for you.",
        "Walk-Ins Are Welcome: You can book your storage anytime whether on the spot, online or by scanning our QR code at the location. This ensures smooth and quick access to our storage facilities whenever you need it.",
        "Quick and Easy: Get your luggage stored without a fuss, in just a few seconds with our fast and seamless booking process and save more time to enjoy the city.",
      ],
    },
    {
      type: "h4",
      heading: "Urloker’s Location: A Stone’s Throw from Sydney Central",
      para: [
        "At Urloker, we prioritise your convenience by offering luggage storage services strategically located near Sydney Central Station. This prime location ensures:",
      ],
      list: [
        "Proximity to Public Transport: Whether you are arriving by train or bus, our facility is easily accessible, allowing for seamless transitions during your travels.",
        "Immediate Accessibility: Situated right next to Sydney Central, you would not need to venture far to store or retrieve your belongings, saving you valuable time and effort.",
      ],
    },
    {
      type: "h4",
      heading: "Tips for Packing Before Using Luggage Storage",
      para: ["Make the process smoother by packing smart."],
      list: [
        "Valuables: Keep your passport, money and essentials with you, not in your stored bags.",
        "Easy Access: Pack the items you might need quickly on top for convenience.",
        "Travel Lock: Adding an extra lock can give you additional peace of mind.",
      ],
    },
    {
      type: "h3",
      heading: "Can I Store Luggage Overnight at Sydney Central?",
      para: [
        "Urloker has options for overnight luggage storage. If you are looking for a secure place to stash your belongings for more than just a day, we have got you covered.",
      ],
      list: [
        "Flexible Options: Choose storage durations that work for your schedule.",
        "Safe and Secure: Overnight storage means your belongings are secure while you rest.",
      ],
    },
    {
      type: "h4",
      heading: "Luggage Storage for Group Travellers",
      para: [
        "Travelling with a group? We know how much luggage that can mean.",
      ],
      list: [
        "Multiple Bags: We can accommodate several bags for groups, making sure everyone’s items are secure.",
        "Flexible Space: Our storage options are designed to handle luggage of all sizes, from backpacks to large suitcases.",
      ],
    },
    {
      type: "h3",
      heading: "Are There Alternatives to Luggage Lockers in Sydney Central?",
      para: [
        "While traditional luggage lockers are an option, they are often limited in space and size. Urloker offers a hassle-free, personal touch.",
      ],
      list: [
        "More Flexibility: No worrying about fitting your luggage into a small locker. Urloker accepts all luggage sizes, offering a flexible solution for all types of travellers.",
        "Flat Rate for All Sizes: Enjoy a simple, flat rate regardless of your luggage size. Whether you have a small backpack or a large suitcase, the cost remains the same with Urloker.",
        "No Hourly Fees: Unlike traditional lockers that may charge by the hour, Urloker provides an all-day rate with no hourly fees so that you can explore Sydney without any time pressure.",
        "Customer Service: With Urloker, there is always someone on hand to help. Urloker provides 24/7 customer support to ensure a smooth, stress-free experience every time.",
      ],
    },
    {
      type: "h4",
      heading: "How Long Can I Store My Luggage at Sydney Central?",
      para: ["You can store your luggage for as long as you need at Urloker."],
      list: [
        "Short-Term Storage: Just need a few hours? No problem.",
        "Long-Term Storage: Need to stash your bags for a few days? We have got that covered too.",
        "Flexible Duration: Tailor the storage time to your plans with no hourly fees.",
      ],
    },
    {
      type: "h4",
      heading: "What Happens If I am Late to Pick Up My Bags?",
      para: [
        "We know travel plans can change unexpectedly. If you are running late to pick up your bags, do not stress.",
      ],
      list: [
        "Flexible Pick-Up: Just contact us if you are delayed, and we will make arrangements. Your bags awaits so you do not need to rush.",
        "Fair Policies: We are here to help make your travel as smooth as possible.",
      ],
    },
    {
      type: "h4",
      heading: "Secure Luggage Storage Options for Valuable Items",
      para: [
        "Got something valuable you are worried about? We offer extra-secure storage options for those high-value items.",
      ],
      list: [
        "Additional Security Measures: Special compartments for valuable belongings.",
        "Peace of Mind: Feel safe knowing your items are locked away securely.",
      ],
    },
    {
      type: "h4",
      heading: "Is Luggage Storage Worth the Cost?",
      para: [
        "In my opinion, luggage storage is 100% worth it. For a small fee, you get to enjoy the city without the burden of dragging bags around.",
      ],
      list: [
        "Affordable Convenience: Unbeatable and reasonable rates for complete freedom.",
        "No Worries: Enjoy attractions without constantly worrying about your luggage.",
      ],
    },
    {
      type: "h3",
      heading: "Make Your Sydney Trip Easy with Luggage Storage",
      para: [
        "Travelling should be an enjoyable experience, not hindered by the hassle of carrying heavy bags. At Urloker, we are committed to providing secure, convenient, and affordable luggage storage solutions near Sydney Central Station. Let us take care of your belongings so you can make the most of your time exploring the vibrant city of Sydney.",
        "If you are keen to know more or want to book your luggage storage right now, visit <a href='https://urloker.com'>Urloker's website</a> and get sorted in minutes. Safe travels, and enjoy Sydney.",
      ],
      list: [],
    },
  ];

  return (
    <div>
      {/*  SEO Header */}
      <Helmet>
        <title>Luggage Storage Sydney Central Central - Urloker</title>
        <meta
          property="og:title"
          content="Luggage Storage Sydney Central Central - Urloker"
        />
        <meta
          name="description"
          content="Secure luggage storage at Sydney Central with flat-rate pricing and no size restrictions. Enjoy peace of mind while exploring the city."
        />
        <meta name="keywords" content="luggage-storage-sydney-central" />
        <meta
          property="og:url"
          content="https://urloker.com/luggage-storage-sydney-central"
        />
        <meta
          property="og:description"
          content="Secure luggage storage at Sydney Central with flat-rate pricing and no size restrictions. Enjoy peace of mind while exploring the city."
        />
        <link
          rel="canonical"
          href="https://urloker.com/luggage-storage-sydney-central"
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
                alt="luggage storage sydney central"
                loading="lazy"
              />
              <h1 className="text-4xl md:text-6xl font-bold my-4 text-green-800">
                Luggage Storage Sydney Central
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
              alt="luggage storage sydney central"
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
          {data?.map((item, index) => (
            <Template
              key={index}
              type={item.type}
              heading={item.heading}
              para={item.para}
              list={item?.list || []}
            />
          ))}
        </main>
        <FaqCard t={faqs} />
      </div>
    </div>
  );
}

export default SydneyCentral;
