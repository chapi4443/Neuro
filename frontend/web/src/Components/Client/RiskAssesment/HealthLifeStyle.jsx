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
} from "@mui/material";

const HealthLifeStyle = ({ onDataUpdate }) => {
  const [family_history_of_stroke, setfamily_history_of_stroke] = useState("");
  const [smoking_status, setsmoking_status] = useState("");
  const [work_type, setwork_type] = useState("");
  const [Residence_type, setResidence_type] = useState("");

  const handlesmoking_statusChange = (e) => {
    const newsmoking_status = e.target.value;
    setsmoking_status(newsmoking_status);
    onDataUpdate({
      smoking_status: newsmoking_status,
      work_type,
      Residence_type,
      family_history_of_stroke,
    });
  };

  const handlework_typeChange = (e) => {
    const newwork_type = e.target.value;
    setwork_type(newwork_type);
    onDataUpdate({
      smoking_status,
      work_type: newwork_type,
      Residence_type,
      family_history_of_stroke,
    });
  };

  const handleResidence_typeChange = (e) => {
    const newResidence_type = e.target.value;
    setResidence_type(newResidence_type);
    onDataUpdate({
      smoking_status,
      work_type,
      Residence_type: newResidence_type,
      family_history_of_stroke,
    });
  };
  const handlefamily_history_of_strokeChange = (e) => {
    const newfamily_history_of_stroke = e.target.value;
    setfamily_history_of_stroke(newfamily_history_of_stroke);
    onDataUpdate({
      smoking_status,
      work_type,
      Residence_type,
      family_history_of_stroke: newfamily_history_of_stroke,
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
        <Grid item xs={12} sm={6}>
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
        <Grid item xs={12} sm={6}>
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
        <Grid item xs={12} sm={6}>
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
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth required>
            <FormLabel>Family History of Stroke</FormLabel>
            <RadioGroup
              name="family-history-group"
              value={family_history_of_stroke}
              onChange={handlefamily_history_of_strokeChange}
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

export default HealthLifeStyle;
