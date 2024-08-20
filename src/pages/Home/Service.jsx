import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCar, faTruck, faBuilding, faHome } from '@fortawesome/free-solid-svg-icons';
import '@fortawesome/fontawesome-svg-core/styles.css';
import './Service.css'; // Make sure to create and include this CSS file

function Service() {
  return (
    <section className="bg-gradient-to-b from-gray-50  to-gray-100 py-16 scroll-mt-20" id="services">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center mb-8">We Are Committed To Give Our Best Services</h2>
        <div className="flex flex-wrap -mx-4">
          <div className="w-full md:w-1/2 lg:w-1/4 px-4 mb-8">
            <div className="service-item service-card">
              <div className="service-top">
                <FontAwesomeIcon icon={faCar} className="text-4xl text-blue-400 mb-4" />
              </div>
              <h3 className="text-xl font-bold mb-4 service-title"><a href="service-details.html">Car Washing</a></h3>
              <p className="service-text">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
              <a href="service-details.html" className="service-link">Learn More <i className="fas fa-arrow-right"></i></a>
            </div>
          </div>
          <div className="w-full md:w-1/2 lg:w-1/4 px-4 mb-8">
            <div className="service-item service-card two">
              <div className="service-top hover:text-gray-400">
                <FontAwesomeIcon icon={faTruck} className="text-4xl text-blue-400  mb-4" />
              </div>
              <h3 className="text-xl font-bold mb-4 service-title"><a href="service-details.html">Truck Washing</a></h3>
              <p className="service-text">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
              <a href="service-details.html" className="service-link">Learn More <i className="fas fa-arrow-right"></i></a>
            </div>
          </div>
          <div className="w-full md:w-1/2 lg:w-1/4 px-4 mb-8">
            <div className="service-item service-card three ">
              <div className="service-top ">
              <FontAwesomeIcon icon={faBuilding} className="text-4xl text-blue-400 mb-4"
    />
              </div>
              <h3 className="text-xl font-bold mb-4 service-title"><a href="service-details.html">Office Luggage</a></h3>
              <p className="service-text">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
              <a href="service-details.html" className="service-link">Learn More <i className="fas fa-arrow-right"></i></a>
            </div>
          </div>
          <div className="w-full md:w-1/2 lg:w-1/4 px-4 mb-8">
            <div className="service-item service-card">
              <div className="service-top">
                <FontAwesomeIcon icon={faHome} className="text-4xl text-blue-400 mb-4" />
              </div>
              <h3 className="text-xl font-bold mb-4 service-title"><a href="service-details.html">House Luggage</a></h3>
              <p className="service-text">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
              <a href="service-details.html" className="service-link">Learn More <i className="fas fa-arrow-right"></i></a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Service;
