import React, { useState } from "react";
import { processData } from "../DATA.js";
import arrowRight from "../images/process/arrow-right.svg";
import arrowLeft from "../images/process/arrow-left.svg";
import Waves from "./Waves.jsx";

const Process = ({ imgSrc, imgAlt, title, description }) => (
  <div className="process-container">
    <div className="process-image-container">
      <img src={imgSrc} alt={imgAlt} className="process-image" />
    </div>
    <h2 className="process-title">{title}</h2>
    <p className="process-desc">{description}</p>
  </div>
);

export default function Processes() {
  const [currentProcessIndex, setCurrentProcessIndex] = useState(0);

  const handleNextProcess = () => {
    setCurrentProcessIndex((prevIndex) =>
      prevIndex < processData.length - 1 ? prevIndex + 1 : prevIndex
    );
  };

  const handlePreviousProcess = () => {
    setCurrentProcessIndex((prevIndex) =>
      prevIndex > 0 ? prevIndex - 1 : prevIndex
    );
  };

  return (
    <div className="process-wrapper">
      <p className="header">Prozess</p>
      <h2 className="big-header">Wie wir arbeiten</h2>

      <div className="process">
        <div className="process-left">
          {currentProcessIndex > 0 && (
            <button onClick={handlePreviousProcess} className="previous-button">
              <img src={arrowLeft} alt="arrow left icon" className="arrow" />
            </button>
          )}
        </div>

        <Process
          key={processData[currentProcessIndex].id}
          imgSrc={processData[currentProcessIndex].imgSrc}
          imgAlt={processData[currentProcessIndex].imgAlt}
          title={processData[currentProcessIndex].title}
          description={processData[currentProcessIndex].description}
        />
        <div className="process-right">
          {currentProcessIndex < processData.length - 1 && (
            <button onClick={handleNextProcess} className="next-button">
              <img src={arrowRight} alt="arrow right icon" className="arrow" />
            </button>
          )}
        </div>
      </div>
      <Waves className="bottom" />
    </div>
  );
}
