// Review component
import React, { useState } from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

const Review = ({ formData }) => {
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  if (!formData) {
    return <div>Loading...</div>;
  }
console.log(formData);


  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Review
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <List>
            <ListItem>
              <ListItemText primary="First Name" secondary={formData.firstName} />
            </ListItem>
            <ListItem>
              <ListItemText primary="Last Name" secondary={formData.lastName} />
            </ListItem>
            <ListItem>
              <ListItemText primary="Date of Birth" secondary={formData.dateOfBirth} />
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
              <ListItemText primary="Phone Number" secondary={formData.phoneNumber} />
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
              <TextField
                required
                id="password"
                label="Password"
                fullWidth
                type={showPassword ? 'text' : 'password'}
                autoComplete="new-password"
                variant="standard"
                value={formData.password}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={handleClickShowPassword} edge="end">
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </ListItem>
          </List>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default Review;
