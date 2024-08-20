import React from 'react';
import './Choose.css'; // Import custom CSS for additional styling
import luggage1 from '../../img/home-two/luggage-1.jpg';
import luggage2 from '../../img/home-two/luggage-2.jpg';
import translations from './translations'; // Import translations

const Choose = ({ currentLanguage = 'en' }) => {
  const t = translations[currentLanguage].whyChooseUs; // Accessing whyChooseUs section based on the current language

  return (
    <div className="choose-area bg-white relative overflow-hidden py-12">
      <div className="choose-shape absolute inset-0 z-0">
        <img src="assets/img/home-one/choose1.png" alt="Shape" className="animate-spin-slow absolute top-[330px] left-[345px]" />
        <img src="assets/img/home-one/banner-shape3.png" alt="Shape" className="animate-pulse absolute right-[100px] bottom-[-40px]" />
      </div>
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap items-center justify-between">
          <div className="lg:w-1/2 p-4">
            <div className="choose-content bg-white rounded-lg overflow-hidden shadow-lg">
              <div className="p-4">
                <img src={luggage1} alt="Luggage" className="rounded-lg" />
                <img src={luggage2} alt="Luggage" className="rounded-lg mt-4" />
              </div>
            </div>
          </div>
          <div className="lg:w-1/2 p-4">
            <div className="choose-contact bg-white rounded-lg shadow-lg p-6">
              <div className="section-title text-left mb-6">
                <h2 className="text-3xl font-bold text-gray-800">{t.title}</h2>
              </div>
              <ul className="list-disc pl-5 space-y-3">
                {t.points.map((point, index) => (
                  <li key={index}>
                    <strong className="font-semibold">{point.title}:</strong> {point.description}
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
