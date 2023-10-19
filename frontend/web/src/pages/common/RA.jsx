import React, { useState } from 'react';
// import { Stepper, Step, StepLabel, StepContent, TextField, Button, Typography, Box, Grid } from '@mui/material';
// import axios from 'axios';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchRisk } from "../../features/riskSlice";
import { Stepper, Step, StepLabel, StepContent, TextField, Button, Typography, Box, Grid, Radio, FormControlLabel } from '@mui/material';
import axios from 'axios';

const steps = [
  { label: 'Personal Information', fields: ['age', 'gender', 'everMarried', 'height', 'weight'] },
  {
    label: 'Medical History',
    fields: ['exposurePercent', 'historyOfStroke', 'familyHistoryOfStroke', 'hypertension', 'heartDisease'],
  },
  {
    label: 'Health and Lifestyle',
    fields: ['physicalActivityLevel', 'diet', 'smokingStatus', 'workType', 'residenceType'],
  },
  { label: 'Health Metrics', fields: ['systolicBloodPressure', 'diastolicBloodPressure', 'avgGlucoseLevel', 'bmi'] },
];

const initialData = {
  // your initial data here...
};

const options = {
  gender: ['Male', 'Female'],
  hypertension: ['0', '1'],
  heartDisease: ['0', '1'],
  everMarried: ['Yes', 'No'],
  familyHistoryOfStroke: ['Yes', 'No'],
  historyOfStroke: ['Yes', 'No'],
  physicalActivityLevel: ['sedentary'],
  workType: ['Private', 'Self-employed', 'Govt_job'],
  residenceType: ['Urban', 'Rural'],
  smokingStatus: ['formerly smoked', 'never smoked', 'smokes', 'Unknown'],
};

const InputForm = () => {
   const dispatch = useDispatch();
   const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);
  const [data, setData] = useState(initialData);

  const handleInputChange = (field, value) => {
    setData({ ...data, [field]: value });
  };

  const handleNext = () => {
    console.log(data); // Add this line
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  // const handleSubmit = async () => {
  //   try {
  //     const response = await axios.post('http://localhost:4000/get_stroke_recommendations', data);
  //     console.log(data); // Handle the response data as required
  //   } catch (error) {
  //     console.error('Error submitting data:', error);
  //   }
  // };

    const handleSubmit = (e) => {
      e.preventDefault();
      dispatch(fetchRisk(data));
      navigate("/login");
    };

  const renderRadioButtons = (field, options) => {
    return (
      <Box sx={{ display: 'flex' }}>
        {options.map((option) => (
          <FormControlLabel
            key={option}
            value={option}
            control={<Radio />}
            label={option}
            checked={data[field] === option}
            onChange={(e) => handleInputChange(field, e.target.value)}
          />
        ))}
      </Box>
    );
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" height="100vh" width="100%">
      <Box width="100%" maxWidth="1000px">
        <Grid container justifyContent="center" my={4}>
          <Grid item xs={12} md={8} lg={6}>
            <Stepper activeStep={activeStep} orientation="vertical">
              {steps.map(({ label, fields }, index) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                  <StepContent>
                    {fields.map((field) => (
                      <Box key={field} sx={{ mt: 2, mb: 2 }}>
                        <Typography variant="subtitle2" gutterBottom color="primary">
                          {field}
                        </Typography>
                        {field in options ? (
                          renderRadioButtons(field, options[field])
                        ) : (
                          <TextField
                            required
                            id={field}
                            name={field}
                            fullWidth
                            variant="standard"
                            onChange={(e) => handleInputChange(e.target.id, e.target.value)}
                          />
                        )}
                      </Box>
                    ))}
                    <Box sx={{ marginTop: 2 }}>
                      <Button disabled={activeStep === 0} onClick={handleBack}>
                        Back
                      </Button>
                      <Button variant="contained" onClick={activeStep === steps.length - 1 ? handleSubmit : handleNext} sx={{ marginLeft: 2 }}>
                        {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                      </Button>
                    </Box>
                  </StepContent>
                </Step>
              ))}
            </Stepper>
            {activeStep === steps.length && (
              <Typography sx={{ marginTop: 2 }} align="center">
                {JSON.stringify(data)}
              </Typography>
            )}
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default InputForm;
