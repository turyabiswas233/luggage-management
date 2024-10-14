import React, { useState } from "react";
import "./Banner.css";
import { useTranslation } from "react-i18next";

function CityInfo() {
  // Get the translations for the current language
  const { t: tl } = useTranslation();

  const t = tl("home")?.cityInfo;
  return (
    <div className="p-14 bg-gradient-to-br from-white to-gray-200">
      <header className="space-y-6">
        <h1 className="text-4xl font-bold">{t?.title}</h1>
        {t?.desc?.split("\\break")?.map((item, index) => (
          <p key={`pel_${index}`} className="px-3 text-justify">
            {item}
          </p>
        ))}
      </header>

      {/* other info */}
      <div className="space-y-4 mt-5">
        <section className="space-y-2">
          <h2 className="text-3xl font-bold">
            Comprehensive Luggage Storage Services
          </h2>
          <p>
            UrLoker presents a range of luggage storage solutions which meet
            every individual customer’s preferences:
          </p>
        </section>
        {t?.otherInfo?.map((ele, eid) => (
          <section key={`oele_${eid}`} className="pt-5">
            <h3 className="text-xl font-bold">{ele?.title}</h3>
            <br />
            <p>{ele?.desc}</p>
          </section>
        ))}
      </div>

      <hr />

      <div>
        <header>
          <h1>Why UrLoker is Your Best Luggage Storage Provider</h1>
          <br />
          <p>
            UrLoker is much more than providing luggage for hire for the
            clients, we provide the luggage hire services from a broader view,
            making you more relaxed. UrLoker is different for the following
            reasons:
          </p>
        </header>

        <div>
          {t?.whyBest?.map((ele, eid) => (
            <section key={`why-best_${eid}`}>
              <h3 className="text-xl font-bold">{ele?.title}</h3>
              <br />
              <p dangerouslySetInnerHTML={{ __html: ele?.desc }}></p>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}

export default CityInfo;
