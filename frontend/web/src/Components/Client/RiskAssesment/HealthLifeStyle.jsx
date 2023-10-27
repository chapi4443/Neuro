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

const HealthLifeStyle = ({ onDataUpdate }) => {
  const [physical_activity_level, setphysical_activity_level] = useState("");
  const [diet, setDiet] = useState("");
  const [smoking_status, setsmoking_status] = useState("");
  const [work_type, setwork_type] = useState("");
  const [Residence_type, setResidence_type] = useState("");

  const [physical_activity_levelError, setphysical_activity_levelError] = useState("");
  const [dietError, setDietError] = useState("");

  const handlephysical_activity_levelChange = (e) => {
    const newphysical_activity_level = e.target.value;
    setphysical_activity_level(newphysical_activity_level);
    setphysical_activity_levelError(""); // Reset error
    onDataUpdate({
      physical_activity_level: newphysical_activity_level,
      diet,
      smoking_status,
      work_type,
      Residence_type,
    });
  };

  const handleDietChange = (e) => {
    const newDiet = e.target.value;
    setDiet(newDiet);
    setDietError(""); // Reset error
    onDataUpdate({
      physical_activity_level,
      diet: newDiet,
      smoking_status,
      work_type,
      Residence_type,
    });
  };

  const handlesmoking_statusChange = (e) => {
    const newsmoking_status = e.target.value;
    setsmoking_status(newsmoking_status);
    onDataUpdate({
      physical_activity_level,
      diet,
      smoking_status: newsmoking_status,
      work_type,
      Residence_type,
    });
  };

  const handlework_typeChange = (e) => {
    const newwork_type = e.target.value;
    setwork_type(newwork_type);
    onDataUpdate({
      physical_activity_level,
      diet,
      smoking_status,
      work_type: newwork_type,
      Residence_type,
    });
  };

  const handleResidence_typeChange = (e) => {
    const newResidence_type = e.target.value;
    setResidence_type(newResidence_type);
    onDataUpdate({
      physical_activity_level,
      diet,
      smoking_status,
      work_type,
      Residence_type: newResidence_type,
    });
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
        <Grid item xs={6}>
          <FormControl fullWidth required size="small">
            <TextField
              label={"Physical Activity"}
              value={physical_activity_level}
              onChange={handlephysical_activity_levelChange}
              type="text"
              variant="outlined"
              size="small"
            />
            <Typography variant="caption" color="error">
              {physical_activity_levelError}
            </Typography>
          </FormControl>
        </Grid>
        <Grid item xs={6}>
          <FormControl fullWidth required size="small">
            <TextField
              label={"Diet"}
              value={diet}
              onChange={handleDietChange}
              type="text"
              variant="outlined"
              size="small"
            />
            <Typography variant="caption" color="error">
              {dietError}
            </Typography>
          </FormControl>
        </Grid>
        <Grid item xs={6}>
          <FormControl fullWidth required size="small">
            <InputLabel id="smoking-status-label">Smoking Status</InputLabel>
            <Select
              labelId="smoking-status-label"
              label="Smoking Status"
              value={smoking_status}
              onChange={handlesmoking_statusChange}
            >
              <MenuItem value="formerly smoked">Formerly Smoked</MenuItem>
              <MenuItem value="never smoked">Never Smoked</MenuItem>
              <MenuItem value="smokes">Smokes</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={6}>
          <FormControl fullWidth required size="small">
            <InputLabel id="work-type-label">Work Type</InputLabel>
            <Select
              labelId="work-type-label"
              label="Work Type"
              value={work_type}
              onChange={handlework_typeChange}
            >
              <MenuItem value="private">Private</MenuItem>
              <MenuItem value="self-employed">Self Employed</MenuItem>
              <MenuItem value="govt-job">Gov't Job</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <FormControl fullWidth required>
            <FormLabel>Residence Type</FormLabel>
            <RadioGroup
              name="residence-type-radio-buttons-group"
              value={Residence_type}
              onChange={handleResidence_typeChange}
            >
              <FormControlLabel
                value="urban"
                control={<Radio />}
                label="Urban"
              />
              <FormControlLabel
                value="rural"
                control={<Radio />}
                label="Rural"
              />
            </RadioGroup>
          </FormControl>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default HealthLifeStyle;
