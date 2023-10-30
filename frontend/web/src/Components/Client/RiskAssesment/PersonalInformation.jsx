import React, { useState } from "react";
import {
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Stack,
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
    onDataUpdate({
      age,
      gender,
      ever_married: newever_married,
      height,
      weight,
    });
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
    <Stack>
      <Typography variant="h5" fontWeight={"bold"} color={"#16C2D5"}>
        Personal information
      </Typography>
      <Paper
        component="form"
        elevation={0}
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          p: 2,
        }}
      >
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <InputLabel id="gender-label">Gender</InputLabel>
            <FormControl fullWidth required size="small">
              <Select
                // labelId="gender-label"
                // label="Gender"
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
            <InputLabel id="Age-label">Age</InputLabel>
            <FormControl fullWidth required size="small">
              <TextField
                // label={"Age"}
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
            <InputLabel id="Height-label">Height</InputLabel>

            <FormControl fullWidth required size="small">
              <TextField
                // label={"Height"}
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
          <Grid item xs={12} sm={6}>
            <InputLabel id="Weight-label">Weight</InputLabel>

            <FormControl fullWidth required size="small">
              <TextField
                // label={"Weight"}
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
            <InputLabel id="married-label">Ever Married</InputLabel>
            <FormControl fullWidth required size="small">
              <Select
                labelId="married-label"
                // label="married"
                value={ever_married}
                onChange={handleever_marriedChange}
              >
                <MenuItem value="1">Yes</MenuItem>
                <MenuItem value="0">No</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Paper>
    </Stack>
  );
};

export default PersonalInformation;
