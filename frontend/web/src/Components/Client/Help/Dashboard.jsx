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

const dashboard = [
  {
    question: "Accessing the Dashboard",
    subQuestion: "You can access the dashboard within the app. Here's how:",
    unique: [
      {
        answer: "Navigate to Dashboard",
        img: HelpImg,
        subAnswer:
          "Click on the 'Dashboard' tab in the app's main menu to access the dashboard.",
      },
    ],
  },
  {
    question: "Total Risk Assessments",
    answer:
      "View the total number of risk assessments taken by all users within the app. This provides an overview of the community's engagement in stroke risk assessment.",
  },
  {
    question: "FAQs",
    answer:
      "Access frequently asked questions related to stroke risk assessment. You can find answers to common queries and concerns in this section.",
  },
  {
    question: "Today's Risk Assessments",
    answer:
      "Track the number of risk assessments completed today. This feature allows users to see how many assessments have been taken recently.",
  },
  {
    question: "Risk Assessment Results",
    subQuestion:
      "Explore graphical representations of risk assessment results. The dashboard provides two types of charts:",
    unique: [
      {
        answer: "1. Bar Graph - All Past Results",
        img: HelpImg,
        subAnswer:
          "This bar graph shows a historical overview of risk assessment results, enabling users to monitor their progress over time.",
      },
      {
        answer: "2. Bar Graph - Today's Results",
        img: HelpImg,
        subAnswer:
          "A separate bar graph displays risk assessment results for today. This provides insight into the community's current risk profiles.",
      },
    ],
  },
];

const Dashboard = () => {
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
                color: "#16C2D5",
                fontFamily: "Poppins",
                fontSize: "30px",
                fontStyle: "normal",
                fontWeight: "600",
                marginBottom: "10px",
              }}
            >
              Dashboard
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <div>
              <p
                style={{
                  fontFamily: "Poppins",

                  fontStyle: "normal",
                }}
              >
                Welcome to the dashboard where you can access your Stroke risk
                assessment results
              </p>
              {dashboard.map((item, index) => (
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

export default Dashboard;
