import React from 'react';

import logoImage from '../logo/CogniSync-logos_white.png';


const HeroSection = () => {
  return (
    <div className="hero-section">
      <img src={logoImage} alt="CogniSync Logo" className="logo" />
      <div className='button-container'>
      <a href="#services-section">
      <button className='cb-header-services-button'>Our Services</button>
      </a>
      <a href="#contact-section">
          <button className="cb-header-signup-button">Lets Chat!</button>
          </a>
      </div>
      
      
      
      <div className="hero-content">
        <h1>CogniSync Integration Studio</h1>
        <h3>Empowering Efficiency: Connect your tools. Automate your work. Focus on growth.</h3>
        <div className="hero-buttons">
        <a href="#services-section">
          <button className="cb-header-services-button">Our Services</button>
          </a>
          <a href="#contact-section">
          <button className="cb-header-signup-button">Lets Chat!</button>
          </a>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
