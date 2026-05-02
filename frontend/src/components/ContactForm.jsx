import { useState } from 'react';
import { company } from '../data/siteContent.js';

const initialValues = {
  name: '',
  email: '',
  company: '',
  phone: '',
  message: '',
};

export default function ContactForm() {
  const [values, setValues] = useState(initialValues);
  const [status, setStatus] = useState({ type: 'idle', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const updateField = (event) => {
    const { name, value } = event.target;
    setValues((current) => ({ ...current, [name]: value }));
  };

  const submitForm = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    setStatus({ type: 'idle', message: '' });

    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:8000/api/contact';
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });
      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'Please check the form and try again.');
      }

      setValues(initialValues);
      setStatus({
        type: 'success',
        message: 'Thanks. Your message was sent to Morningstar Enterprises.',
      });
    } catch (error) {
      setStatus({
        type: 'error',
        message: error.message || `Please email ${company.email} directly.`,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className="contact-form" onSubmit={submitForm}>
      <div className="form-grid">
        <label>
          Name
          <input name="name" value={values.name} onChange={updateField} required />
        </label>
        <label>
          Email
          <input name="email" type="email" value={values.email} onChange={updateField} required />
        </label>
        <label>
          Company
          <input name="company" value={values.company} onChange={updateField} />
        </label>
        <label>
          Phone
          <input name="phone" type="tel" value={values.phone} onChange={updateField} />
        </label>
      </div>
      <label>
        Project Details
        <textarea
          name="message"
          value={values.message}
          onChange={updateField}
          rows="5"
          required
          placeholder="Tell us what you want to build, improve, or launch."
        />
      </label>
      <button className="primary-button" type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Sending...' : 'Send Message'}
      </button>
      {status.message && <p className={`form-status ${status.type}`}>{status.message}</p>}
    </form>
  );
}
