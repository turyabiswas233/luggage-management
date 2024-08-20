import React from 'react'
import NavbarComp from '../Home/NavbarComp'
import 'tailwindcss/tailwind.css';
import Service from '../Home/Service';
import Review from '../Home/Review';
import Footer from '../Home/Footer';


function ServiceCom() {
  return (
    <div>
        <NavbarComp />
        <div className='mt-20'>
        <Service   />
        </div>
        
        <Review />
        <Footer/>
    </div>
  )
}

export default ServiceCom