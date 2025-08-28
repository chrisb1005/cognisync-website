import React, { useEffect, useRef } from 'react';
import TRUNK from 'vanta/src/vanta.dots.js';
import HeroSection from '../components/HeroSection.jsx';
import AboutUsSection from '../components/AboutUsSection.jsx';
import ServicesSection from '../components/ServicesSection.jsx';
import ContactForm from '../components/ContactForm.jsx';
import Mission from '../components/MissionStatement.jsx';
import Footer from '../components/Footer.jsx';



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
