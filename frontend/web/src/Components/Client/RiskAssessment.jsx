import React , {useState} from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import PersonalInformation from "./RiskAssesment/PersonalInformation";
import HealthLifeStyle from "./RiskAssesment/HealthLifeStyle";
import HealthMetrics from "./RiskAssesment/HealthMetrics";
import Result from "./RiskAssesment/Result";
import SecondResult from "./RiskAssesment/SecondResult";
import { Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import jwt_decode from "jwt-decode";
import Cookies from "js-cookie";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import {
  setStrokeRecommendations,
  setStrokepredictor,
} from "../../Utils/Store/PredictionStore";
const steps = [
  "Personal Information",
  "Health Life Style",
  "Health metrics",
  "result",
];

function RiskAssessment() {
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());
  const [collectedData, setCollectedData] = useState({});

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };
  const handlePersonalInformation = (data) => {
    if (data.height !== null && data.weight !== null) {
      const heightInMeters = data.height / 100;
      const bmiValue = data.weight / (heightInMeters * heightInMeters);
      data.bmi = parseFloat(bmiValue.toFixed(2));
    } else {
      data.bmi = null;
    }
    setCollectedData((prevData) => ({ ...prevData, ...data }));
  };
  const handleHealthLifeStyle = (data) => {
    setCollectedData((prevData) => ({ ...prevData, ...data }));
  };
  const handleHealthMetrics = (data) => {
    setCollectedData((prevData) => ({ ...prevData, ...data }));
  };


  const dispatch = useDispatch();
  const token = Cookies.get("token");
  const decodedToken = jwt_decode(token);
  const userId = decodedToken.userId;
  const SubmitHandler = (e) => {
    dispatch(
      setStrokeRecommendations({
        weight: collectedData.weight,
        height: collectedData.height,
        history_of_stroke: collectedData.history_of_stroke,
        family_history_of_stroke: collectedData.family_history_of_stroke,
        physical_activity_level: collectedData.physical_activity_level,
        diet: collectedData.diet,
        systolic_blood_pressure: collectedData.systolic_blood_pressure,
        diastolic_blood_pressure: collectedData.diastolic_blood_pressure,
        data: [
          {
            age: collectedData.age,
            hypertension: collectedData.hypertension,
            heart_disease: collectedData.heart_disease,
            ever_married: collectedData.ever_married,
            work_type: collectedData.work_type,
            Residence_type: collectedData.Residence_type,
            avg_glucose_level: collectedData.avg_glucose_level,
            bmi: collectedData.bmi,
            smoking_status: collectedData.smoking_status,
            gender: collectedData.gender,
          },
        ],
        alcohol_consumption: collectedData.alcoholConcession,
        stress_levels: collectedData.stressLevel,
        sleep_patterns: collectedData.sleepPattern,
      })
    );
    dispatch(
      setStrokepredictor({
        userId,
        data: [
          {
            age: collectedData.age,
            hypertension: collectedData.hypertension,
            heart_disease: collectedData.heart_disease,
            ever_married: collectedData.ever_married,
            work_type: collectedData.work_type,
            Residence_type: collectedData.Residence_type,
            avg_glucose_level: collectedData.avg_glucose_level,
            bmi: collectedData.bmi,
            smoking_status: collectedData.smoking_status,
            gender: collectedData.gender,
          },
        ],
      })
    );
  };

  return (
    <Stack
      sx={{
        width: "84%",
      }}
    >
       <ToastContainer />
      <Stack
        sx={{ background: "#192655", height: "10dvh" }}
        alignItems={"center"}
        justifyContent={"center"}
      >
        <Typography color={"#FFFFFF"} fontSize={"24px"} fontWeight={"bold"}>
          Risk Assessment
        </Typography>
      </Stack>
      <Box
        sx={{
          flexGrow: 1,
        p:2,
          width: "100%",
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          justifyContent: "center",
          
        }}
      >
        <Box
          sx={{
            width: "60%",
            display: "flex",
            flexDirection: "column",
            gap: 4,
          }}
        >
          <Stepper activeStep={activeStep}>
            {steps.map((label, index) => {
              const stepProps = {};
              const labelProps = {};
              if (isStepSkipped(index)) {
                stepProps.completed = false;
              }
              return (
                <Step key={label} {...stepProps}>
                  <StepLabel {...labelProps}></StepLabel>
                </Step>
              );
            })}
          </Stepper>
          {activeStep === steps.length ? (
            <React.Fragment>
              <SecondResult />
              <Box sx={{ display: "flex", flexDirection: "column", pt: 2 }}>
                <Button
                  onClick={() => navigate("/dashboard")}
                  sx={{
                    background: "#16C2D5",
                    color: "#FFFFFF",
                    "&:hover": { background: "#16C2D5b0" },
                  }}
                >
                  Go to Dashboard
                </Button>
                <Button onClick={handleReset} color="inherit">
                  Retake
                </Button>
              </Box>
            </React.Fragment>
          ) : (
            <React.Fragment>
              {activeStep === steps.length - 4 ? (
                <PersonalInformation onDataUpdate={handlePersonalInformation}/>
              ) : activeStep === steps.length - 3 ? (
                <HealthLifeStyle onDataUpdate={handleHealthLifeStyle}/>
              ) : activeStep === steps.length - 2 ? (
                <HealthMetrics onDataUpdate={handleHealthMetrics}/>
              ) : (
                activeStep === steps.length - 1 && <Result />
              )}
              <Box sx={{ display: "flex", flexDirection: "column", pt: 2 }}>
              <Button
  onClick={() => {
    handleNext();
    if (activeStep === steps.length - 2) {
      SubmitHandler();
    }
  }}
  sx={{
    background: "#16C2D5",
    color: "#FFFFFF",
    "&:hover": { background: "#16C2D5b0" },
  }}
>
  {activeStep === steps.length - 1
    ? "Get more recommendations"
    : activeStep === steps.length - 2
    ? "Submit"
    : `Continue${String.fromCharCode(8594)}`}
</Button>
                {activeStep !== steps.length - 1 && (
                  <Button
                    color="inherit"
                    disabled={activeStep === 0}
                    onClick={handleBack}
                    sx={{ mr: 1 }}
                  >
                    {String.fromCharCode(8592)}
                    Back
                  </Button>
                )}
              </Box>
            </React.Fragment>
          )}
        </Box>
      </Box>
    </Stack>
  );
}

export default RiskAssessment;
