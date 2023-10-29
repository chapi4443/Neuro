import { MarkEmailRead } from "@mui/icons-material";
import { Divider, Stack, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

const Verify = () => {
  return (
    <Stack
      sx={{ height: "100dvh" }}
      alignItems={"center"}
      justifyContent={"center"}
    >
      <Stack alignItems={"center"} gap={2}>
        <MarkEmailRead sx={{ fontSize: "80px", color: "#16C2D5" }} />
        <Typography fontSize={"24px"} fontWeight={"bold"}>
          Verify your email address !!
        </Typography>
        <Divider sx={{ m: 1, width: "100%" }} />
        <Typography>
          in order to start using your coinbase account , you need to confirm
          email address.
        </Typography>
        <Link
          onClick={() => window.open("https://www.gmail.com", "_blank")}
          style={{
            textDecoration: "none",
            background: "#16C2D5",
            padding: ".5rem 1rem",
            color:"white",
            borderRadius:5
          }}
        >
          Verify Email Address
        </Link>
      </Stack>
    </Stack>
  );
};

export default Verify;
