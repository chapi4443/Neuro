import { Box, Stack } from "@mui/material";
import React from "react";

const Hero = () => {
  return (
    <Stack sx={{ height: "100vh" }}>
      <Box
        sx={{
          clipPath: "polygon(100% 0%, 100% 100%, 80% 100%, 0% 100%, 60% 30%)",
          background: "#16C2D5",
          width: "100%",
          height: "100%",
          position:"absolute",
        }}
      />
    </Stack>
  );
};

export default Hero;
