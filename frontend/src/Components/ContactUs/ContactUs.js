import React, { useRef } from 'react';

import emailjs from 'emailjs-com';
import './ContactUs.css';


function ContactUs() {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm('service_d2a9mbf', 'template_6rhsu8h', form.current, 'xny1OQT9sr9bs6fEP')
      .then((result) => {
        console.log('Email sent successfully:', result.text);
        alert('Message sent!');
        form.current.reset();
      }, (error) => {
        console.log('Error sending email:', error.text);
        alert('Failed to send message. Please try again.');
      });
  };

  return (
    <div className="contact-us-page">
    <br/><br/>
      <div className="contact-us-container">
        <h1>Contact Us</h1>
        <p>Questions about bidding, selling, or shipping? <br/>Contact us below to join the auction!</p>
        <form ref={form} onSubmit={sendEmail} className="contact-form">
          <div className="form-group">
            <label htmlFor="user_name">Name</label>
            <input
              type="text"
              id="user_name"
              name="user_name"
              placeholder="Your Name"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="user_email">Email</label>
            <input
              type="email"
              id="user_email"
              name="user_email"
              placeholder="Your Email"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="message">Message</label>
            <textarea
              id="message"
              name="message"
              placeholder="Your Message"
              required
            />
          </div>
          <button type="submit">Send</button>
        </form>
      </div>
   
    </div>
  );
}

export default ContactUs;