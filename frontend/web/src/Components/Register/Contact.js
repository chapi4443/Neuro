import * as React from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";

export default function Contact({ onDataChange }) {
  const handleDataChange = (id, value) => {
    onDataChange({ id, value });
  };

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Contact Information
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Box>
            <Typography variant="subtitle2" gutterBottom>
              Email
            </Typography>
            <TextField
              required
              id="email"
              fullWidth
              autoComplete="email"
              variant="standard"
              onChange={(e) => handleDataChange(e.target.id, e.target.value)}
            />
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <Box>
            <Typography variant="subtitle2" gutterBottom>
              Phone Number
            </Typography>
            <TextField
              required
              id="phone_number"
              fullWidth
              autoComplete="tel"
              type="string"
              variant="standard"
              onChange={(e) => handleDataChange(e.target.id, e.target.value)}
            />
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Box>
            <Typography variant="subtitle2" gutterBottom>
              Address
            </Typography>
            <TextField
              required
              id="address"
              fullWidth
              autoComplete="shipping address-line1"
              variant="standard"
              onChange={(e) => handleDataChange(e.target.id, e.target.value)}
            />
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <Box>
            <Typography variant="subtitle2" gutterBottom>
              City
            </Typography>
            <TextField
              required
              id="city"
              fullWidth
              autoComplete="shipping address-level2"
              variant="standard"
              onChange={(e) => handleDataChange(e.target.id, e.target.value)}
            />
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <Box>
            <Typography variant="subtitle2" gutterBottom>
              Country
            </Typography>
            <TextField
              required
              id="country"
              fullWidth
              autoComplete="shipping country"
              variant="standard"
              onChange={(e) => handleDataChange(e.target.id, e.target.value)}
            />
          </Box>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
