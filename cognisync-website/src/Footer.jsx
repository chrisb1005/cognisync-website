import React from 'react';
import './styles.css';
import logoImage from '../logo/CogniSync-logos_black.png';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-logo">
        <img src={logoImage} alt="CogniSync Logo" />
      </div>
      <div className="footer-contact">
        <p>Missouri, USA</p>
        
        <p>chris.battle@cognisync.us</p>
      </div>
    </footer>
  );
};

export default Footer;
