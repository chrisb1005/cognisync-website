import React, { useEffect } from 'react';
import styles from './HeroSection.module.css';
import logoImage from '../logo/CogniSync-logos_white.png';
import TRUNK from 'vanta/src/vanta.globe';

const HeroSection = () => {
  useEffect(() => {
    TRUNK({
      el: '#hero-vanta',
      mouseControls: false,
      touchControls: false,
      scale: 1,
      minHeight: 650,
      minWidth: 300,
      backgroundColor: 0x1a1a1a,
      color: 0x404040,
    });
  }, []);

  return (
    <div className={styles.heroSection}>
      <div className={styles.vantaBg} id="hero-vanta"></div>
      <img src={logoImage} alt="CogniSync Logo" className={styles.logo} />
      <div className={styles.buttonContainer}>
        <a href="#services-section">
          <button className={styles.headerButton}>Our Services</button>
        </a>
        <a href="#contact-section">
          <button className={styles.headerButton}>Lets Chat!</button>
        </a>
      </div>

      <div className={styles.heroContent}>
        <h1>CogniSync Integration Studio</h1>
        <h3>Empowering Efficiency: Connect your tools. Automate your work. Focus on growth.</h3>
        <div className={styles.heroButtons}>
          <a href="#services-section">
            <button className={styles.headerButton}>Our Services</button>
          </a>
          <a href="#contact-section">
            <button className={styles.headerButton}>Lets Chat!</button>
          </a>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
