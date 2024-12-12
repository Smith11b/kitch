"use client";
import { useState } from 'react';
import styles from "../page.module.css";

export default function EmailForm() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [invalid, setInvalid] = useState(false);

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
    setInvalid(false);
  };

  const handleLinkClick = async (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    event.preventDefault();
    if (!validateEmail(email)) {
        setInvalid(true);
        setTimeout(() => {
            setInvalid(false);
          }, 2000);
        return;
      }
    try {
      const response = await fetch('/api/email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit email');
      }

      const data = await response.json();
      console.log('Email submitted successfully:', data);
      setSubmitted(true); // Change the state to submitted
    } catch (error) {
      console.error('Error submitting email:', error);
    }
  };

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  return (
    <div className={`${styles.cta} ${submitted ? styles.submitted : ''} ${invalid ? styles.invalid : ''}`}>
      <a
        href="/signup"
        className={`${styles.button}` }
        onClick={handleLinkClick}
      >
        {submitted ? 'Thanks for joining us!' : invalid ? 'Invalid email' : 'Join the waitlist'}
      </a>
      {!submitted && (
        <input
          type="email"
          placeholder="Enter your email"
          className={`${styles.emailInput} ${invalid ? styles.invalid : ''}`}
          value={email}
          onChange={handleEmailChange}
          required
        />
      )}
    </div>
  );
}
