import React from "react";
import landingImage from "../images/landing.PNG";
import Waves from "./Waves";
import Services from "./Services";
import Prices from "./Prices";
import Process from "./Process";
import Footer from "./Footer";

export default function Main() {
  return (
    <>
      <main className="main">
        <Waves className="bottom" />
        <div className="landing-page-left">
          <p className="dark">modern & professionell</p>
          <h1>
            Webentwicklung & Webdesign
            <br />
            für kleine Unternehmen
          </h1>
          <button className="contact-btn">Kontakt aufnehmen</button>
        </div>
        <div className="landing-page-right">
          <img src={landingImage} alt="img" className="landing-img" />
        </div>
      </main>
      <Waves />
      <Services />
      <Process />
      <Prices />
    </>
  );
}
