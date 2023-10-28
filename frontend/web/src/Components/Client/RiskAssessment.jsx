import {
  Box,
  Button,
  MobileStepper,
  Paper,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";
import React, { useState } from "react";
import { useTheme } from "@mui/material/styles";
import { KeyboardArrowLeft, KeyboardArrowRight } from "@mui/icons-material";
import PersonalInformation from "./RiskAssesment/PersonalInformation";
import HealthLifeStyle from "./RiskAssesment/HealthLifeStyle";
import HealthMetrics from "./RiskAssesment/HealthMetrics";
import { useDispatch } from "react-redux";
import {
  setStrokeRecommendations,
  setStrokepredictor,
} from "../../Utils/Store/PredictionStore";
import jwt_decode from "jwt-decode";
import Cookies from "js-cookie";
import Result from "./RiskAssesment/Result";
import SecondResult from "./RiskAssesment/SecondResult";
import { useNavigate } from "react-router-dom";
const RiskAssessment = () => {
  const theme = useTheme();
  const [activeStep, setActiveStep] = useState(0);
  const [collectedData, setCollectedData] = useState({});
  const navigate = useNavigate();
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

  const steps = [
    {
      label: "Personal information",
      description: (
        <PersonalInformation onDataUpdate={handlePersonalInformation} />
      ),
    },
    {
      label: "Health and Life Style",
      description: <HealthLifeStyle onDataUpdate={handleHealthLifeStyle} />,
    },
    {
      label: "Health Metrics",
      description: <HealthMetrics onDataUpdate={handleHealthMetrics} />,
    },
    {
      label: "Result",
      description: <Result />,
    },
    {
      label: "Result",
      description: <SecondResult />,
    },
  ];

  const maxSteps = steps.length;
  const handleNext = () => {
    if (activeStep < steps.length - 1) {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  };
  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
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
  const isSmallScreen = useMediaQuery("(max-width:770px)");
  const isMoreSmallScreen = useMediaQuery("(max-width:430px)");
  return (
    <Stack
      sx={{
        width: isMoreSmallScreen ? "100%" : isSmallScreen ? "100%" : "84%",
      }}
    >
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
          width: "100%",
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          justifyContent: "center",
          // height: isMoreSmallScreen ? "100dvh" : isSmallScreen && "100dvh",
        }}
      >
        <Box
          sx={{
            width: isMoreSmallScreen ? "100%" : isSmallScreen ? "70%" : "50%",
          }}
        >
          <Paper
            square
            elevation={0}
            sx={{
              display: "flex",
              alignItems: "center",
              height: 50,
              pl: 2,
              bgcolor: "background.default",
            }}
          >
            <Typography variant="h5" color={"#16C2D5"} fontWeight={"bold"}>
              {steps[activeStep].label}
            </Typography>
          </Paper>
          <Box sx={{ width: "100%", p: 2 }}>
            {steps[activeStep].description}
          </Box>
          <MobileStepper
            variant="text"
            steps={maxSteps}
            position="static"
            activeStep={activeStep}
            nextButton={
              activeStep !== maxSteps - 3 && activeStep !== maxSteps - 1 ? (
                <Button
                  size="small"
                  onClick={handleNext}
                  disabled={activeStep === maxSteps - 1}
                >
                  Next
                  {theme.direction === "rtl" ? (
                    <KeyboardArrowLeft />
                  ) : (
                    <KeyboardArrowRight />
                  )}
                </Button>
              ) : activeStep === maxSteps - 3 && activeStep !== maxSteps - 1 ? (
                <Button
                  size="small"
                  variant="outlined"
                  onClick={() => {
                    SubmitHandler();
                    handleNext();
                  }}
                >
                  Submit
                </Button>
              ) : (
                activeStep === maxSteps - 1 && (
                  <Button
                    size="small"
                    variant="outlined"
                    onClick={() => navigate("/dashboard")}
                  >
                    Dashboard
                  </Button>
                )
              )
            }
            backButton={
              activeStep !== maxSteps - 2 && (
                <Button
                  size="small"
                  onClick={handleBack}
                  disabled={activeStep === 0}
                >
                  {theme.direction === "rtl" ? (
                    <KeyboardArrowRight />
                  ) : (
                    <KeyboardArrowLeft />
                  )}
                  Back
                </Button>
              )
            }
          />
        </Box>
      </Box>
    </Stack>
  );
};

export default RiskAssessment;
