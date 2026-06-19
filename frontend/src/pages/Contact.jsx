import React, { useState } from 'react';
import './ContactUs.css';

const ContactUs = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      setFormData({ name: '', email: '', message: '' });

      setTimeout(() => setSuccess(false), 3000);
    }, 1500);
  };

  return (
    <div className="contact-wrapper">
      <div className="contact-card">
        <h2>Get in Touch</h2>
        <p className="contact-subtitle">
          Have questions or feedback? We'd love to hear from you.
        </p>

        {success && (
          <div className="success-message">
            Message sent successfully!
          </div>
        )}

        <form className="contact-form" onSubmit={handleSubmit}>
          <div className="input-group">
            <input
              type="text"
              name="name"
              placeholder=" "
              value={formData.name}
              onChange={handleChange}
              required
            />
            <label>Your Name</label>
          </div>

          <div className="input-group">
            <input
              type="email"
              name="email"
              placeholder=" "
              value={formData.email}
              onChange={handleChange}
              required
            />
            <label>Your Email</label>
          </div>

          <div className="input-group">
            <textarea
              name="message"
              placeholder=" "
              rows="4"
              value={formData.message}
              onChange={handleChange}
              required
            />
            <label>Your Message</label>
          </div>

          <button type="submit" disabled={loading}>
            {loading ? "Sending..." : "Send Message"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactUs;