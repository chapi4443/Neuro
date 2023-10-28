import * as React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import FormControlLabel from "@mui/material/FormControlLabel";
import RadioGroup from "@mui/material/RadioGroup";
import Radio from "@mui/material/Radio";

export default function Personal({ onDataChange }) {
  const handleDataChange = (id, value) => {
    onDataChange({ id, value });
  };

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Personal Information
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Box>
            <Typography variant="subtitle2" gutterBottom>
              First Name
            </Typography>
            <TextField
              required
              id="first_name"
              name="firstName"
              fullWidth
              autoComplete="given-name"
              variant="standard"
              onChange={(e) => handleDataChange(e.target.id, e.target.value)}
            />
          </Box>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Box>
            <Typography variant="subtitle2" gutterBottom>
              Last Name
            </Typography>
            <TextField
              required
              id="last_name"
              name="lastName"
              fullWidth
              autoComplete="family-name"
              variant="standard"
              onChange={(e) => handleDataChange(e.target.id, e.target.value)}
            />
          </Box>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Box>
            <Typography variant="subtitle2" gutterBottom>
              Date of Birth
            </Typography>
            <TextField
              required
              id="date_of_birth"
              name="dateOfBirth"
              fullWidth
              type="date"
              variant="standard"
              InputLabelProps={{
                shrink: true,
              }}
              onChange={(e) => handleDataChange(e.target.id, e.target.value)}
            />
          </Box>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Box>
            <Typography variant="subtitle2">Gender</Typography>
            <RadioGroup
              row
              aria-label="gender"
              name="gender"
              onChange={(e) => handleDataChange("gender", e.target.value)}
            >
              <FormControlLabel
                value="female"
                control={<Radio />}
                label="Female"
              />
              <FormControlLabel value="male" control={<Radio />} label="Male" />
            </RadioGroup>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Box>
            <Typography variant="subtitle2" gutterBottom>
              Age
            </Typography>
            <TextField
              required
              id="age"
              name="age"
              fullWidth
              type="number"
              variant="standard"
              onChange={(e) => handleDataChange(e.target.id, e.target.value)}
            />
          </Box>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
