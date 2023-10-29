import React, { useState, useEffect } from "react";
import "./style.css";
import hero1 from "../../Image/heroImage.png";
import HeroImage1 from "../../Image/heroImage1.jpeg";
import HeroImage3 from "../../Image/homeImage3.png";

const images = [hero1, HeroImage3, HeroImage1]; // Add your image paths here

const texts = [
  {
    heading: "Welcome to Neurogen AI",
    subheading: "Empowering health care",
    listItems: [
      "Welcome to our cutting-edge web app dedicated to stroke prevention and management. Stroke is a serious health concern affecting millions worldwide. Our platform empowers you to take control of your health by providing a comprehensive stroke risk assessment. Through a user-friendly chatbot, we offer personalized guidance and information tailored to your unique health profile.",
    ],
  },
  {
    heading: "Fighting Stroke",
    // subheading: "Welcome to Neurogen AI",
    listItems: [
      "Our web app is not just about identifying risk – it's about taking action. After your risk assessment, we deliver clear and actionable insights, along with easy-to-understand graphs and charts that track your health journey over time. We understand that stroke prevention is a journey, and we're here to guide you every step of the way.",
    ],
  },
  {
    heading: "Empowering your life with Neurogen AI",
    // subheading: "Empowering health care",
    listItems: [
      "With our web app, you can turn knowledge into empowerment. Start your journey towards a healthier, stroke-free life today. Take the first step in understanding your stroke risk, receive personalized recommendations, and monitor your progress through engaging visual representations. Join us in the fight against stroke – your health is your most valuable asset, and we're here to help you protect it.",
    ],
  },
  // Add more text variations as needed
];

const Hero = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000); // Adjust the interval time as needed

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="main-container">
      <div className="image-text-container">
        <div className="text-container">
          <h2 className="h2">{texts[index].heading}</h2>
          <span className="span">{texts[index].subheading}</span>

          <div>
            <ul className="ul">
              {texts[index].listItems.map((item, i) => (
                <li key={i} className="li">{item}</li>
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
