import * as React from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

export default function Account({ onDataChange }) {
  const [showPassword, setShowPassword] = React.useState(false);
  const [password, setpassword] = React.useState(false);

  const handleDataChange = (id, value) => {
    onDataChange({ id, value });
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleClickpassword = () => {
    setpassword(!password);
  };

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Account Information
      </Typography>
      <Grid container spacing={3} alignItems="center">
        <Grid item xs={12} md={6}>
          <Box>
            <Typography variant="subtitle2" gutterBottom>
              Password
            </Typography>
            <TextField
              required
              id="password"
              fullWidth
              type={showPassword ? "text" : "password"}
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
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <Box>
            <Typography variant="subtitle2" gutterBottom>
              Confirm Password
            </Typography>
            <TextField
              required
              id="confirmPassword"
              fullWidth
              type={password ? "text" : "password"}
              autoComplete="new-password"
              variant="standard"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handleClickpassword} edge="end">
                      {password ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              onChange={(e) => handleDataChange(e.target.id, e.target.value)}
            />
          </Box>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
