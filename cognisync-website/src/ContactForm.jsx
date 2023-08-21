import React, { useState } from 'react';
import './Formstyle.css';

const ContactForm = () => {
  const [submitting, setSubmitting] = useState(false);
  const [submissionMessage, setSubmissionMessage] = useState('');
  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent the default form submission
    setSubmitting(true);
    setSubmissionMessage('');
    // Gather form data
    const formData = new FormData(event.target);
    const response = await fetch('https://script.google.com/macros/s/AKfycbzgljFioYg3rdeCIA5jvulu4KUy080J7AXwVLQWyBCjgX5uEoc7OIkjrZ2vz_HfEObr/exec', {
      method: 'POST',
      body: formData,
    });
  
    if (response.ok) {
      // Success handling
      setSubmissionMessage('Form submitted successfully.');
      event.target.reset();
    } else {
      // Error handling
      setSubmissionMessage('An error occurred. Please try again later.');
    }
    setSubmitting(false);
  };

    // Perform validation and data processing
    // ...

    // Clear the form fields or display a success message
    // ...
  return (
    <div className='form-whole' id='contact-section'>
    <div className="contact-form">
      <h2>Contact Us</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="fullName">Full Name</label>
          <input type="text" id="fullName" name="fullName" required />
        </div>
        <div className="form-group-row">
        <div className="form-group">
          <label htmlFor="subject">Subject</label>
          <input type="text" id="subject" name="subject" required />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input type="email" id="email" name="email" required />
        </div>
        </div>
        <div className="form-group">
          <label htmlFor="help">How Can We Help You?</label>
          <textarea id="help" name="help" rows="4" required></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="budget">Anticipated Budget</label>
          <select id="budget" name="budget">
            <option value="under-3000">Under $3000</option>
            <option value="3000-to-6000">$3000 - $6000</option>
            <option value="6000-to-10000">$6000 - $10000</option>
            <option value="10000-to-20000">$10000 - $20000</option>
            <option value="20000-plus">Over $20000</option>
          </select>
        </div>
        <button type="submit" disabled={submitting}>{submitting ? 'Submitting...' : 'Submit'}</button>
        {submissionMessage && (
          <p className={submissionMessage.includes('successfully') ? 'success' : 'error'}>
            {submissionMessage}
          </p>
        )}
      </form>
    </div>
    </div>
  );
};

export default ContactForm;