import React from "react";

import phoneIcon from "../images/contact/phone.svg";
import emailIcon from "../images/contact/email.svg";

export default function Contact() {
  return (
    <div className="contact-wrapper">
      <p className="header">KONTAKT</p>
      <h2 className="big-header">Nehmen Sie Kontakt auf</h2>
      <div className="contact-container">
        <div className="contact-container-left">
          <div className="information-text">
            <h2>Get in Touch</h2>
            <p>
              Egal, ob Sie einen frischen Look für eine bestehende Website
              benötigen oder von Grund auf neu beginnen, ich bin hier, um Ihnen
              zu helfen!
            </p>
            <p>
              Nutzen Sie ein kostenloses Website-Audit und erfahren Sie, wie
              eine strategisch und durchdacht gestaltete,
              suchmaschinenoptimierte Website mehr Aufmerksamkeit auf Ihr
              Unternehmen lenken und Besucher in Kunden verwandeln kann.
            </p>
            <p>
              Denken Sie daran: Eine großartige Website ist eine Investition in
              Ihr Unternehmen, die mit der Zeit immer wertvoller wird. Schreiben
              Sie mir jetzt, um loszulegen!
            </p>
          </div>
          <div className="information-client">
            <div className="phone">
              <span>
                <img src={phoneIcon} alt="phone-icon" className="icons" />
              </span>
              <div className="column">
                <p>Phone</p>
                <p>0123456</p>
              </div>
            </div>
            <div className="email">
              <span>
                <img src={emailIcon} alt="email-icon" className="icons" />
              </span>
              <div className="column">
                <p>Email</p>
                <p>random@gmail.com</p>
              </div>
            </div>
          </div>
        </div>
        <div className="contact-container-right">
          <form className="user-input">
            <h2>Let's connect</h2>
            <label for="name">
              Name
              <input type="text" placeholder="Name" id="name" />
            </label>
            <label for="email">
              Email
              <input type="email" placeholder="Email" />
            </label>
            <label for="tel">
              Tel
              <input type="tel" placeholder="Tel." />
            </label>
            <label for="message">
              Nachricht
              <textarea rows="6" className="message" />
            </label>
            <button className="submit">absenden</button>
          </form>
        </div>
      </div>
    </div>
  );
}
