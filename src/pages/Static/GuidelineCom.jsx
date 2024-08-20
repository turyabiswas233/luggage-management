import React from 'react'
import NavbarComp from '../Home/NavbarComp'
import HowItWorks from '../Home/Howitworks'
import Footer from '../Home/Footer'

function GuidelineCom() {
  return (
    <div>
        <NavbarComp/>
        <div className='mt-20'>
            <HowItWorks  />
        </div>
        <Footer/>
        
    </div>
  )
}

export default GuidelineCom