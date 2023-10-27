import React, { useState, useEffect } from "react";
import "./style.css";
import hero1 from "./heroImage.png";
import HeroImage1 from "./heroImage1.jpeg";
import HeroImage2 from "./heroImage2.jpg";
import HeroImage3 from "./homeImage3.png";

const images = [ hero1, HeroImage3,HeroImage1]; // Add your image paths here

const texts = [
  {
    heading: "Welcome to Neurogen AI",
    subheading: "Empowering health care",
    listItems: [
      "Personalized medical advice",
      "Stroke risk prediction",
     
    ],
  },
  {
    heading: "Welcome to Neurogen AI",
    subheading: "Empowering health care",
    listItems: [
      
      "Natural language processing for health queries",
      "Tailored diet and exercise plans",
      
    ],
  },
  {
    heading: "Welcome to Neurogen AI",
    subheading: "Empowering health care",
    listItems: [
      "Data-driven healthcare recommendations",
    ],
  },
  // Add more text variations as needed
];

const Hero = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000); // Adjust the interval time as needed

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="main-container">
      <div className="image-text-container">
        <div className="text-container">
          <h2>{texts[index].heading}</h2>
          <span>{texts[index].subheading}</span>

          <div>
            <ul>
              {texts[index].listItems.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
        <div className="image">
  <img
    src={images[index]}
    alt={`heroImage${index + 1}.png`}
    style={{ maxWidth: "100%", maxHeight: "100%" }}
  />
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
