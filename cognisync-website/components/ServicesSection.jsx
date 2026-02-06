import React, { useEffect } from 'react';
import styles from './ServicesSection.module.css';
import TRUNK from 'vanta/src/vanta.globe';

const ServicesSection = () => {
  useEffect(() => {
    TRUNK({
      el: '#services',
      mouseControls: false,
      touchControls: false,
      scale: 1,
      minHeight: 650,
      minWidth: 300,
      backgroundColor: 0xffffff,
      color: 0x0,
    });
  }, []);

  return (
    <div className={styles.servicesSection} id='services-section'>
      <div className={styles.servicesHeader}>
        <h1>Services</h1>
      </div>
      <div className={styles.servicesContainer} id='services'>
        <div className={styles.serviceCard}>
          <h2 className={styles.serviceTitle}>Workflow Automation</h2>
          <ul>
            <li className={styles.serviceDescription}>We streamline daily processes, cut manual work, and give your team back valuable time.</li>
            <li><strong>Why it matters:</strong> Free up your team to focus on growth, not repetitive busywork.</li>
          </ul>
        </div>

        <div className={styles.serviceCard}>
          <h2 className={styles.serviceTitle}>App & Tool Integration</h2>
          <ul>
            <li className={styles.serviceDescription}>We connect your favorite apps and platforms so your team spends less time switching and more time creating.</li>
            <li><strong>Why it matters:</strong> No more broken processes or copy-paste chaos — your tools finally work together.</li>
          </ul>
        </div>

        <div className={styles.serviceCard}>
          <h2 className={styles.serviceTitle}>Custom API Development</h2>
          <ul>
            <li className={styles.serviceDescription}>We build lightweight, flexible APIs to connect the systems your business depends on.</li>
            <li><strong>Why it matters:</strong> Scale without limits by linking platforms in exactly the way your business needs.</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ServicesSection;
