"use client";
import { useState } from 'react';
import styles from "./page.module.css";
import landerService from './service/landerService/landerService';

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
    if (!landerService.validateEmail(email)) {
        setInvalid(true);
        setTimeout(() => {
            setInvalid(false);
          }, 2000);
        return;
      }

      try {
        await landerService.saveEmailAddress(email);
        setSubmitted(true);
      } catch (error) {
        console.error('Error saving email:', error);
        setInvalid(true);
        setTimeout(() => {
            setInvalid(false);
          }, 2000);
      }
    }




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
