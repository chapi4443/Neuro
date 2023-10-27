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

const risk = [
  {
    question: "Accessing Risk Assessment",
    subQuestion:
      "You can access the risk assessment tool within the app. Here's how:",
    unique: [
      {
        answer: "Navigate to Risk Assessment",
        img: HelpImg,
        subAnswer:
          "Click on the 'Risk Assessment' tab in the app's main menu to access the risk assessment tool.",
      },
    ],
  },
  {
    question: "Completing the Risk Assessment",
    answer:
      "The risk assessment tool helps you evaluate your risk of stroke. Follow these steps:",
    unique: [
      {
        answer: "Step 1: Personal Information",
        img: HelpImg,
        subAnswer:
          "Fill in your personal information such as age, gender, and medical history as requested.",
      },
      {
        answer: "Step 2: Lifestyle Questions",
        img: HelpImg,
        subAnswer:
          "Answer questions related to your lifestyle, including diet, exercise, and smoking habits.",
      },
      {
        answer: "Step 3: Medical History",
        img: HelpImg,
        subAnswer:
          "Provide information about any pre-existing medical conditions or medications you're currently taking.",
      },
      {
        answer: "Step 4: Family History",
        img: HelpImg,
        subAnswer:
          "Answer questions regarding your family's medical history and any history of stroke.",
      },
      {
        answer: "Step 5: Submit",
        img: HelpImg,
        subAnswer:
          "After completing the assessment, click 'Submit' to receive your risk assessment results.",
      },
    ],
  },
  {
    question: "Understanding Risk Assessment Results",
    answer:
      "The risk assessment tool will provide you with valuable insights. Here's how to interpret the results:",
    unique: [
      {
        answer: "Risk Score",
        img: HelpImg,
        subAnswer:
          "You will receive a risk score that indicates your risk of stroke. The higher the score, the higher the risk.",
      },
      {
        answer: "Recommendations",
        img: HelpImg,
        subAnswer:
          "You will also receive personalized recommendations on how to reduce your stroke risk.",
      },
    ],
  },
  {
    question: "Frequently Asked Questions (FAQs)",
    subQuestion:
      "Here are some common questions about the risk assessment tool:",
    unique: [
      {
        answer: "What if I'm unsure about certain questions?",
        img: HelpImg,
        subAnswer:
          "If you're unsure about any questions, it's best to answer to the best of your knowledge. The tool will provide guidance.",
      },
      {
        answer: "Can I retake the assessment?",
        img: HelpImg,
        subAnswer:
          "Yes, you can retake the assessment at any time to track changes in your risk factors.",
      },
      {
        answer: "Is the assessment results confidential?",
        img: HelpImg,
        subAnswer:
          "Yes, your assessment results are confidential and will not be shared with third parties without your consent.",
      },
    ],
  },
];

const Risk = () => {
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
        <Accordion
        //   expanded={expandedAccordion === "general-accordion"}
        //   onChange={handleAccordionChange("general-accordion")}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
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
              Risk Assessment
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <div>
              <p
                style={{
                  fontFamily: "Poppins",
                  fontSize: "16px",
                  fontStyle: "normal",
                  fontWeight: "300",
                }}
              >
                You can access the risk assessment tool within the app.
              </p>
              {risk.map((item, index) => (
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

export default Risk;
