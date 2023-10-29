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

const user = [
  {
    question: "Accessing User Profile",
    subQuestion: "You can access your user profile within the app. Here's how:",
    unique: [
      {
        answer: "Navigate to User Profile",
        img: HelpImg,
        subAnswer:
          "Click on your user profile icon or username in the app's navigation menu to access your profile.",
      },
    ],
  },
  {
    question: "Updating Personal Information",
    answer:
      "Your user profile allows you to update and manage your personal information. Follow these steps:",
    unique: [
      {
        answer: "Edit Profile",
        img: HelpImg,
        subAnswer:
          "Click on the 'Edit Profile' button to modify details like name, profile picture, and contact information.",
      },
      {
        answer: "Change Password",
        img: HelpImg,
        subAnswer:
          "To change your password, click on 'Change Password' and follow the instructions.",
      },
    ],
  },
  {
    question: "Viewing Activity History",
    answer:
      "Your user profile includes a history of your activities within the app. Here's what you can find:",
    unique: [
      {
        answer: "Recent Activity",
        img: HelpImg,
        subAnswer:
          "View a list of your recent interactions and assessments within the app.",
      },
    ],
  },
  {
    question: "Privacy Settings",
    answer:
      "Manage your privacy settings and data preferences within your user profile:",
    unique: [
      {
        answer: "Data Sharing",
        img: HelpImg,
        subAnswer: "Control how your data is shared and used within the app.",
      },
      {
        answer: "Notification Preferences",
        img: HelpImg,
        subAnswer:
          "Adjust your notification settings to receive updates and alerts as desired.",
      },
    ],
  },
];

const User = () => {
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
          // width: isTablet && "100%"
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
              User Profile
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <div>
              <p
                style={{
                  fontFamily: "Poppins",
                  fontSize: "20px",
                  fontStyle: "normal",
                  fontWeight: "300",
                }}
              >
                In user profile you can cahnge your user Profiles.
              </p>
              {user.map((item, index) => (
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

export default User;
