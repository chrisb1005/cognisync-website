import React from 'react';
import styles from './AboutUsSection.module.css';

const AboutUsSection = () => {
  return (
    <section className={styles.aboutUsSection} id="about">
      <div className={styles.sectionHeader}>
        <span className={styles.sectionTag}>Who We Are</span>
        <h1 className={styles.sectionTitle}>About CogniSync</h1>
      </div>

      <div className={styles.aboutContent}>
        <div className={styles.aboutText}>
          <p>
            At <strong>CogniSync</strong>, we're your partner in turning ideas into real, working
            solutions. We focus on startups and agencies that want to move fast without getting
            stuck in technical roadblocks.
          </p>
          <p>
            More than just integration specialists, we help teams simplify operations, connect
            their tools, and launch with confidence. Led by founder <strong>Christopher Battle</strong>,
            we work alongside you from concept to execution - making sure your workflows,
            automations, and integrations are built for growth, not just for today.
          </p>
          <p>
            With experience across industries, our goal is simple: give you the clarity and
            systems you need to scale smarter.
          </p>
        </div>

        <div className={styles.founderCard}>
          <h3>Our Mission</h3>
          <p>
            To empower businesses with powerful automation solutions that eliminate manual work,
            reduce errors, and free teams to focus on what matters most - innovation and growth.
          </p>
        </div>
      </div>
    </section>
  );
};

export default AboutUsSection;
