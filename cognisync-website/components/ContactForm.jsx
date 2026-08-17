import React, { useState } from 'react';
import styles from './ContactForm.module.css';

const ContactForm = () => {
  const [submitting, setSubmitting] = useState(false);
  const [submissionMessage, setSubmissionMessage] = useState('');
  const [showToast, setShowToast] = useState(false);
  const [toastType, setToastType] = useState(''); // 'success' or 'error'

  const handleSubmit = async (event) => {
  event.preventDefault();
  setSubmitting(true);
  setSubmissionMessage('');

  const formData = new FormData(event.target);

  try {
    const response = await fetch('https://script.google.com/macros/s/AKfycbzgljFioYg3rdeCIA5jvulu4KUy080J7AXwVLQWyBCjgX5uEoc7OIkjrZ2vz_HfEObr/exec', {
      method: 'POST',
      body: formData,
    });

    if (response.ok) {
      setToastType('success');
      setSubmissionMessage('Form submitted successfully.');
      event.target.reset();
    } else {
      setToastType('error');
      setSubmissionMessage('An error occurred. Please try again later.');
    }

    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  } catch (error) {
    setToastType('error');
    setSubmissionMessage('An error occurred. Please try again later.');
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  }

  setSubmitting(false);
};


  return (
    <section className={styles.formWhole} id="contact">
      <div className={styles.sectionHeader}>
        <span className={styles.sectionTag}>Get in Touch</span>
        <h2 className={styles.sectionTitle}>Let's Automate Your Growth</h2>
        <p className={styles.sectionDescription}>Tell us about your data challenges. We'll create a custom automation solution tailored to your needs.</p>
      </div>

      <div className={styles.contactForm}>
        <form onSubmit={handleSubmit} className={styles.contactGrid}>
          <div className={styles.formGroupRow}>
            <div className={styles.formGroup}>
              <label htmlFor="fullName">Full Name *</label>
              <input type="text" id="fullName" name="fullName" placeholder="John Doe" required />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="email">Email Address *</label>
              <input type="email" id="email" name="email" placeholder="john@company.com" required />
            </div>
          </div>

          <div className={styles.formGroupRow}>
            <div className={`${styles.formGroup} ${styles.fullWidth}`}>
              <label htmlFor="subject">Subject *</label>
              <input type="text" id="subject" name="subject" placeholder="Project Type (e.g., Data Cleaning, API Integration)" required />
            </div>
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="help">How Can We Help You? *</label>
            <textarea id="help" name="help" rows="4" placeholder="Describe your data automation challenge..." required></textarea>
          </div>

          <div className={styles.formSubmitWrap}>
            <button type="submit" disabled={submitting}>
              {submitting ? 'Submitting...' : 'Submit Request'}
            </button>
          </div>
        </form>
        {showToast && (
          <div className={`${styles.toast} ${styles[toastType]}`}>
            {submissionMessage}
          </div>
        )}
      </div>
    </section>
  );
};

export default ContactForm;
