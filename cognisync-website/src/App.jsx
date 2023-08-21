import React, { useEffect, useRef } from 'react';
import TRUNK from 'vanta/src/vanta.dots.js';
import HeroSection from './HeroSection.jsx';
import AboutUsSection from './AboutUsSection.jsx';
import ServicesSection from './ServicesSection.jsx';
import ContactForm from './ContactForm.jsx';
import Mission from './MissionStatement.jsx';
import Footer from './Footer.jsx';


function App() {
  useEffect(()=>{
    TRUNK({
      el:'#vanta',
      mouseControls: false,
      touchControls: false,

    })
  }, [])
  
  return (
    <div className="App">
      <div className='bg' id='vanta'></div>
      {/* <ThreeBackground /> */}
      <HeroSection />
      <AboutUsSection />
      <Mission />
      <ServicesSection/>
      <ContactForm/>
      <Footer />
      
      
    </div>
  );
}

export default App;
