import { useMediaQuery } from "@mui/material";
import React from "react";

const SingleBox = () => {
  const isNotMobile = useMediaQuery("(min-width: 428px)");
  return (
    <div
      style={{
        width: isNotMobile ? "234px" : "150px",
        height: isNotMobile ? "207px" : "100px",
        background: "#D9D9D9",
      }}
    >
      SingleBox
    </div>
  );
};

export default SingleBox;
