import React from 'react';
import './styles.css';
import logoImage from '../logo/CogniSync-logos_white.png';


const HeroSection = () => {
  return (
    <div className="hero-section">
      <img src={logoImage} alt="CogniSync Logo" className="logo" />
      <div className='button-container'>
      <a href="#services-section">
      <button className="services-button">Our Services</button>
      </a>
      <a href="#contact-section">
          <button className="signup-button">Lets Chat!</button>
          </a>
      </div>
      
      
      
      <div className="hero-content">
        <h1>CogniSync AI Automation Studio</h1>
        <h3>Empowering Efficiency: Unleashing the Future with AI Automation</h3>
        <div className="hero-buttons">
        <a href="#services-section">
          <button className="services-button">Our Services</button>
          </a>
          <a href="#contact-section">
          <button className="signup-button">Lets Chat!</button>
          </a>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
