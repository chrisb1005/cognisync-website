import React from 'react';
import styles from './Footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerGrid}>
        <div className={styles.footerBrand}>
          <a href="#home" className={styles.footerBrandLogo}>COGNISYNC.us</a>
          <p>Your partner in data automation and integration solutions. We help businesses eliminate manual work and focus on growth through powerful, custom-built automation systems.</p>
          <div className={styles.socialLinks}>
            <a href="https://twitter.com" target="_blank" rel="noreferrer" aria-label="Twitter">X</a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" aria-label="LinkedIn">in</a>
            <a href="https://github.com" target="_blank" rel="noreferrer" aria-label="GitHub">&gt;</a>
          </div>
        </div>

        <div className={styles.footerLinks}>
          <h4>Services</h4>
          <ul>
            <li><a href="#services#workflow-automation">Workflow Automation</a></li>
            <li><a href="#services#app-integration">App Integration</a></li>
            <li><a href="#services#api-development">Custom API Development</a></li>
          </ul>
        </div>

        <div className={styles.footerLinks}>
          <h4>Contact</h4>
          <ul>
            <li><strong>Email:</strong> <a href="mailto:chris.battle@cognisync.us">chris.battle@cognisync.us</a></li>
            <li><strong>Location:</strong> Missouri, USA</li>
          </ul>
        </div>
      </div>

      <div className={styles.footerBottom}>
        <p>© 2024 CogniSync.us. All rights reserved.</p>
        <div className={styles.footerBottomLinks}>
          <a href="#">Privacy Policy</a>
          <a href="#">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
