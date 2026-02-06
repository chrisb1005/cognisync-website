import React from 'react';
import styles from './App.module.css';
import HeroSection from './HeroSection';
import AboutUsSection from './AboutUsSection';
import ServicesSection from './ServicesSection';
import ContactForm from './ContactForm';
import Mission from './MissionStatement';
import Footer from './Footer';

const App = () => {
  return (
    <div className={styles.App}>
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
