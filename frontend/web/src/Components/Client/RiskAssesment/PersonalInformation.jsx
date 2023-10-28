import React, { useState } from "react";
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Radio,
  RadioGroup,
  Select,
  TextField,
  Typography,
} from "@mui/material";

const PersonalInformation = ({ onDataUpdate }) => {
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [ever_married, setever_married] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");

  const [ageError, setAgeError] = useState("");
  const [weightError, setWeightError] = useState("");
  const [heightError, setHeightError] = useState("");

  const handleAgeChange = (e) => {
    const newAge = e.target.value;
    setAge(newAge);
    setAgeError(""); // Reset age error
    onDataUpdate({ age: newAge, gender, ever_married, height, weight });
  };

  const handleGenderChange = (e) => {
    const newGender = e.target.value;
    setGender(newGender);
    onDataUpdate({ age, gender: newGender, ever_married, height, weight });
  };

  const handleever_marriedChange = (e) => {
    const newever_married = e.target.value;
    setever_married(newever_married);
    onDataUpdate({ age, gender, ever_married: newever_married, height, weight });
  };

  const handleWeightChange = (e) => {
    const newWeight = e.target.value;
    setWeight(newWeight);
    setWeightError(""); // Reset weight error
    onDataUpdate({ age, gender, ever_married, height, weight: newWeight });
  };

  const handleHeightChange = (e) => {
    const newHeight = e.target.value;
    setHeight(newHeight);
    setHeightError(""); // Reset height error
    onDataUpdate({ age, gender, ever_married, height: newHeight, weight });
  };

  return (
    <Paper
      component="form"
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        p: 2,
      }}
    >
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth required size="small">
            <TextField
              label={"Age"}
              value={age}
              onChange={handleAgeChange}
              type="number"
              variant="outlined"
              size="small"
            />
            <Typography variant="caption" color="error">
              {ageError}
            </Typography>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth required size="small">
            <InputLabel id="gender-label">Gender</InputLabel>
            <Select
              labelId="gender-label"
              label="Gender"
              value={gender}
              onChange={handleGenderChange}
            >
              <MenuItem value="Male">Male</MenuItem>
              <MenuItem value="Female">Female</MenuItem>
              <MenuItem value="Other">Other</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth required size="small">
            <TextField
              label={"Weight"}
              value={weight}
              onChange={handleWeightChange}
              type="number"
              variant="outlined"
              size="small"
            />
            <Typography variant="caption" color="error">
              {weightError}
            </Typography>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth required size="small">
            <TextField
              label={"Height"}
              value={height}
              onChange={handleHeightChange}
              type="number"
              variant="outlined"
              size="small"
            />
            <Typography variant="caption" color="error">
              {heightError}
            </Typography>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <FormControl fullWidth required>
            <FormLabel>Ever ever_married</FormLabel>
            <RadioGroup
              name="controlled-radio-buttons-group"
              value={ever_married}
              onChange={handleever_marriedChange}
            >
              <FormControlLabel value="1" control={<Radio />} label="Yes" />
              <FormControlLabel value="0" control={<Radio />} label="No" />
            </RadioGroup>
          </FormControl>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default PersonalInformation;
