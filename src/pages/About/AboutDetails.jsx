import React, { useState } from "react"; 
import NavComp from "../Home/NavbarComp";
import Footer from "../Home/Footer";
import { useTranslation } from "react-i18next";
import { Helmet } from "react-helmet-async";
const AboutDetails = () => {
  const [currentLanguage, setCurrentLanguage] = useState(
    localStorage.getItem("i18nextLng") == "en-US"
      ? "en"
      : localStorage.getItem("i18nextLng") || "en"
  );
  const { i18n, t } = useTranslation();
  const translate = t("home")?.about;
  const handleChangeLanguage = (lang) => {
    setCurrentLanguage(lang);
    i18n.changeLanguage(lang);
  };
  return (
    <div className="bg-white text-black">
      <Helmet>
        <title>Urloker | {translate?.title}</title>
        <meta name="description" content={translate?.info[0]} />
        <meta property="og:title" content={translate?.title} />
        <meta property="og:description" content={translate?.info[0]} />
        <link rel="canonical" href="https://urloker.com/about" />

      </Helmet>
      <NavComp
        currentLanguage={currentLanguage}
        setLanguage={handleChangeLanguage}
      />
      <div className="p-10 pt-32 space-y-10 mt-10  min-h-screen">
        <h2 className="text-center font-bold text-4xl text-slate-800 mb-20">
          {translate?.title}
        </h2>
        <p>{translate?.info[0]} </p>

        <p>{translate?.info[1]} </p>

        <p>{translate?.info[2]} </p>

        <p>{translate?.info[3]} </p>
      </div>
     </div>
  );
};
 export default AboutDetails;
