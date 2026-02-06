import React from 'react';
import styles from './Footer.module.css';
import logoImage from '../logo/CogniSync-logos_black.png';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerLogo}>
        <img src={logoImage} alt="CogniSync Logo" />
      </div>
      <div className={styles.footerContact}>
        <p>Missouri, USA</p>
        <p>chris.battle@cognisync.us</p>
      </div>
    </footer>
  );
};

export default Footer;
