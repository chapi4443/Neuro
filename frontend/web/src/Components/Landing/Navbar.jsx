import { AppBar, Button, ImageListItem, Stack, Toolbar } from "@mui/material";
import React from "react";
import logo from "../../Image/image 14.png";
import { useNavigate } from "react-router-dom";
const Navbar = () => {
  const navigate = useNavigate();
  return (
    <AppBar
      sx={{
        background: "transparent",
        boxShadow: "none",
        position: "absolute",
        top: "20px",
        left: "70px",
        right: "70px",
        width: "90%",
      }}
    >
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Stack direction={"row"} alignItems={"center"} gap={2}>
          <ImageListItem sx={{ maxHeight: "10dvh", maxWidth: "40%" }}>
            <img src={logo} alt="logo" style={{ width: "100%" }} />
          </ImageListItem>
          <Button
            variant="contained"
            sx={{
              background: "#16C2D5",
              "&:hover": { background: "#16C2D5", color: "#FFFFFF" ,boxShadow:"none"},
              borderRadius: 6,
              boxShadow:"none"
            }}
            onClick={() => navigate("/")}
          >
            Neurogen AI
          </Button>
        </Stack>
        <Stack direction={"row"} alignItems={"center"} gap={2}>
          <Button
            variant="contained"
            sx={{
              background: "#16C2D5",
              "&:hover": { background: "#FFFFFF", color: "#272727" },
            }}
            onClick={() => navigate("/login")}
          >
            Login
          </Button>
          <Button
            variant="contained"
            sx={{
              background: "#FFFFFF",
              color: "#272727",
              "&:hover": { background: "#16C2D5", color: "#FFFFFF" },
            }}
            onClick={() => navigate("/register")}
          >
            Register
          </Button>
        </Stack>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
