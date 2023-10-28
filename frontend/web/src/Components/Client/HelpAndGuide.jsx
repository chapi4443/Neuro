import { Stack, Typography, useMediaQuery } from "@mui/material";
import React from "react";
import Chat from "./Help/Chat";
import User from "./Help/User";
import Dashboard from "./Help/Dashboard";
import Getting from "./Help/Getting";
import Risk from "./Help/Risk";
const HelpAndGuide = () => {
  const isMobile = useMediaQuery("(max-width: 770px)");
  const isTablet = useMediaQuery("(max-width: 430px)");
  return (
    <Stack sx={{ width: isTablet ? "100%" : isMobile ? "100%" : "84%" }}>
      <Stack
        sx={{ background: "#192655", height: "10dvh" }}
        alignItems={"center"}
        justifyContent={"center"}
      
      >
        <Typography color={"#FFFFFF"} fontSize={"24px"} fontWeight={"bold"}>
          Help And Guide
        </Typography>
      </Stack>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          alignItems: "center",
          width:"80%",
          margin:  "10px 8%",
        }}
      >
        <Typography
          sx={{
            fontStyle: "Poppins",
            fontSize: "24",
          }}
        >
          Need help? Here are several options.
        </Typography>
        <Getting />
        <Risk />
        <Dashboard />
        <Chat />
        <User />
      </div>
    </Stack>
  );
};

export default HelpAndGuide;
