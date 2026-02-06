import React, { useEffect } from 'react';
import styles from './App.module.css';
import HeroSection from './HeroSection';
import AboutUsSection from './AboutUsSection';
import ServicesSection from './ServicesSection';
import ContactForm from './ContactForm';
import Mission from './MissionStatement';
import Footer from './Footer';
import TRUNK from 'vanta/src/vanta.dots.js';

const App = () => {
  useEffect(() => {
    TRUNK({
      el: '#vanta',
      mouseControls: false,
      touchControls: false,
    });
  }, []);

  return (
    <div className={styles.App}>
      <div className={styles.bg} id="vanta"></div>
      <HeroSection />
      <AboutUsSection />
      <Mission />
      <ServicesSection />
      <ContactForm />
      <Footer />
    </div>
  );
};

export default App;
