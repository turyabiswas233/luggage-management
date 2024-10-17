import React from "react";
import logo from "/icons/android-chrome-192x192.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ScrollToTopButton from "./ScrollToTopButton";
import {
  faFacebookF,
  faInstagram,
  faTwitter,
  faLinkedinIn,
} from "@fortawesome/free-brands-svg-icons";
import { useTranslation } from "react-i18next";

function Footer() {
  const { t: tl } = useTranslation();
  const t = tl("home")?.footer;

  return (
    <footer className="bg-teal-800 text-white py-16 px-5">
      <div className="container mx-auto">
        <div className="flex flex-wrap -mx-4">
          <div className="w-full md:w-1/2 lg:w-1/5 px-2 mb-8">
            <a href="/" className="flex items-center mb-4">
              <img
                src={logo}
                alt="Urloker"
                className="transform aspect-square transition-transform duration-300 rounded-md overflow-hidden"
                width={100}
                height={100}
              />
            </a>
            <p className="hover:text-teal-200 transition-colors duration-300">
              {t.companyDescription}
            </p>
          </div>
          <div className="w-full md:w-1/2 lg:w-1/5 px-6 mb-8">
            <h3 className="text-lg font-bold mb-4 hover:text-teal-200 transition-colors duration-300">
              {t.company}
            </h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="/about"
                  className="hover:underline hover:text-teal-200 transition-colors duration-300"
                >
                  {t.about}
                </a>
              </li>
              <li>
                <a
                  href="/services"
                  className="hover:underline hover:text-teal-200 transition-colors duration-300"
                >
                  {t.services}
                </a>
              </li>
              <li>
                <a
                  href="/#projects"
                  className="hover:underline hover:text-teal-200 transition-colors duration-300"
                >
                  {t.projects}
                </a>
              </li>
              <li>
                <a
                  href="/#team"
                  className="hover:underline hover:text-teal-200 transition-colors duration-300"
                >
                  {t.team}
                </a>
              </li>
              <li>
                <a
                  href="/#blog"
                  className="hover:underline hover:text-teal-200 transition-colors duration-300"
                >
                  {t.blog}
                </a>
              </li>
            </ul>
          </div>
          <div className="w-full md:w-1/2 lg:w-1/5 px-4 mb-8">
            <h3 className="text-lg font-bold mb-4 hover:text-teal-200 transition-colors duration-300">
              {t.support}
            </h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="/#faq"
                  className="hover:underline hover:text-teal-200 transition-colors duration-300"
                >
                  {t.faq}
                </a>
              </li>
              <li>
                <a
                  href="/privacy-policy"
                  className="hover:underline hover:text-teal-200 transition-colors duration-300"
                >
                  {t.privacyPolicy}
                </a>
              </li>
              <li>
                <a
                  href="/terms-and-conditions"
                  className="hover:underline hover:text-teal-200 transition-colors duration-300"
                >
                  {t.terms}
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:underline hover:text-teal-200 transition-colors duration-300"
                >
                  {t.community}
                </a>
              </li>
              <li>
                <a
                  href="/contact"
                  className="hover:underline hover:text-teal-200 transition-colors duration-300"
                >
                  {t.contact}
                </a>
              </li>
              <li>
                <a
                  href="/support"
                  className="hover:underline hover:text-teal-200 transition-colors duration-300"
                >
                  {t.support}
                </a>
              </li>
            </ul>
          </div>
          <div className="w-full md:w-1/2 lg:w-1/5 px-4 mb-8">
            <h3 className="text-lg font-bold mb-4 hover:text-teal-200 transition-colors duration-300">
              {t.contactInfo}
            </h3>
            <ul className="space-y-2">
              <li>
                <span>
                  Email:{" "}
                  <a
                    href="mailto:admin@Urloker.com"
                    className="hover:underline hover:text-teal-200 transition-colors duration-300"
                  >
                    admin@Urloker.com
                  </a>
                </span>
              </li>
              {/* <li>
                <span>{t.phone}</span>
              </li> */}
            </ul>
          </div>
          <div className="w-full md:w-1/2 lg:w-1/5 px-4 mb-8">
            <h4 className="text-lg font-bold mb-4 hover:text-teal-200 transition-colors duration-300">
              {t.followUs}
            </h4>
            <div className="flex flex-wrap gap-3">
              <a
                href="https://www.facebook.com/profile.php?id=61564185476772"
                target="_blank"
                className="text-white hover:text-blue-600 transition-colors duration-300 text-3xl p-2"
              >
                <FontAwesomeIcon icon={faFacebookF} />
              </a>
              <a
                href="#"
                className="text-white hover:text-pink-600 transition-colors duration-300 text-3xl p-2"
              >
                <FontAwesomeIcon icon={faInstagram} />
              </a>
              <a
                href="#"
                className="text-white hover:text-blue-600 transition-colors duration-300 text-3xl p-2"
              >
                <FontAwesomeIcon icon={faTwitter} />
              </a>
              <a
                href="#"
                className="text-white hover:text-blue-600 transition-colors duration-300 text-3xl  p-2"
              >
                <FontAwesomeIcon icon={faLinkedinIn} />
              </a>
            </div>
          </div>
        </div>
        <div className="text-center mt-8">
        <ScrollToTopButton />
          <p className="hover:text-teal-200 transition-colors duration-300">
            &copy;
            {t.copyright.replace("{year}", new Date().getFullYear())}
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
