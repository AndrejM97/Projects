import React from "react";
import { BrowserRouter, Routes, Route, HashRouter } from "react-router-dom";
import Header from "./components/Header";
import Main from "./components/Main";
import Waves from "./components/Waves";
import WavesB from "./components/WavesB";
import Services from "./components/Services";
import Process from "./components/Process";
import Prices from "./components/Prices";
import Footer from "./components/Footer";
import Contact from "./pages/Contact";
import "./index.css";

export default function App() {
  return (
    <HashRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/services" element={<Services />} />
        <Route path="/benefits" element={<Process />} />
        <Route path="/prices" element={<Prices />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
      <Footer />
    </HashRouter>
  );
}
