import React, { useState } from "react";
import { HashRouter, Link } from "react-router-dom";
import Logo from "../images/ProjectBrand.svg";
import "../index.css";
import Hamburger from "./Hamburger";

export default function Header({ className }) {
  const [isClosed, setIsClosed] = useState(true);

  const toggleNavbar = () => {
    setIsClosed(!isClosed);
  };

  return (
    <nav className={`navbar ${isClosed ? "is-closed" : "is-open"}`}>
      <div className="logo-wrapper">
        <img src={Logo} alt="Logo" className={`logo ${className}`} />
      </div>

      {!isClosed && (
        <ul className={`navbar-links ${className}`}>
          <li>
            <Link to="/" className="link">
              Home
            </Link>
          </li>
          <li>
            <Link to="/" className="link">
              Über Uns
            </Link>
          </li>
          <li>
            <Link to="/services" className="link">
              Dienstleistungen
            </Link>
          </li>
          <li>
            <Link to="/prices" className="link">
              Preise
            </Link>
          </li>
          <li>
            <Link to="/contact" className="link">
              Kontakt
            </Link>
          </li>
        </ul>
      )}

      {}
      <Hamburger toggleNavbar={toggleNavbar} isClosed={isClosed} />
    </nav>
  );
}
