import React from "react";
import { useTranslation } from "react-i18next";

function CityInfo() {
  // Get the translations for the current language
  const { t: tl } = useTranslation();

  const t = tl("home")?.cityInfo;
  return (
    <div className="bg-gradient-to-br from-white to-gray-200">
      <header className="space-y-6 bg-gradient-to-br from-custom-teal to-custom-teal-deep text-white p-14">
        <h2 className="text-3xl font-bold ">{t?.title}</h2>
        {t?.desc?.split("\\break")?.map((item, index) => (
          <p key={`pel_${index}`} className="px-3 text-justify">
            {item}
          </p>
        ))}
      </header>

      {/* other info */}
      <div className="space-y-4 mt-5 p-14">
        <section className="space-y-2">
          <h3 className="text-2xl font-bold">
            Comprehensive Luggage Storage Services
          </h3>
          <p>
            UrLoker presents a range of luggage storage solutions which meet
            every individual customer's preferences:
          </p>
        </section>
        <div className=" grid grid-cols-1 gap-3 md:grid-cols-2">

        {t?.otherInfo?.map((ele, eid) => (
          <section key={`oele_${eid}`} className="pt-3">
            <h3 className="text-xl font-bold">{ele?.title}</h3>
            <br />
            <p>{ele?.desc}</p>
          </section>
        ))}
        </div>
      </div>

      <div className="mt-5 md:p-14 bg-gradient-to-br from-white to-custom-gray">
        <header className="p-4 md:p-5">
          <h3 className="text-3xl md:text-4xl font-bold text-custom-teal-deep">
            Why UrLoker is Your Best Luggage Storage Provider
          </h3>
          <br />
          <p className="p-3">
            UrLoker is much more than providing luggage for hire for the
            clients, we provide the luggage hire services from a broader view,
            making you more relaxed. UrLoker is different for the following
            reasons:
          </p>
        </header>

        <div className="p-5">
          {t?.whyBest?.map((ele, eid) => (
            <section key={`why-best_${eid}`} className="group">
              <br />
              <h3 className="text-xl font-bold group-hover:text-custom-teal transition-colors">{ele?.title}</h3>
              <p className="p-3" dangerouslySetInnerHTML={{ __html: ele?.desc }}></p>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}

export default CityInfo;
