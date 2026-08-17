import React from 'react';
import styles from './HeroSection.module.css';

const HeroSection = () => {
  return (
    <>
      <nav className={styles.navbar}>
        <a href="#home" className={styles.navLogo}>
          COGNISYNC.ai
        </a>
        <div>
          <ul className={styles.navLinks}>
            <li><a href="#services" className={styles.navCta}>Our Services</a></li>
            <li><a href="#about" className={styles.navCta}>About Us</a></li>
            <li><a href="#contact" className={styles.navCta}>Lets Chat!</a></li>
          </ul>
        </div>
      </nav>

      <section className={styles.heroSection} id="home">
        <div className={styles.heroGrid}>
          <div className={styles.heroContent}>
            <h1>CogniSync <span>Integration</span> Studio</h1>
            <p><strong>Empowering Efficiency:</strong> Connect your tools. Automate your work. Focus on growth.</p>
            <div className={styles.heroButtons}>
              <a href="#services">
                <button className={styles.primaryButton}>View Services</button>
              </a>
              <a href="#contact">
                <button className={styles.secondaryButton}>Start a Project</button>
              </a>
            </div>
          </div>

          <div className={styles.heroGraphic} aria-hidden="true">
            <div className={styles.freeBlobs}>
              <div className={`${styles.freeBlob} ${styles.freeBlobA}`}></div>
              <div className={`${styles.freeBlob} ${styles.freeBlobB}`}></div>
            </div>
            <div className={styles.lavaBlobField}>
              <div className={`${styles.lavaBlob} ${styles.blobA}`}></div>
              <div className={`${styles.lavaBlob} ${styles.blobB}`}></div>
              <div className={`${styles.lavaBlob} ${styles.blobC}`}></div>
              <div className={styles.lavaGlow}></div>
            </div>
          </div>
        </div>
        <div className={styles.scrollIndicator}>↓</div>
      </section>
    </>
  );
};

export default HeroSection;
