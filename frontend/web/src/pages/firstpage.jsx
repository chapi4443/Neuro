import React from "react";
import { Box, Typography, styled, useMediaQuery, Grid, Button, Card, CardContent } from "@mui/material";
import NeuronCompo from "../components/NeuronCompo NeuronCompo";
import { useNavigate } from "react-router-dom";

const StyledTitle = styled(Typography)({
  color: "#16C2D5",
  fontSize: "2.5rem",
  fontWeight: "bold",
  textAlign: "center",
  padding: "1rem",
});

const StyledSubtitle = styled(Typography)({
  color: "#30575c",
  textAlign: "center",
});

const FirstPage = () => {
  const navigate = useNavigate();
  const isMobile = useMediaQuery("(max-width: 600px)");

  return (
    <Grid container direction="column" alignItems="center" spacing={2}>
      <Grid item>
        <NeuronCompo display="flex" />
        <Box>
          <StyledTitle variant="h1">Neurogen AI</StyledTitle>
          <StyledSubtitle variant="body1">
            Empowering Stroke Management through Advanced AI Technology
          </StyledSubtitle>
        </Box>
      </Grid>
      <Grid item container justifyContent={isMobile ? "flex-start" : "center"} spacing={2} sx={{}}>
        <Grid item>
          <Card sx={{ minWidth: isMobile ? 200 : 275, height: 170, minHeight: 150, maxWidth: 250, backgroundColor: "#16C2D5", color: "#ffffff", "&:hover": { backgroundColor: "#ffffff", color: "#16C2D5"}}}>
            <CardContent>
              <Typography variant="h5" component="div">
              Advanced Diagnostics:
              </Typography>
              <Typography variant="body2" color="text.secondary">
              Utilize cutting-edge AI algorithms for accurate stroke diagnosis, enabling timely treatment decisions.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item>
          <Card sx={{ minWidth: isMobile ? 200 : 275,height:170, minHeight: 150,maxWidth:250 , backgroundColor: "#16C2D5", color: "#ffffff", "&:hover": { backgroundColor: "#ffffff", color: "#16C2D5"}}}>
            <CardContent>
              <Typography variant="h5" component="div">
              Personalized Care Plans
              </Typography>
              <Typography variant="body2" color="text.secondary">
              Tailored treatment recommendations based on individual patient profiles, optimizing recovery outcomes.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item>
          <Card sx={{ minWidth: isMobile ? 200 : 275,height:170, minHeight: 150 ,maxWidth:250, backgroundColor: "#16C2D5", color: "#ffffff", "&:hover": { backgroundColor: "#ffffff", color: "#16C2D5"}}}>
            <CardContent>
              <Typography variant="h5" component="div">
              Real-Time Monitoring
              </Typography>
              <Typography variant="body2" color="text.secondary">
              Continuous health parameter tracking with instant alerts, ensuring timely intervention and risk prevention.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      <Grid item>
        <Box
          sx={{
            marginTop: "18px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <Button
            sx={{
              color: "#fff",
              borderRadius: "10px",
              background: "#16C2D5",
              "&:hover": {
                cursor: "pointer",
                color: "#000",
                background: "#fff",
                border: "1px solid #000",
              },
            }}
            onClick={() => navigate("/login")}
          >
            Log in
          </Button>
          <Button
            sx={{
              color: "#000",
              borderRadius: "10px",
              background: "#fff",
              border: "1px solid #000",
              "&:hover": {
                cursor: "pointer",
                color: "#fff",
                background: "#16C2D5",
                border: "1px solid #16C2D5",
              },
            }}
            onClick={() => navigate("/registeration")}
          >
            Register
          </Button>
        </Box>
      </Grid>
    </Grid>
  );
};

export default FirstPage;
