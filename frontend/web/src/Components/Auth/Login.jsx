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
import { useDispatch } from "react-redux";
import { setLogin } from "../../Utils/Store/AuthStore";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
const Login = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(setLogin({ data: { email, password } }));
  };
  return (
    <Stack
      alignItems={"center"}
      justifyContent={"center"}
      height={"100dvh"}
      gap={3}
    >
      <ToastContainer />
      <Stack
        direction={"row"}
        alignItems={"center"}
        gap={0}
        width={"100%"}
        justifyContent={"center"}
        sx={{pr:7}}
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
          Login here
        </Typography>
        <Typography variant="h6">Welcome back you’ve been missed!</Typography>
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
            onChange={(e) => setEmail(e.target.value)}
          />
        </FormControl>
        <FormControl sx={{ width: "100%" }} size="small" required>
          <TextField
            id="password-basic"
            label="Password"
            variant="outlined"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </FormControl>
        <Link
          style={{
            textAlign: "right",
            textDecoration: "none",
            color: "#16C2D5",
          }}
        >
          Forget password
        </Link>
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
            Sign in
          </Button>
        </Stack>
      </Paper>
      <Link
        to={"/register"}
        style={{
          textAlign: "right",
          textDecoration: "none",
          color: "#272727",
        }}
      >
        Create new account
      </Link>
    </Stack>
  );
};

export default Login;
