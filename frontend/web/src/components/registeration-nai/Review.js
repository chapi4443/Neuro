import * as React from 'react';
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

const Review = ({ personalData, contactData, accountData }) => {
  const { firstName, lastName, dateOfBirth, gender, age } = personalData;
  const { email, phoneNumber, address, city, country } = contactData;
  const { password } = accountData;

  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Review
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <List>
            <ListItem>
              <ListItemText primary="First Name" secondary={firstName} />
            </ListItem>
            <ListItem>
              <ListItemText primary="Last Name" secondary={lastName} />
            </ListItem>
            <ListItem>
              <ListItemText primary="Date of Birth" secondary={dateOfBirth} />
            </ListItem>
            <ListItem>
              <ListItemText primary="Gender" secondary={gender} />
            </ListItem>
            <ListItem>
              <ListItemText primary="Age" secondary={age} />
            </ListItem>
          </List>
        </Grid>
        <Grid item xs={6}>
          <List>
            <ListItem>
              <ListItemText primary="Email" secondary={email} />
            </ListItem>
            <ListItem>
              <ListItemText primary="Phone Number" secondary={phoneNumber} />
            </ListItem>
            <ListItem>
              <ListItemText primary="Address" secondary={address} />
            </ListItem>
            <ListItem>
              <ListItemText primary="City" secondary={city} />
            </ListItem>
            <ListItem>
              <ListItemText primary="Country" secondary={country} />
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
                value={password}
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
