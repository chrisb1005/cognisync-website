import React from 'react';
import styles from './ServicesSection.module.css';

const ServicesSection = () => {
  return (
    <div className={styles.servicesSection} id="services-section">
      <div className={styles.servicesHeader}>
        <p>What We Build</p>
        <h1>Services</h1>
      </div>
      <div className={styles.servicesContainer}>
        <div className={styles.serviceCard}>
          <h2 className={styles.serviceTitle}>Workflow Automation</h2>
          <ul>
            <li className={styles.serviceDescription}>We streamline daily processes, cut manual work, and give your team back valuable time.</li>
            <li><strong>Why it matters:</strong> Free up your team to focus on growth, not repetitive busywork.</li>
          </ul>
        </div>

        <div className={styles.serviceCard}>
          <h2 className={styles.serviceTitle}>App and Tool Integration</h2>
          <ul>
            <li className={styles.serviceDescription}>We connect your favorite apps and platforms so your team spends less time switching and more time creating.</li>
            <li><strong>Why it matters:</strong> No more broken processes or copy-paste chaos, your tools finally work together.</li>
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
