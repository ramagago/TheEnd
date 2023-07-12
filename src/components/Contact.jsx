import React from "react";
import "../styles/Contact.css";

const Contact = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("form sent");
  };
  return (
    <div className="contact-container">
      <h2 className="h2-contact">Contact</h2>
      <form
        onSubmit={handleSubmit}
        action=""
        className="contact-form-container"
        placeholder="E-mail"
      >
        <input
          className="input-contact-text"
          type="text"
          name="email"
          id="email"
          placeholder="Email"
        />
        <input
          className="input-contact-text"
          type="text"
          name="help"
          id="help"
          placeholder="How can we help you?"
        />
        <button className="btn-contact">Enviar</button>
      </form>
    </div>
  );
};

export default Contact;
