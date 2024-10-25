import React from "react";
import { FcServices } from "react-icons/fc";
import NavComp from "./NavbarComp";
import Footer from "./Footer";
import "./Service.css"; // Make sure to create and include this CSS file
import { Helmet } from "react-helmet-async";

function Service() {
  return (
    <section
      className="bg-gradient-to-br pt-44 from-gray-50  to-gray-300 py-16 scroll-mt-20 text-slate-700"
      id="services"
    >
      <Helmet>
        <title>Our Services</title>
        <meta property="og:title" content="Our Services" />
        <meta
          name="description"
          content="Our services include secure luggage storage, key storage for Airbnb hosts and guests, online booking platform, QR code booking at partner locations, flexible storage options, all-day access, real-time notifications, 24/7 customer support, unbeatable pricing, multiple storage locations, and insurance coverage."
        />
        <meta
          property="og:description"
          content="Our services include secure luggage storage, key storage for Airbnb hosts and guests, online booking platform, QR code booking at partner locations, flexible storage options, all-day access, real-time notifications, 24/7 customer support, unbeatable pricing, multiple storage locations, and insurance coverage."
        />
        <link rel="canonical" href="https://urloker.com/services" />

      </Helmet>
      <NavComp />
      <h3 className="my-3 text-4xl font-semibold text-center">Our services</h3>
      <div className="flex justify-center items-center">
        <FcServices size={200} className="animate-pulse" />
      </div>
      <div>
        <ul className="px-14 py-5 grid grid-cols-1 gap-5">
          {serviceList.map((ele, eleId) => (
            <li
              className="p-10 rounded-md shadow-xl hover:bg-white transition-colors"
              key={eleId}
            >
              <span className="text-xl font-bold">{ele?.title}: </span>{" "}
              <span>{ele?.desc}</span>
            </li>
          ))}
        </ul>
      </div>
      <br />
      <Footer />
    </section>
  );
}
const serviceList = [
  {
    title: "Secure Luggage Storage",
    desc: "Safe and monitored storage locations with surveillance systems to keep customers' belongings secure.",
  },
  {
    title: "Key Storage for Airbnb Hosts and Guests",
    desc: "We now offer key storage services, allowing Airbnb hosts to securely store their keys and guests to pick them up with ease at our partner locations.",
  },
  {
    title: "Online Booking Platform",
    desc: "A user-friendly website and mobile platform that allows customers to book luggage storage in advance with just a few clicks.",
  },
  {
    title: "QR Code Booking at Partner Locations",
    desc: "Customers can scan a QR code at any partner store to quickly and easily book storage services.",
  },
  {
    title: "Flexible Storage Options",
    desc: "Storage solutions for all types of luggage, regardless of size or shape, from small backpacks to large suitcases.",
  },
  {
    title: "All-Day Access",
    desc: "Customers can access their luggage any time during business hours, allowing for flexibility in retrieval.",
  },
  {
    title: "Real-Time Notifications",
    desc: "Instant confirmation of bookings, reminders about pick-up times, and updates about any changes via SMS or email.",
  },
  {
    title: "24/7 Customer Support:",
    desc: "A dedicated chatbot and support team available around the clock to handle customer inquiries and resolve issues.",
  },
  {
    title: "Unbeatable Pricing",
    desc: "Transparent, flat-rate pricing with no hidden fees, ensuring a cost-effective solution for all travellers.",
  },
  {
    title: "Multiple Storage Locations",
    desc: "A growing network of partner stores and locations across Australia to make storage convenient and accessible wherever customers are.",
  },
  {
    title: "Insurance Coverage",
    desc: "Optional insurance for additional peace of mind, ensuring that high-value items are protected during storage.",
  },
];
export default Service;
