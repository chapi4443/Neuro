import React, { useState } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  Box,
  Accordion,
  AccordionSummary,
  Typography,
  AccordionDetails,
} from "@mui/material";

import HelpImg from "../../../Image/Screenshot.png";



const getting = [
  {
    question: "Accessing the Web App",
    unique: [
      {
        answer: "Open Your Preferred Web Browser:",

        subAnswer:
          "Launch a web browser on your computer or mobile device. neurogenai.vercel.app is accessible from a variety of browsers, including Google Chrome, Mozilla Firefox, Safari, and Microsoft Edge.",
      },
      {
        answer: "Visit the App Website:",

        subAnswer:
          "In the address bar, type the web address for neurogenai.vercel.app or click on a provided link.",
      },
      {
        answer: "Login or Create an Account:",

        subAnswer:
          "If you already have an account, click Login and enter your credentials (username and password).",
      },
      {
        answer: "Chat Display:",
        // img: HelpImg,
        subAnswer:
          "The chatbot's responses will appear in the upper part of the input field, similar to a chat conversation.",
      },
    ],
  },
  {
    question: "Account Registration",
    answer:
      "Upon registering or logging in, you may need to provide some initial information.",
    unique: [
      {
        answer: "Create an Account:",
        // img: HelpImg,
        subAnswer:
          "If you're a new user, you'll be prompted to create an account by providing your name, email address, and choosing a secure password.",
      },
      {
        answer: "Consent and Permissions:",
        // img: HelpImg,
        subAnswer:
          "Review and accept the app's terms and conditions, privacy policy, and consent to use your data for assessment and research purposes.",
      },
    ],
  },
  {
    question: "Log in to NeuroGenAI",
    subQuestion:
      "If you already have an account, follow these steps to log in:",
    unique: [
      {
        answer: "Locate the Log In Link:",
        img: HelpImg,
        subAnswer:
          "The chatbot may provide a detailed answer in text format. Read the response carefully.",
      },
      {
        answer: "Enter Your Credentials:",
        img: HelpImg,
        subAnswer: "Log ypur username and password",
      },
      {
        answer: "Click Log In:",
        img: HelpImg,
        subAnswer:
          "The chatbot may provide a detailed answer in text format. Read the response carefully.",
      },
    ],
  },
];

const Getting = () => {
  const [expandedAccordion, setExpandedAccordion] = useState(null);

  const handleAccordionClick = (index) => {
    if (expandedAccordion === index) {
      // If the clicked Accordion is already open, close it.
      setExpandedAccordion(null);
    } else {
      // If a different Accordion is clicked, expand it.
      setExpandedAccordion(index);
    }
  };
  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Accordion expanded={true}>
          <AccordionSummary
            // expandIcon={<ExpandMoreIcon />}
            aria-controls="general-accordion-content"
            id="general-accordion-header"
          >
            <Typography
               sx={{
                fontFamily: "Poppins",
                fontSize: "20px",
                fontWeight: "600",
              }}
            >
              Getting Started to NeuroGenAI
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <div>
              <h1>
                Welcome to the{" "}
                <b
                  style={{
                    color: "#16C2D5",
                    fontFamily: "Poppins",
                    fontSize: "32px",
                    fontStyle: "normal",
                    fontWeight: "700",
                  }}
                >
                  NeuroGenAI
                </b>
                web application
              </h1>
              <p>
                <b
                  style={{
                    color: "#16C2D5",
                    fontFamily: "Poppins",
                    fontSize: "20px",
                    fontStyle: "normal",
                    fontWeight: "300",
                    marginBottom: "10px",
                  }}
                >
                  NeuroGenAI
                </b>{" "}
                is your all-in-one stroke management tool. This section will
                guide you through the initial steps to get started with the app.
              </p>
              {getting.map((item, index) => (
                <Accordion key={index} expanded={expandedAccordion === index}>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    onClick={() => handleAccordionClick(index)}
                  >
                    <Typography
                      sx={{
                        fontFamily: "Poppins",
                        fontSize: "20px",
                        fontWeight: "bold",
                        marginBottom: "8px",
                      }}
                    >
                      {item.question}
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                      }}
                    >
                      {item.subQuestion && <p>{item.subQuestion}</p>}

                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        {item.answer && (
                          <Typography
                            sx={{
                              fontFamily: "Poppins",
                              fontWeight: "bold",
                              fontSize: "20px",
                            }}
                          >
                            {item.answer}
                          </Typography>
                        )}
                      </Box>

                      {item.unique &&
                        item.unique.map((uniqueItem, uniqueIndex) => (
                          <div key={uniqueIndex}>
                            {uniqueItem.img && (
                              <img
                                src={uniqueItem.img}
                                width={"700px"}
                                height={"400px"}
                                alt="data"
                              />
                            )}
                            <h3>
                              {uniqueItem.answer &&
                                `${uniqueIndex + 1} ${uniqueItem.answer}`}
                            </h3>
                            <p>
                              {uniqueItem.subAnswer && uniqueItem.subAnswer}
                            </p>
                          </div>
                        ))}
                    </Box>
                  </AccordionDetails>
                </Accordion>
              ))}
            </div>
          </AccordionDetails>
        </Accordion>
      </Box>
    </>
  );
};

export default Getting;
