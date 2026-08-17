import React from 'react';
import styles from './ServicesSection.module.css';

const ServicesSection = () => {
  return (
    <section className={styles.servicesSection} id="services">
      <div className={styles.servicesHeader}>
        <span className={styles.sectionTag}>What We Do</span>
        <h1>Our Services</h1>
      </div>
      <div className={styles.servicesContainer}>
        <div className={styles.serviceCard}>
          <div className={styles.serviceIcon}>⚡</div>
          <h2 className={styles.serviceTitle}>Workflow Automation</h2>
          <p className={styles.serviceDescription}>Streamline daily processes and eliminate repetitive manual work. We build automated workflows that move data across your applications seamlessly.</p>
          <span className={styles.serviceTag}>Data Processing &amp; Cleaning</span>
        </div>

        <div className={styles.serviceCard}>
          <div className={styles.serviceIcon}>🔗</div>
          <h2 className={styles.serviceTitle}>App &amp; Tool Integration</h2>
          <p className={styles.serviceDescription}>Connect your favorite apps and tools to reduce context switching. Create unified systems that communicate and share data automatically.</p>
          <span className={styles.serviceTag}>API Development</span>
        </div>

        <div className={styles.serviceCard}>
          <div className={styles.serviceIcon}>🔌</div>
          <h2 className={styles.serviceTitle}>Custom API Development</h2>
          <p className={styles.serviceDescription}>Build lightweight, flexible APIs that integrate your existing tools or power new applications. Custom solutions for unique data challenges.</p>
          <span className={styles.serviceTag}>REST &amp; GraphQL</span>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
