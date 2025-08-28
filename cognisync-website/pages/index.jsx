// pages/index.jsx
import { useEffect } from 'react';
import Head from 'next/head';
import TRUNK from 'vanta/src/vanta.dots.js';

import HeroSection from '../components/HeroSection';
import AboutUsSection from '../components/AboutUsSection';
import ServicesSection from '../components/ServicesSection';
import ContactForm from '../components/ContactForm';
import Mission from '../components/MissionStatement';
import Footer from '../components/Footer';


export default function Home() {
  useEffect(() => {
    TRUNK({
      el: '#vanta',
      mouseControls: false,
      touchControls: false,
    });
  }, []);

  return (
    <>
      <Head>
        <title>My Website Title</title>
        <meta name="description" content="Brief description for SEO." />
        <link rel="canonical" href="https://yourdomain.com/" />
        {/* Add Open Graph / Twitter Card tags if needed */}
      </Head>

      <div className="App">
        <div className="bg" id="vanta"></div>
        <HeroSection />
        <AboutUsSection />
        <Mission />
        <ServicesSection />
        <ContactForm />
        <Footer />
      </div>
    </>
  );
}
