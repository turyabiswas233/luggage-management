import React from "react";
import "./Choose.css"; // Import custom CSS for additional styling
import luggage1 from "/img/home-two/luggage-1.svg";
import luggage2 from "/img/home-two/luggage-2.jpg";
import { useTranslation } from "react-i18next";

const Choose = () => {
  const { t: tl } = useTranslation();
  const t = tl("home")?.whyChooseUs;
  return (
    <div className="choose-area bg-white relative overflow-hidden py-12">
      <div className="mx-auto max-w-screen-2xl px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          <div className="p-4">
            <div className="choose-content bg-white rounded-lg overflow-hidden shadow-lg w-auto max-w-fit mx-auto">
              <div className="p-4 grid grid-cols-2 justify-center gap-3">
                <img src={luggage1} width={400} alt="Luggage" className="rounded-lg mx-auto object-fill h-full" />
                <img src={luggage2} width={400} alt="Luggage" className="rounded-lg mx-auto object-fill h-full" />
              </div>
            </div>
          </div>
          <div className="p-4">
            <div className="choose-contact bg-white rounded-lg shadow-lg p-6">
              <div className="section-title text-left mb-6">
                <h2 className="text-3xl font-bold text-gray-800">{t.title}</h2>
              </div>
              <ul className="list-disc pl-5 space-y-3">
                {t.points.map((point, index) => (
                  <li key={index}>
                    <strong className="font-semibold">{point.title}:</strong>{" "}
                    {point.description}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Choose;
