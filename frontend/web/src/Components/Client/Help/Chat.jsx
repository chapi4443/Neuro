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

const chat = [
  {
    question: "Accessing the Chatbot",
    subQuestion:
      "You can access the chatbot via the app's dashboard interface. Here's how:",
    unique: [
      {
        answer: "Open chat bot",
        img: HelpImg,
        subAnswer:
          "Click on the chatbot icon or button within the app's side bar navigation menu.",
      },
      {
        answer: "Input Field:",
        img: HelpImg,
        subAnswer:
          "You can interact with the chatbot using text input. Type your medical question in the input field.",
      },
      {
        answer: "Voice Input (Optional):",
        img: HelpImg,
        subAnswer:
          "If your device supports it, you can also use voice input to ask questions. Click the microphone icon and speak your question clearly.",
      },
      {
        answer: "Chat Display:",
        img: HelpImg,
        subAnswer:
          "The chatbot's responses will appear in the upper part of the input field, similar to a chat conversation.",
      },
    ],
  },
  {
    question: "Using the Chatbot",
    answer: "Here are some tips for effectively using the chatbot:",
    unique: [
      {
        answer: "Ask Clear Questions:",
        img: HelpImg,
        subAnswer:
          "The chatbot works best when you ask clear and specific questions related to stroke or medical topics. For example, you can ask, What are the common symptoms of a stroke?",
      },
      {
        answer: "Follow-Up Questions:",
        img: HelpImg,
        subAnswer:
          "Feel free to ask follow-up questions for more information. The chatbot will do its best to provide detailed responses.",
      },
    ],
  },
  {
    question: "Interpreting Responses",
    subQuestion:
      "The chatbot's responses includes text-based information or links to external resources. Here's how to interpret the responses:",
    unique: [
      {
        answer: "Text Responses:",
        img: HelpImg,
        subAnswer:
          "The chatbot may provide a detailed answer in text format. Read the response carefully.",
      },
    ],
  },
];

const Chat = () => {
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
              ChatBot
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <div>
              <h1 style={{ fontFamily: "Poppins" }}>
                Chatbot - Help and Guide
              </h1>
              <p style={{ fontFamily: "Poppins" }}>
                The chatbot feature in <b>NeuroGenAI</b> is designed to provide
                answers to medical-related questions, with a specific focus on
                stroke-related inquiries. This guide will help you make the most
                of this feature.
              </p>
              {chat.map((item, index) => (
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

export default Chat;
