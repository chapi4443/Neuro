import React from "react";
import { Box, styled, useMediaQuery } from "@mui/material";

import Neuron from "../assets/images/neuron.png";
import Doctor from "../assets/images/doctors.png";

const NeuronCompo = ({ display }) => {
  const isNotMobile = useMediaQuery("(min-width: 428px)");
  const imageWidth = isNotMobile ? "60%" : "100%";
  const circleTop = isNotMobile ? "12%" : "15%";
  const circleLeft = isNotMobile ? "25%" : "70%";
  const circleWidth = isNotMobile ? "250px" : "400px";
  const circleHeight = isNotMobile ? "250px" : "400px";
  const displayCircle = isNotMobile ? "block" : "none";

  const Image = styled("img")({
    width: imageWidth,
    height: "auto",
    objectFit: "cover",
    overflowX: "hidden",
  });

  const Circle = styled("div")({
    position: "absolute",
    width: circleWidth,
    height: circleHeight,
    borderRadius: "50%",
    border: "3px solid #D3DDFF",
    top: circleTop,
    left: circleLeft,
    transform: "translate(-50%, -50%)",
    overflowX: "hidden",
    overflow: "hidden",
    display: displayCircle,
  });

  return (
    <Box
      sx={{
        display: isNotMobile ? "flex" : display,
        justifyContent: "center",
        marginLeft: isNotMobile ? "220px" : "",
        overflowX: "hidden",
      }}
    >
      <Box>
        {isNotMobile ? (
          <Box sx={{ width: "100%" }}>
            <Image src={Neuron} />
          </Box>
        ) : (
          <Image src={Doctor} />
        )}
      </Box>
    </Box>
  );
};

export default NeuronCompo;
