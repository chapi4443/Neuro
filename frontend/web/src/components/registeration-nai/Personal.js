import * as React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import RadioGroup from '@mui/material/RadioGroup';
import Radio from '@mui/material/Radio';

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
          <TextField
            required
            id="firstName"
            name="firstName"
            label="First name"
            fullWidth
            autoComplete="given-name"
            variant="standard"
            onChange={(e) => handleDataChange(e.target.id, e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="lastName"
            name="lastName"
            label="Last name"
            fullWidth
            autoComplete="family-name"
            variant="standard"
            onChange={(e) => handleDataChange(e.target.id, e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="dateOfBirth"
            name="dateOfBirth"
            label="Date of Birth"
            fullWidth
            type="date" // to display a date picker
            variant="standard"
            InputLabelProps={{
              shrink: true,
            }}
            onChange={(e) => handleDataChange(e.target.id, e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl component="fieldset">
            <RadioGroup
              row
              aria-label="gender"
              name="gender"
              defaultValue="male"
              onChange={(e) => handleDataChange(e.target.name, e.target.value)}
            >
              <FormControlLabel value="female" control={<Radio />} label="Female" />
              <FormControlLabel value="male" control={<Radio />} label="Male" />
            </RadioGroup>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="age"
            name="age"
            label="Age"
            fullWidth
            type="number"
            variant="standard"
            onChange={(e) => handleDataChange(e.target.id, e.target.value)}
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
