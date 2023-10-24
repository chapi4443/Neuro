import { FileCopy, Mic, Send } from "@mui/icons-material";
import { Card, IconButton, Paper, Stack, Typography } from "@mui/material";
import React, { useState } from "react";
import jwt_decode from "jwt-decode";
import Cookies from "js-cookie";
import axios from "axios";
const Chat = () => {
  const [userMessages, setUserMessages] = useState([]);
  const [question, setQuestion] = useState("");
  const [message, setMessage] = useState("");

  const handleKeyPress = (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      setQuestion(event.target.value);
      submitHandler(event);
    }
  };

  function handleCopyMessage(message) {
    navigator.clipboard
      .writeText(message)
      .then(function () {
        console.log(message);
      })
      .catch(function (err) {
        console.error(err);
      });
  }
  const handleMicClick = async () => {
    const recognition =
      new window.webkitSpeechRecognition() || new window.SpeechRecognition();

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setQuestion(transcript);
    };

    recognition.start();
  };
  const submitHandler = async (e) => {
    e.preventDefault();
    const newUserMessages = [...userMessages];
    newUserMessages.push({ message: question, isQuestion: true }); // Store the question as an object with a flag
    setUserMessages(newUserMessages);
    const token = Cookies.get("token");
    const decodedToken = jwt_decode(token);
    const userId = decodedToken.userId;
    try {
      const response = await axios.post(
        "http://localhost:5000/api/v1/medical/medical-chat",
        {
          question: question,
          userId
        }
      );
      const responseData = response.data.response;
      newUserMessages.push({ message: responseData, isQuestion: false }); // Store the response as an object with a flag
      setUserMessages(newUserMessages);
    } catch (error) {
      console.error("Request Error:", error);
    }
    setQuestion("");
  };

  return (
    <Stack sx={{ width: "84%" }}>
      <Stack
        sx={{ background: "#192655", height: "10dvh" }}
        alignItems={"center"}
        justifyContent={"center"}
      >
        <Typography color={"#FFFFFF"} fontSize={"24px"} fontWeight={"bold"}>
          Chat
        </Typography>
      </Stack>
      <Stack
        sx={{
          height: "80vh",
          overflowY: "scroll",
          overflowX: "hidden",
          "&::-webkit-scrollbar": {
            display: "none",
          },
        }}
        gap={2}
        alignItems={"center"}
      >
        {userMessages.map((message, index) => (
          <Stack
            sx={{
              width: "100%",
              p: 1,
              backgroundColor: message.isQuestion ? "#FFFFFF" : "#DFF2F4", // Conditionally set the background color
            }}
            alignItems={"center"}
            key={index}
          >
            <Stack
              direction={"row"}
              gap={2}
              alignItems={"flex-start"}
              justifyContent="flex-start"
              sx={{
                width: "80%",
              }}
            >
              <Card
                sx={{
                  p: 1,
                  borderRadius: 2,
                  backgroundColor: message.isQuestion ? "#FFFFFF" : "#DFF2F4",
                  color: "#272727",
                  boxShadow: 0,
                  position: "relative",
                  width: "100%",
                }}
              >
                <Typography sx={{ width: "95%" }}>{message.message}</Typography>
                {!message.isQuestion && (
                  <IconButton
                    sx={{
                      position: "absolute",
                      top: "0",
                      right: "0",
                    }}
                    onClick={() => handleCopyMessage(message.message)}
                  >
                    <FileCopy />
                  </IconButton>
                )}
              </Card>
            </Stack>
          </Stack>
        ))}
      </Stack>
      <Paper
        component="form"
        sx={{
          position: "fixed",
          display: "flex",
          flexDirection: "row",
          width: "50%",
          bottom: "10px",
          left: "60%",
          transform: "translateX(-50%)",
          gap: 2,
          padding: 1,
        }}
        onSubmit={submitHandler}
      >
        <textarea
          rows={1}
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          style={{
            padding: "0.5rem 1rem",
            fontSize: "15px",
            outline: "none",
            border: "none",
            borderRadius: 4,
            resize: "none",
            width: "80%",
          }}
          onKeyPress={handleKeyPress}
          placeholder="Type Something..."
        />
        <IconButton onClick={handleMicClick}>
          <Mic />
        </IconButton>
        <IconButton type="submit">
          <Send />
        </IconButton>
      </Paper>
    </Stack>
  );
};

export default Chat;
