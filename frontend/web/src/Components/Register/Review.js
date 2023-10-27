// Review component
import React, { useState } from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
// import TextField from "@mui/material/TextField";
// import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

export default function Review({ formData }) {
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  if (!formData) {
    return <div>Loading...</div>;
  }

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Review
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <List>
            <ListItem>
              <ListItemText
                primary="First Name"
                secondary={formData.first_name}
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="Last Name"
                secondary={formData.last_name}
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="Date of Birth"
                secondary={formData.date_of_birth}
              />
            </ListItem>
            <ListItem>
              <ListItemText primary="Gender" secondary={formData.gender} />
            </ListItem>
            <ListItem>
              <ListItemText primary="Age" secondary={formData.age} />
            </ListItem>
          </List>
        </Grid>
        <Grid item xs={6}>
          <List>
            <ListItem>
              <ListItemText primary="Email" secondary={formData.email} />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="Phone Number"
                secondary={formData.phone_number}
              />
            </ListItem>
            <ListItem>
              <ListItemText primary="Address" secondary={formData.address} />
            </ListItem>
            <ListItem>
              <ListItemText primary="City" secondary={formData.city} />
            </ListItem>
            <ListItem>
              <ListItemText primary="Country" secondary={formData.country} />
            </ListItem>
            <ListItem>
      <ListItemText
        primary="Password"
        secondary={
          <React.Fragment>
            {formData.password}
            <IconButton onClick={handleClickShowPassword} edge="end">
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </React.Fragment>
        }
      />
    </ListItem>
          </List>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
