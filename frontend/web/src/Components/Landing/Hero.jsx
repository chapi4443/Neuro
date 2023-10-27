import { Box, Stack ,} from "@mui/material";
import React from "react";
import "./style.css";

const Hero = () => {
  return (
    <div className="main-container">
      <div className="image-text-container">
        <div className="text-container">
          <h2>Welcome to NeuroGen AI</h2>
          <span>Empowering health care</span>
        
          <div>
            <ul>
              <li>Personalized medical advice</li>
              <li>Stroke risk prediction</li>
              <li>Natural language processing for health queries</li>
              <li>Tailored diet and exercise plans</li>
              <li>Data-driven healthcare recommendations</li>
            </ul>
          </div>
        </div>
        <div className="image">
          <img src="./heroImage.png" alt="heroImage.png" />
        </div>
      </div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 320"
        preserveAspectRatio="none"
        style={{ width: "100%", height: "auto" }}
      >
        <path
          fill="#192655"
          fillOpacity="1"
          d="M0,96L60,106.7C120,117,240,139,360,160C480,181,600,203,720,186.7C840,171,960,117,1080,96C1200,75,1320,85,1380,90.7L1440,96L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"
        ></path>
      </svg>
    </div>
  );
};

export default Hero;
