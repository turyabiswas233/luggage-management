import React from 'react';
import './Projects.css'; 
import furniture from '../../assets/img/home-two/furniture-1.jpg';
import plumbing from '../../assets/img/home-two/plumbing-1.jpg';
import house from '../../assets/img/home-two/house-1.jpg';

function Projects() {
  return (
    <section className="bg-gradient-to-r from-gray-200 to-gray-200 py-16 scroll-mt-20" id='projects'>
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center mb-8">Have A Quick Look At Some Of Our Works & Services</h2>
        <div className="flex flex-wrap -mx-4">
          <div className="w-full md:w-1/2 lg:w-1/3 px-4 mb-8">
            <div className="card bg-white p-6 rounded-lg shadow-md">
              <img src={furniture} alt="Service" className="mb-4 rounded-lg" />
              <h3 className="text-xl font-bold mb-4">Interior Luggage Service</h3>
              <p>Explore our diverse portfolio showcasing our expertise in providing top-notch interior luggage services. Each project reflects our commitment to exceptional quality and customer satisfaction, ensuring that every detail is handled with precision and care. Discover how we transform interiors to enhance your travel experience with our specialized luggage services.</p>
              <a href="service-details.html" className="hover:underline">Learn More</a>
            </div>
          </div>
          <div className="w-full md:w-1/2 lg:w-1/3 px-4 mb-8">
            <div className="card bg-white p-6 rounded-lg shadow-md">
              <img src={plumbing} alt="Service" className="mb-4 rounded-lg" />
              <h3 className="text-xl font-bold mb-4">Plumbing Support for Luggage Management</h3>
              <p>Our portfolio also includes specialized plumbing support to ensure your luggage systems are efficient and reliable. We bring expertise in integrating plumbing solutions with luggage management systems, reflecting our dedication to quality craftsmanship and seamless service delivery.</p>
              <a href="service-details.html" className="hover:underline">Learn More</a>
            </div>
          </div>
          <div className="w-full md:w-1/2 lg:w-1/3 px-4 mb-8">
            <div className="card bg-white p-6 rounded-lg shadow-md">
              <img src={house} alt="Service" className="mb-4 rounded-lg" />
              <h3 className="text-xl font-bold mb-4">Comprehensive House Luggage Solutions</h3>
              <p>Discover our house luggage solutions that cater to all your travel needs. Our projects showcase our ability to provide comprehensive luggage services that transform your living spaces into functional and stylish environments. We ensure every project is executed with the highest standards of quality and customer satisfaction.</p>
              <a href="service-details.html" className="hover:underline">Learn More</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Projects;
