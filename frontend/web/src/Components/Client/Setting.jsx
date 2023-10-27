import React, { useEffect, useState } from "react";
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
import { useDispatch, useSelector } from "react-redux";
import { getUser, setUpdateUser } from "../../Utils/Store/UserStore";
import jwt_decode from "jwt-decode";
const Setting = () => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const dispatch = useDispatch();
  const token = Cookies.get("token");
  const decodedToken = jwt_decode(token);
  const userId = decodedToken.userId;

  useEffect(() => {
    dispatch(getUser({ data: userId }));
  }, [dispatch, userId]);

  const user = useSelector((state) => state.UserStore.OutputUser);
  // console.log(user?.user);
  const [userData, setUserData] = useState({
    first_name: user?.user?.first_name,
    last_name: user?.user?.last_name,
    gender: user?.user?.gender,
    date_of_birth: user?.user?.date_of_birth,
    age: user?.user?.age,

    phone_number: user?.user?.phone_number,
    country: user?.user?.country,
    city: user?.user?.city,
    address: user?.user?.address,
  });
  const [passwordData, setPasswordData] = useState({
    oldPassword: null,
    password: null,
    confirm_password: null,
    email: user?.user?.email,
  });
  useEffect(() => {
    setUserData({
      first_name: user?.user?.first_name,
      last_name: user?.user?.last_name,
      gender: user?.user?.gender,
      date_of_birth: user?.user?.date_of_birth,
      age: user?.user?.age,

      phone_number: user?.user?.phone_number,
      country: user?.user?.country,
      city: user?.user?.city,
      address: user?.user?.address,
    });
    setPasswordData({
      oldPassword: null,
      password: null,
      confirm_password: null,
      email: user?.user?.email,
    });
  }, [user]);
  // console.log(userData);
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
    dispatch(setUpdateUser({data: {...userData,userId}}));
  };
  const handleSavePassword = () => {
    setEditMode(false);
    setPasswordEditMode(false);
    // You can save the changes to the backend here
  };
  const handleCancel = () => {
    setUserData({
      first_name: user?.user?.first_name,
      last_name: user?.user?.last_name,
      gender: user?.user?.gender,
      date_of_birth: user?.user?.date_of_birth,
      age: user?.user?.age,

      phone_number: user?.user?.phone_number,
      country: user?.user?.country,
      city: user?.user?.city,
      address: user?.user?.address,
    });
    setPasswordData({
      oldPassword: null,
      password: null,
      confirm_password: null,
      email: user?.user?.email,
    });
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
                  onClick={handleSavePassword}
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
                  value={passwordData.oldPassword}
                  onChange={(e) =>
                    setPasswordData({
                      ...passwordData,
                      oldPassword: e.target.value,
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
                  {user?.user?.email}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="body1" fontWeight={"bold"}>
                  Password
                </Typography>
                <Typography variant="body1" sx={{ mt: 1 }}>
                  {"********"}
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
              <Grid item xs={12} sm={6}>
                <Typography variant="body1">First Name</Typography>
                <TextField
                  variant="outlined"
                  fullWidth
                  size="small"
                  value={userData?.first_name}
                  onChange={(e) =>
                    setUserData({ ...userData, first_name: e.target.value })
                  }
                  sx={{ mb: 2 }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="body1">Last Name</Typography>
                <TextField
                  variant="outlined"
                  fullWidth
                  size="small"
                  value={userData?.last_name}
                  onChange={(e) =>
                    setUserData({ ...userData, last_name: e.target.value })
                  }
                  sx={{ mb: 2 }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="body1">Gender</Typography>
                <TextField
                  variant="outlined"
                  fullWidth
                  size="small"
                  value={userData?.gender}
                  onChange={(e) =>
                    setUserData({ ...userData, gender: e.target.value })
                  }
                  sx={{ mb: 2 }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="body1">Date Of Birth</Typography>
                <TextField
                  variant="outlined"
                  fullWidth
                  size="small"
                  value={userData?.date_of_birth}
                  onChange={(e) =>
                    setUserData({ ...userData, date_of_birth: e.target.value })
                  }
                  sx={{ mb: 2 }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="body1">Age</Typography>
                <TextField
                  variant="outlined"
                  fullWidth
                  size="small"
                  value={userData?.age}
                  onChange={(e) =>
                    setUserData({ ...userData, age: e.target.value })
                  }
                  sx={{ mb: 2 }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="body1">Phone Number</Typography>
                <TextField
                  variant="outlined"
                  fullWidth
                  size="small"
                  value={userData?.phone_number}
                  onChange={(e) =>
                    setUserData({ ...userData, phone_number: e.target.value })
                  }
                  sx={{ mb: 2 }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="body1">Country</Typography>
                <TextField
                  variant="outlined"
                  fullWidth
                  size="small"
                  value={userData?.country}
                  onChange={(e) =>
                    setUserData({ ...userData, country: e.target.value })
                  }
                  sx={{ mb: 2 }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="body1">City</Typography>
                <TextField
                  variant="outlined"
                  fullWidth
                  size="small"
                  value={userData?.city}
                  onChange={(e) =>
                    setUserData({ ...userData, city: e.target.value })
                  }
                  sx={{ mb: 2 }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="body1">Address</Typography>
                <TextField
                  variant="outlined"
                  fullWidth
                  size="small"
                  value={userData?.address}
                  onChange={(e) =>
                    setUserData({ ...userData, address: e.target.value })
                  }
                  sx={{ mb: 2 }}
                />
              </Grid>
            </Grid>
          ) : (
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Typography variant="body1" fontWeight={"bold"}>
                  First Name
                </Typography>
                <Typography variant="body1" sx={{ mt: 1 }}>
                  {user?.user?.first_name}
                </Typography>
                <Divider sx={{ mt: 1 }} />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="body1" fontWeight={"bold"}>
                  Last Name
                </Typography>
                <Typography variant="body1" sx={{ mt: 1 }}>
                  {user?.user?.last_name}
                </Typography>
                <Divider sx={{ mt: 1 }} />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="body1" fontWeight={"bold"}>
                  Gender
                </Typography>
                <Typography variant="body1" sx={{ mt: 1 }}>
                  {user?.user?.gender}
                </Typography>
                <Divider sx={{ mt: 1 }} />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="body1" fontWeight={"bold"}>
                  Date Of Birth
                </Typography>
                <Typography variant="body1" sx={{ mt: 1 }}>
                  {user?.user?.date_of_birth}
                </Typography>
                <Divider sx={{ mt: 1 }} />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="body1" fontWeight={"bold"}>
                  Age
                </Typography>
                <Typography variant="body1" sx={{ mt: 1 }}>
                  {user?.user?.age}
                </Typography>
                <Divider sx={{ mt: 1 }} />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="body1" fontWeight={"bold"}>
                  Phone Number
                </Typography>
                <Typography variant="body1" sx={{ mt: 1 }}>
                  {user?.user?.phone_number}
                </Typography>
                <Divider sx={{ mt: 1 }} />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="body1" fontWeight={"bold"}>
                  Country
                </Typography>
                <Typography variant="body1" sx={{ mt: 1 }}>
                  {user?.user?.country}
                </Typography>
                <Divider sx={{ mt: 1 }} />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="body1" fontWeight={"bold"}>
                  City
                </Typography>
                <Typography variant="body1" sx={{ mt: 1 }}>
                  {user?.user?.city}
                </Typography>
                <Divider sx={{ mt: 1 }} />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="body1" fontWeight={"bold"}>
                  Address
                </Typography>
                <Typography variant="body1" sx={{ mt: 1 }}>
                  {user?.user?.address}
                </Typography>
                <Divider sx={{ mt: 1 }} />
              </Grid>
            </Grid>
          )}
        </Paper>
      </Stack>
    </Stack>
  );
};

export default Setting;
