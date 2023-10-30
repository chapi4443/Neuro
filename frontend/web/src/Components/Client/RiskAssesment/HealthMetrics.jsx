import React, { useState } from "react";
import {
  FormControl,
  FormLabel,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

const HealthMetrics = ({ onDataUpdate }) => {
  const [systolic_blood_pressure, setsystolic_blood_pressure] = useState("");
  const [diastolic_blood_pressure, setdiastolic_blood_pressure] = useState("");
  const [avg_glucose_level, setavg_glucose_level] = useState("");
  const [stressLevel, setStressLevel] = useState("");

  const [hypertension, setHypertension] = useState("");
  const [heart_disease, setheart_disease] = useState("");

  const [systolic_blood_pressureError, setsystolic_blood_pressureError] =
    useState("");
  const [diastolic_blood_pressureError, setdiastolic_blood_pressureError] =
    useState("");
  const [avg_glucose_levelError, setavg_glucose_levelError] = useState("");

  const handlesystolic_blood_pressureChange = (e) => {
    const newsystolic_blood_pressure = e.target.value;
    setsystolic_blood_pressure(newsystolic_blood_pressure);
    setsystolic_blood_pressureError(""); // Reset error
    onDataUpdate({
      systolic_blood_pressure: newsystolic_blood_pressure,
      diastolic_blood_pressure,
      avg_glucose_level,
      stressLevel,
      hypertension,
      heart_disease,
    });
  };

  const handlediastolic_blood_pressureChange = (e) => {
    const newdiastolic_blood_pressure = e.target.value;
    setdiastolic_blood_pressure(newdiastolic_blood_pressure);
    setdiastolic_blood_pressureError(""); // Reset error
    onDataUpdate({
      systolic_blood_pressure,
      diastolic_blood_pressure: newdiastolic_blood_pressure,
      avg_glucose_level,
      stressLevel,
      hypertension,
      heart_disease,
    });
  };

  const handleavg_glucose_levelChange = (e) => {
    const newavg_glucose_level = e.target.value;
    setavg_glucose_level(newavg_glucose_level);
    setavg_glucose_levelError(""); // Reset error
    onDataUpdate({
      systolic_blood_pressure,
      diastolic_blood_pressure,
      avg_glucose_level: newavg_glucose_level,
      stressLevel,
      hypertension,
      heart_disease,
    });
  };

  const handleStressLevelChange = (e) => {
    const newStressLevel = e.target.value;
    setStressLevel(newStressLevel);
    onDataUpdate({
      systolic_blood_pressure,
      diastolic_blood_pressure,
      avg_glucose_level,
      stressLevel: newStressLevel,
      hypertension,
      heart_disease,
    });
  };

  const handleHypertensionChange = (e) => {
    const newHypertension = e.target.value;
    setHypertension(newHypertension);
    onDataUpdate({
      systolic_blood_pressure,
      diastolic_blood_pressure,
      avg_glucose_level,
      stressLevel,
      hypertension: newHypertension,
      heart_disease,
    });
  };

  const handleheart_diseaseChange = (e) => {
    const newheart_disease = e.target.value;
    setheart_disease(newheart_disease);
    onDataUpdate({
      systolic_blood_pressure,
      diastolic_blood_pressure,
      avg_glucose_level,
      stressLevel,
      hypertension,
      heart_disease: newheart_disease,
    });
  };

  return (
    <Stack>
      <Typography variant="h5" fontWeight={"bold"} color={"#16C2D5"}>
        Health Metrics
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
            <FormLabel>Systolic Blood Pressure</FormLabel>
            <FormControl fullWidth required size="small">
              <TextField
                placeholder="60 - 140 mmHg"
                value={systolic_blood_pressure}
                onChange={handlesystolic_blood_pressureChange}
                type="number"
                variant="outlined"
                size="small"
              />
              <Typography variant="caption" color="error">
                {systolic_blood_pressureError}
              </Typography>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormLabel>Diastolic Blood Pressure</FormLabel>
            <FormControl fullWidth required size="small">
              <TextField
                placeholder="90 - 160 mmHg"
                value={diastolic_blood_pressure}
                onChange={handlediastolic_blood_pressureChange}
                type="number"
                variant="outlined"
                size="small"
              />
              <Typography variant="caption" color="error">
                {diastolic_blood_pressureError}
              </Typography>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <InputLabel id="Average-label">Average Glucose Level</InputLabel>
            <FormControl fullWidth required size="small">
              <TextField
                placeholder="50 - 160 mg/dl"
                // label="50 - 160 "
                value={avg_glucose_level}
                onChange={handleavg_glucose_levelChange}
                type="number"
                variant="outlined"
                size="small"
              />
              <Typography variant="caption" color="error">
                {avg_glucose_levelError}
              </Typography>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <InputLabel id="stress-level-label">Stress Level</InputLabel>
            <FormControl fullWidth required size="small">
              <Select
                labelId="stress-level-label"
                // label="Stress Level"
                value={stressLevel}
                onChange={handleStressLevelChange}
              >
                <MenuItem value="low">Low</MenuItem>
                <MenuItem value="moderate">Moderate</MenuItem>
                <MenuItem value="high">High</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <InputLabel id="Hypertension-label">Hypertension</InputLabel>
            <FormControl fullWidth required size="small">
              <Select
                labelId="Hypertension-label"
                // label="Hypertension"
                value={hypertension}
                onChange={handleHypertensionChange}
              >
                <MenuItem value="1">Yes</MenuItem>
                <MenuItem value="0">No</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <InputLabel id="Heart Disease-label">Heart Disease</InputLabel>
            <FormControl fullWidth required size="small">
              <Select
                labelId="Heart Disease-label"
                // label="Heart Disease"
                value={heart_disease}
                onChange={handleheart_diseaseChange}
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

export default HealthMetrics;
