import * as React from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Personal from "./Personal";
import Contact from "./Contact";
import Review from "./Review";
import Account from "./Account";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchRegistration } from "../../features/registrationSlice";

const steps = [
  "Personal Info",
  "Contact Info",
  "Set Password",
  "Review your info",
];

export default function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const data = useSelector((state) => state.register.data);

  console.log("registration", data);
  const [activeStep, setActiveStep] = React.useState(0);
  const [formData, setFormData] = React.useState();

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const handleDataChange = (data) => {
    const { id, value } = data;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(fetchRegistration(formData));
    navigate("/login");
  };

  function getStepContent(step) {
    switch (step) {
      case 0:
        return <Personal onDataChange={handleDataChange} />;
      case 1:
        return <Contact onDataChange={handleDataChange} />;
      case 2:
        return <Account onDataChange={handleDataChange} />;
      case 3:
        return <Review formData={formData} />;
      default:
        throw new Error("Unknown step");
    }
  }

  return (
    <React.Fragment>
      <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            my: 4,
          }}
        >
          <Paper variant="outlined" sx={{ p: 3, width: "100%" }}>
            <Typography component="h1" variant="h4" align="center">
              Registration
            </Typography>
            <div
              style={{
                width: "100%",
                overflowX: "auto",
              }}
            >
              <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
                {steps.map((label) => (
                  <Step key={label}>
                    <StepLabel>{label}</StepLabel>
                  </Step>
                ))}
              </Stepper>
            </div>
            {activeStep === steps.length ? (
              <React.Fragment>
                <Typography variant="h5" gutterBottom align="center">
                  Thank you for your Registration.
                </Typography>
                <Typography variant="subtitle1" align="center">
                  Lorem ipsum dolor sit amet, consectetur adipiscing el aspect
                  et ea rebum. Lore mauris et justo sed diam nonumy eirmod
                  tempor incididunt ut labore et dolore magna aliquy auctor.
                  Lorem ipsum dolor sit amet, consect.
                </Typography>
              </React.Fragment>
            ) : (
              <React.Fragment>
                {getStepContent(activeStep)}
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    mt: 3,
                    flexWrap: "wrap",
                  }}
                >
                  {activeStep !== 0 && (
                    <Button onClick={handleBack} sx={{ mb: 2 }}>
                      Back
                    </Button>
                  )}

                  <Button
                    variant="contained"
                    onClick={
                      activeStep === steps.length - 1
                        ? handleSubmit
                        : handleNext
                    }
                    sx={{ backgroundColor: "#20A0D8", mb: 2 }}
                  >
                    {activeStep === steps.length - 1 ? "Submit" : "Next"}
                  </Button>
                </Box>
              </React.Fragment>
            )}
          </Paper>
        </Box>
      </Container>
    </React.Fragment>
  );
}
