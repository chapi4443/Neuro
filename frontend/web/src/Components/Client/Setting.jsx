import React, { useState } from "react";
import {
  Stack,
  Typography,
  Button,
  Grid,
  Paper,
  TextField,
  Box,
  IconButton,
  Menu,
  MenuItem,
  ListItemText,
  Divider,
} from "@mui/material";
import Cookies from "js-cookie";
import { AccountCircle } from "@mui/icons-material";
const Setting = () => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  const initialUserData = {
    first_name: "John",
    last_name: "Doe",
    gender: "Male",
    date_of_birth: "1990-01-01",
    age: 33,

    phone_number: "123-456-7890",
    country: "USA",
    city: "New York",
    address: "123 Main St, Apt 4B",
  };

  const initialPasswordData = {
    password: "Pa$$w0rd!",
    confirm_password: "Pa$$w0rd!",
    email: "john@example.com",
  };

  const [userData, setUserData] = useState({ ...initialUserData });
  const [passwordData, setPasswordData] = useState({ ...initialPasswordData });
  console.log(userData);
  console.log(passwordData);
  const [editMode, setEditMode] = useState(false);
  const [passwordEditMode, setPasswordEditMode] = useState(false);

  const handleEdit = () => {
    setEditMode(true);
    setAnchorEl(null);
  };

  const handlePasswordEdit = () => {
    setPasswordEditMode(true);
    setAnchorEl(null);
  };

  const handleSave = () => {
    setEditMode(false);
    setPasswordEditMode(false);
    // You can save the changes to the backend here
  };

  const handleCancel = () => {
    setUserData({ ...initialUserData });
    setPasswordData({ ...initialPasswordData });
    setEditMode(false);
    setPasswordEditMode(false);
  };
  const handleLogout = () => {
    localStorage.clear();
    Cookies.remove("token");
    window.location.href = "/login";
  };

  return (
    <Stack sx={{ width: "84%" }}>
      <Stack
        sx={{ background: "#192655", height: "10vh" }}
        alignItems={"center"}
        justifyContent={"center"}
      >
        <Typography color={"#FFFFFF"} fontSize={"24px"} fontWeight={"bold"}>
          Settings
        </Typography>
      </Stack>
      <Stack sx={{ width: "100%", alignItems: "center" }}>
        <Paper elevation={3} sx={{ width: "80%", p: 2, my: 2 }}>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography
              variant="h5"
              sx={{ mb: 2, fontWeight: "bold", color: "#16C2D5" }}
            >
              Login and Security
            </Typography>
            {!passwordEditMode && (
              <Box>
                <IconButton
                  aria-controls="user-menu"
                  aria-haspopup="true"
                  onClick={handleMenuClick}
                >
                  <AccountCircle color="primary" fontSize="large" />
                </IconButton>
                <Menu
                  id="user-menu"
                  anchorEl={anchorEl}
                  keepMounted
                  open={Boolean(anchorEl)}
                  onClose={handleMenuClose}
                >
                  <MenuItem onClick={handlePasswordEdit}>
                    <ListItemText primary="Update Security" />
                  </MenuItem>
                  <MenuItem onClick={handleLogout}>
                    <ListItemText primary="Logout" />
                  </MenuItem>
                </Menu>
              </Box>
            )}
            {passwordEditMode ? (
              <Box>
                <Button
                  variant="outlined"
                  color="success"
                  onClick={handleSave}
                  sx={{ mr: 2 }}
                >
                  Save
                </Button>
                <Button variant="outlined" color="error" onClick={handleCancel}>
                  Cancel
                </Button>
              </Box>
            ) : null}
          </Stack>
          {passwordEditMode ? (
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Typography variant="body1">Email</Typography>
                <TextField
                  type="email"
                  variant="outlined"
                  fullWidth
                  size="small"
                  value={passwordData.email}
                  onChange={(e) =>
                    setPasswordData({
                      ...passwordData,
                      email: e.target.value,
                    })
                  }
                  sx={{ mb: 2 }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="body1">Old Password</Typography>
                <TextField
                  type="password"
                  variant="outlined"
                  fullWidth
                  size="small"
                  value={passwordData.password}
                  onChange={(e) =>
                    setPasswordData({
                      ...passwordData,
                      password: e.target.value,
                    })
                  }
                  sx={{ mb: 2 }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="body1">New Password</Typography>
                <TextField
                  type="password"
                  variant="outlined"
                  fullWidth
                  size="small"
                  onChange={(e) =>
                    setPasswordData({
                      ...passwordData,
                      password: e.target.value,
                    })
                  }
                  sx={{ mb: 2 }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="body1">Confirm New Password</Typography>
                <TextField
                  type="password"
                  variant="outlined"
                  fullWidth
                  size="small"
                  onChange={(e) =>
                    setPasswordData({
                      ...passwordData,
                      confirm_password: e.target.value,
                    })
                  }
                  sx={{ mb: 2 }}
                />
              </Grid>
            </Grid>
          ) : (
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Typography variant="body1" fontWeight={"bold"}>
                  Email
                </Typography>
                <Typography variant="body1" sx={{ mt: 1 }}>
                  {passwordData.email}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="body1" fontWeight={"bold"}>
                  Password
                </Typography>
                <Typography variant="body1" sx={{ mt: 1 }}>
                  {passwordData.password}
                </Typography>
              </Grid>
            </Grid>
          )}
        </Paper>
        <Paper elevation={3} sx={{ width: "80%", p: 2, my: 2 }}>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography
              variant="h5"
              sx={{ mb: 2, fontWeight: "bold", color: "#16C2D5" }}
            >
              Personal Information
            </Typography>
            {!editMode && (
              <Button variant="outlined" color="info" onClick={handleEdit}>
                Edit
              </Button>
            )}
            {editMode ? (
              <Box>
                <Button
                  variant="outlined"
                  color="success"
                  onClick={handleSave}
                  sx={{ mr: 2 }}
                >
                  Save
                </Button>
                <Button variant="outlined" color="error" onClick={handleCancel}>
                  Cancel
                </Button>
              </Box>
            ) : null}
          </Stack>

          {editMode ? (
            <Grid container spacing={2}>
              {Object.keys(userData).map((field) => (
                <Grid item xs={12} sm={6} key={field}>
                  <Typography variant="body1">
                    {field
                      .split("_")
                      .map(
                        (word) => word.charAt(0).toUpperCase() + word.slice(1)
                      )
                      .join(" ")}
                  </Typography>
                  <TextField
                    variant="outlined"
                    fullWidth
                    size="small"
                    value={userData[field]}
                    onChange={(e) =>
                      setUserData({ ...userData, [field]: e.target.value })
                    }
                    sx={{ mb: 2 }}
                  />
                </Grid>
              ))}
            </Grid>
          ) : (
            <Grid container spacing={2}>
              {Object.keys(userData).map((field) => (
                <Grid item xs={12} sm={6} key={field}>
                  <Typography variant="body1" fontWeight={"bold"}>
                    {field
                      .split("_")
                      .map(
                        (word) => word.charAt(0).toUpperCase() + word.slice(1)
                      )
                      .join(" ")}
                  </Typography>
                  <Typography variant="body1" sx={{ mt: 1 }}>
                    {userData[field]}
                  </Typography>
                  <Divider sx={{ mt: 1 }} />
                </Grid>
              ))}
            </Grid>
          )}
        </Paper>
      </Stack>
    </Stack>
  );
};

export default Setting;
