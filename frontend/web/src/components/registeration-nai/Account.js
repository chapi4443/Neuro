import * as React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

export default function Account({ onDataChange }) {
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);

  const handleDataChange = (id, value) => {
    onDataChange({ id, value });
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleClickShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Account Information
      </Typography>
      <Grid container spacing={3} alignItems="center">
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="password"
            label="Password"
            fullWidth
            type={showPassword ? 'text' : 'password'}
            autoComplete="new-password"
            variant="standard"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleClickShowPassword} edge="end">
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            onChange={(e) => handleDataChange(e.target.id, e.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="confirmPassword"
            label="Confirm Password"
            fullWidth
            type={showConfirmPassword ? 'text' : 'password'}
            autoComplete="new-password"
            variant="standard"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleClickShowConfirmPassword} edge="end">
                    {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            onChange={(e) => handleDataChange(e.target.id, e.target.value)}
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
