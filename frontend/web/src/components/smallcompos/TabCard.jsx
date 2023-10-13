import { Typography, styled, useMediaQuery } from "@mui/material";
import React from "react";

const StyledTab = styled("button")((theme) => {
  const isXs = useMediaQuery("(min-width: 385px)");
  return {
    width: "100%",
    height: "30px",
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
    color: "#7C7B84",
    fontFamily: "Poppins",
    fontSize: "14px",
    fontStyle: "normal",
    fontWeight: "400",
    lineHeight: "16px",
  };
});
const TabCard = ({ icon, num, text, right, onClick, selected }) => {
  return (
    <>
      <StyledTab onClick={onClick}>
        <img src={icon} />
        <StyledTypo
          sx={{
            fontWeight: selected ? "700" : "normal",
          }}
        >
          {text}
        </StyledTypo>

        <StyledTypo
          sx={{
            display: num ? "block" : "none",
            fontWeight: selected ? "700" : "normal",
            color: "#fff",
            fontFamily: "Poppins",
            background: num ? "#E92E50" : "",
            padding: "3px",
            borderRadius: "3px",
            marginLeft:"50px"
          }}
        >
          {num}
        </StyledTypo>
      </StyledTab>
    </>
  );
};

export default TabCard;
