import React from "react";
import { Box, styled, Typography, useMediaQuery } from "@mui/material";

import Neuron from "../assets/images/neuron.png";
import Doctor from "../assets/images/doctors.png";


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

const NeuronCompo = ({display}) => {
  const isNotMobile = useMediaQuery("(min-width: 428px)");
  //   const isXs_2 = useMediaQuery("(min-width: 800px)");
  const imageWidth = isNotMobile ? "60%" : "100%";
  const circleTop = isNotMobile ? "12%" : "15%";
  const circleLeft = isNotMobile ? "25%" : "70%";
  const circleWidth = isNotMobile ? "250px" : "400px";
  const circleHeight = isNotMobile ? "250px" : "400px";
  const displayCircle = isNotMobile ? "block" : "none";
  return (
    <div>
      <Box
        sx={{
          display: isNotMobile ? "flex" : display,
          justifyContent: "center",
          marginLeft: isNotMobile ? "220px" : "",
          overflowX: "hidden",
          // marginBottom: isNotMobile ? "20px" : "80px",
        }}
      >
        <Box>
          {isNotMobile ? (
            <>
              <Box
                sx={{
                  width: "100%",
                }}
              >
                <img
                  src={Neuron}
                  style={{ ...styles.image, width: imageWidth }}
                />
              </Box>
            </>
          ) : (
            <img src={Doctor} style={{ ...styles.image, width: imageWidth }} />
          )}
          <div
            style={{
              ...styles.circle,
              top: circleTop,
              left: circleLeft,
              width: circleWidth,
              height: circleHeight,
              display: displayCircle,
            }}
          ></div>
          
        </Box>
      </Box>
    </div>
  );
};

export default NeuronCompo;
