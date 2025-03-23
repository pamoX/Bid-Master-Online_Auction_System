import React, { useRef } from 'react';
import Nav from '../Nav/Nav';
import emailjs from 'emailjs-com'; // Import EmailJS
import './ContactUs.css'; // Import the CSS file

function ContactUs() {
  const form = useRef(); // Define form reference using useRef

  const sendEmail = (e) => { // Define the sendEmail function
    e.preventDefault(); // Prevent default form submission

    emailjs.sendForm('service_kqkgw36', 'template_inj2mf4', form.current, 'rQj8g4x-sRr7-7BEu')
    
      .then((result) => {
        console.log('Email sent successfully:', result.text);
        alert('Message sent!');
        form.current.reset(); // Optional: Reset form after submission
      }, (error) => {
        console.log('Error sending email:', error.text);
        alert('Failed to send message. Please try again.');
      });
  };

  return (
    <div className="contact-us">
      <Nav /><br/><br/>
      <h1>Contact Us</h1>
      <p>Questions about bidding, selling, or shipping? <br/>Contact us below to join the auction!</p>
      <form ref={form} onSubmit={sendEmail}>
        <div className="form-group">
          <label htmlFor="user_name">Name</label>
          <input
            type="text"
            id="user_name"
            name="user_name"
            placeholder="Your Name"
          />
        </div>
        <div className="form-group">
          <label htmlFor="user_email">Email</label>
          <input
            type="email"
            id="user_email"
            name="user_email"
            placeholder="Your Email"
          />
        </div>
        <div className="form-group">
          <label htmlFor="message">Message</label>
          <textarea
            id="message"
            name="message"
            placeholder="Your Message"
          />
        </div>
        <button type="submit">Send</button>
      </form>
    </div>
  );
}

export default ContactUs;