import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const Schema = () => {
  const location = useLocation();

  const [schemaData, setSchema] = useState({
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "UrLoker",
    description:
      "UrLoker offers secure and convenient luggage storage solutions.",
    url: "https://urloker.com", // Base URL
    logo: "https://urloker.com/icons/favicon.ico",
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "Customer Service",
    },
    sameAs: [
      "https://www.facebook.com/UrLoker",
      "https://www.twitter.com/UrLoker",
      "https://www.instagram.com/UrLoker",
    ],
  });
  useEffect(() => {
    if (location.pathname === "/about") {
      setSchema((pre) => ({
        ...pre,
        url: "https://urloker.com/about",
      }));
    } else if (location.pathname === "/privacy-policy") {
      setSchema((pre) => ({
        ...pre,
        url: "https://urloker.com/privacy-policy",
      }));
    } else if (location.pathname === "/services") {
      setSchema((pre) => ({
        ...pre,
        url: "https://urloker.com/services",
      }));
    } else if (location.pathname === "/support") {
      setSchema((pre) => ({
        ...pre,
        url: "https://urloker.com/support",
      }));
    } else if (location.pathname === "/luggage-storage-melbourne-cbd") {
      setSchema((pre) => ({
        ...pre,
        url: "https://urloker.com/luggage-storage-melbourne-cbd",
      }));
    } else if (
      location.pathname === "/flinders-street-station-luggage-storage"
    ) {
      setSchema((pre) => ({
        ...pre,
        url: "https://urloker.com/flinders-street-station-luggage-storage",
      }));
    } else if (location.pathname === "/luggage-storage-melbourne-airport") {
      setSchema((pre) => ({
        ...pre,
        url: "https://urloker.com/luggage-storage-melbourne-airport",
      }));
    }
  }, [location]);

  return (
    <script type="application/ld+json">{JSON.stringify(schemaData)}</script>
  );
};

export default Schema;
