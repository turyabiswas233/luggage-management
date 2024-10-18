import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import cbd from "/city/cbd/cbd.png";
import NavbarComp from "../Home/NavbarComp";
import { useTranslation } from "react-i18next";
import { faMinusCircle, faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Footer from "../Home/Footer";

function MelbourneCBD() {
  const [currentLanguage, setCurrentLanguage] = useState(
    localStorage.getItem("i18nextLng") == "en-US"
      ? "en"
      : localStorage.getItem("i18nextLng") || "en"
  );
  const { i18n } = useTranslation();
  const handleChangeLanguage = (lang) => {
    setCurrentLanguage(lang);
    i18n.changeLanguage(lang);
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
  return (
    <div>
      <NavbarComp
        setLanguage={handleChangeLanguage}
        currentLanguage={currentLanguage}
      />
      {/*  SEO Header */}
      <Helmet>
        <title>Luggage Storage Melbourne CBD - Urloker</title>
        <meta
          property="og:title"
          content="Luggage Storage Melbourne CBD - Urloker"
        />
        <meta name="description" content="Melbourne CBD" />
        <meta
          name="description"
          content="Secure luggage storage Melbourne CBD by Urloker. Affordable, convenient spots near attractions and transport. Explore the city hands-free"
        />
        <meta name="keywords" content="luggage-storage-melbourne-cbd" />
        <link rel="canonical" href="/luggage-storage-melbourne-cbd" />
      </Helmet>

      <header className="my-10 py-20 px-5">
        <h1 className="text-4xl md:text-5xl font-bold my-4">
          Luggage Storage Melbourne CBD
        </h1>
        <div className="">
          <img
            src={cbd}
            width={1280}
            height={720}
            className="aspect-video"
            alt="Luggage Storage Melbourne CBD "
          />
          <div className="space-y-6 my-5">
            <h2 className="text-3xl font-bold">
              Best Luggage Storage in Melbourne CBD with Urloker
            </h2>
            <p>
              Paying for a cab or trying to navigate a new subway or train
              system can take so much effort that even the idea of exploring a
              new city becomes a challenge.{" "}
              <a href="/" className="text-custom-teal-deep font-bold">
                Urloker
              </a>{" "}
              offers the best luggage storage in Melbourne CBD so that you can
              explore the city freely without feeling weighed down by bags.
              Being one of the critical business locations of Melbourne, our
              centres are in close proximity to significant visitations like
              Federation Square, Queen Victoria Market, Royal Botanic Gardens,
              etc. We have also placed many of our storage points at strategic
              locations near major transport hubs, including Flinders Street
              Station and Melbourne Central Station. This makes it very
              convenient for tourists to check in their bags and start their
              activities in the city.
            </p>
          </div>
        </div>
      </header>
      <main className="p-5 bg-white">
        <div className="space-y-6 my-5">
          <h2 className="text-3xl font-bold">
            Why Choose Urloker for Secure Luggage Storage Melbourne CBD?
          </h2>
          <article className="space-y-3">
            <p>
              Urloker provides its services for safe luggage storage in
              Melbourne CBD stands out for a number of reasons:
            </p>
            <ul className="grid gap-3">
              <li>
                <b>Secure Management:</b> We utilize very advanced management
                systems for storing your goods, including 24 hours of CCTV
                surveillance and secure access control.
              </li>
              <li>
                <b>Convenient Hours of Operation:</b> Our outlets are open every
                day of the week since they offer very convenient locations with
                minimal limitations for your schedule.
              </li>
              <li>
                <b>Assistance:</b> One of the best parts is that there is always
                a polite person who is willing to help so that everything works
                out without too many problems.
              </li>
              <li>
                <b>Insurance Coverage:</b> To put all concerns to rest, every
                piece of belonging stored with us is guaranteed under the
                insurance coverage policy.
              </li>
            </ul>
          </article>
        </div>
        <div className="space-y-6 my-5">
          <h3 className="text-2xl font-bold">Exploring the Melbourne CBD</h3>
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
          <h4 className="font-bold text-xl">
            Melbourne CBD Getting from the Airport to the CBD
          </h4>
          <p>
            The most convenient way to travel to the CBD from Melbourne Airport
            is by using the T4 Skybus service, which operates from the Airport
            coach terminus directly to Southern Cross Station, located in the
            city centre. This service is timely, taking about forty minutes,
            such as during peak hours, which one spends in a taxi. Southern
            Cross is easy to access by tram or just a bit of a walk to the
            desired place from the Southern Cross station.
          </p>
        </div>
        <div className="space-y-6 my-5">
          <h4 className="font-bold text-xl">Melbourne CBD City Train Links</h4>
          <p>
            While located mainly for the benefit of local workers, the CBD is
            provided with rapid transit facilities and a direct heavy rail line
            connection to some areas in metropolitan Melbourne and its suburbs.
          </p>
          <ul className="px-5 list-disc">
            <li>
              <b>Craigieburn Line:</b> Queens Park- (25 minutes) and Flemington
              Race Course- (18 minutes)
            </li>
            <li>
              <b>Glen Waverley Line:</b> Parliament- (15 minutes)
            </li>
            <li>
              <b>Belgrave Line:</b> Port Melbourne Beach- (30 minutes)
            </li>
            <li>
              <b>Cranbourne Line:</b> Royal Botanic Gardens- (12 minutes)
            </li>
            <li>
              <b>Williamstown Line:</b> Williamstown Beach- (30 minutes)
            </li>
          </ul>
        </div>

        <div className="space-y-6 my-5">
          <h3 className="text-2xl font-bold">
            Travelling Using the Tram in the Melbourne CBD
          </h3>
          <p>
            Yarra Trams can be boarded at Flinders Street, Melbourne Central, or
            at any of the local stops in the CBD. The tramlines are circular, so
            almost the whole of the CBD is within a 10-minute walk from any tram
            stop.
          </p>
          <ul className="list-decimal px-5">
            <p>
              <b>Attractions Within Reach by Tram</b>
            </p>
            <li>
              <b>Royal Botanic Gardens:</b> 16 minutes
            </li>
            <li>
              <b>melbourne Museum:</b> 20 minutes
            </li>
            <li>
              <b>Melbourne Sporting Grounds:</b> 8 minutes
            </li>
            <li>
              <b>University of Melbourne:</b> 10 minutes
            </li>
            <li>
              <b>Docklands:</b> 15 minutes
            </li>
          </ul>
          <p className="mt-5">
            If you need the service{" "}
            <a
              className="text-teal-500"
              href="https://en.wikipedia.org/wiki/Baggage"
              target="_blank"
              title="Learn more about Luggage"
            >
              luggage storage
            </a>{" "}
            in Melbourne CBD, Unlocker would be the most reasonable decision in
            every respect. We aim to ensure each user experiences the most
            straightforward, most functional and most pleasing user interface.
            Our thorough approach provides reassurance that every step will be
            fun and uncomplicated. You can store your belongings safely with
            Unloker even when you are in the Melbourne CBD, and you wish to walk
            around and explore the city without your bags.
          </p>
        </div>

        <div className="space-y-6 my-5">
          <h2 className="text-3xl font-bold">
            Luggage Lockers in Melbourne CBD Safe and Economical
          </h2>
          <p>
            Holidays are usually costly, but paying to keep your luggage is
            optional. Urloker provides economical and practical luggage lockers
            in Melbourne CBD. We operate with a very clear pricing policy with
            cheapest luggage storage service in Melbourne and ensuring safety
            and quality services, so there is no guesswork about what you are
            liable for. We have lockers of different sizes, from the smallest to
            the largest size, meant for larger suitcases. Booking the balcony
            over the internet is so straightforward.
          </p>
        </div>
        <div className="space-y-4 my-5">
          <h3 className="text-3xl font-bold">
            Sponsored Travel by Urloker Melb CBD Heavy Bag Storage
          </h3>
          <p>It is simple to use Urloker:</p>
          <ul>
            <li>
              <p>
                <b>Book Online:</b>
              </p>
              <ul className="px-10 list-disc">
                <li>Go to out site</li>
                <li>Check the area on the map</li>
                <li>Choose the area in Melbourne CBD you need</li>
              </ul>
            </li>
            <li>
              <b>Choose Locker Size: </b> Validate the size of the locker
              according to your handbag.
            </li>
            <li>
              <b>Drop Off: </b> Come to the moll with your items and check them
              in.
            </li>
            <li>
              <b>Enjoy Melbourne: </b> Go around the city without lugging around
              heavy bags.
            </li>
            <li>
              <b>Pick Up:</b> You may come any time during the day and take your
              baggage back. Our method is intentionally constructed in such a
              manner that you stay calm, so please go on and have fun throughout
              the day.
            </li>
          </ul>
        </div>

        <div>
          <h2 className="text-3xl font-bold">
            A New Way to Explore the City: Around Melbourne Flash-Free - Luggage
            Storage Service
          </h2>
          <p>
            Melbourne is still a very vibrant, cultured, and attractive place.
            Therefore, thanks to the luggage storage facilities near Melbourne
            Central Station, it is possible to take full advantage of what the
            city has to offer without any loads. For example, you can visit the
            National Gallery of Victoria, wander around the streets of Melbourne
            decorated with street art, and enjoy the tastes of Chinatown… all
            without the hassle of carrying your bags. Urloker, your Melbourne
            adventures are easy to realize with our reliable and secure luggage
            storage strategically located where you need it most.
          </p>
        </div>
      </main>
      <FaqCard t={data} />
      <Footer />
    </div>
  );
}
const FaqCard = ({ t }) => {
  const [openFAQ, setOpenFAQ] = useState(0);

  const toggleFAQ = (index) => {
    setOpenFAQ((p) => (p == index ? -1 : index));
  };
  return (
    <div className="p-5">
      <h3 className="text-center font-bold text-2xl my-5">FAQs</h3>
      {t.map((faq, index) => (
        <div
          key={index}
          className={`p-4 min-h-full border-y border-gray-400 transition-all ease-out duration-1000 h-full ${
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
              className="text-gray-600 mt-2 overflow-x-hidden break-words text-justify px-5 font-medium"
              dangerouslySetInnerHTML={{
                __html: faq.answer,
              }}
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default MelbourneCBD;
