import {
  Button,
  FormControl,
  ImageListItem,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import logo from "../../Image/image 14.png";
import { Link, useNavigate } from "react-router-dom";
const Register = () => {
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
  };
  return (
    <Stack
      alignItems={"center"}
      justifyContent={"center"}
      height={"100dvh"}
      gap={3}
    >
      <Stack
        direction={"row"}
        alignItems={"center"}
        gap={2}
        width={"100%"}
        justifyContent={"center"}
      >
        <ImageListItem sx={{ maxHeight: "10dvh", maxWidth: "8%" }}>
          <img src={logo} alt="logo" style={{ width: "100%" }} />
        </ImageListItem>
        <Button
          variant="contained"
          sx={{
            background: "#16C2D5",
            "&:hover": {
              background: "#16C2D5",
              color: "#FFFFFF",
              boxShadow: "none",
            },
            borderRadius: 6,
            boxShadow: "none",
          }}
          onClick={() => navigate("/")}
        >
          Neurogen AI
        </Button>
      </Stack>
      <Stack>
        <Typography
          variant="h5"
          color={"#16C2D5"}
          textAlign={"center"}
          fontWeight={"bold"}
        >
          Create Account
        </Typography>
        <Typography variant="h6" sx={{ width: 345 }} textAlign={"center"}>
          Create an account so you can explore all the existing jobs
        </Typography>
      </Stack>
      <Paper
        component="form"
        sx={{
          width: 345,
          display: "flex",
          flexDirection: "column",
          gap: 2,
          justifyContent: "center",
          p: 2,
          boxShadow: "none",
        }}
        onSubmit={handleSubmit}
      >
        <FormControl sx={{ width: "100%" }} size="small" required>
          <TextField
            id="email-basic"
            label="Email"
            variant="outlined"
            type="email"
          />
        </FormControl>
        <FormControl sx={{ width: "100%" }} size="small" required>
          <TextField
            id="password-basic"
            label="Password"
            variant="outlined"
            type="password"
          />
        </FormControl>
        <FormControl sx={{ width: "100%" }} size="small" required>
          <TextField
            id="ConfirmPassword-basic"
            label="Confirm Password"
            variant="outlined"
            type="password"
          />
        </FormControl>
        <Stack direction={"row"} width={"100%"} gap={1}>
          <Button
            variant="contained"
            type="submit"
            sx={{
              background: "#16C2D5",
              flex: "auto",
              "&:hover": { background: "#16C2D590" },
            }}
          >
            Sign up
          </Button>
        </Stack>
      </Paper>
      <Link
        to={"/login"}
        style={{
          textAlign: "right",
          textDecoration: "none",
          color: "#272727",
        }}
      >
        Already have an account
      </Link>
    </Stack>
  );
};

export default Register;
