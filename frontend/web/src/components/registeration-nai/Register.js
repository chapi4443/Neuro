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

const personalData = {
  firstName: "John",
  lastName: "Doe",
  dateOfBirth: "1990-01-01",
  gender: "Male",
  age: 30,
};

const contactData = {
  email: "johndoe@example.com",
  phoneNumber: "1234567890",
  address: "123 Main Street",
  city: "New York",
  country: "USA",
};

const accountData = {
  password: "whatareyoulookingfor🙄", // Dummy password for the sake of example
};
const steps = [
  "Presonal Info",
  "Contact Info",
  " Set Password",
  "Review your info",
];

function getStepContent(step) {
  switch (step) {
    case 0:
      return <Personal />;
    case 1:
      return <Contact />;
    case 2:
      return <Account />;
    case 3:
      return (
        <Review
          personalData={personalData}
          contactData={contactData}
          accountData={accountData}
        />
      );
    default:
      throw new Error("Unknown step");
  }
}

export default function Register() {
  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  return (
    <React.Fragment>
      <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
        <Paper
          variant="outlined"
          sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
        >
          <Typography component="h1" variant="h4" align="center">
            Personal Information
          </Typography>
          <Stepper
            activeStep={activeStep}
            sx={{
              pt: 3,
              pb: 5,
              "& .MuiStepLabel-active": {
                color: "#20A0D8",
              },
              "& .MuiStepIcon-active": {
                color: "#20A0D8",
              },
            }}
          >
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          {activeStep === steps.length ? (
            <React.Fragment>
              <Typography variant="h5" gutterBottom>
                Thank you for your order.
              </Typography>
              <Typography variant="subtitle1">
                Your order number is #2001539. We have emailed your order
                confirmation, and will send you an update when your order has
                shipped.
              </Typography>
            </React.Fragment>
          ) : (
            <React.Fragment>
              {getStepContent(activeStep)}
              <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                {activeStep !== 0 && (
                  <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                    Back
                  </Button>
                )}

                <Button
                  variant="contained"
                  onClick={handleNext}
                  sx={{ mt: 3, ml: 1, backgroundColor: "#20A0D8" }}
                >
                  {activeStep === steps.length - 1 ? "Submit" : "Next"}
                </Button>
              </Box>
            </React.Fragment>
          )}
        </Paper>
      </Container>
    </React.Fragment>
  );
}
