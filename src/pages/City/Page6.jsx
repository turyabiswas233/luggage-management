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
      "Looking for luggage storage at Melbourne central station? Visit <a href='https://urloker.com'>Urloker</a> for secure and affordable options. Whether you are catching a train, exploring the city without heavy luggage or want to make the most of your day before check-in, our centrally located luggage storage has you covered. Enjoy Melbourne hands-free with reliable, seamless and affordable storage services with Urloker.",
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
      "At <a href='https://urloker.com'>Urloker</a>, We offer a hassle-free way to store your luggage near luggage storage Melbourne central station. We understand the needs of travellers because we have been there ourselves looking to explore the beauty of travelling without being weighed down by bags that is why we are here to offer you a seamless luggage storage solution.",
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
    title:
      "How to Use Urloker's Luggage Storage Near Melbourne Central Station",
    type: "h3",
    para: [
      "Getting started is simple, and we have designed the process to be as straightforward as possible.",
    ],
    list: [
      "<b>Step-by-Step Guide</b>",
      [
        "Visit our Website: Go to <a href='https://urloker.com'>Urloker</a>.",
        "Select Dates: Choose when you need luggage storage at Melbourne central station.",
        "Book Online: Secure your spot instantly with our secure and easy booking system.",
        "Drop Off Bags: Bring your luggage to our convenient location near Melbourne central station.",
        "Enjoy Melbourne: Explore the city unburdened by heavy bags. Enjoy freedom in every journey.",
        "Pick Up Luggage: Collect your belongings when you are ready to move on.",
      ],
      "<b>No Hassle, Just Convenience</b>",
      [
        "We have streamlined the entire process so you can focus on enjoying your time in Melbourne. No lengthy forms or complicated procedures just quick and efficient service.",
      ],
    ],
  },
  {
    title:
      "Benefits of Our Luggage Storage Service at Melbourne Central Station",
    type: "h2",
    para: [
      "Wondering why you should choose us? Let me highlight the advantages of using our service.",
    ],
    list: [
      "<b>Convenience at Its Best</b>",
      [
        "Close to Attractions: Store your bags and visit nearby sights like the State Library Victoria and Queen Victoria Market with ease.",
        "Easy Booking: Our seamless online reservation system makes it incredibly easy to secure luggage storage.",
        "Quick Drop-Off and Pick-Up: Spend less time worrying about your luggage and more time enjoying the city.",
      ],
      "<b>Security You Can Trust</b>",
      [
        "24/7 Surveillance: Our facility is monitored round the clock.",
        "Secure Storage: Only authorised staff have access to the storage area.",
        "Insurance Coverage: Urloker offers Optional insurance for extra peace of mind.",
      ],
      "<b>Affordable and Transparent Pricing</b>",
      [
        "Daily Rates: One flat rate covers the entire day.",
        "Weekly Rates: Great for longer stays.",
        "No Hidden Fees: What you see is what you pay.",
      ],
    ],
  },
  {
    title:
      "Safety Measures at Our Luggage Storage Near Melbourne Central Station",
    type: "h2",
    para: [
      "I understand that safety is paramount when it comes to your belongings.",
    ],
    list: [
      "<b>How We Keep Your Luggage Safe</b>",
      [
        "Secure Lockers: Sturdy, tamper-proof lockers protect your items.",
        "Staff Vigilance: Trained professionals monitor the facility.",
        "Regular Audits: We perform routine checks to ensure everything is in order.",
      ],
    ],
  },
  {
    title:
      "Flat-Rate Luggage Storage at Melbourne Central Station: Size Does not Matter",
    type: "h3",
    para: [
      "When it comes to storing your <a href='https://en.wikipedia.org/wiki/Baggage'>luggage</a>, we believe in keeping it simple and hassle-free. With our luggage storage service at Melbourne central station, you can enjoy:",
    ],
    list: [
      "<b>Size Doesn't Matter - Flat Rate for All Bags</b>",
      [
        "Whether it is a small backpack or an oversized suitcase, you pay the same low flat rate. No complicated size-based pricing and just one price for everything, no matter how big or small.",
      ],
      "<b>Unbeatable Pricing for All-Day Storage</b>",
      [
        "Need storage for the entire day? No problem. You can book for a full day with a single booking, no need to rush, no hourly limits. Drop off your bags, enjoy Melbourne at your own pace and collect them whenever you are ready.",
      ],
    ],
  },
  {
    title:
      "Tips for Exploring Melbourne After Storing Luggage at Melbourne Central Station",
    type: "h3",
    para: [
      "With your bags safely stored, here is how to make the most of your time.",
    ],
    list: [
      "<b>Must-Visit Attractions Near Melbourne Central Station</b>",
      [
        "State Library Victoria: Explore the beautiful architecture and free exhibitions",
        "Bourke Street Mall: Shop at popular Australian and international retailers",
        "Chinatown: Experience diverse cuisine and vibrant culture",
        "Old Melbourne Gaol: Dive into the city's history",
        "Federation Square: Discover the cultural heart of Melbourne",
        "Southbank: Take a leisurely walk along the Yarra River",
      ],
      "<b>Getting Around Easily</b>",
      [
        "Free Tram Zone: Take advantage of the free trams in the city centre",
        "Walking Tours: Join a guided tour to discover hidden gems",
        "Bike Rentals: Explore the city on two wheels",
      ],
      "<b>Dining and Entertainment</b>",
      [
        "Laneway Cafes: Discover Melbourne's famous coffee culture",
        "Theatres and Galleries: Catch a show or visit an art exhibition",
        "Street Art: Explore the colourful murals in Hosier Lane",
      ],
    ],
  },
  {
    title:
      "Why Choose Urloker for Luggage Storage at Melbourne Central Station",
    type: "h2",
    para: [
      "There are other options out there but here is why we are the best choice.",
    ],
    list: [
      "<b>Customer-Focused Service</b>",
      [
        "Personalised Assistance: We are here to help with any questions or concerns.",
        "Flexible Options: Tailored services to meet your specific needs.",
        "Quick Responses: We value your time and strive to provide prompt service.",
      ],
      "<b>Trusted by Travellers</b>",
      [
        "Positive Reviews: Our customers appreciate our reliability and convenience.",
        "Repeat Clients: Many travellers return to us whenever they are in Melbourne.",
      ],
    ],
  },
  {
    title: "Convenient Location Near Melbourne Central Station",
    type: "h3",
    para: ["Our prime spot makes us hard to beat."],
    list: [
      "<b>Easy to Find</b>",
      [
        "Central Address: Located in the heart of Melbourne's CBD.",
        "Nearby Landmarks: Close to popular spots like the Melbourne Museum and Carlton Gardens.",
        "Accessible by Public Transport: Easy to reach via tram, train or bus.",
      ],
      "<b>Map and Directions</b>",
      [
        "Detailed Map: Available on our website to help you find us easily.",
        "Directions: Step by step instructions from <a href='https://en.wikipedia.org/wiki/Melbourne_Central_railway_station'>Melbourne Central Station</a> to our location.",
      ],
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
  {
    title:
      "Flexible Booking Options for Luggage Storage Near Melbourne Central Station",
    type: "h2",
    para: ["We adapt to your plans."],
    list: [
      "<b>Book Anytime, Anywhere</b>",
      [
        "Online Access: Reserve your storage space from your phone or computer.",
        "No Long-Term Commitments: Store your luggage for as long or as short as you need.",
        "Last-Minute Bookings: We accommodate spontaneous travellers.",
      ],
      "<b>Easy Modifications</b>",
      [
        "Change of Plans?: Modify your booking easily through our website or by contacting us.",
        "Cancellation Policy: Clear and fair policies in case you need to cancel. You can cancel and get a full refund anytime before drop off time.",
      ],
    ],
  },
  {
    title: "Customer Support for Luggage Storage at Melbourne Central Station",
    type: "h2",
    para: ["We are here to assist you every step of the way."],
    list: [
      "<b>How We Help</b>",
      [
        "Live Chat: Get immediate answers to your questions on our website.",
        "Email Support: For detailed inquiries or assistance.",
        "Phone Assistance: Speak directly with us for urgent matters.",
      ],
      "<b>Feedback Welcome</b>",
      [
        "Your Opinions Matter: We appreciate feedback to improve our services.",
        "Review Us: Share your experience to help other travellers.",
      ],
    ],
  },
  {
    title: "How Our Luggage Storage Works",
    type: "h3",
    para: ["Transparency is key."],
    list: [
      "<b>Simple Process</b>",
      [
        "No Complicated Forms: Quick and straightforward booking and check in.",
        "Immediate Confirmation: Receive instant confirmation of your booking.",
        "Clear Instructions: Easy to follow steps provided upon booking.",
      ],
      "<b>What to Bring</b>",
      [
        "Valid ID: For verification purposes.",
        "Booking Confirmation: Printed or digital copy.",
      ],
    ],
  },
  {
    title: "Enjoy Melbourne Without Luggage Weighing You Down",
    type: "h4",
    para: ["Experience the city unburdened."],
    list: [
      "<b>Freedom to Roam</b>",
      [
        "Spontaneous Plans: Go wherever the day takes you without baggage constraints.",
        "Comfort: Move around easily without the physical strain of heavy bags.",
        "Extended Activities: Participate in tours or events that don’t allow luggage.",
      ],
      "<b>Make the Most of Your Time</b>",
      [
        "Maximise Layovers: If you have a few hours between flights or trains, explore the city.",
        "Early Check-Outs or Late Flights: Store your bags after hotel check-out until it's time to depart.",
      ],
    ],
  },
  {
    title:
      "Explore Attractions Near Melbourne Central Station After Storing Your Luggage",
    type: "h4",
    para: ["So much to see nearby."],
    list: [
      "<b>Local Highlights</b>",
      [
        "Melbourne Museum: Immerse yourself in science and culture.",
        "Royal Exhibition Building: Admire one of the world's oldest remaining exhibition pavilions.",
        "Queen Victoria Market: Shop for fresh produce and unique souvenirs.",
      ],
      "<b>Cultural Experiences</b>",
      [
        "National Gallery of Victoria: Discover world-class art collections.",
        "ACMI (Australian Centre for the Moving Image): Explore the world of film and digital culture.",
      ],
    ],
  },
  {
    title:
      "Our Commitment to Safe Luggage Storage at Melbourne Central Station",
    type: "h4",
    para: ["Your trust matters."],
    list: [
      "<b>Dedicated to Security</b>",
      [
        "Ongoing Improvements: We continuously update our security measures.",
        "Staff Training: Our team is trained in best practices for safety and customer service.",
        "Compliance: We adhere to all local regulations and standards.",
      ],
    ],
  },
  {
    title: "Accessibility of Our Luggage Storage",
    type: "h4",
    para: ["We cater to everyone."],
    list: [
      "<b>Inclusive Facilities</b>",
      [
        "Wheelchair Access: Our premises are accessible to those with mobility needs.",
        "Language Support: Assistance available in multiple languages.",
        "Family-Friendly: Accommodations for parents with young children.",
      ],
      "<b>Amenities</b>",
      [
        "Rest Areas: Comfortable seating if you need a moment to rest.",
        "Washrooms: Clean facilities available for customers.",
      ],
    ],
  },
  {
    title: "Group Rates for Luggage Storage at Melbourne Central Station",
    type: "h3",
    para: ["Travelling with others? We have got you covered."],
    list: [
      "<b>Special Offers</b>",
      [
        "Discounts for Groups: Save more when storing multiple bags.",
        "Custom Packages: Tailored solutions for tour groups or corporate events.",
      ],
      "<b>How to Avail Group Rates</b>",
      [
        "Contact Us: Reach out for customised pricing.",
        "Advance Booking: Ensure availability for your entire group.",
      ],
    ],
  },
  {
    title: "Store Oversized Items at Our Luggage Storage",
    type: "h4",
    para: ["No item is too big for us to handle."],
    list: [
      "<b>We Accommodate</b>",
      [
        "Sports Equipment: Bikes, surfboards, skis whatever you name it.",
        "Musical Instruments: Secure storage for your valuable instruments.",
        "Artwork: Safe keeping for art pieces during exhibitions or transit.",
      ],
      "<b>Special Handling</b>",
      [
        "Fragile Items: Extra care for delicate belongings.",
        "Protective Packaging: We can provide materials to safeguard your items.",
      ],
    ],
  },
  {
    title:
      "Extended Opening Hours for Luggage Storage at Melbourne Central Station",
    type: "h3",
    para: ["We work around your schedule."],
    list: [
      "<b>Open When You Need Us</b>",
      [
        "Early Birds and Night Owls: Our extended hours cater to all schedules.",
        "Holiday Hours: Open even on public holidays for your convenience.",
      ],
      "<b>After-Hours Access</b>",
      [
        "By Appointment: Arrange access outside regular hours if needed.",
        "Emergency Assistance: Contact us for urgent matters.",
      ],
    ],
  },
  {
    title: "Our Online Booking System",
    type: "h3",
    para: ["Technology makes it easy."],
    list: [
      "<b>User-Friendly Platform</b>",
      [
        "<b>Mobile-Friendly</b>: Book from your smartphone seamlessly with ease.",
        "<b>Secure Transactions</b>: Your payment information is protected.",
        "<b>Account Management</b>: Create an account to manage bookings and preferences.",
      ],
      "<b>Notifications</b>",
      [
        "<b>Booking Reminders</b>: Receive alerts about your upcoming storage.",
        "<b>Promotional Offers</b>: Be the first to know about discounts and deals.",
      ],
    ],
  },
  {
    title: "Insurance Options for Luggage Storage",
    type: "h5",
    para: ["Extra security for peace of mind."],
    list: [
      "<b>We have Got You Covered</b>",
      [
        "<b>Optional Insurance</b>: Choose to insure valuable items.",
        "<b>Transparent Terms</b>: Clear policies without hidden clauses.",
        "<b>Claims Assistance</b>: Support in the unlikely event you need to file a claim.",
      ],
    ],
  },
  {
    title: "Luggage Storage Melbourne Central Station - Book Now",
    type: "h2",
    para: [
      "Do not let your luggage hold you back from experiencing all Melbourne offers. With our convenient and secure luggage storage Melbourne Central Station, you can explore the city freely and make the most of your time here. Next time if you are in town, remember <a href='https://urloker.com'>Urloker</a> your go-to for hassle <i>free luggage storage at Melbourne Central Station.</i>",
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
      question: "How Close Are You to Melbourne Central Station?",
      answer:
        "We have partners located directly in Melbourne Central Station as well as in surrounding areas, all within a short, easy to reach distance. Whether you are right at the station or nearby, you will always find a convenient spot to store your luggage.",
    },
    {
      question:
        "In which areas of the City of Melbourne can users find Urloker's luggage storage?",
      answer:
        "Urloker has strategic locations for luggage storage in the heart of Melbourne. Our locations are close to Central Melbourne and significant attractions, transport hubs as well as Flinders Street Station and Melbourne Central Station and famous spots such as Federation Square and Queen Victoria Market.",
    },
    {
      question:
        "What's the pricing policy for Urloker's luggage storage Melbourne CBD ?",
      answer:
        "We offer flat rates and affordable pricing for all luggage and bag sizes.",
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
        <div className="bg-slate-50 border-t border-t-slate-200 py-6">
          <FaqCard
            t={data}
            title={"FAQs About Luggage Storage at Melbourne Central Station"}
            p="You asked, We answered."
          />
        </div>
      </div>
    </div>
  );
}

export default MelbourneCentral;
