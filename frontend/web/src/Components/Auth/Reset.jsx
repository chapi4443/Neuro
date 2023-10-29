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
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setRestPassword } from "../../Utils/Store/AuthStore";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
const Reset = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const email = urlParams.get("token");
  console.log(email);
  const [NewPassword, setNewPassword] = useState();
  const [ConfirmNewPassword, setConfirmNewPassword] = useState();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (NewPassword === ConfirmNewPassword) {
      dispatch(setRestPassword({ data: { NewPassword, email } }));
    } else {
      toast.error("The password does not match");
    }
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
        sx={{ pr: 7 }}
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
          Reset here
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
            id="password-basic"
            label="New Password"
            variant="outlined"
            type="password"
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </FormControl>
        <FormControl sx={{ width: "100%" }} size="small" required>
          <TextField
            id="CPassword-basic"
            label="Confirm Password"
            variant="outlined"
            type="password"
            onChange={(e) => setConfirmNewPassword(e.target.value)}
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
            Reset Password
          </Button>
        </Stack>
      </Paper>
    </Stack>
  );
};

export default Reset;
