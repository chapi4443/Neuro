import React, { useState } from 'react';
import { Stepper, Step, StepLabel, StepContent, TextField, Button, Typography, Box, Grid } from '@mui/material';
// import axios from 'axios';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchRisk } from "../../features/riskSlice";
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
  { label: 'Health Metrics', fields: ['systolicBloodPressure', 'diastolicBloodPressure', 'avgGlucoseLevel', 'bm1'] },
];

const initialData = {
  age: 99,
  gender: 'Male',
  everMarried: 'Yes',
  height: 1.70,
  weight: 158,
  exposurePercent: 48,
  historyOfStroke: 'Yes',
  familyHistoryOfStroke: 'Yes',
  hypertension: 1,
  heartDisease: 1,
  physicalActivityLevel: 'Sedentary',
  diet: 'Balanced',
  smokingStatus: 'Smoked',
  workType: 'Private',
  residenceType: 'Urban',
  systolicBloodPressure: -60,
  diastolicBloodPressure: 60,
  avgGlucoseLevel: -28,
  bm1: 25,
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
                      <TextField
                        key={field}
                        label={field}
                        value={data[field]}
                        onChange={(e) => handleInputChange(field, e.target.value)}
                        fullWidth
                        sx={{ marginBottom: 2 }}
                      />
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
                {data}
              </Typography>
            )}
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default InputForm;
