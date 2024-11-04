import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Helmet } from "react-helmet-async";
const AboutDetails = () => {
  const { t } = useTranslation();
  const translate = t("home")?.about;

  return (
    <div className="bg-white text-black">
      <Helmet>
        <title>Urloker | {translate?.title}</title>
        <meta name="description" content={translate?.info[0]} />
        <meta property="og:title" content={translate?.title} />
        <meta property="og:description" content={translate?.info[0]} />
        <link rel="canonical" href="https://urloker.com/about" />
      </Helmet>
      <div className="p-10 space-y-10 min-h-screen">
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
