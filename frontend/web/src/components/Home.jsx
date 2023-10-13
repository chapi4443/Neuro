import React from "react";
import TabCard from "./smallcompos/TabCard";
import Bell from "../assets/images/bell.png";
import { styled, Box, useMediaQuery } from "@mui/material";

const NavDeskBox = styled(Box)((theme) => {
  const isXs = useMediaQuery("(min-width: 385px)");

  const isXs_2 = useMediaQuery("(min-width: 800px)");

  // const isXs_2 = useMediaQuery("(min-width: 800px)");

  return {
    borderRight: "2px solid #F1F4FF",
    background: "#169CD5",
    width: "260px",
    height: "1024px",
  };
});

const Home = () => {
  const isNotMobile = useMediaQuery("(min-width: 428px)");
  return (
    <NavDeskBox
      sx={{
        display: isNotMobile ? "block" : "none",
      }}
    >
      {/* <TabCard icon={Bell} text={"Notifications"} right={Bell} /> */}
    </NavDeskBox>
  );
};

export default Home;
