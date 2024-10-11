import React from "react";
import { benefitsData } from "../DATA.js";
import WavesB from "./WavesB.jsx";

const Benefit = ({ imgSrc, imgAlt, title, description }) => (
  <div className="benefit-container">
    <div className="circle">
      <img src={imgSrc} alt={imgAlt} className="benefit-container-img" />
      <div className="wrapper">
        <div className="bubble small"></div>
        <div className="bubble s-medium"></div>
        <div className="bubble medium"></div>
        <div className="bubble large"></div>
        <div className="bubble small-l"></div>
      </div>
    </div>
    <h2 className="benefit-title">{title}</h2>
    <p className="benefit-desc">{description}</p>
  </div>
);

export default function Service() {
  return (
    <div className="benefits">
      <WavesB />
      <p className="header">Leistungen</p>
      <h2 className="big-header">Was sie erwarten können</h2>
      <div className="benefit-wrapper">
        {benefitsData.map((benefit) => (
          <Benefit
            key={benefit.id}
            imgSrc={benefit.imgSrc}
            imgAlt={benefit.imgAlt}
            title={benefit.title}
            description={benefit.description}
          />
        ))}
      </div>
    </div>
  );
}
