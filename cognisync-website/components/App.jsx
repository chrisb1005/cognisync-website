import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import styles from './App.module.css';
import HeroSection from './HeroSection';
import AboutUsSection from './AboutUsSection';
import ServicesSection from './ServicesSection';
import ContactForm from './ContactForm';
import Footer from './Footer';

const pageMeta = {
  '/': {
    title: 'CogniSync - Data Automation Agency',
    description: 'CogniSync: Workflow automation, custom API development, and intelligent app integration. Built by Chris for intelligent data management.',
    canonical: 'https://www.cognisync.us/',
  },
  '/services/': {
    title: 'Workflow Automation & App Integration — CogniSync',
    description: 'CogniSync provides workflow automation, app integrations, and custom APIs to eliminate manual work and accelerate growth.',
    canonical: 'https://www.cognisync.us/services/',
  },
  '/about/': {
    title: 'About CogniSync — Data Automation & Integrations',
    description: 'About CogniSync: our mission, values, and experience delivering data automation and integration solutions.',
    canonical: 'https://www.cognisync.us/about/',
  },
  '/contact/': {
    title: 'Contact CogniSync — Start a Project',
    description: 'Contact CogniSync to discuss automation, integrations, and custom API work. Book a call or send a message.',
    canonical: 'https://www.cognisync.us/contact/',
  },
};

const PageMeta = () => {
  const { pathname } = useLocation();
  const meta = pageMeta[pathname] || pageMeta['/'];
  return (
    <Helmet>
      <title>{meta.title}</title>
      <meta name="description" content={meta.description} />
      <link rel="canonical" href={meta.canonical} />
      <meta property="og:title" content={meta.title} />
      <meta property="og:description" content={meta.description} />
      <meta property="og:url" content={meta.canonical} />
      <meta name="twitter:title" content={meta.title} />
      <meta name="twitter:description" content={meta.description} />
    </Helmet>
  );
};

const App = () => {
  return (
    <div className={styles.App}>
      <PageMeta />
      <Routes>
        <Route path="*" element={
          <>
            <HeroSection />
            <AboutUsSection />
            <ServicesSection />
            <ContactForm />
            <Footer />
          </>
        } />
      </Routes>
    </div>
  );
};

export default App;
