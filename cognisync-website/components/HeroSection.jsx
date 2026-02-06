import React from 'react';
import styles from './HeroSection.module.css';
import logoImage from '../logo/CogniSync-logos_white.png';

const HeroSection = () => {
  return (
    <div className={styles.heroSection}>
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
