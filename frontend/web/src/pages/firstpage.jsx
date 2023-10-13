import React from "react";
import { Box, Typography, styled, useMediaQuery } from "@mui/material";

import Neuron from "../assets/images/neuron.png";
import Doctor from "../assets/images/doctors.png";
import SingleBox from "../components/SingleBox";
import { useNavigate } from "react-router-dom";
import NeuronCompo from "../components/NeuronCompo NeuronCompo";
import TextCompo from "../components/TextCompo";

const StyledTypo = styled(Typography)(({ theme }) => {
  const isXs = useMediaQuery("(min-width: 385px)");
  const isXs_2 = useMediaQuery("(min-width: 800px)");

  return {
    color: "#16C2D5",
    textAlign: "center",
    fontFamily: "Poppins",
    fontSize: isXs ? "48px" : "24px",
    fontStyle: "normal",
    fontWeight: "600",
    lineHeight: "normal",
    "&:hover": {
      cursor: "pointer",
      color: "#16C2D5",
      background: "#fff",
      border: "1px solid #16C2D5",
    },
    "&:active": {
      color: "#fff",
      background: "#16C2D5",
      border: "none",
    },
  };
});

const StyledTypoTwo = styled(Typography)((theme) => {
  const isXs = useMediaQuery("(min-width: 385px)");
  const isXs_2 = useMediaQuery("(min-width: 800px)");

  // const isXs_2 = useMediaQuery("(min-width: 800px)");

  return {
    color: "#000",
    textAlign: "center",
    fontFamily: "Poppins",
    fontSize: "14px",
    fontStyle: "normal",
    fontWeight: "400",
    lineHeight: "normal",
  };
});
const StyledButton = styled("button")((theme) => {
  const isXs = useMediaQuery("(min-width: 385px)");
  const isXs_2 = useMediaQuery("(min-width: 800px)");

  // const isXs_2 = useMediaQuery("(min-width: 800px)");

  return {
    padding: "8px 16px",
    border: "none",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    fontFamily: "Poppins",
    fontSize: "16px",
    fontStyle: "normal",
    fontWeight: "400",
    lineHeight: "normal",
  };
});
const styles = {
  container: {
    position: "relative",
    width: "200px",
    height: "200px",
  },
  image: {
    width: "80%",
    height: "90%",
    objectFit: "cover",
    overflowX: "hidden",
  },
  circle: {
    position: "absolute",
    width: "250px",
    height: "250px",
    borderRadius: "50%",
    border: "3px solid #D3DDFF",
    top: "12%",
    left: "25%",
    transform: "translate(-50%, -50%)", // Center the circle
    overflowX: "hidden",
    overflow: "hidden",
  },
  text: {
    position: "absolute",
    overflowX: "hidden",

    // height: "250px",
    // borderRadius: "50%",
    // border: "3px solid #D3DDFF",
    top: "35%",
    left: "45%",
    transform: "translate(-50%, -50%)", // Center the circle
  },
};

const FirstPage = () => {
  const navigate = useNavigate();
  const isNotMobile = useMediaQuery("(min-width: 428px)");
  //   const isXs_2 = useMediaQuery("(min-width: 800px)");
  const imageWidth = isNotMobile ? "60%" : "100%";
  const circleTop = isNotMobile ? "12%" : "15%";
  const circleLeft = isNotMobile ? "25%" : "70%";
  const circleWidth = isNotMobile ? "250px" : "400px";
  const circleHeight = isNotMobile ? "250px" : "400px";
  const textWidth = isNotMobile ? "343px" : "300px";
  const displayCircle = isNotMobile ? "block" : "none";

  return (
    <>
      {/* bg start */}
      <NeuronCompo display={"flex"} />
      <TextCompo
            title={"Neurogen AI"}
            subtitle={
              "Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturinecessitatibus repellat sint!"
            }
            marginTop={"80px"}
          />
      {/* bg end */}
      <Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "10px",
            paddingLeft: isNotMobile ? "" : "10px",
            marginTop: isNotMobile ? "80px" : "140px",
            overflowX: isNotMobile ? "" : "auto",
          }}
        >
          <SingleBox />
          <SingleBox />
          <SingleBox />
          <SingleBox />
        </Box>
        <Box
          sx={{
            marginTop: "18px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <StyledButton
            sx={{
              color: "#fff",
              borderRadius: "10px",
              background: "#16C2D5",
              "&:hover": {
                cursor: "pointer",
                color: "#000",
                background: "#fff",
                border: "1px solid #000",
              },
            }}
            onClick={() => navigate("/login")}
          >
            Log in
          </StyledButton>
          <StyledButton
            sx={{
              color: "#000",
              borderRadius: "10px",
              background: "#fff",
              border: "1px solid #000",
              "&:hover": {
                cursor: "pointer",
                color: "#fff",
                background: "#16C2D5",
                border: "1px solid #16C2D5",
              },
            }}
            onClick={() => navigate("/register")}
          >
            Register
          </StyledButton>
        </Box>
      </Box>
    </>
  );
};

export default FirstPage;
