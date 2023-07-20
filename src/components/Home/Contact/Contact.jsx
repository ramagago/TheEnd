import React, { useRef, useState, useEffect } from "react";
import emailjs from "@emailjs/browser";
import "./Contact.css";

export const Contact = () => {
  const [message, setMessage] = useState("");
  const [emailSent, setEmailSent] = useState(false);
  const [errorEmail, setErrorEmail] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const textareaRef = useRef();
  const form = useRef();

  useEffect(() => {
    const textarea = textareaRef.current;
    textarea.style.height = "auto";
    const scrollHeight = textarea.scrollHeight;
    textarea.style.height = scrollHeight + "px";
  }, [message]);

  const sendEmail = (e) => {
    e.preventDefault();
    setIsSending(true);
    emailjs
      .sendForm(
        "service_lm9511m",
        "template_18melvg",
        form.current,
        "pF3U48UNWJxuoR0y5"
      )
      .then(
        (result) => {
          setEmailSent(true);
          setIsSending(false);
          form.current.reset();
        },
        (error) => {
          setErrorEmail(true);
          setIsSending(false);
          form.current.reset();
        }
      );
  };

  useEffect(() => {
    let timeout;
    if (emailSent) {
      timeout = setTimeout(() => {
        setEmailSent(false);
      }, 3000);
    } else if (errorEmail) {
      timeout = setTimeout(() => {
        setEmailSent(false);
      }, 3000);
    }
    return () => clearTimeout(timeout);
  }, [emailSent, errorEmail]);

  return (
    <div className="contact-container">
      <h2 className="h2-contact">Contact</h2>
      <form ref={form} onSubmit={sendEmail} className="contact-form-container">
        <div className="contact-group">
          <input
            type="email"
            name="user_email"
            className="input-contact-text"
            placeholder=" "
          />
          <label className="input-contact-text-label">Email</label>
        </div>
        <div className="contact-group">
          <textarea
            name="message"
            className="input-contact-text text-area"
            placeholder=" "
            ref={textareaRef}
            onChange={(e) => setMessage(e.target.value)}
            maxLength={300}
          />
          <label className="input-contact-text-label">
            How can we help you?
          </label>
        </div>
        <input type="submit" value="Send" className="btn-contact" />
      </form>
      {isSending && <div className="confirmation-message">Sending..</div>}
      {emailSent && (
        <div className="confirmation-message">Message sent. Thank you!</div>
      )}
      {errorEmail && (
        <div className="confirmation-message">
          Oops! Something went wrong. Please try again later.
        </div>
      )}
      <div className="followus-link-container">
        <a
          className="followus-link"
          href="https://www.instagram.com/rlfilmmakers/"
          target="blank"
        >
          Follow Us
        </a>
      </div>
    </div>
  );
};

export default Contact;
