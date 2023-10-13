import { Box, Typography, styled, useMediaQuery } from "@mui/material";
import React from "react";

import Hist from '../../assets/images/hist.png'

const StyledTab = styled("button")((theme) => {
  const isXs = useMediaQuery("(min-width: 385px)");
  return {
    width: "100%",
    height: "40px",
    borderRadius: "4px",
    background: "#FFF",
    display: "flex",
    alignItems: "center",
    gap: "10px",
    border: "1px solid transparent",
    padding: "8px 12px",
    cursor: "pointer",
    margin: "4px 0px",
    "&:hover": {
      backgroundColor: "lightgray",
    },
  };
});
const StyledTypo = styled(Typography)((theme) => {
  const isXs = useMediaQuery("(min-width: 385px)");
  const isXs_2 = useMediaQuery("(min-width: 800px)");

  // const isXs_2 = useMediaQuery("(min-width: 800px)");

  return {
    color: "#000",
    fontFamily: "Poppins",
    fontSize: "14px",
    fontStyle: "normal",
    fontWeight: "400",
  };
});
const TabCard = ({ textOne, textTwo, onClick, selected }) => {
  return (
    <>
      <StyledTab onClick={onClick}>
        <img src={Hist} />
        <Box>
          <StyledTypo
            sx={{
              fontWeight: selected ? "700" : "normal",
              marginLeft: "-56px",
            }}
          >
            {textOne}
          </StyledTypo>

          <StyledTypo
            sx={{
              fontWeight: selected ? "700" : "300",
              fontSize:"10px",
              color: "#7C7B84",
            }}
          >{textTwo}</StyledTypo>
        </Box>
      </StyledTab>
    </>
  );
};

export default TabCard;
