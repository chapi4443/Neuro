import { Stack, Typography } from "@mui/material";
import React from "react";

const HelpAndGuide = () => {
  return (
    <Stack sx={{ width: "84%" }}>
      <Stack
        sx={{ background: "#192655", height: "10dvh" }}
        alignItems={"center"}
        justifyContent={"center"}
      >
        <Typography color={"#FFFFFF"} fontSize={"24px"} fontWeight={"bold"}>
          Help And Guide
        </Typography>
      </Stack>
    </Stack>
  );
};

export default HelpAndGuide;
