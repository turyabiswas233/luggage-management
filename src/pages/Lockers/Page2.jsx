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

function SoutherLocker() {
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
    name: "Melbourne Southern cross Station Lockers - Urloker",
    image:
      "https://s3.ap-southeast-2.amazonaws.com/s3.urlocker.io/public/files/city/cbd/cbd.jpeg",
    "@id":
      "https://urloker.com/melbourne-southern-cross-station-lockers/#MelbourneSouthernCrossStationLockers",
    url: "https://urloker.com/melbourne-southern-cross-station-lockers",
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
      heading:
        "Melbourne Southern Cross Station lockers: Convenient and Secure Solutions with <a href='https://urloker.com/'>Urloker</a>",
      para: [
        "Looking for southern cross station lockers? Heading to Southern Cross Station and wondering what to do with your heavy luggage? Finding lockers at Southern Cross Station can be a game-changer whether you are visiting Melbourne for a day or have some time before your flight from Melbourne Airport. Urloker offers a seamless, reliable and secure solution for storing your luggage so that you can enjoy Melbourne without the burden of carrying heavy bags. Our storage is conveniently located near the main concourse in Southern Cross Station and its surroundings, giving you easy access no matter where you are in the station.",
      ],
    },
    {
      type: "h2",
      heading: "Why You Need lockers at Southern Cross Station",
      para: [
        "Travelling can be stressful when you are carrying heavy luggage. Southern Cross Station is a major hub in Melbourn and connects travellers through the train network, SkyBus to Melbourne Airport and more. However carrying your bags while navigating the city can be challenging while you want to explore different places from your check list especially during peak hours.",
        "By using Urloker's secure and convenient lockers platform you can easily book your lockers in a few clicks. Whether you are off to enjoy Melbourne's bustling streets, hidden laneways or iconic landmarks like Federation Square and the Royal Botanic Gardens, docklands, our convenient locker options near Southern Cross Station are designed to give you the freedom to move around comfortably with a hassle free experience.",
      ],
    },
    {
      type: "h3",
      heading:
        "Lockers Options Near <a href='https://en.wikipedia.org/wiki/Southern_Cross_railway_station'>Southern Cross Station</a>",
      para: [
        `You might be asking, "Where exactly can I find lockers near Southern Cross Station?" At Urloker, we understand the importance of convenience, security and ease of customer experience when it comes to storing your belongings. That is why we offer multiple locker options located strategically near the main concourse and surrounding areas of Southern Cross Station. Our lockers are situated in key areas within and around the station which ensure that you can access your luggage storage easily with a hassle free experience, whether you are hopping off a train, arriving via SkyBus or exploring the nearby attractions. We provide a range of locker options near you to accommodate different needs. From small bags to large suitcases so that you can choose the option that best fits your belongings and rest assured knowing that your items are in safe hands and securely stored. By using our simple and seamless online booking system, you can check availability and reserve your locker in just a few clicks, giving you peace of mind before you even arrive. You can also book your locker storage directly by scanning Qr code from our lockers location.  We pride ourselves on offering cost-effective and seamless locker solutions without compromising on security. Urloker is committed to provide you freedom to make your travel experience easier and more enjoyable. By providing convenient, secure and affordable locker options near Southern Cross Station, we will help you focus on making the most of your time in Melbourne.`,
      ],
    },
    {
      type: "h2",
      heading:
        "Benefits of Using <a href='https://urloker.com/'>Urloker for lockers</a> at Melbourne Southern Cross Station",
      para: [],
      list: [
        "<b>Convenient Locations: </b>We offer multiple convenient locker locations near Southern Cross Station and all within easy walking distance. This means more time for you to explore Melbourne with a hassle free experience.",
        "<b>Affordable Rates: </b>We offer flat rates for all sizes of bags. Our flexible pricing structure makes it easier to budget for your trip. Pay per bag per day has made it affordable and easier to budget for.",
        "<b>Secure locker: </b>Safety and security are our top priorities. We provide a safe environment to store your luggage so you do npt have to worry about your bags.",
        "<b>Simple Booking: </b>You can easily book online via Urloker and can secure your locker spot within minutes with a hassle-free seamless experience.",
      ],
    },
    {
      type: "h3",
      heading: "How to Store Your Bags Near Melbourne Southern Cross Station",
      para: [
        "With Urloker, it is super easy to store your luggage near Southern Cross Station by following these steps:",
      ],
      lsType: "numeric",
      list: [
        "<b>Book Online: </b>Simply visit Urloker website and book your desired convenient lockers spot. Choose the number of bags and how long you will need the locker.",
        "<b>Drop off Your Luggage: </b>Head to our convenient locker location which is just a short walk from Southern Cross Station and drop off your luggage easily by showing your booking details. Our friendly staff will be there to assist you and will ensure your bags are securely stored",
        "<b>Affordable Rates: </b>Urloker offers flat rates for all sizes of bags. Our flexible pricing structure makes it easier to budget for your trip. Pay per bag per day has made it affordable and easier to budget for. Which means you can also save more money by choosing us.",
        "<b>Secure Lockers: </b>Safety and security are our top priorities. We provide a safe environment for your belongings, with modern security measures in place.",
        "<b>Enjoy Melbourne: </b>Explore the city without the weight of your luggage. Take in the sights like FLinders Street Station, Docklands. Bourke Street or even the Old Melbourne Goal. Lockers at the Southern Cross Station allow you to experience Melbourne without any baggage related stress.",
      ],
    },
    {
      type: "h3",
      heading:
        "Melbourne Southern Cross Station lockers: Flexible Options for Travellers",
      para: [
        "We understand that every traveller is different and has unique needs. Whether you need <a href='https://en.wikipedia.org/wiki/Locker'>lockers</a> for a few hours or long-term lockers,we have all the options available. Our lockers are located throughout Southern Cross Station, providing easy access for everyone whether you are arriving by train, SkyBus or just exploring the city. Urloker has flexible options to fit your needs. For those with a layover or only a few hours to spare in Melbourne, our short-term lockers are the perfect solution. Drop off your bags with Urloker and make the most of your time in the city without being weighed down by your heavy luggage. If you are staying for several days, we have also options for you, our long-term lockers are secure, giving you peace of mind while you immerse yourself in Melbourne's iconic attractions. For larger groups or families, our spacious lockers can accommodate multiple bags, ensuring everyone enjoys a seamless and hassle-free experience.",
        "Booking with Urloker is simple and easy. Urloker's user-friendly online platform allows you to check availability and reserve your locker in just a few clicks so that you can easily have everything sorted before you even arrive in Melbourne and enjoy the freedom in your journey that you deserve.",
      ],
    },
    {
      type: "h2",
      heading:
        "Lockers at Southern Cross Station: Your Guide to Stress-Free Travel",
      para: [
        "If you are heading to Melbourne and need a safe spot to store your luggage, Southern Cross Station is the ideal location to start your search. Urloker offers a seamless way to leave your bags behind and focus on the adventures ahead. Southern Cross Station lockers are essential for hassle-free travel, especially for those who want to explore Melbourne without dragging their luggage everywhere. Make the most of your time in Melbourne by storing your bags with Urloker. Imagine you are walking the lively Queen Victoria Market, admiring the beautiful Yarra River or sipping coffee in the trendy Fitzroy district all without all without the burden of carrying heavy bags",
        "Urloker makes lockers near Southern Cross Station not only simple but also affordable and secure. We take care of your bags so you can focus on making lasting memories in this wonderful city. With Urloker, you can fully enjoy your time in Melbourne without the burden of luggage and to create a stress-free seamless experience that allows you to explore every corner of this vibrant city.",
      ],
    },
    {
      type: "h2",
      heading: "Why Choose Urloker for lockers at Southern Cross Station?",
      para: [
        "While there are lockers at Southern Cross Station, using Urloker offers several advantages:",
      ],
      list: [
        "<b>Availability: </b>Lockers can be limited, especially during busy travel times. Urloker ensures that you always have a place to store your luggage at your convenience.",
        "<b>Size Flexibility: </b>Our lockers facilities can accommodate bags of various sizes unlike traditional lockers and the best thing is we offer a flat rate where size does not matter.",
        "<b>Pay-Per-Bag Policy: </b>Urloker offers a convenient pay-per-bag policy which allows you to store your luggage for an entire day with a single booking fee and makes it both affordable and hassle-free. Your bag awaits and no need to rush!",
        "<b>Guaranteed lockers: </b>Book in advance and have peace of mind knowing your spot is reserved. Lockers at Southern Cross Station with Urloker means you never have to worry about finding space.",
      ],
    },
    {
      type: "h3",
      heading:
        "Lockers in Melbourne Southern Cross Station for Every Traveller",
      para: [
        "Southern Cross Station lockers with Urloker is designed to meet the needs of different types of travellers:",
      ],
      list: [
        "<b>Backpackers: </b>Melbourne is full of exciting attractions but hauling your backpack around can be exhausting. Store your backpack securely while you enjoy Melbourne's attractions , with nothing holding you back.",
        "<b>Business Travellers: </b>Do not let your suitcase hold you back from meetings and networking events. By choosing our lockers platform you can store your luggage conveniently and focus on making business connections and spend your time more efficiently.",
        "<b>Families: </b>Travelling with kids can be stressful but with lockers options you can lighten your load and explore the city comfortably. Our lockers services help lighten the load and allow you to explore Melbourne comfortably with your family.",
      ],
    },
    {
      type: "h4",
      heading: "Where Can You Find Urloker lockers Locations?",
      para: [
        "Our lockers locations are spread across Melbourne and especially near Southern Cross Station for easy access. Whether you are arriving at Spencer Street or hopping on the SkyBus, docklans you will find our locker spots conveniently nearby. Melbourne Southern Cross Station lockers are all about convenience and Urloker ensures you are covered with flexible, convenient and affordable solutions.",
      ],
    },
    {
      type: "h4",
      heading: "Store Your Luggage and Explore Melbourne",
      para: [
        "No one likes dragging luggage around while trying to explore. Urloker lockers makes it easy to drop off your bags and make the most of your time in Melbourne.",
      ],
      list: [
        "<b>Flinders Street Station: </b>Drop your bags and take a short walk to Melbourne's iconic Flinders Street Station and take a ride in the world’s largest tram network.",
        "<b>Melbourne CBD: </b>With our lockers service, you can explore Melbourne CBD without being weighed down. Enjoy shopping, dining, and sightseeing with complete freedom all around Melbourne CBD with a hassle-free experience.",
        "<b>Bourke Street: </b>Enjoy the hustle and bustle of Bourke Street, knowing that your luggage is safe with us. lockers at Southern Cross Station gives you the freedom to explore without the hassle.",
        "<b>Docklands Waterfront: </b>Head to Docklands for beautiful waterfront views, unique public art and plenty of entertainment options. Furthermore you can take a ride on the Melbourne Star Observation Wheel for stunning panoramic views of the city skyline.",
        "<b>SEA LIFE Melbourne Aquarium: </b>Just a ten minutes walk from Southern Cross Station the Melbourne Aquarium offers an exciting underwater adventure with exhibits featuring penguins, sharks, and an array of marine life which is perfect for families and sea life enthusiasts.",
        "<b>Southbank and Crown Casino Complex: </b>You will find a great opportunity to discover the beauty of Southbank and its riverside dining, trendy bars and the famous Crown Casino Complex. This area is perfect for a night out or a day spent by the famous Yarra River.",
        "<b>Eureka Skydeck: </b>Explore one of the tallest observation decks in the Southern Hemisphere where you can take in breathtaking 360-degree views from Eureka Skydeck. It is only a short tram or train ride from Southern Cross Station which offers a view you will never forget.",
        "<b>Federation Square: </b>You can visit this cultural hub filled with galleries, cafes and live events to get Melbourne's vibe. Federation Square is the perfect spot to experience Melbourne’s vibrant art and culture scene. You can also stop by ACMI (Australian Centre for the Moving Image) to explore innovative exhibitions and interactive displays.",
      ],
    },
    {
      type: "h2",
      heading: "What You Need to Know About lockers",
      para: [
        "lockers service can transform your visit. With Urloker, you will have:",
      ],
      list: [
        "<b>Convenient Booking: </b>No need to wait in line or worry about locker availability. Book your locker online.",
        "<b>Safe Environment: </b>Our locker locations are monitored and your belongings are safe and secure.",
        "<b>Affordable Pricing: </b>Pay only for the time you need. Our rates are affordable and make it easy to plan your trip budget. You can enjoy a flat rate for all sizes of bags for the whole day.",
      ],
    },
    {
      type: "h3",
      heading:
        "Why Urloker Offers the Best lockers Near Southern Cross Station",
      para: [],
      list: [
        "<b>Ease of Booking: </b>Booking with Urloker is quick and seamless. No complicated registration. Just book online, drop off and ready to go.",
        "<b>Secure and Insured: </b>Your peace of mind is our first priority. Rest assured that our locker locations are secure and your luggage is protected. Urloker's locker locations are not only secure but also insured so that you can rest assured that your belongings are in safe hands.",
        "<b>Friendly Service: </b>Our team is always ready to help to make your experience stress-free. Whether you need directions, assistance with your bags or travel tips, we are here to help. Choosing Urloker for lockers at Southern Cross Station means choosing convenience and peace of mind.",
      ],
    },
    {
      type: "h2",
      heading: "How Much Does lockers Cost at Southern Cross Station?",
      para: ["At Urloker, we believe in transparency. Our pricing is simple:"],
      list: [
        "<b>Per Bag Per Day: </b>You pay a flat rate per bag per day. From small bag to oversized items store at a flat rate with no hidden costs.",
        "<b>Flexible Hours: </b>Whether you need a locker for a few hours or a few days, we have got you covered. Lockers at Southern Cross Station are affordable and makes it easy for everyone to enjoy the service. Your bags await so that you can enjoy most of it from Melbourne.",
      ],
    },
    {
      type: "h4",
      heading:
        "locker Near Melbourne Southern Cross Station for Every Traveller",
      para: [
        "Whether you are a backpacker, a business traveller or on a family vacation, our lockers facilities are designed to meet every traveller's needs. We cater to those who want to explore Melbourne without the stress of carrying bags. Lockers at Southern Cross Station ensure you can have a stress-free trip.",
      ],
    },
    {
      type: "h4",
      heading: "How Secure Are the Lockers Near Southern Cross Station?",
      para: ["Security is our priority. At Urloker, we:"],
      list: [
        "<b>Monitor All Locations:</b> Our locker locations are monitored for your safety.",
        "<b>Only Use Trusted Partners:</b> We work with businesses that have proven track records of secure lockers.",
        "<b>Provide Insurance:</b> Rest easy knowing your luggage is insured while in our care. Melbourne Southern Cross Station lockers with Urloker are not only convenient but also secure.",
      ],
    },
    {
      type: "h3",
      heading: "lockers Locations Around Southern Cross Station",
      para: [
        "Urloker provides multiple locker locations all around Melbourne from concourses of stations to all around the city and makes it easier for you to choose a locker spot that best suits your travel itinerary. Our spots are conveniently located near major attractions and allow for easy drop-off and pick-up. Lockers at Southern Cross Station ensure you can travel freely, meaning convenience, security and trust without any baggage constraints.",
      ],
    },
    {
      type: "h4",
      heading: "Store Your Luggage and Enjoy Melbourne Worry-Free",
      para: [
        "Melbourne is a vibrant city with so much to explore from the bustling streets of Melbourne CBD to iconic spots like Federation Square. With Urloker, you can explore without the stress of carrying bags. Southern Cross Station lockers are the ideal solution for anyone wanting to fully enjoy most of their precious time in Melbourne.",
      ],
    },
    {
      type: "h3",
      heading: "Affordable lockers Around Melbourne Southern Cross Station",
      para: [
        "We understand that travelling can be expensive, that is why our lockers service is priced affordably. No need to worry about hefty locker fees with Urloker, you will get affordable rates,seamless experience and excellent service. Lockers at Southern Cross Station are within reach for all travellers.",
      ],
    },
    {
      type: "h4",
      heading: "Locker Spots Across Melbourne to Make Your Trip Easier",
      para: [
        "Apart from Southern Cross Station, we also offer lockers at key locations all around Melbourne. Whether you are catching a flight from Melbourne Airport or taking a train from Flinders Street Station, we have got you covered. lockers at Southern Cross Station provides a central location for all your locker needs.",
      ],
    },
    {
      type: "h3",
      heading:
        "Why You Should Store Your Luggage with Urloker Instead of Lockers",
      para: [
        "Lockers at train stations can be convenient but they come with limitations. Urloker offers:",
      ],
      list: [
        "<b>Guaranteed Space:</b> Book ahead to secure your spot.",
        "<b>Flexible Sizes:</b> We can store bags of all sizes, from backpacks to oversized suitcases and best of all you don't need to pay an extra flat rate for all sizes of bags.",
        "<b>Easy Access:</b> Our locations are easily accessible and save you time. lockers at Southern Cross Station with Urloker means you get the space you need when you need it.",
      ],
    },
    {
      type: "h3",
      heading: "How to Book lockers Near Southern Cross Station",
      para: [
        "Booking with Urloker is straightforward. Head to our website, find a location near Southern Cross Station and book the locker you need. You will get a confirmation instantly and our friendly team will be ready to welcome and assist when you arrive. Melbourne Southern Cross Station lockers have never been easier to arrange.",
      ],
    },
    {
      type: "h2",
      heading: "Lockers Near Melbourne Southern Cross for Backpackers",
      para: [
        "Backpacking through Australia? Southern Cross Station is a gateway to Melbourne and beyond. Storing your luggage with Urloker allows you to experience the city comfortably without being weighed down. lockers at Southern Cross Station is an ideal for those looking to travel light and explore more.",
      ],
    },
    {
      type: "h4",
      heading: "Enjoy Melbourne Without Heavy Bags",
      para: [
        "As a city of mistry there is so much to see and do from visiting the Melbourne Aquarium to walking along the Yarra River, you do not want luggage slowing you down. Store your bags at Southern Cross Station with Urloker and make the most of your time in Melbourne. Southern Cross Station lockers helps you make the most of your time without being weighed down by bags.",
      ],
    },
    {
      type: "h4",
      heading: "Store Your Luggage and Enjoy Melbourne's Attractions",
      para: [
        "From the Old Melbourne Gaol to the buzzing Melbourne Central, there is so much to explore. Urloker makes it easy by offering convenient lockers near Southern Cross Station so you can discover Melbourne's best spots hassle-free. lockers at Southern Cross Station makes your visit to Melbourne more enjoyable and comfortable.",
      ],
    },
    {
      type: "h3",
      heading: "Simple and Secure lockers Solutions",
      para: [
        "With Urloker, lockers at Melbourne Southern Cross Station is simple and secure. Here is how it works:",
      ],
      list: [
        "<b>Book Your Spot:</b> Just go to Urloker and choose your preferred lockers location. Booking online ensures you get a spot, even during busy times.",
        "<b>Drop Off Your Bags:</b> Our convenient lockers locations are located close to Southern Cross Station, making drop-off easy. Our friendly staff will ensure your bags are stored securely.",
        "<b>Explore Melbourne:</b> Now that you are bag-free, you can explore Melbourne with ease! Visit places like Bourke Street Mall, Federation Square or the beautiful Royal Botanic Gardens.",
      ],
    },
    {
      type: "h4",
      heading: "Safety First: Keeping Your Luggage Secure",
      para: ["Your luggage's safety is important to us:"],
      list: [
        "<b>Monitored Locations:</b> Our locker spots are watched to ensure security.",
        "<b>Trusted Partners:</b> We work with reliable businesses to store your luggage.",
        "<b>Insurance Provided:</b> Your luggage is insured while in our care.",
      ],
    },
    {
      type: "h4",
      heading: "Make the Most of Your Melbourne Adventure",
      para: [
        "Melbourne is a vibrant city with so much to see and do. From visiting the Melbourne Aquarium to strolling along the Yarra River, you do not want luggage slowing you down. Store your bags at Southern Cross Station with Urloker and enjoy your time to the fullest.",
      ],
    },
    {
      type: "h2",
      heading:
        "Your Best Option for Southern Cross Station lockers—Book Today!",
      para: [
        "Do not let heavy luggage ruin your Melbourne adventure. Urloker provides safe, affordable, and convenient lockers at Southern Cross Station. Book today and travel with ease!",
        "Whether you are in Melbourne for a few hours or a few days, lockers at Southern Cross Station is an essential service for stress-free travel. Urloker offers affordable, convenient and secure lockers which helps you enjoy your trip without worrying about your bags. Book your lockers now and make the most of your Melbourne adventure, your journey without worrying about carrying your heavy bags. Book your locker now and maximise your Melbourne adventure because your time should be spent exploring, not carrying luggage. Urloker is always here to ensure your travel experience is as smooth and enjoyable as possible. Enjoy freedom in every journey with Urloker.",
      ],
    },
  ];
  const faqs = [
    {
      question: "Can I store oversized items with Urloker at Southern Cross Station?",
      answer: "Yes, but we recommend contacting the specific location to ensure they can accommodate your item.",
    },
    {
      question: "Is my luggage safe with Urloker near Southern Cross Station?",
      answer: "Absolutely. Security is our top priority, with measures in place to protect your belongings.",
    },
    {
      question: "How do I find Urloker locations near Southern Cross Station?",
      answer: "Simply visit <a href='https://urloker.com'>Urloker</a> and search for Southern Cross Station to see all nearby options.",
    },
    {
      question: "Can I store my luggage for more than one day?",
      answer: "Yes! Urloker offers both short-term and long-term lockers options.",
    },
    {
      question: "How do I book lockers at Southern Cross Station?",
      answer: "Simply go to Urloker, select your preferred location near Southern Cross Station and book your locker.",
    },
    {
      question: "Is my luggage safe at Urloker locker facilities?",
      answer: "Absolutely. Our locker locations are secure, monitored and insured to provide maximum safety.",
    },
    {
      question: "Can I store oversized luggage?",
      answer: "Yes, our facilities are designed to accommodate bags of all sizes.",
    },
    {
      question: "Do I need to pay extra for oversized luggages?",
      answer: "No, we do not charge extras for oversized baggage. We ensure a flat rate for all sizes of bags where size does not matter. So you do not need to pay extras.",
    },
    {
      question: "Can I Store My Luggage All Day with a single booking payment?",
      answer: "Yes, you can. At Urloker, a single booking payment covers all day lockers so there is no need to worry about hourly fees or additional costs. Once you drop off your bags for the entire day, they are securely stored and allows you to explore Melbourne without any time constraints. Your bag awaits so you do not need to rush at all.",
    },
  ];
  return (
    <div>
      {/*  SEO Header */}
      <Helmet>
        <title>Melbourne Southern cross Station Lockers - Urloker</title>
        <meta
          property="og:title"
          content="Melbourne Southern cross Station Lockers - Urloker"
        />
        <meta
          name="description"
          content="Melbourne Southern Cross Station lockers - secure and affordable luggage storage with Urloker. Book online for convenient and hassle free service"
        />
        <meta
          name="keywords"
          content="melbourne-southern-cross-station-lockers"
        />
        <meta
          property="og:url"
          content="https://urloker.com/melbourne-southern-cross-station-lockers"
        />
        <meta
          property="og:description"
          content="Melbourne Southern Cross Station lockers - secure and affordable luggage storage with Urloker. Book online for convenient and hassle free service"
        />
        <link
          rel="canonical"
          href="https://urloker.com/melbourne-southern-cross-station-lockers"
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
                alt="Melbourne Southern cross Station Lockers"
                loading="lazy"
              />
              <h1 className="text-4xl md:text-6xl font-bold my-4 text-green-800">
                Melbourne Southern cross Station Lockers
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
                      defaultValue={"Southern cross station, Australia"}
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
              alt="melbourne southern cross station lockers"
              loading="lazy"
            />
          </div>
        </header>
        <AttractionBox
          locationImage={locImage}
          me={"Melbourne Southern cross Station Lockers"}
        />
        <main className="p-5 bg-white xl:px-52 w-full mx-auto">
          {data.map((item, index) => {
            return (
              <Template
                key={index}
                type={item?.type}
                heading={item.heading}
                para={item.para}
                list={item?.list || []}
                lsType={item?.lsType || ""}
              />
            );
          })}
        </main>
        <FaqCard t={faqs} />
      </div>
    </div>
  );
}

export default SoutherLocker;
