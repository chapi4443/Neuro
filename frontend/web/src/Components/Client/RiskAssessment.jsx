import React, { useEffect, useState } from "react";
import {
  Typography,
  Stack,
  Button,
  Stepper,
  Step,
  StepLabel,
  Box,
  useMediaQuery,
  styled,
} from "@mui/material";
import MarkunreadIcon from "@mui/icons-material/Markunread";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import axios from "axios";
import UserImg from "../../Image/image 14.png";

import OutputCard from "./OutputCard";

const StyledButton = styled("button")(() => ({
  width: "300%",
  color: "#fff",
  fontSize: "14px",
  background: "blue",
}));
const StyledTypo = styled(Typography)(() => ({
  color: "#000",
  fontSize: "14px",
  fontWeight: "normal",
}));

const steps = ["Step 1", "Step 2", "Step 3", "Step 4", "Step 5"];
const RiskAssessment = () => {
  const [messages, setMessages] = useState([]);
  const [currentMessage, setCurrentMessage] = useState(0);

  const isNotMobile = useMediaQuery("(min-width: 900px)");
  const [age, setage] = useState(null);
  const [ever_married, setever_married] = useState("");
  const [height, setHeight] = useState(null);
  const [weight, setWeight] = useState(null);
  const [bmi, setBmi] = useState(null);
  const [physicalActivity, setPhysicalActivity] = useState("");
  // const [diet, setDiet] = useState("");
  const [smoking, setSmoking] = useState("");
  const [workType, setWorkType] = useState("");
  const [residence, setResidence] = useState("");
  const [systolicBp, setSystolicBp] = useState(null);
  const [diastolicBp, setDiastolicBp] = useState(null);
  const [glucose, setGlucose] = useState("");
  const [gender, setgender] = useState("");
  const [strokeHistory, setStrokeHistory] = useState("");
  const [familyStrokeHistory, setFamilyStrokeHistory] = useState("");
  const [Advice, setAdvice] = useState("");
  const [Prediction, setPrediction] = useState("");
  const [Interpretation, setInterpretation] = useState("");
  const [Diet, setDiet] = useState("");
  
  const [hypertension, sethypertension] = useState(null);
  const [heart_disease, setheart_disease] = useState(null);

  const [activeStep, setActiveStep] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");
  const [errorHeightMessage, setHeightErrorMessage] = useState("");
  const [errorWeightMessage, setWeightErrorMessage] = useState("");

  const handleNext = () => {
    setActiveStep((prevActiveStep) =>
      prevActiveStep === 4 ? 0 : prevActiveStep + 1
    );
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };
  useEffect(() => {
    if (height !== null && weight !== null) {
      // Convert height to meters
      const heightInMeters = height / 100;

      // Calculate BMI
      const bmiValue = weight / (heightInMeters * heightInMeters);

      setBmi(parseFloat(bmiValue.toFixed(2))); // Round to two decimal places and set the state
    } else {
      setBmi(""); // Reset BMI if either height or weight is null
    }
  }, [height, weight]);

//   const messageArray = `
// **Diet Plan**

//   Based on your risk factors, you should follow a diet that is low in saturated fat, cholesterol, and sodium. You should also limit your intake of sugary drinks and processed foods. Instead, focus on eating plenty of fruits, vegetables, and whole grains.

// **Exercise Plan**

//   Regular exercise is an important part of stroke prevention. You should aim for at least 30 minutes of moderate-intensity exercise most days of the week. Examples of moderate-intensity exercises include walking, running, swimming, and biking.

// **Other Recommendations**

//   Maintain a healthy weight.
//   If you smoke, quit.
//   Limit your alcohol intake.
//   Get regular checkups with your doctor.
// `;
  // useEffect(() => {
  //   // Define the interval time in milliseconds
  //   const interval = 10; // 1000ms = 1 second

  //   if (currentMessage < messageArray.length) {
  //     // Use setTimeout to add a new message to the list after the interval
  //     const timer = setTimeout(() => {
  //       setMessages((prevMessages) => [
  //         ...prevMessages,
  //         messageArray[currentMessage],
  //       ]);
  //       setCurrentMessage(currentMessage + 1);
  //     }, interval);

  //     // Clean up the timer when the component unmounts or when the message array is exhausted
  //     return () => clearTimeout(timer);
  //   }
  // }, [currentMessage, messageArray]);

  const isFormStepEnd = activeStep === steps.length - 3;

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(  {
      exposure_percent: 40,
      weight: weight,
      height: height,
      history_of_stroke: strokeHistory,
      family_history_of_stroke: familyStrokeHistory,
      physical_activity_level: physicalActivity,
      diet: Diet,
      systolic_blood_pressure: systolicBp,
      diastolic_blood_pressure: diastolicBp,
      data: [
        {
          age,
          hypertension,
          heart_disease,
          ever_married,
          work_type: workType,
          Residence_type: residence,
          avg_glucose_level: glucose,
          bmi,
          smoking_status: smoking,
          gender,
        },
      ],
    });
    if (isFormStepEnd) {
      try {
        const response = await axios.post(
          "http://localhost:5000/api/v1/predict/getStrokeRecommendations",
          {
            exposure_percent: 40,
            weight: weight,
            height: height,
            history_of_stroke: strokeHistory,
            family_history_of_stroke: familyStrokeHistory,
            physical_activity_level: physicalActivity,
            diet: Diet,
            systolic_blood_pressure: systolicBp,
            diastolic_blood_pressure: diastolicBp,
            data: [
              {
                age,
                hypertension,
                heart_disease,
                ever_married,
                work_type: workType,
                Residence_type: residence,
                avg_glucose_level: glucose,
                bmi,
                smoking_status: smoking,
                gender,
              },
            ],
          }
        );
        const responses = await axios.post(
          "http://localhost:5000/api/v1/predict/predict_stroke_risk",
          {
            data: [
              {
                age,
                hypertension,
                heart_disease,
                ever_married,
                work_type: workType,
                Residence_type: residence,
                avg_glucose_level: glucose,
                bmi,
                smoking_status: smoking,
                gender,
              },
            ],
          }
        );
        console.log("reponse", response);
        console.log("reponses", responses);
      
        const Predicted = `${responses.data["Logistic Regression Probability"]}`;
        const roundedNumber = (Predicted)*100; // Rounds to 2 decimal places
        const formattedNumber = roundedNumber.toFixed(2);
        setAdvice(responses.data.Advice);
        setDiet(response.data.recommendations)
        setPrediction(formattedNumber);
        setInterpretation(responses.data.Interpretation);
      } catch (err) {
        console.log("An error occurred");
      }
      setActiveStep(activeStep + 1);
    } else {
      handleNext();
    }
  };

  // const sections = messageArray.split(
  //   /\n(?=\s*(Diet Plan|Exercise Plan|Other Recommendations))/
  // );
  // // console.log(sections[1]);
  // // Extract and store each section in variables
  // const dietPlan = sections[0].trim();
  return (
    <Stack sx={{ width: "84%" }}>
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
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
        }}
      >
        <Box
          sx={{
            position: "relative",
            display: "flex",
            background:
              "#192655",
            backgroundSize: "100%",
            backgroundRepeat: "no-repeat",
            height: "100vh",
            margin: "10px 20px",
            padding: "0px 20px",
            width: "90%",
            borderRadius: "15px",
          }}
        >
          <Box
            flex={2}
            sx={{
              // position: "absolute",
              // top:"-10%",
              display: "flex",
              justifyContent: "center",
              width: isNotMobile ? "100%" : "100%",
            }}
          >
            <Box
              sx={{
                padding: 2,
                borderRadius: "5px",
                width: "100%",
                marginTop: "40px",
                height: "85vh",
                // background: "rgb(2,0,36)",
                background:
                  "linear-gradient(118deg, #A0DDF7 1.81%, rgba(158, 170, 235, 0.00) 133.89%)",
                //   "linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(139,48,231,1) 74%, rgba(0,212,255,1) 100%)",
              }}
            >
              <StyledTypo variant="h4" gutterBottom>
                Risk Assessment
              </StyledTypo>

              <Box
                sx={{
                  display: "flex",
                  height: "90%",
                  width: "100%",
                  position: "relative",
                }}
              >
                <Stepper activeStep={activeStep} orientation="vertical">
                  {steps.map((label) => (
                    <Step key={label}>
                      <StepLabel>{label}</StepLabel>
                    </Step>
                  ))}
                </Stepper>
                <Box
                  flex={1}
                  sx={{
                    //
                    // marginTop: "13px 0px",
                    //
                    width:
                      activeStep === 3 && activeStep === 4 ? "100%" : "450px",
                    display: "flex",
                    flexDirection: "column-reverse",
                    padding: "0px 5%",
                  }}
                >
                  <form>
                    {activeStep === 0 && (
                      <div
                        style={{
                          position: "relative",
                          marginTop: "50px",
                        }}
                      >
                        <Box
                          sx={
                            {
                              // position: "absolute",
                              // bottom: "-400%",
                            }
                          }
                        >
                          <StyledTypo
                            sx={{
                              marginTop: isNotMobile ? "30px" : "0px",
                              position: "absolute",
                              bottom: "96%",
                              fontSize: "32px",
                              fontStyle: "normal",
                              fontWeight: "600",
                              color: "#000",
                            }}
                          >
                            Personal Information
                          </StyledTypo>
                          <Box
                            sx={{
                              // position: "absolute",
                              // top: "-35%",
                              // position: "absolute",
                              // top: "10%",
                              marginTop: "-60%",
                              display: "flex",
                              flexDirection: "column",
                              gap: "40px",
                            }}
                          >
                            <Box
                              sx={{
                                display: "flex",
                                justifyContent: "space-between",
                              }}
                            >
                              {/* one form input box start */}
                              <Box
                                sx={{
                                  marginLeft: "20px",
                                  display: "flex",
                                  flexDirection: "column",
                                  gap: "2px",
                                }}
                              >
                                <label for="age">
                                  <StyledTypo
                                    sx={{
                                      color: "#fff",
                                    }}
                                  >
                                    Age
                                  </StyledTypo>
                                </label>
                                <input
                                  type="number"
                                  id="age"
                                  name="age"
                                  value={age}
                                  onChange={(e) => {
                                    const value = e.target.value;
                                    // Check if the input is a valid number and greater than or equal to 1
                                    if (!isNaN(value) && Number(value) >= 1) {
                                      setage(Number(value)); // Convert the valid input to a number and set it in state
                                      setErrorMessage("");
                                    } else {
                                      // setAge(value);
                                      setage("");
                                      setErrorMessage(
                                        "Please enter a valid age (1 or greater)."
                                      );
                                    }
                                  }}
                                  min="1"
                                  style={{
                                    border: "1px solid #0D66D0",
                                    borderRadius: "5px",
                                    padding: "8px",
                                  }}
                                  placeholder="Your Age"
                                  fullWidth
                                  required
                                />
                                {errorMessage && (
                                  <p style={{ color: "red" }}>{errorMessage}</p>
                                )}
                              </Box>
                              {/* one form input box end */}
                              <Box
                                sx={{
                                  //   marginLeft: "20px",
                                  display: "flex",
                                  flexDirection: "column",
                                  gap: "2px",
                                  //   width:"90%"
                                  mt: "20px",
                                }}
                              >
                                <StyledTypo
                                  sx={{
                                    color: "#fff",
                                  }}
                                >
                                  Family History of Stoke
                                </StyledTypo>

                                <Box
                                  sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    // justifyContent: "space-between",
                                    gap: "30px",
                                  }}
                                >
                                  <Box
                                    sx={{
                                      display: "flex",
                                      // flexDirection: "column",
                                      alignItems: "center",
                                    }}
                                  >
                                    <input
                                      type="radio"
                                      id="familyStrokeHistory_yes"
                                      name="familyStrokeHistory"
                                      value="familyStrokeHistory"
                                      checked={familyStrokeHistory === "yes"}
                                      onChange={() =>
                                        setFamilyStrokeHistory("yes")
                                      }
                                    />
                                    <label for="familyStrokeHistory_yes">
                                      <StyledTypo sx={{ cursor: "pointer" }}>
                                        Yes
                                      </StyledTypo>
                                    </label>
                                  </Box>
                                  <Box
                                    sx={{
                                      display: "flex",
                                      // flexDirection: "column",
                                      alignItems: "center",
                                    }}
                                  >
                                    <input
                                      type="radio"
                                      id="familyStrokeHistory_no"
                                      name="familyStrokeHistory"
                                      value="no"
                                      checked={familyStrokeHistory === "no"}
                                      onChange={() =>
                                        setFamilyStrokeHistory("no")
                                      }
                                    />
                                    <label for="familyStrokeHistory_no">
                                      <StyledTypo sx={{ cursor: "pointer" }}>
                                        No
                                      </StyledTypo>
                                    </label>
                                  </Box>
                                </Box>
                              </Box>
                            </Box>
                            <Box
                              sx={{
                                display: "flex",
                                justifyContent: "space-between",
                              }}
                            >
                              {/* one form input box start */}
                              <Box
                                sx={{
                                  marginLeft: "20px",
                                  display: "flex",
                                  flexDirection: "column",
                                  gap: "2px",
                                }}
                              >
                                <label for="gender">
                                  <StyledTypo
                                    sx={{
                                      color: "#fff",
                                    }}
                                  >
                                    Gender
                                  </StyledTypo>
                                </label>
                                <Box
                                  sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "2px",
                                  }}
                                >
                                  <input
                                    type="radio"
                                    id="male"
                                    name="gender"
                                    value="Male"
                                    checked={gender === "Male"}
                                    onChange={() => setgender("Male")}
                                  />
                                  <label for="male">
                                    <StyledTypo sx={{ cursor: "pointer" }}>
                                      Male
                                    </StyledTypo>
                                  </label>

                                  <input
                                    type="radio"
                                    id="female"
                                    name="gender"
                                    value="Female"
                                    checked={gender === "Female"}
                                    onChange={() => setgender("Female")}
                                  />
                                  <label for="female">
                                    <StyledTypo sx={{ cursor: "pointer" }}>
                                      Female
                                    </StyledTypo>
                                  </label>
                                  <input
                                    type="radio"
                                    id="other"
                                    name="gender"
                                    value="Other"
                                    checked={gender === "Other"}
                                    onChange={() => setgender("Other")}
                                  />
                                  <label for="other">
                                    <StyledTypo sx={{ cursor: "pointer" }}>
                                      Other
                                    </StyledTypo>
                                  </label>
                                </Box>
                              </Box>
                              <Box
                                sx={{
                                  marginLeft: "20px",
                                  display: "flex",
                                  flexDirection: "column",
                                  gap: "2px",
                                }}
                              >
                                <label for="ever_married">
                                  <StyledTypo
                                    sx={{
                                      color: "#fff",
                                    }}
                                  >
                                    Ever Married
                                  </StyledTypo>
                                </label>
                                <Box
                                  sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "8px",
                                  }}
                                >
                                  <input
                                    type="radio"
                                    id="yes"
                                    name="ever_married"
                                    value="yes"
                                    checked={ever_married === "yes"}
                                    onChange={() => setever_married("yes")}
                                  />
                                  <label for="yes">
                                    <StyledTypo sx={{ cursor: "pointer" }}>
                                      Yes
                                    </StyledTypo>
                                  </label>

                                  <input
                                    type="radio"
                                    id="no"
                                    name="ever_married"
                                    value="no"
                                    checked={ever_married === "no"}
                                    onChange={() => setever_married("no")}
                                  />
                                  <label for="no">
                                    <StyledTypo sx={{ cursor: "pointer" }}>
                                      No
                                    </StyledTypo>
                                  </label>
                                </Box>
                              </Box>
                              {/* one form input box end */}
                            </Box>
                            <Box
                              sx={{
                                display: "flex",
                                // justifyContent: "center",
                                justifyContent: "space-between",
                                alignItems: "center",
                                // gap: "8%",
                              }}
                            >
                              <Box
                                sx={{
                                  display: "flex",
                                  flexDirection: "column",
                                }}
                              >
                                <Box
                                  sx={{
                                    marginLeft: "20px",
                                    width: "100%",
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: "2px",
                                  }}
                                >
                                  <label for="height">
                                    <StyledTypo
                                      sx={{
                                        color: "#fff",
                                      }}
                                    >
                                      Height (in cm)
                                    </StyledTypo>
                                  </label>
                                  <input
                                    type="number"
                                    id="height"
                                    name="height"
                                    value={height}
                                    onChange={(e) => {
                                      const value = e.target.value;
                                      if (!isNaN(value) && Number(value) >= 0) {
                                        setHeight(value);
                                        setHeightErrorMessage(""); // Clear any previous Heighterror message
                                      } else {
                                        setHeight(""); // Reset the input to an empty string
                                        setHeightErrorMessage(
                                          "Please enter a valid height (50 cm or greater)."
                                        );
                                      }
                                    }}
                                    min="50"
                                    style={{
                                      width: "50%",
                                      border: "1px solid #0D66D0",
                                      borderRadius: "5px",
                                      padding: "8px",
                                    }}
                                    placeholder="Your height"
                                    fullWidth
                                    required
                                  />
                                  {errorHeightMessage && (
                                    <p style={{ color: "red" }}>
                                      {errorHeightMessage}
                                    </p>
                                  )}
                                </Box>
                              </Box>
                              {/** */}
                              <Box
                                sx={{
                                  display: "flex",
                                  flexDirection: "column",
                                  //   marginLeft:"10px",
                                }}
                              >
                                <Box
                                  sx={{
                                    // marginLeft: "20px",
                                    display: "flex",
                                    width: "100%",
                                    flexDirection: "column",
                                    gap: "2px",
                                  }}
                                >
                                  <label for="weight">
                                    <StyledTypo
                                      sx={{
                                        color: "#fff",
                                      }}
                                    >
                                      Weight (in kg)
                                    </StyledTypo>
                                  </label>
                                  <input
                                    type="number"
                                    id="weight"
                                    name="weight"
                                    value={weight}
                                    onChange={(e) => {
                                      const value = e.target.value;
                                      if (!isNaN(value) && Number(value) >= 1) {
                                        setWeight(value);
                                        setWeightErrorMessage(""); // Clear any previous Weighterror message
                                      } else {
                                        setWeight(""); // Reset the input to an empty string
                                        setWeightErrorMessage(
                                          "Please Enter a valid Weight (20 Kg or greater)."
                                        );
                                      }
                                    }}
                                    min="20"
                                    style={{
                                      width: "50%",
                                      border: "1px solid #0D66D0",
                                      borderRadius: "5px",
                                      padding: "8px",
                                    }}
                                    placeholder="Your weight"
                                    fullWidth
                                    required
                                  />
                                </Box>
                                {errorWeightMessage && (
                                  <p style={{ color: "red" }}>
                                    {errorWeightMessage}
                                  </p>
                                )}
                              </Box>
                              {/* */}
                            </Box>
                          </Box>
                        </Box>
                      </div>
                    )}

                    {activeStep === 1 && (
                      <div style={{ position: "relative", marginTop: "-50%" }}>
                        <StyledTypo
                          sx={{
                            position: "absolute",
                            bottom: "140%",
                            marginTop: isNotMobile ? "35px" : "-10px",
                            // position: "absolute",
                            top: "-36%",
                            fontSize: "32px",
                            fontStyle: "normal",
                            fontWeight: "600",
                            color: "#000",
                          }}
                        >
                          Personal Information
                        </StyledTypo>
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            position: "relative",
                          }}
                        >
                          <Box
                            sx={{
                              width: "100%",
                              // marginLeft: "20px",
                              display: "flex",
                              flexDirection: "column",
                              gap: "2px",
                            }}
                          >
                            <label for="physical">
                              <StyledTypo>Physical Activity Level</StyledTypo>
                            </label>
                            <input
                              type="text"
                              id="physical"
                              name="physical"
                              value={physicalActivity}
                              onChange={(e) =>
                                setPhysicalActivity(e.target.value)
                              }
                              style={{
                                border: "1px solid #0D66D0",
                                borderRadius: "5px",
                                padding: "8px",
                              }}
                              placeholder="Running, Jogging..."
                              fullWidth
                              required
                            />
                          </Box>
                          <Box
                            sx={{
                              // position: "absolute",
                              // top:"10%",
                              width: "100%",
                              // marginTop: "16px",
                              marginLeft: "20px",
                              display: "flex",
                              flexDirection: "column",
                              // gap: "18px",
                            }}
                          >
                            <StyledTypo
                              sx={{
                                color: "#fff",
                              }}
                            >
                              Diet
                            </StyledTypo>

                            <input
                              type="text"
                              id="diet"
                              name="diet"
                              value={Diet}
                              onChange={(e) => setDiet(e.target.value)}
                              style={{
                                border: "1px solid #0D66D0",
                                borderRadius: "5px",
                                padding: "8px",
                              }}
                              placeholder="Vegitable"
                              fullWidth
                              required
                            />
                          </Box>
                        </Box>
                        {/* one form input box start */}
                        <Box
                          sx={{
                            //   marginLeft: "20px",
                            display: "flex",
                            flexDirection: "column",
                            gap: "2px",
                            //   width:"90%"
                          }}
                        >
                          <label for="work-type">
                            <StyledTypo
                              sx={{
                                color: "#fff",
                              }}
                            >
                              Work Type
                            </StyledTypo>
                          </label>
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "space-between",
                            }}
                          >
                            <Box
                              sx={{
                                display: "flex",
                                // flexDirection: "column",
                                alignItems: "center",
                              }}
                            >
                              <input
                                type="radio"
                                id="private"
                                name="workType"
                                value="private"
                                checked={workType === "private"}
                                onChange={() => setWorkType("private")}
                              />
                              <label for="private">
                                <StyledTypo sx={{ cursor: "pointer" }}>
                                  Private
                                </StyledTypo>
                              </label>
                            </Box>
                            <Box
                              sx={{
                                display: "flex",
                                // flexDirection: "column",
                                alignItems: "center",
                              }}
                            >
                              <input
                                type="radio"
                                id="self-employed"
                                name="workType"
                                value="self-employed"
                                checked={workType === "self-employed"}
                                onChange={() => setWorkType("self-employed")}
                              />
                              <label for="self-employed">
                                <StyledTypo sx={{ cursor: "pointer" }}>
                                  Self Emplyed
                                </StyledTypo>
                              </label>
                            </Box>
                            <Box
                              sx={{
                                display: "flex",
                                // flexDirection: "column",
                                alignItems: "center",
                              }}
                            >
                              <input
                                type="radio"
                                id="government-job"
                                name="workType"
                                value="government-job"
                                checked={workType === "government-job"}
                                onChange={() => setWorkType("government-job")}
                              />
                              <label for="government-job">
                                <StyledTypo sx={{ cursor: "pointer" }}>
                                  Gov't Job
                                </StyledTypo>
                              </label>
                            </Box>
                          </Box>
                        </Box>

                        {/** residence starts */}
                        <Box
                          sx={{
                            display: "flex",
                            gap: "23.9%",
                          }}
                        >
                          <Box
                            sx={{
                              //   marginLeft: "20px",
                              display: "flex",
                              flexDirection: "column",
                              gap: "2px",
                              //   width:"90%"
                              mt: "20px",
                            }}
                          >
                            <StyledTypo
                              sx={{
                                color: "#fff",
                              }}
                            >
                              Residence
                            </StyledTypo>

                            <Box
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                // justifyContent: "space-between",
                                gap: "30px",
                              }}
                            >
                              <Box
                                sx={{
                                  display: "flex",
                                  // flexDirection: "column",
                                  alignItems: "center",
                                }}
                              >
                                <input
                                  type="radio"
                                  id="urban"
                                  name="residence"
                                  value="residence"
                                  checked={residence === "Urban"}
                                  onChange={() => setResidence("Urban")}
                                />
                                <label for="urban">
                                  <StyledTypo sx={{ cursor: "pointer" }}>
                                    Urban
                                  </StyledTypo>
                                </label>
                              </Box>
                              <Box
                                sx={{
                                  display: "flex",
                                  // flexDirection: "column",
                                  alignItems: "center",
                                }}
                              >
                                <input
                                  type="radio"
                                  id="rural"
                                  name="residence"
                                  value="rural"
                                  checked={residence === "rural"}
                                  onChange={() => setResidence("rural")}
                                />
                                <label for="rural">
                                  <StyledTypo sx={{ cursor: "pointer" }}>
                                    Rural
                                  </StyledTypo>
                                </label>
                              </Box>
                            </Box>
                          </Box>
                          <Box
                            sx={{
                              //   marginLeft: "20px",
                              display: "flex",
                              flexDirection: "column",
                              gap: "2px",
                              //   width:"90%"
                              mt: "20px",
                            }}
                          >
                            <StyledTypo
                              sx={{
                                color: "#fff",
                              }}
                            >
                              History of Stoke
                            </StyledTypo>

                            <Box
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                // justifyContent: "space-between",
                                gap: "30px",
                              }}
                            >
                              <Box
                                sx={{
                                  display: "flex",
                                  // flexDirection: "column",
                                  alignItems: "center",
                                }}
                              >
                                <input
                                  type="radio"
                                  id="yes"
                                  name="strokeHistory"
                                  value="strokeHistory"
                                  checked={strokeHistory === "yes"}
                                  onChange={() => setStrokeHistory("yes")}
                                />
                                <label for="yes">
                                  <StyledTypo sx={{ cursor: "pointer" }}>
                                    Yes
                                  </StyledTypo>
                                </label>
                              </Box>
                              <Box
                                sx={{
                                  display: "flex",
                                  // flexDirection: "column",
                                  alignItems: "center",
                                }}
                              >
                                <input
                                  type="radio"
                                  id="no"
                                  name="strokeHistory"
                                  value="no"
                                  checked={strokeHistory === "no"}
                                  onChange={() => setStrokeHistory("no")}
                                />
                                <label for="no">
                                  <StyledTypo sx={{ cursor: "pointer" }}>
                                    No
                                  </StyledTypo>
                                </label>
                              </Box>
                            </Box>
                          </Box>
                        </Box>
                        {/** residence ends */}
                        <Box
                          sx={{
                            //   marginLeft: "20px",
                            display: "flex",
                            flexDirection: "column",
                            gap: "2px",
                            //   width:"90%"
                          }}
                        >
                          <label for="smoking type">
                            <StyledTypo
                              sx={{
                                color: "#fff",
                              }}
                            >
                              Smoking Status
                            </StyledTypo>
                          </label>
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "space-between",
                            }}
                          >
                            <Box
                              sx={{
                                display: "flex",
                                // flexDirection: "column",
                                alignItems: "center",
                              }}
                            >
                              <input
                                type="radio"
                                id="formerly-smoked"
                                name="smoking"
                                value="formerly-smoked"
                                checked={smoking === "formerly smoked"}
                                onChange={() => setSmoking("formerly smoked")}
                              />
                              <label for="formerly-smoked">
                                <StyledTypo sx={{ cursor: "pointer" }}>
                                  Formerly Smoked
                                </StyledTypo>
                              </label>
                            </Box>
                            <Box
                              sx={{
                                display: "flex",
                                // flexDirection: "column",
                                alignItems: "center",
                              }}
                            >
                              <input
                                type="radio"
                                id="never-smoked"
                                name="smoking"
                                value="never-smoked"
                                checked={smoking === "never-smoked"}
                                onChange={() => setSmoking("never-smoked")}
                              />
                              <label for="never-smoked">
                                <StyledTypo sx={{ cursor: "pointer" }}>
                                  Never Smoked
                                </StyledTypo>
                              </label>
                            </Box>
                            <Box
                              sx={{
                                display: "flex",
                                // flexDirection: "column",
                                alignItems: "center",
                              }}
                            >
                              <input
                                type="radio"
                                id="smokes"
                                name="smoking"
                                value="smokes"
                                checked={smoking === "smokes"}
                                onChange={() => setSmoking("smokes")}
                              />
                              <label for="smokes">
                                <StyledTypo sx={{ cursor: "pointer" }}>
                                  Smokes
                                </StyledTypo>
                              </label>
                            </Box>
                          </Box>
                        </Box>

                        {/* work type ends */}
                      </div>
                    )}

                    {activeStep === 2 && (
                      <Box
                        sx={{
                          position: "relative",
                          // diplay:"flex",
                          // flexDirection:"column",
                          // gap:"200px"
                          // marginTop:"-40px"
                        }}
                      >
                        <StyledTypo
                          sx={{
                            marginTop: isNotMobile ? "40px" : "0px",
                            position: "absolute",
                            top: "-86%",
                            fontSize: "32px",
                            fontStyle: "normal",
                            fontWeight: "600",
                            color: "#000",
                          }}
                        >
                          Health and Life Style
                        </StyledTypo>
                        {/** */}
                        <Box
                          sx={{
                            marginBottom: "140px",
                          }}
                        >
                          <Box
                            sx={{
                              //  position: "absolute",
                              // bottom: "-20%",
                              // marginTop:"-60px",
                              display: "flex",
                              justifyContent: "space-between",
                              marginBottom: "40px",
                            }}
                          >
                            <Box
                              sx={{
                                width: "100%",
                                marginLeft: "20px",
                                display: "flex",
                                flexDirection: "column",
                                gap: "2px",
                              }}
                            >
                              <StyledTypo
                                sx={{
                                  color: "#fff",
                                }}
                              >
                                Systolic Blood Pressure
                              </StyledTypo>

                              <input
                                type="number"
                                id="systolic_blood_pressure"
                                name="systolic"
                                value={systolicBp}
                                onChange={(e) => setSystolicBp(e.target.value)}
                                min="90"
                                max="140"
                                style={{
                                  border: "1px solid #0D66D0",
                                  borderRadius: "5px",
                                  padding: "8px",
                                }}
                                placeholder="90 - 120"
                                fullWidth
                                required
                              />
                            </Box>
                            <Box
                              sx={{
                                width: "100%",
                                marginLeft: "20px",
                                display: "flex",
                                flexDirection: "column",
                                gap: "2px",
                              }}
                            >
                              <StyledTypo
                                sx={{
                                  color: "#fff",
                                }}
                              >
                                Diastolic Blood Pressure
                              </StyledTypo>

                              <input
                                type="number"
                                id="diastolic_blood_pressure"
                                name="diastolic"
                                value={diastolicBp}
                                onChange={(e) => setDiastolicBp(e.target.value)}
                                min="90"
                                max="140"
                                style={{
                                  border: "1px solid #0D66D0",
                                  borderRadius: "5px",
                                  padding: "8px",
                                }}
                                placeholder="90 - 120"
                                fullWidth
                                required
                              />
                            </Box>
                          </Box>
                          <Box
                            sx={{
                              display: "flex",
                              justifyContent: "space-between",
                              gap: "5%",
                            }}
                          >
                            <Box
                              flex={1}
                              sx={{
                                width: "100%",
                                marginLeft: "20px",
                                display: "flex",
                                flexDirection: "column",
                                gap: "2px",
                              }}
                            >
                              <StyledTypo
                                sx={{
                                  color: "#fff",
                                }}
                              >
                                Average Gluscose Level
                              </StyledTypo>

                              <input
                                type="number"
                                id="gluscose"
                                name="glucose"
                                value={glucose}
                                onChange={(e) => setGlucose(e.target.value)}
                                min="90"
                                max="140"
                                style={{
                                  border: "1px solid #0D66D0",
                                  borderRadius: "5px",
                                  padding: "8px",
                                }}
                                placeholder="90 - 120"
                                fullWidth
                                required
                              />
                            </Box>
                            <Box
                              flex={1}
                              sx={{
                                //   marginLeft: "20px",
                                display: "flex",
                                flexDirection: "column",
                                gap: "2px",
                                //   width:"90%"
                                mt: "20px",
                              }}
                            >
                              <StyledTypo
                                sx={{
                                  color: "#fff",
                                }}
                              >
                                Hypertension
                              </StyledTypo>

                              <Box
                                sx={{
                                  display: "flex",
                                  alignItems: "center",
                                  // justifyContent: "space-between",
                                  gap: "30px",
                                }}
                              >
                                <Box
                                  sx={{
                                    display: "flex",
                                    // flexDirection: "column",
                                    alignItems: "center",
                                  }}
                                >
                                  <input
                                    type="radio"
                                    id="hypertension_yes"
                                    name="hypertension_yes"
                                    value="hypertension"
                                    checked={hypertension === "yes"}
                                    onChange={() => sethypertension("yes")}
                                  />
                                  <label for="hypertension_yes">
                                    <StyledTypo sx={{ cursor: "pointer" }}>
                                      Yes
                                    </StyledTypo>
                                  </label>
                                </Box>
                                <Box
                                  sx={{
                                    display: "flex",
                                    // flexDirection: "column",
                                    alignItems: "center",
                                  }}
                                >
                                  <input
                                    type="radio"
                                    id="hypertension"
                                    name="hypertension"
                                    value="no"
                                    checked={hypertension === "no"}
                                    onChange={() => sethypertension("no")}
                                  />
                                  <label for="hypertension">
                                    <StyledTypo sx={{ cursor: "pointer" }}>
                                      No
                                    </StyledTypo>
                                  </label>
                                </Box>
                              </Box>
                            </Box>
                          </Box>
                          {/** */}
                          <Box
                            sx={{
                              margin: "20px",
                            }}
                          >
                            <StyledTypo
                              sx={{
                                color: "#fff",
                              }}
                            >
                              Heart Deases
                            </StyledTypo>

                            <Box
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                // justifyContent: "space-between",
                                gap: "30px",
                              }}
                            >
                              <Box
                                sx={{
                                  display: "flex",
                                  // flexDirection: "column",
                                  alignItems: "center",
                                }}
                              >
                                <input
                                  type="radio"
                                  id="yes"
                                  name="heart_deases"
                                  value="heart_deases"
                                  checked={heart_disease === "yes"}
                                  onChange={() => setheart_disease("yes")}
                                />
                                <label for="yes">
                                  <StyledTypo sx={{ cursor: "pointer" }}>
                                    Yes
                                  </StyledTypo>
                                </label>
                              </Box>
                              <Box
                                sx={{
                                  display: "flex",
                                  // flexDirection: "column",
                                  alignItems: "center",
                                }}
                              >
                                <input
                                  type="radio"
                                  id="no"
                                  name="heart_disease"
                                  value="no"
                                  checked={heart_disease === "no"}
                                  onChange={() => setheart_disease("no")}
                                />
                                <label for="no">
                                  <StyledTypo sx={{ cursor: "pointer" }}>
                                    No
                                  </StyledTypo>
                                </label>
                              </Box>
                            </Box>
                          </Box>
                        </Box>
                      </Box>
                    )}

                    <Box
                      sx={{
                        position: "absolute",
                        bottom: isNotMobile ? "-2%" : "-15px",
                        width: isNotMobile ? "70%" : "73%",
                        display: "flex",
                        marginLeft: "27px",
                        flexDirection: "column",
                      }}
                    >
                      <Button
                        sx={{
                          display:
                            activeStep === 0 || activeStep === 3
                              ? "none"
                              : "flex",

                          border: "1px solid #fff",
                          color: "#fff",
                          marginBottom: "5px",
                        }}
                        disabled={activeStep === 0}
                        onClick={handleBack}
                        variant="outlined"
                      >
                        Back
                      </Button>

                      <Button
                        variant="contained"
                        sx={{
                          background: "#1491ff",
                          // width:"80%"
                        }}
                        onClick={handleSubmit}
                        fullWidth
                      >
                        {isFormStepEnd
                          ? "Submit"
                          : activeStep !== 4
                          ? "Next"
                          : "Retake"}
                      </Button>
                    </Box>
                  </form>
                  {activeStep === 3 && (
                    <Box
                      flex={1}
                      sx={{
                        position: "relative",
                      }}
                    >
                      <StyledTypo
                        sx={{
                          position: "absolute",
                          top: isNotMobile ? "-5%" : "0%",
                          fontSize: "32px",
                          fontStyle: "normal",
                          fontWeight: "600",
                          color: "#000",
                          // marginBottom:"10px"
                        }}
                      >
                        Result
                      </StyledTypo>
                      <Box
                        sx={{
                          position: "absolute",
                          top: "20%",
                          display: "flex",
                          flexDirection: "column",
                          gap: "4px",
                        }}
                      >
                        <OutputCard
                          title={"Predicions"}
                          prediction={`${Prediction * 10}%`}
                        />
                        <OutputCard
                          title={"Interpretation"}
                          body={Interpretation}
                        />
                        <OutputCard title={"Advice"} body={Advice} />
                      </Box>
                    </Box>
                  )}
                  {activeStep === 4 && (
                    <Box sx={{
                     
                    }}>
                      <OutputCard
                        // fitness_title={"Ftiness Plan"}
                        diet_title={"Diet Plan"}
                        diet={Diet}
                      //   fitness={
                      //     fitness   }
                      />
                    </Box>
                  )}
                </Box>
              </Box>
            </Box>
          </Box>
          <Box
            flex={0.5}
            sx={{

              marginTop: "55px",
              marginLeft: "15px",
              display: isNotMobile ? "none" : "none",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "25px",
              }}
            >
              <img
                style={{
                  border: "8px solid #fff",
                  borderRadius: "50%",
                  height: "180px",
                  width: "180px",
                }}
                src={UserImg}
              />
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <StyledTypo
                  sx={{
                    fontWeight: "bold",
                    fontSize: "24px",
                    color: "white",
                  }}
                >
                  Jhon Doe
                </StyledTypo>
                <StyledTypo
                  sx={{
                    color: "#fff",
                  }}
                >
                  @jhondoe
                </StyledTypo>
              </Box>
              <Box
                sx={{
                  marginTop: "35px",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    // gap: "20px",
                    justifyContent: "space-between",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: "5px",
                    }}
                  >
                    <LocalPhoneIcon style={{ color: "#fff" }} />
                    <StyledTypo
                      sx={{
                        color: "#fff",
                      }}
                    >
                      Phone
                    </StyledTypo>
                  </Box>
                  <StyledTypo>+251924371431</StyledTypo>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    gap: "20px",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: "5px",
                    }}
                  >
                    <MarkunreadIcon style={{ color: "#fff" }} />
                    <StyledTypo
                      sx={{
                        color: "#fff",
                      }}
                    >
                      Email
                    </StyledTypo>
                  </Box>
                  <StyledTypo>tilahuna13@gmail.com</StyledTypo>
                </Box>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  marginLeft: "-115px",
                }}
              >
                <StyledButton
                  variant="contained"
                  sx={{
                    // background: "transparent",
                    // color:"red",
                    border: "none",
                    cursor: "pointer",
                    transition: "background-color 0.2s ease-in-out", // Add a transition for a smoother effect
                    "&:hover": {
                      border: "none",
                      backgroundColor: "#fff", // Define the background color for the hover effect
                      color: "blue", // Change the text color on hover
                    },
                  }}
                >
                  UPDATE
                </StyledButton>
                <StyledButton
                  variant="outlined"
                  sx={{
                    background: "transparent",
                    color: "red",
                    border: "1px solid red",
                    cursor: "pointer",
                    transition: "background-color 0.2s ease-in-out", // Add a transition for a smoother effect
                    "&:hover": {
                      border: "none",
                      backgroundColor: "#E06969", // Define the background color for the hover effect
                      color: "#ffffff", // Change the text color on hover
                    },
                  }}
                >
                  DELETE
                </StyledButton>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Stack>
  );
};

export default RiskAssessment;
