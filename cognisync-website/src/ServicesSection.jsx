import React, { useEffect } from 'react';
import './styles.css';
import TRUNK from 'vanta/src/vanta.globe';

const ServicesSection = () => {
  useEffect(()=>{
    TRUNK({
      el:'#services',
      mouseControls: false,
      touchControls: false,
      scale: 1,
      minHeight: 650,
      minWidth: 300,
      backgroundColor: 0xffffff,
      color: 0x0,


    })
  }, [])
  return (
    <div className="services-section" id='services-section'>
      <div className='services-header'><h1>Services</h1></div>
      <div class="services-container"id='services'>
  <div class="service-card">
    <h2 class="service-title">GPT-3 Development</h2>
    <p class="service-description">Create innovative applications using the power of GPT-3. We provide end-to-end development services to bring your ideas to life.</p>
  </div>
  
  <div class="service-card">
    <h2 class="service-title">AI Consulting</h2>
    <p class="service-description">Leverage our expertise in AI to drive business growth. Our consulting services help you make strategic AI decisions and implementations.</p>
  </div>
  
  <div class="service-card">
    <h2 class="service-title">NLP Services</h2>
    <p class="service-description">Unlock the potential of Natural Language Processing. Our NLP services enable you to extract insights and value from text data.</p>
  </div>
  </div>


      {/* Add your content for the Services section */}
    </div>
  );
};

export default ServicesSection;
