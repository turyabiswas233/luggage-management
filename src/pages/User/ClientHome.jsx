import React from 'react';
import 'tailwindcss/tailwind.css';
import Banner from '../Home/Banner';
import Service from '../Home/Service';
import Projects from '../Home/Projects';
import FAQ from '../Home/FAQ';
import Team from '../Home/Team';
import Counter from '../Home/Counter';
import Review from '../Home/Review';
import Footer from '../Home/Footer';
import HowitWorks from '../Home/Howitworks';
import Choose from '../Home/Choose';
import Blog from '../Home/Blog';
import LuggageStorageLocations from '../SearchLugLocation/LuggageStorageLocations';
import ScrollToTopButton from '../Home/ScrollToTopButton';
import ClientNavbarComp from './ClientNavbarComp';



const ClientHome = () => {
    
  return (
    
    <div>
      <ClientNavbarComp />
      
      <Banner />


      <LuggageStorageLocations />

      {/* How it Works */}
      <HowitWorks />
      {/* Services */}
      <Service />
      
      {/* Projects */}
      <Projects />
      
      {/* FAQ */}
      <FAQ />
      
      {/* Team */}
      <Team />

      {/* Counter */}
      <Counter />

      <Choose />
    
      {/* Review */}
      <Review />

      <Blog/>

      {/* Footer */}
      <Footer />

      <ScrollToTopButton />
      {/* <ChatbotButton /> */}
      
    

    </div>
    
  );
};

export default ClientHome;
