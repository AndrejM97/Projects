import React from "react";
import Header from "./Header";
import "../index.css"; // Ensure CSS file is imported

export default function Footer({ className }) {
  return (
    <footer>
      <div className="footer-top">
        <Header className="spaced resize" />
      </div>
      <div className="footer-bottom">
        <p>© 2024 | creative pages | All Rights Reserved.</p>
      </div>
    </footer>
  );
}
