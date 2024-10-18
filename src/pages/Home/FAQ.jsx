import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faQuestionCircle,
  faPlusCircle,
  faMinusCircle,
} from "@fortawesome/free-solid-svg-icons";
import { useTranslation } from "react-i18next";

function FAQ() {
  const [openFAQ, setOpenFAQ] = useState(0);
  const { t: tl } = useTranslation();
  const t = tl("home")?.faqSection;

  const toggleFAQ = (index) => {
    setOpenFAQ((p) => (p == index ? -1 : index));
  };

  return (
    <section
      className="py-16 bg-gradient-to-r from-gray-100 to-gray-100 scroll-mt-20"
      id="faq"
    >
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl text-left font-extrabold md:text-center text-gray-800 mb-12 transition duration-500 ease-in-out hover:text-gray-600">
          {t?.title} <FontAwesomeIcon icon={faQuestionCircle} />
        </h2>
        <div className="flex flex-wrap -mx-4">
          <div className="w-full lg:w-3/4 py-4 mx-auto h-full">
            {t.faqs.map((faq, index) => (
              <div key={index} className={`p-4 min-h-full border-y border-gray-400 transition-all ease-out duration-1000 h-full ${openFAQ == index ? "max-h-52 overflow-y-auto" : 'max-h-20'}`}>
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
        </div>
      </div>
    </section>
  );
}

export default FAQ;
