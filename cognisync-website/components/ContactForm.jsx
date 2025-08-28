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
    <div className={styles.formWhole} id="contact-section">
      <div className={styles.contactForm}>
        <h2 className={styles.h2}>Contact Us</h2>
        <form onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label htmlFor="fullName">Full Name</label>
            <input type="text" id="fullName" name="fullName" required />
          </div>

          <div className={styles.formGroupRow}>
            <div className={styles.formGroup}>
              <label htmlFor="subject">Subject</label>
              <input type="text" id="subject" name="subject" required />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="email">Email</label>
              <input type="email" id="email" name="email" required />
            </div>
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="help">How Can We Help You?</label>
            <textarea id="help" name="help" rows="4" required></textarea>
          </div>

          {/* <div className={styles.formGroup}>
            <label htmlFor="budget">Anticipated Budget</label>
            <select id="budget" name="budget">
              <option value="under-3000">Under $3000</option>
              <option value="3000-to-6000">$3000 - $6000</option>
              <option value="6000-to-10000">$6000 - $10000</option>
              <option value="10000-to-20000">$10000 - $20000</option>
              <option value="20000-plus">Over $20000</option>
            </select>
          </div> */}

          <button type="submit" disabled={submitting}>
            {submitting ? 'Submitting...' : 'Submit'}
          </button>
        </form>
        {showToast && (
  <div className={`${styles.toast} ${styles[toastType]}`}>
    {submissionMessage}
  </div>
)}
      </div>
    </div>
  );
};

export default ContactForm;
