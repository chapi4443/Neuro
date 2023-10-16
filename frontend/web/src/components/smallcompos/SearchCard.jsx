import { Typography, styled, useMediaQuery } from "@mui/material";
import React, { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";

const StyledTab = styled("button")((theme) => {
  const isXs = useMediaQuery("(min-width: 385px)");
  return {
    width: "98%",
    height: "30px",
    borderRadius: "4px",
    background: "#FFF",
    display: "flex",
    alignItems: "center",
    gap: "10px",
    border: "1px solid transparent",
    padding: "8px 12px",
    cursor: "pointer",
    margin: "0px 0px",
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
    marginRight: "50px",
  };
});

const TabCard = ({ onClick }) => {
  const [isInputClicked, setInputClicked] = useState(false);

  const handleInputClick = () => {
    setInputClicked(true);
  };
  return (
    <>
      <StyledTab onClick={onClick}>
        <SearchIcon />
        <input
          type="search"
          placeholder="Search.."
          style={{
            border: isInputClicked ? "none" : "none",
            height: "24px", // Adjust the height to match the SearchIcon's height
            "::placeholder": {
              fontWeight: "bold", // Set the desired fontWeight for the placeholder
            },
            ":hover": {
              /* Remove hover effect */
              outline: "none",
              boxShadow: "none",
            },
            ":focus": {
              /* Remove focus effect */
              outline: "none",
              boxShadow: "none",
            },
          }}
          onClick={handleInputClick}
        />
      </StyledTab>
    </>
  );
};

export default TabCard;
