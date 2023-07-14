import React, { useState } from "react";
// import axios from "axios";
import "../styles/Contact.css";

const Contact = () => {
  const [email, setEmail] = useState("");
  const [helpMessage, setHelpMessage] = useState("");

  // const sgMail = require("@sendgrid/mail");
  // sgMail.setApiKey(
  //   "my apykey"
  // );

  const handleSubmit = (e) => {
    e.preventDefault();

    // Configura los datos para el envío del correo electrónico
    // const data = {
    //   to: "rlfilmmakers@gmail.com", // Dirección de correo de destino
    //   from: email, // Dirección de correo de origen (correo del remitente)
    //   subject: "New Contact Message from the website", // Asunto del correo electrónico
    //   text: helpMessage, // Cuerpo del correo electrónico
    // };

    // sgMail
    //   .send(data)
    //   .then(() => {
    //     console.log("Email sent successfully");
    //   })
    //   .catch((error) => {
    //     console.error("Error: ", error);
    //   });

    // Envía la solicitud HTTP utilizando la API de SendGrid
    //   axios
    //     .post("https://api.sendgrid.com/v3/mail/send", data, {
    //       headers: {
    //         Authorization:
    //           "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",
    //         "Content-Type": "application/json",
    //       },
    //     })
    //     .then((response) => {
    //       console.log("Email sent successfully");
    //     })
    //     .catch((error) => {
    //       console.log("Error sending email:", error);
    //     });
  };

  return (
    <div className="contact-container">
      <h2 className="h2-contact">Contact</h2>
      <form
        onSubmit={handleSubmit}
        className="contact-form-container"
        placeholder="E-mail"
      >
        <input
          className="input-contact-text"
          type="email"
          name="email"
          id="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <textarea
          className="input-contact-text"
          name="help"
          id="help"
          placeholder="How can we help you?"
          value={helpMessage}
          onChange={(e) => setHelpMessage(e.target.value)}
        ></textarea>
        <button className="btn-contact">Enviar</button>
      </form>
    </div>
  );
};

export default Contact;
